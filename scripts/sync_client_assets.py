from __future__ import annotations

import argparse
import re
import shutil
from datetime import datetime, UTC
from pathlib import Path


HTML_FILES_TO_STAMP = ("index.html", "dashboard.html")
JS_FILES_TO_STAMP = ("src/dashboard.js",)


def stamp_html_versions(html_text: str, version: str) -> str:
    return re.sub(r"\?v=[^\"'\s>]+", f"?v={version}", html_text)


def stamp_dashboard_service_worker(js_text: str, version: str) -> str:
    return re.sub(
        r'(SERVICE_WORKER_URL\s*=\s*"/sw\.js\?v=)[^"]+(")',
        rf"\g<1>{version}\2",
        js_text,
    )


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8", newline="\n")


def stamp_source_tree(source_public: Path, version: str) -> None:
    for rel_path in HTML_FILES_TO_STAMP:
        path = source_public / rel_path
        if not path.exists():
            continue
        current = path.read_text(encoding="utf-8", errors="replace")
        updated = stamp_html_versions(current, version)
        write_text(path, updated)

    for rel_path in JS_FILES_TO_STAMP:
        path = source_public / rel_path
        if not path.exists():
            continue
        current = path.read_text(encoding="utf-8", errors="replace")
        updated = stamp_dashboard_service_worker(current, version)
        write_text(path, updated)


def sync_dist_tree(source_public: Path, dist_public: Path) -> None:
    if dist_public.exists():
        shutil.rmtree(dist_public)
    dist_public.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source_public, dist_public)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Stamp client asset versions and sync client/public to dist frontend bundle",
    )
    parser.add_argument(
        "--version",
        help="Version string to stamp in ?v= query params (default: UTC timestamp).",
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    source_public = root / "client" / "public"
    dist_public = root / "dist" / "tavern-server" / "_internal" / "client" / "public"

    if not source_public.exists():
        raise FileNotFoundError(f"Source public dir not found: {source_public}")

    version = (args.version or datetime.now(UTC).strftime("%Y%m%d-%H%M%S")).strip()
    if not version:
        raise ValueError("Version cannot be empty")

    stamp_source_tree(source_public, version)
    sync_dist_tree(source_public, dist_public)

    print(f"Stamped frontend assets with version: {version}")
    print(f"Synced: {source_public} -> {dist_public}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

