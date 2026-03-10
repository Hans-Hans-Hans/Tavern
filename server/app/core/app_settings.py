from sqlalchemy.orm import Session

from app.core.models import AppSetting


REQUIRE_REGISTRATION_CODE_KEY = "require_registration_code"


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
