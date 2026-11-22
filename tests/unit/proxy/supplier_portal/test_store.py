from decimal import Decimal
from typing import Final
from uuid import UUID

import pytest
from pydantic import ValidationError

from litellm.proxy.supplier_portal.models import (
    AdjustmentInput,
    ApplicationInput,
    RateInput,
    ReviewInput,
    SettlementInput,
)

_KEY: Final = UUID("9fd7d266-0394-4d51-a6dc-3c3d245e082d")
_APPLICATION: Final = {
    "display_name": "Test supplier",
    "contact_email": "supplier@example.test",
    "website": "https://example.test",
    "endpoint_url": "https://api.example.test/v1",
    "models": "Text generation",
    "capacity": "Ten concurrent requests",
}
_RATE: Final = {
    "supplier_id": "supplier-one",
    "model_id": "deployment-one",
    "input_per_million": "0.123456789123456789",
    "output_per_million": "2",
    "cache_read_per_million": "0",
    "cache_write_per_million": "1",
}


def test_application_cannot_choose_another_owner_or_approve_itself() -> None:
    with pytest.raises(ValidationError, match="Extra inputs are not permitted"):
        ApplicationInput.model_validate({**_APPLICATION, "owner_user_id": "another-user", "status": "approved"})


@pytest.mark.parametrize("url", ("https://secret@example.test/v1", "https://user:secret@example.test/v1"))
def test_application_does_not_accept_endpoint_credentials(url: str) -> None:
    with pytest.raises(ValidationError, match="URLs must not contain credentials"):
        ApplicationInput.model_validate({**_APPLICATION, "endpoint_url": url})


@pytest.mark.parametrize("url", ("https://api.example.test/v1?api_key=secret", "https://api.example.test/v1#secret"))
def test_application_endpoint_does_not_accept_credentials_in_query_or_fragment(url: str) -> None:
    with pytest.raises(ValidationError, match="must not contain query parameters or a fragment"):
        ApplicationInput.model_validate({**_APPLICATION, "endpoint_url": url})


def test_rejection_requires_an_explanation_visible_to_the_applicant() -> None:
    with pytest.raises(ValidationError, match="A rejection requires a review note"):
        ReviewInput(status="rejected", expected_revision=1, review_note="   ")


@pytest.mark.parametrize("revision", (0, -1, True, 1.5))
def test_review_requires_the_explicit_valid_revision_the_administrator_read(revision: object) -> None:
    with pytest.raises(ValidationError):
        ReviewInput.model_validate({"status": "approved", "expected_revision": revision})


def test_review_cannot_approve_an_application_without_a_revision() -> None:
    with pytest.raises(ValidationError, match="expected_revision"):
        ReviewInput.model_validate({"status": "approved"})


@pytest.mark.parametrize("price", ("NaN", "Infinity", "-0.01"))
def test_published_supply_prices_must_be_finite_and_nonnegative(price: str) -> None:
    with pytest.raises(ValidationError):
        RateInput.model_validate({**_RATE, "input_per_million": price})


def test_supply_prices_are_serialized_as_exact_decimal_strings() -> None:
    rate: Final = RateInput.model_validate(_RATE)

    assert rate.model_dump(mode="json")["input_per_million"] == _RATE["input_per_million"]
    assert rate.cache_read_per_million == Decimal(0)


def test_rate_publication_does_not_allow_backdating_or_an_implicit_cache_price() -> None:
    with pytest.raises(ValidationError, match="Extra inputs are not permitted"):
        RateInput.model_validate({**_RATE, "effective_at": "2025-01-01T00:00:00Z"})
    with pytest.raises(ValidationError, match="Field required"):
        RateInput.model_validate({key: value for key, value in _RATE.items() if key != "cache_write_per_million"})


@pytest.mark.parametrize("identifiers", ((), ("entry-one", "entry-one"), ("",)))
def test_settlements_require_distinct_explicit_ledger_entries(identifiers: tuple[str, ...]) -> None:
    with pytest.raises(ValidationError):
        SettlementInput(
            supplier_id="supplier-one",
            ledger_ids=identifiers,
            reference="bank-transfer-one",
            idempotency_key=_KEY,
        )


def test_a_reordered_settlement_has_the_same_idempotent_identity() -> None:
    first: Final = SettlementInput(
        supplier_id="supplier-one",
        ledger_ids=("entry-two", "entry-one"),
        reference="bank-transfer-one",
        idempotency_key=_KEY,
    )
    second: Final = first.model_dump()

    assert SettlementInput.model_validate({**second, "ledger_ids": ("entry-one", "entry-two")}) == first


def test_the_client_cannot_set_the_settlement_amount() -> None:
    with pytest.raises(ValidationError, match="Extra inputs are not permitted"):
        SettlementInput.model_validate(
            {
                "supplier_id": "supplier-one",
                "ledger_ids": ("entry-one",),
                "reference": "bank-transfer-one",
                "idempotency_key": _KEY,
                "amount": "9999",
            }
        )


@pytest.mark.parametrize("amount", ("0", "NaN", "Infinity"))
def test_adjustments_require_a_finite_nonzero_change(amount: str) -> None:
    with pytest.raises(ValidationError):
        AdjustmentInput.model_validate(
            {
                "supplier_id": "supplier-one",
                "amount": amount,
                "reason": "Correct a previous billing entry",
                "idempotency_key": _KEY,
            }
        )
