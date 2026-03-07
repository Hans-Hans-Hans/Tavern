from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_current_user
from app.db.deps import get_db
from app.features.push import schemas, service
from app.features.users.models import User

router = APIRouter(prefix="/push", tags=["Push Notifications"])


@router.get("/vapid-public-key")
def get_vapid_public_key(current_user: User = Depends(get_current_user)):
    _ = current_user
    if not settings.VAPID_PUBLIC_KEY:
        raise HTTPException(status_code=503, detail="Push notifications are not configured")
    return {"public_key": settings.VAPID_PUBLIC_KEY}


@router.post("/subscribe")
def subscribe(
    payload: schemas.PushSubscriptionIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not service.push_enabled():
        raise HTTPException(status_code=503, detail="Push notifications are not configured")

    try:
        service.upsert_subscription(db, current_user.id, payload.model_dump())
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"detail": "Subscribed"}


@router.post("/unsubscribe")
def unsubscribe(
    payload: schemas.PushUnsubscribeIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = service.unsubscribe_endpoint(db, current_user.id, payload.endpoint)
    return result
