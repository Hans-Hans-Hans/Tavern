from __future__ import annotations

import json
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parents[3]
AUDIT_DIR = ROOT_DIR / "server" / "logs"
AUDIT_FILE = AUDIT_DIR / "audit.log.jsonl"


def write_audit_event(event_type: str, actor_user_id: int | None, actor_public_id: str | None, target: dict[str, Any] | None = None, details: dict[str, Any] | None = None) -> None:
    try:
        AUDIT_DIR.mkdir(parents=True, exist_ok=True)
        payload = {
            "ts": datetime.now(UTC).isoformat(),
            "event_type": event_type,
            "actor_user_id": actor_user_id,
            "actor_public_id": actor_public_id,
            "target": target or {},
            "details": details or {},
        }
        with AUDIT_FILE.open("a", encoding="utf-8") as f:
            f.write(json.dumps(payload, separators=(",", ":"), ensure_ascii=False))
            f.write("\n")
    except Exception:
        # Audit failures should not break main app flows
        return


def read_recent_audit_events(limit: int = 200) -> list[dict[str, Any]]:
    if limit <= 0:
        return []
    if not AUDIT_FILE.exists():
        return []
    try:
        with AUDIT_FILE.open("r", encoding="utf-8") as f:
            lines = f.readlines()
        selected = lines[-limit:]
        parsed: list[dict[str, Any]] = []
        for line in selected:
            line = line.strip()
            if not line:
                continue
            try:
                parsed.append(json.loads(line))
            except Exception:
                continue
        return parsed
    except Exception:
        return []
