from datetime import datetime, timezone
from decimal import Context, Decimal, localcontext
from typing import Final

import pytest
from pydantic import ValidationError

from litellm.proxy.supplier_portal.accounting import calculate_amount
from litellm.proxy.supplier_portal.models import Rate, SupplierUsage

_STARTED_AT: Final = datetime(2025, 1, 1, tzinfo=timezone.utc)
_RATE: Final = Rate(
    id="quote-one",
    supplier_id="supplier-one",
    model_id="deployment-one",
    input_per_million=Decimal("2"),
    output_per_million=Decimal("8"),
    cache_read_per_million=Decimal("0.5"),
    cache_write_per_million=Decimal("3"),
    effective_at=_STARTED_AT,
)


@pytest.mark.parametrize(
    ("prompt", "output", "read", "write", "expected"),
    (
        (1_000_000, 0, 0, 0, "2"),
        (0, 1_000_000, 0, 0, "8"),
        (1_000_000, 0, 1_000_000, 0, "0.5"),
        (1_000_000, 0, 0, 1_000_000, "3"),
        (1200, 50, 300, 100, "0.00245"),
        (0, 0, 0, 0, "0"),
    ),
)
def test_wholesale_earnings_charge_each_token_category_once(
    prompt: int, output: int, read: int, write: int, expected: str
) -> None:
    usage: Final = SupplierUsage(
        request_id="attempt-one",
        model_id=_RATE.model_id,
        started_at=_STARTED_AT,
        prompt_tokens=prompt,
        completion_tokens=output,
        cache_read_tokens=read,
        cache_write_tokens=write,
    )

    assert calculate_amount(usage, _RATE) == Decimal(expected)


def test_wholesale_earnings_preserve_precision_independently_of_the_callers_decimal_context() -> None:
    usage: Final = SupplierUsage(
        request_id="attempt-one",
        model_id=_RATE.model_id,
        started_at=_STARTED_AT,
        prompt_tokens=1_000_001,
        completion_tokens=0,
    )
    rate: Final = _RATE.model_copy(update={"input_per_million": Decimal("0.123456789123456789")})

    with localcontext(Context(prec=6)):
        amount: Final = calculate_amount(usage, rate)

    assert amount == Decimal("0.123456912580245912456789")


def test_free_supply_still_has_an_exact_zero_price() -> None:
    usage: Final = SupplierUsage(
        request_id="attempt-one",
        model_id=_RATE.model_id,
        started_at=_STARTED_AT,
        prompt_tokens=1234,
        completion_tokens=567,
        cache_read_tokens=34,
        cache_write_tokens=200,
    )
    rate: Final = _RATE.model_copy(
        update={
            "input_per_million": Decimal(0),
            "output_per_million": Decimal(0),
            "cache_read_per_million": Decimal(0),
            "cache_write_per_million": Decimal(0),
        }
    )

    assert calculate_amount(usage, rate) == Decimal(0)


@pytest.mark.parametrize(("read", "write"), ((101, 0), (0, 101), (60, 41)))
def test_usage_rejects_cache_categories_that_exceed_the_total_prompt(read: int, write: int) -> None:
    with pytest.raises(ValidationError, match="Cached token quantities cannot exceed prompt tokens"):
        SupplierUsage(
            request_id="attempt-one",
            model_id=_RATE.model_id,
            started_at=_STARTED_AT,
            prompt_tokens=100,
            completion_tokens=0,
            cache_read_tokens=read,
            cache_write_tokens=write,
        )


@pytest.mark.parametrize("tokens", (-1, True, 1.5))
def test_usage_rejects_invalid_token_quantities(tokens: object) -> None:
    with pytest.raises(ValidationError):
        SupplierUsage.model_validate(
            {
                "request_id": "attempt-one",
                "model_id": _RATE.model_id,
                "started_at": _STARTED_AT,
                "prompt_tokens": tokens,
                "completion_tokens": 0,
            }
        )


def test_usage_requires_an_unambiguous_request_start_time() -> None:
    with pytest.raises(ValidationError, match="Request start time must include a timezone"):
        SupplierUsage(
            request_id="attempt-one",
            model_id=_RATE.model_id,
            started_at=datetime(2025, 1, 1),
            prompt_tokens=100,
            completion_tokens=0,
        )
