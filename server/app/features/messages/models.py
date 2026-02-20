from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime, UTC
from app.db.base import Base


# Message model represents a single message in a channel
class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)  # Internal DB primary key
    public_id = Column(String, unique=True, index=True)  # Public-facing unique ID for API

    content = Column(Text, nullable=False)  # Text content of the message

    # Foreign keys to link message to a channel and a user
    channel_id = Column(Integer, ForeignKey("channels.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    parent_message_id = Column(Integer, ForeignKey("messages.id"), nullable=True)

    # Timestamps
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),  # Default to current UTC time
        nullable=False
    )
    
    edited_at = Column(
        DateTime(timezone=True),
        nullable=True  # Stores last edit timestamp; null if never edited
    )

    # SQLAlchemy relationships
    channel = relationship("Channel", back_populates="messages")  # Link back to channel
    user = relationship("User")  # Link to user who sent the message
    parent_message = relationship("Message", remote_side=[id], backref="replies")
    reactions = relationship("MessageReaction", back_populates="message", cascade="all, delete-orphan")

    # Property to easily get the username of the sender
    @property
    def username(self):
        return self.user.username if self.user else None


class MessageReaction(Base):
    __tablename__ = "message_reactions"
    __table_args__ = (
        UniqueConstraint("message_id", "user_id", "emoji", name="uq_message_reaction_message_user_emoji"),
    )

    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey("messages.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    emoji = Column(String(32), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False
    )

    message = relationship("Message", back_populates="reactions")
    user = relationship("User")
