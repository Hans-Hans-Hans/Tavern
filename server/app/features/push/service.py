import json
from concurrent.futures import ThreadPoolExecutor
from typing import Iterable

from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import SessionLocal
from app.features.push.models import PushSubscription

try:
    from pywebpush import WebPushException, webpush
except Exception:  # pragma: no cover - import availability at runtime
    WebPushException = Exception
    webpush = None


def push_enabled() -> bool:
    return bool(settings.VAPID_PUBLIC_KEY and settings.VAPID_PRIVATE_KEY and webpush is not None)

_PUSH_EXECUTOR = ThreadPoolExecutor(max_workers=4, thread_name_prefix="push-delivery")


def upsert_subscription(db: Session, user_id: int, subscription: dict):
    endpoint = str(subscription.get("endpoint") or "").strip()
    keys = subscription.get("keys") or {}
    p256dh = str(keys.get("p256dh") or "").strip()
    auth = str(keys.get("auth") or "").strip()
    encoding = str(subscription.get("encoding") or "aes128gcm").strip().lower()
    if encoding not in {"aes128gcm", "aesgcm"}:
        encoding = "aes128gcm"

    if not endpoint or not p256dh or not auth:
        raise ValueError("Invalid push subscription payload")

    row = db.query(PushSubscription).filter(PushSubscription.endpoint == endpoint).first()
    if not row:
        row = PushSubscription(
            user_id=user_id,
            endpoint=endpoint,
            p256dh=p256dh,
            auth=auth,
            encoding=encoding,
        )
        db.add(row)
    else:
        row.user_id = user_id
        row.p256dh = p256dh
        row.auth = auth
        row.encoding = encoding

    db.commit()
    db.refresh(row)
    return row


def unsubscribe_endpoint(db: Session, user_id: int, endpoint: str):
    row = (
        db.query(PushSubscription)
        .filter(PushSubscription.user_id == user_id, PushSubscription.endpoint == endpoint)
        .first()
    )
    if not row:
        return {"detail": "Subscription not found"}
    db.delete(row)
    db.commit()
    return {"detail": "Subscription removed"}


def _build_subscription_info(row: PushSubscription) -> dict:
    return {
        "endpoint": row.endpoint,
        "keys": {
            "p256dh": row.p256dh,
            "auth": row.auth,
        },
    }


def _safe_push_payload(payload: dict) -> dict:
    # APNs-backed web push (iOS/iPadOS) is strict about payload size.
    # Keep a compact payload and cap body/content fields.
    data = dict(payload or {})
    if "body" in data:
        data["body"] = str(data.get("body") or "")[:180]
    if "content" in data:
        data["content"] = str(data.get("content") or "")[:180]
    if "title" in data:
        data["title"] = str(data.get("title") or "")[:120]
    if "tag" in data:
        data["tag"] = str(data.get("tag") or "")[:120]
    if "url" in data:
        data["url"] = str(data.get("url") or "")[:256]

    encoded = json.dumps(data, ensure_ascii=False)
    if len(encoded.encode("utf-8")) <= 3000:
        return data

    # Last resort: remove verbose fields to avoid push provider rejections.
    data.pop("content", None)
    data["body"] = str(data.get("body") or "")[:120]
    data["title"] = str(data.get("title") or "Tavern")[:80]
    return data


def send_push_to_user_ids(db: Session, user_ids: Iterable[int], payload: dict):
    if not push_enabled():
        return

    target_ids = [int(uid) for uid in set(user_ids) if uid is not None]
    if not target_ids:
        return

    rows = (
        db.query(PushSubscription)
        .filter(PushSubscription.user_id.in_(target_ids))
        .all()
    )
    if not rows:
        return

    safe_payload = _safe_push_payload(payload)
    body = json.dumps(safe_payload, ensure_ascii=False)
    vapid_claims = {"sub": settings.VAPID_SUBJECT}
    dead_ids: list[int] = []

    for row in rows:
        try:
            webpush(
                subscription_info=_build_subscription_info(row),
                data=body,
                vapid_private_key=settings.VAPID_PRIVATE_KEY,
                vapid_claims=vapid_claims,
                content_encoding=(row.encoding or "aes128gcm"),
            )
        except WebPushException as exc:  # type: ignore[misc]
            status_code = getattr(getattr(exc, "response", None), "status_code", None)
            if status_code in {404, 410}:
                dead_ids.append(row.id)
        except Exception:
            # Best-effort delivery; ignore transient failures.
            continue

    if dead_ids:
        db.query(PushSubscription).filter(PushSubscription.id.in_(dead_ids)).delete(synchronize_session=False)
        db.commit()


def send_push_to_user_ids_background(user_ids: Iterable[int], payload: dict):
    """Dispatch push notifications in a background worker, decoupled from request/WS lifecycle."""
    if not push_enabled():
        return
    target_ids = [int(uid) for uid in set(user_ids) if uid is not None]
    if not target_ids:
        return
    safe_payload = dict(payload or {})

    def _task():
        db = SessionLocal()
        try:
            send_push_to_user_ids(db, target_ids, safe_payload)
        except Exception:
            # Best-effort background delivery.
            pass
        finally:
            db.close()

    _PUSH_EXECUTOR.submit(_task)
