# Discord Import Guide (.mc)

## What This Feature Does
Tavern can import a Discord server layout (text + voice channels) into a Tavern server.

After import:
- Discord categories are represented as Tavern separators in the sidebar layout.
- Separators are editable/removable in Tavern.
- Channel order and separators are saved server-side, so all members see the same layout.

## Requirements
1. Tavern backend running latest code.
2. Discord bot configured and online in Tavern:
   - `DISCORD_BOT_TOKEN` must be set and backend restarted.
3. Bot must be invited to the Discord server you want to import.
4. User must connect Discord OAuth in Tavern import modal.

## OAuth Configuration Options
You can use either global defaults or per-user overrides.

Global defaults (`.env`):
- `DISCORD_OAUTH_CLIENT_ID`
- `DISCORD_OAUTH_CLIENT_SECRET`
- `DISCORD_OAUTH_REDIRECT_URI`

Per-user overrides (in Tavern modal):
- Client ID
- Client Secret
- Redirect URI

Per-user values are used first. If missing, Tavern falls back to `.env` defaults.

## One-Time Discord Developer Portal Setup
1. Create/select Discord app in Developer Portal.
2. Add redirect URI exactly matching Tavern callback, e.g.:
   - `https://tavern.hans-homelab.com/discord/oauth/callback`
3. OAuth scopes used: `identify guilds`.

## User Flow In Tavern
1. Open a Tavern server (space).
2. Click the Discord import button in the channel sidebar.
3. (Optional) Fill per-user OAuth app settings and click `Save OAuth Settings`.
4. Click `Connect Discord` (opens second tab).
5. Approve Discord OAuth.
6. Return to Tavern and click `I've Authorized`.
7. Pick a Discord server from the dropdown.
8. Choose import options:
   - `Replace existing channels`
   - `Skip duplicate name/type channels`
   - `Create Tavern categories`
   - `Prefix category in names`
9. Click `Import Layout`.

## Import Option Behavior
- `Create Tavern categories = true`
  - Channels are associated to Tavern categories.
  - Sidebar grouping is represented via editable separators.
- `Create Tavern categories = false`
  - Flat channel list, no category associations.
- `Prefix category in names = true`
  - With no categories, names become `Category / channel-name`.
  - With categories, separator labels provide grouping context.
- `Replace existing channels = true`
  - Existing Tavern channels in target server are removed before import.

## Mapping Rules
- Discord `TextChannel`, `ForumChannel`, `News/Announcement` -> Tavern `text`
- Discord `VoiceChannel`, `StageChannel` -> Tavern `voice`
- Unsupported Discord channel types are ignored.

## Shared Layout Data (Server-Side)
Tavern persists:
- `layout_tokens`: ordered `ch:<channel_public_id>` and `sep:<separator_id>`
- `separators`: `{ separator_id: label }`
- `collapsed`: `{ separator_id: boolean }`

## Troubleshooting
`Discord OAuth is not configured`
- Save per-user OAuth settings in modal, or set `.env` defaults and restart backend.

`Invalid OAuth2 redirect_url`
- Redirect URI in Discord Portal must exactly match Tavern value (scheme/host/path/port/trailing slash).

`Discord API error (401)`
- Disconnect and reconnect OAuth in modal.
- Re-check Client ID/Secret/Redirect URI.

`Discord bot is not configured (set DISCORD_BOT_TOKEN)`
- Set bot token in runtime environment and restart backend.

`Unknown Guild (10004)`
- Bot is not in selected Discord server, or selected wrong server.

`module 'discord' has no attribute 'NewsChannel'`
- Pull latest Tavern backend (compatibility fix included).

## Relevant Endpoints
- `GET /discord/oauth/start`
- `GET /discord/oauth/callback`
- `GET /discord/oauth/session`
- `POST /discord/oauth/logout`
- `GET /discord/oauth/guilds`
- `POST /discord/oauth/import-layout`
- `GET /channels/server/{server_public_id}/layout`
- `PUT /channels/server/{server_public_id}/layout`
