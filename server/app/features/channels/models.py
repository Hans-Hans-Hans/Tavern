from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, UTC
from app.db.base import Base


class ChannelCategory(Base):
    __tablename__ = "channel_categories"

    id = Column(Integer, primary_key=True, index=True)
    public_id = Column(String, unique=True, index=True)
    name = Column(String, nullable=False)
    server_id = Column(Integer, ForeignKey("servers.id"), nullable=False, index=True)
    position = Column(Integer, nullable=False, default=0)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    server = relationship("Server", back_populates="channel_categories")
    channels = relationship("Channel", back_populates="category")


class Channel(Base):
    __tablename__ = "channels"  # Table name in the database

    id = Column(Integer, primary_key=True, index=True)  # Primary key, indexed for faster lookups
    public_id = Column(String, unique=True, index=True)  # Public-facing unique identifier
    name = Column(String, nullable=False)  # Channel name, cannot be null
    server_id = Column(Integer, ForeignKey("servers.id"), nullable=False)  # Foreign key linking to parent server
    category_id = Column(Integer, ForeignKey("channel_categories.id"), nullable=True, index=True)
    position = Column(Integer, nullable=False, default=0)
    type = Column(String, default="text", nullable=False)  # Channel type (e.g., text or voice), defaults to text
    battlemap_state = Column(Text, nullable=True)  # JSON-serialized battlemap state for battlemap channels
    
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False
    )  # Timestamp when the channel was created, UTC timezone

    # Relationship to Server model
    # Allows accessing the parent server object from a channel instance
    server = relationship("Server", back_populates="channels")
    category = relationship("ChannelCategory", back_populates="channels")
    
    # Relationship to Message model
    # A channel can have many messages
    # Cascade delete ensures messages are deleted when the channel is deleted
    messages = relationship(
        "Message",
        back_populates="channel",
        cascade="all, delete-orphan"
    )
