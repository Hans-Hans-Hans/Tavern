from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from http.cookiejar import CookieJar


def build_opener() -> urllib.request.OpenerDirector:
    jar = CookieJar()
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def request_json(opener: urllib.request.OpenerDirector, method: str, url: str, body: bytes | None = None, headers: dict[str, str] | None = None):
    req = urllib.request.Request(url=url, data=body, method=method)
    for key, value in (headers or {}).items():
        req.add_header(key, value)
    with opener.open(req, timeout=15) as resp:
        raw = resp.read().decode("utf-8", errors="replace")
        return resp.status, resp.headers, json.loads(raw) if raw else None


def request_text(opener: urllib.request.OpenerDirector, method: str, url: str):
    req = urllib.request.Request(url=url, method=method)
    with opener.open(req, timeout=15) as resp:
        raw = resp.read().decode("utf-8", errors="replace")
        return resp.status, raw


def has_mojibake_markers(text: str) -> bool:
    return any(marker in text for marker in ("Ã", "Â", "â€", "ï¿½"))


def main() -> int:
    parser = argparse.ArgumentParser(description="Tavern smoke test")
    parser.add_argument("--base-url", default="http://127.0.0.1:8000", help="Server base URL")
    parser.add_argument("--username", help="Optional login username")
    parser.add_argument("--password", help="Optional login password")
    args = parser.parse_args()

    base = args.base_url.rstrip("/")
    opener = build_opener()

    checks: list[tuple[str, bool, str]] = []

    def run_check(name: str, fn):
        try:
            detail = fn()
            checks.append((name, True, detail))
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            checks.append((name, False, f"HTTP {e.code}: {body[:240]}"))
        except Exception as e:  # noqa: BLE001
            checks.append((name, False, str(e)))

    run_check("GET /health", lambda: f"{request_json(opener, 'GET', base + '/health')[0]} ok")
    run_check("GET /", lambda: f"{request_text(opener, 'GET', base + '/')[0]} ok")
    run_check("GET /manifest.webmanifest", lambda: f"{request_text(opener, 'GET', base + '/manifest.webmanifest')[0]} ok")
    run_check("GET /api/version", lambda: f"{request_json(opener, 'GET', base + '/api/version')[0]} ok")

    def check_dashboard_shell():
        status, html = request_text(opener, "GET", base + "/dashboard")
        if status != 200:
            raise RuntimeError(f"unexpected status {status}")
        if 'id="cache-meta"' not in html:
            raise RuntimeError("cache-meta footer element missing from /dashboard")
        if has_mojibake_markers(html):
            raise RuntimeError("mojibake markers detected in /dashboard HTML")
        return "footer contains cache-meta"

    run_check("GET /dashboard cache-meta", check_dashboard_shell)

    def check_dashboard_assets():
        _, _, payload = request_json(opener, "GET", base + "/api/version")
        frontend = (payload or {}).get("frontend", {})
        dashboard_version = frontend.get("dashboard_js") or frontend.get("manifest")
        dashboard_url = base + "/src/dashboard.js"
        if dashboard_version:
            dashboard_url += f"?v={urllib.parse.quote(dashboard_version)}"
        status, js = request_text(opener, "GET", dashboard_url)
        if status != 200:
            raise RuntimeError(f"unexpected status {status}")
        if "renderDashboardCacheMeta" not in js:
            raise RuntimeError("dashboard cache-meta renderer missing")
        if has_mojibake_markers(js):
            raise RuntimeError("mojibake markers detected in dashboard JS")
        return "dashboard JS cache-meta + mojibake checks passed"

    run_check("GET /src/dashboard.js checks", check_dashboard_assets)

    if args.username and args.password:
        form = urllib.parse.urlencode({
            "username": args.username,
            "password": args.password,
            "remember_me": "false",
        }).encode("utf-8")
        run_check(
            "POST /auth/login",
            lambda: f"{request_json(opener, 'POST', base + '/auth/login', form, {'Content-Type': 'application/x-www-form-urlencoded'})[0]} ok",
        )
        run_check("GET /auth/session", lambda: f"{request_json(opener, 'GET', base + '/auth/session')[0]} ok")
        def check_api_dashboard():
            status, _, payload = request_json(opener, "GET", base + "/api/dashboard")
            if status != 200:
                raise RuntimeError(f"unexpected status {status}")
            username = str(((payload or {}).get("user") or {}).get("username") or "")
            if has_mojibake_markers(username):
                raise RuntimeError("mojibake markers detected in /api/dashboard username")
            return "username clean"

        run_check("GET /api/dashboard", check_api_dashboard)
        run_check("GET /servers/", lambda: f"{request_json(opener, 'GET', base + '/servers/')[0]} ok")

    ok_count = sum(1 for _, ok, _ in checks if ok)
    for name, ok, detail in checks:
        print(f"[{'PASS' if ok else 'FAIL'}] {name} :: {detail}")

    print(f"\n{ok_count}/{len(checks)} checks passed")
    return 0 if ok_count == len(checks) else 1


if __name__ == "__main__":
    sys.exit(main())
