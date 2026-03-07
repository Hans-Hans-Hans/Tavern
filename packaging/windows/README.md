# Windows Packaging Scaffold

This folder contains a non-invasive starting point for building a Windows `tavern-server.exe`.

## What This Adds

- `server_exe_entry.py`: frozen-entry launcher that runs `uvicorn` and sets package paths
- `tavern_server.spec`: PyInstaller onedir spec (keeps static frontend files bundled)
- `build_server_exe.ps1`: build script wrapper
- `start-tavern.bat`: double-click launcher for release packages
- `stage_windows_server_release.ps1`: stages a shareable Windows server folder
- `WINDOWS_SERVER_RELEASE_README.txt`: end-user instructions template

## What It Does Not Change

- Existing web/PWA runtime behavior
- Existing `python` dev startup flow
- Existing client code paths

## Build (Windows)

From the repo root (`tavern/`):

```powershell
.\packaging\windows\build_server_exe.ps1
```

Optional clean rebuild:

```powershell
.\packaging\windows\build_server_exe.ps1 -Clean
```

## Output

- `dist\tavern-server\tavern-server.exe`

## Stage a Tester Package

After building:

```powershell
.\packaging\windows\stage_windows_server_release.ps1 -Version 1.1.0
```

Staged output:

- `release\windows-server\tavern-windows-server-<version>\`

This includes:

- `start-tavern.bat`
- `tavern-server\` (build output)
- `.env.example` (copied from your repo `.env` if present; sanitize before sharing)
- `WINDOWS_SERVER_RELEASE_README.txt`

## Notes

- This is an `onedir` build intentionally (better for static assets/uploads while packaging is being stabilized).
- It bundles `client/public` so the server can continue serving the current web UI.
- Sanitize `.env.example` before sharing (remove secrets / production keys).
