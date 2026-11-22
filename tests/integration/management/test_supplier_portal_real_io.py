import asyncio
from collections.abc import AsyncIterator, Iterator, Mapping, Sequence
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from itertools import count
from pathlib import Path
from types import TracebackType
from typing import TYPE_CHECKING, Final, Protocol
from uuid import uuid4

import psycopg
import pytest
import pytest_asyncio
from pydantic import TypeAdapter

from litellm.proxy.supplier_portal.accounting import SupplierTransaction, accrue_usage, accrue_usages
from litellm.proxy.supplier_portal.models import (
    AdjustmentInput,
    Application,
    ApplicationInput,
    Failure,
    LedgerEntry,
    Rate,
    RateInput,
    ReviewInput,
    Settlement,
    SettlementInput,
    SupplierUsage,
)
from litellm.proxy.supplier_portal.store import SupplierStore
from tests.integration._support.database import scratch_database
from tests.integration._support.prisma_clients import connected_prisma

if TYPE_CHECKING:
    from prisma import Prisma

_MIGRATION: Final = Path(__file__).resolve().parents[3] / (
    "litellm/proxy-extras/litellm_proxy_extras/migrations/20261123000000_supplier_portal/migration.sql"
)
_TIMEOUT: Final = timedelta(seconds=30)
_APPLICATION: Final = ApplicationInput(
    display_name="Integration supplier",
    contact_email="supplier@example.test",
    website="https://example.test",
    endpoint_url="https://api.example.test/v1",
    models="Text generation",
    capacity="Integration test only",
)
_INTEGER_ROWS: Final = TypeAdapter(tuple[Mapping[str, int], ...])


@dataclass(frozen=True, slots=True)
class _Database:
    client: "Prisma"
    url: str = field(repr=False)


@pytest_asyncio.fixture(loop_scope="function")
async def supplier_database() -> AsyncIterator[_Database]:
    with scratch_database("supplier_portal") as url:
        with psycopg.connect(url, autocommit=True) as connection:
            connection.execute(_MIGRATION.read_bytes())
        async with connected_prisma(url) as client:
            yield _Database(client, url)


async def _approved(store: SupplierStore, user_id: str = "supplier-owner") -> Application:
    application: Final = await store.submit_application(user_id, _APPLICATION)
    assert isinstance(application, Application), application
    approved: Final = await store.review_application(
        application.id, ReviewInput(status="approved", expected_revision=application.revision), "administrator"
    )
    assert isinstance(approved, Application), approved
    return approved


async def _quote(
    store: SupplierStore, supplier_id: str, *, multiplier: Decimal = Decimal(1), model_id: str = "deployment-one"
) -> Rate:
    rate: Final = await store.publish_rate(
        RateInput(
            supplier_id=supplier_id,
            model_id=model_id,
            input_per_million=Decimal("2") * multiplier,
            output_per_million=Decimal("8") * multiplier,
            cache_read_per_million=Decimal("0.5") * multiplier,
            cache_write_per_million=Decimal("3") * multiplier,
        ),
        "administrator",
    )
    assert isinstance(rate, Rate), rate
    return rate


def _usage(rate: Rate, request_id: str) -> SupplierUsage:
    return SupplierUsage(
        request_id=request_id,
        model_id=rate.model_id,
        started_at=rate.effective_at,
        prompt_tokens=1200,
        completion_tokens=50,
        cache_read_tokens=300,
        cache_write_tokens=100,
    )


async def _accrue(client: "Prisma", usage: SupplierUsage) -> LedgerEntry | None:
    async with client.tx(timeout=_TIMEOUT) as transaction:
        return await accrue_usage(transaction, usage)


@dataclass(frozen=True, slots=True)
class _CountingTransaction:
    transaction: SupplierTransaction
    queries: Iterator[int]

    async def query_raw(self, query: str, *args: object) -> Sequence[Mapping[str, object]]:
        next(self.queries)
        return await self.transaction.query_raw(query, *args)

    async def execute_raw(self, query: str, *args: object) -> int:
        next(self.queries)
        return await self.transaction.execute_raw(query, *args)


async def _batch(client: "Prisma", usages: tuple[SupplierUsage, ...]) -> tuple[tuple[LedgerEntry, ...], int]:
    queries: Final = count()
    async with client.tx(timeout=_TIMEOUT) as transaction:
        entries: Final = await accrue_usages(_CountingTransaction(transaction, queries), usages)
    return entries, next(queries)


@pytest.mark.asyncio
@pytest.mark.parametrize("batch_size", (1, 500))
async def test_unquoted_batches_have_constant_additional_database_round_trips(
    supplier_database: _Database, batch_size: int
) -> None:
    usages: Final = tuple(
        SupplierUsage(
            request_id=f"unquoted-attempt-{index}",
            model_id=f"unquoted-model-{index % 7}",
            started_at=datetime(2025, 1, 1, tzinfo=timezone.utc),
            prompt_tokens=100,
            completion_tokens=50,
        )
        for index in range(batch_size)
    )
    entries, queries = await _batch(supplier_database.client, usages)
    assert entries == () and queries == 2
    empty_entries, empty_queries = await _batch(supplier_database.client, ())
    assert empty_entries == () and empty_queries == 0


@pytest.mark.asyncio
async def test_batch_accrual_keeps_each_suppliers_historical_quote_and_deduplicates_attempts(
    supplier_database: _Database,
) -> None:
    store: Final = SupplierStore(supplier_database.client)
    first: Final = await _approved(store, "first-owner")
    second: Final = await _approved(store, "second-owner")
    historical: Final = await _quote(store, first.id)
    latest: Final = await _quote(store, first.id, multiplier=Decimal(10))
    other: Final = await _quote(store, second.id, model_id="deployment-two", multiplier=Decimal(2))
    old_usage: Final = _usage(historical, "old-attempt")
    usages: Final = (
        old_usage,
        _usage(latest, "latest-attempt"),
        _usage(other, "other-attempt"),
        old_usage,
        old_usage.model_copy(update={"request_id": "unquoted", "model_id": "unquoted-model"}),
        old_usage.model_copy(
            update={
                "request_id": "empty",
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "cache_read_tokens": 0,
                "cache_write_tokens": 0,
            }
        ),
    )
    entries, queries = await _batch(supplier_database.client, usages)
    assert len(entries) == 3 and queries == 3
    by_request: Final = {entry.request_id: entry for entry in entries}
    assert by_request["old-attempt"].rate_id == historical.id
    assert by_request["old-attempt"].amount == Decimal("0.00245")
    assert by_request["latest-attempt"].rate_id == latest.id
    assert by_request["latest-attempt"].amount == Decimal("0.0245")
    assert by_request["other-attempt"].supplier_id == second.id
    assert by_request["other-attempt"].amount == Decimal("0.0049")
    replay, replay_queries = await _batch(supplier_database.client, tuple(reversed(usages)))
    assert frozenset(replay) == frozenset(entries) and replay_queries == 4
    assert (await store.ledger(first.id)).total == 2
    assert (await store.ledger(second.id)).total == 1


@pytest.mark.asyncio
async def test_oppositely_ordered_batches_accrue_shared_attempts_once_across_connections(
    supplier_database: _Database,
) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    first: Final = await _quote(store, supplier.id, model_id="first-model")
    second: Final = await _quote(store, supplier.id, model_id="second-model")
    usages: Final = (_usage(first, "first-attempt"), _usage(second, "second-attempt"))
    async with (
        connected_prisma(supplier_database.url) as first_client,
        connected_prisma(supplier_database.url) as second_client,
    ):
        async with asyncio.timeout(10), asyncio.TaskGroup() as tasks:
            forward: Final = tasks.create_task(_batch(first_client, usages))
            backward: Final = tasks.create_task(_batch(second_client, tuple(reversed(usages))))
    assert frozenset(forward.result()[0]) == frozenset(backward.result()[0])
    assert len(forward.result()[0]) == 2
    assert forward.result()[1] <= 4 and backward.result()[1] <= 4
    assert (await store.ledger(supplier.id)).total == 2


@pytest.mark.asyncio
async def test_supply_earnings_keep_exact_cache_prices_and_request_time_quotes(supplier_database: _Database) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    quote: Final = await _quote(store, supplier.id)
    usage: Final = _usage(quote, "attempt-one")
    first: Final = await _accrue(supplier_database.client, usage)
    assert isinstance(first, LedgerEntry) and first.amount == Decimal("0.00245"), first
    assert await _accrue(supplier_database.client, usage) == first

    updated_quote: Final = await _quote(store, supplier.id, multiplier=Decimal(10))
    delayed: Final = await _accrue(supplier_database.client, _usage(quote, "delayed-old-attempt"))
    current: Final = await _accrue(supplier_database.client, _usage(updated_quote, "new-attempt"))
    assert isinstance(delayed, LedgerEntry) and delayed.rate_id == quote.id and delayed.amount == first.amount
    assert isinstance(current, LedgerEntry) and current.rate_id == updated_quote.id
    assert current.amount == Decimal("0.0245")
    page: Final = await store.ledger(supplier.id)
    assert page.total == 3
    assert frozenset(entry.id for entry in page.items) == frozenset((first.id, delayed.id, current.id))
    before_quote: Final = usage.model_copy(
        update={"request_id": "before-quote", "started_at": quote.effective_at - timedelta(microseconds=1)}
    )
    assert await _accrue(supplier_database.client, before_quote) is None
    unbound: Final = usage.model_copy(update={"request_id": "unbound-attempt", "model_id": "unbound-deployment"})
    assert await _accrue(supplier_database.client, unbound) is None
    assert (await store.ledger(supplier.id)).total == page.total


@pytest.mark.asyncio
@pytest.mark.parametrize("decision", ("approved", "rejected"))
async def test_review_requires_the_revision_the_administrator_read(supplier_database: _Database, decision: str) -> None:
    store: Final = SupplierStore(supplier_database.client)
    original: Final = await store.submit_application("supplier-owner", _APPLICATION)
    assert isinstance(original, Application), original
    revised: Final = await store.submit_application(
        original.owner_user_id, _APPLICATION.model_copy(update={"models": "A revised model offering"})
    )
    assert isinstance(revised, Application) and revised.revision == original.revision + 1
    stale: Final = await store.review_application(
        original.id,
        ReviewInput.model_validate(
            {"status": decision, "expected_revision": original.revision, "review_note": "Reviewed original details"}
        ),
        "administrator",
    )
    assert isinstance(stale, Failure) and stale.code == "conflict"
    unchanged: Final = await store.get_for_user(original.owner_user_id)
    assert unchanged is not None and unchanged.application == revised
    reviewed: Final = await store.review_application(
        revised.id,
        ReviewInput.model_validate(
            {"status": decision, "expected_revision": revised.revision, "review_note": "Reviewed revised details"}
        ),
        "administrator",
    )
    assert isinstance(reviewed, Application) and reviewed.status == decision
    assert reviewed.revision == revised.revision + 1


@pytest.mark.asyncio
async def test_adjustment_idempotency_rejects_a_changed_amount_or_explanation(supplier_database: _Database) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    body: Final = AdjustmentInput(
        supplier_id=supplier.id, amount=Decimal("0.1"), reason="Correct an earlier entry", idempotency_key=uuid4()
    )
    recorded: Final = await store.adjust(body, "administrator")
    assert isinstance(recorded, LedgerEntry) and recorded.amount == body.amount
    assert await store.adjust(body, "administrator") == recorded
    changed_amount: Final = await store.adjust(body.model_copy(update={"amount": Decimal("0.2")}), "administrator")
    changed_reason: Final = await store.adjust(
        body.model_copy(update={"reason": "A different correction"}), "administrator"
    )
    assert isinstance(changed_amount, Failure) and changed_amount.code == "conflict"
    assert isinstance(changed_reason, Failure) and changed_reason.code == "conflict"
    ledger: Final = await store.ledger(supplier.id)
    assert ledger.total == 1 and ledger.items == (recorded,)


@pytest.mark.asyncio
async def test_settlement_replay_cannot_change_the_supplier_reference_or_selected_entries(
    supplier_database: _Database,
) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    credit: Final = await store.adjust(
        AdjustmentInput(supplier_id=supplier.id, amount=Decimal("0.01"), reason="Credit", idempotency_key=uuid4()),
        "administrator",
    )
    assert isinstance(credit, LedgerEntry), credit
    body: Final = SettlementInput(
        supplier_id=supplier.id, ledger_ids=(credit.id,), reference="transfer-one", idempotency_key=uuid4()
    )
    first: Final = await store.settle(body, "administrator")
    assert isinstance(first, Settlement) and first.amount == credit.amount
    assert await store.settle(body, "administrator") == first
    for updated in (
        body.model_copy(update={"supplier_id": "another-supplier"}),
        body.model_copy(update={"reference": "transfer-two"}),
        body.model_copy(update={"ledger_ids": ("another-entry",)}),
    ):
        conflict: Final = await store.settle(updated, "administrator")
        assert isinstance(conflict, Failure) and conflict.code == "conflict"
    settlements: Final = await store.settlements(supplier.id)
    assert settlements.total == 1 and settlements.items == (first,)


@pytest.mark.asyncio
async def test_unknown_supplier_and_owner_cannot_read_an_existing_suppliers_balances(
    supplier_database: _Database,
) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    credit: Final = await store.adjust(
        AdjustmentInput(supplier_id=supplier.id, amount=Decimal("0.01"), reason="Credit", idempotency_key=uuid4()),
        "administrator",
    )
    assert isinstance(credit, LedgerEntry), credit
    known: Final = await store.get_for_user(supplier.owner_user_id)
    assert known is not None and known.unsettled_amount == credit.amount
    assert await store.get_for_user("unknown-owner") is None
    assert await store.overview("unknown-supplier") is None
    assert (await store.ledger("unknown-supplier")).total == 0
    assert (await store.settlements("unknown-supplier")).total == 0


class _PendingOperation(Protocol):
    def done(self) -> bool: ...


async def _wait_for_contention(url: str, blocking_pid: int, operations: tuple[_PendingOperation, ...]) -> None:
    async with await psycopg.AsyncConnection.connect(url, autocommit=True) as watcher:
        async with asyncio.timeout(10):
            while True:
                cursor: Final = await watcher.execute(
                    "WITH RECURSIVE blocked(pid) AS ("
                    "SELECT pid FROM pg_stat_activity WHERE %s = ANY(pg_blocking_pids(pid)) "
                    "UNION SELECT activity.pid FROM pg_stat_activity AS activity "
                    "JOIN blocked ON blocked.pid = ANY(pg_blocking_pids(activity.pid))) "
                    "SELECT count(*)::integer FROM blocked",
                    (blocking_pid,),
                )
                observed: Final = await cursor.fetchone()
                if observed is not None and observed[0] == len(operations):
                    return
                assert not any(operation.done() for operation in operations), (
                    "An operation bypassed the held transaction"
                )
                await asyncio.sleep(0.01)


@pytest.mark.asyncio
async def test_concurrent_settlements_pay_each_ledger_entry_only_once(supplier_database: _Database) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    credit: Final = await store.adjust(
        AdjustmentInput(supplier_id=supplier.id, amount=Decimal("0.01"), reason="Credit", idempotency_key=uuid4()),
        "administrator",
    )
    debit: Final = await store.adjust(
        AdjustmentInput(
            supplier_id=supplier.id, amount=Decimal("-0.003"), reason="Correction", idempotency_key=uuid4()
        ),
        "administrator",
    )
    assert isinstance(credit, LedgerEntry) and isinstance(debit, LedgerEntry)
    requests: Final = tuple(
        SettlementInput(
            supplier_id=supplier.id,
            ledger_ids=(credit.id, debit.id),
            reference=f"transfer-{index}",
            idempotency_key=uuid4(),
        )
        for index in range(2)
    )
    async with connected_prisma(supplier_database.url) as first, connected_prisma(supplier_database.url) as second:
        async with asyncio.TaskGroup() as tasks:
            async with supplier_database.client.tx(timeout=_TIMEOUT) as blocker:
                await blocker.query_raw(
                    'SELECT id FROM "LiteLLM_SupplierLedger" WHERE supplier_id = $1 FOR UPDATE',
                    supplier.id,
                )
                pid: Final = _INTEGER_ROWS.validate_python(await blocker.query_raw("SELECT pg_backend_pid() AS pid"))[
                    0
                ]["pid"]
                paying_first: Final = tasks.create_task(SupplierStore(first).settle(requests[0], "administrator"))
                paying_second: Final = tasks.create_task(SupplierStore(second).settle(requests[1], "administrator"))
                await _wait_for_contention(supplier_database.url, pid, (paying_first, paying_second))
    results: Final = (paying_first.result(), paying_second.result())
    paid: Final = tuple(result for result in results if isinstance(result, Settlement))
    failed: Final = tuple(result for result in results if isinstance(result, Failure))
    assert len(paid) == 1 and len(failed) == 1 and failed[0].code == "conflict", results
    assert paid[0].amount == Decimal("0.007")
    ledger: Final = await store.ledger(supplier.id)
    assert ledger.total == 2 and all(entry.settlement_id == paid[0].id for entry in ledger.items)
    overview: Final = await store.overview(supplier.id)
    assert overview is not None and overview.unsettled_amount == 0 and overview.settled_amount == paid[0].amount


@dataclass(frozen=True, slots=True)
class _OpenTransaction:
    transaction: SupplierTransaction

    async def __aenter__(self) -> SupplierTransaction:
        return self.transaction

    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None
    ) -> None:
        return None


@dataclass(frozen=True, slots=True)
class _PublicationDatabase:
    transaction: SupplierTransaction

    def tx(self, *, timeout: timedelta) -> _OpenTransaction:
        return _OpenTransaction(self.transaction)


@pytest.mark.asyncio
@pytest.mark.parametrize("has_previous_quote", (False, True))
async def test_accrual_waits_for_an_effective_quote_to_commit_before_reading_its_price(
    supplier_database: _Database, has_previous_quote: bool
) -> None:
    store: Final = SupplierStore(supplier_database.client)
    supplier: Final = await _approved(store)
    if has_previous_quote:
        await _quote(store, supplier.id)
    async with connected_prisma(supplier_database.url) as consumer:
        async with asyncio.TaskGroup() as tasks:
            async with supplier_database.client.tx(timeout=_TIMEOUT) as publication:
                publishing_store: Final = SupplierStore(_PublicationDatabase(publication))
                published: Final = await _quote(publishing_store, supplier.id, multiplier=Decimal(10))
                pid: Final = _INTEGER_ROWS.validate_python(
                    await publication.query_raw("SELECT pg_backend_pid() AS pid")
                )[0]["pid"]
                accruing: Final = tasks.create_task(_accrue(consumer, _usage(published, "publication-race")))
                await _wait_for_contention(supplier_database.url, pid, (accruing,))
    recorded: Final = accruing.result()
    assert isinstance(recorded, LedgerEntry), recorded
    assert recorded.rate_id == published.id and recorded.amount == Decimal("0.0245")
