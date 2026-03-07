# Tavern Desktop Client (Tauri Scaffold)

This is an isolated Tauri wrapper scaffold for a desktop-style `Tavern Client.exe`.

It intentionally does not modify the existing web app runtime behavior. The wrapper launches the local packaged web UI and uses the `desktop-connect.html` page to collect a server URL.

## What it does

- Starts on `desktop-connect.html`
- Saves server URL to local storage (`tavern.desktopServerUrl`)
- Opens the existing web UI (`index.html`) with `?server=...`
- Uses the transport compatibility layer already added to `app.js` / `dashboard.js`

## Why this is safe

- Browser/PWA users still use the same pages and same-origin behavior
- Desktop mode is opt-in and only activates when a server URL is configured
- Tauri scaffold is in a separate folder: `tavern/desktop-client`

## Build prerequisites (Windows)

- Rust toolchain (`rustup`)
- Visual Studio C++ Build Tools (for Rust/Windows linking)
- Node.js (for Tauri CLI)

## Typical setup

From `tavern/desktop-client`:

```powershell
npm install
npm run tauri:dev
```

Build installer/exe:

```powershell
npm run tauri:build
```

## Auto-updates (next step)

This scaffold includes a place for update configuration but does **not** enable auto-updates yet.

Recommended next step:

1. Add Tauri updater plugin (`tauri-plugin-updater`)
2. Publish signed releases (GitHub Releases is easiest)
3. Set updater endpoint/feed in `src-tauri/tauri.conf.json`
4. Add in-app "Check for updates" action

## Notes

- The wrapper bundles local Tavern frontend assets from `../client/public`
- The Tavern backend still runs separately (hosted server or local `Server.exe`)
- The desktop client is just a webview wrapper for a better desktop UX
