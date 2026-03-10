from datetime import datetime, UTC
import uuid

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class RegistrationCode(Base):
    __tablename__ = "registration_codes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    public_id: Mapped[str] = mapped_column(String(64), unique=True, index=True, default=lambda: str(uuid.uuid4()))
    code_digest: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    note: Mapped[str | None] = mapped_column(String(200), nullable=True)
    created_by_user_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    used_by_user_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )
