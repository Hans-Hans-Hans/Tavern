from pydantic import BaseModel, Field
from datetime import datetime
from typing import Any

# Schema for creating a new channel
class ChannelCreate(BaseModel):
    name: str  # Name of the channel to create
    type: str = "text"  # Channel type (default is "text"); could be extended for "voice", etc.


# Schema for returning channel data in API responses
class ChannelOut(BaseModel):
    public_id: str  # Publicly exposed identifier for the channel
    name: str       # Channel name
    server_id: int  # The server this channel belongs to
    type: str       # Channel type
    created_at: datetime  # Timestamp when the channel was created

    class Config:
        from_attributes = True  # Allows Pydantic to read data from ORM model attributes


# Schema for updating an existing channel
class ChannelUpdate(BaseModel):
    name: str  # Only the name can be updated for now; could extend later for type, etc.


class BattlemapStateUpdate(BaseModel):
    state: dict[str, Any] = Field(default_factory=dict)


class BattlemapStateOut(BaseModel):
    state: dict[str, Any] = Field(default_factory=dict)
