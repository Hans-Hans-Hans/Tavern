import os
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv


ROOT_ENV_PATH = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(ROOT_ENV_PATH)


def _normalize_https_origin(value: str) -> str:
    raw = str(value or "").strip()
    if not raw:
        return ""
    parsed = urlparse(raw)
    if parsed.scheme.lower() != "https" or not parsed.netloc:
        return ""
    return f"https://{parsed.netloc.lower()}"


class Settings:
    PROJECT_NAME: str = "Tavern"
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    PERSISTENT_LOGIN_EXPIRE_DAYS: int = int(os.getenv("PERSISTENT_LOGIN_EXPIRE_DAYS", "30"))
    VERSION: str = os.getenv("APP_VERSION", "1.1.0")
    VAPID_PUBLIC_KEY: str = os.getenv("VAPID_PUBLIC_KEY", "").strip()
    VAPID_PRIVATE_KEY: str = os.getenv("VAPID_PRIVATE_KEY", "").strip()
    VAPID_SUBJECT: str = os.getenv("VAPID_SUBJECT", "mailto:admin@tavern.local").strip()
    SMTP_HOST: str = os.getenv("SMTP_HOST", "").strip()
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "").strip()
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_FROM_EMAIL: str = os.getenv("SMTP_FROM_EMAIL", "").strip()
    SMTP_USE_TLS: bool = os.getenv("SMTP_USE_TLS", "true").lower() in {"1", "true", "yes", "on"}
    SMTP_USE_SSL: bool = os.getenv("SMTP_USE_SSL", "false").lower() in {"1", "true", "yes", "on"}
    EMAIL_VERIFICATION_TTL_MINUTES: int = int(os.getenv("EMAIL_VERIFICATION_TTL_MINUTES", "10"))
    COOKIE_SECURE: bool = os.getenv("COOKIE_SECURE", "false").lower() in {"1", "true", "yes", "on"}
    _raw_cookie_samesite: str = os.getenv("COOKIE_SAMESITE", "lax").strip().lower()
    if _raw_cookie_samesite not in {"lax", "strict", "none"}:
        _raw_cookie_samesite = "lax"
    # SameSite=None requires secure cookies in modern browsers.
    COOKIE_SAMESITE: str = (
        "none"
        if _raw_cookie_samesite == "none" and COOKIE_SECURE
        else ("lax" if _raw_cookie_samesite == "none" else _raw_cookie_samesite)
    )
    _raw_cors_origins: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "https://127.0.0.1:8000,https://localhost:8000,https://tavern.hans-homelab.com",
        ).split(",")
        if origin.strip()
    ]
    CORS_ORIGINS: list[str] = sorted(
        {
            normalized
            for normalized in (_normalize_https_origin(origin) for origin in _raw_cors_origins)
            if normalized
        }
    )


settings = Settings()
