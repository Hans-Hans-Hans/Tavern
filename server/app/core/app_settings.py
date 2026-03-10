from sqlalchemy.orm import Session

from app.core.models import AppSetting


REQUIRE_EMAIL_VERIFICATION_KEY = "require_email_verification"
REQUIRE_REGISTRATION_CODE_KEY = "require_registration_code"
SMTP_HOST_KEY = "smtp_host"
SMTP_PORT_KEY = "smtp_port"
SMTP_USERNAME_KEY = "smtp_username"
SMTP_PASSWORD_KEY = "smtp_password"
SMTP_FROM_EMAIL_KEY = "smtp_from_email"
SMTP_USE_TLS_KEY = "smtp_use_tls"
SMTP_USE_SSL_KEY = "smtp_use_ssl"
EMAIL_VERIFICATION_TTL_MINUTES_KEY = "email_verification_ttl_minutes"


def _parse_bool(value: str, default: bool) -> bool:
    raw = str(value or "").strip().lower()
    if raw in {"1", "true", "yes", "on"}:
        return True
    if raw in {"0", "false", "no", "off"}:
        return False
    return bool(default)


def get_bool_setting(db: Session, key: str, default: bool = False) -> bool:
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not row:
        return bool(default)
    return _parse_bool(row.value, default)


def get_string_setting(db: Session, key: str, default: str = "") -> str:
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not row:
        return str(default or "")
    return str(row.value or "")


def get_int_setting(db: Session, key: str, default: int = 0) -> int:
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    if not row:
        return int(default)
    try:
        return int(str(row.value or "").strip())
    except (TypeError, ValueError):
        return int(default)


def set_bool_setting(db: Session, key: str, value: bool) -> bool:
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    normalized = "true" if bool(value) else "false"
    if row:
        row.value = normalized
    else:
        row = AppSetting(key=key, value=normalized)
        db.add(row)
    db.commit()
    return bool(value)


def set_string_setting(db: Session, key: str, value: str) -> str:
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    normalized = str(value or "").strip()
    if row:
        row.value = normalized
    else:
        row = AppSetting(key=key, value=normalized)
        db.add(row)
    db.commit()
    return normalized


def set_int_setting(db: Session, key: str, value: int) -> int:
    normalized = int(value)
    set_string_setting(db, key, str(normalized))
    return normalized
