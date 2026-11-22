from collections.abc import Mapping
from dataclasses import dataclass
from datetime import datetime
from typing import TYPE_CHECKING, Final

from pydantic import TypeAdapter

from litellm.accounting.delivery_projection import entity_transactions, project_deliveries
from litellm.accounting.projection import Contribution
from litellm.proxy.db.budget_window_spend_writer import CommittedWindowSpend, commit_window_spend_updates
from litellm.proxy.db.daily_spend_bulk_upsert import DAILY_SPEND_TABLES, build_bulk_upsert, merge_by_conflict_key
from litellm.proxy.db.db_span import db_span
from litellm.proxy.db.db_transaction_queue.window_spend_update_queue import (
    WindowSpendTransaction,
    build_window_spend_transaction,
)
from litellm.proxy.db.model_usage_rollup import queue_model_usage_upsert
from litellm.proxy.db.rollup_lock_timeout import apply_rollup_lock_timeout
from litellm.proxy.spend_tracking.customer_budget_alerts import CustomerBudgetAlerting
from litellm.proxy.supplier_portal.accounting import accrue_usages
from litellm.proxy.supplier_portal.models import SupplierUsage
from litellm.repositories.accounting_delivery_repository import DeliveryProjection, LedgerTransaction

_METADATA: Final = TypeAdapter(dict[str, object])

if TYPE_CHECKING:
    from litellm.proxy.db.db_spend_update_writer import DBSpendUpdateWriter
    from litellm.proxy.utils import PrismaClient, ProxyLogging


@dataclass(frozen=True, slots=True)
class AppliedDeliveries:
    contributions: tuple[Contribution, ...] = ()
    windows: tuple[CommittedWindowSpend, ...] = ()


async def apply_deliveries(
    transaction: LedgerTransaction,
    deliveries: tuple[DeliveryProjection, ...],
    *,
    prisma_client: "PrismaClient",
    writer: "DBSpendUpdateWriter",
    proxy_logging_obj: "ProxyLogging",
) -> AppliedDeliveries:
    from litellm.proxy.guardrails.usage_tracking import UsageUnitIncrement, UsageUnitKey, upsert_usage_unit_row

    contributions: Final = project_deliveries(deliveries)
    await apply_rollup_lock_timeout(transaction)
    await writer.apply_accounting_entities(
        prisma_client, proxy_logging_obj, transaction, entity_transactions(contributions)
    )
    for table in sorted(DAILY_SPEND_TABLES.values(), key=lambda item: item.name):
        rows = tuple(
            {**dict(item.key), **dict(item.values), **dict(item.increments)}
            for item in contributions
            if item.table == table.name
        )
        merged = merge_by_conflict_key(table, rows)
        for offset in range(0, len(merged), 100):
            sql, params = build_bulk_upsert(table, merged[offset : offset + 100])
            async with db_span("upsert_daily_spend", table.name):
                await transaction.execute_raw(sql, *params)
    async with transaction.batch_() as batcher:
        for item in contributions:
            if item.table == "LiteLLM_DailyModelUsage":
                queue_model_usage_upsert(batcher, dict(item.key), dict(item.increments))
    for item in contributions:
        if item.table == "LiteLLM_DailyGuardrailUsageUnits":
            key = dict(item.key)
            counters = dict(item.increments)
            await upsert_usage_unit_row(
                prisma_client,
                UsageUnitKey(key["guardrail_id"], key["date"], key["team_id"], key["api_key"], key["usage_unit"]),
                UsageUnitIncrement(int(counters["units"]), float(counters["cost"]), int(counters["untracked_units"])),
                outer_transaction=transaction,
            )
    windows: Final = tuple(_window(item) for item in contributions if item.table == "LiteLLM_BudgetWindowSpend")
    committed: Final = await commit_window_spend_updates(
        prisma_client, windows, outer_transaction=transaction, capture_spend=bool(CustomerBudgetAlerting.callbacks())
    )
    usages: Final = tuple(usage for delivery in deliveries if (usage := _supplier_usage(delivery)) is not None)
    await accrue_usages(transaction, usages)
    return AppliedDeliveries(contributions, committed)


def _supplier_usage(delivery: DeliveryProjection) -> SupplierUsage | None:
    metadata: Final = delivery.row.get("metadata")
    if not isinstance(metadata, Mapping):
        return None
    snapshot: Final = _METADATA.validate_python(metadata).get("supplier_usage")
    return SupplierUsage.model_validate(snapshot) if snapshot is not None else None


def _window(item: Contribution) -> WindowSpendTransaction:
    key: Final = dict(item.key)
    values: Final = dict(item.values)
    started: Final = values["started_at"]
    return build_window_spend_transaction(
        entity_type=key["entity_type"],
        entity_id=key["entity_id"],
        window_duration=key["window_duration"],
        window_start=datetime.fromisoformat((values["window_start"] or "").replace("Z", "+00:00")),
        spend=float(dict(item.increments)["spend"]),
        started_at=datetime.fromisoformat(started.replace("Z", "+00:00")) if started else None,
        reset_at=values.get("reset_at"),
    )
