from collections.abc import Mapping, Sequence
from datetime import timedelta
from decimal import Context, Decimal, localcontext
from types import MappingProxyType, TracebackType
from typing import Final, Protocol

from pydantic import TypeAdapter

from litellm.litellm_core_utils.safe_json_dumps import safe_dumps
from litellm.proxy.supplier_portal.models import LedgerEntry, PortalModel, Rate, SupplierUsage


class SupplierTransaction(Protocol):
    async def query_raw(self, query: str, *args: object) -> Sequence[Mapping[str, object]]: ...

    async def execute_raw(self, query: str, *args: object) -> int: ...


class _SupplierTransactionContext(Protocol):
    async def __aenter__(self) -> SupplierTransaction: ...

    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None, /
    ) -> None: ...


class SupplierDatabase(Protocol):
    def tx(self, *, timeout: timedelta) -> _SupplierTransactionContext: ...


RATE_FIELDS: Final = (
    "id, supplier_id, model_id, input_per_million::text, output_per_million::text, "
    "cache_read_per_million::text, cache_write_per_million::text, "
    "to_json(effective_at) #>> '{}' AS effective_at"
)
LEDGER_FIELDS: Final = (
    "id, supplier_id, kind, request_id, rate_id, model_id, prompt_tokens, completion_tokens, "
    "cache_read_tokens, cache_write_tokens, amount::text, reason, settlement_id, created_at"
)


def calculate_amount(usage: SupplierUsage, rate: Rate) -> Decimal:
    with localcontext(Context(prec=100)):
        return (
            (usage.prompt_tokens - usage.cache_read_tokens - usage.cache_write_tokens) * rate.input_per_million
            + usage.completion_tokens * rate.output_per_million
            + usage.cache_read_tokens * rate.cache_read_per_million
            + usage.cache_write_tokens * rate.cache_write_per_million
        ) / Decimal(1_000_000)


class _QuotedUsage(PortalModel):
    request_id: str
    rate: Rate


_QUOTED_USAGES: Final = TypeAdapter(tuple[_QuotedUsage, ...])
_LEDGER_ENTRIES: Final = TypeAdapter(tuple[LedgerEntry, ...])


def _ordered_entries(quoted: tuple[_QuotedUsage, ...], entries: tuple[LedgerEntry, ...]) -> tuple[LedgerEntry, ...]:
    by_id: Final = MappingProxyType({entry.id: entry for entry in entries})
    return tuple(by_id[f"usage:{item.request_id}"] for item in quoted)


async def accrue_usages(transaction: SupplierTransaction, usages: tuple[SupplierUsage, ...]) -> tuple[LedgerEntry, ...]:
    by_id: Final = MappingProxyType(
        {usage.request_id: usage for usage in usages if usage.prompt_tokens or usage.completion_tokens}
    )
    if not by_id:
        return ()
    model_ids: Final = tuple(sorted(frozenset(usage.model_id for usage in by_id.values())))
    await transaction.query_raw(
        "WITH models AS MATERIALIZED (SELECT model_id FROM unnest($1::text[]) AS names(model_id) ORDER BY model_id) "
        "SELECT count(*) AS locked FROM models CROSS JOIN LATERAL "
        "pg_advisory_xact_lock_shared(hashtextextended('supplier-rate:' || models.model_id, 736517)) AS held",
        list(model_ids),
    )
    lookups: Final = tuple(
        {"request_id": usage.request_id, "model_id": usage.model_id, "started_at": usage.started_at.isoformat()}
        for usage in by_id.values()
    )
    quoted: Final = _QUOTED_USAGES.validate_python(
        await transaction.query_raw(
            "SELECT inputs.request_id, row_to_json(quote) AS rate "
            "FROM jsonb_to_recordset($1::jsonb) AS inputs(request_id text, model_id text, started_at timestamptz) "
            f'JOIN LATERAL (SELECT {RATE_FIELDS} FROM "LiteLLM_SupplierRate" AS rates '
            "WHERE model_id = inputs.model_id AND effective_at <= inputs.started_at "
            "ORDER BY rates.effective_at DESC, rates.id DESC LIMIT 1) AS quote ON TRUE",
            safe_dumps(lookups),
        )
    )
    if not quoted:
        return ()
    payload: Final = tuple(
        {
            "id": f"usage:{item.request_id}",
            "supplier_id": item.rate.supplier_id,
            "request_id": item.request_id,
            "rate_id": item.rate.id,
            "model_id": item.rate.model_id,
            "prompt_tokens": by_id[item.request_id].prompt_tokens,
            "completion_tokens": by_id[item.request_id].completion_tokens,
            "cache_read_tokens": by_id[item.request_id].cache_read_tokens,
            "cache_write_tokens": by_id[item.request_id].cache_write_tokens,
            "amount": str(calculate_amount(by_id[item.request_id], item.rate)),
        }
        for item in quoted
    )
    inserted: Final = _LEDGER_ENTRIES.validate_python(
        await transaction.query_raw(
            'INSERT INTO "LiteLLM_SupplierLedger" '
            "(id, supplier_id, kind, request_id, rate_id, model_id, prompt_tokens, completion_tokens, "
            "cache_read_tokens, cache_write_tokens, amount) "
            "SELECT id, supplier_id, 'usage', request_id, rate_id, model_id, prompt_tokens, completion_tokens, "
            "cache_read_tokens, cache_write_tokens, amount FROM jsonb_to_recordset($1::jsonb) AS entries("
            "id text, supplier_id text, request_id text, rate_id text, model_id text, prompt_tokens bigint, "
            "completion_tokens bigint, cache_read_tokens bigint, cache_write_tokens bigint, amount numeric) "
            f"ORDER BY id ON CONFLICT (id) DO NOTHING RETURNING {LEDGER_FIELDS}",
            safe_dumps(payload),
        )
    )
    if len(inserted) == len(quoted):
        return _ordered_entries(quoted, inserted)
    persisted: Final = _LEDGER_ENTRIES.validate_python(
        await transaction.query_raw(
            f'SELECT {LEDGER_FIELDS} FROM "LiteLLM_SupplierLedger" WHERE id = ANY($1::text[])',
            [f"usage:{item.request_id}" for item in quoted],
        )
    )
    return _ordered_entries(quoted, persisted)


async def accrue_usage(transaction: SupplierTransaction, usage: SupplierUsage) -> LedgerEntry | None:
    entries: Final = await accrue_usages(transaction, (usage,))
    return entries[0] if entries else None
