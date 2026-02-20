from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional
import re

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


class FriendUserOut(BaseModel):
    public_id: str
    username: str


class FriendRequestOut(BaseModel):
    public_id: str
    requester_public_id: str
    requester_username: str
    addressee_public_id: str
    addressee_username: str
    status: str
    created_at: datetime
    
