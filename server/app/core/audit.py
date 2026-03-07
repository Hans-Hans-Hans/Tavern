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


def _event_timestamp(event: dict[str, Any]) -> float:
    ts_raw = str(event.get("ts") or "").strip()
    if not ts_raw:
        return 0
    try:
        return datetime.fromisoformat(ts_raw.replace("Z", "+00:00")).timestamp()
    except Exception:
        return 0


def prune_server_audit_events(server_public_id: str, retention_days: int | None) -> None:
    target_server_id = str(server_public_id or "").strip()
    if not target_server_id or not AUDIT_FILE.exists() or retention_days is None:
        return
    try:
        with AUDIT_FILE.open("r", encoding="utf-8") as f:
            lines = f.readlines()
    except Exception:
        return

    cutoff = None
    if int(retention_days) > 0:
        cutoff = datetime.now(UTC).timestamp() - (int(retention_days) * 24 * 60 * 60)
    keep_lines: list[str] = []
    changed = False
    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except Exception:
            keep_lines.append(raw_line if raw_line.endswith("\n") else f"{raw_line}\n")
            continue
        target = event.get("target") or {}
        event_server_id = str(target.get("server_public_id") or "").strip() if isinstance(target, dict) else ""
        if event_server_id != target_server_id:
            keep_lines.append(raw_line if raw_line.endswith("\n") else f"{raw_line}\n")
            continue
        if int(retention_days) == 0:
            changed = True
            continue
        event_ts = _event_timestamp(event)
        if cutoff is not None and event_ts < cutoff:
            changed = True
            continue
        keep_lines.append(raw_line if raw_line.endswith("\n") else f"{raw_line}\n")

    if not changed:
        return
    try:
        tmp_path = AUDIT_FILE.with_suffix(".tmp")
        with tmp_path.open("w", encoding="utf-8") as f:
            for line in keep_lines:
                f.write(line if line.endswith("\n") else f"{line}\n")
        tmp_path.replace(AUDIT_FILE)
    except Exception:
        return
