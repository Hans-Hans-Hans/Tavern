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
