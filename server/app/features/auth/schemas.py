from pydantic import BaseModel, field_validator
import re

from app.features.users.schemas import UserCreate


class FirstUseResetRequest(BaseModel):
    username: str
    current_password: str
    new_password: str
    remember_me: bool = False

    @field_validator("new_password")
    @classmethod
    def validate_new_password(cls, value: str) -> str:
        if not re.match(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$",
            value
        ):
            raise ValueError(
                "Password must be 8+ chars, include upper, lower, number, and special character"
            )
        return value


class RegisterRequest(UserCreate):
    registration_code: str | None = None

    @field_validator("registration_code")
    @classmethod
    def normalize_registration_code(cls, value: str | None) -> str | None:
        if value is None:
            return None
        raw = str(value or "").strip().upper()
        if not raw:
            return None
        if not re.match(r"^[A-Z0-9\-]{4,64}$", raw):
            raise ValueError("registration_code must be 4-64 chars using A-Z, 0-9, or '-'")
        return raw
