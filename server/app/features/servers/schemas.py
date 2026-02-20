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
    nickname: Optional[str] = None
    joined_at: datetime      # Timestamp when joined server
    updated_at: datetime     # Timestamp of last role update

    class Config:
        from_attributes = True


class ServerMemberDetailOut(BaseModel):
    user_id: int
    user_public_id: str
    username: str
    nickname: Optional[str] = None
    server_id: int
    role: str
    role_public_id: Optional[str] = None
    joined_at: datetime
    updated_at: datetime


class ServerRoleBase(BaseModel):
    name: str
    can_manage_server: bool = False
    can_manage_channels: bool = False
    can_manage_members: bool = False
    can_manage_roles: bool = False
    can_moderate_messages: bool = False


class ServerRoleCreate(ServerRoleBase):
    pass


class ServerRoleUpdate(BaseModel):
    name: Optional[str] = None
    can_manage_server: Optional[bool] = None
    can_manage_channels: Optional[bool] = None
    can_manage_members: Optional[bool] = None
    can_manage_roles: Optional[bool] = None
    can_moderate_messages: Optional[bool] = None


class ServerRoleOut(ServerRoleBase):
    public_id: str
    server_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MemberRoleAssign(BaseModel):
    role_public_id: str


class MemberNicknameUpdate(BaseModel):
    nickname: Optional[str] = None

# SCHEMA TO UPDATE SERVER INFO
class ServerUpdate(BaseModel):
    """
    Input schema for updating server info.
    Currently only allows updating the name.
    """
    name: str
