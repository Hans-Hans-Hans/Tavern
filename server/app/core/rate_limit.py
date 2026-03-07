from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address


def _rate_limit_key(request: Request) -> str:
    # Prefer X-Forwarded-For when behind a trusted reverse proxy.
    forwarded = request.headers.get("x-forwarded-for", "").strip()
    ip = forwarded.split(",")[0].strip() if forwarded else get_remote_address(request)
    token_prefix = str(request.cookies.get("access_token", ""))[:24]
    return f"{ip}:{token_prefix}"


limiter = Limiter(key_func=_rate_limit_key)
