from pydantic import BaseModel


class PushSubscriptionKeys(BaseModel):
    p256dh: str
    auth: str


class PushSubscriptionIn(BaseModel):
    endpoint: str
    keys: PushSubscriptionKeys
    expirationTime: int | None = None
    encoding: str | None = None


class PushUnsubscribeIn(BaseModel):
    endpoint: str
