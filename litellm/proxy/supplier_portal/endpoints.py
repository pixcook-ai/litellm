from collections.abc import Awaitable, Callable
from typing import Annotated, Final, NoReturn, TypeAlias, TypeVar, assert_never

from fastapi import APIRouter, Depends, HTTPException, Path, Query

from litellm.exceptions import BadRequestError
from litellm.litellm_core_utils.get_llm_provider_logic import get_llm_provider
from litellm.proxy._types import LitellmUserRoles, UserAPIKeyAuth
from litellm.proxy.auth.user_api_key_auth import user_api_key_auth
from litellm.proxy.list_api.common import reject_unknown_query_params
from litellm.proxy.spend_tracking.spend_logs_ledger_setting import spend_logs_ledger_enabled
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
from litellm.proxy.supplier_portal.store import SupplierStore
from litellm.types.router import Deployment

T: Final = TypeVar("T")
DeploymentLookup: TypeAlias = Callable[[str], Awaitable[bool]]
Auth: TypeAlias = Annotated[UserAPIKeyAuth, Depends(user_api_key_auth)]
SupplierPath: TypeAlias = Annotated[str, Path(min_length=1, max_length=128)]
PageLimit: TypeAlias = Annotated[int, Query(ge=1, le=100)]
PageOffset: TypeAlias = Annotated[int, Query(ge=0, le=1000000)]


def reject(status_code: int, detail: str) -> NoReturn:
    raise HTTPException(status_code=status_code, detail=detail)


def raise_public(failure: Failure) -> NoReturn:
    code: Final = failure.code
    match code:
        case "not_found":
            reject(404, failure.message)
        case "conflict":
            reject(409, failure.message)
        case "invalid_request":
            reject(422, failure.message)
        case _:
            assert_never(code)


async def database_call(operation: Awaitable[T | Failure]) -> T:
    from prisma.errors import PrismaError

    try:
        result: Final = await operation
    except (PrismaError, TimeoutError):
        reject(503, "The supplier database is unavailable. Retry the request.")
    if isinstance(result, Failure):
        raise_public(result)
    return result


def supplier_actor(auth: Auth) -> str:
    if not auth.user_id or auth.is_team_service_account:
        reject(403, "A signed-in user identity is required.")
    return auth.user_id


def supplier_writer(auth: Auth) -> str:
    if auth.user_role in (LitellmUserRoles.PROXY_ADMIN_VIEW_ONLY, LitellmUserRoles.INTERNAL_USER_VIEW_ONLY):
        reject(403, "Read-only users cannot submit supplier applications.")
    return supplier_actor(auth)


def supplier_admin(auth: Auth) -> str:
    if auth.user_role != LitellmUserRoles.PROXY_ADMIN:
        reject(403, "Only full proxy administrators can manage suppliers.")
    return auth.user_id or "proxy_admin"


def supplier_admin_reader(auth: Auth) -> UserAPIKeyAuth:
    if auth.user_role not in (LitellmUserRoles.PROXY_ADMIN, LitellmUserRoles.PROXY_ADMIN_VIEW_ONLY):
        reject(403, "Only proxy administrators can view supplier administration.")
    return auth


def get_supplier_store() -> SupplierStore:
    from litellm.proxy.proxy_server import prisma_client

    if prisma_client is None:
        reject(503, "The supplier database is not connected.")
    return SupplierStore(prisma_client.writer_db)


def deployment_supports_supplier_accounting(deployment: Deployment) -> bool:
    params: Final = deployment.litellm_params
    if not params.model:
        return False
    try:
        return get_llm_provider(model=params.model, litellm_params=params)[1] == "openai"
    except BadRequestError:
        return False


async def deployment_exists(model_id: str) -> bool:
    from litellm.proxy.management_endpoints.model_management_endpoints import get_db_model
    from litellm.proxy.proxy_server import llm_router, prisma_client

    if llm_router is not None and (deployment := llm_router.registry().deployment(model_id)) is not None:
        return deployment_supports_supplier_accounting(deployment)
    if prisma_client is None:
        return False
    stored: Final = await get_db_model(model_id=model_id, prisma_client=prisma_client)
    return stored is not None and deployment_supports_supplier_accounting(stored)


def get_deployment_lookup() -> DeploymentLookup:
    return deployment_exists


def supplier_accounting_enabled() -> bool:
    from litellm.proxy.proxy_server import general_settings_view

    return spend_logs_ledger_enabled(general_settings_view())


Store: TypeAlias = Annotated[SupplierStore, Depends(get_supplier_store)]
SupplierActor: TypeAlias = Annotated[str, Depends(supplier_actor)]
SupplierWriter: TypeAlias = Annotated[str, Depends(supplier_writer)]
AdminActor: TypeAlias = Annotated[str, Depends(supplier_admin)]
AdminReader: TypeAlias = Annotated[UserAPIKeyAuth, Depends(supplier_admin_reader)]
Models: TypeAlias = Annotated[DeploymentLookup, Depends(get_deployment_lookup)]


async def owned_supplier_id(actor: SupplierActor, store: Store) -> str:
    overview: Final = await database_call(store.get_for_user(actor))
    if overview is None:
        reject(404, "No supplier application exists for this user.")
    return overview.application.id


OwnedSupplier: TypeAlias = Annotated[str, Depends(owned_supplier_id)]

router: Final = APIRouter(
    prefix="/supplier",
    tags=["suppliers"],
    dependencies=(Depends(reject_unknown_query_params),),
)


@router.post(
    "/applications",
    response_model=Application,
    description="Submit or resubmit the authenticated user's supplier application.",
)
async def submit_application(data: ApplicationInput, actor: SupplierWriter, store: Store) -> Application:
    return await database_call(store.submit_application(actor, data))


@router.get(
    "/me",
    response_model=SupplierOverview | None,
    description="Read the authenticated supplier's application and earnings, or null before applying.",
)
async def supplier_me(actor: SupplierActor, store: Store) -> SupplierOverview | None:
    return await database_call(store.get_for_user(actor))


@router.get(
    "/ledger",
    response_model=LedgerPage,
    description="List only the authenticated supplier's ledger entries.",
)
async def supplier_ledger(
    supplier_id: OwnedSupplier,
    store: Store,
    limit: PageLimit = 50,
    offset: PageOffset = 0,
    unsettled_only: bool = False,
) -> LedgerPage:
    return await database_call(store.ledger(supplier_id, limit=limit, offset=offset, unsettled_only=unsettled_only))


@router.get(
    "/settlements",
    response_model=SettlementPage,
    description="List only the authenticated supplier's manual settlement records.",
)
async def supplier_settlements(
    supplier_id: OwnedSupplier, store: Store, limit: PageLimit = 50, offset: PageOffset = 0
) -> SettlementPage:
    return await database_call(store.settlements(supplier_id, limit=limit, offset=offset))


@router.get(
    "/admin/applications",
    response_model=ApplicationPage,
    description="List supplier applications. Proxy administrators and admin viewers only.",
)
async def admin_applications(
    auth: AdminReader,
    store: Store,
    status: ApplicationStatus | None = None,
    limit: PageLimit = 50,
    offset: PageOffset = 0,
) -> ApplicationPage:
    return await database_call(store.list_applications(status=status, limit=limit, offset=offset))


@router.post(
    "/admin/applications/{supplier_id}/review",
    response_model=Application,
    description="Approve or reject a pending application. Full proxy administrators only.",
)
async def review_application(
    supplier_id: SupplierPath, data: ReviewInput, actor: AdminActor, store: Store
) -> Application:
    return await database_call(store.review_application(supplier_id, data, actor))


@router.get(
    "/admin/suppliers/{supplier_id}",
    response_model=SupplierOverview,
    description="Read one supplier's application and earnings. Proxy administrators and admin viewers only.",
)
async def admin_supplier(supplier_id: SupplierPath, auth: AdminReader, store: Store) -> SupplierOverview:
    overview: Final = await database_call(store.overview(supplier_id))
    if overview is None:
        reject(404, "Supplier not found.")
    return overview


@router.get(
    "/admin/ledger",
    response_model=LedgerPage,
    description="List a supplier's ledger. Proxy administrators and admin viewers only.",
)
async def admin_ledger(
    auth: AdminReader,
    store: Store,
    supplier_id: Annotated[str, Query(min_length=1, max_length=128)],
    limit: PageLimit = 50,
    offset: PageOffset = 0,
    unsettled_only: bool = False,
) -> LedgerPage:
    return await database_call(store.ledger(supplier_id, limit=limit, offset=offset, unsettled_only=unsettled_only))


@router.get(
    "/admin/settlements",
    response_model=SettlementPage,
    description="List a supplier's settlements. Proxy administrators and admin viewers only.",
)
async def admin_settlements(
    auth: AdminReader,
    store: Store,
    supplier_id: Annotated[str, Query(min_length=1, max_length=128)],
    limit: PageLimit = 50,
    offset: PageOffset = 0,
) -> SettlementPage:
    return await database_call(store.settlements(supplier_id, limit=limit, offset=offset))


@router.post(
    "/admin/rates",
    response_model=Rate,
    status_code=201,
    description="Publish an immutable wholesale quote for an existing deployment. Full proxy administrators only.",
)
async def publish_rate(
    data: RateInput,
    actor: AdminActor,
    store: Store,
    models: Models,
    accounting_enabled: Annotated[bool, Depends(supplier_accounting_enabled)],
) -> Rate:
    if not accounting_enabled:
        reject(409, "Supplier quotes require general_settings.use_spend_logs_ledger=true.")
    if not await database_call(models(data.model_id)):
        reject(404, "The deployment is unavailable or not using a supported OpenAI-compatible adapter.")
    return await database_call(store.publish_rate(data, actor))


@router.post(
    "/admin/adjustments",
    response_model=LedgerEntry,
    status_code=201,
    description="Append an explained signed adjustment. Full proxy administrators only.",
)
async def adjust_ledger(data: AdjustmentInput, actor: AdminActor, store: Store) -> LedgerEntry:
    return await database_call(store.adjust(data, actor))


@router.post(
    "/admin/settlements",
    response_model=Settlement,
    status_code=201,
    description="Record a manual payment for explicit unpaid ledger entries. Full proxy administrators only.",
)
async def record_settlement(data: SettlementInput, actor: AdminActor, store: Store) -> Settlement:
    return await database_call(store.settle(data, actor))
