import uuid
from datetime import datetime, UTC
from sqlalchemy import String, Integer, DateTime, ForeignKey, UniqueConstraint, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
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
    is_superadmin: Mapped[bool] = mapped_column(default=False, nullable=False)
    must_reset_password: Mapped[bool] = mapped_column(default=False, nullable=False)
    last_announcement_version: Mapped[int] = mapped_column(default=0, nullable=False)
    has_seen_tutorial: Mapped[bool] = mapped_column(default=False, nullable=False)
    username_color: Mapped[str | None] = mapped_column(String(16), nullable=True)
    name_emoji: Mapped[str | None] = mapped_column(String(16), nullable=True)
    custom_status: Mapped[str | None] = mapped_column(String(140), nullable=True)
    strip_upload_metadata: Mapped[bool] = mapped_column(default=False, nullable=False)
    appearance_settings: Mapped[str | None] = mapped_column(Text, nullable=True)
    discord_oauth_client_id: Mapped[str | None] = mapped_column(String(120), nullable=True)
    discord_oauth_client_secret: Mapped[str | None] = mapped_column(String(240), nullable=True)
    discord_oauth_redirect_uri: Mapped[str | None] = mapped_column(String(500), nullable=True)


class FriendRequest(Base):
    __tablename__ = "friend_requests"
    __table_args__ = (
        UniqueConstraint("requester_id", "addressee_id", name="uq_friend_request_pair"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    public_id: Mapped[str] = mapped_column(
        String(36),
        unique=True,
        index=True,
        default=lambda: str(uuid.uuid4())
    )
    requester_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    addressee_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(16), default="pending", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    requester = relationship("User", foreign_keys=[requester_id])
    addressee = relationship("User", foreign_keys=[addressee_id])
