from __future__ import annotations

import os
import sys
from pathlib import Path


def _configure_imports_and_paths() -> None:
    if getattr(sys, "frozen", False):
        # PyInstaller exposes bundled files under sys._MEIPASS.
        bundle_root = Path(getattr(sys, "_MEIPASS", Path(sys.executable).resolve().parent))
        os.environ.setdefault("TAVERN_ROOT_DIR", str(bundle_root))
        server_pkg_root = bundle_root / "server"
        if server_pkg_root.exists():
            sys.path.insert(0, str(server_pkg_root))
        return

    repo_root = Path(__file__).resolve().parents[2]
    os.environ.setdefault("TAVERN_ROOT_DIR", str(repo_root))
    sys.path.insert(0, str(repo_root / "server"))


def main() -> None:
    _configure_imports_and_paths()

    import uvicorn
    from app.main import app

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    log_level = os.getenv("LOG_LEVEL", "info")

    uvicorn.run(app, host=host, port=port, log_level=log_level)


if __name__ == "__main__":
    main()
