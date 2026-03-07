from __future__ import annotations

from collections import deque
from datetime import UTC, datetime, timedelta


_voice_join_events: deque[datetime] = deque()
APP_STARTED_AT = datetime.now(UTC)
APP_VERSION = "1.1.0"


def record_voice_join() -> None:
    _voice_join_events.append(datetime.now(UTC))
    _trim_old()


def count_voice_joins(hours: int = 24) -> int:
    _trim_old()
    cutoff = datetime.now(UTC) - timedelta(hours=max(1, hours))
    return sum(1 for ts in _voice_join_events if ts >= cutoff)


def uptime_seconds() -> int:
    return max(0, int((datetime.now(UTC) - APP_STARTED_AT).total_seconds()))


def _trim_old() -> None:
    cutoff = datetime.now(UTC) - timedelta(hours=48)
    while _voice_join_events and _voice_join_events[0] < cutoff:
        _voice_join_events.popleft()
