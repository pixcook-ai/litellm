from datetime import timedelta
from decimal import Context, Decimal, localcontext
from typing import Final
from uuid import uuid4

from pydantic import BaseModel, ConfigDict

from litellm.proxy.supplier_portal.accounting import LEDGER_FIELDS, RATE_FIELDS, SupplierDatabase, SupplierTransaction
from litellm.proxy.supplier_portal.models import (
    AdjustmentInput,
    Application,
    ApplicationInput,
    ApplicationPage,
    ApplicationStatus,
    Failure,
    LedgerEntry,
    LedgerPage,
    Rate,
    RateInput,
    ReviewInput,
    Settlement,
    SettlementInput,
    SettlementPage,
    SupplierOverview,
)

_TIMEOUT: Final = timedelta(seconds=15)
_APPLICATION_FIELDS: Final = (
    "id, owner_user_id, revision, display_name, contact_email, website, endpoint_url, models, capacity, "
    "status, review_note, created_at, updated_at"
)
_SETTLEMENT_FIELDS: Final = "id, supplier_id, amount::text, reference, ledger_ids, created_at"


class _Count(BaseModel):
    model_config = ConfigDict(frozen=True)
    total: int


class _Totals(BaseModel):
    model_config = ConfigDict(frozen=True)
    total_earnings: Decimal
    unsettled_amount: Decimal
    settled_amount: Decimal


async def _lock(transaction: SupplierTransaction, scope: str) -> None:
    await transaction.query_raw("SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtextextended($1, 736517))", scope)


async def _application(transaction: SupplierTransaction, supplier_id: str) -> Application | None:
    rows: Final = await transaction.query_raw(
        f'SELECT {_APPLICATION_FIELDS} FROM "LiteLLM_SupplierAccount" WHERE id = $1', supplier_id
    )
    return Application.model_validate(rows[0]) if rows else None


async def _overview(transaction: SupplierTransaction, application: Application) -> SupplierOverview:
    rates: Final = await transaction.query_raw(
        f'SELECT {RATE_FIELDS} FROM (SELECT DISTINCT ON (model_id) * FROM "LiteLLM_SupplierRate" '
        "WHERE effective_at <= CURRENT_TIMESTAMP ORDER BY model_id, effective_at DESC, id DESC) AS current_rates "
        "WHERE supplier_id = $1 ORDER BY model_id",
        application.id,
    )
    totals: Final = await transaction.query_raw(
        "SELECT COALESCE(SUM(amount), 0)::text AS total_earnings, "
        "COALESCE(SUM(amount) FILTER (WHERE settlement_id IS NULL), 0)::text AS unsettled_amount, "
        "COALESCE(SUM(amount) FILTER (WHERE settlement_id IS NOT NULL), 0)::text AS settled_amount "
        'FROM "LiteLLM_SupplierLedger" WHERE supplier_id = $1',
        application.id,
    )
    amounts: Final = _Totals.model_validate(totals[0])
    return SupplierOverview(
        application=application,
        rates=tuple(Rate.model_validate(row) for row in rates),
        total_earnings=amounts.total_earnings,
        unsettled_amount=amounts.unsettled_amount,
        settled_amount=amounts.settled_amount,
    )


class SupplierStore:
    def __init__(self, database: SupplierDatabase) -> None:
        self.database = database

    async def submit_application(self, user_id: str, data: ApplicationInput) -> Application | Failure:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            rows: Final = await transaction.query_raw(
                'INSERT INTO "LiteLLM_SupplierAccount" AS account '
                "(id, owner_user_id, display_name, contact_email, website, endpoint_url, models, capacity) "
                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) "
                "ON CONFLICT (owner_user_id) DO UPDATE SET display_name = EXCLUDED.display_name, "
                "contact_email = EXCLUDED.contact_email, website = EXCLUDED.website, "
                "endpoint_url = EXCLUDED.endpoint_url, models = EXCLUDED.models, capacity = EXCLUDED.capacity, "
                "status = 'pending', review_note = NULL, reviewed_by = NULL, updated_at = clock_timestamp() "
                ", revision = account.revision + 1 "
                "WHERE account.status IN ('pending', 'rejected') "
                f"RETURNING {_APPLICATION_FIELDS}",
                str(uuid4()),
                user_id,
                data.display_name,
                data.contact_email,
                str(data.website),
                str(data.endpoint_url),
                data.models,
                data.capacity,
            )
            if not rows:
                return Failure(code="conflict", message="An approved application cannot be resubmitted")
            return Application.model_validate(rows[0])

    async def get_for_user(self, user_id: str) -> SupplierOverview | None:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            rows: Final = await transaction.query_raw(
                f'SELECT {_APPLICATION_FIELDS} FROM "LiteLLM_SupplierAccount" WHERE owner_user_id = $1',
                user_id,
            )
            return await _overview(transaction, Application.model_validate(rows[0])) if rows else None

    async def list_applications(
        self, *, status: ApplicationStatus | None = None, limit: int = 50, offset: int = 0
    ) -> ApplicationPage:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            count: Final = await transaction.query_raw(
                'SELECT COUNT(*) AS total FROM "LiteLLM_SupplierAccount" WHERE ($1::text IS NULL OR status = $1)',
                status,
            )
            rows: Final = await transaction.query_raw(
                f'SELECT {_APPLICATION_FIELDS} FROM "LiteLLM_SupplierAccount" '
                "WHERE ($1::text IS NULL OR status = $1) ORDER BY created_at DESC, id DESC LIMIT $2 OFFSET $3",
                status,
                limit,
                offset,
            )
            return ApplicationPage(
                items=tuple(Application.model_validate(row) for row in rows),
                total=_Count.model_validate(count[0]).total,
                limit=limit,
                offset=offset,
            )

    async def review_application(self, supplier_id: str, data: ReviewInput, admin_id: str) -> Application | Failure:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            application: Final = await _application(transaction, supplier_id)
            if application is None:
                return Failure(code="not_found", message="Supplier application not found")
            rows: Final = await transaction.query_raw(
                'UPDATE "LiteLLM_SupplierAccount" '
                "SET status = $2, review_note = $3, reviewed_by = $4, updated_at = clock_timestamp(), "
                "revision = revision + 1 "
                f"WHERE id = $1 AND status = 'pending' AND revision = $5 RETURNING {_APPLICATION_FIELDS}",
                supplier_id,
                data.status,
                data.review_note or None,
                admin_id,
                data.expected_revision,
            )
            if not rows:
                return Failure(
                    code="conflict", message="The application changed or is no longer pending. Reload it before review"
                )
            return Application.model_validate(rows[0])

    async def publish_rate(self, data: RateInput, admin_id: str) -> Rate | Failure:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            await _lock(transaction, f"supplier-rate:{data.model_id}")
            application: Final = await _application(transaction, data.supplier_id)
            if application is None:
                return Failure(code="not_found", message="Supplier application not found")
            if application.status != "approved":
                return Failure(code="conflict", message="Only approved suppliers can receive a deployment quote")
            rows: Final = await transaction.query_raw(
                'INSERT INTO "LiteLLM_SupplierRate" '
                "(id, supplier_id, model_id, input_per_million, output_per_million, cache_read_per_million, "
                "cache_write_per_million, effective_at, created_by) "
                "VALUES ($1, $2, $3, $4::numeric, $5::numeric, $6::numeric, $7::numeric, clock_timestamp(), $8) "
                f"RETURNING {RATE_FIELDS}",
                str(uuid4()),
                data.supplier_id,
                data.model_id,
                str(data.input_per_million),
                str(data.output_per_million),
                str(data.cache_read_per_million),
                str(data.cache_write_per_million),
                admin_id,
            )
            return Rate.model_validate(rows[0])

    async def overview(self, supplier_id: str) -> SupplierOverview | None:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            application: Final = await _application(transaction, supplier_id)
            return await _overview(transaction, application) if application is not None else None

    async def ledger(
        self, supplier_id: str, *, limit: int = 50, offset: int = 0, unsettled_only: bool = False
    ) -> LedgerPage:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            count: Final = await transaction.query_raw(
                'SELECT COUNT(*) AS total FROM "LiteLLM_SupplierLedger" '
                "WHERE supplier_id = $1 AND ($2::boolean IS FALSE OR settlement_id IS NULL)",
                supplier_id,
                unsettled_only,
            )
            rows: Final = await transaction.query_raw(
                f'SELECT {LEDGER_FIELDS} FROM "LiteLLM_SupplierLedger" '
                "WHERE supplier_id = $1 AND ($2::boolean IS FALSE OR settlement_id IS NULL) "
                "ORDER BY created_at DESC, id DESC LIMIT $3 OFFSET $4",
                supplier_id,
                unsettled_only,
                limit,
                offset,
            )
            return LedgerPage(
                items=tuple(LedgerEntry.model_validate(row) for row in rows),
                total=_Count.model_validate(count[0]).total,
                limit=limit,
                offset=offset,
            )

    async def settlements(self, supplier_id: str, *, limit: int = 50, offset: int = 0) -> SettlementPage:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            count: Final = await transaction.query_raw(
                'SELECT COUNT(*) AS total FROM "LiteLLM_SupplierSettlement" WHERE supplier_id = $1', supplier_id
            )
            rows: Final = await transaction.query_raw(
                f'SELECT {_SETTLEMENT_FIELDS} FROM "LiteLLM_SupplierSettlement" '
                "WHERE supplier_id = $1 ORDER BY created_at DESC, id DESC LIMIT $2 OFFSET $3",
                supplier_id,
                limit,
                offset,
            )
            return SettlementPage(
                items=tuple(Settlement.model_validate(row) for row in rows),
                total=_Count.model_validate(count[0]).total,
                limit=limit,
                offset=offset,
            )

    async def adjust(self, data: AdjustmentInput, admin_id: str) -> LedgerEntry | Failure:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            await _lock(transaction, f"supplier-adjustment:{data.idempotency_key}")
            existing: Final = await transaction.query_raw(
                f'SELECT {LEDGER_FIELDS} FROM "LiteLLM_SupplierLedger" WHERE id = $1',
                f"adjustment:{data.idempotency_key}",
            )
            if existing:
                entry: Final = LedgerEntry.model_validate(existing[0])
                if (
                    entry.supplier_id == data.supplier_id
                    and entry.amount == data.amount
                    and entry.reason == data.reason
                ):
                    return entry
                return Failure(code="conflict", message="The idempotency key was used for a different adjustment")
            application: Final = await _application(transaction, data.supplier_id)
            if application is None:
                return Failure(code="not_found", message="Supplier application not found")
            if application.status != "approved":
                return Failure(code="conflict", message="Only approved suppliers can receive adjustments")
            rows: Final = await transaction.query_raw(
                'INSERT INTO "LiteLLM_SupplierLedger" '
                "(id, supplier_id, kind, amount, reason, created_by) "
                f"VALUES ($1, $2, 'adjustment', $3::numeric, $4, $5) RETURNING {LEDGER_FIELDS}",
                f"adjustment:{data.idempotency_key}",
                data.supplier_id,
                str(data.amount),
                data.reason,
                admin_id,
            )
            return LedgerEntry.model_validate(rows[0])

    async def settle(self, data: SettlementInput, admin_id: str) -> Settlement | Failure:
        async with self.database.tx(timeout=_TIMEOUT) as transaction:
            await _lock(transaction, f"supplier-settlement:{data.idempotency_key}")
            await _lock(transaction, f"supplier-balance:{data.supplier_id}")
            existing: Final = await transaction.query_raw(
                f'SELECT {_SETTLEMENT_FIELDS} FROM "LiteLLM_SupplierSettlement" WHERE id = $1',
                str(data.idempotency_key),
            )
            if existing:
                settlement: Final = Settlement.model_validate(existing[0])
                if (
                    settlement.supplier_id == data.supplier_id
                    and settlement.ledger_ids == data.ledger_ids
                    and settlement.reference == data.reference
                ):
                    return settlement
                return Failure(code="conflict", message="The idempotency key was used for a different settlement")
            rows: Final = await transaction.query_raw(
                f'SELECT {LEDGER_FIELDS} FROM "LiteLLM_SupplierLedger" '
                "WHERE supplier_id = $1 AND id = ANY($2::text[]) ORDER BY id FOR UPDATE",
                data.supplier_id,
                list(data.ledger_ids),
            )
            entries: Final = tuple(LedgerEntry.model_validate(row) for row in rows)
            if len(entries) != len(data.ledger_ids) or any(entry.settlement_id is not None for entry in entries):
                return Failure(
                    code="conflict", message="Every selected entry must be unpaid and belong to this supplier"
                )
            with localcontext(Context(prec=100)):
                amount: Final = sum((entry.amount for entry in entries), Decimal(0))
            if amount <= 0:
                return Failure(code="invalid_request", message="A settlement must have a positive total")
            if amount.adjusted() >= 35:
                return Failure(code="invalid_request", message="The settlement exceeds supported amount precision")
            inserted: Final = await transaction.query_raw(
                'INSERT INTO "LiteLLM_SupplierSettlement" '
                "(id, supplier_id, amount, reference, ledger_ids, created_by) "
                f"VALUES ($1, $2, $3::numeric, $4, $5::text[], $6) RETURNING {_SETTLEMENT_FIELDS}",
                str(data.idempotency_key),
                data.supplier_id,
                str(amount),
                data.reference,
                list(data.ledger_ids),
                admin_id,
            )
            await transaction.execute_raw(
                'UPDATE "LiteLLM_SupplierLedger" SET settlement_id = $1 WHERE id = ANY($2::text[])',
                str(data.idempotency_key),
                list(data.ledger_ids),
            )
            return Settlement.model_validate(inserted[0])
