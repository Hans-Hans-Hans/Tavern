from __future__ import annotations

from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
import re
from typing import Iterable
from urllib.parse import urlparse

try:
    from PIL import Image, ImageOps, UnidentifiedImageError
except Exception:  # pragma: no cover - optional dependency guard
    Image = None
    ImageOps = None

    class UnidentifiedImageError(Exception):
        pass


ROOT_DIR = Path(__file__).resolve().parents[3]
UPLOAD_DIR = ROOT_DIR / "server" / "uploads"
MESSAGE_UPLOAD_DIR = UPLOAD_DIR / "messages"
MESSAGE_FILE_UPLOAD_DIR = MESSAGE_UPLOAD_DIR / "files"
USER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "users"
SERVER_AVATAR_DIR = UPLOAD_DIR / "avatars" / "servers"

_UPLOAD_URL_PATTERN = re.compile(r"(?P<url>https?://[^\s)>\"]+|/uploads/[^\s)>\"]+)", flags=re.IGNORECASE)


@dataclass(frozen=True)
class ManagedUploadRef:
    url_path: str
    absolute_path: Path


def _extract_upload_path(url_or_path: str) -> str | None:
    raw = str(url_or_path or "").strip()
    if not raw:
        return None
    if raw.startswith("/uploads/"):
        return raw
    if raw.startswith("http://") or raw.startswith("https://"):
        try:
            parsed = urlparse(raw)
        except Exception:
            return None
        return parsed.path if str(parsed.path or "").startswith("/uploads/") else None
    return None


def _resolve_managed_upload_path(url_path: str) -> Path | None:
    normalized = str(url_path or "").split("?", 1)[0].split("#", 1)[0]
    if not normalized.startswith("/uploads/"):
        return None
    relative = normalized.removeprefix("/uploads/")
    if not relative:
        return None
    candidate = (UPLOAD_DIR / relative).resolve()
    upload_root = UPLOAD_DIR.resolve()
    try:
        candidate.relative_to(upload_root)
    except Exception:
        return None
    if not candidate.exists() or not candidate.is_file():
        return None
    return candidate


def collect_managed_upload_refs(raw_text: str | None) -> list[ManagedUploadRef]:
    refs: list[ManagedUploadRef] = []
    seen: set[str] = set()
    text = str(raw_text or "")
    for match in _UPLOAD_URL_PATTERN.finditer(text):
        url_path = _extract_upload_path(match.group("url") or "")
        if not url_path:
            continue
        normalized_path = url_path.split("?", 1)[0].split("#", 1)[0]
        if normalized_path in seen:
            continue
        absolute_path = _resolve_managed_upload_path(normalized_path)
        if not absolute_path:
            continue
        refs.append(ManagedUploadRef(url_path=normalized_path, absolute_path=absolute_path))
        seen.add(normalized_path)
    return refs


def delete_managed_upload_refs(raw_text: str | None) -> int:
    deleted = 0
    for ref in collect_managed_upload_refs(raw_text):
        try:
            ref.absolute_path.unlink(missing_ok=True)
            deleted += 1
        except Exception:
            continue
    return deleted


def delete_managed_upload_refs_for_messages(messages: Iterable[object]) -> int:
    deleted = 0
    for message in messages:
        content = getattr(message, "content", "")
        deleted += delete_managed_upload_refs(content)
    return deleted


def _infer_output_format(input_format: str | None) -> str:
    fmt = str(input_format or "").upper()
    if fmt in {"JPEG", "JPG"}:
        return "JPEG"
    if fmt == "PNG":
        return "PNG"
    if fmt == "WEBP":
        return "WEBP"
    if fmt == "GIF":
        return "GIF"
    return "PNG"


def strip_image_metadata_bytes(content: bytes) -> bytes:
    if not content or Image is None or ImageOps is None:
        return content
    try:
        with Image.open(BytesIO(content)) as src:
            if bool(getattr(src, "is_animated", False)):
                return content
            normalized = ImageOps.exif_transpose(src)
            fmt = _infer_output_format(getattr(src, "format", None))
            if normalized.mode == "P" and fmt != "PNG":
                normalized = normalized.convert("RGBA")
            if fmt == "JPEG" and normalized.mode not in {"RGB", "L"}:
                normalized = normalized.convert("RGB")
            if fmt == "GIF" and normalized.mode not in {"P", "L"}:
                normalized = normalized.convert("P")
            out = BytesIO()
            save_kwargs = {}
            if fmt == "JPEG":
                save_kwargs = {"quality": 92, "optimize": True}
            elif fmt == "PNG":
                save_kwargs = {"optimize": True}
            normalized.save(out, format=fmt, **save_kwargs)
            return out.getvalue() or content
    except (UnidentifiedImageError, OSError, ValueError):
        return content
    except Exception:
        return content

