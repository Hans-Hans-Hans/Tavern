from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

# Schema for creating a new message
class MessageCreate(BaseModel):
    content: str  # The actual text content of the message
    parent_message_public_id: Optional[str] = None


class MessageReactionToggle(BaseModel):
    emoji: str


class MessageReactionOut(BaseModel):
    emoji: str
    count: int
    reacted_by_me: bool


# Schema for returning message data in responses
class MessageOut(BaseModel):
    public_id: str          # Public identifier for the message (not DB ID)
    content: str            # The text content of the message
    user_id: int            # ID of the user who sent the message
    username: str           # Username of the sender
    channel_id: int         # ID of the channel where message resides
    created_at: datetime    # Timestamp when message was created
    edited_at: Optional[datetime] = None  # Timestamp when message was last edited, if any
    parent_message_public_id: Optional[str] = None
    thread_reply_count: int = 0
    reactions: List[MessageReactionOut] = Field(default_factory=list)

    class Config:
        # Enables populating schema from ORM model instances
        from_attributes = True


# Schema for updating/editing a message
class MessageUpdate(BaseModel):
    content: str  # New text content for the message
