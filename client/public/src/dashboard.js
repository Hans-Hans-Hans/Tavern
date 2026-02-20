// --------------------
// DOM Elements
// --------------------
const serversPanel = document.querySelector(".servers-panel ul");
const channelsPanel = document.querySelector(".channels-panel ul");
const serversPanelContainer = document.querySelector(".servers-panel");
const channelsPanelContainer = document.querySelector(".channels-panel");
const messagesPanel = document.getElementById("messages-container");
const userDisplay = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const themeToggle = document.getElementById("theme-toggle");
const settingsBtn = document.getElementById("settings-btn");
const adminBtn = document.getElementById("admin-btn");

// Modals and buttons
const openCreateServerBtn = document.getElementById("open-create-server");
const createServerModal = document.getElementById("create-server-modal");
const submitServerBtn = document.getElementById("submit-server");
const serverNameInput = document.getElementById("new-server-name");

const openCreateChannelBtn = document.getElementById("open-create-channel");
const openCreateDmBtn = document.getElementById("open-create-dm");
const createDmModal = document.getElementById("create-dm-modal");
const dmFriendSearchInput = document.getElementById("dm-friend-search-input");
const dmFriendPickerList = document.getElementById("dm-friend-picker-list");
const openFriendsBtn = document.getElementById("open-friends");
const openAddSeparatorBtn = document.getElementById("open-add-separator");
const openServerMembersBtn = document.getElementById("open-server-members");
const homeDmBtn = document.getElementById("home-dm-btn");
const channelsPanelTitle = document.getElementById("channels-panel-title");
const createChannelModal = document.getElementById("create-channel-modal");
const submitChannelBtn = document.getElementById("submit-channel");
const channelNameInput = document.getElementById("new-channel-name");
const channelTypeInput = document.getElementById("new-channel-type");
const inviteMemberModal = document.getElementById("invite-member-modal");
const inviteServerName = document.getElementById("invite-server-name");
const inviteUserPublicIdInput = document.getElementById("invite-user-public-id");
const submitInviteMemberBtn = document.getElementById("submit-invite-member");
const deleteServerModal = document.getElementById("delete-server-modal");
const deleteServerNameLabel = document.getElementById("delete-server-name-label");
const deleteServerConfirmInput = document.getElementById("delete-server-confirm-input");
const confirmDeleteServerBtn = document.getElementById("confirm-delete-server");
const deleteChannelModal = document.getElementById("delete-channel-modal");
const deleteChannelNameLabel = document.getElementById("delete-channel-name-label");
const deleteChannelConfirmInput = document.getElementById("delete-channel-confirm-input");
const confirmDeleteChannelBtn = document.getElementById("confirm-delete-channel");
const richEditorModal = document.getElementById("rich-editor-modal");
const openRichEditorBtn = document.getElementById("open-rich-editor-btn");
const editorMdInput = document.getElementById("editor-md-input");
const editorHtmlInput = document.getElementById("editor-html-input");
const editorCssInput = document.getElementById("editor-css-input");
const editorPreview = document.getElementById("editor-preview");
const editorInsertBtn = document.getElementById("editor-insert-btn");

const messageInput = document.getElementById("message-input");
const replyPreview = document.getElementById("reply-preview");
const replyPreviewText = document.getElementById("reply-preview-text");
const replyPreviewCancel = document.getElementById("reply-preview-cancel");
const sendMessageBtn = document.getElementById("send-message-btn");
const uploadImageBtn = document.getElementById("upload-image-btn");
const imageUploadInput = document.getElementById("image-upload-input");
const messageBar = document.querySelector(".message-bar");
const messagesTopbar = document.getElementById("messages-topbar");
const messagesTopbarTitle = document.getElementById("messages-topbar-title");
const messageSearchToggleBtn = document.getElementById("message-search-toggle-btn");
const messageSearchBar = document.getElementById("message-search-bar");
const messageSearchInput = document.getElementById("message-search-input");
const messageSearchCount = document.getElementById("message-search-count");
const messageSearchClearBtn = document.getElementById("message-search-clear-btn");
const jumpUnreadBtn = document.getElementById("jump-unread-btn");
const dmCallBtn = document.getElementById("dm-call-btn");
const realtimeStatusBanner = document.getElementById("realtime-status-banner");
const voicePanel = document.getElementById("voice-panel");
const voiceUsersList = document.getElementById("voice-users-list");
const voiceChannelTitle = document.getElementById("voice-channel-title");
const voiceStatus = document.getElementById("voice-status");
const joinVoiceBtn = document.getElementById("join-voice-btn");
const leaveVoiceBtn = document.getElementById("leave-voice-btn");
const muteVoiceBtn = document.getElementById("mute-voice-btn");
const deafenVoiceBtn = document.getElementById("deafen-voice-btn");
const userSettingsModal = document.getElementById("user-settings-modal");
const settingsPublicId = document.getElementById("settings-public-id");
const settingsUsername = document.getElementById("settings-username");
const settingsEmail = document.getElementById("settings-email");
const settingsUserId = document.getElementById("settings-user-id");
const settingsCreatedAt = document.getElementById("settings-created-at");
const settingsUpdatedAt = document.getElementById("settings-updated-at");
const settingsAvatarInput = document.getElementById("settings-avatar-input");
const settingsAvatarUploadBtn = document.getElementById("settings-avatar-upload-btn");
const settingsThemeGrid = document.getElementById("settings-theme-grid");
const settingsUiScaleInput = document.getElementById("settings-ui-scale");
const settingsUiScaleValue = document.getElementById("settings-ui-scale-value");
const settingsPanelRadiusInput = document.getElementById("settings-panel-radius");
const settingsPanelRadiusValue = document.getElementById("settings-panel-radius-value");
const settingsMessageDensityInput = document.getElementById("settings-message-density");
const settingsMessageDensityValue = document.getElementById("settings-message-density-value");
const settingsResetAppearanceBtn = document.getElementById("settings-reset-appearance-btn");
const settingsFontFamilyInput = document.getElementById("settings-font-family");
const settingsThemeTemplateInput = document.getElementById("settings-theme-template");
const settingsTemplateLoadBtn = document.getElementById("settings-template-load-btn");
const settingsTemplateApplyBtn = document.getElementById("settings-template-apply-btn");
const settingsTemplateSaveBtn = document.getElementById("settings-template-save-btn");
const settingsTemplateDeleteBtn = document.getElementById("settings-template-delete-btn");
const settingsTemplateExportBtn = document.getElementById("settings-template-export-btn");
const settingsTemplateImportInput = document.getElementById("settings-template-import-input");
const settingsCustomCssInput = document.getElementById("settings-custom-css");
const settingsResetClientCacheBtn = document.getElementById("settings-reset-client-cache-btn");
const settingsTitle = document.getElementById("settings-title");
const settingsOpenLabsBtn = document.getElementById("settings-open-labs");
const settingsLabsSection = document.getElementById("settings-labs-section");
const labsTriggerPartyBtn = document.getElementById("labs-trigger-party");
const labsTriggerKonamiBtn = document.getElementById("labs-trigger-konami");
const openLaunchChecklistBtn = document.getElementById("open-launch-checklist-btn");
const labsResetBtn = document.getElementById("labs-reset-btn");
const launchChecklistModal = document.getElementById("launch-checklist-modal");
const launchChecklistList = document.getElementById("launch-checklist-list");
const launchChecklistResetBtn = document.getElementById("launch-checklist-reset-btn");
const quickSwitcherModal = document.getElementById("quick-switcher-modal");
const quickSwitcherInput = document.getElementById("quick-switcher-input");
const quickSwitcherList = document.getElementById("quick-switcher-list");
const shortcutsModal = document.getElementById("shortcuts-modal");
const imagePreprocessModal = document.getElementById("image-preprocess-modal");
const imagePreprocessPreview = document.getElementById("image-preprocess-preview");
const imagePreprocessOriginalBtn = document.getElementById("image-preprocess-original-btn");
const imagePreprocessCropBtn = document.getElementById("image-preprocess-crop-btn");
const imagePreprocessCancelBtn = document.getElementById("image-preprocess-cancel-btn");
const settingsSafeModeBtn = document.getElementById("settings-safe-mode-btn");
const settingsExportBundleBtn = document.getElementById("settings-export-bundle-btn");
const settingsImportBundleInput = document.getElementById("settings-import-bundle-input");
const toastContainer = document.getElementById("dashboard-toast-container");
const runtimeMetaEl = document.getElementById("runtime-meta");
const labsControlInputs = {
  fxGrain: document.getElementById("labs-fx-grain"),
  fxGlass: document.getElementById("labs-fx-glass"),
  fxGradient: document.getElementById("labs-fx-gradient"),
  fxBob: document.getElementById("labs-fx-bob"),
  fxGlow: document.getElementById("labs-fx-glow"),
  fxCompact: document.getElementById("labs-fx-compact"),
  fxNeon: document.getElementById("labs-fx-neon"),
  fxRetro: document.getElementById("labs-fx-retro"),
  fxLanterns: document.getElementById("labs-fx-lanterns"),
  fxD20Turbo: document.getElementById("labs-fx-d20turbo"),
  fxD20Bounce: document.getElementById("labs-fx-d20bounce"),
  fxRollAnim: document.getElementById("labs-fx-roll-anim"),
  fxRainbowAuthor: document.getElementById("labs-fx-rainbow-author"),
  fxScanlines: document.getElementById("labs-fx-scanlines"),
  fxPanelTilt: document.getElementById("labs-fx-panel-tilt"),
  fxUnreadShimmer: document.getElementById("labs-fx-unread-shimmer"),
  fxCommandHints: document.getElementById("labs-fx-command-hints"),
};
const threadModal = document.getElementById("thread-modal");
const threadModalTitle = document.getElementById("thread-modal-title");
const threadMessagesContainer = document.getElementById("thread-messages-container");
const threadMessageInput = document.getElementById("thread-message-input");
const threadSendBtn = document.getElementById("thread-send-btn");
const typingIndicator = document.getElementById("typing-indicator");
const sendStatusText = document.getElementById("send-status-text");
const retrySendBtn = document.getElementById("retry-send-btn");
const friendsModal = document.getElementById("friends-modal");
const friendPublicIdInput = document.getElementById("friend-public-id-input");
const sendFriendRequestBtn = document.getElementById("send-friend-request-btn");
const friendsListEl = document.getElementById("friends-list");
const friendRequestsIncomingEl = document.getElementById("friend-requests-incoming");
const friendRequestsOutgoingEl = document.getElementById("friend-requests-outgoing");
const adminModal = document.getElementById("admin-modal");
const adminOverviewEl = document.getElementById("admin-overview");
const adminUsersListEl = document.getElementById("admin-users-list");
const adminAuditListEl = document.getElementById("admin-audit-list");
const adminRefreshBtn = document.getElementById("admin-refresh-btn");
const serverMembersModal = document.getElementById("server-members-modal");
const membersServerName = document.getElementById("members-server-name");
const membersListEl = document.getElementById("members-list");

// Track active server/channel
let activeServerId = null;
let activeChannelId = null;
let activeChannelType = "text";
let activeMode = "server";
let activeDmConversationId = null;
let d20Material = null;
let currentUserId = null;
let currentUser = null;
const unreadChannels = new Set();
const unreadServers = new Set();
const channelLastSeen = new Map();
const channelToServer = new Map();
const channelTypeById = new Map();
const channelNameById = new Map();
const serverNicknamesByServer = new Map();
const channelSockets = new Map();
const channelReconnectTimers = new Map();
const channelPresence = new Map();
const serverOnlineUsers = new Map();
const typingUsersByChannel = new Map();
let typingStopTimer = null;
let typingActiveChannelId = null;
let typingLastStartSentAt = 0;
let presenceSocket = null;
let presenceReconnectTimer = null;
let dmReconnectTimer = null;
const onlineUserPublicIds = new Set();
let voiceSocket = null;
let voiceSocketChannelId = null;
let voiceSelfPeerId = null;
let localVoiceStream = null;
const peerConnections = new Map();
const peerAudioElements = new Map();
const peerMeta = new Map();
const peerVolumeLevels = new Map();
const peerAudioSources = new Map();
let voiceAudioContext = null;
let voiceMeterAnimation = null;
let isMuted = false;
let isDeafened = false;
let inviteServerPublicId = null;
let deleteServerTarget = null;
let deleteChannelTarget = null;
const SERVER_ORDER_STORAGE_KEY = "tavern.serverOrder";
const CHANNEL_ORDER_STORAGE_PREFIX = "tavern.channelOrder.";
const CHANNEL_LAYOUT_STORAGE_PREFIX = "tavern.channelLayout.";
const CHANNEL_SEPARATORS_STORAGE_PREFIX = "tavern.channelSeparators.";
const CHANNEL_ICON_STORAGE_PREFIX = "tavern.channelIcons.";
const LEGACY_THEME_STORAGE_KEY = "tavern.theme";
const APPEARANCE_STORAGE_KEY = "tavern.appearance";
const CUSTOM_THEMES_STORAGE_KEY = "tavern.customThemes";
const PANEL_SIZES_STORAGE_KEY = "tavern.panelSizes";
const LABS_STORAGE_KEY = "tavern.labs";
const LAUNCH_CHECKLIST_STORAGE_KEY = "tavern.launchChecklist";
const DRAFTS_STORAGE_KEY = "tavern.drafts";
const CHANNEL_NOTIFICATION_STORAGE_KEY = "tavern.channelNotifications";
const SAFE_MODE_STORAGE_KEY = "tavern.safeMode";
const LAST_ACTIVE_CHAT_STORAGE_KEY = "tavern.lastActiveChat";
const DEFAULT_LABS_SETTINGS = {
  unlocked: false,
  fxGrain: true,
  fxGlass: false,
  fxGradient: false,
  fxBob: true,
  fxGlow: true,
  fxCompact: false,
  fxNeon: false,
  fxRetro: false,
  fxLanterns: false,
  fxD20Turbo: false,
  fxD20Bounce: true,
  fxRollAnim: true,
  fxRainbowAuthor: false,
  fxScanlines: false,
  fxPanelTilt: false,
  fxUnreadShimmer: false,
  fxCommandHints: true,
  konamiMode: false,
};
const KONAMI_SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const LAUNCH_CHECKLIST_ITEMS = [
  { id: "auth_login", label: "Login and logout both work." },
  { id: "server_channel_create", label: "Create/delete server and channel." },
  { id: "realtime_msg", label: "Realtime message delivery works in 2 clients." },
  { id: "dm_msg", label: "DM creation + messaging works." },
  { id: "voice_join", label: "Voice join/mute/deafen works." },
  { id: "roles_members", label: "Roles/member management updates correctly." },
  { id: "uploads", label: "Image/avatar upload works." },
  { id: "roll_command", label: "/roll is visible server-wide." },
  { id: "backup", label: "Backup snapshot created." },
  { id: "admin", label: "Admin panel actions and audit log load." },
];
let contextMenuEl = null;
let panelSizes = { servers: 100, channels: 220 };
let dmConversations = [];
let dmMessageSocket = null;
let dmCallActive = false;
let pendingReplyTo = null;
let activeThreadParentMessageId = null;
let friendsCache = [];
let activeReactionPicker = null;
let labsSettings = { ...DEFAULT_LABS_SETTINGS };
let labsUnlockClicks = 0;
let d20SpinMultiplier = 1;
let d20BounceEnabled = false;
let rollAnimationsEnabled = true;
let launchChecklistState = {};
let wsConnectionState = {
  presence: { connected: false, retryAt: 0 },
  dm: { connected: false, retryAt: 0 },
  channels: new Map(),
};
let draftsState = {};
let channelNotificationState = {};
let safeModeEnabled = false;
let failedSendQueue = [];
let imagePreprocessState = null;
let switcherIndex = 0;
let switcherItems = [];
let konamiIndex = 0;
let memberNicknameDrafts = new Map();
const REACTION_EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "🔥", "🎉", "✅"];

const THEME_PRESETS = [
  { id: "linen-light", name: "Linen Light", mode: "light", bg: "#f7f3ec", panelBg: "linear-gradient(145deg, #fffdf8, #f2ece2)", headerFooterBg: "#fffdf8", text: "#2f2a24", muted: "#72665b", accent: "#b78a56", accentStrong: "#8f6130", border: "rgba(60,45,30,0.12)", shadow: "rgba(60,45,30,0.11)" },
  { id: "sage-light", name: "Sage Light", mode: "light", bg: "#edf3ed", panelBg: "linear-gradient(145deg, #f8fcf8, #e7efe7)", headerFooterBg: "#f7fbf7", text: "#233126", muted: "#5b6f5e", accent: "#6ea285", accentStrong: "#44745a", border: "rgba(25,60,38,0.12)", shadow: "rgba(25,60,38,0.1)" },
  { id: "ocean-light", name: "Ocean Light", mode: "light", bg: "#eaf3fb", panelBg: "linear-gradient(145deg, #f7fbff, #e5eff9)", headerFooterBg: "#f7fbff", text: "#1f2f3d", muted: "#58708a", accent: "#4f8fcf", accentStrong: "#2d6ea9", border: "rgba(29,71,109,0.12)", shadow: "rgba(29,71,109,0.12)" },
  { id: "sunset-light", name: "Sunset Light", mode: "light", bg: "#fff1ea", panelBg: "linear-gradient(145deg, #fff9f5, #ffece0)", headerFooterBg: "#fff9f5", text: "#3b2a24", muted: "#8c6356", accent: "#df7e5a", accentStrong: "#b45737", border: "rgba(99,48,32,0.12)", shadow: "rgba(99,48,32,0.12)" },
  { id: "lavender-light", name: "Lavender Light", mode: "light", bg: "#f2effc", panelBg: "linear-gradient(145deg, #faf8ff, #ede8fb)", headerFooterBg: "#faf8ff", text: "#2f2a3f", muted: "#6d6691", accent: "#8573c9", accentStrong: "#5f4ea2", border: "rgba(59,47,102,0.12)", shadow: "rgba(59,47,102,0.11)" },
  { id: "obsidian-dark", name: "Dark Linen", mode: "dark", bg: "#1f1a15", panelBg: "linear-gradient(145deg, #2a241d, #1f1a15)", headerFooterBg: "#28221b", text: "#f4ede3", muted: "#b5a696", accent: "#b78a56", accentStrong: "#d6af82", border: "rgba(223,193,160,0.16)", shadow: "rgba(0,0,0,0.36)" },
  { id: "forest-dark", name: "Forest Dark", mode: "dark", bg: "#131d18", panelBg: "linear-gradient(145deg, #1a2921, #132019)", headerFooterBg: "#1a251f", text: "#e8f3ec", muted: "#96ab9e", accent: "#5fa47d", accentStrong: "#9fd9b9", border: "rgba(172,218,193,0.14)", shadow: "rgba(0,0,0,0.35)" },
  { id: "midnight-dark", name: "Midnight Dark", mode: "dark", bg: "#121727", panelBg: "linear-gradient(145deg, #1a2237, #12192a)", headerFooterBg: "#192134", text: "#ebf0ff", muted: "#98a7c9", accent: "#5f79cf", accentStrong: "#a9b9ef", border: "rgba(181,196,239,0.14)", shadow: "rgba(0,0,0,0.35)" },
  { id: "ember-dark", name: "Ember Dark", mode: "dark", bg: "#211716", panelBg: "linear-gradient(145deg, #30201d, #211715)", headerFooterBg: "#2a1d1b", text: "#f7ece9", muted: "#c09f95", accent: "#cd6c53", accentStrong: "#f0a28e", border: "rgba(242,180,161,0.16)", shadow: "rgba(0,0,0,0.36)" },
  { id: "violet-dark", name: "Violet Dark", mode: "dark", bg: "#1b1524", panelBg: "linear-gradient(145deg, #271f34, #1b1626)", headerFooterBg: "#221b2f", text: "#f0ecf8", muted: "#af9fc6", accent: "#8e69c8", accentStrong: "#c5a8ef", border: "rgba(198,174,237,0.15)", shadow: "rgba(0,0,0,0.36)" },
];

const DEFAULT_APPEARANCE = {
  themeId: "linen-light",
  lastLightThemeId: "linen-light",
  lastDarkThemeId: "obsidian-dark",
  uiScale: 1,
  panelRadius: 16,
  messageDensity: 1,
  fontFamily: "'Inter', sans-serif",
  customCss: "",
};

let appearanceSettings = { ...DEFAULT_APPEARANCE };
let customThemes = [];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderMarkdown(rawText) {
  const text = typeof rawText === "string" ? rawText : "";
  if (window.marked && window.DOMPurify) {
    const markdownHtml = window.marked.parse(text, { gfm: true, breaks: true });
    return window.DOMPurify.sanitize(markdownHtml);
  }
  return escapeHtml(text).replaceAll("\n", "<br>");
}

function getMentionHighlightState(rawText) {
  const text = String(rawText || "");
  const everyone = /\B@(everyone|here)\b/i.test(text);
  let user = false;
  const username = String(currentUser?.username || "").trim();
  const publicId = String(currentUser?.public_id || "").trim();
  if (username) {
    const usernameRegex = new RegExp(`\\B@${escapeRegExp(username)}\\b`, "i");
    user = usernameRegex.test(text);
  }
  if (!user && publicId) {
    const publicIdRegex = new RegExp(`\\B@${escapeRegExp(publicId)}\\b`, "i");
    user = publicIdRegex.test(text);
  }
  return { everyone, user };
}

function applyMentionHighlightsToRenderedHtml(renderedHtml) {
  let html = String(renderedHtml || "");
  html = html.replace(/\B@(everyone|here)\b/gi, '<span class="mention-inline mention-everyone">$&</span>');
  const username = String(currentUser?.username || "").trim();
  if (username) {
    const usernameRegex = new RegExp(`\\B@${escapeRegExp(username)}\\b`, "gi");
    html = html.replace(usernameRegex, '<span class="mention-inline mention-user">$&</span>');
  }
  const publicId = String(currentUser?.public_id || "").trim();
  if (publicId) {
    const publicIdRegex = new RegExp(`\\B@${escapeRegExp(publicId)}\\b`, "gi");
    html = html.replace(publicIdRegex, '<span class="mention-inline mention-user">$&</span>');
  }
  return html;
}

function renderSeparatorContent(rawText) {
  const text = typeof rawText === "string" ? rawText : "";
  if (window.marked && window.DOMPurify) {
    const markdownHtml = window.marked.parse(text, { gfm: true, breaks: true });
    return window.DOMPurify.sanitize(markdownHtml, {
      ALLOWED_TAGS: ["strong", "em", "span", "code", "a", "small", "u", "s", "br", "p"],
      ALLOWED_ATTR: ["href", "target", "rel", "style", "class", "title"],
    });
  }
  return escapeHtml(text);
}

function buildEditorOutput() {
  const md = editorMdInput?.value?.trim() || "";
  const html = editorHtmlInput?.value?.trim() || "";
  const css = editorCssInput?.value?.trim() || "";
  const combinedBody = [md, html].filter(Boolean).join("\n\n");
  if (!combinedBody) return "";
  if (!css) return combinedBody;
  return `<div style="${escapeHtml(css)}">\n${combinedBody}\n</div>`;
}

function refreshEditorPreview() {
  if (!editorPreview) return;
  const output = buildEditorOutput();
  if (!output) {
    editorPreview.innerHTML = '<span class="editor-preview-placeholder">Preview will appear here...</span>';
    return;
  }
  editorPreview.innerHTML = renderMarkdown(output);
}

function showToast(message, kind = "info") {
  if (!toastContainer || !message) return;
  const toast = document.createElement("div");
  toast.className = `toast ${kind}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 220);
  }, 2200);
}

function loadLaunchChecklistState() {
  try {
    const raw = localStorage.getItem(LAUNCH_CHECKLIST_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    launchChecklistState = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    launchChecklistState = {};
  }
}

function saveLaunchChecklistState() {
  try {
    localStorage.setItem(LAUNCH_CHECKLIST_STORAGE_KEY, JSON.stringify(launchChecklistState));
  } catch {
    // Ignore storage failures
  }
}

function renderLaunchChecklist() {
  if (!launchChecklistList) return;
  launchChecklistList.innerHTML = "";
  LAUNCH_CHECKLIST_ITEMS.forEach((item) => {
    const row = document.createElement("label");
    row.className = "checklist-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(launchChecklistState[item.id]);
    checkbox.addEventListener("change", () => {
      launchChecklistState[item.id] = checkbox.checked;
      saveLaunchChecklistState();
    });
    const text = document.createElement("span");
    text.textContent = item.label;
    row.appendChild(checkbox);
    row.appendChild(text);
    launchChecklistList.appendChild(row);
  });
}

function setRealtimeState(kind, connected, retryAt = 0, channelId = null) {
  if (kind === "channel" && channelId) {
    wsConnectionState.channels.set(channelId, { connected, retryAt });
  } else if (kind === "presence") {
    wsConnectionState.presence = { connected, retryAt };
  } else if (kind === "dm") {
    wsConnectionState.dm = { connected, retryAt };
  }
  updateRealtimeStatusBanner();
}

function clearRealtimeChannelState(channelId) {
  wsConnectionState.channels.delete(channelId);
  updateRealtimeStatusBanner();
}

function updateRealtimeStatusBanner() {
  if (!realtimeStatusBanner) return;
  if (!currentUserId) {
    realtimeStatusBanner.classList.add("hidden");
    realtimeStatusBanner.textContent = "";
    return;
  }
  const now = Date.now();
  const disconnectedChannels = [...wsConnectionState.channels.values()].filter((state) => !state.connected);
  const dmRequired = activeMode === "dm";
  const hasDegraded = !wsConnectionState.presence.connected || (dmRequired && !wsConnectionState.dm.connected) || disconnectedChannels.length > 0;
  if (!hasDegraded) {
    realtimeStatusBanner.classList.add("hidden");
    realtimeStatusBanner.textContent = "";
    return;
  }
  let retrySec = 0;
  const retryAts = [
    wsConnectionState.presence.retryAt,
    wsConnectionState.dm.retryAt,
    ...disconnectedChannels.map((state) => state.retryAt || 0),
  ].filter((value) => value > now);
  if (retryAts.length) retrySec = Math.max(1, Math.ceil((Math.min(...retryAts) - now) / 1000));
  realtimeStatusBanner.classList.remove("hidden");
  realtimeStatusBanner.textContent = retrySec > 0
    ? `Realtime degraded. Reconnecting in ${retrySec}s...`
    : "Realtime degraded. Reconnecting...";
}

function startRealtimeStatusTicker() {
  setInterval(updateRealtimeStatusBanner, 1000);
}

async function runPreflightChecks() {
  const warnings = [];
  try {
    const probeKey = "tavern.preflight.probe";
    localStorage.setItem(probeKey, "1");
    localStorage.removeItem(probeKey);
  } catch {
    warnings.push("Local storage unavailable");
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    warnings.push("Mic API unavailable");
  }
  if (!("WebSocket" in window)) {
    warnings.push("WebSocket unsupported");
  }
  if (!warnings.length) return;
  if (realtimeStatusBanner) {
    realtimeStatusBanner.textContent = `Preflight warning: ${warnings.join(" · ")}`;
    realtimeStatusBanner.classList.remove("hidden");
    setTimeout(() => updateRealtimeStatusBanner(), 6000);
  }
}

async function refreshRuntimeMeta() {
  if (!runtimeMetaEl) return;
  try {
    const res = await fetch("/api/meta", { credentials: "include" });
    if (!res.ok) return;
    const data = await res.json();
    const uptimeMinutes = Math.max(0, Math.floor(Number(data.uptime_seconds || 0) / 60));
    runtimeMetaEl.textContent = `v${data.version || "1.0"} · up ${uptimeMinutes}m`;
  } catch {
    // Ignore metadata refresh failures
  }
}

function loadDraftsState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DRAFTS_STORAGE_KEY) || "{}");
    draftsState = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    draftsState = {};
  }
}

function saveDraftsState() {
  try {
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(draftsState));
  } catch {
    // Ignore storage failures
  }
}

function getDraftKey() {
  if (activeMode === "dm" && activeDmConversationId) return `dm:${activeDmConversationId}`;
  if (activeMode === "server" && activeChannelId) return `ch:${activeChannelId}`;
  return "";
}

function applyDraftToComposer() {
  if (!messageInput) return;
  const key = getDraftKey();
  messageInput.value = key ? (draftsState[key] || "") : "";
}

function updateDraftFromComposer() {
  if (!messageInput) return;
  const key = getDraftKey();
  if (!key) return;
  const value = messageInput.value || "";
  if (value) draftsState[key] = value;
  else delete draftsState[key];
  saveDraftsState();
}

function clearActiveDraft() {
  const key = getDraftKey();
  if (!key) return;
  delete draftsState[key];
  saveDraftsState();
}

function setSendStatus(text = "", kind = "muted") {
  if (!sendStatusText) return;
  sendStatusText.textContent = text;
  sendStatusText.dataset.kind = kind;
}

function updateRetrySendUi() {
  if (!retrySendBtn) return;
  retrySendBtn.classList.toggle("hidden", failedSendQueue.length === 0);
}

function loadChannelNotificationState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHANNEL_NOTIFICATION_STORAGE_KEY) || "{}");
    channelNotificationState = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    channelNotificationState = {};
  }
}

function saveChannelNotificationState() {
  try {
    localStorage.setItem(CHANNEL_NOTIFICATION_STORAGE_KEY, JSON.stringify(channelNotificationState));
  } catch {
    // Ignore storage failures
  }
}

function getChannelNotificationMode(channelId) {
  return channelNotificationState[channelId] || "all";
}

function setChannelNotificationMode(channelId, mode) {
  channelNotificationState[channelId] = mode;
  saveChannelNotificationState();
}

function shouldNotifyForMessage(channelId, payload) {
  const mode = getChannelNotificationMode(channelId);
  if (mode === "muted") return false;
  if (mode === "mentions") {
    const text = String(payload?.content || "").toLowerCase();
    if (/\B@(everyone|here)\b/i.test(text)) return true;
    const username = String(currentUser?.username || "").toLowerCase();
    const publicId = String(currentUser?.public_id || "").toLowerCase();
    return (!!username && text.includes(`@${username}`)) || (!!publicId && text.includes(publicId));
  }
  return true;
}

function loadSafeModeState() {
  try {
    safeModeEnabled = localStorage.getItem(SAFE_MODE_STORAGE_KEY) === "1";
  } catch {
    safeModeEnabled = false;
  }
}

function saveSafeModeState() {
  try {
    localStorage.setItem(SAFE_MODE_STORAGE_KEY, safeModeEnabled ? "1" : "0");
  } catch {
    // Ignore storage failures
  }
}

function applySafeModeState() {
  document.body.classList.toggle("safe-mode", safeModeEnabled);
  if (settingsSafeModeBtn) settingsSafeModeBtn.textContent = `Safe Mode: ${safeModeEnabled ? "On" : "Off"}`;
  applyCustomCss();
  applyLabsSettings();
}

function saveLastActiveChatState(state) {
  try {
    localStorage.setItem(LAST_ACTIVE_CHAT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures
  }
}

function loadLastActiveChatState() {
  try {
    const raw = localStorage.getItem(LAST_ACTIVE_CHAT_STORAGE_KEY);
    const parsed = JSON.parse(raw || "null");
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistActiveChatState() {
  if (!currentUser?.public_id) return;
  saveLastActiveChatState({
    userPublicId: currentUser.public_id,
    mode: activeMode,
    serverId: activeServerId || null,
    channelId: activeChannelId || null,
    dmConversationId: activeDmConversationId || null,
    savedAt: Date.now(),
  });
}

function serializeSettingsBundle() {
  return {
    version: 1,
    exported_at: new Date().toISOString(),
    appearance: appearanceSettings,
    customThemes,
    panelSizes,
    labs: labsSettings,
    drafts: draftsState,
    channelNotifications: channelNotificationState,
    safeModeEnabled,
  };
}

function applySettingsBundle(bundle) {
  if (!bundle || typeof bundle !== "object") throw new Error("Invalid settings bundle.");
  if (bundle.appearance && typeof bundle.appearance === "object") {
    appearanceSettings = { ...DEFAULT_APPEARANCE, ...bundle.appearance };
  }
  if (Array.isArray(bundle.customThemes)) {
    customThemes = bundle.customThemes;
    saveCustomThemes();
  }
  if (bundle.panelSizes && typeof bundle.panelSizes === "object") {
    panelSizes = {
      servers: Number(bundle.panelSizes.servers) || panelSizes.servers,
      channels: Number(bundle.panelSizes.channels) || panelSizes.channels,
    };
    savePanelSizes();
    applyPanelSizes();
  }
  if (bundle.labs && typeof bundle.labs === "object") {
    labsSettings = { ...DEFAULT_LABS_SETTINGS, ...bundle.labs };
    saveLabsSettings();
  }
  if (bundle.drafts && typeof bundle.drafts === "object") {
    draftsState = bundle.drafts;
    saveDraftsState();
  }
  if (bundle.channelNotifications && typeof bundle.channelNotifications === "object") {
    channelNotificationState = bundle.channelNotifications;
    saveChannelNotificationState();
  }
  safeModeEnabled = Boolean(bundle.safeModeEnabled);
  saveSafeModeState();
  applyAppearanceSettings();
  renderThemePresetGrid();
  updateAppearanceControlValues();
  updateLabsControlValues();
  applySafeModeState();
  applyDraftToComposer();
}

function buildQuickSwitcherItems(query = "") {
  const q = query.trim().toLowerCase();
  const items = [];
  document.querySelectorAll(".server-item").forEach((el) => {
    const label = el.dataset.serverName || "Server";
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({ type: "server", label: `Server · ${label}`, onSelect: () => el.click() });
  });
  document.querySelectorAll(".channel-item").forEach((el) => {
    const label = el.dataset.channelName || el.textContent || "Channel";
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({ type: "channel", label: `Channel · ${label}`, onSelect: () => el.click() });
  });
  friendsCache.forEach((friend) => {
    const label = `${friend.username} (${friend.public_id})`;
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({
      type: "user",
      label: `User · ${label}`,
      onSelect: async () => {
        try {
          const convo = await createOrOpenDmConversation(friend.public_id);
          activeMode = "dm";
          updateSidebarModeUI();
          await loadDmConversations();
          activeDmConversationId = convo.public_id;
          highlightActiveChannel();
          updateTopbar(`@ ${convo.other_username}`, true);
          await loadDmMessages(convo.public_id, true);
          openDmMessageSocket(convo.public_id);
          applyDraftToComposer();
          persistActiveChatState();
        } catch (err) {
          alert(err.message || "Failed to open DM");
        }
      },
    });
  });
  return items.slice(0, 80);
}

function renderQuickSwitcher(query = "") {
  if (!quickSwitcherList) return;
  switcherItems = buildQuickSwitcherItems(query);
  switcherIndex = 0;
  quickSwitcherList.innerHTML = "";
  if (!switcherItems.length) {
    quickSwitcherList.innerHTML = '<div class="message-placeholder">No matches</div>';
    return;
  }
  switcherItems.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "friend-row";
    row.dataset.switcherIndex = String(idx);
    const name = document.createElement("div");
    name.className = "friend-row-name";
    name.textContent = item.label;
    row.appendChild(name);
    row.addEventListener("click", () => {
      closeModal(quickSwitcherModal);
      item.onSelect();
    });
    if (idx === switcherIndex) row.classList.add("active");
    quickSwitcherList.appendChild(row);
  });
}

function highlightSwitcherIndex() {
  if (!quickSwitcherList) return;
  quickSwitcherList.querySelectorAll(".friend-row").forEach((row, idx) => {
    row.classList.toggle("active", idx === switcherIndex);
  });
}

async function preprocessImageFile(file) {
  if (!file || !imagePreprocessModal || !imagePreprocessPreview) return file;
  const objectUrl = URL.createObjectURL(file);
  imagePreprocessPreview.src = objectUrl;
  openModal(imagePreprocessModal);
  return new Promise((resolve) => {
    imagePreprocessState = { resolve, objectUrl, file };
  });
}

function resolveImagePreprocessWithOriginal() {
  if (!imagePreprocessState) return;
  const { resolve, file, objectUrl } = imagePreprocessState;
  URL.revokeObjectURL(objectUrl);
  imagePreprocessState = null;
  resolve(file);
}

async function buildCenterSquareFile(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Image read failed"));
    reader.readAsDataURL(file);
  });
  const img = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Image decode failed"));
    el.src = dataUrl;
  });
  const side = Math.min(img.width, img.height);
  const sx = Math.floor((img.width - side) / 2);
  const sy = Math.floor((img.height - side) / 2);
  const canvas = document.createElement("canvas");
  canvas.width = side;
  canvas.height = side;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, side, side);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92));
  if (!blob) return file;
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}_square.png`, { type: "image/png" });
}

function setJumpUnreadVisible(visible) {
  if (!jumpUnreadBtn) return;
  jumpUnreadBtn.classList.toggle("hidden", !visible);
}

function updateJumpUnreadState() {
  if (!messagesPanel || activeChannelType === "voice") {
    setJumpUnreadVisible(false);
    return;
  }
  const nearBottom = messagesPanel.scrollTop + messagesPanel.clientHeight >= messagesPanel.scrollHeight - 48;
  setJumpUnreadVisible(!nearBottom);
}

function renderMessagesIncrementally(messages, buildFn, shouldScrollToBottom = false) {
  messagesPanel.innerHTML = "";
  if (!messages.length) {
    const placeholder = document.createElement("div");
    placeholder.classList.add("message-placeholder");
    placeholder.textContent = "No messages yet.";
    messagesPanel.appendChild(placeholder);
    return;
  }
  let index = 0;
  const batchSize = 28;
  const appendBatch = () => {
    const frag = document.createDocumentFragment();
    const end = Math.min(messages.length, index + batchSize);
    for (let i = index; i < end; i += 1) {
      frag.appendChild(buildFn(messages[i]));
    }
    messagesPanel.appendChild(frag);
    index = end;
    if (index < messages.length) {
      requestAnimationFrame(appendBatch);
    } else if (shouldScrollToBottom) {
      scrollMessagesToBottom();
    }
  };
  appendBatch();
}

function loadLabsSettings() {
  try {
    const raw = localStorage.getItem(LABS_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    labsSettings = {
      ...DEFAULT_LABS_SETTINGS,
      ...(parsed && typeof parsed === "object" ? parsed : {}),
    };
  } catch {
    labsSettings = { ...DEFAULT_LABS_SETTINGS };
  }
}

function saveLabsSettings() {
  try {
    localStorage.setItem(LABS_STORAGE_KEY, JSON.stringify(labsSettings));
  } catch {
    // Ignore storage failures
  }
}

function updateLabsControlValues() {
  if (settingsLabsSection) settingsLabsSection.classList.toggle("hidden", !labsSettings.unlocked);
  Object.entries(labsControlInputs).forEach(([key, input]) => {
    if (!input) return;
    input.checked = Boolean(labsSettings[key]);
  });
}

function ensureLanternLayer() {
  if (document.getElementById("lantern-layer")) return;
  const layer = document.createElement("div");
  layer.id = "lantern-layer";
  layer.className = "lantern-layer";
  for (let i = 0; i < 12; i += 1) {
    const node = document.createElement("span");
    node.className = "lantern";
    node.style.left = `${Math.random() * 100}%`;
    node.style.animationDelay = `${Math.random() * 10}s`;
    node.style.animationDuration = `${8 + Math.random() * 10}s`;
    node.style.opacity = `${0.15 + Math.random() * 0.45}`;
    layer.appendChild(node);
  }
  document.body.appendChild(layer);
}

function applyLabsSettings() {
  if (safeModeEnabled) {
    document.body.classList.remove(
      "fx-grain", "fx-glass", "fx-gradient", "fx-bob", "fx-message-glow",
      "fx-compact", "fx-neon", "fx-retro", "fx-lanterns", "fx-rainbow-author",
      "fx-scanlines", "fx-panel-tilt", "fx-unread-shimmer", "fx-konami"
    );
    d20SpinMultiplier = 1;
    d20BounceEnabled = false;
    rollAnimationsEnabled = false;
    return;
  }
  document.body.classList.toggle("fx-grain", Boolean(labsSettings.fxGrain));
  document.body.classList.toggle("fx-glass", Boolean(labsSettings.fxGlass));
  document.body.classList.toggle("fx-gradient", Boolean(labsSettings.fxGradient));
  document.body.classList.toggle("fx-bob", Boolean(labsSettings.fxBob));
  document.body.classList.toggle("fx-message-glow", Boolean(labsSettings.fxGlow));
  document.body.classList.toggle("fx-compact", Boolean(labsSettings.fxCompact));
  document.body.classList.toggle("fx-neon", Boolean(labsSettings.fxNeon));
  document.body.classList.toggle("fx-retro", Boolean(labsSettings.fxRetro));
  document.body.classList.toggle("fx-lanterns", Boolean(labsSettings.fxLanterns));
  document.body.classList.toggle("fx-rainbow-author", Boolean(labsSettings.fxRainbowAuthor));
  document.body.classList.toggle("fx-scanlines", Boolean(labsSettings.fxScanlines));
  document.body.classList.toggle("fx-panel-tilt", Boolean(labsSettings.fxPanelTilt));
  document.body.classList.toggle("fx-unread-shimmer", Boolean(labsSettings.fxUnreadShimmer));
  document.body.classList.toggle("fx-konami", Boolean(labsSettings.konamiMode));
  d20SpinMultiplier = labsSettings.fxD20Turbo ? 2.35 : 1;
  d20BounceEnabled = Boolean(labsSettings.fxD20Bounce);
  rollAnimationsEnabled = Boolean(labsSettings.fxRollAnim);
  const d20Canvas = document.getElementById("d20-canvas");
  if (d20Canvas) d20Canvas.style.pointerEvents = d20BounceEnabled ? "auto" : "none";
  if (messageInput) {
    messageInput.placeholder = labsSettings.fxCommandHints
      ? "Type a message... (/roll 2d20, /party, /shrug)"
      : "Type a message...";
  }
  if (labsSettings.fxLanterns) {
    ensureLanternLayer();
  } else {
    const layer = document.getElementById("lantern-layer");
    if (layer) layer.remove();
  }
}

function unlockLabs(showMessage = false) {
  if (labsSettings.unlocked) return;
  labsSettings.unlocked = true;
  saveLabsSettings();
  updateLabsControlValues();
  if (showMessage) showToast("Labs unlocked");
}

function launchEmojiRain(durationMs = 1800) {
  const layer = document.createElement("div");
  layer.className = "emoji-rain-layer";
  const emojis = ["🎉", "✨", "🎲", "🍻", "🔥", "🌙"];
  for (let i = 0; i < 32; i += 1) {
    const piece = document.createElement("span");
    piece.className = "emoji-rain-piece";
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), durationMs);
}

function appendClientSystemMessage(text) {
  if (!messagesPanel) return;
  const wrapper = document.createElement("div");
  wrapper.className = "message message-system";
  const author = document.createElement("span");
  author.className = "message-author";
  author.textContent = "Tavern:";
  const content = document.createElement("span");
  content.className = "message-content";
  content.innerHTML = renderMarkdown(text);
  const meta = document.createElement("span");
  meta.className = "message-meta";
  const time = document.createElement("span");
  time.className = "message-time";
  time.textContent = formatTimestamp(new Date().toISOString()) || "";
  meta.appendChild(time);
  wrapper.appendChild(author);
  wrapper.appendChild(document.createTextNode(" "));
  wrapper.appendChild(content);
  wrapper.appendChild(meta);
  messagesPanel.appendChild(wrapper);
  scrollMessagesToBottom();
}

function parseDiceExpression(raw) {
  const match = String(raw || "").trim().match(/^(\d{1,2})d(\d{1,4})$/i);
  if (!match) return null;
  const count = Number(match[1]);
  const sides = Number(match[2]);
  if (!Number.isFinite(count) || !Number.isFinite(sides)) return null;
  if (count < 1 || count > 50 || sides < 2 || sides > 1000) return null;
  return { count, sides };
}

function parseRollMessage(content) {
  const text = String(content || "").trim();
  const match = text.match(/^🎲\s*\[ROLL\s+(\d{1,2})d(\d{1,4})\]\s*\[([0-9,\s]+)\]\s*=\s*(\d+)$/i);
  if (!match) return null;
  const count = Number(match[1]);
  const sides = Number(match[2]);
  const rolls = match[3]
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));
  const total = Number(match[4]);
  if (!Number.isFinite(count) || !Number.isFinite(sides) || !Number.isFinite(total)) return null;
  if (!Array.isArray(rolls) || rolls.length === 0) return null;
  return { count, sides, rolls, total };
}

function animateRollDie(dieEl, sides, finalValue, delayMs = 0) {
  window.setTimeout(() => {
    dieEl.classList.add("rolling");
    let ticks = 0;
    const maxTicks = 10;
    const timer = window.setInterval(() => {
      ticks += 1;
      dieEl.textContent = String(1 + Math.floor(Math.random() * Math.max(2, sides)));
      if (ticks >= maxTicks) {
        window.clearInterval(timer);
        dieEl.textContent = String(finalValue);
        dieEl.classList.remove("rolling");
        dieEl.classList.add("landed");
      }
    }, 55);
  }, delayMs);
}

function buildRollSummary(rollData) {
  if (!rollData || !Array.isArray(rollData.rolls) || !rollData.rolls.length) return "";
  const values = rollData.rolls;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  const lines = [
    `Dice: ${rollData.count}d${rollData.sides}`,
    `Total: ${rollData.total}`,
    `Min/Max: ${min}/${max}`,
    `Average: ${avg.toFixed(2)}`,
  ];
  if (rollData.sides === 20) {
    const crits = values.filter((value) => value === 20).length;
    const fails = values.filter((value) => value === 1).length;
    lines.push(`Crits: ${crits}`);
    lines.push(`Nat 1s: ${fails}`);
  }
  return lines.join("\n");
}

function buildRollAnimationElement(rollData) {
  if (!rollData || !Array.isArray(rollData.rolls) || rollData.rolls.length === 0) return null;
  const container = document.createElement("div");
  container.className = "message-roll";
  const summaryText = buildRollSummary(rollData);
  if (summaryText) {
    container.setAttribute("aria-label", summaryText);
  }
  const title = document.createElement("div");
  title.className = "message-roll-title";
  title.textContent = `${rollData.count}d${rollData.sides} = ${rollData.total}`;
  container.appendChild(title);

  const diceWrap = document.createElement("div");
  diceWrap.className = "message-roll-dice";
  const maxDiceVisual = 12;
  rollData.rolls.slice(0, maxDiceVisual).forEach((value, idx) => {
    const die = document.createElement("span");
    die.className = "message-roll-die";
    die.textContent = String(value);
    diceWrap.appendChild(die);
    animateRollDie(die, rollData.sides, value, idx * 45);
  });
  if (rollData.rolls.length > maxDiceVisual) {
    const more = document.createElement("span");
    more.className = "message-roll-more";
    more.textContent = `+${rollData.rolls.length - maxDiceVisual} more`;
    diceWrap.appendChild(more);
  }
  container.appendChild(diceWrap);

  if (summaryText) {
    const summary = document.createElement("div");
    summary.className = "message-roll-summary";
    summary.textContent = summaryText;
    container.appendChild(summary);
  }
  return container;
}

function handleComposerCommand(content) {
  if (!content.startsWith("/")) return { handled: false, rewrite: content };
  const tokens = content.slice(1).trim().split(/\s+/);
  const command = (tokens[0] || "").toLowerCase();
  const args = tokens.slice(1);

  if (command === "roll") {
    const parsed = parseDiceExpression(args[0] || "1d20");
    if (!parsed) {
      appendClientSystemMessage("Usage: `/roll 2d20` (max 50 dice, 1000 sides)");
      return { handled: true };
    }
    const rolls = [];
    for (let i = 0; i < parsed.count; i += 1) rolls.push(1 + Math.floor(Math.random() * parsed.sides));
    const total = rolls.reduce((sum, value) => sum + value, 0);
    return {
      handled: false,
      rewrite: `🎲 [ROLL ${parsed.count}d${parsed.sides}] [${rolls.join(", ")}] = ${total}`,
    };
  }

  if (command === "party") {
    launchEmojiRain();
    appendClientSystemMessage("🎉 Party mode activated.");
    return { handled: true };
  }

  if (command === "konami") {
    labsSettings.konamiMode = !labsSettings.konamiMode;
    saveLabsSettings();
    applyLabsSettings();
    updateLabsControlValues();
    showToast(labsSettings.konamiMode ? "Konami mode enabled" : "Konami mode disabled");
    return { handled: true };
  }

  if (command === "help") {
    appendClientSystemMessage("Commands: `/roll 2d20`, `/party`, `/konami`, `/shrug`, `/tableflip`, `/unflip`, `/lenny`, `/help`");
    return { handled: true };
  }

  if (command === "shrug") return { handled: false, rewrite: "¯\\_(ツ)_/¯" };
  if (command === "tableflip") return { handled: false, rewrite: "(╯°□°）╯︵ ┻━┻" };
  if (command === "unflip") return { handled: false, rewrite: "┬─┬ ノ( ゜-゜ノ)" };
  if (command === "lenny") return { handled: false, rewrite: "( ͡° ͜ʖ ͡°)" };

  return { handled: false, rewrite: content };
}

function trackKonami(event) {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === KONAMI_SEQUENCE[konamiIndex]) {
    konamiIndex += 1;
    if (konamiIndex >= KONAMI_SEQUENCE.length) {
      konamiIndex = 0;
      unlockLabs(true);
      labsSettings.konamiMode = !labsSettings.konamiMode;
      saveLabsSettings();
      applyLabsSettings();
      updateLabsControlValues();
      showToast(labsSettings.konamiMode ? "Konami mode enabled" : "Konami mode disabled");
    }
    return;
  }
  konamiIndex = key === KONAMI_SEQUENCE[0] ? 1 : 0;
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
}

function closeActiveReactionPicker() {
  if (!activeReactionPicker) return;
  activeReactionPicker.remove();
  activeReactionPicker = null;
}

function openReactionPicker(anchor, onSelect) {
  closeActiveReactionPicker();
  const picker = document.createElement("div");
  picker.className = "message-emoji-picker";
  picker.addEventListener("click", (event) => event.stopPropagation());

  REACTION_EMOJI_OPTIONS.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-picker-btn";
    btn.textContent = emoji;
    btn.addEventListener("click", async () => {
      closeActiveReactionPicker();
      await onSelect(emoji);
    });
    picker.appendChild(btn);
  });

  anchor.appendChild(picker);
  activeReactionPicker = picker;
}

function getMessageSnippet(content) {
  const raw = (content || "").replace(/\s+/g, " ").trim();
  if (!raw) return "";
  return raw.length > 80 ? `${raw.slice(0, 80)}...` : raw;
}

function setPendingReply(msg) {
  pendingReplyTo = msg
    ? {
        public_id: msg.public_id,
        username: msg.username,
        content: msg.content || "",
      }
    : null;
  if (!replyPreview || !replyPreviewText) return;
  if (!pendingReplyTo) {
    replyPreview.classList.add("hidden");
    replyPreviewText.textContent = "";
    return;
  }
  replyPreview.classList.remove("hidden");
  replyPreviewText.textContent = `Replying to ${pendingReplyTo.username}: ${getMessageSnippet(pendingReplyTo.content)}`;
}

function ensureContextMenu() {
  if (contextMenuEl) return contextMenuEl;
  contextMenuEl = document.createElement("div");
  contextMenuEl.id = "context-menu";
  contextMenuEl.className = "context-menu hidden";
  document.body.appendChild(contextMenuEl);
  return contextMenuEl;
}

function hideContextMenu() {
  if (!contextMenuEl) return;
  contextMenuEl.classList.add("hidden");
  contextMenuEl.innerHTML = "";
}

function showContextMenu(x, y, items) {
  const menu = ensureContextMenu();
  menu.innerHTML = "";
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `context-menu-item${item.danger ? " danger" : ""}`;
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      hideContextMenu();
      item.onClick();
    });
    menu.appendChild(btn);
  });

  menu.classList.remove("hidden");
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  const rect = menu.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - 8;
  const maxY = window.innerHeight - rect.height - 8;
  menu.style.left = `${Math.max(8, Math.min(x, maxX))}px`;
  menu.style.top = `${Math.max(8, Math.min(y, maxY))}px`;
}

function applyStoredTheme() {
  loadCustomThemes();
  let hasStoredAppearance = false;
  try {
    const raw = localStorage.getItem(APPEARANCE_STORAGE_KEY);
    hasStoredAppearance = Boolean(raw);
    const parsed = JSON.parse(raw || "{}");
    appearanceSettings = {
      ...DEFAULT_APPEARANCE,
      ...(parsed && typeof parsed === "object" ? parsed : {}),
    };
  } catch {
    appearanceSettings = { ...DEFAULT_APPEARANCE };
  }

  // Legacy migration from old light/dark toggle key.
  try {
    const legacy = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
    if (legacy === "dark" && !hasStoredAppearance) {
      appearanceSettings.themeId = appearanceSettings.lastDarkThemeId || DEFAULT_APPEARANCE.lastDarkThemeId;
    }
  } catch {
    // Ignore storage failures
  }

  applyAppearanceSettings();
}

function loadCustomThemes() {
  try {
    const raw = localStorage.getItem(CUSTOM_THEMES_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    customThemes = Array.isArray(parsed) ? parsed : [];
  } catch {
    customThemes = [];
  }
}

function saveCustomThemes() {
  try {
    localStorage.setItem(CUSTOM_THEMES_STORAGE_KEY, JSON.stringify(customThemes));
  } catch {
    // Ignore storage failures
  }
}

function saveAppearanceSettings() {
  try {
    localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearanceSettings));
  } catch {
    // Ignore storage failures
  }
  applyCustomCss();
}

function applyAppearanceSettings() {
  const preset = getThemeById(appearanceSettings.themeId);
  const htmlStyle = document.documentElement.style;
  const bodyStyle = document.body.style;
  [htmlStyle, bodyStyle].forEach((styleRef) => {
    styleRef.setProperty("--bg", preset.bg);
    styleRef.setProperty("--panel-bg", preset.panelBg);
    styleRef.setProperty("--header-footer-bg", preset.headerFooterBg);
    styleRef.setProperty("--text", preset.text);
    styleRef.setProperty("--muted", preset.muted);
    styleRef.setProperty("--accent", preset.accent);
    styleRef.setProperty("--accent-strong", preset.accentStrong);
    styleRef.setProperty("--border", preset.border);
    styleRef.setProperty("--shadow", preset.shadow);
    styleRef.setProperty("--ui-scale", String(appearanceSettings.uiScale));
    styleRef.setProperty("--panel-radius", `${appearanceSettings.panelRadius}px`);
    styleRef.setProperty("--message-density", String(appearanceSettings.messageDensity));
  });

  document.body.classList.toggle("dark-mode", preset.mode === "dark");
  document.body.style.fontFamily = appearanceSettings.fontFamily || DEFAULT_APPEARANCE.fontFamily;
  applyCustomCss();
  applyLabsSettings();
  updateD20ThemeColor();
}

function updateAppearanceControlValues() {
  if (settingsUiScaleInput) settingsUiScaleInput.value = String(appearanceSettings.uiScale);
  if (settingsPanelRadiusInput) settingsPanelRadiusInput.value = String(appearanceSettings.panelRadius);
  if (settingsMessageDensityInput) settingsMessageDensityInput.value = String(appearanceSettings.messageDensity);
  if (settingsUiScaleValue) settingsUiScaleValue.textContent = `${Number(appearanceSettings.uiScale).toFixed(2)}x`;
  if (settingsPanelRadiusValue) settingsPanelRadiusValue.textContent = `${Math.round(Number(appearanceSettings.panelRadius))}px`;
  if (settingsMessageDensityValue) settingsMessageDensityValue.textContent = `${Number(appearanceSettings.messageDensity).toFixed(2)}x`;
  if (settingsFontFamilyInput) settingsFontFamilyInput.value = appearanceSettings.fontFamily || DEFAULT_APPEARANCE.fontFamily;
  if (settingsCustomCssInput) settingsCustomCssInput.value = appearanceSettings.customCss || "";
}

function renderThemePresetGrid() {
  if (!settingsThemeGrid) return;
  settingsThemeGrid.innerHTML = "";
  const activeThemeId = getThemeById(appearanceSettings.themeId).id;
  getAllThemes().forEach((preset) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-preset-btn";
    if (preset.id === activeThemeId) btn.classList.add("active");

    const nameEl = document.createElement("span");
    nameEl.className = "theme-preset-name";
    nameEl.textContent = `${preset.name}${preset.custom ? " *" : ""}`;
    btn.appendChild(nameEl);

    const swatches = document.createElement("span");
    swatches.className = "theme-preset-swatches";
    [preset.bg, preset.panelBg, preset.accent, preset.accentStrong].forEach((colorValue, index) => {
      const swatch = document.createElement("span");
      swatch.style.background = index === 1 ? preset.headerFooterBg : colorValue;
      swatches.appendChild(swatch);
    });
    btn.appendChild(swatches);

    btn.addEventListener("click", () => {
      appearanceSettings.themeId = preset.id;
      if (preset.mode === "dark") {
        appearanceSettings.lastDarkThemeId = preset.id;
      } else {
        appearanceSettings.lastLightThemeId = preset.id;
      }
      applyAppearanceSettings();
      saveAppearanceSettings();
      renderThemePresetGrid();
      populateThemeTemplateEditor(preset);
    });

    settingsThemeGrid.appendChild(btn);
  });
}

function resetAppearanceSettings() {
  appearanceSettings = { ...DEFAULT_APPEARANCE };
  if (settingsThemeTemplateInput) settingsThemeTemplateInput.value = "";
  applyAppearanceSettings();
  updateAppearanceControlValues();
  renderThemePresetGrid();
  saveAppearanceSettings();
}

function getAllThemes() {
  return [...THEME_PRESETS, ...customThemes];
}

function getThemeById(themeId) {
  return getAllThemes().find((preset) => preset.id === themeId) || THEME_PRESETS[0];
}

function slugifyThemeName(name) {
  return String(name || "custom-theme")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "custom-theme";
}

function normalizeThemeTemplate(rawTemplate, fallbackId = null) {
  const source = rawTemplate && typeof rawTemplate === "object" ? rawTemplate : {};
  const mode = source.mode === "dark" ? "dark" : "light";
  let id = fallbackId || source.id || `custom-${slugifyThemeName(source.name || "theme")}`;
  if (THEME_PRESETS.some((preset) => preset.id === id)) {
    id = `custom-${slugifyThemeName(source.name || id)}`;
  }
  const name = String(source.name || "Custom Theme").trim() || "Custom Theme";
  const fallback = mode === "dark" ? THEME_PRESETS.find((t) => t.mode === "dark") : THEME_PRESETS.find((t) => t.mode === "light");
  return {
    id,
    name,
    mode,
    bg: String(source.bg || fallback.bg),
    panelBg: String(source.panelBg || fallback.panelBg),
    headerFooterBg: String(source.headerFooterBg || fallback.headerFooterBg),
    text: String(source.text || fallback.text),
    muted: String(source.muted || fallback.muted),
    accent: String(source.accent || fallback.accent),
    accentStrong: String(source.accentStrong || fallback.accentStrong),
    border: String(source.border || fallback.border),
    shadow: String(source.shadow || fallback.shadow),
    custom: true,
  };
}

function populateThemeTemplateEditor(theme) {
  if (!settingsThemeTemplateInput || !theme) return;
  const exportTemplate = {
    id: theme.id,
    name: theme.name,
    mode: theme.mode,
    bg: theme.bg,
    panelBg: theme.panelBg,
    headerFooterBg: theme.headerFooterBg,
    text: theme.text,
    muted: theme.muted,
    accent: theme.accent,
    accentStrong: theme.accentStrong,
    border: theme.border,
    shadow: theme.shadow,
  };
  settingsThemeTemplateInput.value = JSON.stringify(exportTemplate, null, 2);
}

function readThemeTemplateFromEditor() {
  const raw = settingsThemeTemplateInput?.value?.trim();
  if (!raw) throw new Error("Theme template JSON is empty.");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Theme template JSON is invalid.");
  }
  return normalizeThemeTemplate(parsed);
}

function saveOrUpdateCustomTheme(theme) {
  const idx = customThemes.findIndex((t) => t.id === theme.id);
  if (idx >= 0) customThemes[idx] = theme;
  else customThemes.push(theme);
  saveCustomThemes();
}

function deleteCustomTheme(themeId) {
  customThemes = customThemes.filter((theme) => theme.id !== themeId);
  saveCustomThemes();
}

function applyCustomCss() {
  const id = "tavern-custom-css";
  let styleEl = document.getElementById(id);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = safeModeEnabled ? "" : (appearanceSettings.customCss || "");
}

function bindAppearanceControls() {
  if (settingsUiScaleInput) {
    settingsUiScaleInput.addEventListener("input", () => {
      appearanceSettings.uiScale = clamp(Number(settingsUiScaleInput.value), 0.9, 1.15);
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsPanelRadiusInput) {
    settingsPanelRadiusInput.addEventListener("input", () => {
      appearanceSettings.panelRadius = clamp(Number(settingsPanelRadiusInput.value), 8, 24);
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsMessageDensityInput) {
    settingsMessageDensityInput.addEventListener("input", () => {
      appearanceSettings.messageDensity = clamp(Number(settingsMessageDensityInput.value), 0.85, 1.25);
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsResetAppearanceBtn) {
    settingsResetAppearanceBtn.addEventListener("click", resetAppearanceSettings);
  }
  if (settingsFontFamilyInput) {
    settingsFontFamilyInput.addEventListener("input", () => {
      appearanceSettings.fontFamily = settingsFontFamilyInput.value.trim() || DEFAULT_APPEARANCE.fontFamily;
      applyAppearanceSettings();
      saveAppearanceSettings();
    });
  }
  if (settingsCustomCssInput) {
    settingsCustomCssInput.addEventListener("input", () => {
      appearanceSettings.customCss = settingsCustomCssInput.value || "";
      applyCustomCss();
      saveAppearanceSettings();
    });
  }
  if (settingsTemplateLoadBtn) {
    settingsTemplateLoadBtn.addEventListener("click", () => {
      populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
    });
  }
  if (settingsTemplateApplyBtn) {
    settingsTemplateApplyBtn.addEventListener("click", () => {
      try {
        const template = readThemeTemplateFromEditor();
        saveOrUpdateCustomTheme(template);
        appearanceSettings.themeId = template.id;
        if (template.mode === "dark") appearanceSettings.lastDarkThemeId = template.id;
        else appearanceSettings.lastLightThemeId = template.id;
        applyAppearanceSettings();
        saveAppearanceSettings();
        renderThemePresetGrid();
      } catch (err) {
        alert(err.message || "Invalid theme template");
      }
    });
  }
  if (settingsTemplateSaveBtn) {
    settingsTemplateSaveBtn.addEventListener("click", () => {
      try {
        const template = readThemeTemplateFromEditor();
        saveOrUpdateCustomTheme(template);
        renderThemePresetGrid();
        alert(`Theme "${template.name}" saved.`);
      } catch (err) {
        alert(err.message || "Failed to save theme template");
      }
    });
  }
  if (settingsTemplateDeleteBtn) {
    settingsTemplateDeleteBtn.addEventListener("click", () => {
      const active = getThemeById(appearanceSettings.themeId);
      if (!active.custom) {
        alert("Select a custom theme to delete.");
        return;
      }
      const ok = window.confirm(`Delete custom theme "${active.name}"?`);
      if (!ok) return;
      deleteCustomTheme(active.id);
      appearanceSettings.themeId = DEFAULT_APPEARANCE.themeId;
      applyAppearanceSettings();
      saveAppearanceSettings();
      renderThemePresetGrid();
      populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
    });
  }
  if (settingsTemplateExportBtn) {
    settingsTemplateExportBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(customThemes, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tavern-custom-themes.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  if (settingsTemplateImportInput) {
    settingsTemplateImportInput.addEventListener("change", async () => {
      const file = settingsTemplateImportInput.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("Theme import must be an array of theme templates.");
        parsed.forEach((rawTheme) => {
          const theme = normalizeThemeTemplate(rawTheme);
          saveOrUpdateCustomTheme(theme);
        });
        renderThemePresetGrid();
        alert("Themes imported.");
      } catch (err) {
        alert(err.message || "Failed to import themes");
      } finally {
        settingsTemplateImportInput.value = "";
      }
    });
  }
}

function updateD20ThemeColor() {
  if (!d20Material) return;
  d20Material.color.setHex(document.body.classList.contains("dark-mode") ? 0xffffff : 0x7f8072);
}

function bindLabsControls() {
  if (settingsOpenLabsBtn) {
    settingsOpenLabsBtn.addEventListener("click", () => {
      unlockLabs(true);
      updateLabsControlValues();
    });
  }

  if (settingsTitle) {
    settingsTitle.addEventListener("click", (event) => {
      if (event.target === settingsOpenLabsBtn) return;
      labsUnlockClicks += 1;
      if (labsUnlockClicks >= 7) {
        labsUnlockClicks = 0;
        unlockLabs(true);
      }
    });
  }

  Object.entries(labsControlInputs).forEach(([key, input]) => {
    if (!input) return;
    input.addEventListener("change", () => {
      labsSettings[key] = Boolean(input.checked);
      saveLabsSettings();
      applyLabsSettings();
      updateLabsControlValues();
    });
  });

  if (labsTriggerPartyBtn) {
    labsTriggerPartyBtn.addEventListener("click", () => {
      launchEmojiRain();
      showToast("Emoji rain");
    });
  }

  if (labsTriggerKonamiBtn) {
    labsTriggerKonamiBtn.addEventListener("click", () => {
      labsSettings.konamiMode = !labsSettings.konamiMode;
      saveLabsSettings();
      applyLabsSettings();
      updateLabsControlValues();
      showToast(labsSettings.konamiMode ? "Konami mode enabled" : "Konami mode disabled");
    });
  }

  if (labsResetBtn) {
    labsResetBtn.addEventListener("click", () => {
      const keepUnlock = labsSettings.unlocked;
      labsSettings = { ...DEFAULT_LABS_SETTINGS, unlocked: keepUnlock };
      saveLabsSettings();
      applyLabsSettings();
      updateLabsControlValues();
      showToast("Labs reset");
    });
  }

  if (openLaunchChecklistBtn && launchChecklistModal) {
    openLaunchChecklistBtn.addEventListener("click", () => {
      renderLaunchChecklist();
      openModal(launchChecklistModal);
    });
  }

  if (launchChecklistResetBtn) {
    launchChecklistResetBtn.addEventListener("click", () => {
      launchChecklistState = {};
      saveLaunchChecklistState();
      renderLaunchChecklist();
      showToast("Checklist reset");
    });
  }
}

function bindUtilityControls() {
  if (settingsResetClientCacheBtn) {
    settingsResetClientCacheBtn.addEventListener("click", () => {
      const ok = window.confirm("Reset client-side cache and preferences? This will reload the dashboard.");
      if (!ok) return;
      const preserveKeys = new Set([LAUNCH_CHECKLIST_STORAGE_KEY]);
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (!key.startsWith("tavern.")) return;
        if (preserveKeys.has(key)) return;
        localStorage.removeItem(key);
      });
      window.location.reload();
    });
  }

  if (settingsSafeModeBtn) {
    settingsSafeModeBtn.addEventListener("click", () => {
      safeModeEnabled = !safeModeEnabled;
      saveSafeModeState();
      applySafeModeState();
      showToast(safeModeEnabled ? "Safe mode enabled" : "Safe mode disabled");
    });
  }

  if (settingsExportBundleBtn) {
    settingsExportBundleBtn.addEventListener("click", () => {
      const payload = serializeSettingsBundle();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tavern-settings-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (settingsImportBundleInput) {
    settingsImportBundleInput.addEventListener("change", async () => {
      const file = settingsImportBundleInput.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        applySettingsBundle(parsed);
        showToast("Settings bundle imported");
      } catch (err) {
        alert(err.message || "Failed to import settings bundle");
      } finally {
        settingsImportBundleInput.value = "";
      }
    });
  }

  if (retrySendBtn) {
    retrySendBtn.addEventListener("click", async () => {
      const item = failedSendQueue.shift();
      updateRetrySendUi();
      if (!item || !messageInput) return;
      if (item.mode === "dm") {
        activeMode = "dm";
        activeDmConversationId = item.dmConversationId;
      } else {
        activeMode = "server";
        activeChannelId = item.channelId;
      }
      messageInput.value = item.content;
      showToast("Restored failed message for retry");
      messageInput.focus();
    });
  }

  if (jumpUnreadBtn && messagesPanel) {
    jumpUnreadBtn.addEventListener("click", () => {
      scrollMessagesToBottom();
      setJumpUnreadVisible(false);
    });
    messagesPanel.addEventListener("scroll", updateJumpUnreadState);
  }

  if (messageSearchToggleBtn && messageSearchBar) {
    messageSearchToggleBtn.addEventListener("click", () => {
      messageSearchBar.classList.toggle("hidden");
      if (!messageSearchBar.classList.contains("hidden")) {
        messageSearchInput?.focus();
      }
    });
  }

  if (messageSearchInput) {
    messageSearchInput.addEventListener("input", () => {
      const query = (messageSearchInput.value || "").trim().toLowerCase();
      let matches = 0;
      document.querySelectorAll("#messages-container .message").forEach((el) => {
        const text = (el.textContent || "").toLowerCase();
        const hit = !!query && text.includes(query);
        el.classList.toggle("search-hit", hit);
        if (hit) matches += 1;
      });
      if (messageSearchCount) messageSearchCount.textContent = String(matches);
    });
  }

  if (messageSearchClearBtn && messageSearchInput) {
    messageSearchClearBtn.addEventListener("click", () => {
      messageSearchInput.value = "";
      messageSearchInput.dispatchEvent(new Event("input"));
    });
  }

  if (quickSwitcherInput) {
    quickSwitcherInput.addEventListener("input", () => {
      renderQuickSwitcher(quickSwitcherInput.value || "");
    });
    quickSwitcherInput.addEventListener("keydown", (event) => {
      if (!switcherItems.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        switcherIndex = (switcherIndex + 1) % switcherItems.length;
        highlightSwitcherIndex();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        switcherIndex = (switcherIndex - 1 + switcherItems.length) % switcherItems.length;
        highlightSwitcherIndex();
      } else if (event.key === "Enter") {
        event.preventDefault();
        const selected = switcherItems[switcherIndex];
        if (selected) {
          closeModal(quickSwitcherModal);
          selected.onSelect();
        }
      }
    });
  }

  if (imagePreprocessOriginalBtn) {
    imagePreprocessOriginalBtn.addEventListener("click", () => {
      if (!imagePreprocessState) return;
      closeModal(imagePreprocessModal);
      resolveImagePreprocessWithOriginal();
    });
  }

  if (imagePreprocessCropBtn) {
    imagePreprocessCropBtn.addEventListener("click", async () => {
      if (!imagePreprocessState) return;
      const { resolve, file, objectUrl } = imagePreprocessState;
      try {
        const cropped = await buildCenterSquareFile(file);
        URL.revokeObjectURL(objectUrl);
        imagePreprocessState = null;
        closeModal(imagePreprocessModal);
        resolve(cropped);
      } catch {
        URL.revokeObjectURL(objectUrl);
        imagePreprocessState = null;
        closeModal(imagePreprocessModal);
        resolve(file);
      }
    });
  }

  if (imagePreprocessCancelBtn) {
    imagePreprocessCancelBtn.addEventListener("click", () => {
      closeModal(imagePreprocessModal);
      resolveImagePreprocessWithOriginal();
    });
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function loadPanelSizes() {
  try {
    const raw = localStorage.getItem(PANEL_SIZES_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    if (typeof parsed.servers === "number") panelSizes.servers = parsed.servers;
    if (typeof parsed.channels === "number") panelSizes.channels = parsed.channels;
  } catch {
    // Keep defaults
  }
}

function savePanelSizes() {
  try {
    localStorage.setItem(PANEL_SIZES_STORAGE_KEY, JSON.stringify(panelSizes));
  } catch {
    // Ignore storage failures
  }
}

function applyPanelSizes() {
  const maxServers = Math.max(120, Math.floor(window.innerWidth * 0.35));
  const maxChannels = Math.max(180, Math.floor(window.innerWidth * 0.45));
  panelSizes.servers = clamp(panelSizes.servers, 72, maxServers);
  panelSizes.channels = clamp(panelSizes.channels, 160, maxChannels);
  document.documentElement.style.setProperty("--servers-panel-width", `${panelSizes.servers}px`);
  document.documentElement.style.setProperty("--channels-panel-width", `${panelSizes.channels}px`);
}

function initPanelResizer(panelElement, key, min, maxRatio) {
  if (!panelElement || panelElement.querySelector(".panel-resizer")) return;
  const resizer = document.createElement("div");
  resizer.className = "panel-resizer";
  panelElement.appendChild(resizer);

  resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = panelSizes[key];
    document.body.classList.add("resizing-panels");

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const max = Math.max(min + 20, Math.floor(window.innerWidth * maxRatio));
      panelSizes[key] = clamp(startWidth + delta, min, max);
      applyPanelSizes();
    };

    const onMouseUp = () => {
      document.body.classList.remove("resizing-panels");
      savePanelSizes();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });
}

function formatTimestamp(isoValue) {
  if (!isoValue) return "";
  const date = new Date(isoValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

function scrollMessagesToBottom() {
  if (!messagesPanel) return;
  messagesPanel.scrollTop = messagesPanel.scrollHeight;
}

function applyDmPresenceIndicators() {
  document.querySelectorAll(".dm-item").forEach((el) => {
    const otherUserPublicId = el.dataset.dmOtherUserPublicId;
    const dot = el.querySelector(".dm-presence-dot");
    const online = !!otherUserPublicId && onlineUserPublicIds.has(otherUserPublicId);
    el.classList.toggle("dm-online", online);
    if (dot) dot.classList.toggle("online", online);
  });
}

function closePresenceSocket() {
  if (!presenceSocket) return;
  presenceSocket.onclose = null;
  presenceSocket.close();
  presenceSocket = null;
  setRealtimeState("presence", false, 0);
  if (presenceReconnectTimer) {
    clearTimeout(presenceReconnectTimer);
    presenceReconnectTimer = null;
  }
}

function connectPresenceSocket() {
  if (presenceSocket) return;
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  presenceSocket = new WebSocket(`${protocol}://${window.location.host}/ws/presence`);
  presenceSocket.onopen = () => {
    setRealtimeState("presence", true, 0);
  };

  presenceSocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.event !== "presence_update") return;
      onlineUserPublicIds.clear();
      (data.online_user_public_ids || []).forEach((id) => {
        if (typeof id === "string" && id) onlineUserPublicIds.add(id);
      });
      applyDmPresenceIndicators();
      if (serverMembersModal?.classList.contains("open")) {
        loadServerMembersModal().catch(() => {});
      }
    } catch {
      // Ignore malformed presence payloads
    }
  };

  presenceSocket.onclose = () => {
    presenceSocket = null;
    if (presenceReconnectTimer) clearTimeout(presenceReconnectTimer);
    const retryAt = Date.now() + 2000;
    setRealtimeState("presence", false, retryAt);
    presenceReconnectTimer = setTimeout(() => {
      connectPresenceSocket();
    }, 2000);
  };

  presenceSocket.onerror = () => {
    setRealtimeState("presence", false, Date.now() + 2000);
    if (presenceSocket) presenceSocket.close();
  };
}

function closeDmMessageSocket() {
  if (!dmMessageSocket) return;
  dmMessageSocket.onclose = null;
  dmMessageSocket.close();
  dmMessageSocket = null;
  setRealtimeState("dm", false, 0);
  if (dmReconnectTimer) {
    clearTimeout(dmReconnectTimer);
    dmReconnectTimer = null;
  }
}

function openDmMessageSocket(conversationPublicId) {
  closeDmMessageSocket();
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  dmMessageSocket = new WebSocket(`${protocol}://${window.location.host}/ws/dms/${conversationPublicId}`);
  dmMessageSocket.onopen = () => {
    setRealtimeState("dm", true, 0);
  };
  dmMessageSocket.onmessage = async () => {
    if (activeMode === "dm" && activeDmConversationId === conversationPublicId) {
      await loadDmMessages(conversationPublicId, true);
    }
  };
  dmMessageSocket.onclose = () => {
    dmMessageSocket = null;
    const retryAt = Date.now() + 1500;
    setRealtimeState("dm", false, retryAt);
    if (activeMode === "dm" && activeDmConversationId === conversationPublicId) {
      if (dmReconnectTimer) clearTimeout(dmReconnectTimer);
      dmReconnectTimer = setTimeout(() => {
        openDmMessageSocket(conversationPublicId);
      }, 1500);
    }
  };
  dmMessageSocket.onerror = () => {
    setRealtimeState("dm", false, Date.now() + 1500);
  };
}

function updateSidebarModeUI() {
  const isDmMode = activeMode === "dm";
  if (channelsPanelTitle) channelsPanelTitle.textContent = isDmMode ? "Direct Messages" : "Channels";
  if (openServerMembersBtn) openServerMembersBtn.classList.toggle("hidden", isDmMode);
  if (openFriendsBtn) openFriendsBtn.classList.toggle("hidden", !isDmMode);
  if (openCreateDmBtn) openCreateDmBtn.classList.toggle("hidden", !isDmMode);
  if (openAddSeparatorBtn) openAddSeparatorBtn.classList.toggle("hidden", isDmMode);
  if (openCreateChannelBtn) openCreateChannelBtn.classList.toggle("hidden", isDmMode);
  if (homeDmBtn) homeDmBtn.classList.toggle("active", isDmMode);
}

function updateTopbar(title, showCall) {
  if (!messagesTopbar || !messagesTopbarTitle || !dmCallBtn) return;
  if (!title) {
    messagesTopbar.classList.add("hidden");
    dmCallBtn.classList.add("hidden");
    if (messageSearchBar) messageSearchBar.classList.add("hidden");
    return;
  }
  messagesTopbar.classList.remove("hidden");
  messagesTopbarTitle.textContent = title;
  dmCallBtn.classList.toggle("hidden", !showCall);
}

function applyUnreadStyles() {
  document.querySelectorAll(".server-item").forEach((el) => {
    const serverId = el.dataset.serverId;
    el.classList.toggle("has-unread", unreadServers.has(serverId));
  });

  document.querySelectorAll(".channel-item").forEach((el) => {
    const channelId = el.dataset.channelId;
    el.classList.toggle("has-unread", unreadChannels.has(channelId));
  });
}

function markChannelRead(channelId) {
  unreadChannels.delete(channelId);
  const channelEl = document.querySelector(`.channel-item[data-channel-id="${channelId}"]`);
  if (channelEl) channelEl.classList.remove("has-unread");
}

function recalculateUnreadServers() {
  unreadServers.clear();
  unreadChannels.forEach((channelId) => {
    const serverId = channelToServer.get(channelId);
    if (serverId) unreadServers.add(serverId);
  });
  applyUnreadStyles();
}

function recomputeServerPresence(serverId) {
  if (!serverId) return;
  const online = new Set();
  channelToServer.forEach((mappedServerId, channelId) => {
    if (mappedServerId !== serverId) return;
    const users = channelPresence.get(channelId);
    if (!users) return;
    users.forEach((user) => online.add(user.user_public_id));
  });
  serverOnlineUsers.set(serverId, online);
}

function applyPresenceUpdate(channelId, onlineUsers) {
  const users = new Map();
  (onlineUsers || []).forEach((user) => {
    if (!user?.user_public_id) return;
    users.set(user.user_public_id, user);
  });
  channelPresence.set(channelId, users);
  const serverId = channelToServer.get(channelId);
  if (serverId) {
    recomputeServerPresence(serverId);
    if (serverMembersModal?.classList.contains("open") && activeServerId === serverId) {
      loadServerMembersModal().catch(() => {});
    }
  }
}

function clearTypingForChannel(channelId) {
  typingUsersByChannel.delete(channelId);
  if (activeChannelId === channelId) renderTypingIndicator();
}

function handleTypingEvent(channelId, eventType, payload) {
  if (!channelId || !payload?.user_public_id) return;
  const byUser = typingUsersByChannel.get(channelId) || new Map();
  const userPublicId = payload.user_public_id;

  if (eventType === "typing_start") {
    const existing = byUser.get(userPublicId);
    if (existing?.timer) clearTimeout(existing.timer);
    const timer = setTimeout(() => {
      const currentMap = typingUsersByChannel.get(channelId);
      if (!currentMap) return;
      currentMap.delete(userPublicId);
      if (currentMap.size === 0) typingUsersByChannel.delete(channelId);
      if (activeChannelId === channelId) renderTypingIndicator();
    }, 2200);
    byUser.set(userPublicId, { username: payload.username || "Someone", timer });
    typingUsersByChannel.set(channelId, byUser);
  } else if (eventType === "typing_stop") {
    const existing = byUser.get(userPublicId);
    if (existing?.timer) clearTimeout(existing.timer);
    byUser.delete(userPublicId);
    if (byUser.size === 0) {
      typingUsersByChannel.delete(channelId);
    } else {
      typingUsersByChannel.set(channelId, byUser);
    }
  }

  if (activeChannelId === channelId) renderTypingIndicator();
}

function renderTypingIndicator() {
  if (!typingIndicator) return;
  if (activeMode !== "server" || activeChannelType === "voice" || !activeChannelId) {
    typingIndicator.classList.add("hidden");
    typingIndicator.textContent = "";
    return;
  }
  const typingMap = typingUsersByChannel.get(activeChannelId);
  const names = typingMap ? [...typingMap.values()].map((item) => item.username) : [];
  if (!names.length) {
    typingIndicator.classList.add("hidden");
    typingIndicator.textContent = "";
    return;
  }
  let text = "";
  if (names.length === 1) text = `${names[0]} is typing...`;
  else if (names.length === 2) text = `${names[0]} and ${names[1]} are typing...`;
  else text = `${names[0]} and ${names.length - 1} others are typing...`;
  typingIndicator.textContent = text;
  typingIndicator.classList.remove("hidden");
}

function sendTypingEvent(eventType) {
  if (activeMode !== "server" || !activeChannelId || activeChannelType === "voice") return;
  const socket = channelSockets.get(activeChannelId);
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ type: eventType }));
}

function stopTypingNow() {
  if (typingStopTimer) {
    clearTimeout(typingStopTimer);
    typingStopTimer = null;
  }
  if (typingActiveChannelId && activeMode === "server" && activeChannelId === typingActiveChannelId) {
    sendTypingEvent("typing_stop");
  }
  typingActiveChannelId = null;
  typingLastStartSentAt = 0;
}

async function loadServerMembersModal() {
  if (!activeServerId || !membersListEl) return;
  const [members, roles] = await Promise.all([
    fetchServerMembers(activeServerId),
    fetchServerRoles(activeServerId),
  ]);
  cacheServerNicknames(activeServerId, members);

  const serverOnline = serverOnlineUsers.get(activeServerId) || new Set();
  const online = new Set([...serverOnline, ...onlineUserPublicIds]);
  const roleOptions = Array.isArray(roles) ? roles : [];

  if (membersServerName) membersServerName.textContent = getServerNameById(activeServerId);
  membersListEl.innerHTML = "";

  members
    .sort((a, b) => {
      const aName = (a.nickname || a.username || "").toLowerCase();
      const bName = (b.nickname || b.username || "").toLowerCase();
      return aName.localeCompare(bName);
    })
    .forEach((member) => {
      const row = document.createElement("div");
      row.className = "member-row";

      const left = document.createElement("div");
      left.className = "member-name-wrap";
      const name = document.createElement("div");
      name.className = "member-name";
      const nicknameText = (member.nickname || "").trim();
      name.textContent = nicknameText
        ? `${nicknameText} (@${member.username}) (${member.role})`
        : `${member.username} (${member.role})`;
      const pid = document.createElement("div");
      pid.className = "member-public-id";
      pid.textContent = member.user_public_id;
      left.appendChild(name);
      left.appendChild(pid);

      if (member.user_id === currentUserId) {
        const nickRow = document.createElement("div");
        nickRow.className = "member-nickname-controls";
        const nickInput = document.createElement("input");
        const draftKey = member.user_public_id;
        nickInput.type = "text";
        nickInput.className = "member-nickname-input";
        nickInput.placeholder = "Set server nickname";
        nickInput.maxLength = 50;
        nickInput.value = memberNicknameDrafts.has(draftKey)
          ? memberNicknameDrafts.get(draftKey)
          : nicknameText;
        nickInput.addEventListener("input", () => {
          memberNicknameDrafts.set(draftKey, nickInput.value);
        });
        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "member-nickname-save";
        saveBtn.textContent = "Save";
        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.className = "member-nickname-clear";
        clearBtn.textContent = "Clear";
        saveBtn.addEventListener("click", async () => {
          try {
            await patchServerMemberNickname(activeServerId, member.user_public_id, nickInput.value);
            memberNicknameDrafts.delete(draftKey);
            await loadServerMembersModal();
            if (activeChannelId) await loadMessages(activeChannelId, false);
          } catch (err) {
            alert(err.message || "Failed to update nickname");
          }
        });
        clearBtn.addEventListener("click", async () => {
          try {
            nickInput.value = "";
            memberNicknameDrafts.set(draftKey, "");
            await patchServerMemberNickname(activeServerId, member.user_public_id, "");
            memberNicknameDrafts.delete(draftKey);
            await loadServerMembersModal();
            if (activeChannelId) await loadMessages(activeChannelId, false);
          } catch (err) {
            alert(err.message || "Failed to clear nickname");
          }
        });
        nickRow.appendChild(nickInput);
        nickRow.appendChild(saveBtn);
        nickRow.appendChild(clearBtn);
        left.appendChild(nickRow);
      }

      const presence = document.createElement("div");
      presence.className = "member-presence";
      const dot = document.createElement("span");
      dot.className = "presence-dot";
      const isOnline = online.has(member.user_public_id);
      if (isOnline) dot.classList.add("online");
      const label = document.createElement("span");
      label.textContent = isOnline ? "Online" : "Offline";
      presence.appendChild(dot);
      presence.appendChild(label);

      const roleSelect = document.createElement("select");
      roleSelect.className = "member-role-select";
      roleOptions.forEach((role) => {
        const option = document.createElement("option");
        option.value = role.public_id;
        option.textContent = role.name;
        option.selected = role.public_id === member.role_public_id || role.name === member.role;
        roleSelect.appendChild(option);
      });
      roleSelect.addEventListener("change", async () => {
        try {
          await assignServerMemberRole(activeServerId, member.user_public_id, roleSelect.value);
          await loadServerMembersModal();
        } catch (err) {
          alert(err.message || "Failed to change member role");
        }
      });

      row.appendChild(left);
      row.appendChild(presence);
      row.appendChild(roleSelect);
      membersListEl.appendChild(row);
    });
}

function setVoiceStatus(text) {
  if (voiceStatus) voiceStatus.textContent = text;
}

function updateTextVsVoiceUI() {
  const isVoice = activeChannelType === "voice";
  if (voicePanel) voicePanel.classList.toggle("hidden", !isVoice);
  if (messagesPanel) messagesPanel.classList.toggle("hidden", isVoice);
  if (messageBar) messageBar.classList.toggle("hidden", isVoice);
  if (isVoice && typingIndicator) {
    typingIndicator.classList.add("hidden");
    typingIndicator.textContent = "";
  }
  if (isVoice) setJumpUnreadVisible(false);
  if (isVoice && voiceChannelTitle) {
    const channelName = channelNameById.get(activeChannelId) || "Voice Channel";
    voiceChannelTitle.textContent = channelName;
  }
}

function closeVoiceSocket() {
  if (!voiceSocket) return;
  voiceSocket.onclose = null;
  voiceSocket.close();
  voiceSocket = null;
  voiceSocketChannelId = null;
  voiceSelfPeerId = null;
}

function closePeerConnection(peerId) {
  const pc = peerConnections.get(peerId);
  if (pc) {
    pc.onicecandidate = null;
    pc.ontrack = null;
    pc.close();
  }
  peerConnections.delete(peerId);
  const audio = peerAudioElements.get(peerId);
  if (audio) audio.remove();
  peerAudioElements.delete(peerId);
  const node = peerAudioSources.get(peerId);
  if (node) {
    try {
      node.source.disconnect();
    } catch {
      // Ignore disconnect failures
    }
  }
  peerAudioSources.delete(peerId);
  peerVolumeLevels.delete(peerId);
}

function resetVoicePeers() {
  [...peerConnections.keys()].forEach((peerId) => closePeerConnection(peerId));
  peerAudioSources.forEach((source) => {
    try {
      source.disconnect();
    } catch {
      // Ignore disconnect failures
    }
  });
  peerAudioSources.clear();
  peerVolumeLevels.clear();
  peerMeta.clear();
  if (voiceMeterAnimation) {
    cancelAnimationFrame(voiceMeterAnimation);
    voiceMeterAnimation = null;
  }
  if (voiceUsersList) voiceUsersList.innerHTML = "";
}

function applyDeafenOutput() {
  peerAudioElements.forEach((audio) => {
    audio.muted = isDeafened;
  });
}

function applyLocalMuteState() {
  if (!localVoiceStream) return;
  const enabled = !isMuted && !isDeafened;
  localVoiceStream.getAudioTracks().forEach((track) => {
    track.enabled = enabled;
  });
}

function ensureVoiceAudioContext() {
  if (!voiceAudioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    voiceAudioContext = new Ctx();
  }
  if (voiceAudioContext.state === "suspended") {
    voiceAudioContext.resume().catch(() => {});
  }
  return voiceAudioContext;
}

function attachVoiceLevelStream(peerId, stream) {
  const ctx = ensureVoiceAudioContext();
  if (!ctx || !stream || peerAudioSources.has(peerId)) return;
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  const buffer = new Uint8Array(analyser.frequencyBinCount);
  peerAudioSources.set(peerId, { source, analyser, buffer });
  if (!voiceMeterAnimation) startVoiceMeterLoop();
}

function startVoiceMeterLoop() {
  const tick = () => {
    peerAudioSources.forEach((node, peerId) => {
      node.analyser.getByteTimeDomainData(node.buffer);
      let sum = 0;
      for (let i = 0; i < node.buffer.length; i += 1) {
        const x = (node.buffer[i] - 128) / 128;
        sum += x * x;
      }
      const rms = Math.sqrt(sum / node.buffer.length);
      peerVolumeLevels.set(peerId, Math.min(1, rms * 2.5));
    });
    document.querySelectorAll(".voice-wave-fill").forEach((el) => {
      const peerId = el.dataset.peerId;
      const level = peerVolumeLevels.get(peerId) || 0;
      el.style.transform = `scaleX(${Math.max(0.05, level)})`;
      el.style.opacity = `${0.35 + Math.min(0.65, level)}`;
    });
    if (peerAudioSources.size > 0) {
      voiceMeterAnimation = requestAnimationFrame(tick);
    } else {
      voiceMeterAnimation = null;
    }
  };
  voiceMeterAnimation = requestAnimationFrame(tick);
}

function renderVoiceUsers() {
  if (!voiceUsersList) return;
  const entries = [...peerMeta.values()].sort((a, b) => a.username.localeCompare(b.username));
  voiceUsersList.innerHTML = "";
  entries.forEach((peer) => {
    const row = document.createElement("div");
    row.className = "voice-user-row";

    const left = document.createElement("div");
    left.className = "voice-user-left";

    const avatar = document.createElement("img");
    avatar.className = "voice-user-avatar";
    avatar.alt = `${peer.username} avatar`;
    if (peer.user_public_id) {
      avatar.src = `/api/users/${peer.user_public_id}/avatar`;
      avatar.onerror = () => {
        avatar.style.visibility = "hidden";
      };
    } else {
      avatar.style.visibility = "hidden";
    }
    left.appendChild(avatar);

    const label = document.createElement("span");
    label.className = "voice-user-name";
    label.textContent = `${peer.username}${peer.peer_id === voiceSelfPeerId ? " (you)" : ""}`;
    left.appendChild(label);

    const badges = document.createElement("span");
    badges.className = "voice-user-badges";
    badges.innerHTML = `${peer.muted ? '<i class="fas fa-microphone-slash" title="Muted"></i>' : ""}${peer.deafened ? '<i class="fas fa-headphones-alt" title="Deafened"></i>' : ""}`;
    left.appendChild(badges);
    row.appendChild(left);

    const wave = document.createElement("div");
    wave.className = "voice-wave";
    const waveFill = document.createElement("span");
    waveFill.className = "voice-wave-fill";
    waveFill.dataset.peerId = peer.peer_id;
    wave.appendChild(waveFill);
    row.appendChild(wave);

    if (peer.peer_id !== voiceSelfPeerId) {
      const volume = document.createElement("input");
      volume.type = "range";
      volume.min = "0";
      volume.max = "200";
      volume.value = "100";
      volume.className = "voice-volume-slider";
      volume.addEventListener("input", () => {
        const audio = peerAudioElements.get(peer.peer_id);
        if (audio) audio.volume = Number(volume.value) / 100;
      });
      row.appendChild(volume);
    }

    voiceUsersList.appendChild(row);
  });
}

async function ensureLocalVoiceStream() {
  if (localVoiceStream) return localVoiceStream;
  localVoiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  applyLocalMuteState();
  if (voiceSelfPeerId) attachVoiceLevelStream(voiceSelfPeerId, localVoiceStream);
  return localVoiceStream;
}

function sendVoiceState() {
  if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) return;
  voiceSocket.send(
    JSON.stringify({
      type: "state",
      muted: isMuted,
      deafened: isDeafened,
    })
  );
}

function sendVoiceSignal(targetPeerId, signal) {
  if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) return;
  voiceSocket.send(
    JSON.stringify({
      type: "signal",
      target_peer_id: targetPeerId,
      signal,
    })
  );
}

async function createPeerConnection(peerId, makeOffer) {
  if (peerConnections.has(peerId)) return peerConnections.get(peerId);

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  peerConnections.set(peerId, pc);

  const stream = await ensureLocalVoiceStream();
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      sendVoiceSignal(peerId, { candidate: event.candidate });
    }
  };

  pc.ontrack = (event) => {
    let audio = peerAudioElements.get(peerId);
    if (!audio) {
      audio = document.createElement("audio");
      audio.autoplay = true;
      audio.playsInline = true;
      audio.dataset.peerId = peerId;
      audio.style.display = "none";
      document.body.appendChild(audio);
      peerAudioElements.set(peerId, audio);
    }
    audio.srcObject = event.streams[0];
    applyDeafenOutput();
    attachVoiceLevelStream(peerId, event.streams[0]);
  };

  if (makeOffer) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendVoiceSignal(peerId, { description: pc.localDescription });
  }

  return pc;
}

async function handleVoiceSignal(fromPeerId, signal) {
  const pc = await createPeerConnection(fromPeerId, false);
  if (signal.description) {
    await pc.setRemoteDescription(new RTCSessionDescription(signal.description));
    if (signal.description.type === "offer") {
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendVoiceSignal(fromPeerId, { description: pc.localDescription });
    }
  } else if (signal.candidate) {
    try {
      await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
    } catch {
      // Ignore stale ICE candidates
    }
  }
}

function addVoicePeer(peer) {
  peerMeta.set(peer.peer_id, {
    peer_id: peer.peer_id,
    user_id: peer.user_id,
    user_public_id: peer.user_public_id || null,
    username: peer.username,
    muted: !!peer.muted,
    deafened: !!peer.deafened,
  });
  renderVoiceUsers();
}

function removeVoicePeer(peerId) {
  peerMeta.delete(peerId);
  closePeerConnection(peerId);
  renderVoiceUsers();
}

async function joinVoiceChannel(channelPublicId, wsPathPrefix = "/ws/voice/") {
  if (!channelPublicId) return;
  if (voiceSocket && voiceSocketChannelId === channelPublicId && voiceSocket.readyState === WebSocket.OPEN) return;

  leaveVoiceChannel();
  await ensureLocalVoiceStream();

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${protocol}://${window.location.host}${wsPathPrefix}${channelPublicId}`;
  voiceSocket = new WebSocket(wsUrl);
  voiceSocketChannelId = channelPublicId;
  setVoiceStatus("Connecting...");

  voiceSocket.onopen = () => {
    setVoiceStatus("Connected");
    sendVoiceState();
  };

  voiceSocket.onmessage = async (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }

    if (data.type === "peers") {
      voiceSelfPeerId = data.self_peer_id;
      addVoicePeer({
        peer_id: voiceSelfPeerId,
        user_id: currentUserId,
        user_public_id: currentUser?.public_id || null,
        username: currentUser?.username || "You",
        muted: isMuted,
        deafened: isDeafened,
      });
      if (localVoiceStream) attachVoiceLevelStream(voiceSelfPeerId, localVoiceStream);
      for (const peer of data.peers || []) {
        addVoicePeer(peer);
        await createPeerConnection(peer.peer_id, true);
      }
    } else if (data.type === "peer_joined") {
      addVoicePeer(data.peer);
    } else if (data.type === "peer_left") {
      removeVoicePeer(data.peer_id);
    } else if (data.type === "peer_state") {
      const peer = peerMeta.get(data.peer_id);
      if (peer) {
        peer.muted = !!data.muted;
        peer.deafened = !!data.deafened;
        renderVoiceUsers();
      }
    } else if (data.type === "signal") {
      await handleVoiceSignal(data.from_peer_id, data.signal);
    }
  };

  voiceSocket.onclose = () => {
    setVoiceStatus("Disconnected");
    closeVoiceSocket();
    resetVoicePeers();
    if (activeMode === "dm") {
      activeChannelType = "text";
      updateTextVsVoiceUI();
    }
  };
}

function leaveVoiceChannel() {
  closeVoiceSocket();
  resetVoicePeers();
  dmCallActive = false;
  if (localVoiceStream) {
    localVoiceStream.getTracks().forEach((track) => track.stop());
    localVoiceStream = null;
  }
  setVoiceStatus("Not connected");
}

function disconnectChannelSocket(channelId) {
  const socket = channelSockets.get(channelId);
  if (socket) {
    socket.onclose = null;
    socket.close();
  }
  channelPresence.delete(channelId);
  clearTypingForChannel(channelId);
  const serverId = channelToServer.get(channelId);
  if (serverId) recomputeServerPresence(serverId);
  channelSockets.delete(channelId);
  clearRealtimeChannelState(channelId);
  const reconnectTimer = channelReconnectTimers.get(channelId);
  if (reconnectTimer) clearTimeout(reconnectTimer);
  channelReconnectTimers.delete(channelId);
}

function closeAllChannelSockets() {
  [...channelSockets.keys()].forEach((channelId) => disconnectChannelSocket(channelId));
}

function connectChannelSocket(channelId) {
  if (!channelId || channelSockets.has(channelId)) return;

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${protocol}://${window.location.host}/ws/messages/${channelId}`;
  const socket = new WebSocket(wsUrl);
  channelSockets.set(channelId, socket);
  setRealtimeState("channel", false, Date.now() + 2000, channelId);

  socket.onopen = () => {
    setRealtimeState("channel", true, 0, channelId);
  };

  socket.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data);
      const eventType = data.event || "message_created";
      if (eventType === "presence_update") {
        applyPresenceUpdate(channelId, data.online_users || []);
        return;
      }
      if (eventType === "typing_start" || eventType === "typing_stop") {
        handleTypingEvent(channelId, eventType, data);
        return;
      }
      const createdTs = new Date(data.created_at || Date.now()).getTime();
      const isNewMessage = eventType === "message_created";
      const isThreadReplyForOpenThread =
        eventType === "message_created" &&
        activeThreadParentMessageId &&
        data.parent_message_public_id === activeThreadParentMessageId;

      if (data.channel_id) {
        // channel_id in WS payload is internal int; keep explicit route channel mapping instead.
      }

      if (channelId === activeChannelId && activeChannelType !== "voice") {
        const nearBottom = messagesPanel
          ? (messagesPanel.scrollTop + messagesPanel.clientHeight >= messagesPanel.scrollHeight - 64)
          : true;
        if (isNewMessage) {
          channelLastSeen.set(channelId, createdTs);
          markChannelRead(channelId);
          recalculateUnreadServers();
        }
        await loadMessages(channelId, isNewMessage && nearBottom);
        if (isNewMessage && !nearBottom && data.user_id !== currentUserId) {
          setJumpUnreadVisible(true);
        }
        if (threadModal?.classList.contains("open")) {
          if (isThreadReplyForOpenThread || eventType !== "message_created") {
            await loadThreadMessages(eventType === "message_created");
          }
        }
      } else {
        if (isNewMessage && data.user_id !== currentUserId && shouldNotifyForMessage(channelId, data)) {
          unreadChannels.add(channelId);
          const serverId = channelToServer.get(channelId);
          if (serverId) unreadServers.add(serverId);
          applyUnreadStyles();
        }
      }
    } catch {
      // Ignore malformed WS payloads
    }
  };

  socket.onclose = () => {
    channelSockets.delete(channelId);
    channelPresence.delete(channelId);
    clearTypingForChannel(channelId);
    const serverId = channelToServer.get(channelId);
    if (serverId) recomputeServerPresence(serverId);
    const retryAt = Date.now() + 2000;
    setRealtimeState("channel", false, retryAt, channelId);
    // Reconnect after brief delay while still logged in.
    const timer = setTimeout(() => {
      connectChannelSocket(channelId);
    }, 2000);
    channelReconnectTimers.set(channelId, timer);
  };

  socket.onerror = () => {
    setRealtimeState("channel", false, Date.now() + 2000, channelId);
    socket.close();
  };
}

async function syncRealtimeSubscriptions() {
  try {
    const serversRes = await fetch("/servers/", { credentials: "include" });
    if (!serversRes.ok) return;
    const servers = await serversRes.json();
    const nextChannelIds = new Set();

    for (const server of servers) {
      const channelsRes = await fetch(`/channels/server/${server.public_id}`, { credentials: "include" });
      if (!channelsRes.ok) continue;
      const channels = await channelsRes.json();
      for (const channel of channels) {
        nextChannelIds.add(channel.public_id);
        channelToServer.set(channel.public_id, server.public_id);
        channelTypeById.set(channel.public_id, channel.type || "text");
        channelNameById.set(channel.public_id, channel.name);
        connectChannelSocket(channel.public_id);
      }
    }

    [...channelSockets.keys()].forEach((existingChannelId) => {
      if (!nextChannelIds.has(existingChannelId)) {
        disconnectChannelSocket(existingChannelId);
        unreadChannels.delete(existingChannelId);
        channelLastSeen.delete(existingChannelId);
        channelPresence.delete(existingChannelId);
        clearTypingForChannel(existingChannelId);
        channelToServer.delete(existingChannelId);
        channelTypeById.delete(existingChannelId);
        channelNameById.delete(existingChannelId);
        if (voiceSocketChannelId === existingChannelId) {
          leaveVoiceChannel();
        }
      }
    });

    recalculateUnreadServers();
  } catch {
    // Ignore sync failures
  }
}

async function patchMessageContent(messagePublicId, content) {
  const res = await fetch(`/messages/${messagePublicId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    let detail = "Failed to update message";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }

  return res.json();
}

async function deleteMessageByPublicId(messagePublicId) {
  const res = await fetch(`/messages/${messagePublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to delete message";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
}

async function toggleMessageReaction(messagePublicId, emoji) {
  const res = await fetch(`/messages/${messagePublicId}/reactions`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emoji }),
  });
  if (!res.ok) {
    let detail = "Failed to toggle reaction";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
  return res.json();
}

async function fetchThreadMessages(channelPublicId, parentMessagePublicId) {
  const res = await fetch(`/messages/${channelPublicId}/threads/${parentMessagePublicId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to load thread";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
  return res.json();
}

async function loadThreadMessages(shouldScrollToBottom = false) {
  if (!activeChannelId || !activeThreadParentMessageId || !threadMessagesContainer) return;
  const messages = await fetchThreadMessages(activeChannelId, activeThreadParentMessageId);
  threadMessagesContainer.innerHTML = "";
  messages.forEach((msg) => {
    threadMessagesContainer.appendChild(buildMessageElement(msg, { context: "thread" }));
  });
  if (shouldScrollToBottom) {
    threadMessagesContainer.scrollTop = threadMessagesContainer.scrollHeight;
  }
}

async function openThreadModalForMessage(msg) {
  if (!msg?.public_id) return;
  if (!threadModal || !threadModalTitle) return;
  activeThreadParentMessageId = msg.public_id;
  threadModalTitle.textContent = `Thread: ${msg.username}`;
  if (threadMessageInput) threadMessageInput.value = "";
  openModal(threadModal);
  await loadThreadMessages(true);
}

async function inviteMemberToServer(serverPublicId, userPublicId) {
  const res = await fetch(`/servers/${serverPublicId}/members/${userPublicId}`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to invite member";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
  return res.json();
}

async function deleteServerByPublicId(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to delete server";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
}

async function deleteChannelByPublicId(channelPublicId) {
  const res = await fetch(`/channels/${channelPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to delete channel";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {
      // Keep default detail
    }
    throw new Error(detail);
  }
}

async function fetchServerMembers(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}/members`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load server members";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

function cacheServerNicknames(serverPublicId, members) {
  const byUserId = new Map();
  (Array.isArray(members) ? members : []).forEach((member) => {
    const trimmed = (member.nickname || "").trim();
    if (trimmed) byUserId.set(Number(member.user_id), trimmed);
  });
  serverNicknamesByServer.set(serverPublicId, byUserId);
}

async function ensureServerNicknames(serverPublicId, force = false) {
  if (!serverPublicId) return;
  if (!force && serverNicknamesByServer.has(serverPublicId)) return;
  try {
    const members = await fetchServerMembers(serverPublicId);
    cacheServerNicknames(serverPublicId, members);
  } catch {
    // Ignore nickname fetch failures so core chat flow remains usable
  }
}

async function fetchServerRoles(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}/roles`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load server roles";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function assignServerMemberRole(serverPublicId, memberUserPublicId, rolePublicId) {
  const res = await fetch(`/servers/${serverPublicId}/members/${memberUserPublicId}/role`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role_public_id: rolePublicId }),
  });
  if (!res.ok) {
    let detail = "Failed to assign role";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function patchServerMemberNickname(serverPublicId, memberUserPublicId, nickname) {
  const res = await fetch(`/servers/${serverPublicId}/members/${memberUserPublicId}/nickname`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname: (nickname || "").trim() || null }),
  });
  if (!res.ok) {
    let detail = "Failed to update nickname";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function uploadMessageImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/uploads/message-image", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}

async function uploadUserAvatar(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/users/me/avatar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload avatar");
  return res.json();
}

async function uploadServerAvatar(serverPublicId, file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`/api/servers/${serverPublicId}/avatar`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload server avatar");
  return res.json();
}

function promptServerAvatarUpload(serverPublicId, onSuccess) {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    try {
      const processed = await preprocessImageFile(file);
      await uploadServerAvatar(serverPublicId, processed);
      onSuccess?.();
    } catch (err) {
      alert(err.message || "Failed to upload server avatar");
    }
  };
  picker.click();
}

function getServerNameById(serverPublicId) {
  const el = document.querySelector(`.server-item[data-server-id="${serverPublicId}"]`);
  return el?.dataset?.serverName || "Server";
}

function pickImageAsDataUrl(onDone) {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.onchange = () => {
    const file = picker.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (result) onDone(result);
    };
    reader.readAsDataURL(file);
  };
  picker.click();
}

function openInviteModal(serverPublicId, serverName) {
  inviteServerPublicId = serverPublicId;
  if (inviteServerName) inviteServerName.textContent = serverName || "Server";
  if (inviteUserPublicIdInput) inviteUserPublicIdInput.value = "";
  openModal(inviteMemberModal);
}

function openDeleteServerModal(serverPublicId, serverName) {
  deleteServerTarget = { publicId: serverPublicId, name: serverName };
  if (deleteServerNameLabel) deleteServerNameLabel.textContent = serverName || "";
  if (deleteServerConfirmInput) deleteServerConfirmInput.value = "";
  openModal(deleteServerModal);
}

function openDeleteChannelModal(channelPublicId, channelName) {
  deleteChannelTarget = { publicId: channelPublicId, name: channelName };
  if (deleteChannelNameLabel) deleteChannelNameLabel.textContent = channelName || "";
  if (deleteChannelConfirmInput) deleteChannelConfirmInput.value = "";
  openModal(deleteChannelModal);
}

function getServerNickname(serverPublicId, userId) {
  const byUserId = serverNicknamesByServer.get(serverPublicId);
  if (!byUserId) return "";
  const nickname = byUserId.get(Number(userId));
  return typeof nickname === "string" ? nickname : "";
}

function getDisplayMessageAuthor(msg) {
  if (activeMode !== "server" || !activeServerId) {
    return { name: msg.username || "Unknown", isNickname: false };
  }
  const nickname = getServerNickname(activeServerId, msg.user_id);
  if (nickname) return { name: nickname, isNickname: true };
  return { name: msg.username || "Unknown", isNickname: false };
}

function buildMessageElement(msg, options = {}) {
  const context = options.context || "channel";
  const isThreadContext = context === "thread";
  const isServerMessage = activeMode === "server";
  const wrapper = document.createElement("div");
  const author = document.createElement("span");
  const content = document.createElement("span");

  wrapper.classList.add("message");
  wrapper.dataset.messageId = msg.public_id;
  wrapper.title = `Sent: ${formatTimestamp(msg.created_at) || "Unknown time"}`;
  author.classList.add("message-author");
  content.classList.add("message-content");

  if (msg.parent_message_public_id && !isThreadContext) {
    const replyContext = document.createElement("span");
    replyContext.classList.add("message-reply-context");
    replyContext.textContent = `Reply to ${msg.parent_message_public_id.slice(0, 8)}...`;
    wrapper.appendChild(replyContext);
  }

  const displayAuthor = getDisplayMessageAuthor(msg);
  author.textContent = `${displayAuthor.name}:`;
  if (displayAuthor.isNickname && msg.username) {
    author.title = `@${msg.username}`;
  }
  const mentionState = getMentionHighlightState(msg.content || "");
  if (mentionState.everyone) wrapper.classList.add("mentioned-everyone");
  if (mentionState.user) wrapper.classList.add("mentioned-user");
  content.innerHTML = applyMentionHighlightsToRenderedHtml(renderMarkdown(msg.content || ""));
  const rollData = parseRollMessage(msg.content || "");

  wrapper.appendChild(author);
  wrapper.appendChild(document.createTextNode(" "));
  wrapper.appendChild(content);
  if (isServerMessage && rollData && rollAnimationsEnabled) {
    const rollEl = buildRollAnimationElement(rollData);
    if (rollEl) wrapper.appendChild(rollEl);
  }

  const meta = document.createElement("span");
  meta.classList.add("message-meta");

  const timeBadge = document.createElement("span");
  timeBadge.classList.add("message-time");
  timeBadge.textContent = formatTimestamp(msg.created_at) || "Unknown time";
  meta.appendChild(timeBadge);

  if (msg.edited_at) {
    const editedLabel = document.createElement("span");
    editedLabel.classList.add("message-edited");
    editedLabel.textContent = "edited";
    meta.appendChild(editedLabel);
  }

  wrapper.appendChild(meta);

  if (isServerMessage && Array.isArray(msg.reactions) && msg.reactions.length > 0) {
    const reactionsEl = document.createElement("div");
    reactionsEl.classList.add("message-reactions");
    msg.reactions.forEach((reaction) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.classList.add("message-reaction-chip");
      if (reaction.reacted_by_me) chip.classList.add("reacted");
      chip.textContent = `${reaction.emoji} ${reaction.count}`;
      chip.addEventListener("click", async () => {
        try {
          await toggleMessageReaction(msg.public_id, reaction.emoji);
          if (isThreadContext) {
            await loadThreadMessages(false);
          } else if (activeChannelId) {
            await loadMessages(activeChannelId, false);
          }
        } catch (err) {
          alert(err.message || "Failed to toggle reaction");
        }
      });
      reactionsEl.appendChild(chip);
    });
    wrapper.appendChild(reactionsEl);
  }

  if (isServerMessage && msg.thread_reply_count > 0 && !isThreadContext) {
    const threadSummary = document.createElement("div");
    threadSummary.classList.add("message-thread-summary");
    threadSummary.textContent = `${msg.thread_reply_count} repl${msg.thread_reply_count === 1 ? "y" : "ies"}`;
    wrapper.appendChild(threadSummary);
  }

  if (isServerMessage || msg.user_id === currentUserId) {
    const actions = document.createElement("div");
    actions.classList.add("message-actions");
    if (isServerMessage) {
      const replyBtn = document.createElement("button");
      replyBtn.classList.add("message-action-btn");
      replyBtn.type = "button";
      replyBtn.textContent = "Reply";
      replyBtn.addEventListener("click", () => {
        setPendingReply({ ...msg, username: displayAuthor.name });
        messageInput?.focus();
      });
      actions.appendChild(replyBtn);

      if (!isThreadContext) {
        const threadBtn = document.createElement("button");
        threadBtn.classList.add("message-action-btn");
        threadBtn.type = "button";
        threadBtn.textContent = "Thread";
        threadBtn.addEventListener("click", () => {
          openThreadModalForMessage(msg).catch((err) => alert(err.message || "Failed to open thread"));
        });
        actions.appendChild(threadBtn);
      }

      const reactBtn = document.createElement("button");
      reactBtn.classList.add("message-action-btn", "message-react-trigger");
      reactBtn.type = "button";
      reactBtn.textContent = "React";
      reactBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const existing = reactBtn.querySelector(".message-emoji-picker");
        if (existing) {
          closeActiveReactionPicker();
          return;
        }
        openReactionPicker(reactBtn, async (emoji) => {
          try {
            await toggleMessageReaction(msg.public_id, emoji.trim());
            if (isThreadContext) {
              await loadThreadMessages(false);
            } else if (activeChannelId) {
              await loadMessages(activeChannelId, false);
            }
          } catch (err) {
            alert(err.message || "Failed to react");
          }
        });
      });
      actions.appendChild(reactBtn);

      const copyIdBtn = document.createElement("button");
      copyIdBtn.classList.add("message-action-btn");
      copyIdBtn.type = "button";
      copyIdBtn.textContent = "Copy ID";
      copyIdBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(msg.public_id || "");
          showToast("Message ID copied");
        } catch {}
      });
      actions.appendChild(copyIdBtn);

      const copyRawBtn = document.createElement("button");
      copyRawBtn.classList.add("message-action-btn");
      copyRawBtn.type = "button";
      copyRawBtn.textContent = "Copy Raw";
      copyRawBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(msg.content || "");
          showToast("Raw message copied");
        } catch {}
      });
      actions.appendChild(copyRawBtn);

      const copyLinkBtn = document.createElement("button");
      copyLinkBtn.classList.add("message-action-btn");
      copyLinkBtn.type = "button";
      copyLinkBtn.textContent = "Copy Link";
      copyLinkBtn.addEventListener("click", async () => {
        const href = `${window.location.origin}${window.location.pathname}#channel=${encodeURIComponent(activeChannelId || "")}&message=${encodeURIComponent(msg.public_id || "")}`;
        try {
          await navigator.clipboard.writeText(href);
          showToast("Message link copied");
        } catch {}
      });
      actions.appendChild(copyLinkBtn);
    }

    if (msg.user_id === currentUserId && !isThreadContext && isServerMessage) {
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");
      editBtn.classList.add("message-action-btn");
      deleteBtn.classList.add("message-action-btn", "danger");
      editBtn.type = "button";
      deleteBtn.type = "button";
      editBtn.textContent = "Edit";
      deleteBtn.textContent = "Delete";
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      editBtn.addEventListener("click", () => {
        if (wrapper.classList.contains("editing")) return;
        wrapper.classList.add("editing");

        const editor = document.createElement("div");
        const input = document.createElement("textarea");
        const controls = document.createElement("div");
        const saveBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");

        editor.classList.add("message-editor");
        input.classList.add("message-edit-input");
        controls.classList.add("message-edit-controls");
        saveBtn.classList.add("message-edit-save");
        cancelBtn.classList.add("message-edit-cancel");

        input.value = msg.content || "";
        saveBtn.type = "button";
        cancelBtn.type = "button";
        saveBtn.textContent = "Save";
        cancelBtn.textContent = "Cancel";

        controls.appendChild(saveBtn);
        controls.appendChild(cancelBtn);
        editor.appendChild(input);
        editor.appendChild(controls);
        wrapper.appendChild(editor);
        input.focus();

        cancelBtn.addEventListener("click", () => {
          wrapper.classList.remove("editing");
          editor.remove();
        });

        saveBtn.addEventListener("click", async () => {
          const nextContent = input.value.trim();
          if (!nextContent) return;
          saveBtn.disabled = true;
          try {
            await patchMessageContent(msg.public_id, nextContent);
            if (activeChannelId) await loadMessages(activeChannelId, false);
          } catch (err) {
            alert(err.message || "Failed to update message");
            saveBtn.disabled = false;
          }
        });
      });

      deleteBtn.addEventListener("click", async () => {
        const ok = window.confirm("Delete this message?");
        if (!ok) return;
        try {
          await deleteMessageByPublicId(msg.public_id);
          if (activeChannelId) await loadMessages(activeChannelId, false);
        } catch (err) {
          alert(err.message || "Failed to delete message");
        }
      });
    }

    if (actions.children.length > 0) wrapper.appendChild(actions);
  }

  return wrapper;
}

function getStoredOrder(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrder(storageKey, ids) {
  localStorage.setItem(storageKey, JSON.stringify(ids));
}

function getStoredObject(storageKey, fallback = {}) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = JSON.parse(raw || "null");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
    return fallback;
  } catch {
    return fallback;
  }
}

function saveObject(storageKey, value) {
  localStorage.setItem(storageKey, JSON.stringify(value));
}

function sortByStoredOrder(items, storageKey, getId) {
  const order = getStoredOrder(storageKey);
  const indexMap = new Map(order.map((id, idx) => [id, idx]));
  return [...items].sort((a, b) => {
    const aIdx = indexMap.has(getId(a)) ? indexMap.get(getId(a)) : Number.MAX_SAFE_INTEGER;
    const bIdx = indexMap.has(getId(b)) ? indexMap.get(getId(b)) : Number.MAX_SAFE_INTEGER;
    return aIdx - bIdx;
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li[draggable='true']:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function initSortableList(container, persistOrderFn) {
  if (!container || container.dataset.sortableReady === "true") return;
  container.dataset.sortableReady = "true";

  container.addEventListener("dragstart", (event) => {
    const item = event.target.closest("li[draggable='true']");
    if (!item) return;
    item.classList.add("dragging");
  });

  container.addEventListener("dragend", (event) => {
    const item = event.target.closest("li[draggable='true']");
    if (!item) return;
    item.classList.remove("dragging");
    persistOrderFn();
  });

  container.addEventListener("dragover", (event) => {
    event.preventDefault();
    const dragging = container.querySelector(".dragging");
    if (!dragging) return;
    const afterElement = getDragAfterElement(container, event.clientY);
    if (!afterElement) {
      container.appendChild(dragging);
    } else {
      container.insertBefore(dragging, afterElement);
    }
  });
}

function persistServerOrder() {
  const ids = [...serversPanel.querySelectorAll(".server-item")].map((el) => el.dataset.serverId);
  saveOrder(SERVER_ORDER_STORAGE_KEY, ids);
}

function getChannelOrderStorageKey(serverId) {
  return `${CHANNEL_ORDER_STORAGE_PREFIX}${serverId}`;
}

function getChannelLayoutStorageKey(serverId) {
  return `${CHANNEL_LAYOUT_STORAGE_PREFIX}${serverId}`;
}

function getChannelSeparatorsStorageKey(serverId) {
  return `${CHANNEL_SEPARATORS_STORAGE_PREFIX}${serverId}`;
}

function getChannelIconsStorageKey(serverId) {
  return `${CHANNEL_ICON_STORAGE_PREFIX}${serverId}`;
}

function persistChannelOrder() {
  if (!activeServerId) return;
  const layoutTokens = [...channelsPanel.querySelectorAll("li[data-layout-token]")].map((el) => el.dataset.layoutToken);
  saveOrder(getChannelLayoutStorageKey(activeServerId), layoutTokens);
  const channelIds = [...channelsPanel.querySelectorAll(".channel-item")].map((el) => el.dataset.channelId);
  saveOrder(getChannelOrderStorageKey(activeServerId), channelIds);
}

async function loadDmConversations() {
  const res = await fetch("/dms/", { credentials: "include" });
  if (!res.ok) {
    channelsPanel.innerHTML = '<li class="message-placeholder">Could not load DMs right now.</li>';
    throw new Error(`Failed to load DMs: ${res.status}`);
  }
  dmConversations = await res.json();
  channelsPanel.innerHTML = "";
  dmConversations.forEach((dm) => {
    const li = document.createElement("li");
    li.classList.add("channel-item", "dm-item");
    li.dataset.dmConversationId = dm.public_id;
    li.dataset.dmOtherUserPublicId = dm.other_user_public_id;
    li.dataset.layoutToken = `dm:${dm.public_id}`;
    const nameEl = document.createElement("span");
    nameEl.classList.add("channel-name");
    const presenceDot = document.createElement("span");
    presenceDot.className = "dm-presence-dot";
    const nameText = document.createElement("span");
    nameText.textContent = `@ ${dm.other_username}`;
    nameEl.appendChild(presenceDot);
    nameEl.appendChild(nameText);
    li.appendChild(nameEl);
    li.addEventListener("click", async () => {
      stopTypingNow();
      activeMode = "dm";
      activeDmConversationId = dm.public_id;
      activeServerId = null;
      activeChannelId = null;
      renderTypingIndicator();
      setPendingReply(null);
      activeThreadParentMessageId = null;
      closeModal(threadModal);
      activeChannelType = "text";
      updateSidebarModeUI();
      highlightActiveChannel();
      updateTopbar(`@ ${dm.other_username}`, true);
      await loadDmMessages(dm.public_id, true);
      openDmMessageSocket(dm.public_id);
      applyDraftToComposer();
      persistActiveChatState();
    });
    channelsPanel.appendChild(li);
  });
  highlightActiveChannel();
  applyDmPresenceIndicators();
}

async function createOrOpenDmConversation(otherUserPublicId) {
  const res = await fetch(`/dms/${otherUserPublicId}`, { method: "POST", credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to create DM";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchFriends() {
  const res = await fetch("/users/friends", { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load friends: ${res.status}`);
  return res.json();
}

async function fetchFriendRequests() {
  const res = await fetch("/users/friend-requests", { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load friend requests: ${res.status}`);
  return res.json();
}

async function sendFriendRequest(targetPublicId) {
  const res = await fetch(`/users/friend-requests/${targetPublicId}`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to send friend request";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function acceptFriendRequest(requestPublicId) {
  const res = await fetch(`/users/friend-requests/${requestPublicId}/accept`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to accept friend request");
}

async function removeFriendRequest(requestPublicId) {
  const res = await fetch(`/users/friend-requests/${requestPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove friend request");
}

async function removeFriend(friendPublicId) {
  const res = await fetch(`/users/friends/${friendPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove friend");
}

function renderFriendRows(container, rows, buildActions) {
  if (!container) return;
  container.innerHTML = "";
  if (!rows || rows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message-placeholder";
    empty.style.fontSize = "13px";
    empty.style.padding = "12px 8px";
    empty.textContent = "None";
    container.appendChild(empty);
    return;
  }
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "friend-row";
    const name = document.createElement("span");
    name.className = "friend-row-name";
    name.textContent = row.username || row.requester_username || row.addressee_username;
    const actions = document.createElement("div");
    actions.className = "friend-row-actions";
    buildActions(row).forEach((btn) => actions.appendChild(btn));
    item.appendChild(name);
    item.appendChild(actions);
    container.appendChild(item);
  });
}

function renderDmFriendPicker(filter = "") {
  if (!dmFriendPickerList) return;
  dmFriendPickerList.innerHTML = "";
  const normalized = filter.trim().toLowerCase();
  const rows = friendsCache.filter((friend) => {
    if (!normalized) return true;
    return (
      friend.username.toLowerCase().includes(normalized) ||
      friend.public_id.toLowerCase().includes(normalized)
    );
  });
  if (!rows.length) {
    const empty = document.createElement("div");
    empty.className = "message-placeholder";
    empty.style.fontSize = "13px";
    empty.style.padding = "12px 8px";
    empty.textContent = "No friends found.";
    dmFriendPickerList.appendChild(empty);
    return;
  }

  rows.forEach((friend) => {
    const item = document.createElement("div");
    item.className = "friend-row";

    const name = document.createElement("span");
    name.className = "friend-row-name";
    name.textContent = `${friend.username} (${friend.public_id})`;

    const actions = document.createElement("div");
    actions.className = "friend-row-actions";
    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.textContent = "Select";
    selectBtn.addEventListener("click", async () => {
      try {
        const convo = await createOrOpenDmConversation(friend.public_id);
        closeModal(createDmModal);
        activeMode = "dm";
        updateSidebarModeUI();
        await loadDmConversations();
        activeDmConversationId = convo.public_id;
        highlightActiveChannel();
        updateTopbar(`@ ${convo.other_username}`, true);
        await loadDmMessages(convo.public_id, true);
        openDmMessageSocket(convo.public_id);
        applyDraftToComposer();
        persistActiveChatState();
      } catch (err) {
        alert(err.message || "Failed to open DM");
      }
    });
    actions.appendChild(selectBtn);

    item.appendChild(name);
    item.appendChild(actions);
    dmFriendPickerList.appendChild(item);
  });
}

async function refreshFriendsModal() {
  const [friends, requests] = await Promise.all([fetchFriends(), fetchFriendRequests()]);
  friendsCache = Array.isArray(friends) ? friends : [];

  renderFriendRows(friendsListEl, friendsCache, (friend) => {
    const messageBtn = document.createElement("button");
    messageBtn.type = "button";
    messageBtn.textContent = "Message";
    messageBtn.addEventListener("click", async () => {
      try {
        const convo = await createOrOpenDmConversation(friend.public_id);
        closeModal(friendsModal);
        activeMode = "dm";
        updateSidebarModeUI();
        await loadDmConversations();
        activeDmConversationId = convo.public_id;
        highlightActiveChannel();
        updateTopbar(`@ ${convo.other_username}`, true);
        await loadDmMessages(convo.public_id, true);
        openDmMessageSocket(convo.public_id);
        applyDraftToComposer();
        persistActiveChatState();
      } catch (err) {
        alert(err.message || "Failed to open DM");
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("danger");
    removeBtn.addEventListener("click", async () => {
      const ok = window.confirm(`Remove ${friend.username} from friends?`);
      if (!ok) return;
      try {
        await removeFriend(friend.public_id);
        await refreshFriendsModal();
      } catch (err) {
        alert(err.message || "Failed to remove friend");
      }
    });
    return [messageBtn, removeBtn];
  });

  renderFriendRows(friendRequestsIncomingEl, requests?.incoming || [], (req) => {
    const acceptBtn = document.createElement("button");
    acceptBtn.type = "button";
    acceptBtn.textContent = "Accept";
    acceptBtn.addEventListener("click", async () => {
      try {
        await acceptFriendRequest(req.public_id);
        await refreshFriendsModal();
      } catch (err) {
        alert(err.message || "Failed to accept request");
      }
    });
    const declineBtn = document.createElement("button");
    declineBtn.type = "button";
    declineBtn.textContent = "Decline";
    declineBtn.classList.add("danger");
    declineBtn.addEventListener("click", async () => {
      try {
        await removeFriendRequest(req.public_id);
        await refreshFriendsModal();
      } catch (err) {
        alert(err.message || "Failed to decline request");
      }
    });
    return [acceptBtn, declineBtn];
  });

  renderFriendRows(friendRequestsOutgoingEl, requests?.outgoing || [], (req) => {
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("danger");
    cancelBtn.addEventListener("click", async () => {
      try {
        await removeFriendRequest(req.public_id);
        await refreshFriendsModal();
      } catch (err) {
        alert(err.message || "Failed to cancel request");
      }
    });
    return [cancelBtn];
  });
}

async function fetchAdminOverview() {
  const res = await fetch("/admin/overview", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load admin overview");
  return res.json();
}

async function fetchAdminUsers() {
  const res = await fetch("/admin/users", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load admin users");
  return res.json();
}

async function fetchAdminAudit() {
  const res = await fetch("/admin/audit?limit=120", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load admin audit");
  return res.json();
}

async function patchAdminUserFlags(userPublicId, payload) {
  const res = await fetch(`/admin/users/${userPublicId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update user flags");
}

async function adminForcePasswordReset(userPublicId, newPassword) {
  const res = await fetch(`/admin/users/${userPublicId}/reset-password`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_password: newPassword }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to force password reset");
  }
}

async function adminDeleteUser(userPublicId) {
  const res = await fetch(`/admin/users/${userPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to delete user");
  }
}

function renderAdminOverview(data) {
  if (!adminOverviewEl) return;
  const cards = [
    ["Users", data.users],
    ["Servers", data.servers],
    ["Channels", data.channels],
    ["Messages", data.messages],
    ["Memberships", data.memberships],
    ["Roles", data.roles],
    ["Pending Friend Requests", data.pending_friend_requests],
    ["Msgs 24h", data.messages_24h ?? 0],
    ["DMs 24h", data.dm_messages_24h ?? 0],
    ["Active 24h", data.active_users_24h ?? 0],
    ["Voice joins 24h", data.voice_joins_24h ?? 0],
  ];
  adminOverviewEl.innerHTML = "";
  cards.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "admin-stat-card";
    const labelEl = document.createElement("div");
    labelEl.className = "admin-stat-label";
    labelEl.textContent = label;
    const valueEl = document.createElement("div");
    valueEl.className = "admin-stat-value";
    valueEl.textContent = String(value);
    card.appendChild(labelEl);
    card.appendChild(valueEl);
    adminOverviewEl.appendChild(card);
  });
}

function renderAdminAudit(events) {
  if (!adminAuditListEl) return;
  adminAuditListEl.innerHTML = "";
  const list = Array.isArray(events) ? [...events].reverse() : [];
  if (!list.length) {
    adminAuditListEl.innerHTML = '<div class="message-placeholder">No audit events yet.</div>';
    return;
  }
  list.forEach((evt) => {
    const row = document.createElement("div");
    row.className = "admin-user-row";
    const meta = document.createElement("div");
    meta.className = "admin-user-meta";
    const name = document.createElement("div");
    name.className = "admin-user-name";
    name.textContent = `${evt.event_type || "event"} · ${formatTimestamp(evt.ts) || evt.ts || "-"}`;
    const detail = document.createElement("div");
    detail.className = "admin-user-email";
    const actor = evt.actor_public_id ? `actor: ${evt.actor_public_id}` : "actor: system";
    const target = evt.target?.user_public_id || evt.target?.server_public_id || evt.target?.channel_public_id || "-";
    detail.textContent = `${actor} · target: ${target}`;
    meta.appendChild(name);
    meta.appendChild(detail);
    row.appendChild(meta);
    adminAuditListEl.appendChild(row);
  });
}

function renderAdminUsers(users) {
  if (!adminUsersListEl) return;
  adminUsersListEl.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("div");
    row.className = "admin-user-row";

    const meta = document.createElement("div");
    meta.className = "admin-user-meta";
    const name = document.createElement("div");
    name.className = "admin-user-name";
    name.textContent = `${user.username} (${user.public_id})`;
    const email = document.createElement("div");
    email.className = "admin-user-email";
    email.textContent = user.email;
    meta.appendChild(name);
    meta.appendChild(email);

    const flags = document.createElement("div");
    flags.className = "admin-user-flags";
    flags.innerHTML = `
      <span>superadmin: ${user.is_superadmin ? "yes" : "no"}</span>
      <span>must reset password: ${user.must_reset_password ? "yes" : "no"}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "admin-user-actions";

    const superBtn = document.createElement("button");
    superBtn.type = "button";
    superBtn.textContent = user.is_superadmin ? "Demote SA" : "Promote SA";
    superBtn.addEventListener("click", async () => {
      try {
        await patchAdminUserFlags(user.public_id, { is_superadmin: !user.is_superadmin });
        await loadAdminPanel();
      } catch (err) {
        alert(err.message || "Update failed");
      }
    });

    const resetFlagBtn = document.createElement("button");
    resetFlagBtn.type = "button";
    resetFlagBtn.textContent = user.must_reset_password ? "Clear Reset" : "Force Reset";
    resetFlagBtn.addEventListener("click", async () => {
      try {
        await patchAdminUserFlags(user.public_id, { must_reset_password: !user.must_reset_password });
        await loadAdminPanel();
      } catch (err) {
        alert(err.message || "Update failed");
      }
    });

    const forcePwBtn = document.createElement("button");
    forcePwBtn.type = "button";
    forcePwBtn.textContent = "Set Temp Password";
    forcePwBtn.addEventListener("click", async () => {
      const nextPassword = window.prompt(`Set temporary password for ${user.username}:`);
      if (!nextPassword || !nextPassword.trim()) return;
      try {
        await adminForcePasswordReset(user.public_id, nextPassword.trim());
        alert("Password set and marked for first-use reset.");
        await loadAdminPanel();
      } catch (err) {
        alert(err.message || "Failed to set password");
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete User";
    deleteBtn.classList.add("danger");
    deleteBtn.addEventListener("click", async () => {
      const confirmText = window.prompt(`Type DELETE ${user.username} to confirm account deletion:`);
      if (confirmText !== `DELETE ${user.username}`) return;
      try {
        await adminDeleteUser(user.public_id);
        await loadAdminPanel();
      } catch (err) {
        alert(err.message || "Failed to delete user");
      }
    });

    actions.appendChild(superBtn);
    actions.appendChild(resetFlagBtn);
    actions.appendChild(forcePwBtn);
    actions.appendChild(deleteBtn);
    row.appendChild(meta);
    row.appendChild(flags);
    row.appendChild(actions);
    adminUsersListEl.appendChild(row);
  });
}

async function loadAdminPanel() {
  const [overview, users, audit] = await Promise.all([fetchAdminOverview(), fetchAdminUsers(), fetchAdminAudit()]);
  renderAdminOverview(overview);
  renderAdminUsers(users);
  renderAdminAudit(audit);
}

async function loadDmMessages(conversationPublicId, shouldScrollToBottom = false) {
  const res = await fetch(`/dms/${conversationPublicId}/messages`, { credentials: "include" });
  if (!res.ok) {
    messagesPanel.innerHTML = '<div class="message-placeholder">Could not load messages. Try again.</div>';
    throw new Error(`Failed to load DM messages: ${res.status}`);
  }
  const messages = await res.json();
  renderMessagesIncrementally(messages, (msg) => buildMessageElement(msg, { context: "dm" }), shouldScrollToBottom);
  if (messageSearchCount) messageSearchCount.textContent = "0";
  if (messageSearchInput) messageSearchInput.value = "";
  renderTypingIndicator();
  if (shouldScrollToBottom) setJumpUnreadVisible(false);
  else updateJumpUnreadState();
  setSendStatus(messages.some((m) => m.user_id === currentUserId) ? "Seen in active chat" : "", "ok");
}

async function restoreLastActiveChat() {
  const state = loadLastActiveChatState();
  if (!state || state.userPublicId !== currentUser?.public_id) return false;

  if (state.mode === "dm") {
    stopTypingNow();
    activeMode = "dm";
    activeServerId = null;
    activeChannelId = null;
    activeDmConversationId = state.dmConversationId || null;
    activeChannelType = "text";
    leaveVoiceChannel();
    updateTextVsVoiceUI();
    updateSidebarModeUI();
    updateTopbar("", false);
    await loadDmConversations();
    if (state.dmConversationId) {
      const dmEl = channelsPanel.querySelector(`.dm-item[data-dm-conversation-id="${state.dmConversationId}"]`);
      if (dmEl) {
        dmEl.click();
        return true;
      }
    }
    return true;
  }

  if (state.mode === "server" && state.serverId) {
    stopTypingNow();
    activeMode = "server";
    activeServerId = state.serverId;
    activeChannelId = null;
    activeDmConversationId = null;
    activeChannelType = "text";
    closeDmMessageSocket();
    leaveVoiceChannel();
    updateSidebarModeUI();
    updateTopbar("", false);
    updateTextVsVoiceUI();
    highlightActiveServer();
    channelsPanel.innerHTML = "";
    messagesPanel.innerHTML = '<div class="message-placeholder">Select a channel to start chatting</div>';
    await loadChannels(state.serverId, { preferredChannelId: state.channelId || null });
    applyDraftToComposer();
    return true;
  }

  return false;
}

// --------------------
// Load Dashboard & User
// --------------------
async function loadDashboard() {
  try {
    const res = await fetch("/api/dashboard", { credentials: "include" });
    if (!res.ok) throw new Error("Dashboard fetch failed");

    const data = await res.json();
    currentUser = data.user || null;
    currentUserId = data.user?.id ?? null;
    if (adminBtn) adminBtn.classList.toggle("hidden", !data.user?.is_superadmin);
    if (userDisplay) {
      userDisplay.textContent = `Logged in as: ${data.user.username}`;
    }

    if (data.user?.must_reset_password) {
      alert("This account must reset password before use. Please log out and complete first-use reset from login.");
    }

    connectPresenceSocket();
    updateSidebarModeUI();
    await loadServers();
    await restoreLastActiveChat();
  } catch (err) {
    console.error("Network or other error loading dashboard:", err);
  }
}

// --------------------
// Load Servers
// --------------------
async function loadServers() {
  try {
    const res = await fetch("/servers/", { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to load servers: ${res.status}`);
    const servers = sortByStoredOrder(await res.json(), SERVER_ORDER_STORAGE_KEY, (server) => server.public_id);

    serversPanel.innerHTML = "";
    servers.forEach((server) => {
      const li = document.createElement("li");
      li.dataset.serverId = server.public_id;
      li.dataset.serverName = server.name;
      li.title = server.name;
      li.classList.add("server-item");

      const initials = server.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() || "")
        .join("");
      const initialsEl = document.createElement("span");
      initialsEl.classList.add("server-initials");
      initialsEl.textContent = initials || "#";
      const avatarEl = document.createElement("img");
      avatarEl.classList.add("server-avatar");
      avatarEl.alt = `${server.name} avatar`;
      avatarEl.src = `/api/servers/${server.public_id}/avatar`;
      avatarEl.onerror = () => {
        avatarEl.style.display = "none";
      };
      li.appendChild(avatarEl);
      li.appendChild(initialsEl);
      li.draggable = true;

      li.addEventListener("click", () => {
        activeMode = "server";
        activeServerId = server.public_id;
        activeChannelId = null;
        activeDmConversationId = null;
        activeChannelType = "text";
        closeDmMessageSocket();
        leaveVoiceChannel();
        updateSidebarModeUI();
        updateTopbar("", false);
        updateTextVsVoiceUI();
        highlightActiveServer();
        channelsPanel.innerHTML = "";
        messagesPanel.innerHTML = '<div class="message-placeholder">Select a channel to start chatting</div>';
        loadChannels(server.public_id);
        applyDraftToComposer();
        persistActiveChatState();
      });

      li.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showContextMenu(event.clientX, event.clientY, [
          {
            label: "Invite Member",
            onClick: () => openInviteModal(server.public_id, server.name),
          },
          {
            label: "Upload Server Picture",
            onClick: () =>
              promptServerAvatarUpload(server.public_id, () => {
                avatarEl.style.display = "block";
                avatarEl.src = `/api/servers/${server.public_id}/avatar?ts=${Date.now()}`;
              }),
          },
          {
            label: "Delete Server",
            danger: true,
            onClick: () => openDeleteServerModal(server.public_id, server.name),
          },
        ]);
      });
      serversPanel.appendChild(li);
    });
    applyUnreadStyles();
    await syncRealtimeSubscriptions();
  } catch (err) {
    console.error("Error loading servers:", err);
    serversPanel.innerHTML = '<li class="message-placeholder">Could not load servers.</li>';
  }
}

function highlightActiveServer() {
  document.querySelectorAll(".server-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.serverId === activeServerId);
  });
}

// --------------------
// Load Channels
// --------------------
async function loadChannels(serverPublicId, options = {}) {
  try {
    await ensureServerNicknames(serverPublicId, true);
    const res = await fetch(`/channels/server/${serverPublicId}`, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to load channels: ${res.status}`);
    const channels = sortByStoredOrder(
      await res.json(),
      getChannelOrderStorageKey(serverPublicId),
      (channel) => channel.public_id
    );
    const channelIcons = getStoredObject(getChannelIconsStorageKey(serverPublicId), {});
    const channelsById = new Map(channels.map((ch) => [ch.public_id, ch]));
    const separators = getStoredObject(getChannelSeparatorsStorageKey(serverPublicId), {});
    const layoutKey = getChannelLayoutStorageKey(serverPublicId);
    let layout = getStoredOrder(layoutKey);
    if (layout.length === 0) {
      layout = channels.map((channel) => `ch:${channel.public_id}`);
    }
    layout = layout.filter((token) => {
      if (token.startsWith("ch:")) return channelsById.has(token.slice(3));
      if (token.startsWith("sep:")) return Boolean(separators[token.slice(4)]);
      return false;
    });
    channels.forEach((channel) => {
      const token = `ch:${channel.public_id}`;
      if (!layout.includes(token)) layout.push(token);
    });
    saveOrder(layoutKey, layout);

    channelsPanel.innerHTML = "";
    layout.forEach((token) => {
      if (token.startsWith("sep:")) {
        const separatorId = token.slice(4);
        const label = separators[separatorId];
        if (!label) return;
        const sepLi = document.createElement("li");
        sepLi.classList.add("channel-separator-item");
        sepLi.dataset.layoutToken = token;
        sepLi.draggable = true;
        const sepLabel = document.createElement("span");
        sepLabel.classList.add("channel-separator-label");
        sepLabel.innerHTML = renderSeparatorContent(label);
        const sepDelete = document.createElement("button");
        sepDelete.type = "button";
        sepDelete.classList.add("channel-separator-delete");
        sepDelete.innerHTML = '<i class="fas fa-times"></i>';
        sepDelete.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const next = getStoredObject(getChannelSeparatorsStorageKey(serverPublicId), {});
          delete next[separatorId];
          saveObject(getChannelSeparatorsStorageKey(serverPublicId), next);
          const nextLayout = getStoredOrder(layoutKey).filter((t) => t !== token);
          saveOrder(layoutKey, nextLayout);
          loadChannels(serverPublicId);
        });
        sepLi.appendChild(sepLabel);
        sepLi.appendChild(sepDelete);
        channelsPanel.appendChild(sepLi);
        return;
      }
      const channel = channelsById.get(token.slice(3));
      if (!channel) return;
      const li = document.createElement("li");
      const nameEl = document.createElement("span");
      nameEl.classList.add("channel-name");
      const channelPrefix = document.createElement("span");
      channelPrefix.classList.add("channel-prefix");
      const customIcon = channelIcons[channel.public_id];
      if (customIcon) {
        const iconImg = document.createElement("img");
        iconImg.classList.add("channel-custom-icon");
        iconImg.alt = `${channel.name} icon`;
        iconImg.src = customIcon;
        channelPrefix.appendChild(iconImg);
      } else {
        channelPrefix.textContent = channel.type === "voice" ? "[V]" : "#";
      }
      const channelText = document.createElement("span");
      channelText.textContent = channel.name;
      nameEl.appendChild(channelPrefix);
      nameEl.appendChild(channelText);
      li.dataset.channelId = channel.public_id;
      li.dataset.serverId = serverPublicId;
      li.dataset.channelName = channel.name;
      li.dataset.channelType = channel.type;
      li.dataset.layoutToken = token;
      li.classList.add("channel-item");
      li.appendChild(nameEl);

      channelToServer.set(channel.public_id, serverPublicId);
      channelTypeById.set(channel.public_id, channel.type || "text");
      channelNameById.set(channel.public_id, channel.name);
      li.draggable = true;
      li.addEventListener("click", async () => {
        stopTypingNow();
        activeMode = "server";
        activeChannelId = channel.public_id;
        renderTypingIndicator();
        setPendingReply(null);
        activeThreadParentMessageId = null;
        closeModal(threadModal);
        activeChannelType = channel.type || "text";
        markChannelRead(channel.public_id);
        highlightActiveChannel();
        recalculateUnreadServers();
        updateTextVsVoiceUI();
        if (activeChannelType === "voice") {
          updateTopbar(`[V] ${channel.name}`, false);
          joinVoiceChannel(channel.public_id).catch((err) => {
            console.error("Failed to join voice:", err);
            setVoiceStatus("Mic permission or voice connection failed");
          });
        } else {
          updateTopbar(`# ${channel.name}`, false);
          leaveVoiceChannel();
          await ensureServerNicknames(serverPublicId);
          loadMessages(channel.public_id, true);
          applyDraftToComposer();
        }
        persistActiveChatState();
      });
      li.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentNotif = getChannelNotificationMode(channel.public_id);
        showContextMenu(event.clientX, event.clientY, [
          {
            label: "Invite Member",
            onClick: () => openInviteModal(serverPublicId, getServerNameById(serverPublicId)),
          },
          {
            label: "Set Channel Picture",
            onClick: () =>
              pickImageAsDataUrl((dataUrl) => {
                const icons = getStoredObject(getChannelIconsStorageKey(serverPublicId), {});
                icons[channel.public_id] = dataUrl;
                saveObject(getChannelIconsStorageKey(serverPublicId), icons);
                loadChannels(serverPublicId);
              }),
          },
          {
            label: `Notifications: All${currentNotif === "all" ? " ✓" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "all"),
          },
          {
            label: `Notifications: Mentions${currentNotif === "mentions" ? " ✓" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "mentions"),
          },
          {
            label: `Notifications: Muted${currentNotif === "muted" ? " ✓" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "muted"),
          },
          {
            label: "Delete Channel",
            danger: true,
            onClick: () => openDeleteChannelModal(channel.public_id, channel.name),
          },
        ]);
      });
      channelsPanel.appendChild(li);
    });
    applyUnreadStyles();
    await syncRealtimeSubscriptions();
    if (options.preferredChannelId) {
      const preferredEl = channelsPanel.querySelector(`.channel-item[data-channel-id="${options.preferredChannelId}"]`);
      if (preferredEl) preferredEl.click();
    }
  } catch (err) {
    console.error("Error loading channels:", err);
    channelsPanel.innerHTML = '<li class="message-placeholder">Could not load channels.</li>';
  }
}

function highlightActiveChannel() {
  document.querySelectorAll(".channel-item").forEach((el) => {
    if (activeMode === "dm") {
      el.classList.toggle("active", el.dataset.dmConversationId === activeDmConversationId);
    } else {
      el.classList.toggle("active", el.dataset.channelId === activeChannelId);
    }
  });
}

// --------------------
// Load Messages
// --------------------
async function loadMessages(channelPublicId, shouldScrollToBottom = false) {
  try {
    if (activeServerId) await ensureServerNicknames(activeServerId);
    const res = await fetch(`/messages/${channelPublicId}`, { credentials: "include" });
    if (!res.ok) {
      messagesPanel.innerHTML = '<div class="message-placeholder">Could not load messages. Try again.</div>';
      throw new Error(`Failed to load messages: ${res.status}`);
    }
    const messages = await res.json();

    renderMessagesIncrementally(messages, (msg) => buildMessageElement(msg), shouldScrollToBottom);
    if (messageSearchCount) messageSearchCount.textContent = "0";
    if (messageSearchInput) messageSearchInput.value = "";

    const latest = messages[messages.length - 1];
    if (latest?.created_at) {
      channelLastSeen.set(channelPublicId, new Date(latest.created_at).getTime());
    } else {
      channelLastSeen.set(channelPublicId, Date.now());
    }
    markChannelRead(channelPublicId);
    recalculateUnreadServers();
    renderTypingIndicator();
    if (shouldScrollToBottom) setJumpUnreadVisible(false);
    else updateJumpUnreadState();
    setSendStatus(messages.some((m) => m.user_id === currentUserId) ? "Seen in active channel" : "", "ok");
  } catch (err) {
    console.error("Error loading messages:", err);
  }
}

// --------------------
// Create Server Modal
// --------------------
if (openCreateServerBtn && createServerModal && submitServerBtn) {
  openCreateServerBtn.addEventListener("click", () => openModal(createServerModal));
  submitServerBtn.addEventListener("click", async () => {
    const name = serverNameInput.value.trim();
    if (!name) return;
    try {
      const res = await fetch("/servers/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to create server");
      serverNameInput.value = "";
      closeModal(createServerModal);
      await loadServers();
    } catch (err) {
      console.error(err);
    }
  });
}

// --------------------
// Create Channel Modal
// --------------------
if (openCreateChannelBtn && createChannelModal && submitChannelBtn) {
  openCreateChannelBtn.addEventListener("click", () => {
    if (!activeServerId) return alert("Select a server first!");
    openModal(createChannelModal);
  });
  submitChannelBtn.addEventListener("click", async () => {
    const name = channelNameInput.value.trim();
    const type = (channelTypeInput?.value || "text").trim().toLowerCase();
    if (!name || !activeServerId) return;
    try {
      const res = await fetch(`/channels/server/${activeServerId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      });
      if (!res.ok) {
        let detail = "Failed to create channel";
        try {
          const data = await res.json();
          if (data?.detail) detail = data.detail;
        } catch {
          // Keep default detail
        }
        throw new Error(detail);
      }
      const createdChannel = await res.json();
      if (type === "voice" && createdChannel?.type !== "voice") {
        throw new Error("Voice type was not applied. Restart backend to load latest channel-type support.");
      }
      channelNameInput.value = "";
      if (channelTypeInput) channelTypeInput.value = "text";
      closeModal(createChannelModal);
      await loadChannels(activeServerId);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create channel");
    }
  });
}

if (openRichEditorBtn && richEditorModal) {
  openRichEditorBtn.addEventListener("click", () => {
    if (editorMdInput) editorMdInput.value = messageInput?.value || "";
    if (editorHtmlInput) editorHtmlInput.value = "";
    if (editorCssInput) editorCssInput.value = "";
    refreshEditorPreview();
    openModal(richEditorModal);
  });
}

[editorMdInput, editorHtmlInput, editorCssInput].forEach((el) => {
  if (!el) return;
  el.addEventListener("input", refreshEditorPreview);
});

if (editorInsertBtn) {
  editorInsertBtn.addEventListener("click", () => {
    const output = buildEditorOutput();
    if (!output || !messageInput) return;
    messageInput.value = output;
    closeModal(richEditorModal);
    messageInput.focus();
  });
}

if (homeDmBtn) {
  homeDmBtn.addEventListener("click", async () => {
    stopTypingNow();
    activeMode = "dm";
    activeServerId = null;
    activeChannelId = null;
    renderTypingIndicator();
    setPendingReply(null);
    activeThreadParentMessageId = null;
    closeModal(threadModal);
    activeChannelType = "text";
    leaveVoiceChannel();
    updateTextVsVoiceUI();
    updateSidebarModeUI();
    updateTopbar("", false);
    highlightActiveServer();
    persistActiveChatState();
    try {
      await loadDmConversations();
      applyDraftToComposer();
    } catch (err) {
      alert(err.message || "Failed to load DMs");
    }
  });
}

if (openServerMembersBtn && serverMembersModal) {
  openServerMembersBtn.addEventListener("click", async () => {
    if (activeMode !== "server" || !activeServerId) {
      alert("Select a server first.");
      return;
    }
    try {
      memberNicknameDrafts = new Map();
      await loadServerMembersModal();
      openModal(serverMembersModal);
    } catch (err) {
      alert(err.message || "Failed to load members");
    }
  });
}

if (openCreateDmBtn) {
  openCreateDmBtn.addEventListener("click", async () => {
    try {
      friendsCache = await fetchFriends();
      if (!friendsCache.length) {
        alert("No friends yet. Open Friends and send a request first.");
        return;
      }
      if (dmFriendSearchInput) dmFriendSearchInput.value = "";
      renderDmFriendPicker("");
      openModal(createDmModal);
    } catch (err) {
      alert(err.message || "Failed to open DM");
    }
  });
}

if (dmFriendSearchInput) {
  dmFriendSearchInput.addEventListener("input", () => {
    renderDmFriendPicker(dmFriendSearchInput.value || "");
  });
}

if (openFriendsBtn && friendsModal) {
  openFriendsBtn.addEventListener("click", async () => {
    try {
      if (friendPublicIdInput) friendPublicIdInput.value = "";
      await refreshFriendsModal();
      openModal(friendsModal);
    } catch (err) {
      alert(err.message || "Failed to load friends");
    }
  });
}

if (sendFriendRequestBtn) {
  sendFriendRequestBtn.addEventListener("click", async () => {
    const publicId = friendPublicIdInput?.value.trim();
    if (!publicId) return;
    try {
      await sendFriendRequest(publicId);
      if (friendPublicIdInput) friendPublicIdInput.value = "";
      await refreshFriendsModal();
    } catch (err) {
      alert(err.message || "Failed to send friend request");
    }
  });
}

if (openAddSeparatorBtn) {
  openAddSeparatorBtn.addEventListener("click", () => {
    if (!activeServerId) {
      alert("Select a server first!");
      return;
    }
    const label = window.prompt("Separator text (Markdown/HTML allowed):");
    if (!label || !label.trim()) return;
    const separatorId = String(Date.now());
    const separatorsKey = getChannelSeparatorsStorageKey(activeServerId);
    const layoutKey = getChannelLayoutStorageKey(activeServerId);
    const separators = getStoredObject(separatorsKey, {});
    separators[separatorId] = label.trim();
    saveObject(separatorsKey, separators);
    const layout = getStoredOrder(layoutKey);
    layout.push(`sep:${separatorId}`);
    saveOrder(layoutKey, layout);
    loadChannels(activeServerId);
  });
}

if (submitInviteMemberBtn && inviteMemberModal) {
  submitInviteMemberBtn.addEventListener("click", async () => {
    const userPublicId = inviteUserPublicIdInput?.value.trim();
    if (!inviteServerPublicId || !userPublicId) return;
    try {
      await inviteMemberToServer(inviteServerPublicId, userPublicId);
      closeModal(inviteMemberModal);
      inviteServerPublicId = null;
      if (inviteUserPublicIdInput) inviteUserPublicIdInput.value = "";
      alert("Member invited successfully.");
    } catch (err) {
      alert(err.message || "Failed to invite member");
    }
  });
}

if (confirmDeleteServerBtn && deleteServerModal) {
  confirmDeleteServerBtn.addEventListener("click", async () => {
    const typedName = deleteServerConfirmInput?.value.trim();
    if (!deleteServerTarget || typedName !== deleteServerTarget.name) {
      alert("Server name does not match.");
      return;
    }
    try {
      await deleteServerByPublicId(deleteServerTarget.publicId);
      if (activeServerId === deleteServerTarget.publicId) {
        activeServerId = null;
        activeChannelId = null;
        activeChannelType = "text";
        leaveVoiceChannel();
        updateTextVsVoiceUI();
        channelsPanel.innerHTML = "";
        messagesPanel.innerHTML = '<div class="message-placeholder">Select a channel to start chatting</div>';
      }
      closeModal(deleteServerModal);
      deleteServerTarget = null;
      persistActiveChatState();
      await loadServers();
    } catch (err) {
      alert(err.message || "Failed to delete server");
    }
  });
}

if (confirmDeleteChannelBtn && deleteChannelModal) {
  confirmDeleteChannelBtn.addEventListener("click", async () => {
    const typedName = deleteChannelConfirmInput?.value.trim();
    if (!deleteChannelTarget || typedName !== deleteChannelTarget.name) {
      alert("Channel name does not match.");
      return;
    }
    try {
      await deleteChannelByPublicId(deleteChannelTarget.publicId);
      if (activeChannelId === deleteChannelTarget.publicId) {
        activeChannelId = null;
        activeChannelType = "text";
        leaveVoiceChannel();
        updateTextVsVoiceUI();
        messagesPanel.innerHTML = '<div class="message-placeholder">Select a channel to start chatting</div>';
      }
      closeModal(deleteChannelModal);
      unreadChannels.delete(deleteChannelTarget.publicId);
      channelLastSeen.delete(deleteChannelTarget.publicId);
      channelToServer.delete(deleteChannelTarget.publicId);
      channelTypeById.delete(deleteChannelTarget.publicId);
      channelNameById.delete(deleteChannelTarget.publicId);
      if (activeServerId) {
        const icons = getStoredObject(getChannelIconsStorageKey(activeServerId), {});
        delete icons[deleteChannelTarget.publicId];
        saveObject(getChannelIconsStorageKey(activeServerId), icons);
      }
      disconnectChannelSocket(deleteChannelTarget.publicId);
      deleteChannelTarget = null;
      if (activeServerId) await loadChannels(activeServerId);
      recalculateUnreadServers();
      persistActiveChatState();
    } catch (err) {
      alert(err.message || "Failed to delete channel");
    }
  });
}

[createServerModal, createChannelModal, inviteMemberModal, deleteServerModal, deleteChannelModal, userSettingsModal, richEditorModal, threadModal, friendsModal, createDmModal, adminModal, serverMembersModal, launchChecklistModal, quickSwitcherModal, shortcutsModal, imagePreprocessModal].forEach((modal) => {
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      if (modal === imagePreprocessModal) resolveImagePreprocessWithOriginal();
      closeModal(modal);
      if (modal === threadModal) activeThreadParentMessageId = null;
      if (modal === serverMembersModal) memberNicknameDrafts = new Map();
    }
  });

  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal === imagePreprocessModal) resolveImagePreprocessWithOriginal();
      closeModal(modal);
      if (modal === threadModal) activeThreadParentMessageId = null;
      if (modal === serverMembersModal) memberNicknameDrafts = new Map();
    });
  }
});

document.addEventListener("keydown", (event) => {
  trackKonami(event);
  const targetTag = String(event.target?.tagName || "").toLowerCase();
  const typingIntoField = targetTag === "input" || targetTag === "textarea" || event.target?.isContentEditable;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    renderQuickSwitcher("");
    if (quickSwitcherInput) quickSwitcherInput.value = "";
    openModal(quickSwitcherModal);
    quickSwitcherInput?.focus();
    return;
  }
  if (!typingIntoField && !event.ctrlKey && !event.metaKey && event.key === "?") {
    event.preventDefault();
    openModal(shortcutsModal);
    return;
  }
  if (event.key === "Escape") {
    hideContextMenu();
    closeActiveReactionPicker();
    closeModal(createServerModal);
    closeModal(createChannelModal);
    closeModal(inviteMemberModal);
    closeModal(deleteServerModal);
    closeModal(deleteChannelModal);
    closeModal(userSettingsModal);
    closeModal(richEditorModal);
    closeModal(threadModal);
    closeModal(friendsModal);
    closeModal(createDmModal);
    closeModal(adminModal);
    closeModal(serverMembersModal);
    memberNicknameDrafts = new Map();
    closeModal(launchChecklistModal);
    closeModal(quickSwitcherModal);
    closeModal(shortcutsModal);
    if (imagePreprocessModal?.classList.contains("open")) resolveImagePreprocessWithOriginal();
    closeModal(imagePreprocessModal);
    activeThreadParentMessageId = null;
  }
});

document.addEventListener("click", () => {
  hideContextMenu();
  closeActiveReactionPicker();
});

document.addEventListener("scroll", () => {
  hideContextMenu();
  closeActiveReactionPicker();
}, true);

document.addEventListener("contextmenu", (event) => {
  if (!event.target.closest(".server-item") && !event.target.closest(".channel-item")) {
    hideContextMenu();
  }
});

// --------------------
// Send Message
// --------------------
if (sendMessageBtn) {
  const sendCurrentMessage = async () => {
    if (activeChannelType === "voice") return;
    let content = messageInput.value.trim();
    if (!content) return;
    setSendStatus("Sending...", "sending");
    const commandResult = handleComposerCommand(content);
    if (commandResult.handled) {
      messageInput.value = "";
      clearActiveDraft();
      return;
    }
    content = commandResult.rewrite || content;
    if (activeMode === "server") {
      stopTypingNow();
    }
    try {
      let res;
      if (activeMode === "dm") {
        if (!activeDmConversationId) return;
        res = await fetch(`/dms/${activeDmConversationId}/messages`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } else {
        if (!activeChannelId) return;
        res = await fetch(`/messages/${activeChannelId}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            parent_message_public_id: pendingReplyTo?.public_id || null,
          }),
        });
      }
      if (!res.ok) throw new Error("Failed to send message");
      messageInput.value = "";
      clearActiveDraft();
      if (activeMode === "dm") {
        await loadDmMessages(activeDmConversationId, true);
      } else {
        setPendingReply(null);
        await loadMessages(activeChannelId, true);
      }
      setSendStatus("Delivered", "ok");
    } catch (err) {
      failedSendQueue.push({
        mode: activeMode,
        channelId: activeChannelId,
        dmConversationId: activeDmConversationId,
        content,
      });
      updateRetrySendUi();
      setSendStatus(err.message || "Send failed", "error");
      console.error(err);
    }
  };

  sendMessageBtn.addEventListener("click", sendCurrentMessage);

  if (messageInput) {
    messageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendCurrentMessage();
      }
    });

    messageInput.addEventListener("input", () => {
      updateDraftFromComposer();
      if (sendStatusText?.dataset?.kind === "error") setSendStatus("", "muted");
      if (activeMode !== "server" || !activeChannelId || activeChannelType === "voice") return;
      const now = Date.now();
      if (typingActiveChannelId !== activeChannelId || now - typingLastStartSentAt > 850) {
        sendTypingEvent("typing_start");
        typingActiveChannelId = activeChannelId;
        typingLastStartSentAt = now;
      }
      if (typingStopTimer) clearTimeout(typingStopTimer);
      typingStopTimer = setTimeout(() => {
        sendTypingEvent("typing_stop");
        typingActiveChannelId = null;
        typingLastStartSentAt = 0;
        typingStopTimer = null;
      }, 1300);
    });

    messageInput.addEventListener("blur", () => {
      if (typingStopTimer) {
        clearTimeout(typingStopTimer);
        typingStopTimer = null;
      }
      if (typingActiveChannelId) {
        sendTypingEvent("typing_stop");
        typingActiveChannelId = null;
        typingLastStartSentAt = 0;
      }
    });
  }
}

if (replyPreviewCancel) {
  replyPreviewCancel.addEventListener("click", () => {
    setPendingReply(null);
  });
}

if (threadSendBtn && threadMessageInput) {
  const sendThreadReply = async () => {
    if (!activeChannelId || !activeThreadParentMessageId) return;
    const content = threadMessageInput.value.trim();
    if (!content) return;
    try {
      const res = await fetch(`/messages/${activeChannelId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          parent_message_public_id: activeThreadParentMessageId,
        }),
      });
      if (!res.ok) throw new Error("Failed to send thread reply");
      threadMessageInput.value = "";
      await loadThreadMessages(true);
      await loadMessages(activeChannelId, false);
    } catch (err) {
      alert(err.message || "Failed to send thread reply");
    }
  };

  threadSendBtn.addEventListener("click", sendThreadReply);
  threadMessageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendThreadReply();
    }
  });
}

if (uploadImageBtn && imageUploadInput) {
  uploadImageBtn.addEventListener("click", () => {
    imageUploadInput.click();
  });

  imageUploadInput.addEventListener("change", async () => {
    const file = imageUploadInput.files?.[0];
    if (!file) return;
    try {
      const processed = await preprocessImageFile(file);
      const result = await uploadMessageImage(processed);
      const markdownImage = `![${file.name}](${result.url})`;
      messageInput.value = messageInput.value.trim()
        ? `${messageInput.value}\n${markdownImage}`
        : markdownImage;
      imageUploadInput.value = "";
      messageInput.focus();
    } catch (err) {
      alert(err.message || "Image upload failed");
    }
  });
}

// --------------------
// Logout
// --------------------
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    stopTypingNow();
    closePresenceSocket();
    closeDmMessageSocket();
    leaveVoiceChannel();
    closeAllChannelSockets();
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "index.html";
  });
}

// --------------------
// Theme toggle
// --------------------
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentPreset = getThemeById(appearanceSettings.themeId);
    if (currentPreset.mode === "dark") {
      appearanceSettings.themeId = appearanceSettings.lastLightThemeId || DEFAULT_APPEARANCE.lastLightThemeId;
    } else {
      appearanceSettings.themeId = appearanceSettings.lastDarkThemeId || DEFAULT_APPEARANCE.lastDarkThemeId;
    }
    applyAppearanceSettings();
    saveAppearanceSettings();
    renderThemePresetGrid();
    updateAppearanceControlValues();
  });
}

if (settingsBtn && userSettingsModal) {
  settingsBtn.addEventListener("click", () => {
    if (settingsPublicId) settingsPublicId.textContent = currentUser?.public_id || "-";
    if (settingsUsername) settingsUsername.textContent = currentUser?.username || "-";
    if (settingsEmail) settingsEmail.textContent = currentUser?.email || "-";
    if (settingsUserId) settingsUserId.textContent = String(currentUser?.id ?? "-");
    if (settingsCreatedAt) settingsCreatedAt.textContent = formatTimestamp(currentUser?.created_at) || "-";
    if (settingsUpdatedAt) settingsUpdatedAt.textContent = formatTimestamp(currentUser?.updated_at) || "-";
    updateAppearanceControlValues();
    updateLabsControlValues();
    applySafeModeState();
    renderThemePresetGrid();
    populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
    openModal(userSettingsModal);
  });

}

if (adminBtn && adminModal) {
  adminBtn.addEventListener("click", async () => {
    try {
      await loadAdminPanel();
      openModal(adminModal);
    } catch (err) {
      alert(err.message || "Failed to load admin panel");
    }
  });
}

if (adminRefreshBtn) {
  adminRefreshBtn.addEventListener("click", async () => {
    try {
      await loadAdminPanel();
    } catch (err) {
      alert(err.message || "Failed to refresh admin panel");
    }
  });
}

if (dmCallBtn) {
  dmCallBtn.addEventListener("click", async () => {
    if (activeMode !== "dm" || !activeDmConversationId) return;
    try {
      activeChannelType = "voice";
      dmCallActive = true;
      updateTextVsVoiceUI();
      setVoiceStatus("Connecting direct call...");
      await joinVoiceChannel(activeDmConversationId, "/ws/dm-calls/");
    } catch (err) {
      console.error(err);
      setVoiceStatus("Direct call failed");
    }
  });
}

if (settingsAvatarUploadBtn && settingsAvatarInput) {
  settingsAvatarUploadBtn.addEventListener("click", async () => {
    const file = settingsAvatarInput.files?.[0];
    if (!file) {
      alert("Choose an image first.");
      return;
    }
    try {
      const processed = await preprocessImageFile(file);
      await uploadUserAvatar(processed);
      settingsAvatarInput.value = "";
      alert("Avatar uploaded.");
      renderVoiceUsers();
    } catch (err) {
      alert(err.message || "Failed to upload avatar");
    }
  });
}

if (joinVoiceBtn) {
  joinVoiceBtn.addEventListener("click", async () => {
    if (!activeChannelId || activeChannelType !== "voice") return;
    try {
      await joinVoiceChannel(activeChannelId);
    } catch (err) {
      console.error(err);
      setVoiceStatus("Mic permission or connection failed");
    }
  });
}

if (leaveVoiceBtn) {
  leaveVoiceBtn.addEventListener("click", () => {
    leaveVoiceChannel();
    if (activeMode === "dm") {
      activeChannelType = "text";
      updateTextVsVoiceUI();
      setVoiceStatus("Not connected");
    }
  });
}

if (muteVoiceBtn) {
  muteVoiceBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    const selfPeer = peerMeta.get(voiceSelfPeerId);
    if (selfPeer) selfPeer.muted = isMuted;
    applyLocalMuteState();
    sendVoiceState();
    renderVoiceUsers();
    muteVoiceBtn.textContent = isMuted ? "Unmute" : "Mute";
  });
}

if (deafenVoiceBtn) {
  deafenVoiceBtn.addEventListener("click", () => {
    isDeafened = !isDeafened;
    const selfPeer = peerMeta.get(voiceSelfPeerId);
    if (selfPeer) selfPeer.deafened = isDeafened;
    applyLocalMuteState();
    applyDeafenOutput();
    sendVoiceState();
    renderVoiceUsers();
    deafenVoiceBtn.textContent = isDeafened ? "Undeafen" : "Deafen";
  });
}

// --------------------
// Three.js D20
// --------------------
const canvas = document.getElementById("d20-canvas");
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  camera.position.z = 3;

  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshBasicMaterial({ color: 0x7f8072, wireframe: true });
  d20Material = material;
  updateD20ThemeColor();
  const d20 = new THREE.Mesh(geometry, material);
  scene.add(d20);

  function resizeD20Canvas() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resizeD20Canvas();
  window.addEventListener("resize", resizeD20Canvas);

  let floatOffset = 0;
  function animate() {
    requestAnimationFrame(animate);
    d20.rotation.x += 0.002 * d20SpinMultiplier;
    d20.rotation.y += 0.003 * d20SpinMultiplier;
    floatOffset += 0.01 * d20SpinMultiplier;
    d20.position.y = Math.sin(floatOffset) * 0.2;
    renderer.render(scene, camera);
  }
  animate();

  canvas.addEventListener("click", () => {
    if (!d20BounceEnabled) return;
    d20.scale.set(1.18, 1.18, 1.18);
    window.setTimeout(() => d20.scale.set(1, 1, 1), 180);
  });
}

// --------------------
// Initialize
// --------------------
loadPanelSizes();
applyPanelSizes();
loadDraftsState();
loadChannelNotificationState();
loadSafeModeState();
loadLaunchChecklistState();
initSortableList(serversPanel, persistServerOrder);
initSortableList(channelsPanel, persistChannelOrder);
initPanelResizer(serversPanelContainer, "servers", 72, 0.35);
initPanelResizer(channelsPanelContainer, "channels", 160, 0.45);
applyStoredTheme();
loadLabsSettings();
applyLabsSettings();
bindAppearanceControls();
bindLabsControls();
bindUtilityControls();
updateAppearanceControlValues();
updateLabsControlValues();
renderLaunchChecklist();
startRealtimeStatusTicker();
runPreflightChecks();
refreshRuntimeMeta();
setInterval(refreshRuntimeMeta, 60000);
applySafeModeState();
applyDraftToComposer();
updateRetrySendUi();
renderThemePresetGrid();
populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
updateTextVsVoiceUI();
window.addEventListener("resize", applyPanelSizes);
loadDashboard();

