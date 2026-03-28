# Discord Layout Import to Tavern (.mc)

## Goal
Import a Discord guild's channel structure into a Tavern server and preserve:
- Channel order
- Category grouping
- Optional category-prefixed names
- Shared Tavern sidebar layout/separators visible to all members

## Endpoints
- `POST /discord/import-layout`
- `GET /discord/oauth/start`
- `GET /discord/oauth/callback`
- `GET /discord/oauth/session`
- `GET /discord/oauth/guilds`
- `POST /discord/oauth/import-layout`
- `GET /channels/server/{server_public_id}`
- `GET /channels/server/{server_public_id}/layout`
- `PUT /channels/server/{server_public_id}/layout`
- `GET /channels/server/{server_public_id}/categories`
- `POST /channels/server/{server_public_id}/categories`

## Import Payload
```json
{
  "server_public_id": "<tavern-server-id>",
  "guild_id": "<discord-guild-id>",
  "replace_existing": false,
  "skip_existing": true,
  "include_text": true,
  "include_voice": true,
  "create_categories": true,
  "prefix_category": true
}
```

## OAuth In Dashboard
- User clicks "Import from Discord".
- Tavern opens `/discord/oauth/start` in a second tab.
- User signs into Discord and approves.
- Discord redirects back to `/discord/oauth/callback`.
- User returns to Tavern, refreshes Discord session in modal, selects guild, and imports.

## Mapping Rules
- Discord `TextChannel`, `ForumChannel`, `NewsChannel` -> Tavern `text`
- Discord `VoiceChannel`, `StageChannel` -> Tavern `voice`
- Unsupported Discord channel types are ignored.

## Category Behavior
- If `create_categories=true`, Discord categories become Tavern categories.
- If `prefix_category=true`, a shared separator is created for each imported category in the Tavern layout.
- If `create_categories=false` and `prefix_category=true`, channel names are flattened as `Category / channel-name`.

## Shared Layout Behavior
Server stores:
- `layout_tokens` (ordered list of `ch:<channel_public_id>` and `sep:<separator_id>`)
- `separators` (map of separator id -> label)
- `collapsed` (map of separator id -> boolean)

This data is server-side so new members see the same channel order and separators immediately.

## Safety Notes
- `replace_existing=true` deletes existing Tavern channels (and related messages) in target server before import.
- `skip_existing=true` avoids duplicate name/type channel creation.
- Import requires server channel-management permission and Discord bot connectivity.
