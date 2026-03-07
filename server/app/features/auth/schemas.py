from pydantic import BaseModel, field_validator
import re


class FirstUseResetRequest(BaseModel):
    username: str
    current_password: str
    new_password: str

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


class RegisterRequestCodeResponse(BaseModel):
    detail: str
    expires_in_seconds: int


class RegisterVerifyCodeRequest(BaseModel):
    email: str
    code: str

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return str(value or "").strip().lower()

    @field_validator("code")
    @classmethod
    def validate_code(cls, value: str) -> str:
        raw = str(value or "").strip()
        if not re.match(r"^\d{6}$", raw):
            raise ValueError("Verification code must be 6 digits")
        return raw
