from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class DirectConversationOut(BaseModel):
    public_id: str
    other_user_public_id: str
    other_username: str
    created_at: datetime
    last_message_at: datetime | None = None


class DirectMessageCreate(BaseModel):
    content: str


class DirectMessageOut(BaseModel):
    public_id: str
    conversation_public_id: str
    user_id: int
    user_public_id: str | None = None
    username: str
    username_color: str | None = None
    name_emoji: str | None = None
    content: str
    created_at: datetime
    edited_at: Optional[datetime] = None
