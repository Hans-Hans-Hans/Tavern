from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class DirectConversationOut(BaseModel):
    public_id: str
    other_user_public_id: str
    other_username: str
    created_at: datetime


class DirectMessageCreate(BaseModel):
    content: str


class DirectMessageOut(BaseModel):
    public_id: str
    conversation_public_id: str
    user_id: int
    username: str
    content: str
    created_at: datetime
    edited_at: Optional[datetime] = None
