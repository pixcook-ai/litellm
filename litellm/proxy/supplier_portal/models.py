from datetime import datetime
from decimal import Decimal
from typing import Annotated, Literal, TypeAlias
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, field_validator, model_validator

ApplicationStatus: TypeAlias = Literal["pending", "approved", "rejected"]
Price: TypeAlias = Annotated[Decimal, Field(ge=0, max_digits=38, decimal_places=18, allow_inf_nan=False)]
Amount: TypeAlias = Annotated[Decimal, Field(max_digits=65, decimal_places=30, allow_inf_nan=False)]
TokenCount: TypeAlias = Annotated[int, Field(ge=0, le=9223372036854775807, strict=True)]


class PortalModel(BaseModel):
    model_config = ConfigDict(frozen=True, extra="forbid", str_strip_whitespace=True)


class Failure(PortalModel):
    code: Literal["not_found", "conflict", "invalid_request"]
    message: str


class ApplicationInput(PortalModel):
    display_name: str = Field(min_length=1, max_length=160)
    contact_email: str = Field(min_length=3, max_length=254, pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    website: HttpUrl
    endpoint_url: HttpUrl
    models: str = Field(min_length=1, max_length=4000)
    capacity: str = Field(min_length=1, max_length=2000)

    @field_validator("website", "endpoint_url")
    @classmethod
    def reject_url_credentials(cls, value: HttpUrl) -> HttpUrl:
        if value.username is not None or value.password is not None:
            raise ValueError("URLs must not contain credentials")
        return value

    @field_validator("endpoint_url")
    @classmethod
    def endpoint_is_a_base_url(cls, value: HttpUrl) -> HttpUrl:
        if value.query is not None or value.fragment is not None:
            raise ValueError("The endpoint URL must not contain query parameters or a fragment")
        return value


class Application(PortalModel):
    id: str
    owner_user_id: str
    revision: int
    display_name: str
    contact_email: str
    website: str
    endpoint_url: str
    models: str
    capacity: str
    status: ApplicationStatus
    review_note: str | None
    created_at: datetime
    updated_at: datetime


class ReviewInput(PortalModel):
    status: Literal["approved", "rejected"]
    expected_revision: int = Field(ge=1, strict=True)
    review_note: str = Field(default="", max_length=2000)

    @model_validator(mode="after")
    def rejection_requires_reason(self) -> "ReviewInput":
        if self.status == "rejected" and not self.review_note:
            raise ValueError("A rejection requires a review note")
        return self


class RateInput(PortalModel):
    supplier_id: str = Field(min_length=1, max_length=128)
    model_id: str = Field(min_length=1, max_length=256)
    input_per_million: Price
    output_per_million: Price
    cache_read_per_million: Price
    cache_write_per_million: Price


class Rate(RateInput):
    id: str
    effective_at: datetime
    currency: Literal["USD"] = "USD"


class AdjustmentInput(PortalModel):
    supplier_id: str = Field(min_length=1, max_length=128)
    amount: Amount
    reason: str = Field(min_length=1, max_length=2000)
    idempotency_key: UUID

    @field_validator("amount")
    @classmethod
    def nonzero_adjustment(cls, value: Decimal) -> Decimal:
        if value == 0:
            raise ValueError("An adjustment must change the balance")
        return value


class SettlementInput(PortalModel):
    supplier_id: str = Field(min_length=1, max_length=128)
    ledger_ids: tuple[str, ...] = Field(min_length=1, max_length=1000)
    reference: str = Field(min_length=1, max_length=256)
    idempotency_key: UUID

    @field_validator("ledger_ids")
    @classmethod
    def unique_ledger_ids(cls, value: tuple[str, ...]) -> tuple[str, ...]:
        if len(frozenset(value)) != len(value) or any(not item or len(item) > 512 for item in value):
            raise ValueError("Ledger identifiers must be nonempty and unique")
        return tuple(sorted(value))


class SupplierUsage(PortalModel):
    request_id: str = Field(min_length=1, max_length=512)
    model_id: str = Field(min_length=1, max_length=256)
    started_at: datetime
    prompt_tokens: TokenCount
    completion_tokens: TokenCount
    cache_read_tokens: TokenCount = 0
    cache_write_tokens: TokenCount = 0

    @model_validator(mode="after")
    def valid_token_categories(self) -> "SupplierUsage":
        if self.prompt_tokens < self.cache_read_tokens + self.cache_write_tokens:
            raise ValueError("Cached token quantities cannot exceed prompt tokens")
        if self.started_at.tzinfo is None or self.started_at.utcoffset() is None:
            raise ValueError("Request start time must include a timezone")
        return self


class LedgerEntry(PortalModel):
    id: str
    supplier_id: str
    kind: Literal["usage", "adjustment"]
    request_id: str | None
    rate_id: str | None
    model_id: str | None
    prompt_tokens: int
    completion_tokens: int
    cache_read_tokens: int
    cache_write_tokens: int
    amount: Decimal
    reason: str | None
    settlement_id: str | None
    created_at: datetime
    currency: Literal["USD"] = "USD"


class Settlement(PortalModel):
    id: str
    supplier_id: str
    amount: Decimal
    reference: str
    ledger_ids: tuple[str, ...]
    created_at: datetime
    currency: Literal["USD"] = "USD"


class SupplierOverview(PortalModel):
    application: Application
    rates: tuple[Rate, ...]
    total_earnings: Decimal
    unsettled_amount: Decimal
    settled_amount: Decimal
    currency: Literal["USD"] = "USD"


class ApplicationPage(PortalModel):
    items: tuple[Application, ...]
    total: int
    limit: int
    offset: int


class LedgerPage(PortalModel):
    items: tuple[LedgerEntry, ...]
    total: int
    limit: int
    offset: int


class SettlementPage(PortalModel):
    items: tuple[Settlement, ...]
    total: int
    limit: int
    offset: int
