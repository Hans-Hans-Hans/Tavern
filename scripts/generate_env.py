#!/usr/bin/env python3
"""Generate a .env file for Tavern.

Usage:
  python scripts/generate_env.py        # interactive prompts
  python scripts/generate_env.py -y     # accept defaults
  python scripts/generate_env.py -o .env.local
"""
from __future__ import annotations

import argparse
import getpass
import os
import secrets
import stat
import sys


def generate_secret_key(nbytes: int = 32) -> str:
    return secrets.token_urlsafe(nbytes)[:64]


def prompt(prompt_text: str, default: str | None = None, is_secret: bool = False) -> str:
    if default:
        prompt_text = f"{prompt_text} [{default}] "
    else:
        prompt_text = f"{prompt_text} "
    try:
        if is_secret:
            resp = getpass.getpass(prompt_text)
        else:
            resp = input(prompt_text)
    except (KeyboardInterrupt, EOFError):
        print()
        sys.exit(1)
    if not resp and default is not None:
        return default
    return resp


def write_env(path: str, mapping: dict[str, str]) -> None:
    text_lines = [f"{k}={v}" for k, v in mapping.items()]
    with open(path, "w", newline="\n", encoding="utf-8") as f:
        f.write("\n".join(text_lines) + "\n")
    # Tighten permissions on POSIX systems
    try:
        if os.name == "posix":
            os.chmod(path, stat.S_IRUSR | stat.S_IWUSR)
    except Exception:
        pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate a .env file for Tavern")
    parser.add_argument("-y", "--yes", action="store_true", help="Accept sane defaults non-interactively")
    parser.add_argument("-o", "--output", default=".env", help="Output file path (default: .env)")
    args = parser.parse_args()

    defaults = {
        "SECRET_KEY": generate_secret_key(),
        "DATABASE_URL": "sqlite:///./server/tavern.db",
        "COOKIE_SECURE": "false",
        "COOKIE_SAMESITE": "lax",
        "CORS_ORIGINS": "http://127.0.0.1:8000,http://localhost:8000",
    }

    result: dict[str, str] = {}

    if args.yes:
        result = defaults.copy()
    else:
        print("Generating .env — press Enter to accept the default shown in [brackets].")
        sk = prompt("Secret key (leave empty to auto-generate)", default=defaults["SECRET_KEY"], is_secret=True)
        result["SECRET_KEY"] = sk or defaults["SECRET_KEY"]
        result["DATABASE_URL"] = prompt("Database URL", default=defaults["DATABASE_URL"]) or defaults["DATABASE_URL"]
        result["COOKIE_SECURE"] = prompt("COOKIE_SECURE (true/false)", default=defaults["COOKIE_SECURE"]) or defaults["COOKIE_SECURE"]
        result["COOKIE_SAMESITE"] = prompt("COOKIE_SAMESITE", default=defaults["COOKIE_SAMESITE"]) or defaults["COOKIE_SAMESITE"]
        result["CORS_ORIGINS"] = prompt("CORS_ORIGINS (comma-separated)", default=defaults["CORS_ORIGINS"]) or defaults["CORS_ORIGINS"]

    out_path = args.output
    if os.path.exists(out_path):
        confirm = "y"
        if not args.yes:
            confirm = input(f"{out_path} exists — overwrite? (y/N): ") or "n"
        if confirm.lower() not in ("y", "yes"):
            print("Aborted — didn't write file.")
            sys.exit(0)

    write_env(out_path, result)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
