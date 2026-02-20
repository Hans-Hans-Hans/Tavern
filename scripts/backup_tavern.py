from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path
import shutil
import zipfile


def create_backup(output_dir: Path) -> Path:
    root = Path(__file__).resolve().parents[1]
    db_path = root / "server" / "tavern.db"
    uploads_path = root / "server" / "uploads"
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_file = output_dir / f"tavern_backup_{stamp}.zip"

    with zipfile.ZipFile(out_file, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        if db_path.exists():
            zf.write(db_path, arcname="server/tavern.db")
        if uploads_path.exists():
            for item in uploads_path.rglob("*"):
                if item.is_file():
                    zf.write(item, arcname=str(item.relative_to(root)))
    return out_file


def prune_old_backups(output_dir: Path, keep: int) -> None:
    backups = sorted(output_dir.glob("tavern_backup_*.zip"), key=lambda p: p.stat().st_mtime, reverse=True)
    for old in backups[keep:]:
        old.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a Tavern backup archive.")
    parser.add_argument("--out", default="backups", help="Output directory for zip backups.")
    parser.add_argument("--keep", type=int, default=14, help="How many recent backups to keep.")
    args = parser.parse_args()

    out_dir = Path(args.out)
    backup_path = create_backup(out_dir)
    prune_old_backups(out_dir, max(1, args.keep))
    print(f"Backup created: {backup_path}")


if __name__ == "__main__":
    main()
