import json
import time
from typing import Any

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from openai import APITimeoutError
from openai import OpenAI
from pydantic import BaseModel

from app.config import Settings, settings


# ---------------------------------------------------------
# ROUTER
# ---------------------------------------------------------

router = APIRouter(
    prefix="/agent",
    tags=["ARCTES AI"],
)


# ---------------------------------------------------------
# REQUEST SCHEMAS
# ---------------------------------------------------------

class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, Any]] = []


# ---------------------------------------------------------
# ENVIRONMENT
# ---------------------------------------------------------

def get_settings() -> Settings:
    """Return the loaded settings (backend/.env is loaded by pydantic-settings)."""
    return settings


def get_openai_config():
    """Return a valid (api_key, base_url, model) tuple or raise a safe error."""
    cfg = get_settings()

    api_key = (cfg.OPENROUTER_API_KEY or "").strip()

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail=(
                "ARCTES AI is not configured. Please add OPENROUTER_API_KEY "
                "to backend/.env and restart the backend."
            ),
        )

    base_url = (cfg.OPENROUTER_BASE_URL or "https://openrouter.ai/api/v1").strip()
    model = (cfg.ARCTES_MODEL or "openai/gpt-5-nano").strip()

    return api_key, base_url, model


# ---------------------------------------------------------
# CLIENT (created lazily, never at import time)
# ---------------------------------------------------------

def get_client():
    api_key, base_url, _ = get_openai_config()

    return OpenAI(
        api_key=api_key,
        base_url=base_url,
    )


# ---------------------------------------------------------
# ERROR HANDLING
# ---------------------------------------------------------

def _safe_error_message(exc: Exception) -> str:
    """Return a safe, useful error message without exposing the API key."""
    text = str(exc)

    # Always redact the API key just in case it ever appears in an error body.
    api_key = getattr(settings, "OPENROUTER_API_KEY", "") or ""
    if api_key:
        text = text.replace(api_key, "[REDACTED]")

    return text


def _status_and_detail(exc: Exception) -> tuple[int, str]:
    """Map an exception to a safe HTTP status + detail message."""
    # Timeouts
    if isinstance(exc, APITimeoutError):
        return 504, "ARCTES AI request timed out. Please try again in a moment."

    # Connection errors (server unreachable)
    if isinstance(exc, ConnectionError):
        return 502, (
            "Could not reach the OpenRouter AI service. Please check your "
            "network connection and try again."
        )

    # KeyError / missing key
    if isinstance(exc, KeyError):
        return 500, (
            "ARCTES AI is not configured. Please add OPENROUTER_API_KEY "
            "to backend/.env and restart the backend."
        )

    # Authentication errors (invalid API key)
    if isinstance(exc, Exception):
        status = getattr(exc, "status_code", None)
        text = (_safe_error_message(exc) or "").lower()

        # HTTP 401 – invalid/exhausted API key
        if status == 401 or "authentication" in text or "invalid api key" in text:
            return 401, (
                "ARCTES AI authentication failed. The OPENROUTER_API_KEY in "
                "backend/.env appears to be invalid or expired."
            )

        # HTTP 403 – forbidden / no permission
        if status == 403 or "forbidden" in text or "permitted" in text:
            return 403, (
                "ARCTES AI access was denied by the provider. Please check your "
                "OpenRouter account permissions and model access."
            )

        # HTTP 400 – bad request (model unavailable, bad payload, missing model)
        if status == 400 or "400" in text or "model not found" in text:
            return 400, (
                "ARCTES AI could not complete the request (HTTP 400). The model "
                "may be unavailable or the request payload is invalid. Model: "
                f"{get_settings().ARCTES_MODEL or 'openai/gpt-5-nano'}."
            )

        # HTTP 429 – rate limited
        if status == 429 or "rate limit" in text or "429" in text:
            return 429, (
                "ARCTES AI is rate limited right now. Please wait a moment and "
                "try again."
            )

        # HTTP 404 – model unavailable
        if status == 404 or "not found" in text:
            return 404, (
                "ARCTES AI model is unavailable. Please check the ARCTES_MODEL "
                "value in backend/.env."
            )

    # Fallback: generic but safe
    return 500, _safe_error_message(exc)


# ---------------------------------------------------------
# TEST ROUTE
# ---------------------------------------------------------

@router.get("/test")
def test_agent():

    api_key, base_url, model = get_openai_config()

    return {
        "message": "ARCTES route is working.",
        "provider": "OpenRouter",
        "base_url": base_url,
        "model": model,
        "configured": bool(api_key),
    }


# ---------------------------------------------------------
# CHAT ROUTE (STREAMING SSE)
# ---------------------------------------------------------

def _sse(obj: dict) -> str:
    """Serialize a payload as a single SSE data line (kept compact)."""
    return f"data: {json.dumps(obj, ensure_ascii=False)}\n\n"


@router.post("/chat")
async def chat(request: ChatRequest):

    message = (request.message or "").strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    api_key, base_url, model = get_openai_config()

    client = get_client()

    messages = [
        {
            "role": "system",
            "content": (
                "You are ARCTES, the autonomous intelligence system of APS MINDS.\n\n"
                "Your role is to help users with:\n"
                "- research\n"
                "- technology\n"
                "- AI\n"
                "- cybersecurity\n"
                "- programming\n"
                "- autonomous publishing intelligence\n"
                "- analysis\n"
                "- productivity\n\n"
                "Be intelligent, concise, useful and professional.\n\n"
                "Do not claim to have performed actions that you did not actually perform."
            ),
        }
    ]

    # Add previous conversation
    for item in request.history or []:

        if not isinstance(item, dict):
            continue

        role = item.get("role")
        content = item.get("content")

        if role in ("user", "assistant") and content:
            messages.append(
                {
                    "role": role,
                    "content": str(content),
                }
            )

# Current message
    messages.append(
        {
            "role": "user",
            "content": message,
        }
    )

    async def event_stream():
        # T0 = request received by backend
        t0 = time.perf_counter()
        print(f"[ARCTES] request received: {message[:80]!r}")

        try:
            # T1 = OpenRouter request started
            t1 = time.perf_counter()
            print("[ARCTES] OpenRouter request started")

            # Streaming request — do NOT wait for the full response.
            stream = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                stream=True,
            )

            first_sent = False
            first_at = t1

            for chunk in stream:
                choices = getattr(chunk, "choices", None)
                if not choices:
                    continue

                delta = getattr(choices[0], "delta", None)
                content = getattr(delta, "content", None)

                if not content:
                    continue

                # T2 = first token/chunk received
                if not first_sent:
                    first_sent = True
                    first_at = time.perf_counter()

                yield _sse({"delta": str(content)})

            # T3 = complete response received
            t3 = time.perf_counter()

            request_to_openrouter = (t1 - t0) * 1000
            time_to_first_token = (first_at - t1) * 1000
            openrouter_total = (t3 - t1) * 1000
            backend_total = (t3 - t0) * 1000

            print("ARCTES TIMING")
            print(f"request_to_openrouter: {request_to_openrouter:.0f} ms")
            print(f"time_to_first_token: {time_to_first_token:.0f} ms")
            print(f"openrouter_total: {openrouter_total:.0f} ms")
            print(f"backend_total: {backend_total:.0f} ms")

            yield _sse({"done": True})

        except HTTPException:
            raise

        except Exception as e:
            # Log the error safely without exposing the API key.
            print("ARCTES ERROR [safe]:", _safe_error_message(e))

            status, detail = _status_and_detail(e)

            yield _sse({"error": detail, "status": status})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )
