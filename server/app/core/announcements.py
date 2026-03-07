CURRENT_ANNOUNCEMENT_VERSION = 4


def build_announcement_message() -> str:
    return (
        "Tavern update notes.\n\n"
        "What changed:\n"
        "- Labs composer glow got a new animated strip above the message bar with center-bright edge-fade behavior.\n"
        "- New glow style presets were added: water, fire, bubbles, and acid.\n"
        "- Fire/bubbles/acid rendering and animation were tuned so each effect now reads correctly in motion.\n"
        "- Labs now includes custom color controls for the composer glow styles.\n\n"
        "If something still looks stale:\n"
        "1. Hard refresh the dashboard (Ctrl+F5).\n"
        "2. Reopen the channel.\n"
        "3. Restart the backend after websocket feature changes.\n\n"
        f"Update version: v{CURRENT_ANNOUNCEMENT_VERSION}"
    )
