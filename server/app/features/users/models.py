import uuid
from datetime import datetime, UTC
from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    
    # Internal database primary key
    # Used for joins and internal performance
    # Never exposed publicly
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key = True,
        index       = True
    )
    
    # Public-facing UUID
    # Safe to expose in URLs and APIs
    # Automatically generated using uuid
    public_id: Mapped[str] = mapped_column(
        String(36), # UUID string length
        unique  = True,
        index   = True,
        default = lambda: str(uuid.uuid4())
    )
    
    # Unique username (used for login in your system)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    # Unique email address
    # Used for account management but NOT exposed publicly
    email: Mapped[str]    = mapped_column(String(255), unique=True, index=True)
    # Hashed password (bcrypt)
    # Never store raw passwords
    # No length specified — SQLAlchemy defaults to TEXT
    hashed_password: Mapped[str]
    # Account creation timestamp
    # UTC-aware timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(UTC),
        nullable=False
    )
    # Last updated timestamp
    # Automatically updates when record is modified
    # Uses naive UTC (datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )