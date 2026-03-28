from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from fastapi import HTTPException
import secrets
import json
from urllib.parse import urlparse
from app.features.users import models, schemas
from app.core.security import hash_password, verify_password
from app.core.announcements import CURRENT_ANNOUNCEMENT_VERSION, build_announcement_message
from app.core.text_sanitize import normalize_username, normalize_custom_status

MAX_APPEARANCE_SETTINGS_BYTES = 120_000


def _resolve_friend_target_user(db: Session, target_identifier: str):
    raw = str(target_identifier or "").strip()
    if not raw:
        raise HTTPException(status_code=400, detail="User identifier is required")

    # Full public ID remains the primary lookup path.
    by_public_id = db.query(models.User).filter(models.User.public_id == raw).first()
    if by_public_id:
        return by_public_id

    # Alternative format: username:abcd (last 4 chars of public_id, case-insensitive)
    if ":" in raw:
        username_part, suffix_part = raw.rsplit(":", 1)
        username = username_part.strip()
        suffix = suffix_part.strip().lower()
        if username and len(suffix) == 4 and suffix.isalnum():
            by_username = db.query(models.User).filter(models.User.username == username).first()
            public_id_compact = str(by_username.public_id or "").replace("-", "").lower() if by_username else ""
            if by_username and (public_id_compact.startswith(suffix) or public_id_compact.endswith(suffix)):
                return by_username

    raise HTTPException(status_code=404, detail="User not found")

# Creates a new user and persists to database
# Responsibility:
# - Hash password
# - Instantiate User model
# - Commit transaction
# - Return persisted object
def create_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    is_superadmin: bool = False,
    must_reset_password: bool = False,
):
    username = normalize_username(username)
    email = str(email or "").strip().lower()
    # Hash plain-text password before storing
    hashed_pw = hash_password(password)
    
    user = models.User(
        username=username,
        email=email,
        hashed_password=hashed_pw,
        is_superadmin=is_superadmin,
        must_reset_password=must_reset_password,
    )
    
    db.add(user)
    db.commit()         # Writes to database
    db.refresh(user)    # Refresh to get generated fields (id, public_id, timestamps)
    
    return user

# Authenticates a user by username + password
# Returns:
# - User object if valid
# - None if invalid credentials
def authenticate_user(db: Session, username: str, password: str):
    # Fetch user by username
    user = db.query(models.User).filter(models.User.username == username).first()
    
    if not user:
        return None
    
    # Compare provided password against stored hash
    if not verify_password(password, user.hashed_password):
        return None
    return user


def set_user_password(db: Session, user: models.User, new_password: str, must_reset_password: bool = False):
    user.hashed_password = hash_password(new_password)
    user.must_reset_password = must_reset_password
    db.commit()
    db.refresh(user)
    return user

# Retrieve a user by public-facing UUID
# Used for GET /users/{public_id}
def get_user_by_public_id(db: Session, public_id: str):
    return db.query(models.User).filter(
        models.User.public_id == public_id
    ).first()

# Update a user’s username/email
# Returns:
# - Updated user object
# - None if user not found
def update_user(db: Session, public_id: str, user_in: schemas.UserUpdate):
    user = db.query(models.User).filter(models.User.public_id == public_id).first()
    
    if not user:
        return None
    # Only update fields if provided (partial update behavior)
    provided = getattr(user_in, "model_fields_set", set())
    if "username" in provided and user_in.username is not None:
        user.username = normalize_username(user_in.username)
        
    if "email" in provided and user_in.email is not None:
        user.email = user_in.email
    if "username_color" in provided:
        user.username_color = user_in.username_color
    if "name_emoji" in provided:
        user.name_emoji = user_in.name_emoji
    if "custom_status" in provided:
        user.custom_status = normalize_custom_status(user_in.custom_status) if user_in.custom_status else None
    if "strip_upload_metadata" in provided:
        user.strip_upload_metadata = bool(user_in.strip_upload_metadata)
        
    db.commit()         # Persist changes
    db.refresh(user)    # Refresh to reflect updated state
    return user


def get_user_appearance_settings(user: models.User) -> dict | None:
    raw = str(user.appearance_settings or "").strip()
    if not raw:
        return None
    try:
        parsed = json.loads(raw)
    except Exception:
        return None
    return parsed if isinstance(parsed, dict) else None


def update_user_appearance_settings(db: Session, user: models.User, appearance_settings: dict) -> models.User:
    payload = appearance_settings if isinstance(appearance_settings, dict) else {}
    encoded = json.dumps(payload, separators=(",", ":"), ensure_ascii=False)
    if len(encoded.encode("utf-8")) > MAX_APPEARANCE_SETTINGS_BYTES:
        raise HTTPException(status_code=413, detail="Appearance settings payload is too large")
    user.appearance_settings = encoded
    db.commit()
    db.refresh(user)
    return user


def get_user_discord_oauth_settings(user: models.User) -> dict:
    return {
        "client_id": str(user.discord_oauth_client_id or "").strip() or None,
        "redirect_uri": str(user.discord_oauth_redirect_uri or "").strip() or None,
        "has_client_secret": bool(str(user.discord_oauth_client_secret or "").strip()),
    }


def _normalize_redirect_uri(value: str | None) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    parsed = urlparse(raw)
    if parsed.scheme.lower() not in {"https", "http"} or not parsed.netloc:
        raise HTTPException(status_code=400, detail="redirect_uri must be a valid http(s) URL")
    return raw


def update_user_discord_oauth_settings(
    db: Session,
    user: models.User,
    payload: schemas.UserDiscordOauthSettingsUpdate,
) -> models.User:
    provided = getattr(payload, "model_fields_set", set())
    if "client_id" in provided:
        raw_client_id = str(payload.client_id or "").strip()
        user.discord_oauth_client_id = raw_client_id or None
    if "redirect_uri" in provided:
        user.discord_oauth_redirect_uri = _normalize_redirect_uri(payload.redirect_uri)
    if payload.clear_client_secret:
        user.discord_oauth_client_secret = None
    elif "client_secret" in provided:
        raw_secret = str(payload.client_secret or "").strip()
        if raw_secret:
            user.discord_oauth_client_secret = raw_secret
    db.commit()
    db.refresh(user)
    return user


def are_friends(db: Session, user_a_id: int, user_b_id: int) -> bool:
    if user_a_id == user_b_id:
        return False
    friendship = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                and_(
                    models.FriendRequest.requester_id == user_a_id,
                    models.FriendRequest.addressee_id == user_b_id,
                ),
                and_(
                    models.FriendRequest.requester_id == user_b_id,
                    models.FriendRequest.addressee_id == user_a_id,
                ),
            ),
        )
        .first()
    )
    return friendship is not None


def list_friends(db: Session, user_id: int):
    accepted = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                models.FriendRequest.requester_id == user_id,
                models.FriendRequest.addressee_id == user_id,
            ),
        )
        .order_by(models.FriendRequest.updated_at.desc())
        .all()
    )
    friends = []
    for row in accepted:
        other = row.addressee if row.requester_id == user_id else row.requester
        friends.append(
            {
                "public_id": other.public_id,
                "username": other.username,
                "custom_status": other.custom_status,
            }
        )
    return friends


def list_friend_requests(db: Session, user_id: int):
    incoming_rows = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.addressee_id == user_id,
            models.FriendRequest.status == "pending",
        )
        .order_by(models.FriendRequest.created_at.desc())
        .all()
    )
    outgoing_rows = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == user_id,
            models.FriendRequest.status == "pending",
        )
        .order_by(models.FriendRequest.created_at.desc())
        .all()
    )
    incoming = [_friend_request_out(row) for row in incoming_rows]
    outgoing = [_friend_request_out(row) for row in outgoing_rows]
    return {"incoming": incoming, "outgoing": outgoing}


def list_friend_request_history(db: Session, user_id: int, limit: int = 120):
    safe_limit = max(1, min(500, int(limit)))
    rows = (
        db.query(models.FriendRequest)
        .filter(
            or_(
                models.FriendRequest.requester_id == user_id,
                models.FriendRequest.addressee_id == user_id,
            ),
        )
        .order_by(models.FriendRequest.updated_at.desc())
        .limit(safe_limit)
        .all()
    )
    result = []
    for row in rows:
        is_outgoing = int(row.requester_id) == int(user_id)
        other = row.addressee if is_outgoing else row.requester
        result.append(
            {
                "public_id": row.public_id,
                "direction": "outgoing" if is_outgoing else "incoming",
                "other_public_id": other.public_id,
                "other_username": other.username,
                "status": row.status,
                "created_at": row.created_at,
                "updated_at": row.updated_at,
            }
        )
    return result


def send_friend_request(db: Session, requester_id: int, target_public_id: str):
    target = _resolve_friend_target_user(db, target_public_id)
    if target.id == requester_id:
        raise HTTPException(status_code=400, detail="Cannot friend yourself")

    if are_friends(db, requester_id, target.id):
        raise HTTPException(status_code=400, detail="Already friends")

    reverse_pending = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == target.id,
            models.FriendRequest.addressee_id == requester_id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )
    if reverse_pending:
        reverse_pending.status = "accepted"
        db.commit()
        db.refresh(reverse_pending)
        return _friend_request_out(reverse_pending)

    existing = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.requester_id == requester_id,
            models.FriendRequest.addressee_id == target.id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )
    if existing:
        return _friend_request_out(existing)

    row = models.FriendRequest(
        requester_id=requester_id,
        addressee_id=target.id,
        status="pending",
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return _friend_request_out(row)


def accept_friend_request(db: Session, user_id: int, request_public_id: str):
    row = db.query(models.FriendRequest).filter(models.FriendRequest.public_id == request_public_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Friend request not found")
    if row.addressee_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    if row.status != "pending":
        return _friend_request_out(row)

    row.status = "accepted"
    db.commit()
    db.refresh(row)
    return _friend_request_out(row)


def decline_or_cancel_friend_request(db: Session, user_id: int, request_public_id: str):
    row = db.query(models.FriendRequest).filter(models.FriendRequest.public_id == request_public_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Friend request not found")
    if user_id not in (row.requester_id, row.addressee_id):
        raise HTTPException(status_code=403, detail="Not authorized")
    if row.status != "pending":
        raise HTTPException(status_code=400, detail="Request is not pending")
    db.delete(row)
    db.commit()
    return {"detail": "Friend request removed"}


def remove_friend(db: Session, user_id: int, friend_public_id: str):
    friend = db.query(models.User).filter(models.User.public_id == friend_public_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User not found")
    row = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                and_(
                    models.FriendRequest.requester_id == user_id,
                    models.FriendRequest.addressee_id == friend.id,
                ),
                and_(
                    models.FriendRequest.requester_id == friend.id,
                    models.FriendRequest.addressee_id == user_id,
                ),
            ),
        )
        .first()
    )
    if not row:
        raise HTTPException(status_code=404, detail="Friendship not found")
    db.delete(row)
    db.commit()
    return {"detail": "Friend removed"}


def _friend_request_out(row: models.FriendRequest):
    return {
        "public_id": row.public_id,
        "requester_public_id": row.requester.public_id,
        "requester_username": row.requester.username,
        "addressee_public_id": row.addressee.public_id,
        "addressee_username": row.addressee.username,
        "status": row.status,
        "created_at": row.created_at,
    }


def _ordered_pair(user_a_id: int, user_b_id: int) -> tuple[int, int]:
    return (user_a_id, user_b_id) if user_a_id < user_b_id else (user_b_id, user_a_id)


def _ensure_system_guide_user(db: Session):
    guide = db.query(models.User).filter(models.User.email == "tavern-guide@tavern.local").first()
    if guide:
        return guide

    username = "tavern_guide"
    if db.query(models.User).filter(models.User.username == username).first():
        username = "tavern_guide_system"

    guide = models.User(
        username=username,
        email="tavern-guide@tavern.local",
        hashed_password=hash_password(secrets.token_urlsafe(48)),
        is_superadmin=False,
        must_reset_password=False,
        last_announcement_version=CURRENT_ANNOUNCEMENT_VERSION,
    )
    db.add(guide)
    db.flush()
    return guide


def _ensure_friendship(db: Session, user_a_id: int, user_b_id: int):
    existing = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.status == "accepted",
            or_(
                and_(
                    models.FriendRequest.requester_id == user_a_id,
                    models.FriendRequest.addressee_id == user_b_id,
                ),
                and_(
                    models.FriendRequest.requester_id == user_b_id,
                    models.FriendRequest.addressee_id == user_a_id,
                ),
            ),
        )
        .first()
    )
    if existing:
        return

    pending = (
        db.query(models.FriendRequest)
        .filter(
            or_(
                and_(
                    models.FriendRequest.requester_id == user_a_id,
                    models.FriendRequest.addressee_id == user_b_id,
                ),
                and_(
                    models.FriendRequest.requester_id == user_b_id,
                    models.FriendRequest.addressee_id == user_a_id,
                ),
            ),
        )
        .first()
    )
    if pending:
        pending.status = "accepted"
        return

    db.add(
        models.FriendRequest(
            requester_id=user_a_id,
            addressee_id=user_b_id,
            status="accepted",
        )
    )


def send_system_announcement_if_needed(db: Session, user: models.User, force: bool = False) -> bool:
    if not force and user.last_announcement_version >= CURRENT_ANNOUNCEMENT_VERSION:
        return False

    guide_user = _ensure_system_guide_user(db)
    if guide_user.id == user.id:
        return False

    _ensure_friendship(db, guide_user.id, user.id)

    from app.features.dms.models import DirectConversation, DirectMessage

    user_one_id, user_two_id = _ordered_pair(guide_user.id, user.id)
    convo = (
        db.query(DirectConversation)
        .filter(
            DirectConversation.user_one_id == user_one_id,
            DirectConversation.user_two_id == user_two_id,
        )
        .first()
    )
    if not convo:
        convo = DirectConversation(user_one_id=user_one_id, user_two_id=user_two_id)
        db.add(convo)
        db.flush()

    version_marker = f"Update version: v{CURRENT_ANNOUNCEMENT_VERSION}"
    if not force:
        existing = (
            db.query(DirectMessage.id)
            .filter(
                DirectMessage.conversation_id == convo.id,
                DirectMessage.user_id == guide_user.id,
                DirectMessage.content.like(f"%{version_marker}%"),
            )
            .first()
        )
        if existing:
            user.last_announcement_version = CURRENT_ANNOUNCEMENT_VERSION
            db.commit()
            db.refresh(user)
            return False

    db.add(
        DirectMessage(
            conversation_id=convo.id,
            user_id=guide_user.id,
            content=build_announcement_message(),
        )
    )
    user.last_announcement_version = CURRENT_ANNOUNCEMENT_VERSION
    db.commit()
    db.refresh(user)
    return True
