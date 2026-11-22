from collections.abc import Mapping
from datetime import datetime, timezone
from hashlib import sha256
from typing import Annotated, Final, Protocol, TypeAlias

from pydantic import BaseModel, ConfigDict, Field, ValidationError

from litellm._logging import verbose_logger
from litellm.litellm_core_utils.core_helpers import require_attributes
from litellm.litellm_core_utils.hidden_params import get_hidden_params
from litellm.types.llms.openai import ResponseAPIUsage, ResponsesAPIResponse
from litellm.types.utils import CallTypes, ModelResponse, TextCompletionResponse, UnreportedUsage, Usage

_TOKEN_CALLS: Final = frozenset(
    (
        CallTypes.completion.value,
        CallTypes.acompletion.value,
        CallTypes.text_completion.value,
        CallTypes.atext_completion.value,
        CallTypes.responses.value,
        CallTypes.aresponses.value,
        CallTypes.anthropic_messages.value,
        CallTypes.aanthropic_messages.value,
    )
)
TokenCount: TypeAlias = Annotated[int, Field(ge=0, le=9223372036854775807, strict=True)]


class _PromptDetails(BaseModel):
    model_config = ConfigDict(frozen=True)

    cached_tokens: TokenCount | None = None
    cache_write_tokens: TokenCount | None = None


class _UsageResponse(Protocol):
    @property
    def usage(self) -> object: ...


class _Usage(BaseModel):
    model_config = ConfigDict(frozen=True)

    prompt_tokens: TokenCount
    completion_tokens: TokenCount
    prompt_tokens_details: _PromptDetails | None = None
    cache_read_input_tokens: TokenCount | None = None
    cache_creation_input_tokens: TokenCount | None = None


def supplier_usage_was_reported(response: object) -> bool:
    if not hasattr(response, "usage"):
        return False
    if isinstance(response, (ModelResponse, TextCompletionResponse)):
        usage: Final = require_attributes(response, _UsageResponse, "usage").usage
        return isinstance(usage, Usage) and not isinstance(usage, UnreportedUsage) and all(usage.reported_token_counts)
    if isinstance(response, ResponsesAPIResponse):
        hidden: Final = get_hidden_params(response)
        return (
            isinstance(response.usage, ResponseAPIUsage)
            and frozenset(("input_tokens", "output_tokens")).issubset(response.usage.model_fields_set)
        ) or (hidden is not None and hidden.get("_supplier_usage_reported") is True)
    return False


def supplier_usage_snapshot(
    *,
    usage: Mapping[str, object],
    call_id: str,
    model_id: str,
    started_at: datetime,
    call_type: str,
    status: str,
    cache_hit: bool,
    custom_llm_provider: str,
    usage_reported: bool,
) -> Mapping[str, object] | None:
    if custom_llm_provider != "openai" or not usage_reported:
        return None
    if status != "success" or cache_hit or call_type not in _TOKEN_CALLS:
        return None
    if not model_id or len(model_id) > 256 or not call_id:
        return None
    if not usage:
        return None
    try:
        quantities: Final = _Usage.model_validate(usage)
    except ValidationError:
        verbose_logger.warning("Supplier usage could not be accounted because token quantities are invalid")
        return None
    details: Final = quantities.prompt_tokens_details
    cached: Final = (
        details.cached_tokens
        if details is not None and details.cached_tokens is not None
        else quantities.cache_read_input_tokens or 0
    )
    written: Final = (
        details.cache_write_tokens
        if details is not None and details.cache_write_tokens is not None
        else quantities.cache_creation_input_tokens or 0
    )
    if quantities.prompt_tokens < cached + written:
        verbose_logger.warning("Supplier usage could not be accounted because cached tokens exceed input tokens")
        return None
    if quantities.prompt_tokens == 0 and quantities.completion_tokens == 0:
        return None
    started: Final = datetime.fromtimestamp(started_at.timestamp(), timezone.utc).isoformat()
    identity: Final = sha256(f"{call_id}\0{model_id}\0{started}".encode()).hexdigest()
    return {
        "request_id": identity,
        "model_id": model_id,
        "started_at": started,
        "prompt_tokens": quantities.prompt_tokens,
        "completion_tokens": quantities.completion_tokens,
        "cache_read_tokens": cached,
        "cache_write_tokens": written,
    }
