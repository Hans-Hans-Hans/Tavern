from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# SCHEMA TO CREATE A SERVER
class ServerCreate(BaseModel):
    """
    Input schema when creating a server.
    Only the server name and visibility (public/private) are required.
    """
    name: str
    is_public: bool = False  # Default to private server

# SCHEMA TO RETURN SERVER INFO
class ServerOut(BaseModel):
    """
    Output schema for server info.
    Used for routes that return server details.
    """
    public_id: str           # Publicly exposed ID for URLs
    name: str                # Server name
    owner_id: int            # ID of the server owner
    is_public: bool          # Whether server is public or private
    created_at: datetime     # Timestamp when server was created
    updated_at: datetime     # Timestamp of last update

    class Config:
        from_attributes = True  # Allows SQLAlchemy models to be converted automatically

# SCHEMA FOR SERVER MEMBER OUTPUT
class ServerMemberOut(BaseModel):
    """
    Output schema for server members.
    Used when listing members or after adding a member.
    """
    user_id: int             # ID of the user
    server_id: int           # ID of the server
    role: str                # Role in server (owner, member, etc.)
    joined_at: datetime      # Timestamp when joined server
    updated_at: datetime     # Timestamp of last role update

    class Config:
        from_attributes = True

# SCHEMA TO UPDATE SERVER INFO
class ServerUpdate(BaseModel):
    """
    Input schema for updating server info.
    Currently only allows updating the name.
    """
    name: str
