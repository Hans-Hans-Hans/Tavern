from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime, UTC
import uuid
from app.db.base import Base


# Server table
class Server(Base):
    __tablename__ = "servers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)  # Primary key
    public_id: Mapped[str] = mapped_column(
        String(36), unique=True, index=True, default=lambda: str(uuid.uuid4())
    )  # Public-facing UUID
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)  # Server name
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))  # Server owner
    is_public: Mapped[bool] = mapped_column(Boolean, default=False)  # Visibility
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))  # Creation timestamp
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC), onupdate=datetime.now(UTC))  # Last updated

    # Relationship to members
    members = relationship(
        "ServerMember",
        back_populates="server",
        cascade="all, delete-orphan"  # Deleting server deletes members
    )

    # Relationship to channels
    channels = relationship(
        "Channel",
        back_populates="server",
        cascade="all, delete-orphan"  # Deleting server deletes channels
    )


# Server members table
class ServerMember(Base):
    __tablename__ = "server_members"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    server_id: Mapped[int] = mapped_column(Integer, ForeignKey("servers.id"))  # FK to server
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))  # FK to user
    role: Mapped[str] = mapped_column(String(20), default="member")  # Role in server
    nickname: Mapped[str | None] = mapped_column(String(50), nullable=True)
    role_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("server_roles.id"), nullable=True)
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))  # Join timestamp
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC), onupdate=datetime.now(UTC))  # Last updated

    # Relationships for easy ORM access
    server = relationship("Server", back_populates="members")
    user = relationship("User")  # Link to User table
    role_ref = relationship("ServerRole")


class ServerRole(Base):
    __tablename__ = "server_roles"
    __table_args__ = (
        UniqueConstraint("server_id", "name", name="uq_server_role_name"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    public_id: Mapped[str] = mapped_column(String(36), unique=True, index=True, default=lambda: str(uuid.uuid4()))
    server_id: Mapped[int] = mapped_column(Integer, ForeignKey("servers.id"), index=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    can_manage_server: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    can_manage_channels: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    can_manage_members: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    can_manage_roles: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    can_moderate_messages: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC))
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(UTC), onupdate=datetime.now(UTC))

    server = relationship("Server")
