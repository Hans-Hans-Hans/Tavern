from passlib.context import CryptContext
from jose import JWTError, jwt, ExpiredSignatureError
from datetime import datetime, timedelta, UTC
from urllib.parse import unquote
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.features.users import models

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme (used for Swagger, optional now with cookies)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str) -> str:
    """Hash a plain text password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain text password against a stored hashed password."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create a signed JWT access token with expiration.
    """
    to_encode = data.copy()
    expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def get_current_user(request: Request, db: Session = Depends(get_db)) -> models.User:
    """
    Dependency to get the current user from JWT stored in a cookie.

    Raises 401 if:
    - Token missing
    - Token invalid
    - Token expired
    - User not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"www-authenticate": "Bearer"}
    )

    token = extract_access_token_from_cookie(request.cookies.get("access_token"))
    if not token:
        raise credentials_exception

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        public_id: str = payload.get("sub")
        if public_id is None:
            raise credentials_exception
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.public_id == public_id).first()
    if user is None:
        raise credentials_exception

    return user

def decode_access_token(token: str) -> dict:
    """
    Decode a JWT access token and return the payload.
    Raises JWTError or ExpiredSignatureError if invalid/expired.
    """
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])


def extract_access_token_from_cookie(raw_token: str | None) -> str | None:
    """
    Normalize auth cookie values across browsers/proxies.
    Supports plain token and legacy "Bearer <token>" storage.
    """
    if not raw_token:
        return None

    token = unquote(str(raw_token)).strip().strip('"').strip("'")
    if token.lower().startswith("bearer "):
        token = token[7:].strip()
    return token or None
