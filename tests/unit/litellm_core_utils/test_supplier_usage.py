from collections.abc import Mapping
from datetime import datetime, timedelta, timezone
from typing import Final

import pytest

from litellm.litellm_core_utils.supplier_usage import supplier_usage_snapshot, supplier_usage_was_reported
from litellm.types.utils import ModelResponse, Usage

_STARTED: Final = datetime(2026, 1, 1, tzinfo=timezone.utc)
_USAGE: Final[Mapping[str, object]] = {
    "prompt_tokens": 100,
    "completion_tokens": 8,
    "prompt_tokens_details": {"cached_tokens": 40, "cache_write_tokens": 10},
}


def _snapshot(
    *,
    usage: Mapping[str, object] = _USAGE,
    call_type: str = "acompletion",
    status: str = "success",
    cache_hit: bool = False,
    model_id: str = "deployment-a",
    started_at: datetime = _STARTED,
    custom_llm_provider: str = "openai",
    usage_reported: bool = True,
) -> Mapping[str, object] | None:
    return supplier_usage_snapshot(
        usage=usage,
        call_id="server-request",
        model_id=model_id,
        started_at=started_at,
        call_type=call_type,
        status=status,
        cache_hit=cache_hit,
        custom_llm_provider=custom_llm_provider,
        usage_reported=usage_reported,
    )


@pytest.mark.parametrize(
    "call_type",
    (
        "completion",
        "acompletion",
        "text_completion",
        "atext_completion",
        "responses",
        "aresponses",
    ),
)
def test_text_provider_usage_keeps_distinct_cache_quantities(call_type: str) -> None:
    snapshot: Final = _snapshot(call_type=call_type)
    assert snapshot is not None
    assert snapshot["prompt_tokens"] == 100
    assert snapshot["completion_tokens"] == 8
    assert snapshot["cache_read_tokens"] == 40
    assert snapshot["cache_write_tokens"] == 10
    assert snapshot["started_at"] == _STARTED.isoformat()


def test_accounting_retries_keep_identity_but_provider_attempts_and_deployments_do_not() -> None:
    first: Final = _snapshot()
    second_attempt: Final = _snapshot(started_at=_STARTED + timedelta(seconds=1))
    other_supplier: Final = _snapshot(model_id="deployment-b")
    assert first is not None and second_attempt is not None and other_supplier is not None
    assert _snapshot() == first
    assert len({first["request_id"], second_attempt["request_id"], other_supplier["request_id"]}) == 3


@pytest.mark.parametrize(
    "usage",
    (
        {},
        {"completion_tokens": 1},
        {"prompt_tokens": -1, "completion_tokens": 1},
        {"prompt_tokens": True, "completion_tokens": 1},
        {"prompt_tokens": 2, "completion_tokens": 1, "cache_read_input_tokens": 3},
        {"prompt_tokens": 0, "completion_tokens": 0},
    ),
)
def test_missing_invalid_and_zero_usage_cannot_generate_payable_usage(usage: Mapping[str, object]) -> None:
    assert _snapshot(usage=usage) is None


@pytest.mark.parametrize(
    ("status", "cache_hit", "call_type"),
    (
        ("failure", False, "acompletion"),
        ("success", True, "acompletion"),
        ("success", False, "aimage_generation"),
        ("success", False, "aembedding"),
        ("success", False, "anthropic_messages"),
        ("success", False, "aanthropic_messages"),
    ),
)
def test_failed_cached_and_non_token_billing_calls_do_not_generate_earnings(
    status: str, cache_hit: bool, call_type: str
) -> None:
    assert _snapshot(status=status, cache_hit=cache_hit, call_type=call_type) is None


def test_legacy_provider_cache_fields_remain_separate_from_uncached_input() -> None:
    snapshot: Final = _snapshot(
        usage={
            "prompt_tokens": 100,
            "completion_tokens": 8,
            "cache_read_input_tokens": 40,
            "cache_creation_input_tokens": 10,
        }
    )
    assert snapshot is not None
    assert snapshot["prompt_tokens"] == 100
    assert (snapshot["cache_read_tokens"], snapshot["cache_write_tokens"]) == (40, 10)


@pytest.mark.parametrize(
    ("custom_llm_provider", "usage_reported"),
    (("openai", False), ("anthropic", True), ("azure", True), ("", True)),
)
def test_only_openai_provider_with_reported_usage_can_generate_earnings(
    custom_llm_provider: str, usage_reported: bool
) -> None:
    assert _snapshot(custom_llm_provider=custom_llm_provider, usage_reported=usage_reported) is None


def test_estimated_usage_provenance_does_not_change_customer_serialization() -> None:
    usage: Final = Usage(prompt_tokens=100, completion_tokens=8, total_tokens=108)
    reported: Final = ModelResponse(id="same-response", created=1, usage=usage)
    usage.mark_estimated_tokens()
    estimated: Final = ModelResponse(id="same-response", created=1, usage=usage)
    assert supplier_usage_was_reported(reported)
    assert not supplier_usage_was_reported(estimated)
    assert reported.model_dump() == estimated.model_dump()
    assert reported.model_dump_json() == estimated.model_dump_json()
