from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional, Any
import re
import json
from app.core.text_sanitize import normalize_username, normalize_custom_status

class UserCreate(BaseModel):
    """
    Schema used for user registration.
    Validates:
    - username
    - email (via EmailStr)
    - password complexity
    """
    username: str
    email: EmailStr
    password: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        raw = normalize_username(value)
        if not raw:
            raise ValueError("Username is required")
        if len(raw) > 50:
            raise ValueError("Username must be 50 characters or fewer")
        return raw
    
    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        """
        Enforces password complexity:
        - Minimum 8 characters
        - At least one lowercase letter
        - At least one uppercase letter
        - At least one digit
        - At least one special character
        """
        
        if not re.match(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$",
            value
        ):
            raise ValueError(
                "Password must be 8+ chars, include upper, lower, number, and special character"
            )

        return value

class UserLogin(BaseModel):
    """
    Schema intended for login using email + password.
    Currently not used because OAuth2PasswordRequestForm is used instead.
    """
    email: EmailStr
    password: str

class UserOutPrivate(BaseModel):
    """
    Schema returned for the authenticated user.
    Includes private fields such as email.
    """
    public_id: str
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: datetime
    is_superadmin: bool = False
    must_reset_password: bool = False
    username_color: Optional[str] = None
    name_emoji: Optional[str] = None
    custom_status: Optional[str] = None
    strip_upload_metadata: bool = False
    appearance_settings: Optional[dict[str, Any]] = None

    @field_validator("appearance_settings", mode="before")
    @classmethod
    def parse_appearance_settings(cls, value):
        if value is None:
            return None
        if isinstance(value, dict):
            return value
        if isinstance(value, str):
            raw = value.strip()
            if not raw:
                return None
            try:
                parsed = json.loads(raw)
            except Exception:
                return None
            return parsed if isinstance(parsed, dict) else None
        return None
    
    class Config:
        # Allows returning SQLAlchemy model objects directly
        from_attributes = True
        
# Public-facing user schema
# Does NOT include email
class UserOutPublic(BaseModel):
    """
    Schema returned when viewing another user's profile.
    Email intentionally excluded.
    """
    public_id: str
    username: str
    username_color: Optional[str] = None
    name_emoji: Optional[str] = None
    custom_status: Optional[str] = None
    strip_upload_metadata: Optional[bool] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
        
class Token(BaseModel):
    """
    JWT token response schema.
    Used for documenting login responses.
    """
    access_token: str
    token_type: str = "bearer"
    
class UserUpdate(BaseModel):
    """
    Schema for updating user information.
    All fields optional to allow partial updates.
    """
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    username_color: Optional[str] = None
    name_emoji: Optional[str] = None
    custom_status: Optional[str] = None
    strip_upload_metadata: Optional[bool] = None

    @field_validator("username")
    @classmethod
    def validate_updated_username(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        raw = normalize_username(value)
        if not raw:
            raise ValueError("username cannot be empty")
        return raw

    @field_validator("username_color")
    @classmethod
    def validate_username_color(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        raw = value.strip()
        if not raw:
            return None
        if not re.match(r"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$", raw):
            raise ValueError("username_color must be a hex color like #ff8800")
        return raw.lower()

    @field_validator("name_emoji")
    @classmethod
    def validate_name_emoji(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        raw = value.strip()
        if not raw:
            return None
        glyphs = [ch for ch in raw if not ch.isspace()]
        if not glyphs:
            return None
        return "".join(glyphs[:2])

    @field_validator("custom_status")
    @classmethod
    def validate_custom_status(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        raw = normalize_custom_status(value)
        if not raw:
            return None
        return raw


class FriendUserOut(BaseModel):
    public_id: str
    username: str
    custom_status: Optional[str] = None


class FriendRequestOut(BaseModel):
    public_id: str
    requester_public_id: str
    requester_username: str
    addressee_public_id: str
    addressee_username: str
    status: str
    created_at: datetime


class FriendRequestHistoryOut(BaseModel):
    public_id: str
    direction: str
    other_public_id: str
    other_username: str
    status: str
    created_at: datetime
    updated_at: datetime


class UserAppearanceUpdate(BaseModel):
    appearance_settings: dict[str, Any]


class UserDiscordOauthSettingsOut(BaseModel):
    client_id: Optional[str] = None
    redirect_uri: Optional[str] = None
    has_client_secret: bool = False


class UserDiscordOauthSettingsUpdate(BaseModel):
    client_id: Optional[str] = None
    client_secret: Optional[str] = None
    redirect_uri: Optional[str] = None
    clear_client_secret: bool = False
