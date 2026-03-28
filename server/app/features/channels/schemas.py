from pydantic import BaseModel, Field
from datetime import datetime
from typing import Any

# Schema for creating a new channel
class ChannelCreate(BaseModel):
    name: str  # Name of the channel to create
    type: str = "text"  # Channel type (default is "text"); could be extended for "voice", etc.
    category_public_id: str | None = None


# Schema for returning channel data in API responses
class ChannelOut(BaseModel):
    public_id: str  # Publicly exposed identifier for the channel
    name: str       # Channel name
    server_id: int  # The server this channel belongs to
    category_public_id: str | None = None
    category_name: str | None = None
    position: int = 0
    type: str       # Channel type
    created_at: datetime  # Timestamp when the channel was created

    class Config:
        from_attributes = True  # Allows Pydantic to read data from ORM model attributes


# Schema for updating an existing channel
class ChannelUpdate(BaseModel):
    name: str  # Only the name can be updated for now; could extend later for type, etc.


class ChannelCategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)


class ChannelCategoryOut(BaseModel):
    public_id: str
    name: str
    position: int
    server_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ServerChannelLayoutIn(BaseModel):
    layout_tokens: list[str] = Field(default_factory=list)
    separators: dict[str, str] = Field(default_factory=dict)
    collapsed: dict[str, bool] = Field(default_factory=dict)


class ServerChannelLayoutOut(BaseModel):
    layout_tokens: list[str] = Field(default_factory=list)
    separators: dict[str, str] = Field(default_factory=dict)
    collapsed: dict[str, bool] = Field(default_factory=dict)


class BattlemapStateUpdate(BaseModel):
    state: dict[str, Any] = Field(default_factory=dict)


class BattlemapStateOut(BaseModel):
    state: dict[str, Any] = Field(default_factory=dict)
