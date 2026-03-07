from __future__ import annotations

import re


_CONTROL_CHAR_RE = re.compile(r"[\x00-\x1f\x7f]")


def _decode_mojibake_utf8_latin1(value: str) -> str:
    raw = str(value or "")
    if not raw:
        return raw
    if not any(ch in raw for ch in ("Ã", "Â", "â")):
        return raw
    try:
        decoded = raw.encode("latin-1", errors="ignore").decode("utf-8", errors="ignore")
    except Exception:
        return raw
    raw_markers = sum(raw.count(marker) for marker in ("Ã", "Â", "â"))
    decoded_markers = sum(decoded.count(marker) for marker in ("Ã", "Â", "â"))
    return decoded if decoded and decoded_markers < raw_markers else raw


def normalize_display_text(value: str | None, *, max_len: int, allow_newlines: bool = False) -> str:
    text = _decode_mojibake_utf8_latin1(str(value or ""))
    text = _CONTROL_CHAR_RE.sub("", text)
    if not allow_newlines:
        text = re.sub(r"\s+", " ", text)
    text = text.strip()
    return text[:max_len]


def normalize_username(value: str | None) -> str:
    return normalize_display_text(value, max_len=50, allow_newlines=False)


def normalize_custom_status(value: str | None) -> str:
    return normalize_display_text(value, max_len=140, allow_newlines=False)

