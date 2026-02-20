import uuid
from datetime import datetime, UTC
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, UniqueConstraint
from sqlalchemy.orm import relationship

from app.db.base import Base


class DirectConversation(Base):
    __tablename__ = "direct_conversations"

    id = Column(Integer, primary_key=True, index=True)
    public_id = Column(String, unique=True, index=True, default=lambda: str(uuid.uuid4()))
    user_one_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_two_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(UTC), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_one_id", "user_two_id", name="uq_direct_conversation_pair"),
    )

    user_one = relationship("User", foreign_keys=[user_one_id])
    user_two = relationship("User", foreign_keys=[user_two_id])
    messages = relationship("DirectMessage", back_populates="conversation", cascade="all, delete-orphan")


class DirectMessage(Base):
    __tablename__ = "direct_messages"

    id = Column(Integer, primary_key=True, index=True)
    public_id = Column(String, unique=True, index=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(Integer, ForeignKey("direct_conversations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(UTC), nullable=False)
    edited_at = Column(DateTime(timezone=True), nullable=True)

    conversation = relationship("DirectConversation", back_populates="messages")
    user = relationship("User")
