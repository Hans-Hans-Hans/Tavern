from pydantic import BaseModel
from pydantic import Field
from typing import Any, Optional
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
    max_upload_size_mb: Optional[int] = None
    log_retention_days: Optional[int] = None
    message_retention_days: Optional[int] = None
    strip_upload_metadata: bool = False
    automod_enabled: bool = False
    automod_block_external_links: bool = False
    automod_block_invite_links: bool = False
    automod_blocked_terms: Optional[str] = None
    automod_blocked_extensions: Optional[str] = None
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
    """
    name: Optional[str] = None
    max_upload_size_mb: Optional[int] = Field(default=None, ge=0, le=102400)
    log_retention_days: Optional[int] = Field(default=None, ge=0, le=3650)
    message_retention_days: Optional[int] = Field(default=None, ge=-1, le=3650)
    strip_upload_metadata: Optional[bool] = None
    automod_enabled: Optional[bool] = None
    automod_block_external_links: Optional[bool] = None
    automod_block_invite_links: Optional[bool] = None
    automod_blocked_terms: Optional[str] = Field(default=None, max_length=4000)
    automod_blocked_extensions: Optional[str] = Field(default=None, max_length=1000)


class ServerUploadDiagnosticsOut(BaseModel):
    max_upload_size_mb: Optional[int] = None
    active_upload_sessions: int = 0
    pending_upload_bytes: int = 0
    uploads_24h_count: int = 0
    uploads_24h_bytes: int = 0


class ServerActivityEventOut(BaseModel):
    ts: str
    event_type: str
    actor_public_id: Optional[str] = None
    target: dict[str, Any] = Field(default_factory=dict)
    details: dict[str, Any] = Field(default_factory=dict)
