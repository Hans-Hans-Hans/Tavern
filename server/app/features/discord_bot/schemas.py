from pydantic import BaseModel, Field, field_validator


class DiscordMessageSendIn(BaseModel):
    channel_id: str = Field(min_length=5, max_length=30)
    content: str = Field(min_length=1, max_length=2000)

    @field_validator("channel_id")
    @classmethod
    def validate_channel_id(cls, value: str) -> str:
        text = str(value or "").strip()
        if not text.isdigit():
            raise ValueError("channel_id must be a Discord snowflake ID")
        return text


class DiscordVoiceJoinIn(BaseModel):
    channel_id: str = Field(min_length=5, max_length=30)
    self_mute: bool = False
    self_deaf: bool = False

    @field_validator("channel_id")
    @classmethod
    def validate_channel_id(cls, value: str) -> str:
        text = str(value or "").strip()
        if not text.isdigit():
            raise ValueError("channel_id must be a Discord snowflake ID")
        return text


class DiscordVoiceLeaveIn(BaseModel):
    guild_id: str | None = Field(default=None, min_length=5, max_length=30)

    @field_validator("guild_id")
    @classmethod
    def validate_guild_id(cls, value: str | None) -> str | None:
        if value is None:
            return None
        text = str(value or "").strip()
        if not text:
            return None
        if not text.isdigit():
            raise ValueError("guild_id must be a Discord snowflake ID")
        return text


class DiscordVoiceSyncIn(BaseModel):
    channel_id: str = Field(min_length=5, max_length=30)

    @field_validator("channel_id")
    @classmethod
    def validate_channel_id(cls, value: str) -> str:
        text = str(value or "").strip()
        if not text.isdigit():
            raise ValueError("channel_id must be a Discord snowflake ID")
        return text
