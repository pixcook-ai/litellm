from collections.abc import Mapping, Sequence
from contextlib import closing
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from sqlite3 import connect
from types import TracebackType
from typing import Final, Protocol

import pytest
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.testclient import TestClient
from pydantic import TypeAdapter

from litellm import Router
from litellm.proxy._types import LiteLLM_UserTable, LitellmUserRoles, UserAPIKeyAuth
from litellm.proxy.auth.route_checks import RouteChecks
from litellm.proxy.auth.user_api_key_auth import user_api_key_auth
from litellm.proxy.list_api.common import ManagementProblem, problem_response
from litellm.proxy.supplier_portal.accounting import SupplierDatabase
from litellm.proxy.supplier_portal.endpoints import (
    DeploymentLookup,
    deployment_exists,
    get_deployment_lookup,
    get_supplier_store,
    router,
    supplier_accounting_enabled,
)
from litellm.proxy.supplier_portal.models import Application, LedgerEntry, LedgerPage, SupplierOverview
from litellm.proxy.supplier_portal.store import SupplierStore

NOW: Final = datetime(2026, 1, 2, tzinfo=timezone.utc)
_ROW: Final = TypeAdapter(dict[str, object])
_SQL_PARAMETERS: Final = TypeAdapter(dict[str, str | int | None])
_SQL_ROWS: Final = TypeAdapter(tuple[tuple[object, ...], ...])
_SQL_DESCRIPTION: Final = TypeAdapter(tuple[tuple[str, object, object, object, object, object, object], ...])
_BODY: Final = {
    "display_name": "Example supplier",
    "contact_email": "supplier@example.test",
    "website": "https://example.test",
    "endpoint_url": "https://api.example.test/v1",
    "models": "Text generation",
    "capacity": "One thousand tokens per minute",
}


def application(supplier_id: str, owner: str) -> Application:
    return Application(
        id=supplier_id,
        owner_user_id=owner,
        revision=1,
        display_name=f"Supplier {supplier_id}",
        contact_email=f"{owner}@example.test",
        website="https://example.test",
        endpoint_url="https://api.example.test/v1",
        models="Text generation",
        capacity="One thousand tokens per minute",
        status="approved",
        review_note=None,
        created_at=NOW,
        updated_at=NOW,
    )


def ledger_entry(supplier_id: str, amount: str) -> LedgerEntry:
    return LedgerEntry(
        id=f"entry-{supplier_id}",
        supplier_id=supplier_id,
        kind="usage",
        request_id=f"request-{supplier_id}",
        rate_id=f"rate-{supplier_id}",
        model_id=f"model-{supplier_id}",
        prompt_tokens=100,
        completion_tokens=20,
        cache_read_tokens=0,
        cache_write_tokens=0,
        amount=Decimal(amount),
        reason=None,
        settlement_id=None,
        created_at=NOW,
    )


@dataclass(frozen=True, slots=True)
class ReadDatabase:
    accounts: tuple[Application, ...] = ()
    entries: tuple[LedgerEntry, ...] = ()
    unavailable: bool = False

    def tx(self, *, timeout: timedelta) -> "ReadDatabase":
        return self

    async def __aenter__(self) -> "ReadDatabase":
        from prisma.errors import PrismaError

        if self.unavailable:
            raise PrismaError("Database connection details must stay private")
        return self

    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None, /
    ) -> None:
        return None

    async def query_raw(self, query: str, *args: object) -> Sequence[Mapping[str, object]]:
        if "pg_advisory_xact_lock" in query:
            return ({"locked": 1},)
        if '"LiteLLM_SupplierAccount"' in query:
            if "owner_user_id = $1" in query:
                return tuple(
                    _ROW.validate_python(account.model_dump())
                    for account in self.accounts
                    if account.owner_user_id == args[0]
                )
            if "WHERE id = $1" in query:
                return tuple(
                    _ROW.validate_python(account.model_dump()) for account in self.accounts if account.id == args[0]
                )
            if "COUNT(*)" in query:
                return ({"total": len(self.accounts)},)
            return tuple(_ROW.validate_python(account.model_dump()) for account in self.accounts)
        if '"LiteLLM_SupplierRate"' in query:
            return ()
        if '"LiteLLM_SupplierLedger"' in query:
            selected: Final = tuple(entry for entry in self.entries if entry.supplier_id == args[0])
            if "SUM(amount)" in query:
                return (
                    {
                        "total_earnings": str(sum((entry.amount for entry in selected), Decimal(0))),
                        "unsettled_amount": str(sum((entry.amount for entry in selected), Decimal(0))),
                        "settled_amount": "0",
                    },
                )
            if "COUNT(*)" in query:
                return ({"total": len(selected)},)
            return tuple(_ROW.validate_python(entry.model_dump()) for entry in selected)
        if '"LiteLLM_SupplierSettlement"' in query:
            return ({"total": 0},) if "COUNT(*)" in query else ()
        raise AssertionError(f"Unexpected database operation {query}")

    async def execute_raw(self, query: str, *args: object) -> int:
        raise AssertionError("The read-only database cannot execute writes")


class RevisionDatabase:
    def __init__(self, account: Application) -> None:
        self.connection = connect(":memory:", check_same_thread=False)
        self.connection.create_function("clock_timestamp", 0, lambda: NOW.isoformat())
        self.connection.execute(
            'CREATE TABLE "LiteLLM_SupplierAccount" ('
            "id TEXT PRIMARY KEY, owner_user_id TEXT, revision INTEGER, display_name TEXT, "
            "contact_email TEXT, website TEXT, endpoint_url TEXT, models TEXT, capacity TEXT, "
            "status TEXT, review_note TEXT, reviewed_by TEXT, created_at TEXT, updated_at TEXT)"
        )
        values: Final = _SQL_PARAMETERS.validate_python(account.model_dump(mode="json"))
        columns: Final = ", ".join(values)
        bindings: Final = ", ".join(f":{key}" for key in values)
        self.connection.execute(f'INSERT INTO "LiteLLM_SupplierAccount" ({columns}) VALUES ({bindings})', values)
        self.connection.commit()

    def tx(self, *, timeout: timedelta) -> "RevisionDatabase":
        return self

    async def __aenter__(self) -> "RevisionDatabase":
        self.connection.__enter__()
        return self

    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None, /
    ) -> None:
        self.connection.__exit__(exc_type, exc, exc_tb)

    async def query_raw(self, query: str, *args: object) -> Sequence[Mapping[str, object]]:
        parameters: Final = _SQL_PARAMETERS.validate_python({str(index): value for index, value in enumerate(args, 1)})
        cursor: Final = self.connection.execute(query, parameters)
        if cursor.description is None:
            return ()
        description: Final = _SQL_DESCRIPTION.validate_python(cursor.description)
        columns: Final = tuple(column[0] for column in description)
        rows: Final = _SQL_ROWS.validate_python(cursor.fetchall())
        return tuple(dict(zip(columns, row, strict=True)) for row in rows)

    async def execute_raw(self, query: str, *args: object) -> int:
        parameters: Final = _SQL_PARAMETERS.validate_python({str(index): value for index, value in enumerate(args, 1)})
        return self.connection.execute(query, parameters).rowcount

    def close(self) -> None:
        self.connection.close()


def client(
    role: LitellmUserRoles = LitellmUserRoles.INTERNAL_USER,
    owner: str | None = "owner-a",
    database: SupplierDatabase | None = None,
    service_account: bool = False,
    accounting_enabled: bool = True,
    deployment_lookup: DeploymentLookup | None = None,
) -> TestClient:
    app: Final = FastAPI()
    app.include_router(router)
    auth: Final = UserAPIKeyAuth(
        user_id=None if service_account else owner,
        user_role=role,
        team_id="team-a" if service_account else None,
        metadata={"service_account_id": "service-a"} if service_account else {},
    )
    store: Final = SupplierStore(ReadDatabase() if database is None else database)

    async def problem(request: Request, exc: ManagementProblem) -> JSONResponse:
        return problem_response(exc.problem)

    app.exception_handler(ManagementProblem)(problem)

    async def missing_deployment(model_id: str) -> bool:
        return False

    app.dependency_overrides[user_api_key_auth] = lambda: auth
    app.dependency_overrides[get_supplier_store] = lambda: store
    app.dependency_overrides[get_deployment_lookup] = lambda: (
        missing_deployment if deployment_lookup is None else deployment_lookup
    )
    app.dependency_overrides[supplier_accounting_enabled] = lambda: accounting_enabled
    return TestClient(app)


@pytest.mark.parametrize(
    "role",
    (
        LitellmUserRoles.INTERNAL_USER,
        LitellmUserRoles.INTERNAL_USER_VIEW_ONLY,
        LitellmUserRoles.ORG_ADMIN,
        LitellmUserRoles.CUSTOMER,
        LitellmUserRoles.PROXY_ADMIN_VIEW_ONLY,
    ),
)
@pytest.mark.parametrize(
    ("path", "body"),
    (
        ("/supplier/admin/applications/supplier-a/review", {"status": "approved", "expected_revision": 1}),
        (
            "/supplier/admin/rates",
            {
                "supplier_id": "supplier-a",
                "model_id": "model-a",
                "input_per_million": "1",
                "output_per_million": "2",
                "cache_read_per_million": "0.5",
                "cache_write_per_million": "1.5",
            },
        ),
        (
            "/supplier/admin/adjustments",
            {
                "supplier_id": "supplier-a",
                "amount": "-0.02",
                "reason": "Correct a duplicated charge",
                "idempotency_key": "00000000-0000-4000-8000-000000000001",
            },
        ),
        (
            "/supplier/admin/settlements",
            {
                "supplier_id": "supplier-a",
                "ledger_ids": ["entry-a"],
                "reference": "payment-reference",
                "idempotency_key": "00000000-0000-4000-8000-000000000002",
            },
        ),
    ),
)
def test_only_full_proxy_administrators_can_mutate_supplier_records(
    role: LitellmUserRoles, path: str, body: Mapping[str, object]
) -> None:
    response: Final = client(role=role).post(path, json=body)
    assert response.status_code == 403, response.text


@pytest.mark.parametrize("role", (LitellmUserRoles.PROXY_ADMIN_VIEW_ONLY, LitellmUserRoles.INTERNAL_USER_VIEW_ONLY))
def test_read_only_roles_cannot_submit_applications(role: LitellmUserRoles) -> None:
    response: Final = client(role=role).post("/supplier/applications", json=_BODY)
    assert response.status_code == 403, response.text


@pytest.mark.parametrize(("owner", "service_account"), ((None, False), ("owner-a", True)))
def test_supplier_routes_require_an_individual_user_identity(owner: str | None, service_account: bool) -> None:
    http: Final = client(owner=owner, service_account=service_account)
    assert http.get("/supplier/me").status_code == 403
    assert http.post("/supplier/applications", json=_BODY).status_code == 403


def test_an_authenticated_user_without_an_application_receives_null() -> None:
    http: Final = client()
    response: Final = http.get("/supplier/me")
    assert response.status_code == 200, response.text
    assert response.json() is None
    assert http.get("/supplier/ledger").status_code == 404


def test_overview_and_ledger_are_scoped_to_the_authenticated_owner() -> None:
    database: Final = ReadDatabase(
        accounts=(application("supplier-a", "owner-a"), application("supplier-b", "owner-b")),
        entries=(ledger_entry("supplier-a", "0.000123456789"), ledger_entry("supplier-b", "9.9")),
    )
    http: Final = client(database=database)
    response: Final = http.get("/supplier/me")
    assert response.status_code == 200, response.text
    overview: Final = SupplierOverview.model_validate(response.json())
    assert overview.application.id == "supplier-a"
    assert overview.total_earnings == database.entries[0].amount
    assert isinstance(response.json()["total_earnings"], str)
    ledger: Final = http.get("/supplier/ledger")
    assert ledger.status_code == 200, ledger.text
    page: Final = LedgerPage.model_validate(ledger.json())
    assert page.items == (database.entries[0],)
    assert page.total == 1


@pytest.mark.parametrize("path", ("/supplier/me", "/supplier/ledger", "/supplier/settlements"))
def test_supplier_routes_reject_a_foreign_supplier_filter(path: str) -> None:
    response: Final = client().get(path, params={"supplier_id": "supplier-b"})
    assert response.status_code == 400, response.text


def test_application_submission_rejects_a_caller_supplied_owner() -> None:
    response: Final = client().post("/supplier/applications", json={**_BODY, "owner_user_id": "owner-b"})
    assert response.status_code == 422, response.text


@pytest.mark.parametrize("field", ("website", "endpoint_url"))
def test_application_urls_cannot_contain_credentials(field: str) -> None:
    response: Final = client().post("/supplier/applications", json={**_BODY, field: "https://user:secret@example.test"})
    assert response.status_code == 422, response.text


@pytest.mark.parametrize("role", (LitellmUserRoles.INTERNAL_USER, LitellmUserRoles.ORG_ADMIN))
def test_members_cannot_read_supplier_administration(role: LitellmUserRoles) -> None:
    response: Final = client(role=role).get("/supplier/admin/applications")
    assert response.status_code == 403, response.text


def test_admin_viewers_can_read_supplier_applications_and_details() -> None:
    account: Final = application("supplier-b", "owner-b")
    http: Final = client(role=LitellmUserRoles.PROXY_ADMIN_VIEW_ONLY, database=ReadDatabase(accounts=(account,)))
    listing: Final = http.get("/supplier/admin/applications")
    assert listing.status_code == 200, listing.text
    assert listing.json()["items"][0]["id"] == account.id
    detail: Final = http.get(f"/supplier/admin/suppliers/{account.id}")
    assert detail.status_code == 200, detail.text
    assert SupplierOverview.model_validate(detail.json()).application == account
    assert http.get("/supplier/admin/settlements", params={"supplier_id": account.id}).status_code == 200


def test_a_full_administrator_can_reach_application_review() -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN).post(
        "/supplier/admin/applications/missing/review", json={"status": "approved", "expected_revision": 1}
    )
    assert response.status_code == 404, response.text
    assert response.json()["detail"] == "Supplier application not found"


def test_an_outdated_review_cannot_approve_a_resubmitted_application() -> None:
    pending: Final = application("supplier-a", "owner-a").model_copy(
        update={"status": "pending", "revision": 2, "models": "Updated deployment offering"}
    )
    with (
        closing(RevisionDatabase(pending)) as database,
        client(role=LitellmUserRoles.PROXY_ADMIN, database=database) as http,
    ):
        stale: Final = http.post(
            f"/supplier/admin/applications/{pending.id}/review",
            json={"status": "approved", "expected_revision": pending.revision - 1},
        )
        assert stale.status_code == 409, stale.text
        unchanged: Final = TypeAdapter(tuple[str, int, str]).validate_python(
            database.connection.execute(
                'SELECT status, revision, models FROM "LiteLLM_SupplierAccount" WHERE id = ?', (pending.id,)
            ).fetchone()
        )
        assert unchanged == (pending.status, pending.revision, pending.models)
        current: Final = http.post(
            f"/supplier/admin/applications/{pending.id}/review",
            json={"status": "approved", "expected_revision": pending.revision},
        )
        assert current.status_code == 200, current.text
        approved: Final = Application.model_validate(current.json())
        assert approved.status == "approved"
        assert approved.revision == pending.revision + 1


def test_an_application_review_requires_the_revision_shown_to_the_administrator() -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN).post(
        "/supplier/admin/applications/supplier-a/review", json={"status": "approved"}
    )
    assert response.status_code == 422, response.text


@pytest.mark.parametrize(("name", "value"), (("limit", 0), ("limit", 101), ("offset", -1)))
def test_admin_pagination_is_bounded(name: str, value: int) -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN).get(
        "/supplier/admin/applications", params={name: value}
    )
    assert response.status_code == 422, response.text


def test_publishing_a_quote_requires_an_existing_deployment() -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN).post(
        "/supplier/admin/rates",
        json={
            "supplier_id": "supplier-a",
            "model_id": "missing-model",
            "input_per_million": "1",
            "output_per_million": "2",
            "cache_read_per_million": "0.5",
            "cache_write_per_million": "1.5",
        },
    )
    assert response.status_code == 404, response.text
    assert response.json()["detail"] == (
        "The deployment is unavailable or not using a supported OpenAI-compatible adapter."
    )


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ("model", "provider", "supported"),
    (
        ("openai/supplier-model", None, True),
        ("supplier-model", "openai", True),
        ("anthropic/supplier-model", "openai", True),
        ("openai/supplier-model", "anthropic", False),
        ("openai/supplier-model", "azure", False),
        ("anthropic/supplier-model", None, False),
        ("azure/supplier-model", None, False),
        ("openrouter/vendor/supplier-model", None, False),
    ),
)
async def test_supplier_quotes_require_the_effective_openai_adapter(
    monkeypatch: pytest.MonkeyPatch, model: str, provider: str | None, supported: bool
) -> None:
    from litellm.proxy import proxy_server

    configured: Final = Router(
        model_list=[
            {
                "model_name": "supplier-model",
                "litellm_params": {
                    "model": model,
                    "custom_llm_provider": provider,
                    "api_base": "https://supplier.example.test/v1",
                    "api_key": "supplier-test-key",
                },
                "model_info": {"id": "supplier-deployment"},
            }
        ]
    )
    monkeypatch.setattr(proxy_server, "llm_router", configured)
    monkeypatch.setattr(proxy_server, "prisma_client", None)
    assert await deployment_exists("supplier-deployment") is supported
    assert await deployment_exists("missing-deployment") is False
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN, deployment_lookup=deployment_exists).post(
        "/supplier/admin/rates",
        json={
            "supplier_id": "supplier-a",
            "model_id": "supplier-deployment",
            "input_per_million": "1",
            "output_per_million": "2",
            "cache_read_per_million": "0.5",
            "cache_write_per_million": "1.5",
        },
    )
    assert response.status_code == 404, response.text
    assert response.json()["detail"] == (
        "Supplier application not found"
        if supported
        else "The deployment is unavailable or not using a supported OpenAI-compatible adapter."
    )


def test_settlement_amount_is_never_accepted_from_the_client() -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN).post(
        "/supplier/admin/settlements",
        json={
            "supplier_id": "supplier-a",
            "ledger_ids": ["entry-a"],
            "reference": "payment-reference",
            "idempotency_key": "00000000-0000-4000-8000-000000000003",
            "amount": "99999",
        },
    )
    assert response.status_code == 422, response.text


def test_quotes_cannot_be_published_when_durable_accounting_is_disabled() -> None:
    response: Final = client(role=LitellmUserRoles.PROXY_ADMIN, accounting_enabled=False).post(
        "/supplier/admin/rates",
        json={
            "supplier_id": "supplier-a",
            "model_id": "model-a",
            "input_per_million": "1",
            "output_per_million": "2",
            "cache_read_per_million": "0.5",
            "cache_write_per_million": "1.5",
        },
    )
    assert response.status_code == 409, response.text
    assert response.json()["detail"] == "Supplier quotes require general_settings.use_spend_logs_ledger=true."


def test_database_failures_do_not_expose_connection_details() -> None:
    response: Final = client(database=ReadDatabase(unavailable=True)).get("/supplier/me")
    assert response.status_code == 503, response.text
    assert response.json()["detail"] == "The supplier database is unavailable. Retry the request."


def request(path: str, method: str = "GET") -> Request:
    return Request({"type": "http", "method": method, "path": path, "headers": (), "query_string": b""})


class _RouteAdmission(Protocol):
    @staticmethod
    def non_proxy_admin_allowed_routes_check(
        user_obj: LiteLLM_UserTable | None,
        _user_role: LitellmUserRoles | None,
        route: str,
        request: Request,
        valid_token: UserAPIKeyAuth,
        request_data: dict[str, object],
    ) -> None: ...


def test_route_admission_allows_members_to_reach_their_own_portal(checks: _RouteAdmission = RouteChecks) -> None:
    actor: Final = UserAPIKeyAuth(user_id="owner-a", user_role=LitellmUserRoles.INTERNAL_USER)
    user: Final = LiteLLM_UserTable(user_id="owner-a", user_role=LitellmUserRoles.INTERNAL_USER.value)
    checks.non_proxy_admin_allowed_routes_check(
        user_obj=user,
        _user_role=LitellmUserRoles.INTERNAL_USER,
        route="/supplier/me",
        request=request("/supplier/me"),
        valid_token=actor,
        request_data={},
    )
    assert client().get("/supplier/me").status_code == 200


def test_inference_only_keys_do_not_gain_supplier_access() -> None:
    actor: Final = UserAPIKeyAuth(
        user_id="owner-a", user_role=LitellmUserRoles.INTERNAL_USER, allowed_routes=["llm_api_routes"]
    )
    with pytest.raises(HTTPException) as denied:
        RouteChecks.assert_key_allowed_routes_grant(route="/supplier/me", valid_token=actor)
    assert denied.value.status_code == 403
