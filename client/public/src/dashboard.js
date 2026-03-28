// --------------------
// DOM Elements
// --------------------
const serversPanel = document.getElementById("servers-list");
const channelsPanel = document.getElementById("channels-list");
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
const openDiscordImportBtn = document.getElementById("open-discord-import");
const openServerMembersBtn = document.getElementById("open-server-members");
const openServerSettingsBtn = document.getElementById("open-server-settings");
const homeDmBtn = document.getElementById("home-dm-btn");
const channelsPanelTitle = document.getElementById("channels-panel-title");
const currentServerNameEl = document.getElementById("current-server-name");
const openServerSwitcherBtn = document.getElementById("open-server-switcher");
const serverSwitcherOverlay = document.getElementById("server-switcher-overlay");
const closeServerSwitcherBtn = document.getElementById("close-server-switcher");
const openCreateItemBtn = document.getElementById("open-create-item");
const createChannelModal = document.getElementById("create-channel-modal");
const submitChannelBtn = document.getElementById("submit-channel");
const channelNameInput = document.getElementById("new-channel-name");
const channelCategoryInput = document.getElementById("new-channel-category");
const channelTypeInput = document.getElementById("new-channel-type");
const discordImportModal = document.getElementById("discord-import-modal");
const discordImportServerLabel = document.getElementById("discord-import-server-label");
const discordConnectBtn = document.getElementById("discord-connect-btn");
const discordRefreshSessionBtn = document.getElementById("discord-refresh-session-btn");
const discordDisconnectBtn = document.getElementById("discord-disconnect-btn");
const discordSessionStatus = document.getElementById("discord-session-status");
const discordOauthClientIdInput = document.getElementById("discord-oauth-client-id-input");
const discordOauthClientSecretInput = document.getElementById("discord-oauth-client-secret-input");
const discordOauthRedirectUriInput = document.getElementById("discord-oauth-redirect-uri-input");
const discordSaveOauthSettingsBtn = document.getElementById("discord-save-oauth-settings-btn");
const discordClearOauthSecretBtn = document.getElementById("discord-clear-oauth-secret-btn");
const discordGuildSelect = document.getElementById("discord-guild-select");
const discordImportReplaceExistingInput = document.getElementById("discord-import-replace-existing");
const discordImportSkipExistingInput = document.getElementById("discord-import-skip-existing");
const discordImportCreateCategoriesInput = document.getElementById("discord-import-create-categories");
const discordImportPrefixCategoryInput = document.getElementById("discord-import-prefix-category");
const discordRunImportBtn = document.getElementById("discord-run-import-btn");
const REQUIRED_CHANNEL_TYPES = [
  { value: "text", label: "Text" },
  { value: "voice", label: "Voice" },
  { value: "notes", label: "Notes" },
  { value: "battlemap", label: "Battlemap" },
];
const inviteMemberModal = document.getElementById("invite-member-modal");
const inviteServerName = document.getElementById("invite-server-name");
const inviteUserPublicIdInput = document.getElementById("invite-user-public-id");
let inviteFriendPickerEl = document.getElementById("invite-friend-picker");
let inviteFriendSearchInput = document.getElementById("invite-friend-search-input");
let inviteFriendListEl = document.getElementById("invite-friend-list");
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
const messagesTopbarTypeBadge = document.getElementById("messages-topbar-type-badge");
const messagesTopbarTitleWrap = document.querySelector(".messages-topbar-title-wrap");
const messageSearchToggleBtn = document.getElementById("message-search-toggle-btn");
const channelPinsBtn = document.getElementById("channel-pins-btn");
const messageSearchBar = document.getElementById("message-search-bar");
const messageSearchInput = document.getElementById("message-search-input");
const messageSearchCount = document.getElementById("message-search-count");
const messageSearchClearBtn = document.getElementById("message-search-clear-btn");
const jumpUnreadBtn = document.getElementById("jump-unread-btn");
const uploadProgressRow = document.getElementById("upload-progress-row");
const uploadProgressFill = document.getElementById("upload-progress-fill");
const uploadProgressText = document.getElementById("upload-progress-text");
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
const cameraVoiceBtn = document.getElementById("camera-voice-btn");
const screenVoiceBtn = document.getElementById("screen-voice-btn");
const linkStreamVoiceBtn = document.getElementById("link-stream-voice-btn");
const watchSharesVoiceBtn = document.getElementById("watch-shares-voice-btn");
const voiceVideoGrid = document.getElementById("voice-video-grid");

function ensureCreateChannelTypeOptions() {
  if (!channelTypeInput) return;
  const existingValues = new Set(
    [...channelTypeInput.options].map((opt) => String(opt.value || "").trim().toLowerCase()).filter(Boolean),
  );
  REQUIRED_CHANNEL_TYPES.forEach((entry) => {
    if (existingValues.has(entry.value)) return;
    const opt = document.createElement("option");
    opt.value = entry.value;
    opt.textContent = entry.label;
    channelTypeInput.appendChild(opt);
  });
  if (![...channelTypeInput.options].some((opt) => String(opt.value || "").trim().toLowerCase() === channelTypeInput.value)) {
    channelTypeInput.value = "text";
  }
}
ensureCreateChannelTypeOptions();
const userSettingsModal = document.getElementById("user-settings-modal");
const publicUserProfileModal = document.getElementById("public-user-profile-modal");
const publicUserProfileAvatar = document.getElementById("public-user-profile-avatar");
const publicUserProfileName = document.getElementById("public-user-profile-name");
const publicUserProfileStatus = document.getElementById("public-user-profile-status");
const publicUserProfilePublicId = document.getElementById("public-user-profile-public-id");
const publicUserProfileCreatedAt = document.getElementById("public-user-profile-created-at");
const publicUserProfileUpdatedAt = document.getElementById("public-user-profile-updated-at");
const publicUserProfileDmBtn = document.getElementById("public-user-profile-dm-btn");
const settingsPublicId = document.getElementById("settings-public-id");
const settingsFriendInviteCode = document.getElementById("settings-friend-invite-code");
const settingsCopyFriendInviteBtn = document.getElementById("settings-copy-friend-invite-btn");
const settingsUsername = document.getElementById("settings-username");
const settingsUsernameColorInput = document.getElementById("settings-username-color-input");
const settingsClearUsernameColorBtn = document.getElementById("settings-clear-username-color-btn");
const settingsNameEmojiInput = document.getElementById("settings-name-emoji-input");
const settingsSaveNameStyleBtn = document.getElementById("settings-save-name-style-btn");
const settingsCustomStatusInput = document.getElementById("settings-custom-status-input");
const settingsSaveCustomStatusBtn = document.getElementById("settings-save-custom-status-btn");
const settingsStripUploadMetadataInput = document.getElementById("settings-strip-upload-metadata");
const settingsSaveUploadPrivacyBtn = document.getElementById("settings-save-upload-privacy-btn");
const settingsEmail = document.getElementById("settings-email");
const settingsUserId = document.getElementById("settings-user-id");
const settingsCreatedAt = document.getElementById("settings-created-at");
const settingsUpdatedAt = document.getElementById("settings-updated-at");
const settingsAvatarPreview = document.getElementById("settings-avatar-preview");
const settingsAvatarInput = document.getElementById("settings-avatar-input");
const settingsAvatarUploadBtn = document.getElementById("settings-avatar-upload-btn");
const settingsThemeGrid = document.getElementById("settings-theme-grid");
const settingsUiStyleInput = document.getElementById("settings-ui-style");
const settingsModernUiInput = document.getElementById("settings-modern-ui");
const settingsUiScaleInput = document.getElementById("settings-ui-scale");
const settingsUiScaleValue = document.getElementById("settings-ui-scale-value");
const settingsPanelRadiusInput = document.getElementById("settings-panel-radius");
const settingsPanelRadiusValue = document.getElementById("settings-panel-radius-value");
const settingsMessageDensityInput = document.getElementById("settings-message-density");
const settingsMessageDensityValue = document.getElementById("settings-message-density-value");
const settingsCenterWireframeShapeInput = document.getElementById("settings-center-wireframe-shape");
const settingsCenterGlowCoolColorInput = document.getElementById("settings-center-glow-cool-color");
const settingsCenterGlowVioletColorInput = document.getElementById("settings-center-glow-violet-color");
const settingsCenterGlowWarmColorInput = document.getElementById("settings-center-glow-warm-color");
const settingsCenterGlowCoolColorValue = document.getElementById("settings-center-glow-cool-color-value");
const settingsCenterGlowVioletColorValue = document.getElementById("settings-center-glow-violet-color-value");
const settingsCenterGlowWarmColorValue = document.getElementById("settings-center-glow-warm-color-value");
const settingsChannelRowHighlightInput = document.getElementById("settings-channel-row-highlight");
const settingsNotificationPingVolumeInput = document.getElementById("settings-notification-ping-volume");
const settingsNotificationPingVolumeValue = document.getElementById("settings-notification-ping-volume-value");
const settingsThemeAccentColorInput = document.getElementById("settings-theme-accent-color");
const settingsThemeAccentColorValue = document.getElementById("settings-theme-accent-color-value");
const settingsPureDarkAccentRow = document.getElementById("settings-pure-dark-accent-row");
const settingsPureDarkBgColorInput = document.getElementById("settings-pure-dark-bg-color");
const settingsPureDarkPanelStartColorInput = document.getElementById("settings-pure-dark-panel-start-color");
const settingsPureDarkPanelEndColorInput = document.getElementById("settings-pure-dark-panel-end-color");
const settingsPureDarkHeaderColorInput = document.getElementById("settings-pure-dark-header-color");
const settingsPureDarkTextColorInput = document.getElementById("settings-pure-dark-text-color");
const settingsPureDarkMutedColorInput = document.getElementById("settings-pure-dark-muted-color");
const settingsPureDarkAccentColorInput = document.getElementById("settings-pure-dark-accent-color");
const settingsPureDarkAccentStrongColorInput = document.getElementById("settings-pure-dark-accent-strong-color");
const settingsPureDarkBgColorValue = document.getElementById("settings-pure-dark-bg-color-value");
const settingsPureDarkPanelStartColorValue = document.getElementById("settings-pure-dark-panel-start-color-value");
const settingsPureDarkPanelEndColorValue = document.getElementById("settings-pure-dark-panel-end-color-value");
const settingsPureDarkHeaderColorValue = document.getElementById("settings-pure-dark-header-color-value");
const settingsPureDarkTextColorValue = document.getElementById("settings-pure-dark-text-color-value");
const settingsPureDarkMutedColorValue = document.getElementById("settings-pure-dark-muted-color-value");
const settingsPureDarkAccentColorValue = document.getElementById("settings-pure-dark-accent-color-value");
const settingsPureDarkAccentStrongColorValue = document.getElementById("settings-pure-dark-accent-strong-color-value");
const settingsPureDarkResetBtn = document.getElementById("settings-pure-dark-reset-btn");
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
const settingsForceRefreshBtn = document.getElementById("settings-force-refresh-btn");
const settingsTitle = document.getElementById("settings-title");
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
const onboardingTutorialModal = document.getElementById("onboarding-tutorial-modal");
const tutorialTitleEl = document.getElementById("tutorial-title");
const tutorialBodyEl = document.getElementById("tutorial-body");
const tutorialProgressEl = document.getElementById("tutorial-progress");
const tutorialSkipBtn = document.getElementById("tutorial-skip-btn");
const tutorialPrevBtn = document.getElementById("tutorial-prev-btn");
const tutorialNextBtn = document.getElementById("tutorial-next-btn");
const tutorialFinishBtn = document.getElementById("tutorial-finish-btn");
const imagePreprocessModal = document.getElementById("image-preprocess-modal");
const imagePreprocessPreview = document.getElementById("image-preprocess-preview");
const imagePreprocessOriginalBtn = document.getElementById("image-preprocess-original-btn");
const imagePreprocessCropBtn = document.getElementById("image-preprocess-crop-btn");
const imagePreprocessCancelBtn = document.getElementById("image-preprocess-cancel-btn");
const settingsSafeModeBtn = document.getElementById("settings-safe-mode-btn");
const settingsExportBundleBtn = document.getElementById("settings-export-bundle-btn");
const settingsImportBundleInput = document.getElementById("settings-import-bundle-input");
const settingsOpenTutorialBtn = document.getElementById("settings-open-tutorial-btn");
const settingsTestNotificationBtn = document.getElementById("settings-test-notification-btn");
const settingsEnablePushBtn = document.getElementById("settings-enable-push-btn");
const settingsOpenDiagnosticsBtn = document.getElementById("settings-open-diagnostics-btn");
const settingsRefreshConnectionsBtn = document.getElementById("settings-refresh-connections-btn");
const settingsRunNotificationPollBtn = document.getElementById("settings-run-notification-poll-btn");
const settingsResyncRealtimeBtn = document.getElementById("settings-resync-realtime-btn");
const settingsConnectionsOnline = document.getElementById("settings-connections-online");
const settingsConnectionsVisibility = document.getElementById("settings-connections-visibility");
const settingsConnectionsChannelSockets = document.getElementById("settings-connections-channel-sockets");
const settingsConnectionsPollStatus = document.getElementById("settings-connections-poll-status");
const settingsConnectionsLastPoll = document.getElementById("settings-connections-last-poll");
const settingsConnectionsAssetVersions = document.getElementById("settings-connections-asset-versions");
const settingsConnectionsSwState = document.getElementById("settings-connections-sw-state");
const settingsConnectionsHealthJson = document.getElementById("settings-connections-health-json");
const settingsVoiceEchoCancellationInput = document.getElementById("settings-voice-echo-cancellation");
const settingsVoiceNoiseSuppressionInput = document.getElementById("settings-voice-noise-suppression");
const settingsVoiceDenoiseEnabledInput = document.getElementById("settings-voice-denoise-enabled");
const settingsVoiceDenoiseStrengthInput = document.getElementById("settings-voice-denoise-strength");
const settingsVoiceDenoiseStrengthValue = document.getElementById("settings-voice-denoise-strength-value");
const settingsVoiceEqEnabledInput = document.getElementById("settings-voice-eq-enabled");
const settingsVoiceEqLowInput = document.getElementById("settings-voice-eq-low");
const settingsVoiceEqLowValue = document.getElementById("settings-voice-eq-low-value");
const settingsVoiceEqMidInput = document.getElementById("settings-voice-eq-mid");
const settingsVoiceEqMidValue = document.getElementById("settings-voice-eq-mid-value");
const settingsVoiceEqHighInput = document.getElementById("settings-voice-eq-high");
const settingsVoiceEqHighValue = document.getElementById("settings-voice-eq-high-value");
const settingsVoiceSelfTestBtn = document.getElementById("settings-voice-self-test-btn");
const settingsVoiceSelfTestStatus = document.getElementById("settings-voice-self-test-status");
const settingsVoiceCompactVideoTilesInput = document.getElementById("settings-voice-compact-video-tiles");
const settingsVoiceVideoTileScaleInput = document.getElementById("settings-voice-video-tile-scale");
const settingsVoiceVideoTileScaleValue = document.getElementById("settings-voice-video-tile-scale-value");
const settingsVoiceScreenShareQualityInput = document.getElementById("settings-voice-screen-share-quality");
const settingsMenuButtons = Array.from(document.querySelectorAll(".settings-menu-btn[data-settings-tab]"));
const settingsPanels = Array.from(document.querySelectorAll(".settings-section[data-settings-panel]"));
const toastContainer = document.getElementById("dashboard-toast-container");
const runtimeMetaEl = document.getElementById("runtime-meta");
const cacheMetaEl = document.getElementById("cache-meta");
const labsLanternColorAInput = document.getElementById("labs-lantern-color-a");
const labsLanternColorAValue = document.getElementById("labs-lantern-color-a-value");
const labsLanternColorBInput = document.getElementById("labs-lantern-color-b");
const labsLanternColorBValue = document.getElementById("labs-lantern-color-b-value");
const labsBokehColorAInput = document.getElementById("labs-bokeh-color-a");
const labsBokehColorAValue = document.getElementById("labs-bokeh-color-a-value");
const labsBokehColorBInput = document.getElementById("labs-bokeh-color-b");
const labsBokehColorBValue = document.getElementById("labs-bokeh-color-b-value");
const labsMessageBarGlowStyleInput = document.getElementById("labs-messagebar-glow-style");
const labsMessageBarGlowColorAInput = document.getElementById("labs-messagebar-glow-color-a");
const labsMessageBarGlowColorAValue = document.getElementById("labs-messagebar-glow-color-a-value");
const labsMessageBarGlowColorBInput = document.getElementById("labs-messagebar-glow-color-b");
const labsMessageBarGlowColorBValue = document.getElementById("labs-messagebar-glow-color-b-value");
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
  fxBokeh: document.getElementById("labs-fx-bokeh"),
  fxD20Turbo: document.getElementById("labs-fx-d20turbo"),
  fxD20Bounce: document.getElementById("labs-fx-d20bounce"),
  fxCosmicD20: document.getElementById("labs-fx-cosmic-d20"),
  fxSpaceCore: document.getElementById("labs-fx-space-core"),
  fxRollAnim: document.getElementById("labs-fx-roll-anim"),
  fxRainbowAuthor: document.getElementById("labs-fx-rainbow-author"),
  fxScanlines: document.getElementById("labs-fx-scanlines"),
  fxPanelTilt: document.getElementById("labs-fx-panel-tilt"),
  fxUnreadShimmer: document.getElementById("labs-fx-unread-shimmer"),
  fxCommandHints: document.getElementById("labs-fx-command-hints"),
};

const originalWindowFetch = window.fetch.bind(window);
let authRedirectInProgress = false;
let authRefreshRecoveryPromise = null;
let mobileChannelBackBtn = null;
const TAVERN_DESKTOP_SERVER_URL_KEY = "tavern.desktopServerUrl";

function getConfiguredServerOrigin() {
  let candidate = "";
  try {
    candidate = String(window.__TAVERN_SERVER_URL__ || "").trim();
  } catch {
    candidate = "";
  }
  if (!candidate) {
    try {
      candidate = String(localStorage.getItem(TAVERN_DESKTOP_SERVER_URL_KEY) || "").trim();
    } catch {
      candidate = "";
    }
  }
  if (!candidate) {
    try {
      const param = new URLSearchParams(window.location.search).get("server");
      candidate = String(param || "").trim();
      if (candidate) localStorage.setItem(TAVERN_DESKTOP_SERVER_URL_KEY, candidate);
    } catch {
      candidate = "";
    }
  }
  if (!candidate) return "";
  try {
    const url = new URL(candidate);
    if (!/^https?:$/i.test(url.protocol)) return "";
    return url.origin;
  } catch {
    return "";
  }
}

function resolveApiUrl(input) {
  if (typeof input !== "string") return input;
  if (!input.startsWith("/")) return input;
  const origin = getConfiguredServerOrigin();
  return origin ? `${origin}${input}` : input;
}

function resolveMediaUrl(input) {
  return resolveApiUrl(input);
}

function buildWsUrl(path) {
  const cleanPath = String(path || "").startsWith("/") ? String(path) : `/${String(path || "")}`;
  const origin = getConfiguredServerOrigin();
  if (origin) {
    const wsOrigin = origin.replace(/^http/i, "ws");
    return `${wsOrigin}${cleanPath}`;
  }
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${window.location.host}${cleanPath}`;
}

function getDashboardPageHref() {
  return getConfiguredServerOrigin() ? "dashboard.html" : "/dashboard";
}

function getLoginPageHref() {
  return getConfiguredServerOrigin() ? "index.html" : "/";
}

function redirectToLoginForDeauth() {
  if (authRedirectInProgress) return;
  authRedirectInProgress = true;
  try {
    stopMicSelfTest?.();
  } catch {
    // Ignore cleanup failures during auth redirect.
  }
  const next = encodeURIComponent(`${window.location.pathname}${window.location.search}${window.location.hash}`);
  window.location.replace(`${getLoginPageHref()}?reason=deauth&next=${next}`);
}

async function isAuthFailureResponse(response) {
  if (!response) return false;
  if (response.status === 401 || response.status === 419) return true;
  if (response.status !== 403) return false;

  const contentType = String(response.headers?.get?.("content-type") || "").toLowerCase();
  if (!contentType.includes("application/json")) return false;
  try {
    const body = await response.clone().json();
    const detail = String(body?.detail || body?.message || "").toLowerCase();
    if (!detail) return false;
    return (
      detail.includes("not authenticated")
      || detail.includes("could not validate credentials")
      || detail.includes("invalid token")
      || detail.includes("token expired")
    );
  } catch {
    return false;
  }
}

function getFetchRequestUrl(args) {
  const input = args?.[0];
  if (typeof input === "string") return input;
  if (input && typeof input.url === "string") return input.url;
  return "";
}

function isAuthEndpointRequest(url) {
  const normalized = String(url || "");
  return normalized.includes("/auth/session") || normalized.includes("/auth/refresh") || normalized.includes("/auth/login");
}

async function tryAuthRefreshRecovery() {
  if (authRefreshRecoveryPromise) return authRefreshRecoveryPromise;
  authRefreshRecoveryPromise = (async () => {
    try {
      const res = await originalWindowFetch(resolveApiUrl("/auth/refresh"), { method: "POST", credentials: "include" });
      return res.ok;
    } catch {
      return false;
    } finally {
      authRefreshRecoveryPromise = null;
    }
  })();
  return authRefreshRecoveryPromise;
}

window.fetch = async (...args) => {
  const resolvedArgs = [...args];
  if (resolvedArgs.length > 0) resolvedArgs[0] = resolveApiUrl(resolvedArgs[0]);
  let response = await originalWindowFetch(...resolvedArgs);
  if (await isAuthFailureResponse(response)) {
    const reqUrl = getFetchRequestUrl(resolvedArgs);
    if (!isAuthEndpointRequest(reqUrl)) {
      const recovered = await tryAuthRefreshRecovery();
      if (recovered) {
        response = await originalWindowFetch(...resolvedArgs);
        if (!(await isAuthFailureResponse(response))) return response;
      }
    }
    redirectToLoginForDeauth();
  }
  return response;
};
const threadModal = document.getElementById("thread-modal");
const threadModalTitle = document.getElementById("thread-modal-title");
const threadMessagesContainer = document.getElementById("thread-messages-container");
const threadMessageInput = document.getElementById("thread-message-input");
const threadSendBtn = document.getElementById("thread-send-btn");
const pinsModal = document.getElementById("pins-modal");
const pinsModalList = document.getElementById("pins-modal-list");
const typingIndicator = document.getElementById("typing-indicator");
const sendStatusText = document.getElementById("send-status-text");
const retrySendBtn = document.getElementById("retry-send-btn");
const friendsModal = document.getElementById("friends-modal");
const friendPublicIdInput = document.getElementById("friend-public-id-input");
const sendFriendRequestBtn = document.getElementById("send-friend-request-btn");
const friendsListEl = document.getElementById("friends-list");
const friendRequestsIncomingEl = document.getElementById("friend-requests-incoming");
const friendRequestsOutgoingEl = document.getElementById("friend-requests-outgoing");
const friendRequestsHistoryEl = document.getElementById("friend-requests-history");
const adminModal = document.getElementById("admin-modal");
const adminOverviewEl = document.getElementById("admin-overview");
const adminUsersListEl = document.getElementById("admin-users-list");
const adminAuditListEl = document.getElementById("admin-audit-list");
const adminRefreshBtn = document.getElementById("admin-refresh-btn");
const adminRequireRegistrationCodeInput = document.getElementById("admin-require-registration-code");
const adminSaveSettingsBtn = document.getElementById("admin-save-settings-btn");
const adminRegistrationCodeNoteInput = document.getElementById("admin-registration-code-note");
const adminGenerateRegistrationCodeBtn = document.getElementById("admin-generate-registration-code-btn");
const adminRegistrationCodesList = document.getElementById("admin-registration-codes-list");
const adminRefreshRegistrationCodesBtn = document.getElementById("admin-refresh-registration-codes-btn");
const serverMembersModal = document.getElementById("server-members-modal");
const membersServerName = document.getElementById("members-server-name");
const membersListEl = document.getElementById("members-list");
const serverSettingsModal = document.getElementById("server-settings-modal");
const serverSettingsNameLabel = document.getElementById("server-settings-name-label");
const serverSettingsPublicId = document.getElementById("server-settings-public-id");
const serverSettingsMemberCount = document.getElementById("server-settings-member-count");
const serverSettingsNameInput = document.getElementById("server-settings-name-input");
const serverSettingsUploadLimitInput = document.getElementById("server-settings-upload-limit-input");
const serverSettingsLogRetentionInput = document.getElementById("server-settings-log-retention-input");
const serverSettingsMessageRetentionInput = document.getElementById("server-settings-message-retention-input");
const serverSettingsStripMetadataInput = document.getElementById("server-settings-strip-metadata");
const serverSettingsSaveBtn = document.getElementById("server-settings-save-btn");
const serverSettingsRolesList = document.getElementById("server-settings-roles-list");
const serverSettingsNewRoleName = document.getElementById("server-settings-new-role-name");
const serverSettingsCreateRoleBtn = document.getElementById("server-settings-create-role-btn");
const serverUploadDiagnosticsList = document.getElementById("server-upload-diagnostics-list");
const serverSettingsActivityList = document.getElementById("server-settings-activity-list");
const serverSettingsAutomodEnabled = document.getElementById("server-settings-automod-enabled");
const serverSettingsAutomodBlockLinks = document.getElementById("server-settings-automod-block-links");
const serverSettingsAutomodBlockInvites = document.getElementById("server-settings-automod-block-invites");
const serverSettingsAutomodTerms = document.getElementById("server-settings-automod-terms");
const serverSettingsAutomodExtensions = document.getElementById("server-settings-automod-extensions");

// Track active server/channel
let activeServerId = null;
let activeChannelId = null;
let activeChannelType = "text";
let activeMode = "server";
let activeDmConversationId = null;
let d20Material = null;
let d20Mesh = null;
const centerGlowVisualRefs = {
  cosmicRingMaterial: null,
  cosmicAccretionRingMaterial: null,
  cosmicAccretionGlowMaterial: null,
  cosmicHaloMaterial: null,
  cosmicInnerGlowMaterial: null,
  cosmicNebulaMaterial: null,
  cosmicDustMaterials: [],
};
let currentUserId = null;
let currentUser = null;
const publicUserProfileCache = new Map();
const publicUserProfileInflight = new Map();
let inviteFriendSearchQuery = "";
let inviteSelectedFriendPublicId = "";
const unreadChannels = new Set();
const unreadServers = new Set();
const MESSAGE_PAGE_SIZE = 50;
const historyPagingByContext = new Map();
const channelLastSeen = new Map();
const channelToServer = new Map();
const channelTypeById = new Map();
const channelNameById = new Map();
const channelCategoryById = new Map();
const serverNicknamesByServer = new Map();
const serverRolesByServer = new Map();
const channelSockets = new Map();
const channelReconnectTimers = new Map();
const channelSocketFailureCounts = new Map();
const blockedChannelSocketIds = new Set();
const channelPresence = new Map();
const serverChannelLayouts = new Map();
const serverLayoutSaveTimers = new Map();
const serverOnlineUsers = new Map();
const typingUsersByChannel = new Map();
let typingStopTimer = null;
let typingActiveChannelId = null;
let typingLastStartSentAt = 0;
let presenceSocket = null;
let presenceReconnectTimer = null;
let dmReconnectTimer = null;
let presenceSocketFailureCount = 0;
let presenceSocketBlocked = false;
let dmSocketFailureCount = 0;
let dmSocketBlocked = false;
let tutorialStepIndex = 0;
let tutorialCompletionPending = false;
let tutorialHighlightedEl = null;
const onlineUserPublicIds = new Set();
let voiceSocket = null;
let voiceSocketChannelId = null;
let voiceSelfPeerId = null;
const MUSIC_BOT_PEER_ID = "musicbot";
let voiceMusicBotState = {
  invited: false,
  url: null,
  track_title: null,
  playing: false,
  queue_length: 0,
  requested_by_user_public_id: null,
  requested_by_username: null,
};
let musicBotAudioEl = null;
let musicBotIframeEl = null;
let musicBotIframeProvider = "generic";
let musicBotVolume = 100;
let localVoiceStream = null;
let rawLocalVoiceStream = null;
let localVoiceProcessor = null;
let localCameraStream = null;
let localScreenStream = null;
let voiceSettingsApplyTimer = null;
let micSelfTestAudioEl = null;
let micSelfTestRawStream = null;
let micSelfTestProcessedStream = null;
let micSelfTestNodes = [];
const peerConnections = new Map();
const peerAudioElements = new Map();
const peerVideoElements = new Map();
const voiceVideoTileSizeOverrides = new Map();
const peerRemoteVideoTrackSlots = new Map();
const pendingRemoteVideoStreams = new Map();
const watchedPeerStreamIds = new Set();
const peerMeta = new Map();
const voiceChannelOccupancy = new Map();
const peerVolumeLevels = new Map();
const peerAudioSources = new Map();
let voiceAudioContext = null;
let voiceMeterAnimation = null;
let isMuted = false;
let isDeafened = false;
let isCameraEnabled = false;
let isScreenSharing = false;
let watchRemoteScreenShares = true;
let sharedLinkStreamUrl = null;
let focusedVoiceVideoTileKey = null;
let activeSettingsTab = "profile";
let inviteServerPublicId = null;
let deleteServerTarget = null;
let deleteChannelTarget = null;
let notesEditorShell = null;
let notesEditorTextarea = null;
let notesEditorHost = null;
let notesPreviewFrame = null;
let notesSaveBtn = null;
let notesEditModeBtn = null;
let notesStatusEl = null;
let activeNoteMessageId = null;
let activeNoteLoadedContent = "";
let notesSaveTimer = null;
let notesSaveInFlight = false;
let notesPreviewVisible = false;
let notesOverlayEditing = false;
let notesIsEditMode = true;
let battlemapShell = null;
let battlemapCanvasEl = null;
let battlemapGridOverlayEl = null;
let battlemapPawnsLayerEl = null;
let battlemapInitiativeListEl = null;
let battlemapHealthListEl = null;
let battlemapSelectedPawnId = null;
let battlemapState = null;
let battlemapBackgroundInput = null;
let battlemapGridToggleInput = null;
let battlemapGridSizeInput = null;
let battlemapGridSizeValue = null;
let battlemapAddPawnBtn = null;
let battlemapNextTurnBtn = null;
let battlemapRoundLabelEl = null;
let battlemapResetRoundBtn = null;
let battlemapDragState = null;
const battlemapServerSaveTimers = new Map();
const battlemapServerSaveQueuedStates = new Map();
const battlemapServerSaveInFlight = new Map();
const battlemapServerSavePendingFlush = new Set();
const battlemapServerLoadPromises = new Map();
const BATTLEMAP_SERVER_SAVE_DEBOUNCE_MS = 350;
const SERVER_ORDER_STORAGE_KEY = "tavern.serverOrder";
const CHANNEL_ORDER_STORAGE_PREFIX = "tavern.channelOrder.";
const CHANNEL_LAYOUT_STORAGE_PREFIX = "tavern.channelLayout.";
const CHANNEL_SEPARATORS_STORAGE_PREFIX = "tavern.channelSeparators.";
const CHANNEL_SEPARATOR_COLLAPSE_STORAGE_PREFIX = "tavern.channelSeparatorCollapse.";
const CHANNEL_ICON_STORAGE_PREFIX = "tavern.channelIcons.";
const BATTLEMAP_STATE_STORAGE_PREFIX = "tavern.battlemapState.";
const LEGACY_THEME_STORAGE_KEY = "tavern.theme";
const APPEARANCE_STORAGE_KEY = "tavern.appearance";
const CUSTOM_THEMES_STORAGE_KEY = "tavern.customThemes";
const UI_SCALE_MIN = 0.7;
const UI_SCALE_MAX = 1.15;
const PANEL_SIZES_STORAGE_KEY = "tavern.panelSizes";
const LABS_STORAGE_KEY = "tavern.labs";
const LAUNCH_CHECKLIST_STORAGE_KEY = "tavern.launchChecklist";
const DRAFTS_STORAGE_KEY = "tavern.drafts";
const CHANNEL_NOTIFICATION_STORAGE_KEY = "tavern.channelNotifications";
const SAFE_MODE_STORAGE_KEY = "tavern.safeMode";
const LAST_ACTIVE_CHAT_STORAGE_KEY = "tavern.lastActiveChat";
const TUTORIAL_DISMISSED_STORAGE_PREFIX = "tavern.tutorialDismissed.";
const VOICE_SETTINGS_STORAGE_KEY = "tavern.voiceSettings";
const DEFAULT_VOICE_SETTINGS = {
  echoCancellation: true,
  noiseSuppression: true,
  denoiseEnabled: false,
  denoiseStrength: 40,
  eqEnabled: true,
  eqLowGain: 0,
  eqMidGain: 0,
  eqHighGain: 0,
  compactVideoTiles: true,
  videoTileScale: 0.85,
  screenShareQuality: "medium",
};
let voiceSettings = { ...DEFAULT_VOICE_SETTINGS };
let realtimeSubscriptionSyncPromise = null;
let lastRealtimeSubscriptionSyncAt = 0;
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
  fxBokeh: false,
  fxD20Turbo: false,
  fxD20Bounce: true,
  fxCosmicD20: false,
  fxSpaceCore: false,
  fxRollAnim: true,
  fxRainbowAuthor: false,
  fxScanlines: false,
  fxPanelTilt: false,
  fxUnreadShimmer: false,
  fxCommandHints: true,
  lanternColorA: "#ffd48f",
  lanternColorB: "#ff9f4d",
  bokehColorA: "#7cc6ff",
  bokehColorB: "#ffc28a",
  messageBarGlowStyle: "water",
  messageBarGlowColorA: "#5ebcff",
  messageBarGlowColorB: "#8ed9ff",
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
const ONBOARDING_TUTORIAL_STEPS = [
  {
    title: "Welcome to Tavern",
    body: "This quick tour covers the basics: spaces, channels, messaging, DMs, and settings.",
    targetSelector: ".dashboard",
  },
  {
    title: "Spaces",
    body: "Use the stack button in the sidebar header to switch spaces. The + menu lets you create a new one.",
    targetSelector: "#open-server-switcher",
  },
  {
    title: "Channels and DMs",
    body: "This panel lists channels. Click the chat bubble icon to switch into Direct Messages.",
    targetSelector: ".channels-panel",
  },
  {
    title: "Messages",
    body: "Main panel shows the conversation. Use the composer at the bottom to send messages or images.",
    targetSelector: ".messages-panel",
  },
  {
    title: "Friends",
    body: "In DM mode, open Friends to add contacts and start one-to-one conversations.",
    targetSelector: "#open-friends",
  },
  {
    title: "Settings",
    body: "Use the gear icon for profile, avatar, themes, and advanced client options.",
    targetSelector: "#settings-btn",
  },
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
let suppressNextMessageUiAutoClose = false;
let labsSettings = { ...DEFAULT_LABS_SETTINGS };
let labsUnlockClicks = 0;
let d20SpinMultiplier = 1;
let d20BounceEnabled = false;
let rollAnimationsEnabled = true;
let bokehAnimationFrame = null;
let bokehPointerTargetX = 0;
let bokehPointerTargetY = 0;
let bokehPointerX = 0;
let bokehPointerY = 0;
let bokehPointerClientX = 0;
let bokehPointerClientY = 0;
let bokehPointerActive = false;
let bokehLastTickMs = 0;
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
let sendMessageInFlight = false;
let imagePreprocessState = null;
let switcherIndex = 0;
let switcherItems = [];
let konamiIndex = 0;
let memberNicknameDrafts = new Map();
let browserNotificationPrompted = false;
const recentNotificationMessageIds = [];
const MAX_RECENT_NOTIFICATION_IDS = 300;
const latestKnownChannelMessageIds = new Map();
const latestKnownDmMessageIds = new Map();
const knownIncomingFriendRequestIds = new Set();
const knownOutgoingFriendRequestTargetIds = new Set();
const knownFriendIdsForRequestToasts = new Set();
let notificationPollTimer = null;
let notificationBaselineReady = false;
let friendRequestNotificationBaselineReady = false;
const NOTIFICATION_POLL_VISIBLE_MS = 10000;
// Keep background refresh frequent enough for timely notifications when tab is unfocused.
const NOTIFICATION_POLL_HIDDEN_MS = 30000;
const FRIEND_REQUEST_TOAST_POLL_MS = 30000;
let notificationPollInFlight = false;
let lastNotificationPollAt = 0;
let lastFriendRequestToastPollAt = 0;
const SERVICE_WORKER_URL = "/sw.js?v=20260316-musicbot2";
const PUSH_HEALTHCHECK_MS = 2 * 60 * 1000;
let pushHealthTimer = null;
let pushSelfHealInFlight = false;
let lastPushSelfHealNoticeAt = 0;
let notificationAudioContext = null;
let sessionLifecycleController = null;
const SESSION_WARNING_MS = 5 * 60 * 1000;
const SESSION_FINAL_WARNING_MS = 60 * 1000;
const SESSION_RESUME_REFRESH_THROTTLE_MS = 30 * 1000;
let lastSessionResumeRefreshAt = 0;
const REALTIME_SUBSCRIPTION_SYNC_COOLDOWN_MS = 5000;
const networkGatesApi = window.TavernNetworkGates || null;
const notificationPollGate = networkGatesApi?.createPollGate
  ? networkGatesApi.createPollGate({ minIntervalMs: 3000 })
  : null;
const realtimeSubscriptionSyncGate = networkGatesApi?.createCooldownTaskGate
  ? networkGatesApi.createCooldownTaskGate({ cooldownMs: REALTIME_SUBSCRIPTION_SYNC_COOLDOWN_MS })
  : null;
const sendReceiptByContext = new Map();
const REACTION_EMOJI_OPTIONS = ["\u{1F44D}", "\u2764\uFE0F", "\u{1F602}", "\u{1F62E}", "\u{1F622}", "\u{1F525}", "\u{1F389}", "\u2705"];

function getVersionFromUrl(urlLike) {
  if (!urlLike) return "";
  try {
    const url = new URL(urlLike, window.location.origin);
    return String(url.searchParams.get("v") || "").trim();
  } catch {
    return "";
  }
}

function detectDashboardCacheVersion() {
  const swVersion = getVersionFromUrl(SERVICE_WORKER_URL);
  if (swVersion) return swVersion;
  const scriptVersion = getVersionFromUrl(
    document.querySelector('script[src*="src/dashboard.js"]')?.getAttribute("src") || ""
  );
  if (scriptVersion) return scriptVersion;
  const manifestVersion = getVersionFromUrl(
    document.querySelector('link[rel="manifest"]')?.getAttribute("href") || ""
  );
  return manifestVersion || "";
}

function renderDashboardCacheMeta() {
  if (!cacheMetaEl) return;
  const version = detectDashboardCacheVersion();
  cacheMetaEl.textContent = version ? `cache ${version}` : "cache -";
  cacheMetaEl.title = version ? `Client cache version: ${version}` : "Client cache version unavailable";
}

const AURORA_SLATE_THEME_ID = "aurora-slate";

const THEME_PRESETS = [
  { id: "linen-light", name: "Linen Light", mode: "light", bg: "#f7f3ec", panelBg: "linear-gradient(145deg, #fffdf8, #f2ece2)", headerFooterBg: "#fffdf8", text: "#2f2a24", muted: "#72665b", accent: "#b78a56", accentStrong: "#8f6130", border: "rgba(60,45,30,0.12)", shadow: "rgba(60,45,30,0.11)" },
  { id: "graphite-light", name: "Graphite Light", mode: "light", bg: "#e7eaef", panelBg: "linear-gradient(145deg, #f4f6f9, #dde2e9)", headerFooterBg: "#edf1f6", text: "#20262f", muted: "#5f6b79", accent: "#4f8fcf", accentStrong: "#2f6fae", border: "rgba(36,52,72,0.12)", shadow: "rgba(25,39,57,0.12)" },
  { id: "dusk-medium", name: "Dusk Medium", mode: "medium", bg: "#39332e", panelBg: "linear-gradient(145deg, #4a423b, #3a332e)", headerFooterBg: "#443c36", text: "#f6efe7", muted: "#c5b7a7", accent: "#d49b6a", accentStrong: "#e9bd96", border: "rgba(235,209,181,0.16)", shadow: "rgba(0,0,0,0.26)" },
  { id: "graphite-dark", name: "Graphite Dark", mode: "dark", bg: "#0f1318", panelBg: "#151b22", headerFooterBg: "#121820", text: "#e9eef5", muted: "#9aa8b8", accent: "#4da3ff", accentStrong: "#88c4ff", border: "rgba(151,185,224,0.14)", shadow: "rgba(0,0,0,0.22)" },
];

const DEFAULT_APPEARANCE = {
  themeId: "linen-light",
  lastLightThemeId: "linen-light",
  lastMediumThemeId: "dusk-medium",
  lastDarkThemeId: "graphite-dark",
  modernUi: true,
  uiStyle: "classic",
  uiScale: 1,
  panelRadius: 16,
  messageDensity: 1,
  centerWireframeShape: "d20",
  centerGlowCoolColor: "#5ebcff",
  centerGlowVioletColor: "#7c56ff",
  centerGlowWarmColor: "#ffb56a",
  highlightChannelRows: true,
  notificationPingVolume: 1,
  pureDarkBgColor: "#0b1014",
  pureDarkPanelStartColor: "#121a22",
  pureDarkPanelEndColor: "#0d141b",
  pureDarkHeaderColor: "#101820",
  pureDarkTextColor: "#e7f0f7",
  pureDarkMutedColor: "#8ea2b3",
  pureDarkAccentColor: "#2eb8a6",
  pureDarkAccentStrongColor: "#66e0d0",
  themeAccentColor: "",
  fontFamily: "'Inter', sans-serif",
  customCss: "",
};

let appearanceSettings = { ...DEFAULT_APPEARANCE };
let customThemes = [];
let appearanceSyncTimer = null;
let appearanceSyncInFlight = false;
let appearanceSyncPending = false;
let lastAppearanceSavedSnapshot = "";
let lastAppearanceSyncedSnapshot = "";

function getAppearanceSettingsSnapshot() {
  try {
    return JSON.stringify(appearanceSettings);
  } catch {
    return "";
  }
}

function normalizeUiStyle(value) {
  return value === "boxy" ? "boxy" : "classic";
}

function normalizeThemeMode(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "dark") return "dark";
  if (normalized === "medium") return "medium";
  return "light";
}

function isDarkLikeThemeMode(mode) {
  const normalized = normalizeThemeMode(mode);
  return normalized === "dark" || normalized === "medium";
}

const CENTER_WIREFRAME_SHAPES = new Set(["d4", "d6", "d8", "d10", "d12", "d20", "sphere", "torus", "capsule", "tesseract"]);
function normalizeCenterWireframeShape(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return CENTER_WIREFRAME_SHAPES.has(normalized) ? normalized : "d20";
}

const MESSAGE_BAR_GLOW_STYLES = new Set(["water", "fire", "bubbles", "acid"]);
function normalizeMessageBarGlowStyle(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return MESSAGE_BAR_GLOW_STYLES.has(normalized) ? normalized : "water";
}

function normalizeHexColor(value, fallback = "#3ea6ff") {
  const raw = String(value || "").trim();
  const short = /^#([0-9a-fA-F]{3})$/;
  const full = /^#([0-9a-fA-F]{6})$/;
  if (full.test(raw)) return `#${raw.slice(1).toLowerCase()}`;
  const shortMatch = raw.match(short);
  if (shortMatch) {
    const [r, g, b] = shortMatch[1].split("");
    return `#${(r + r + g + g + b + b).toLowerCase()}`;
  }
  return normalizeHexColor(fallback, "#3ea6ff");
}

function hexToRgbCsv(hex, fallback = "94, 188, 255") {
  const normalized = normalizeHexColor(hex, "#5ebcff");
  const r = Number.parseInt(normalized.slice(1, 3), 16);
  const g = Number.parseInt(normalized.slice(3, 5), 16);
  const b = Number.parseInt(normalized.slice(5, 7), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return fallback;
  return `${r}, ${g}, ${b}`;
}

function normalizeOptionalHexColor(value, fallback = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return normalizeHexColor(raw, fallback || "#4f8fcf");
}

function blendHexColors(hexA, hexB, mix = 0.5) {
  const a = normalizeHexColor(hexA, "#4f8fcf");
  const b = normalizeHexColor(hexB, "#ffffff");
  const t = clamp(Number(mix), 0, 1);
  const ar = Number.parseInt(a.slice(1, 3), 16);
  const ag = Number.parseInt(a.slice(3, 5), 16);
  const ab = Number.parseInt(a.slice(5, 7), 16);
  const br = Number.parseInt(b.slice(1, 3), 16);
  const bg = Number.parseInt(b.slice(3, 5), 16);
  const bb = Number.parseInt(b.slice(5, 7), 16);
  const rr = Math.round(ar + ((br - ar) * t));
  const rg = Math.round(ag + ((bg - ag) * t));
  const rb = Math.round(ab + ((bb - ab) * t));
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(rr)}${toHex(rg)}${toHex(rb)}`;
}

function getPureDarkDefaultColors() {
  return {
    bg: "#0b1014",
    panelStart: "#121a22",
    panelEnd: "#0d141b",
    header: "#101820",
    text: "#e7f0f7",
    muted: "#8ea2b3",
    accent: "#2eb8a6",
    accentStrong: "#66e0d0",
  };
}

function resetPureDarkColors() {
  const d = getPureDarkDefaultColors();
  appearanceSettings.pureDarkBgColor = d.bg;
  appearanceSettings.pureDarkPanelStartColor = d.panelStart;
  appearanceSettings.pureDarkPanelEndColor = d.panelEnd;
  appearanceSettings.pureDarkHeaderColor = d.header;
  appearanceSettings.pureDarkTextColor = d.text;
  appearanceSettings.pureDarkMutedColor = d.muted;
  appearanceSettings.pureDarkAccentColor = d.accent;
  appearanceSettings.pureDarkAccentStrongColor = d.accentStrong;
}

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

function buildFriendInviteCode(user) {
  const username = String(user?.username || "").trim();
  const publicId = String(user?.public_id || "").trim();
  if (!username || !publicId) return "-";
  const compact = publicId.replace(/-/g, "");
  const first4 = compact.slice(0, 4);
  if (!first4) return "-";
  return `${username}:${first4}`;
}

function injectWikiLinks(rawText) {
  return String(rawText || "").replace(/\[\[([^[\]\n]+)\]\]/g, (_full, inner) => {
    const noteName = String(inner || "").trim();
    if (!noteName) return _full;
    return `[\\[\\[${noteName}\\]\\]](#note:${encodeURIComponent(noteName)})`;
  });
}

function renderMarkdown(rawText, options = {}) {
  const enableWikiLinks = Boolean(options.enableWikiLinks);
  const text = typeof rawText === "string" ? rawText : "";
  const prepared = enableWikiLinks ? injectWikiLinks(text) : text;
  if (window.marked && window.DOMPurify) {
    const markdownHtml = window.marked.parse(prepared, { gfm: true, breaks: true });
    return window.DOMPurify.sanitize(markdownHtml);
  }
  return escapeHtml(prepared).replaceAll("\n", "<br>");
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
  const toastKey = `${kind}:${message}`;
  const now = Date.now();
  if (showToast._lastKey === toastKey && now - (showToast._lastAt || 0) < 1200) return;
  showToast._lastKey = toastKey;
  showToast._lastAt = now;
  while (toastContainer.childElementCount >= 5) {
    toastContainer.firstElementChild?.remove();
  }
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
    realtimeStatusBanner.textContent = `Preflight warning: ${warnings.join(" \u00B7 ")}`;
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
    runtimeMetaEl.textContent = `v${data.version || "1.0"} \u00B7 up ${uptimeMinutes}m`;
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

function getContextKey(mode, id) {
  if (!mode || !id) return "";
  return mode === "dm" ? `dm:${id}` : `ch:${id}`;
}

function getHistoryPaging(mode, id) {
  const key = getContextKey(mode, id);
  if (!key) return null;
  let state = historyPagingByContext.get(key);
  if (!state) {
    state = { offset: 0, hasMore: true, loadingOlder: false };
    historyPagingByContext.set(key, state);
  }
  return state;
}

function resetHistoryPaging(mode, id) {
  const key = getContextKey(mode, id);
  if (!key) return;
  historyPagingByContext.set(key, { offset: 0, hasMore: true, loadingOlder: false });
}

async function maybeLoadOlderMessagesForActiveContext() {
  if (!messagesPanel || messagesPanel.scrollTop > 72) return;
  if (activeMode === "dm" && activeDmConversationId) {
    await loadDmMessages(activeDmConversationId, false, { appendOlder: true });
    return;
  }
  if (
    activeMode === "server" &&
    activeChannelId &&
    activeChannelType !== "voice" &&
    activeChannelType !== "notes"
  ) {
    await loadMessages(activeChannelId, false, { appendOlder: true });
  }
}

function getActiveContextKey() {
  if (activeMode === "dm" && activeDmConversationId) return getContextKey("dm", activeDmConversationId);
  if (activeMode === "server" && activeChannelId) return getContextKey("server", activeChannelId);
  return "";
}

function refreshSendStatusForActiveContext() {
  const key = getActiveContextKey();
  if (!key) {
    setSendStatus("", "muted");
    return;
  }
  const receipt = sendReceiptByContext.get(key);
  if (!receipt?.statusText) {
    setSendStatus("", "muted");
    return;
  }
  setSendStatus(receipt.statusText, receipt.kind || "ok");
}

function setDeliveredForContext(mode, id, payload = null) {
  const key = getContextKey(mode, id);
  if (!key) return;
  sendReceiptByContext.set(key, {
    statusText: "Delivered",
    kind: "ok",
    sentAt: Date.now(),
    messagePublicId: payload?.public_id || null,
  });
  if (key === getActiveContextKey()) setSendStatus("Delivered", "ok");
}

function markSeenForContextIfPending(mode, id, incomingUserId) {
  if (!incomingUserId || incomingUserId === currentUserId) return;
  const key = getContextKey(mode, id);
  if (!key) return;
  const receipt = sendReceiptByContext.get(key);
  if (!receipt || receipt.statusText !== "Delivered") return;
  sendReceiptByContext.set(key, {
    ...receipt,
    statusText: "Seen",
    kind: "ok",
    seenAt: Date.now(),
  });
  if (key === getActiveContextKey()) setSendStatus("Seen", "ok");
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

function canUseBrowserNotifications() {
  if (window.TavernNotificationHelpers?.canUseBrowserNotifications) {
    return window.TavernNotificationHelpers.canUseBrowserNotifications();
  }
  return typeof window !== "undefined" && "Notification" in window;
}

function isIosWebKitDevice() {
  const ua = String(navigator.userAgent || "");
  const isClassicIosUa = /iPad|iPhone|iPod/i.test(ua);
  const isIpadDesktopMode = navigator.platform === "MacIntel" && Number(navigator.maxTouchPoints || 0) > 1;
  return isClassicIosUa || isIpadDesktopMode;
}

function isStandaloneDisplayMode() {
  const standaloneMedia = typeof window.matchMedia === "function"
    ? window.matchMedia("(display-mode: standalone)").matches
    : false;
  const iosStandalone = window.navigator?.standalone === true;
  return Boolean(standaloneMedia || iosStandalone);
}

function urlBase64ToUint8Array(base64String) {
  if (window.TavernNotificationHelpers?.urlBase64ToUint8Array) {
    return window.TavernNotificationHelpers.urlBase64ToUint8Array(base64String);
  }
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerPushServiceWorker() {
  return navigator.serviceWorker.register(SERVICE_WORKER_URL, { scope: "/" });
}

async function subscribePushNotifications({ promptPermission = false } = {}) {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker is not supported on this browser.");
  }
  if (!window.isSecureContext) {
    throw new Error("Push requires HTTPS (or localhost).");
  }
  if (!canUseBrowserNotifications()) {
    throw new Error("Browser notifications are not supported.");
  }
  if (isIosWebKitDevice() && !isStandaloneDisplayMode()) {
    throw new Error("On iPhone/iPad, install Tavern to Home Screen first, then enable push from the installed app.");
  }

  await registerPushServiceWorker();
  const registration = await navigator.serviceWorker.ready;

  if (promptPermission && Notification.permission === "default") {
    await Notification.requestPermission();
  }
  if (Notification.permission !== "granted") {
    throw new Error("Notification permission is not granted.");
  }

  const keyRes = await fetch("/push/vapid-public-key", { credentials: "include" });
  if (!keyRes.ok) {
    const data = await keyRes.json().catch(() => ({}));
    throw new Error(data?.detail || "Push key endpoint unavailable.");
  }
  const keyData = await keyRes.json();
  const vapidPublicKey = String(keyData?.public_key || "");
  if (!vapidPublicKey) {
    throw new Error("Push public key is missing.");
  }

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  }
  let encoding = "aes128gcm";
  try {
    const supported = registration.pushManager?.supportedContentEncodings;
    if (Array.isArray(supported) && supported.length > 0) {
      if (supported.includes("aes128gcm")) encoding = "aes128gcm";
      else encoding = String(supported[0] || "aes128gcm");
    }
  } catch {
    // Keep default encoding.
  }
  const subscriptionPayload = { ...subscription.toJSON(), encoding };

  const subscribeRes = await fetch("/push/subscribe", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscriptionPayload),
  });
  if (!subscribeRes.ok) {
    const data = await subscribeRes.json().catch(() => ({}));
    throw new Error(data?.detail || "Push subscription failed.");
  }
}

function getClientDiagnosticsSnapshot() {
  const dashboardScriptSrc = document.querySelector('script[src*="src/dashboard.js"]')?.getAttribute("src") || "";
  const appScriptSrc = document.querySelector('script[src*="src/app.js"]')?.getAttribute("src") || "";
  const manifestHref = document.querySelector('link[rel="manifest"]')?.getAttribute("href") || "";
  const assetVersions = {
    dashboard: getVersionFromUrl(dashboardScriptSrc) || null,
    app: getVersionFromUrl(appScriptSrc) || null,
    manifest: getVersionFromUrl(manifestHref) || null,
    service_worker: getVersionFromUrl(SERVICE_WORKER_URL) || null,
  };
  const channelSocketConnected = [...wsConnectionState.channels.values()].filter((entry) => entry?.connected).length;
  const channelSocketTracked = wsConnectionState.channels.size;
  const channelSocketSummary = `${channelSockets.size} open / ${channelSocketConnected} connected / ${channelSocketTracked} tracked`;
  const notificationGateSnapshot = notificationPollGate?.getSnapshot?.() || null;
  const realtimeSyncGateSnapshot = realtimeSubscriptionSyncGate?.getSnapshot?.() || null;
  const baseSnapshot = {
    generated_at: new Date().toISOString(),
    user_agent: navigator.userAgent,
    pwa_mode: isPwaMode(),
    online: navigator.onLine,
    visibility: document.visibilityState,
    active_mode: activeMode,
    active_server_id: activeServerId || null,
    active_channel_id: activeChannelId || null,
    active_channel_type: activeChannelType || null,
    active_dm_conversation_id: activeDmConversationId || null,
    ws: {
      presence: wsConnectionState.presence,
      dm: wsConnectionState.dm,
      channel_socket_count: channelSockets.size,
      tracked_channel_states: wsConnectionState.channels.size,
      channel_socket_connected: channelSocketConnected,
      channel_socket_summary: channelSocketSummary,
    },
    notifications: {
      permission: typeof Notification !== "undefined" ? Notification.permission : "unsupported",
      poll_in_flight: notificationGateSnapshot ? !!notificationGateSnapshot.in_flight : notificationPollInFlight,
      last_poll_at: (notificationGateSnapshot?.last_run_at || lastNotificationPollAt)
        ? new Date(notificationGateSnapshot?.last_run_at || lastNotificationPollAt).toISOString()
        : null,
    },
    realtime_sync: realtimeSyncGateSnapshot ? {
      in_flight: !!realtimeSyncGateSnapshot.in_flight,
      last_run_at: realtimeSyncGateSnapshot.last_run_at ? new Date(realtimeSyncGateSnapshot.last_run_at).toISOString() : null,
      cooldown_ms: realtimeSyncGateSnapshot.cooldown_ms || REALTIME_SUBSCRIPTION_SYNC_COOLDOWN_MS,
    } : {
      in_flight: !!realtimeSubscriptionSyncPromise,
      last_run_at: lastRealtimeSubscriptionSyncAt ? new Date(lastRealtimeSubscriptionSyncAt).toISOString() : null,
      cooldown_ms: REALTIME_SUBSCRIPTION_SYNC_COOLDOWN_MS,
    },
    storage: {
      local_storage_supported: (() => {
        try {
          localStorage.getItem("tavern.diag.probe");
          return true;
        } catch {
          return false;
        }
      })(),
    },
    asset_versions: assetVersions,
  };
  if (!("serviceWorker" in navigator)) {
    return Promise.resolve({
      ...baseSnapshot,
      service_worker: {
        supported: false,
      },
    });
  }
  return navigator.serviceWorker.getRegistration().then((registration) => ({
    ...baseSnapshot,
    service_worker: {
      supported: true,
      controller_present: !!navigator.serviceWorker.controller,
      script_url: registration?.active?.scriptURL || null,
      scope: registration?.scope || null,
      state:
        registration?.active?.state
        || registration?.installing?.state
        || registration?.waiting?.state
        || "none",
      waiting: !!registration?.waiting,
      update_via_cache: registration?.updateViaCache || null,
    },
  })).catch(() => ({
    ...baseSnapshot,
    service_worker: {
      supported: true,
      error: "registration_lookup_failed",
    },
  }));
}

async function toggleRuntimeDiagnosticsPanel() {
  if (!window.TavernRuntimeDiagnostics?.toggle) {
    showToast("Diagnostics panel module not loaded");
    return;
  }
  await window.TavernRuntimeDiagnostics.toggle({
    getSnapshot: getClientDiagnosticsSnapshot,
    loadServerHealth: async () => {
      const [healthRes, versionRes] = await Promise.all([
        fetch("/health", { credentials: "include" }),
        fetch("/api/version", { credentials: "include" }),
      ]);
      if (!healthRes.ok) throw new Error(`Health request failed (${healthRes.status})`);
      const health = await healthRes.json();
      const version = versionRes.ok ? await versionRes.json() : { error: `HTTP ${versionRes.status}` };
      return { health, version };
    },
  });
}

async function refreshConnectionsSettingsPanel() {
  const snapshot = await getClientDiagnosticsSnapshot();
  if (settingsConnectionsOnline) settingsConnectionsOnline.textContent = snapshot.online ? "Yes" : "No";
  if (settingsConnectionsVisibility) settingsConnectionsVisibility.textContent = snapshot.visibility || "-";
  if (settingsConnectionsChannelSockets) settingsConnectionsChannelSockets.textContent = snapshot.ws?.channel_socket_summary || String(snapshot.ws?.channel_socket_count ?? "-");
  if (settingsConnectionsPollStatus) {
    settingsConnectionsPollStatus.textContent = snapshot.notifications?.poll_in_flight ? "Running" : "Idle";
  }
  if (settingsConnectionsLastPoll) {
    settingsConnectionsLastPoll.textContent = snapshot.notifications?.last_poll_at
      ? formatTimestamp(snapshot.notifications.last_poll_at)
      : "Never";
  }
  if (settingsConnectionsAssetVersions) {
    const versions = snapshot.asset_versions || {};
    settingsConnectionsAssetVersions.textContent = `dash:${versions.dashboard || "-"} app:${versions.app || "-"} manifest:${versions.manifest || "-"} sw:${versions.service_worker || "-"}`;
  }
  if (settingsConnectionsSwState) {
    const sw = snapshot.service_worker || {};
    if (!sw.supported) settingsConnectionsSwState.textContent = "Unsupported";
    else if (sw.error) settingsConnectionsSwState.textContent = `Error (${sw.error})`;
    else settingsConnectionsSwState.textContent = `${sw.state || "none"}${sw.waiting ? " (update waiting)" : ""}`;
  }
  if (settingsConnectionsHealthJson) settingsConnectionsHealthJson.textContent = "Loading /health...";
  try {
    const [healthRes, versionRes] = await Promise.all([
      fetch("/health", { credentials: "include" }),
      fetch("/api/version", { credentials: "include" }),
    ]);
    if (!healthRes.ok) throw new Error(`HTTP ${healthRes.status}`);
    const health = await healthRes.json();
    const version = versionRes.ok ? await versionRes.json() : { error: `HTTP ${versionRes.status}` };
    if (settingsConnectionsHealthJson) settingsConnectionsHealthJson.textContent = JSON.stringify({ health, version }, null, 2);
  } catch (err) {
    if (settingsConnectionsHealthJson) {
      settingsConnectionsHealthJson.textContent = `Failed to load /health: ${err?.message || "Unknown error"}`;
    }
  }
}

async function refreshPushButtonState() {
  if (!settingsEnablePushBtn) return;
  if (!("serviceWorker" in navigator) || !canUseBrowserNotifications()) {
    settingsEnablePushBtn.disabled = true;
    settingsEnablePushBtn.textContent = "Push Unsupported";
    return;
  }
  if (!window.isSecureContext) {
    settingsEnablePushBtn.disabled = true;
    settingsEnablePushBtn.textContent = "Push Needs HTTPS";
    return;
  }
  if (isIosWebKitDevice() && !isStandaloneDisplayMode()) {
    settingsEnablePushBtn.disabled = true;
    settingsEnablePushBtn.textContent = "Install PWA For iOS Push";
    settingsEnablePushBtn.title = "iOS only allows web push from Home Screen installed web apps.";
    return;
  }
  settingsEnablePushBtn.title = "";
  settingsEnablePushBtn.disabled = false;
  if (Notification.permission === "denied") {
    settingsEnablePushBtn.textContent = "Push Blocked (Browser Settings)";
    return;
  }
  if (Notification.permission !== "granted") {
    settingsEnablePushBtn.textContent = "Enable Push Notifications";
    return;
  }
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = registration ? await registration.pushManager.getSubscription() : null;
    settingsEnablePushBtn.textContent = subscription ? "Push Enabled" : "Enable Push Notifications";
  } catch {
    settingsEnablePushBtn.textContent = "Enable Push Notifications";
  }
}

async function ensurePushSubscriptionHealthy({ silent = true } = {}) {
  if (pushSelfHealInFlight) return false;
  if (!("serviceWorker" in navigator) || !canUseBrowserNotifications() || !window.isSecureContext) {
    return false;
  }
  if (Notification.permission !== "granted") {
    return false;
  }
  pushSelfHealInFlight = true;
  try {
    await subscribePushNotifications({ promptPermission: false });
    refreshPushButtonState();
    return true;
  } catch {
    if (!silent) {
      showToast("Push health check failed. Re-enable push in Settings.");
    }
    return false;
  } finally {
    pushSelfHealInFlight = false;
  }
}

function startPushHealthChecks() {
  if (pushHealthTimer) clearInterval(pushHealthTimer);
  pushHealthTimer = setInterval(() => {
    if (document.hidden) return;
    ensurePushSubscriptionHealthy({ silent: true }).catch(() => {});
  }, PUSH_HEALTHCHECK_MS);
}

function maybeNotifyPushPermissionRevoked() {
  return;
}

function requestBrowserNotificationPermission() {
  if (!canUseBrowserNotifications()) return;
  if (browserNotificationPrompted) return;
  browserNotificationPrompted = true;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {
      // Ignore permission API failures
    });
  }
}

function getNotificationPreviewText(rawText) {
  const text = String(rawText || "").replace(/\s+/g, " ").trim();
  if (!text) return "(no text)";
  return text.length > 140 ? `${text.slice(0, 140)}...` : text;
}

function wasMessageNotified(publicId) {
  if (!publicId) return false;
  return recentNotificationMessageIds.includes(publicId);
}

function markMessageNotified(publicId) {
  if (!publicId) return;
  if (wasMessageNotified(publicId)) return;
  recentNotificationMessageIds.push(publicId);
  if (recentNotificationMessageIds.length > MAX_RECENT_NOTIFICATION_IDS) {
    recentNotificationMessageIds.splice(0, recentNotificationMessageIds.length - MAX_RECENT_NOTIFICATION_IDS);
  }
}

function navigateToNotificationContext(mode, contextId) {
  if (mode === "server" && contextId) {
    const channelEl = channelsPanel?.querySelector(`.channel-item[data-channel-id="${contextId}"]`);
    if (channelEl) channelEl.click();
    return;
  }
  if (mode === "dm" && contextId) {
    const dmEl = channelsPanel?.querySelector(`.dm-item[data-dm-conversation-id="${contextId}"]`);
    if (dmEl) dmEl.click();
  }
}

function isBrowserFocusedForNotifications() {
  if (window.TavernNotificationHelpers?.isBrowserFocusedForNotifications) {
    return window.TavernNotificationHelpers.isBrowserFocusedForNotifications();
  }
  if (isDesktopTauriRuntime()) {
    return desktopWindowLikelyFocused;
  }
  const visible = !document.hidden && document.visibilityState === "visible";
  if (!visible) return false;
  return document.hasFocus();
}

function isPwaMode() {
  if (window.TavernSessionHelpers?.isPwaMode) {
    return window.TavernSessionHelpers.isPwaMode();
  }
  const isStandaloneDisplay =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  const isIosStandalone = window.navigator?.standalone === true;
  return Boolean(isStandaloneDisplay || isIosStandalone);
}

function applyDesktopRuntimeUiTweaks() {
  if (!isDesktopTauriRuntime()) return;
  if (settingsEnablePushBtn) {
    settingsEnablePushBtn.hidden = true;
    settingsEnablePushBtn.disabled = true;
    settingsEnablePushBtn.title = "Web Push is disabled in the desktop client. Use desktop notifications instead.";
  }
}

function setupDesktopExternalLinkGuard() {
  if (!isDesktopTauriRuntime()) return;
  document.addEventListener("click", async (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target?.closest?.("a[href]");
    if (!link) return;
    const rawHref = link.getAttribute("href") || "";
    if (!/^https?:/i.test(rawHref)) return;
    let url;
    try {
      url = new URL(rawHref, window.location.href);
    } catch {
      return;
    }
    if (url.origin === window.location.origin) return;
    event.preventDefault();
    event.stopPropagation();
    const opened = await invokeDesktopCommand("desktop_open_external_url", { url: url.href });
    if (opened?.ok && opened.value === true) return;
    try {
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch {
      showToast("Could not open external link");
    }
  }, true);
}

function playNotificationPing() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!notificationAudioContext) {
      notificationAudioContext = new AudioCtx();
    }
    if (notificationAudioContext.state === "suspended") {
      notificationAudioContext.resume().catch(() => {});
    }
    const ctx = notificationAudioContext;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const volumeScale = clamp(Number(appearanceSettings.notificationPingVolume), 0, 2);
    const peakGain = Math.max(0.0001, 0.09 * volumeScale);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Best-effort notification sound.
  }
}

async function showBrowserNotification(title, body, tag, contextUrl) {
  if (await showDesktopNativeNotification(title, body)) {
    return true;
  }
  if (!canUseBrowserNotifications() || !window.isSecureContext || Notification.permission !== "granted") {
    return false;
  }

  // Prefer Service Worker notifications for better PWA behavior.
  if ("serviceWorker" in navigator) {
    try {
      let registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        registration = await registerPushServiceWorker();
      }
      if (registration && typeof registration.showNotification === "function") {
        await registration.showNotification(title, {
          body,
          tag,
          data: { url: contextUrl || "/dashboard" },
          icon: "/favicon.svg",
          badge: "/favicon.svg",
        });
        return true;
      }
    } catch {
      // Fallback to window Notification below.
    }
  }

  try {
    const note = new Notification(title, { body, tag });
    note.onclick = () => {
      window.focus();
      if (contextUrl) {
        window.location.hash = contextUrl.includes("#") ? contextUrl.split("#")[1] || "" : "";
      }
      note.close();
    };
    return true;
  } catch {
    return false;
  }
}

function getTauriCoreInvoke() {
  try {
    const direct = window?.__TAURI__?.core?.invoke;
    if (typeof direct === "function") return direct;
    const internals = window?.__TAURI_INTERNALS__?.invoke;
    if (typeof internals === "function") {
      return (command, payload) => internals(command, payload);
    }
    const legacy = window?.__TAURI_INVOKE__;
    if (typeof legacy === "function") {
      return (command, payload) => legacy(command, payload);
    }
    return null;
  } catch {
    return null;
  }
}

function isDesktopTauriRuntime() {
  return Boolean(getTauriCoreInvoke());
}

async function invokeDesktopCommand(command, payload) {
  const invoke = getTauriCoreInvoke();
  if (!invoke) return { ok: false, value: null };
  try {
    return { ok: true, value: await invoke(command, payload || {}) };
  } catch (err) {
    try {
      console.warn("[Tavern desktop] invoke failed", command, err);
    } catch {}
    return { ok: false, value: null };
  }
}

async function showDesktopNativeNotification(title, body) {
  if (!isDesktopTauriRuntime()) return false;
  const safeTitle = String(title || "Tavern");
  const safeBody = String(body || "");
  await primeDesktopNotificationBridge();
  const pluginShown = await invokeDesktopCommand("plugin:notification|notify", {
    options: {
      title: safeTitle,
      body: safeBody,
    },
  });
  if (pluginShown?.ok) return true;

  const result = await invokeDesktopCommand("desktop_notify", {
    title: safeTitle,
    body: safeBody,
  });
  return result?.ok && result.value === true;
}

let desktopUpdateCheckStarted = false;
let desktopUpdateCheckNotifiedVersion = null;
let desktopNotificationBridgePrimed = false;
let desktopWindowLikelyFocused = true;
async function primeDesktopNotificationBridge() {
  if (desktopNotificationBridgePrimed) return true;
  if (!isDesktopTauriRuntime()) return false;
  const perm = await invokeDesktopCommand("plugin:notification|is_permission_granted", {});
  if (!perm?.ok) return false;
  if (perm.value == null) {
    await invokeDesktopCommand("plugin:notification|request_permission", {});
  }
  desktopNotificationBridgePrimed = true;
  return true;
}

async function maybeCheckDesktopWrapperUpdate() {
  if (desktopUpdateCheckStarted) return;
  desktopUpdateCheckStarted = true;
  if (!isDesktopTauriRuntime()) return;
  const result = await invokeDesktopCommand("desktop_check_for_updates", {});
  if (!result?.ok || !result.value || result.value.supported !== true || result.value.available !== true) return;
  const version = String(result.value.version || "").trim();
  if (!version || desktopUpdateCheckNotifiedVersion === version) return;
  desktopUpdateCheckNotifiedVersion = version;
  showToast(`Desktop app update available: ${version}`);
  showDesktopNativeNotification("Tavern Client Update Available", `Version ${version} is available. Install the updated client when convenient.`).catch(() => {});
}

function emitIncomingMessageNotification(mode, contextId, payload) {
  if (!payload || payload.user_id === currentUserId) return;
  if (wasMessageNotified(payload.public_id)) return;

  let title = "New message";
  if (mode === "server") {
    const channelName = channelNameById.get(contextId) || "channel";
    title = `#${channelName} \u00B7 ${payload.username || "Someone"}`;
  } else {
    title = `DM \u00B7 ${payload.username || "Someone"}`;
  }
  const body = getNotificationPreviewText(payload.content);
  const contextUrl =
    mode === "server"
      ? `/dashboard#channel=${contextId}&message=${payload.public_id || ""}`
      : `/dashboard#dm=${contextId}&message=${payload.public_id || ""}`;

  const isFocused = isBrowserFocusedForNotifications();
  if (isFocused) {
    showToast(`${title}: ${body}`);
    playNotificationPing();
  } else {
    showBrowserNotification(
      title,
      body,
      `tavern-msg-${payload.public_id || Date.now()}`,
      contextUrl
    ).then((shown) => {
      if (!shown) {
        showToast(`${title}: ${body}`);
        playNotificationPing();
      }
    }).catch(() => {
      showToast(`${title}: ${body}`);
      playNotificationPing();
    });
  }

  markMessageNotified(payload.public_id);
}

function cacheLatestMessageId(mode, contextId, payload) {
  if (!contextId || !payload?.public_id) return;
  if (mode === "server") {
    latestKnownChannelMessageIds.set(contextId, payload.public_id);
    return;
  }
  latestKnownDmMessageIds.set(contextId, payload.public_id);
}

async function pollNotificationFallback({ force = false } = {}) {
  if (!currentUserId) return;
  if (notificationPollGate) {
    if (!notificationPollGate.start({ force })) return;
    const snap = notificationPollGate.getSnapshot();
    notificationPollInFlight = !!snap.in_flight;
    lastNotificationPollAt = snap.last_run_at || lastNotificationPollAt;
  } else {
    if (notificationPollInFlight) return;
    const now = Date.now();
    if (!force && now - lastNotificationPollAt < 3000) return;
    notificationPollInFlight = true;
    lastNotificationPollAt = now;
  }
  try {
    const channelIds = [...channelToServer.keys()];
    const channelResults = await Promise.allSettled(
      channelIds.map(async (channelId) => {
        const res = await fetch(`/messages/${channelId}?limit=1`, { credentials: "include" });
        if (!res.ok) return null;
        const rows = await res.json();
        const latest = rows?.[rows.length - 1];
        return latest?.public_id ? { channelId, latest } : null;
      })
    );
    for (const result of channelResults) {
      if (result.status !== "fulfilled" || !result.value) continue;
      const { channelId, latest } = result.value;
      const previousId = latestKnownChannelMessageIds.get(channelId);
      cacheLatestMessageId("server", channelId, latest);
      if (!notificationBaselineReady) continue;
      if (!previousId || previousId === latest.public_id) continue;
      if (latest.user_id === currentUserId) continue;
      if (!shouldNotifyForMessage(channelId, latest)) continue;
      emitIncomingMessageNotification("server", channelId, latest);
      if (channelId !== activeChannelId) {
        unreadChannels.add(channelId);
        const serverId = channelToServer.get(channelId);
        if (serverId) unreadServers.add(serverId);
        applyUnreadStyles();
      }
    }

    const dmRes = await fetch("/dms/", { credentials: "include" });
    if (dmRes.ok) {
      const conversations = await dmRes.json();
      const dmResults = await Promise.allSettled(
        (conversations || [])
          .filter((convo) => !!convo?.public_id)
          .map(async (convo) => {
            const conversationId = convo.public_id;
            const msgRes = await fetch(`/dms/${conversationId}/messages?limit=1`, { credentials: "include" });
            if (!msgRes.ok) return null;
            const rows = await msgRes.json();
            const latest = rows?.[rows.length - 1];
            return latest?.public_id ? { conversationId, latest } : null;
          })
      );
      for (const result of dmResults) {
        if (result.status !== "fulfilled" || !result.value) continue;
        const { conversationId, latest } = result.value;
        const previousId = latestKnownDmMessageIds.get(conversationId);
        cacheLatestMessageId("dm", conversationId, latest);
        if (!notificationBaselineReady) continue;
        if (!previousId || previousId === latest.public_id) continue;
        if (latest.user_id === currentUserId) continue;
        emitIncomingMessageNotification("dm", conversationId, latest);
      }
    }

    const friendPollNow = Date.now();
    if (force || friendPollNow - lastFriendRequestToastPollAt >= FRIEND_REQUEST_TOAST_POLL_MS) {
      lastFriendRequestToastPollAt = friendPollNow;
      const [friendReqRes, friendsRes] = await Promise.all([
        fetch("/users/friend-requests", { credentials: "include" }),
        fetch("/users/friends", { credentials: "include" }),
      ]);
      if (friendReqRes.ok) {
        const friendReqData = await friendReqRes.json();
        const incomingRequests = Array.isArray(friendReqData?.incoming) ? friendReqData.incoming : [];
        const outgoingRequests = Array.isArray(friendReqData?.outgoing) ? friendReqData.outgoing : [];
        const nextIncomingIds = new Set();
        const nextOutgoingTargetIds = new Set();
        for (const req of incomingRequests) {
          const reqId = String(req?.public_id || "");
          if (!reqId) continue;
          nextIncomingIds.add(reqId);
          if (!friendRequestNotificationBaselineReady) continue;
          if (knownIncomingFriendRequestIds.has(reqId)) continue;
          const fromUser = String(req?.requester_username || "Someone");
          showToast(`Friend request from ${fromUser}`);
          playNotificationPing();
        }
        for (const req of outgoingRequests) {
          const targetId = String(req?.addressee_public_id || "");
          if (targetId) nextOutgoingTargetIds.add(targetId);
        }

        let currentFriends = [];
        if (friendsRes.ok) {
          try {
            currentFriends = await friendsRes.json();
          } catch {
            currentFriends = [];
          }
        }
        const nextFriendIds = new Set();
        const safeFriends = Array.isArray(currentFriends) ? currentFriends : [];
        for (const friend of safeFriends) {
          const friendId = String(friend?.public_id || "");
          if (!friendId) continue;
          nextFriendIds.add(friendId);
          if (!friendRequestNotificationBaselineReady) continue;
          if (knownFriendIdsForRequestToasts.has(friendId)) continue;
          if (!knownOutgoingFriendRequestTargetIds.has(friendId)) continue;
          showToast(`Friend request accepted by ${friend?.username || "friend"}`);
          playNotificationPing();
        }

        knownIncomingFriendRequestIds.clear();
        nextIncomingIds.forEach((id) => knownIncomingFriendRequestIds.add(id));
        knownOutgoingFriendRequestTargetIds.clear();
        nextOutgoingTargetIds.forEach((id) => knownOutgoingFriendRequestTargetIds.add(id));
        knownFriendIdsForRequestToasts.clear();
        nextFriendIds.forEach((id) => knownFriendIdsForRequestToasts.add(id));
      }
    }
  } catch {
    // Best-effort fallback; websocket path remains primary.
  } finally {
    notificationBaselineReady = true;
    friendRequestNotificationBaselineReady = true;
    if (notificationPollGate) {
      notificationPollGate.end();
      const snap = notificationPollGate.getSnapshot();
      notificationPollInFlight = !!snap.in_flight;
      lastNotificationPollAt = snap.last_run_at || lastNotificationPollAt;
    } else {
      notificationPollInFlight = false;
    }
  }
}

function startNotificationFallbackPolling({ resetBaseline = false } = {}) {
  if (notificationPollTimer) clearInterval(notificationPollTimer);
  if (resetBaseline) {
    notificationBaselineReady = false;
    friendRequestNotificationBaselineReady = false;
    knownIncomingFriendRequestIds.clear();
    knownOutgoingFriendRequestTargetIds.clear();
    knownFriendIdsForRequestToasts.clear();
    lastFriendRequestToastPollAt = 0;
  }
  pollNotificationFallback({ force: true }).catch(() => {});
  const interval = document.hidden ? NOTIFICATION_POLL_HIDDEN_MS : NOTIFICATION_POLL_VISIBLE_MS;
  notificationPollTimer = setInterval(() => {
    pollNotificationFallback().catch(() => {});
  }, interval);
}

function getSessionLifecycleController() {
  if (sessionLifecycleController) return sessionLifecycleController;

  if (window.TavernSessionLifecycle?.createSessionLifecycleController) {
    sessionLifecycleController = window.TavernSessionLifecycle.createSessionLifecycleController({
      showToast,
      isPwaMode,
      fetchSessionStatus: async () => {
        const res = await fetch("/auth/session", { credentials: "include" });
        if (!res.ok) throw new Error("Session check failed");
        return res.json();
      },
      refreshSessionStatus: async () => {
        const res = await fetch("/auth/refresh", { method: "POST", credentials: "include" });
        if (!res.ok) throw new Error("Session refresh failed");
        return res.json();
      },
      warningMs: SESSION_WARNING_MS,
      finalWarningMs: SESSION_FINAL_WARNING_MS,
    });
    return sessionLifecycleController;
  }

  // Fallback no-op controller when module cannot be loaded.
  sessionLifecycleController = {
    clear() {},
    schedule() {},
    async start() {},
  };
  return sessionLifecycleController;
}

function clearSessionLifecycleTimers() {
  getSessionLifecycleController().clear();
}

async function fetchSessionStatus() {
  const res = await originalWindowFetch(resolveApiUrl("/auth/session"), {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Session check failed");
  return res.json();
}

async function refreshSessionStatus() {
  const res = await originalWindowFetch(resolveApiUrl("/auth/refresh"), {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    keepalive: true,
  });
  if (!res.ok) throw new Error("Session refresh failed");
  return res.json();
}

function scheduleSessionLifecycle(expiresInSeconds) {
  getSessionLifecycleController().schedule(expiresInSeconds);
}

async function startSessionLifecycle() {
  await getSessionLifecycleController().start();
}

async function refreshSessionOnAppResume({ force = false } = {}) {
  const now = Date.now();
  if (!force && (now - lastSessionResumeRefreshAt) < SESSION_RESUME_REFRESH_THROTTLE_MS) return;
  lastSessionResumeRefreshAt = now;
  try {
    const session = await refreshSessionStatus();
    if (session?.expires_in_seconds != null) scheduleSessionLifecycle(session.expires_in_seconds);
  } catch {
    // Best-effort only. Auth redirect stays owned by regular API flow.
  }
}

function handleServiceWorkerPushMessage(event) {
  const msgType = event?.data?.type;
  const payload = event?.data?.payload;
  if (msgType !== "push_message" || !payload || payload.type !== "message_created") return;

  const mode = payload.mode === "dm" ? "dm" : "server";
  const contextId = mode === "dm" ? payload.conversation_public_id : payload.channel_public_id;
  if (!contextId) return;

  emitIncomingMessageNotification(mode, contextId, {
    public_id: payload.message_public_id || payload.public_id || "",
    content: payload.content || payload.body || "",
    username: payload.username || "Someone",
    // Push is sent only to recipients, so use a non-self marker.
    user_id: -1,
  });
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

function getFirstThemeByMode(mode, fallbackId = "") {
  const targetMode = normalizeThemeMode(mode);
  return getAllThemes().find((preset) => normalizeThemeMode(preset.mode) === targetMode)?.id || fallbackId;
}

function cycleThemeMode() {
  const currentId = String(appearanceSettings.themeId || "");
  const currentPreset = getThemeById(currentId);
  const mode = normalizeThemeMode(currentPreset.mode);
  let nextId = "";
  if (mode === "light") {
    nextId = String(
      appearanceSettings.lastMediumThemeId
      || getFirstThemeByMode("medium", DEFAULT_APPEARANCE.lastMediumThemeId)
      || DEFAULT_APPEARANCE.lastMediumThemeId
    );
  } else if (mode === "medium") {
    nextId = String(
      appearanceSettings.lastDarkThemeId
      || getFirstThemeByMode("dark", DEFAULT_APPEARANCE.lastDarkThemeId)
      || DEFAULT_APPEARANCE.lastDarkThemeId
    );
  } else {
    nextId = String(
      appearanceSettings.lastLightThemeId
      || getFirstThemeByMode("light", DEFAULT_APPEARANCE.lastLightThemeId)
      || DEFAULT_APPEARANCE.lastLightThemeId
    );
  }

  if (!getAllThemes().some((preset) => preset.id === nextId) || nextId === currentId) {
    const order = ["linen-light", "dusk-medium", "graphite-dark"];
    const idx = order.indexOf(currentId);
    nextId = order[(idx >= 0 ? idx + 1 : 0) % order.length];
  }

  appearanceSettings.themeId = nextId;
  const appliedPreset = getThemeById(nextId);
  const appliedMode = normalizeThemeMode(appliedPreset.mode);
  if (appliedMode === "medium") appearanceSettings.lastMediumThemeId = appliedPreset.id;
  else if (appliedMode === "dark") appearanceSettings.lastDarkThemeId = appliedPreset.id;
  else appearanceSettings.lastLightThemeId = appliedPreset.id;

  applyAppearanceSettings();
  saveAppearanceSettings();
  renderThemePresetGrid();
  updateAppearanceControlValues();
}

function serializeSettingsBundle() {
  return {
    version: 1,
    exported_at: new Date().toISOString(),
    appearance: appearanceSettings,
    customThemes,
    panelSizes,
    labs: labsSettings,
    voice: voiceSettings,
    drafts: draftsState,
    channelNotifications: channelNotificationState,
    safeModeEnabled,
  };
}

function applySettingsBundle(bundle) {
  if (!bundle || typeof bundle !== "object") throw new Error("Invalid settings bundle.");
  if (bundle.appearance && typeof bundle.appearance === "object") {
    appearanceSettings = { ...DEFAULT_APPEARANCE, ...bundle.appearance };
    if (appearanceSettings.themeId === "pure-dark-modern") {
      appearanceSettings.themeId = DEFAULT_APPEARANCE.lastDarkThemeId;
    }
    if (appearanceSettings.lastDarkThemeId === "pure-dark-modern") {
      appearanceSettings.lastDarkThemeId = DEFAULT_APPEARANCE.lastDarkThemeId;
    }
    appearanceSettings.uiScale = clamp(Number(appearanceSettings.uiScale), UI_SCALE_MIN, UI_SCALE_MAX);
    appearanceSettings.notificationPingVolume = clamp(
      Number(appearanceSettings.notificationPingVolume),
      0,
      2
    );
    appearanceSettings.themeAccentColor = normalizeOptionalHexColor(appearanceSettings.themeAccentColor);
    if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastMediumThemeId)) {
      appearanceSettings.lastMediumThemeId = DEFAULT_APPEARANCE.lastMediumThemeId;
    }
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
  if (bundle.voice && typeof bundle.voice === "object") {
    voiceSettings = normalizeVoiceSettings(bundle.voice);
    saveVoiceSettings();
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
  updateVoiceControlValues();
  applySafeModeState();
  applyDraftToComposer();
}

function setupNotificationPermissionPrompt() {
  if (isIosWebKitDevice() && !isStandaloneDisplayMode()) {
    return;
  }
  const handleFirstInteraction = async () => {
    requestBrowserNotificationPermission();
    try {
      await subscribePushNotifications({ promptPermission: false });
    } catch {
      // Best-effort on first interaction; explicit settings button can retry.
    }
  };
  document.addEventListener("click", handleFirstInteraction, { once: true });
  document.addEventListener("keydown", handleFirstInteraction, { once: true });
}

function buildQuickSwitcherItems(query = "") {
  const q = query.trim().toLowerCase();
  const items = [];
  document.querySelectorAll(".server-item").forEach((el) => {
    const label = el.dataset.serverName || "Server";
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({ type: "server", label: `Server \u00B7 ${label}`, onSelect: () => el.click() });
  });
  document.querySelectorAll(".channel-item").forEach((el) => {
    const label = el.dataset.channelName || el.textContent || "Channel";
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({ type: "channel", label: `Channel \u00B7 ${label}`, onSelect: () => el.click() });
  });
  friendsCache.forEach((friend) => {
    const label = `${friend.username} (${friend.public_id})`;
    if (q && !label.toLowerCase().includes(q)) return;
    items.push({
      type: "user",
      label: `User \u00B7 ${label}`,
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

async function optimizeAvatarFile(file) {
  if (!file) return file;
  const maxSide = 512;
  const targetBytes = 900 * 1024;
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
  const sourceW = Math.max(1, Number(img.width) || 1);
  const sourceH = Math.max(1, Number(img.height) || 1);
  const scale = Math.min(1, maxSide / Math.max(sourceW, sourceH));
  const width = Math.max(1, Math.round(sourceW * scale));
  const height = Math.max(1, Math.round(sourceH * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.9;
  let blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  while (blob && blob.size > targetBytes && quality > 0.55) {
    quality -= 0.1;
    blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  }
  if (!blob) return file;
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}_avatar.jpg`, { type: "image/jpeg" });
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
  labsSettings.lanternColorA = normalizeHexColor(labsSettings.lanternColorA, DEFAULT_LABS_SETTINGS.lanternColorA);
  labsSettings.lanternColorB = normalizeHexColor(labsSettings.lanternColorB, DEFAULT_LABS_SETTINGS.lanternColorB);
  labsSettings.bokehColorA = normalizeHexColor(labsSettings.bokehColorA, DEFAULT_LABS_SETTINGS.bokehColorA);
  labsSettings.bokehColorB = normalizeHexColor(labsSettings.bokehColorB, DEFAULT_LABS_SETTINGS.bokehColorB);
  labsSettings.messageBarGlowStyle = normalizeMessageBarGlowStyle(labsSettings.messageBarGlowStyle);
  labsSettings.messageBarGlowColorA = normalizeHexColor(
    labsSettings.messageBarGlowColorA,
    DEFAULT_LABS_SETTINGS.messageBarGlowColorA
  );
  labsSettings.messageBarGlowColorB = normalizeHexColor(
    labsSettings.messageBarGlowColorB,
    DEFAULT_LABS_SETTINGS.messageBarGlowColorB
  );
}

function saveLabsSettings() {
  try {
    localStorage.setItem(LABS_STORAGE_KEY, JSON.stringify(labsSettings));
  } catch {
    // Ignore storage failures
  }
}

function normalizeVoiceSettings(rawSettings) {
  const raw = rawSettings && typeof rawSettings === "object" ? rawSettings : {};
  return {
    echoCancellation: Boolean(raw.echoCancellation ?? DEFAULT_VOICE_SETTINGS.echoCancellation),
    noiseSuppression: Boolean(raw.noiseSuppression ?? DEFAULT_VOICE_SETTINGS.noiseSuppression),
    denoiseEnabled: Boolean(raw.denoiseEnabled ?? DEFAULT_VOICE_SETTINGS.denoiseEnabled),
    denoiseStrength: clamp(Number(raw.denoiseStrength ?? DEFAULT_VOICE_SETTINGS.denoiseStrength), 0, 100),
    eqEnabled: Boolean(raw.eqEnabled ?? DEFAULT_VOICE_SETTINGS.eqEnabled),
    eqLowGain: clamp(Number(raw.eqLowGain ?? DEFAULT_VOICE_SETTINGS.eqLowGain), -12, 12),
    eqMidGain: clamp(Number(raw.eqMidGain ?? DEFAULT_VOICE_SETTINGS.eqMidGain), -12, 12),
    eqHighGain: clamp(Number(raw.eqHighGain ?? DEFAULT_VOICE_SETTINGS.eqHighGain), -12, 12),
    compactVideoTiles: Boolean(raw.compactVideoTiles ?? DEFAULT_VOICE_SETTINGS.compactVideoTiles),
    videoTileScale: clamp(Number(raw.videoTileScale ?? DEFAULT_VOICE_SETTINGS.videoTileScale), 0.7, 1.4),
    screenShareQuality: getNormalizedScreenShareQuality(raw.screenShareQuality ?? DEFAULT_VOICE_SETTINGS.screenShareQuality),
  };
}

function getNormalizedScreenShareQuality(value) {
  const quality = String(value || "").toLowerCase();
  if (quality === "low" || quality === "high" || quality === "ultra") return quality;
  return "medium";
}

function getScreenShareVideoConstraints() {
  const quality = getNormalizedScreenShareQuality(voiceSettings.screenShareQuality);
  if (quality === "low") {
    return {
      width: { ideal: 960, max: 960 },
      height: { ideal: 540, max: 540 },
      frameRate: { ideal: 10, max: 12 },
    };
  }
  if (quality === "high") {
    return {
      width: { ideal: 1920, max: 1920 },
      height: { ideal: 1080, max: 1080 },
      frameRate: { ideal: 24, max: 30 },
    };
  }
  if (quality === "ultra") {
    return {
      width: { ideal: 1920, max: 1920 },
      height: { ideal: 1080, max: 1080 },
      frameRate: { ideal: 60, max: 60 },
    };
  }
  return {
    width: { ideal: 1280, max: 1280 },
    height: { ideal: 720, max: 720 },
    frameRate: { ideal: 15, max: 20 },
  };
}

function getScreenShareAudioConstraints() {
  // Browser-specific hints for tab/system audio capture support.
  return {
    echoCancellation: false,
    noiseSuppression: false,
    autoGainControl: false,
    suppressLocalAudioPlayback: false,
    systemAudio: "include",
    selfBrowserSurface: "include",
  };
}

function loadVoiceSettings() {
  try {
    const raw = localStorage.getItem(VOICE_SETTINGS_STORAGE_KEY);
    voiceSettings = normalizeVoiceSettings(JSON.parse(raw || "{}"));
  } catch {
    voiceSettings = { ...DEFAULT_VOICE_SETTINGS };
  }
}

function saveVoiceSettings() {
  try {
    localStorage.setItem(VOICE_SETTINGS_STORAGE_KEY, JSON.stringify(voiceSettings));
  } catch {
    // Ignore storage failures
  }
}

function applyVoiceVideoTileLayoutSettings() {
  if (!voicePanel) return;
  const scale = clamp(Number(voiceSettings.videoTileScale ?? 1), 0.7, 1.4);
  const compact = !!voiceSettings.compactVideoTiles;
  const minColBase = compact ? 112 : 140;
  const minHeightBase = compact ? 70 : 90;
  const maxWidthBase = compact ? 180 : 240;
  const gridMaxHeight = compact ? "min(20vh, 160px)" : "min(26vh, 220px)";
  voicePanel.style.setProperty("--voice-video-grid-min-col", `${Math.round(minColBase * scale)}px`);
  voicePanel.style.setProperty("--voice-video-tile-min-height", `${Math.round(minHeightBase * scale)}px`);
  voicePanel.style.setProperty("--voice-video-tile-max-width", `${Math.round(maxWidthBase * scale)}px`);
  voicePanel.style.setProperty("--voice-video-grid-max-height", gridMaxHeight);
}

function updateVoiceControlValues() {
  if (settingsVoiceEchoCancellationInput) settingsVoiceEchoCancellationInput.checked = !!voiceSettings.echoCancellation;
  if (settingsVoiceNoiseSuppressionInput) settingsVoiceNoiseSuppressionInput.checked = !!voiceSettings.noiseSuppression;
  if (settingsVoiceDenoiseEnabledInput) settingsVoiceDenoiseEnabledInput.checked = !!voiceSettings.denoiseEnabled;
  if (settingsVoiceDenoiseStrengthInput) settingsVoiceDenoiseStrengthInput.value = String(clamp(Number(voiceSettings.denoiseStrength ?? 40), 0, 100));
  if (settingsVoiceDenoiseStrengthValue) settingsVoiceDenoiseStrengthValue.textContent = `${Math.round(clamp(Number(voiceSettings.denoiseStrength ?? 40), 0, 100))}%`;
  if (settingsVoiceEqEnabledInput) settingsVoiceEqEnabledInput.checked = !!voiceSettings.eqEnabled;
  if (settingsVoiceEqLowInput) settingsVoiceEqLowInput.value = String(voiceSettings.eqLowGain);
  if (settingsVoiceEqMidInput) settingsVoiceEqMidInput.value = String(voiceSettings.eqMidGain);
  if (settingsVoiceEqHighInput) settingsVoiceEqHighInput.value = String(voiceSettings.eqHighGain);
  if (settingsVoiceEqLowValue) settingsVoiceEqLowValue.textContent = `${Math.round(voiceSettings.eqLowGain)} dB`;
  if (settingsVoiceEqMidValue) settingsVoiceEqMidValue.textContent = `${Math.round(voiceSettings.eqMidGain)} dB`;
  if (settingsVoiceEqHighValue) settingsVoiceEqHighValue.textContent = `${Math.round(voiceSettings.eqHighGain)} dB`;
  if (settingsVoiceCompactVideoTilesInput) settingsVoiceCompactVideoTilesInput.checked = !!voiceSettings.compactVideoTiles;
  if (settingsVoiceVideoTileScaleInput) settingsVoiceVideoTileScaleInput.value = String(clamp(Number(voiceSettings.videoTileScale ?? 1), 0.7, 1.4));
  if (settingsVoiceVideoTileScaleValue) settingsVoiceVideoTileScaleValue.textContent = `${clamp(Number(voiceSettings.videoTileScale ?? 1), 0.7, 1.4).toFixed(2)}x`;
  if (settingsVoiceScreenShareQualityInput) settingsVoiceScreenShareQualityInput.value = getNormalizedScreenShareQuality(voiceSettings.screenShareQuality);
  syncCustomSelects(userSettingsModal || document);
  applyVoiceVideoTileLayoutSettings();
}

function getAllowedSettingsTabs() {
  const tabs = ["profile", "voice", "appearance", "connections"];
  if (labsSettings.unlocked) tabs.push("labs");
  return tabs;
}

function setActiveSettingsTab(nextTab) {
  const allowedTabs = getAllowedSettingsTabs();
  const tab = allowedTabs.includes(nextTab) ? nextTab : "profile";
  activeSettingsTab = tab;

  settingsPanels.forEach((panel) => {
    const panelTab = panel.dataset.settingsPanel;
    const isActive = panelTab === tab;
    panel.classList.toggle("active", isActive);
  });

  settingsMenuButtons.forEach((btn) => {
    const isActive = btn.dataset.settingsTab === tab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
    if (btn.dataset.settingsTab === "labs") {
      btn.disabled = !labsSettings.unlocked;
      btn.classList.toggle("hidden", !labsSettings.unlocked);
    }
  });
  if (tab === "connections") {
    refreshConnectionsSettingsPanel().catch(() => {});
  }
}

function bindSettingsMenuControls() {
  settingsMenuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveSettingsTab(btn.dataset.settingsTab || "profile");
    });
  });
}

function applySettingsTooltips(root = document) {
  const tabHints = {
    profile: "Account profile, identity, and personal info controls.",
    voice: "Microphone, voice processing, and call display settings.",
    appearance: "Theme, layout, colors, and visual customization.",
    connections: "Realtime health checks, diagnostics, and recovery tools.",
    labs: "Experimental features and visual effects.",
  };
  root.querySelectorAll(".settings-menu-btn[data-settings-tab]").forEach((btn) => {
    const key = String(btn.dataset.settingsTab || "").trim();
    const hint = tabHints[key];
    if (!btn.dataset.tooltip && hint) btn.dataset.tooltip = hint;
  });

  root.querySelectorAll(".settings-control-row").forEach((row) => {
    const label = row.querySelector("label");
    const help = row.querySelector("span");
    const helpText = String(help?.textContent || "").trim();
    if (label && helpText && !label.dataset.tooltip) {
      label.dataset.tooltip = helpText;
    }
  });

  const serverHints = {
    "server-settings-name-input": "Display name for this server.",
    "server-settings-upload-limit-input": "Maximum upload size in MB per file. Use 0 for unlimited.",
    "server-settings-log-retention-input": "How long server activity logs are kept. 0 disables server activity log retention entirely.",
    "server-settings-message-retention-input": "How long messages persist. -1 keeps messages forever; 0 means realtime-only and not stored.",
    "server-settings-strip-metadata": "If enabled, uploaded images are re-encoded to remove EXIF/metadata.",
    "settings-strip-upload-metadata": "If enabled, your uploads remove EXIF/metadata even when server defaults do not require it.",
    "server-settings-automod-enabled": "Master switch for all server AutoMod rules.",
    "server-settings-automod-block-links": "Block messages containing external http/https links.",
    "server-settings-automod-block-invites": "Block messages containing invite-style links.",
    "server-settings-automod-terms": "Comma or newline separated blocked terms.",
    "server-settings-automod-extensions": "Comma or newline separated blocked file extensions.",
  };
  root.querySelectorAll(".server-settings-grid label[for]").forEach((label) => {
    const key = String(label.getAttribute("for") || "").trim();
    const hint = serverHints[key];
    if (hint && !label.dataset.tooltip) label.dataset.tooltip = hint;
  });

  root.querySelectorAll(".settings-action-row button, .settings-import-label").forEach((el) => {
    const text = String(el.textContent || "").trim().replace(/\s+/g, " ");
    if (text && !el.dataset.tooltip) {
      el.dataset.tooltip = text;
    }
  });
}

function updateLabsControlValues() {
  if (settingsLabsSection) settingsLabsSection.classList.toggle("hidden", !labsSettings.unlocked);
  if (!labsSettings.unlocked && activeSettingsTab === "labs") {
    setActiveSettingsTab("profile");
  } else {
    setActiveSettingsTab(activeSettingsTab);
  }
  Object.entries(labsControlInputs).forEach(([key, input]) => {
    if (!input) return;
    input.checked = Boolean(labsSettings[key]);
  });
  if (labsLanternColorAInput) labsLanternColorAInput.value = normalizeHexColor(labsSettings.lanternColorA, DEFAULT_LABS_SETTINGS.lanternColorA);
  if (labsLanternColorBInput) labsLanternColorBInput.value = normalizeHexColor(labsSettings.lanternColorB, DEFAULT_LABS_SETTINGS.lanternColorB);
  if (labsBokehColorAInput) labsBokehColorAInput.value = normalizeHexColor(labsSettings.bokehColorA, DEFAULT_LABS_SETTINGS.bokehColorA);
  if (labsBokehColorBInput) labsBokehColorBInput.value = normalizeHexColor(labsSettings.bokehColorB, DEFAULT_LABS_SETTINGS.bokehColorB);
  if (labsMessageBarGlowStyleInput) labsMessageBarGlowStyleInput.value = normalizeMessageBarGlowStyle(labsSettings.messageBarGlowStyle);
  if (labsMessageBarGlowColorAInput) {
    labsMessageBarGlowColorAInput.value = normalizeHexColor(labsSettings.messageBarGlowColorA, DEFAULT_LABS_SETTINGS.messageBarGlowColorA);
  }
  if (labsMessageBarGlowColorBInput) {
    labsMessageBarGlowColorBInput.value = normalizeHexColor(labsSettings.messageBarGlowColorB, DEFAULT_LABS_SETTINGS.messageBarGlowColorB);
  }
  if (labsLanternColorAValue) labsLanternColorAValue.textContent = normalizeHexColor(labsSettings.lanternColorA, DEFAULT_LABS_SETTINGS.lanternColorA).toUpperCase();
  if (labsLanternColorBValue) labsLanternColorBValue.textContent = normalizeHexColor(labsSettings.lanternColorB, DEFAULT_LABS_SETTINGS.lanternColorB).toUpperCase();
  if (labsBokehColorAValue) labsBokehColorAValue.textContent = normalizeHexColor(labsSettings.bokehColorA, DEFAULT_LABS_SETTINGS.bokehColorA).toUpperCase();
  if (labsBokehColorBValue) labsBokehColorBValue.textContent = normalizeHexColor(labsSettings.bokehColorB, DEFAULT_LABS_SETTINGS.bokehColorB).toUpperCase();
  if (labsMessageBarGlowColorAValue) {
    labsMessageBarGlowColorAValue.textContent = normalizeHexColor(labsSettings.messageBarGlowColorA, DEFAULT_LABS_SETTINGS.messageBarGlowColorA).toUpperCase();
  }
  if (labsMessageBarGlowColorBValue) {
    labsMessageBarGlowColorBValue.textContent = normalizeHexColor(labsSettings.messageBarGlowColorB, DEFAULT_LABS_SETTINGS.messageBarGlowColorB).toUpperCase();
  }
  syncCustomSelects(userSettingsModal || document);
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

function ensureBokehLayer() {
  if (document.getElementById("bokeh-layer")) return;
  const layer = document.createElement("div");
  layer.id = "bokeh-layer";
  layer.className = "bokeh-layer";
  for (let i = 0; i < 10; i += 1) {
    const node = document.createElement("span");
    node.className = "bokeh-orb";
    randomizeBokehOrb(node);
    layer.appendChild(node);
  }
  document.body.appendChild(layer);
  startBokehAnimation();
}

function stopBokehAnimation() {
  if (bokehAnimationFrame) {
    cancelAnimationFrame(bokehAnimationFrame);
    bokehAnimationFrame = null;
  }
  bokehLastTickMs = 0;
}

function randomizeBokehOrb(orb) {
  const size = 48 + Math.random() * 140;
  const baseX = Math.random() * 100;
  const baseY = Math.random() * 100;
  const baseOpacity = 0.08 + Math.random() * 0.18;
  orb.style.width = `${size}px`;
  orb.style.height = `${size}px`;
  orb.style.left = `${baseX}%`;
  orb.style.top = `${baseY}%`;
  orb.style.opacity = `${baseOpacity}`;
  orb.dataset.baseOpacity = String(baseOpacity);
  orb.dataset.phase = String(Math.random() * Math.PI * 2);
  orb.dataset.speed = String(0.22 + Math.random() * 0.4);
  orb.dataset.amp = String(8 + Math.random() * 26);
  orb.dataset.parallax = String(10 + Math.random() * 20);
  orb.dataset.reactRadius = String(180 + Math.random() * 200);
  orb.dataset.reactStrength = String(0.38 + Math.random() * 0.44);
  orb.dataset.rx = "0";
  orb.dataset.ry = "0";
  orb.dataset.vx = "0";
  orb.dataset.vy = "0";
  orb.dataset.fadeState = "steady";
  orb.dataset.fadeTime = "0";
  orb.dataset.fadeDuration = String(1.8 + Math.random() * 1.8);
  orb.dataset.holdDuration = String(7 + Math.random() * 10);
}

function startBokehAnimation() {
  if (bokehAnimationFrame) return;
  const tick = (timeMs) => {
    const layer = document.getElementById("bokeh-layer");
    if (!layer || safeModeEnabled || !labsSettings.fxBokeh) {
      bokehAnimationFrame = null;
      return;
    }
    const dt = bokehLastTickMs > 0 ? Math.min(0.05, (timeMs - bokehLastTickMs) / 1000) : 0.016;
    bokehLastTickMs = timeMs;
    bokehPointerX += (bokehPointerTargetX - bokehPointerX) * 0.035;
    bokehPointerY += (bokehPointerTargetY - bokehPointerY) * 0.035;
    const t = timeMs * 0.001;
    layer.querySelectorAll(".bokeh-orb").forEach((orb) => {
      const phase = Number(orb.dataset.phase || 0);
      const speed = Number(orb.dataset.speed || 0.3);
      const amp = Number(orb.dataset.amp || 12);
      const parallax = Number(orb.dataset.parallax || 14);
      const reactRadius = Number(orb.dataset.reactRadius || 260);
      const reactStrength = Number(orb.dataset.reactStrength || 0.5);
      const baseOpacity = Number(orb.dataset.baseOpacity || 0.14);
      let fadeState = String(orb.dataset.fadeState || "steady");
      let fadeTime = Number(orb.dataset.fadeTime || 0);
      let fadeDuration = Number(orb.dataset.fadeDuration || 2.4);
      let holdDuration = Number(orb.dataset.holdDuration || 10);
      let rx = Number(orb.dataset.rx || 0);
      let ry = Number(orb.dataset.ry || 0);
      let vx = Number(orb.dataset.vx || 0);
      let vy = Number(orb.dataset.vy || 0);
      const driftX = Math.sin((t * speed) + phase) * amp;
      const driftY = Math.cos((t * speed * 0.85) + phase) * amp * 0.72;
      let targetReactX = bokehPointerX * parallax * 0.18;
      let targetReactY = bokehPointerY * parallax * 0.18;
      if (bokehPointerActive) {
        const rect = orb.getBoundingClientRect();
        const cx = rect.left + (rect.width / 2);
        const cy = rect.top + (rect.height / 2);
        const dx = cx - bokehPointerClientX;
        const dy = cy - bokehPointerClientY;
        const dist = Math.hypot(dx, dy) || 0.0001;
        if (dist < reactRadius) {
          const falloff = 1 - (dist / reactRadius);
          const influence = (falloff * falloff) * reactStrength;
          // dx/dy already points away from the cursor.
          targetReactX += (dx / dist) * influence * parallax;
          targetReactY += (dy / dist) * influence * parallax;
        }
      }
      vx = (vx + ((targetReactX - rx) * 0.032)) * 0.9;
      vy = (vy + ((targetReactY - ry) * 0.032)) * 0.9;
      rx += vx;
      ry += vy;
      fadeTime += dt;
      if (fadeState === "steady" && fadeTime >= holdDuration) {
        fadeState = "fadingOut";
        fadeTime = 0;
        fadeDuration = 1.8 + Math.random() * 1.8;
      } else if (fadeState === "fadingOut" && fadeTime >= fadeDuration) {
        randomizeBokehOrb(orb);
        fadeState = "fadingIn";
        fadeTime = 0;
        fadeDuration = Number(orb.dataset.fadeDuration || (1.8 + Math.random() * 1.8));
        holdDuration = Number(orb.dataset.holdDuration || (7 + Math.random() * 10));
        rx = 0;
        ry = 0;
        vx = 0;
        vy = 0;
      } else if (fadeState === "fadingIn" && fadeTime >= fadeDuration) {
        fadeState = "steady";
        fadeTime = 0;
        holdDuration = 7 + Math.random() * 10;
      }
      let opacity = baseOpacity;
      if (fadeState === "fadingOut") {
        const progress = clamp(fadeTime / Math.max(0.001, fadeDuration), 0, 1);
        opacity = baseOpacity * (1 - progress);
      } else if (fadeState === "fadingIn") {
        const progress = clamp(fadeTime / Math.max(0.001, fadeDuration), 0, 1);
        opacity = baseOpacity * progress;
      }
      orb.dataset.rx = String(rx);
      orb.dataset.ry = String(ry);
      orb.dataset.vx = String(vx);
      orb.dataset.vy = String(vy);
      orb.dataset.fadeState = fadeState;
      orb.dataset.fadeTime = String(fadeTime);
      orb.dataset.fadeDuration = String(fadeDuration);
      orb.dataset.holdDuration = String(holdDuration);
      orb.style.opacity = String(opacity);
      orb.style.transform = `translate3d(${(driftX + rx).toFixed(2)}px, ${(driftY + ry).toFixed(2)}px, 0)`;
    });
    bokehAnimationFrame = requestAnimationFrame(tick);
  };
  bokehAnimationFrame = requestAnimationFrame(tick);
}

function updateBokehPointerTarget(clientX, clientY) {
  const width = Math.max(window.innerWidth, 1);
  const height = Math.max(window.innerHeight, 1);
  bokehPointerClientX = clientX;
  bokehPointerClientY = clientY;
  bokehPointerActive = true;
  bokehPointerTargetX = clamp(((clientX / width) - 0.5) * 2, -1, 1);
  bokehPointerTargetY = clamp(((clientY / height) - 0.5) * 2, -1, 1);
}

function applyLabsColorVariables() {
  const lanternA = normalizeHexColor(labsSettings.lanternColorA, DEFAULT_LABS_SETTINGS.lanternColorA);
  const lanternB = normalizeHexColor(labsSettings.lanternColorB, DEFAULT_LABS_SETTINGS.lanternColorB);
  const bokehA = normalizeHexColor(labsSettings.bokehColorA, DEFAULT_LABS_SETTINGS.bokehColorA);
  const bokehB = normalizeHexColor(labsSettings.bokehColorB, DEFAULT_LABS_SETTINGS.bokehColorB);
  const messageBarGlowA = normalizeHexColor(labsSettings.messageBarGlowColorA, DEFAULT_LABS_SETTINGS.messageBarGlowColorA);
  const messageBarGlowB = normalizeHexColor(labsSettings.messageBarGlowColorB, DEFAULT_LABS_SETTINGS.messageBarGlowColorB);
  const messageBarGlowArgb = hexToRgbCsv(messageBarGlowA, "94, 188, 255");
  const messageBarGlowBrgb = hexToRgbCsv(messageBarGlowB, "142, 217, 255");
  const messageBarGlowStyle = normalizeMessageBarGlowStyle(labsSettings.messageBarGlowStyle);
  labsSettings.lanternColorA = lanternA;
  labsSettings.lanternColorB = lanternB;
  labsSettings.bokehColorA = bokehA;
  labsSettings.bokehColorB = bokehB;
  labsSettings.messageBarGlowColorA = messageBarGlowA;
  labsSettings.messageBarGlowColorB = messageBarGlowB;
  labsSettings.messageBarGlowStyle = messageBarGlowStyle;
  const htmlStyle = document.documentElement.style;
  const bodyStyle = document.body.style;
  [htmlStyle, bodyStyle].forEach((styleRef) => {
    styleRef.setProperty("--labs-lantern-a", lanternA);
    styleRef.setProperty("--labs-lantern-b", lanternB);
    styleRef.setProperty("--labs-bokeh-a", bokehA);
    styleRef.setProperty("--labs-bokeh-b", bokehB);
    styleRef.setProperty("--labs-messagebar-glow-a", messageBarGlowA);
    styleRef.setProperty("--labs-messagebar-glow-b", messageBarGlowB);
    styleRef.setProperty("--labs-messagebar-glow-a-rgb", messageBarGlowArgb);
    styleRef.setProperty("--labs-messagebar-glow-b-rgb", messageBarGlowBrgb);
  });
  document.body.setAttribute("data-composer-glow-style", messageBarGlowStyle);
}

function ensureSpaceCoreLayer() {
  if (document.getElementById("space-core-layer")) return;
  const layer = document.createElement("div");
  layer.id = "space-core-layer";
  layer.className = "space-core-layer";
  layer.innerHTML = `
    <div class="space-core-vortex"></div>
    <div class="space-core-ring"></div>
    <div class="space-core-stars"></div>
  `;
  document.body.appendChild(layer);
}

function updateSpaceCoreLayerAnchor() {
  const layer = document.getElementById("space-core-layer");
  if (!layer) return;
  const canvasEl = document.getElementById("d20-canvas");
  if (!canvasEl) {
    layer.style.removeProperty("--space-core-x");
    layer.style.removeProperty("--space-core-y");
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const x = rect.left + (rect.width / 2);
  const y = rect.top + (rect.height / 2);
  layer.style.setProperty("--space-core-x", `${x}px`);
  layer.style.setProperty("--space-core-y", `${y}px`);
}

function applyLabsSettings() {
  if (safeModeEnabled) {
    document.body.classList.remove(
      "fx-grain", "fx-glass", "fx-gradient", "fx-bob", "fx-message-glow",
      "fx-compact", "fx-neon", "fx-retro", "fx-lanterns", "fx-bokeh", "fx-rainbow-author",
      "fx-scanlines", "fx-panel-tilt", "fx-unread-shimmer", "fx-konami", "fx-cosmic-d20", "fx-composer-glow"
    );
    const spaceCoreLayer = document.getElementById("space-core-layer");
    if (spaceCoreLayer) spaceCoreLayer.remove();
    const bokehLayer = document.getElementById("bokeh-layer");
    if (bokehLayer) bokehLayer.remove();
    stopBokehAnimation();
    d20SpinMultiplier = 1;
    d20BounceEnabled = false;
    rollAnimationsEnabled = false;
    return;
  }
  applyLabsColorVariables();
  document.body.classList.toggle("fx-grain", Boolean(labsSettings.fxGrain));
  document.body.classList.toggle("fx-glass", Boolean(labsSettings.fxGlass));
  document.body.classList.toggle("fx-gradient", Boolean(labsSettings.fxGradient));
  document.body.classList.toggle("fx-bob", Boolean(labsSettings.fxBob));
  document.body.classList.toggle("fx-message-glow", Boolean(labsSettings.fxGlow));
  document.body.classList.toggle("fx-compact", Boolean(labsSettings.fxCompact));
  document.body.classList.toggle("fx-neon", Boolean(labsSettings.fxNeon));
  document.body.classList.toggle("fx-retro", Boolean(labsSettings.fxRetro));
  document.body.classList.toggle("fx-lanterns", Boolean(labsSettings.fxLanterns));
  document.body.classList.toggle("fx-bokeh", Boolean(labsSettings.fxBokeh));
  document.body.classList.toggle("fx-cosmic-d20", Boolean(labsSettings.fxCosmicD20));
  document.body.classList.toggle("fx-rainbow-author", Boolean(labsSettings.fxRainbowAuthor));
  document.body.classList.toggle("fx-scanlines", Boolean(labsSettings.fxScanlines));
  document.body.classList.toggle("fx-panel-tilt", Boolean(labsSettings.fxPanelTilt));
  document.body.classList.toggle("fx-unread-shimmer", Boolean(labsSettings.fxUnreadShimmer));
  document.body.classList.toggle("fx-konami", Boolean(labsSettings.konamiMode));
  document.body.classList.toggle("fx-composer-glow", Boolean(labsSettings.fxGlow));
  d20SpinMultiplier = labsSettings.fxD20Turbo ? 2.35 : 1;
  d20BounceEnabled = Boolean(labsSettings.fxD20Bounce);
  rollAnimationsEnabled = Boolean(labsSettings.fxRollAnim);
  updateD20CanvasInteractivity();
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
  if (labsSettings.fxBokeh) {
    ensureBokehLayer();
    startBokehAnimation();
  } else {
    const layer = document.getElementById("bokeh-layer");
    if (layer) layer.remove();
    stopBokehAnimation();
  }
  if (labsSettings.fxSpaceCore || labsSettings.fxCosmicD20) {
    ensureSpaceCoreLayer();
    const layer = document.getElementById("space-core-layer");
    if (layer) {
      layer.classList.toggle("cosmic-mode", Boolean(labsSettings.fxCosmicD20));
      updateSpaceCoreLayerAnchor();
    }
  } else {
    const layer = document.getElementById("space-core-layer");
    if (layer) layer.remove();
  }
}

function updateD20CanvasInteractivity() {
  const d20Canvas = document.getElementById("d20-canvas");
  if (!d20Canvas) return;
  const settingsOpen = Boolean(userSettingsModal?.classList?.contains("open"));
  const wireframeVisible = !Boolean(labsSettings.fxCosmicD20);
  d20Canvas.style.pointerEvents = (wireframeVisible || d20BounceEnabled || settingsOpen) ? "auto" : "none";
  d20Canvas.style.cursor = d20Canvas.style.pointerEvents === "auto" ? "grab" : "default";
}

function updateD20SettingsPreviewPosition() {
  const d20Canvas = document.getElementById("d20-canvas");
  if (!d20Canvas) return;
  const settingsOpen = Boolean(userSettingsModal?.classList?.contains("open"));
  document.body.classList.toggle("settings-d20-preview-open", settingsOpen);
  if (!settingsOpen) {
    d20Canvas.style.removeProperty("--settings-d20-preview-left");
    d20Canvas.style.removeProperty("--settings-d20-preview-top");
    return;
  }
  const modalContent = userSettingsModal?.querySelector?.(".settings-modal-content");
  if (!modalContent) return;
  const rect = modalContent.getBoundingClientRect();
  const size = 176;
  const margin = 18;
  const left = Math.max(12, Math.min(window.innerWidth - size - 12, rect.right - size - margin));
  const top = Math.max(12, Math.min(window.innerHeight - size - 12, rect.top + 74));
  d20Canvas.style.setProperty("--settings-d20-preview-left", `${left}px`);
  d20Canvas.style.setProperty("--settings-d20-preview-top", `${top}px`);
}

window.addEventListener("resize", () => {
  updateSpaceCoreLayerAnchor();
  updateD20SettingsPreviewPosition();
});
window.addEventListener("pointermove", (event) => {
  updateBokehPointerTarget(event.clientX, event.clientY);
}, { passive: true });
window.addEventListener("blur", () => {
  bokehPointerActive = false;
  bokehPointerTargetX = 0;
  bokehPointerTargetY = 0;
});
document.addEventListener("mouseleave", () => {
  bokehPointerActive = false;
  bokehPointerTargetX = 0;
  bokehPointerTargetY = 0;
});

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
  const emojis = ["\u{1F389}", "\u2728", "\u{1F3B2}", "\u{1F37B}", "\u{1F525}", "\u{1F319}"];
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
  const match = text.match(/^\u{1F3B2}\s*\[ROLL\s+(\d{1,2})d(\d{1,4})\]\s*\[([0-9,\s]+)\]\s*=\s*(\d+)$/iu);
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
      rewrite: `\u{1F3B2} [ROLL ${parsed.count}d${parsed.sides}] [${rolls.join(", ")}] = ${total}`,
    };
  }

  if (command === "party") {
    launchEmojiRain();
    appendClientSystemMessage("\u{1F389} Party mode activated.");
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

  if (command === "shrug") return { handled: false, rewrite: "\u00AF\\_(\u30C4)_/\u00AF" };
  if (command === "tableflip") return { handled: false, rewrite: "(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B" };
  if (command === "unflip") return { handled: false, rewrite: "\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)" };
  if (command === "lenny") return { handled: false, rewrite: "( \u0361\u00B0 \u035C\u0296 \u0361\u00B0)" };

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
  enhanceCustomSelects(modal);
  syncCustomSelects(modal);
  if (modal === userSettingsModal) updateD20CanvasInteractivity();
  if (modal === userSettingsModal) updateD20SettingsPreviewPosition();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("open");
  if (modal === userSettingsModal) updateD20CanvasInteractivity();
  if (modal === userSettingsModal) updateD20SettingsPreviewPosition();
}

const customSelectStates = new WeakMap();
let activeCustomSelectState = null;

function closeActiveCustomSelect(force = false) {
  const state = activeCustomSelectState;
  if (!state) return;
  if (!force && state.select?.disabled) return;
  state.wrapper.classList.remove("open");
  state.trigger.setAttribute("aria-expanded", "false");
  activeCustomSelectState = null;
}

function openCustomSelect(state) {
  if (!state || state.select?.disabled) return;
  if (activeCustomSelectState && activeCustomSelectState !== state) closeActiveCustomSelect(true);
  state.wrapper.classList.add("open");
  state.trigger.setAttribute("aria-expanded", "true");
  activeCustomSelectState = state;
}

function syncCustomSelectState(state) {
  if (!state || !state.select) return;
  const { select, wrapper, trigger, menu } = state;
  const selectedOption = select.options[select.selectedIndex] || select.options[0] || null;
  const triggerLabel = String(selectedOption?.textContent || selectedOption?.label || selectedOption?.value || "Select").trim() || "Select";
  trigger.textContent = triggerLabel;
  const disabled = !!select.disabled;
  wrapper.classList.toggle("is-disabled", disabled);
  trigger.disabled = disabled;
  trigger.setAttribute("aria-disabled", disabled ? "true" : "false");
  menu.querySelectorAll(".custom-select-option").forEach((btn) => {
    const isSelected = String(btn.dataset.value || "") === String(select.value || "");
    btn.classList.toggle("selected", isSelected);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
  if (disabled && activeCustomSelectState === state) closeActiveCustomSelect(true);
}

function rebuildCustomSelectOptions(state) {
  if (!state || !state.select) return;
  const { select, menu } = state;
  menu.innerHTML = "";
  Array.from(select.options || []).forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "custom-select-option";
    btn.dataset.value = String(option.value ?? "");
    btn.dataset.index = String(index);
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", option.selected ? "true" : "false");
    btn.textContent = String(option.textContent || option.label || option.value || "").trim() || " ";
    btn.disabled = !!option.disabled;
    btn.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
    btn.addEventListener("click", () => {
      if (select.disabled || option.disabled) return;
      select.value = option.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("input", { bubbles: true }));
      syncCustomSelectState(state);
      closeActiveCustomSelect(true);
    });
    menu.appendChild(btn);
  });
  syncCustomSelectState(state);
}

function enhanceCustomSelect(select) {
  if (!(select instanceof HTMLSelectElement)) return null;
  if (select.multiple || Number(select.size) > 1) return null;
  let state = customSelectStates.get(select);
  if (!state) {
    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";
    Array.from(select.classList).forEach((cls) => wrapper.classList.add(cls));
    wrapper.dataset.customSelect = "1";
    select.classList.add("custom-select-native");
    select.setAttribute("data-custom-select-native", "1");
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "custom-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    const menu = document.createElement("div");
    menu.className = "custom-select-menu";
    menu.setAttribute("role", "listbox");
    const parent = select.parentNode;
    if (!parent) return null;
    parent.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    state = { select, wrapper, trigger, menu };
    customSelectStates.set(select, state);
    trigger.addEventListener("click", () => {
      if (wrapper.classList.contains("open")) closeActiveCustomSelect(true);
      else openCustomSelect(state);
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeActiveCustomSelect(true);
        return;
      }
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCustomSelect(state);
      }
    });
    select.addEventListener("change", () => syncCustomSelectState(state));
    const observer = new MutationObserver(() => rebuildCustomSelectOptions(state));
    observer.observe(select, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "label", "selected", "value"],
    });
    state.observer = observer;
  }
  rebuildCustomSelectOptions(state);
  return state;
}

function enhanceCustomSelects(root = document) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  root.querySelectorAll("select").forEach((select) => enhanceCustomSelect(select));
}

function syncCustomSelects(root = document) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  root.querySelectorAll("select[data-custom-select-native='1']").forEach((select) => {
    const state = customSelectStates.get(select);
    if (state) syncCustomSelectState(state);
  });
}

document.addEventListener("pointerdown", (event) => {
  if (!activeCustomSelectState) return;
  if (activeCustomSelectState.wrapper.contains(event.target)) return;
  closeActiveCustomSelect(true);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeActiveCustomSelect(true);
});

function getTutorialDismissedStorageKey() {
  if (!currentUser?.public_id) return "";
  return `${TUTORIAL_DISMISSED_STORAGE_PREFIX}${currentUser.public_id}`;
}

function isTutorialDismissedLocally() {
  const key = getTutorialDismissedStorageKey();
  if (!key) return false;
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function setTutorialDismissedLocally(value) {
  const key = getTutorialDismissedStorageKey();
  if (!key) return;
  try {
    if (value) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  } catch {
    // Ignore storage failures
  }
}

function clearTutorialHighlight() {
  if (tutorialHighlightedEl) {
    tutorialHighlightedEl.classList.remove("tutorial-target-highlight");
    tutorialHighlightedEl = null;
  }
}

function highlightTutorialTarget(selector) {
  clearTutorialHighlight();
  if (!selector) return;
  const el = document.querySelector(selector);
  if (!el) return;
  el.classList.add("tutorial-target-highlight");
  tutorialHighlightedEl = el;
  try {
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  } catch {
    // no-op
  }
}

async function markTutorialComplete() {
  setTutorialDismissedLocally(true);
  if (tutorialCompletionPending || currentUser?.has_seen_tutorial) return;
  tutorialCompletionPending = true;
  try {
    const res = await fetch("/users/me/tutorial-complete", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok && currentUser) currentUser.has_seen_tutorial = true;
  } catch {
    // no-op
  } finally {
    tutorialCompletionPending = false;
  }
}

function renderTutorialStep() {
  const step = ONBOARDING_TUTORIAL_STEPS[tutorialStepIndex];
  if (!step || !tutorialTitleEl || !tutorialBodyEl || !tutorialProgressEl) return;
  tutorialTitleEl.textContent = step.title;
  tutorialBodyEl.textContent = step.body;
  tutorialProgressEl.textContent = `Step ${tutorialStepIndex + 1} of ${ONBOARDING_TUTORIAL_STEPS.length}`;
  if (tutorialPrevBtn) tutorialPrevBtn.disabled = tutorialStepIndex === 0;
  if (tutorialNextBtn) tutorialNextBtn.classList.toggle("hidden", tutorialStepIndex === ONBOARDING_TUTORIAL_STEPS.length - 1);
  if (tutorialFinishBtn) tutorialFinishBtn.classList.toggle("hidden", tutorialStepIndex !== ONBOARDING_TUTORIAL_STEPS.length - 1);
  highlightTutorialTarget(step.targetSelector);
}

function startOnboardingTutorial() {
  if (!onboardingTutorialModal) return;
  tutorialStepIndex = 0;
  openModal(onboardingTutorialModal);
  renderTutorialStep();
}

async function finishOnboardingTutorial() {
  clearTutorialHighlight();
  closeModal(onboardingTutorialModal);
  setTutorialDismissedLocally(true);
  await markTutorialComplete();
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
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      suppressNextMessageUiAutoClose = true;
      hideContextMenu();
      item.onClick();
      setTimeout(() => {
        suppressNextMessageUiAutoClose = false;
      }, 0);
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
  if (appearanceSettings.themeId === "pure-dark-modern") {
    appearanceSettings.themeId = DEFAULT_APPEARANCE.lastDarkThemeId;
  }
  if (appearanceSettings.lastDarkThemeId === "pure-dark-modern") {
    appearanceSettings.lastDarkThemeId = DEFAULT_APPEARANCE.lastDarkThemeId;
  }
  appearanceSettings.notificationPingVolume = clamp(
    Number(appearanceSettings.notificationPingVolume),
    0,
    2
  );
  appearanceSettings.uiScale = clamp(Number(appearanceSettings.uiScale), UI_SCALE_MIN, UI_SCALE_MAX);
  const pureDarkDefaults = getPureDarkDefaultColors();
  appearanceSettings.pureDarkBgColor = normalizeHexColor(appearanceSettings.pureDarkBgColor, pureDarkDefaults.bg);
  appearanceSettings.pureDarkPanelStartColor = normalizeHexColor(appearanceSettings.pureDarkPanelStartColor, pureDarkDefaults.panelStart);
  appearanceSettings.pureDarkPanelEndColor = normalizeHexColor(appearanceSettings.pureDarkPanelEndColor, pureDarkDefaults.panelEnd);
  appearanceSettings.pureDarkHeaderColor = normalizeHexColor(appearanceSettings.pureDarkHeaderColor, pureDarkDefaults.header);
  appearanceSettings.pureDarkTextColor = normalizeHexColor(appearanceSettings.pureDarkTextColor, pureDarkDefaults.text);
  appearanceSettings.pureDarkMutedColor = normalizeHexColor(appearanceSettings.pureDarkMutedColor, pureDarkDefaults.muted);
  appearanceSettings.pureDarkAccentColor = normalizeHexColor(appearanceSettings.pureDarkAccentColor, pureDarkDefaults.accent);
  appearanceSettings.pureDarkAccentStrongColor = normalizeHexColor(appearanceSettings.pureDarkAccentStrongColor, pureDarkDefaults.accentStrong);
  appearanceSettings.uiStyle = normalizeUiStyle(appearanceSettings.uiStyle);
  appearanceSettings.modernUi = appearanceSettings.modernUi !== false;
  appearanceSettings.themeAccentColor = normalizeOptionalHexColor(appearanceSettings.themeAccentColor);
  appearanceSettings.centerWireframeShape = normalizeCenterWireframeShape(appearanceSettings.centerWireframeShape);
  appearanceSettings.centerGlowCoolColor = normalizeHexColor(appearanceSettings.centerGlowCoolColor, DEFAULT_APPEARANCE.centerGlowCoolColor);
  appearanceSettings.centerGlowVioletColor = normalizeHexColor(appearanceSettings.centerGlowVioletColor, DEFAULT_APPEARANCE.centerGlowVioletColor);
  appearanceSettings.centerGlowWarmColor = normalizeHexColor(appearanceSettings.centerGlowWarmColor, DEFAULT_APPEARANCE.centerGlowWarmColor);
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.themeId)) {
    appearanceSettings.themeId = DEFAULT_APPEARANCE.themeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastLightThemeId)) {
    appearanceSettings.lastLightThemeId = DEFAULT_APPEARANCE.lastLightThemeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastMediumThemeId)) {
    appearanceSettings.lastMediumThemeId = DEFAULT_APPEARANCE.lastMediumThemeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastDarkThemeId)) {
    appearanceSettings.lastDarkThemeId = DEFAULT_APPEARANCE.lastDarkThemeId;
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

  const snapshot = getAppearanceSettingsSnapshot();
  if (snapshot) lastAppearanceSavedSnapshot = snapshot;
  applyAppearanceSettings();
}

function applyAccountAppearanceSettings(serverAppearanceSettings) {
  if (!serverAppearanceSettings || typeof serverAppearanceSettings !== "object") return;
  appearanceSettings = {
    ...appearanceSettings,
    ...serverAppearanceSettings,
  };
  appearanceSettings.uiStyle = normalizeUiStyle(appearanceSettings.uiStyle);
  appearanceSettings.modernUi = appearanceSettings.modernUi !== false;
  appearanceSettings.uiScale = clamp(Number(appearanceSettings.uiScale), UI_SCALE_MIN, UI_SCALE_MAX);
  appearanceSettings.panelRadius = clamp(Number(appearanceSettings.panelRadius), 8, 24);
  appearanceSettings.messageDensity = clamp(Number(appearanceSettings.messageDensity), 0.85, 1.25);
  appearanceSettings.notificationPingVolume = clamp(Number(appearanceSettings.notificationPingVolume), 0, 2);
  appearanceSettings.themeAccentColor = normalizeOptionalHexColor(appearanceSettings.themeAccentColor);
  appearanceSettings.centerWireframeShape = normalizeCenterWireframeShape(appearanceSettings.centerWireframeShape);
  appearanceSettings.centerGlowCoolColor = normalizeHexColor(appearanceSettings.centerGlowCoolColor, DEFAULT_APPEARANCE.centerGlowCoolColor);
  appearanceSettings.centerGlowVioletColor = normalizeHexColor(appearanceSettings.centerGlowVioletColor, DEFAULT_APPEARANCE.centerGlowVioletColor);
  appearanceSettings.centerGlowWarmColor = normalizeHexColor(appearanceSettings.centerGlowWarmColor, DEFAULT_APPEARANCE.centerGlowWarmColor);
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.themeId)) {
    appearanceSettings.themeId = DEFAULT_APPEARANCE.themeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastLightThemeId)) {
    appearanceSettings.lastLightThemeId = DEFAULT_APPEARANCE.lastLightThemeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastMediumThemeId)) {
    appearanceSettings.lastMediumThemeId = DEFAULT_APPEARANCE.lastMediumThemeId;
  }
  if (!getAllThemes().some((preset) => preset.id === appearanceSettings.lastDarkThemeId)) {
    appearanceSettings.lastDarkThemeId = DEFAULT_APPEARANCE.lastDarkThemeId;
  }
  applyAppearanceSettings();
  saveAppearanceSettings({ syncAccount: false });
  const snapshot = getAppearanceSettingsSnapshot();
  if (snapshot) {
    lastAppearanceSavedSnapshot = snapshot;
    lastAppearanceSyncedSnapshot = snapshot;
  }
  renderThemePresetGrid();
  updateAppearanceControlValues();
  populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
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

async function flushAppearanceSettingsToAccount() {
  if (!currentUser?.public_id) return;
  const snapshot = getAppearanceSettingsSnapshot();
  if (snapshot && snapshot === lastAppearanceSyncedSnapshot) return;
  if (appearanceSyncInFlight) {
    appearanceSyncPending = true;
    return;
  }
  appearanceSyncInFlight = true;
  appearanceSyncPending = false;
  try {
    const res = await fetch("/users/me/appearance", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appearance_settings: appearanceSettings }),
    });
    if (res.ok && snapshot) lastAppearanceSyncedSnapshot = snapshot;
  } catch {
    // Best-effort sync only. Local preference persistence remains primary fallback.
  } finally {
    appearanceSyncInFlight = false;
    if (appearanceSyncPending) {
      if (appearanceSyncTimer) window.clearTimeout(appearanceSyncTimer);
      appearanceSyncTimer = window.setTimeout(() => {
        flushAppearanceSettingsToAccount().catch(() => {});
      }, 150);
    }
  }
}

function queueAppearanceSettingsAccountSync() {
  if (!currentUser?.public_id) return;
  if (appearanceSyncTimer) window.clearTimeout(appearanceSyncTimer);
  appearanceSyncTimer = window.setTimeout(() => {
    flushAppearanceSettingsToAccount().catch(() => {});
  }, 600);
}

function saveAppearanceSettings({ syncAccount = true } = {}) {
  const snapshot = getAppearanceSettingsSnapshot();
  try {
    if (snapshot && snapshot !== lastAppearanceSavedSnapshot) {
      localStorage.setItem(APPEARANCE_STORAGE_KEY, snapshot);
      lastAppearanceSavedSnapshot = snapshot;
    }
  } catch {
    // Ignore storage failures
  }
  if (syncAccount) queueAppearanceSettingsAccountSync();
  applyCustomCss();
}

function applyAppearanceSettings() {
  const preset = getThemeById(appearanceSettings.themeId);
  const isAuroraSlate = preset.id === AURORA_SLATE_THEME_ID;
  const effectiveBg = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkBgColor, preset.bg)
    : preset.bg;
  const panelStart = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkPanelStartColor, "#121a22")
    : null;
  const panelEnd = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkPanelEndColor, "#0d141b")
    : null;
  const effectivePanelBg = isAuroraSlate ? `linear-gradient(145deg, ${panelStart}, ${panelEnd})` : preset.panelBg;
  const effectiveHeaderFooterBg = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkHeaderColor, preset.headerFooterBg)
    : preset.headerFooterBg;
  const effectiveText = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkTextColor, preset.text)
    : preset.text;
  const effectiveMuted = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkMutedColor, preset.muted)
    : preset.muted;
  const effectiveAccent = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkAccentColor, preset.accent)
    : preset.accent;
  const effectiveAccentStrong = isAuroraSlate
    ? normalizeHexColor(appearanceSettings.pureDarkAccentStrongColor, preset.accentStrong)
    : preset.accentStrong;
  const accentOverride = normalizeOptionalHexColor(appearanceSettings.themeAccentColor);
  const finalAccent = accentOverride || effectiveAccent;
  const finalAccentStrong = accentOverride
    ? blendHexColors(accentOverride, "#ffffff", 0.28)
    : effectiveAccentStrong;
  const htmlStyle = document.documentElement.style;
  const bodyStyle = document.body.style;
  [htmlStyle, bodyStyle].forEach((styleRef) => {
    styleRef.setProperty("--bg", effectiveBg);
    styleRef.setProperty("--panel-bg", effectivePanelBg);
    styleRef.setProperty("--header-footer-bg", effectiveHeaderFooterBg);
    styleRef.setProperty("--text", effectiveText);
    styleRef.setProperty("--muted", effectiveMuted);
    styleRef.setProperty("--accent", finalAccent);
    styleRef.setProperty("--accent-strong", finalAccentStrong);
    styleRef.setProperty("--border", preset.border);
    styleRef.setProperty("--shadow", preset.shadow);
    styleRef.setProperty("--ui-scale", String(appearanceSettings.uiScale));
    styleRef.setProperty("--panel-radius", `${appearanceSettings.panelRadius}px`);
    styleRef.setProperty("--message-density", String(appearanceSettings.messageDensity));
  });

  document.body.classList.toggle("dark-mode", isDarkLikeThemeMode(preset.mode));
  document.body.classList.toggle("fx-ui-overhaul", appearanceSettings.modernUi !== false);
  document.body.classList.toggle("ui-style-boxy", normalizeUiStyle(appearanceSettings.uiStyle) === "boxy");
  document.body.classList.toggle("channels-flat", appearanceSettings.highlightChannelRows === false);
  document.body.setAttribute("data-theme-id", preset.id);
  document.body.style.fontFamily = appearanceSettings.fontFamily || DEFAULT_APPEARANCE.fontFamily;
  applyCustomCss();
  applyLabsSettings();
  applyCenterWireframeShape();
  updateCenterGlowColors();
  updateD20ThemeColor();
}

function updateAppearanceControlValues() {
  const activePreset = getThemeById(appearanceSettings.themeId);
  const isAuroraSlate = activePreset.id === AURORA_SLATE_THEME_ID;
  if (settingsUiStyleInput) settingsUiStyleInput.value = normalizeUiStyle(appearanceSettings.uiStyle);
  if (settingsModernUiInput) settingsModernUiInput.checked = appearanceSettings.modernUi !== false;
  if (settingsUiScaleInput) settingsUiScaleInput.value = String(appearanceSettings.uiScale);
  if (settingsPanelRadiusInput) settingsPanelRadiusInput.value = String(appearanceSettings.panelRadius);
  if (settingsMessageDensityInput) settingsMessageDensityInput.value = String(appearanceSettings.messageDensity);
  if (settingsCenterWireframeShapeInput) settingsCenterWireframeShapeInput.value = normalizeCenterWireframeShape(appearanceSettings.centerWireframeShape);
  if (settingsCenterGlowCoolColorInput) settingsCenterGlowCoolColorInput.value = normalizeHexColor(appearanceSettings.centerGlowCoolColor, DEFAULT_APPEARANCE.centerGlowCoolColor);
  if (settingsCenterGlowVioletColorInput) settingsCenterGlowVioletColorInput.value = normalizeHexColor(appearanceSettings.centerGlowVioletColor, DEFAULT_APPEARANCE.centerGlowVioletColor);
  if (settingsCenterGlowWarmColorInput) settingsCenterGlowWarmColorInput.value = normalizeHexColor(appearanceSettings.centerGlowWarmColor, DEFAULT_APPEARANCE.centerGlowWarmColor);
  if (settingsCenterGlowCoolColorValue) settingsCenterGlowCoolColorValue.textContent = normalizeHexColor(appearanceSettings.centerGlowCoolColor, DEFAULT_APPEARANCE.centerGlowCoolColor).toUpperCase();
  if (settingsCenterGlowVioletColorValue) settingsCenterGlowVioletColorValue.textContent = normalizeHexColor(appearanceSettings.centerGlowVioletColor, DEFAULT_APPEARANCE.centerGlowVioletColor).toUpperCase();
  if (settingsCenterGlowWarmColorValue) settingsCenterGlowWarmColorValue.textContent = normalizeHexColor(appearanceSettings.centerGlowWarmColor, DEFAULT_APPEARANCE.centerGlowWarmColor).toUpperCase();
  if (settingsNotificationPingVolumeInput) {
    settingsNotificationPingVolumeInput.value = String(appearanceSettings.notificationPingVolume);
  }
  if (settingsUiScaleValue) settingsUiScaleValue.textContent = `${Number(appearanceSettings.uiScale).toFixed(2)}x`;
  if (settingsPanelRadiusValue) settingsPanelRadiusValue.textContent = `${Math.round(Number(appearanceSettings.panelRadius))}px`;
  if (settingsMessageDensityValue) settingsMessageDensityValue.textContent = `${Number(appearanceSettings.messageDensity).toFixed(2)}x`;
  if (settingsChannelRowHighlightInput) settingsChannelRowHighlightInput.checked = appearanceSettings.highlightChannelRows !== false;
  if (settingsNotificationPingVolumeValue) {
    settingsNotificationPingVolumeValue.textContent = `${Math.round(Number(appearanceSettings.notificationPingVolume) * 100)}%`;
  }
  if (settingsThemeAccentColorInput) {
    settingsThemeAccentColorInput.value = normalizeHexColor(
      appearanceSettings.themeAccentColor || activePreset.accent,
      activePreset.accent
    );
  }
  if (settingsThemeAccentColorValue) {
    const effectiveAccent = normalizeHexColor(
      appearanceSettings.themeAccentColor || activePreset.accent,
      activePreset.accent
    );
    settingsThemeAccentColorValue.textContent = effectiveAccent.toUpperCase();
  }
  if (settingsPureDarkAccentRow) settingsPureDarkAccentRow.classList.toggle("hidden", !isAuroraSlate);
  if (settingsPureDarkBgColorInput) settingsPureDarkBgColorInput.value = normalizeHexColor(appearanceSettings.pureDarkBgColor);
  if (settingsPureDarkPanelStartColorInput) settingsPureDarkPanelStartColorInput.value = normalizeHexColor(appearanceSettings.pureDarkPanelStartColor);
  if (settingsPureDarkPanelEndColorInput) settingsPureDarkPanelEndColorInput.value = normalizeHexColor(appearanceSettings.pureDarkPanelEndColor);
  if (settingsPureDarkHeaderColorInput) settingsPureDarkHeaderColorInput.value = normalizeHexColor(appearanceSettings.pureDarkHeaderColor);
  if (settingsPureDarkTextColorInput) settingsPureDarkTextColorInput.value = normalizeHexColor(appearanceSettings.pureDarkTextColor);
  if (settingsPureDarkMutedColorInput) settingsPureDarkMutedColorInput.value = normalizeHexColor(appearanceSettings.pureDarkMutedColor);
  if (settingsPureDarkAccentColorInput) settingsPureDarkAccentColorInput.value = normalizeHexColor(appearanceSettings.pureDarkAccentColor);
  if (settingsPureDarkAccentStrongColorInput) settingsPureDarkAccentStrongColorInput.value = normalizeHexColor(appearanceSettings.pureDarkAccentStrongColor);
  if (settingsPureDarkBgColorValue) settingsPureDarkBgColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkBgColor).toUpperCase();
  if (settingsPureDarkPanelStartColorValue) settingsPureDarkPanelStartColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkPanelStartColor).toUpperCase();
  if (settingsPureDarkPanelEndColorValue) settingsPureDarkPanelEndColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkPanelEndColor).toUpperCase();
  if (settingsPureDarkHeaderColorValue) settingsPureDarkHeaderColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkHeaderColor).toUpperCase();
  if (settingsPureDarkTextColorValue) settingsPureDarkTextColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkTextColor).toUpperCase();
  if (settingsPureDarkMutedColorValue) settingsPureDarkMutedColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkMutedColor).toUpperCase();
  if (settingsPureDarkAccentColorValue) settingsPureDarkAccentColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkAccentColor).toUpperCase();
  if (settingsPureDarkAccentStrongColorValue) settingsPureDarkAccentStrongColorValue.textContent = normalizeHexColor(appearanceSettings.pureDarkAccentStrongColor).toUpperCase();
  if (settingsFontFamilyInput) settingsFontFamilyInput.value = appearanceSettings.fontFamily || DEFAULT_APPEARANCE.fontFamily;
  if (settingsCustomCssInput) settingsCustomCssInput.value = appearanceSettings.customCss || "";
  syncCustomSelects(userSettingsModal || document);
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
      if (normalizeThemeMode(preset.mode) === "medium") {
        appearanceSettings.lastMediumThemeId = preset.id;
      } else if (isDarkLikeThemeMode(preset.mode)) {
        appearanceSettings.lastDarkThemeId = preset.id;
      } else {
        appearanceSettings.lastLightThemeId = preset.id;
      }
      applyAppearanceSettings();
      saveAppearanceSettings();
      renderThemePresetGrid();
      updateAppearanceControlValues();
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
  return [...THEME_PRESETS];
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
  const mode = normalizeThemeMode(source.mode);
  let id = fallbackId || source.id || `custom-${slugifyThemeName(source.name || "theme")}`;
  if (THEME_PRESETS.some((preset) => preset.id === id)) {
    id = `custom-${slugifyThemeName(source.name || id)}`;
  }
  const name = String(source.name || "Custom Theme").trim() || "Custom Theme";
  const fallback = (
    THEME_PRESETS.find((t) => t.mode === mode)
    || (isDarkLikeThemeMode(mode)
      ? THEME_PRESETS.find((t) => isDarkLikeThemeMode(t.mode))
      : THEME_PRESETS.find((t) => t.mode === "light"))
    || THEME_PRESETS[0]
  );
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
  if (settingsModernUiInput) {
    settingsModernUiInput.addEventListener("change", () => {
      appearanceSettings.modernUi = !!settingsModernUiInput.checked;
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsUiStyleInput) {
    settingsUiStyleInput.addEventListener("change", () => {
      appearanceSettings.uiStyle = normalizeUiStyle(settingsUiStyleInput.value);
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsUiScaleInput) {
    settingsUiScaleInput.addEventListener("input", () => {
      appearanceSettings.uiScale = clamp(Number(settingsUiScaleInput.value), UI_SCALE_MIN, UI_SCALE_MAX);
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
  if (settingsCenterWireframeShapeInput) {
    settingsCenterWireframeShapeInput.addEventListener("change", () => {
      appearanceSettings.centerWireframeShape = normalizeCenterWireframeShape(settingsCenterWireframeShapeInput.value);
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  const applyCenterGlowColors = () => {
    appearanceSettings.centerGlowCoolColor = normalizeHexColor(settingsCenterGlowCoolColorInput?.value, DEFAULT_APPEARANCE.centerGlowCoolColor);
    appearanceSettings.centerGlowVioletColor = normalizeHexColor(settingsCenterGlowVioletColorInput?.value, DEFAULT_APPEARANCE.centerGlowVioletColor);
    appearanceSettings.centerGlowWarmColor = normalizeHexColor(settingsCenterGlowWarmColorInput?.value, DEFAULT_APPEARANCE.centerGlowWarmColor);
    applyAppearanceSettings();
    updateAppearanceControlValues();
    saveAppearanceSettings();
  };
  if (settingsCenterGlowCoolColorInput) settingsCenterGlowCoolColorInput.addEventListener("input", applyCenterGlowColors);
  if (settingsCenterGlowVioletColorInput) settingsCenterGlowVioletColorInput.addEventListener("input", applyCenterGlowColors);
  if (settingsCenterGlowWarmColorInput) settingsCenterGlowWarmColorInput.addEventListener("input", applyCenterGlowColors);
  if (settingsChannelRowHighlightInput) {
    settingsChannelRowHighlightInput.addEventListener("change", () => {
      appearanceSettings.highlightChannelRows = !!settingsChannelRowHighlightInput.checked;
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsNotificationPingVolumeInput) {
    settingsNotificationPingVolumeInput.addEventListener("input", () => {
      appearanceSettings.notificationPingVolume = clamp(
        Number(settingsNotificationPingVolumeInput.value),
        0,
        2
      );
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  if (settingsThemeAccentColorInput) {
    settingsThemeAccentColorInput.addEventListener("input", () => {
      appearanceSettings.themeAccentColor = normalizeHexColor(
        settingsThemeAccentColorInput.value,
        getThemeById(appearanceSettings.themeId).accent
      );
      applyAppearanceSettings();
      updateAppearanceControlValues();
      saveAppearanceSettings();
    });
  }
  const applyPureDarkColors = () => {
    appearanceSettings.pureDarkBgColor = normalizeHexColor(settingsPureDarkBgColorInput?.value, DEFAULT_APPEARANCE.pureDarkBgColor);
    appearanceSettings.pureDarkPanelStartColor = normalizeHexColor(settingsPureDarkPanelStartColorInput?.value, DEFAULT_APPEARANCE.pureDarkPanelStartColor);
    appearanceSettings.pureDarkPanelEndColor = normalizeHexColor(settingsPureDarkPanelEndColorInput?.value, DEFAULT_APPEARANCE.pureDarkPanelEndColor);
    appearanceSettings.pureDarkHeaderColor = normalizeHexColor(settingsPureDarkHeaderColorInput?.value, DEFAULT_APPEARANCE.pureDarkHeaderColor);
    appearanceSettings.pureDarkTextColor = normalizeHexColor(settingsPureDarkTextColorInput?.value, DEFAULT_APPEARANCE.pureDarkTextColor);
    appearanceSettings.pureDarkMutedColor = normalizeHexColor(settingsPureDarkMutedColorInput?.value, DEFAULT_APPEARANCE.pureDarkMutedColor);
    appearanceSettings.pureDarkAccentColor = normalizeHexColor(settingsPureDarkAccentColorInput?.value, DEFAULT_APPEARANCE.pureDarkAccentColor);
    appearanceSettings.pureDarkAccentStrongColor = normalizeHexColor(settingsPureDarkAccentStrongColorInput?.value, DEFAULT_APPEARANCE.pureDarkAccentStrongColor);
    applyAppearanceSettings();
    updateAppearanceControlValues();
    saveAppearanceSettings();
  };
  if (settingsPureDarkBgColorInput) settingsPureDarkBgColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkPanelStartColorInput) settingsPureDarkPanelStartColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkPanelEndColorInput) settingsPureDarkPanelEndColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkHeaderColorInput) settingsPureDarkHeaderColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkTextColorInput) settingsPureDarkTextColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkMutedColorInput) settingsPureDarkMutedColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkAccentColorInput) settingsPureDarkAccentColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkAccentStrongColorInput) settingsPureDarkAccentStrongColorInput.addEventListener("input", applyPureDarkColors);
  if (settingsPureDarkResetBtn) {
    settingsPureDarkResetBtn.addEventListener("click", () => {
      resetPureDarkColors();
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
        if (normalizeThemeMode(template.mode) === "medium") appearanceSettings.lastMediumThemeId = template.id;
        else if (isDarkLikeThemeMode(template.mode)) appearanceSettings.lastDarkThemeId = template.id;
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

const TESSERACT_VERTEX_ORDER = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

function rotate4DInPlane(point, a, b, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const pa = point[a];
  const pb = point[b];
  point[a] = (pa * c) - (pb * s);
  point[b] = (pa * s) + (pb * c);
}

function buildTesseractProjectedPositions(angles) {
  const {
    xy = 0,
    xz = 0,
    yz = 0,
    xw = 0,
    yw = 0,
    zw = 0,
    projectionDistance = 3.6,
    scale = 0.86,
  } = angles || {};

  const positions = [];
  const wLayers = [-1, 1];
  wLayers.forEach((w) => {
    TESSERACT_VERTEX_ORDER.forEach(([x, y, z]) => {
      const p = [x, y, z, w];
      rotate4DInPlane(p, 0, 1, xy);
      rotate4DInPlane(p, 0, 2, xz);
      rotate4DInPlane(p, 1, 2, yz);
      rotate4DInPlane(p, 0, 3, xw);
      rotate4DInPlane(p, 1, 3, yw);
      rotate4DInPlane(p, 2, 3, zw);
      const perspective = projectionDistance / Math.max(0.001, projectionDistance - p[3]);
      positions.push(p[0] * perspective * scale, p[1] * perspective * scale, p[2] * perspective * scale);
    });
  });
  return positions;
}

function createTesseractWireframeGeometry() {
  const positions = buildTesseractProjectedPositions({
    xy: 0,
    xz: 0,
    yz: 0,
    xw: 0,
    yw: 0,
    zw: 0,
  });

  const indices = [];
  const addQuad = (a, b, c, d) => {
    indices.push(a, b, c, a, c, d);
  };
  const faces = [
    [0, 1, 2, 3], // back
    [4, 5, 6, 7], // front
    [0, 4, 5, 1], // bottom
    [3, 2, 6, 7], // top
    [1, 5, 6, 2], // right
    [0, 3, 7, 4], // left
  ];

  // Outer + inner cubes.
  faces.forEach(([a, b, c, d]) => addQuad(a, b, c, d));
  faces.forEach(([a, b, c, d]) => addQuad(a + 8, b + 8, c + 8, d + 8));

  // Bridge the corresponding faces to create a tesseract-style projection.
  faces.forEach(([a, b, c, d]) => {
    const ai = a + 8;
    const bi = b + 8;
    const ci = c + 8;
    const di = d + 8;
    addQuad(a, b, bi, ai);
    addQuad(b, c, ci, bi);
    addQuad(c, d, di, ci);
    addQuad(d, a, ai, di);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function updateTesseractGeometryProjection(geometry, angles) {
  if (!geometry) return;
  const attr = geometry.getAttribute("position");
  if (!attr) return;
  const positions = buildTesseractProjectedPositions(angles);
  if (positions.length !== attr.array.length) return;
  attr.array.set(positions);
  attr.needsUpdate = true;
  geometry.computeBoundingSphere();
}

function createCenterWireframeGeometry(shape) {
  switch (normalizeCenterWireframeShape(shape)) {
    case "d4":
      return new THREE.TetrahedronGeometry(1.08, 0);
    case "d6":
      return new THREE.BoxGeometry(1.8, 1.8, 1.8);
    case "d8":
      return new THREE.OctahedronGeometry(1.12, 0);
    case "d10":
      return new THREE.CylinderGeometry(0.95, 0.95, 1.7, 5, 1, false);
    case "d12":
      return new THREE.DodecahedronGeometry(1.03, 0);
    case "sphere":
      return new THREE.SphereGeometry(1.05, 12, 10);
    case "torus":
      return new THREE.TorusGeometry(0.95, 0.28, 12, 24);
    case "capsule":
      return typeof THREE.CapsuleGeometry === "function"
        ? new THREE.CapsuleGeometry(0.72, 1.0, 6, 12)
        : new THREE.SphereGeometry(1.05, 12, 10);
    case "tesseract":
      return createTesseractWireframeGeometry();
    case "d20":
    default:
      return new THREE.IcosahedronGeometry(1, 0);
  }
}

function applyCenterWireframeShape() {
  if (!d20Mesh) return;
  const nextGeometry = createCenterWireframeGeometry(appearanceSettings.centerWireframeShape);
  if (!nextGeometry) return;
  if (d20Mesh.geometry) d20Mesh.geometry.dispose();
  d20Mesh.geometry = nextGeometry;
  if (normalizeCenterWireframeShape(appearanceSettings.centerWireframeShape) === "tesseract") {
    d20Mesh.rotation.set(0, 0, 0);
  }
}

function updateCenterGlowColors() {
  const cool = normalizeHexColor(appearanceSettings.centerGlowCoolColor, DEFAULT_APPEARANCE.centerGlowCoolColor);
  const violet = normalizeHexColor(appearanceSettings.centerGlowVioletColor, DEFAULT_APPEARANCE.centerGlowVioletColor);
  const warm = normalizeHexColor(appearanceSettings.centerGlowWarmColor, DEFAULT_APPEARANCE.centerGlowWarmColor);
  const coolRgb = hexToRgbCsv(cool, "94, 188, 255");
  const violetRgb = hexToRgbCsv(violet, "124, 86, 255");
  const warmRgb = hexToRgbCsv(warm, "255, 181, 106");

  const htmlStyle = document.documentElement.style;
  const bodyStyle = document.body.style;
  [htmlStyle, bodyStyle].forEach((styleRef) => {
    styleRef.setProperty("--center-glow-cool", cool);
    styleRef.setProperty("--center-glow-violet", violet);
    styleRef.setProperty("--center-glow-warm", warm);
    styleRef.setProperty("--center-glow-cool-rgb", coolRgb);
    styleRef.setProperty("--center-glow-violet-rgb", violetRgb);
    styleRef.setProperty("--center-glow-warm-rgb", warmRgb);
  });

  if (centerGlowVisualRefs.cosmicRingMaterial) centerGlowVisualRefs.cosmicRingMaterial.color.set(cool);
  if (centerGlowVisualRefs.cosmicAccretionRingMaterial) centerGlowVisualRefs.cosmicAccretionRingMaterial.color.set(warm);
  if (centerGlowVisualRefs.cosmicAccretionGlowMaterial) centerGlowVisualRefs.cosmicAccretionGlowMaterial.color.set(warm);
  if (centerGlowVisualRefs.cosmicHaloMaterial) centerGlowVisualRefs.cosmicHaloMaterial.color.set(cool);
  if (centerGlowVisualRefs.cosmicInnerGlowMaterial) centerGlowVisualRefs.cosmicInnerGlowMaterial.color.set(cool);
  if (centerGlowVisualRefs.cosmicNebulaMaterial) centerGlowVisualRefs.cosmicNebulaMaterial.color.set(cool);
  if (Array.isArray(centerGlowVisualRefs.cosmicDustMaterials) && centerGlowVisualRefs.cosmicDustMaterials.length) {
    centerGlowVisualRefs.cosmicDustMaterials.forEach((mat, idx) => {
      if (!mat?.color) return;
      if (idx % 3 === 0) mat.color.set(warm);
      else if (idx % 3 === 1) mat.color.set(cool);
      else mat.color.set(violet);
    });
  }
}

function bindLabsControls() {
  if (settingsTitle) {
    settingsTitle.addEventListener("click", () => {
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
  const bindLabsColorInput = (inputEl, key) => {
    if (!inputEl) return;
    inputEl.addEventListener("input", () => {
      labsSettings[key] = normalizeHexColor(inputEl.value, DEFAULT_LABS_SETTINGS[key]);
      applyLabsColorVariables();
      updateLabsControlValues();
      saveLabsSettings();
    });
  };
  bindLabsColorInput(labsLanternColorAInput, "lanternColorA");
  bindLabsColorInput(labsLanternColorBInput, "lanternColorB");
  bindLabsColorInput(labsBokehColorAInput, "bokehColorA");
  bindLabsColorInput(labsBokehColorBInput, "bokehColorB");
  bindLabsColorInput(labsMessageBarGlowColorAInput, "messageBarGlowColorA");
  bindLabsColorInput(labsMessageBarGlowColorBInput, "messageBarGlowColorB");
  if (labsMessageBarGlowStyleInput) {
    labsMessageBarGlowStyleInput.addEventListener("change", () => {
      labsSettings.messageBarGlowStyle = normalizeMessageBarGlowStyle(labsMessageBarGlowStyleInput.value);
      applyLabsColorVariables();
      updateLabsControlValues();
      saveLabsSettings();
    });
  }

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

function bindVoiceControls() {
  const saveAndRefreshVoiceUiOnly = () => {
    saveVoiceSettings();
    updateVoiceControlValues();
  };
  const applyNow = (showStatusToast = false) => {
    saveVoiceSettings();
    updateVoiceControlValues();
    refreshLocalVoiceCaptureFromSettings({ showStatusToast }).then(() => {
      if (!showStatusToast) return;
      showToast("Voice processing updated.");
    }).catch(() => {});
    if (micSelfTestProcessedStream) {
      startMicSelfTest().catch(() => {
        showToast("Mic self test could not restart with new settings.");
      });
    }
  };
  const scheduleApply = () => {
    saveVoiceSettings();
    updateVoiceControlValues();
    if (voiceSettingsApplyTimer) clearTimeout(voiceSettingsApplyTimer);
    voiceSettingsApplyTimer = setTimeout(() => {
      refreshLocalVoiceCaptureFromSettings({ showStatusToast: false }).catch(() => {});
      if (micSelfTestProcessedStream) {
        startMicSelfTest().catch(() => {
          showToast("Mic self test could not restart with new settings.");
        });
      }
      voiceSettingsApplyTimer = null;
    }, 220);
  };

  if (settingsVoiceEqEnabledInput) {
    settingsVoiceEqEnabledInput.addEventListener("change", () => {
      voiceSettings.eqEnabled = Boolean(settingsVoiceEqEnabledInput.checked);
      applyNow(true);
    });
  }
  if (settingsVoiceEchoCancellationInput) {
    settingsVoiceEchoCancellationInput.addEventListener("change", () => {
      voiceSettings.echoCancellation = Boolean(settingsVoiceEchoCancellationInput.checked);
      applyNow(true);
    });
  }
  if (settingsVoiceNoiseSuppressionInput) {
    settingsVoiceNoiseSuppressionInput.addEventListener("change", () => {
      voiceSettings.noiseSuppression = Boolean(settingsVoiceNoiseSuppressionInput.checked);
      applyNow(true);
    });
  }
  if (settingsVoiceDenoiseEnabledInput) {
    settingsVoiceDenoiseEnabledInput.addEventListener("change", () => {
      voiceSettings.denoiseEnabled = Boolean(settingsVoiceDenoiseEnabledInput.checked);
      applyNow(true);
    });
  }
  if (settingsVoiceDenoiseStrengthInput) {
    settingsVoiceDenoiseStrengthInput.addEventListener("input", () => {
      voiceSettings.denoiseStrength = clamp(Number(settingsVoiceDenoiseStrengthInput.value), 0, 100);
      scheduleApply();
    });
  }
  if (settingsVoiceEqLowInput) {
    settingsVoiceEqLowInput.addEventListener("input", () => {
      voiceSettings.eqLowGain = clamp(Number(settingsVoiceEqLowInput.value), -12, 12);
      scheduleApply();
    });
  }
  if (settingsVoiceEqMidInput) {
    settingsVoiceEqMidInput.addEventListener("input", () => {
      voiceSettings.eqMidGain = clamp(Number(settingsVoiceEqMidInput.value), -12, 12);
      scheduleApply();
    });
  }
  if (settingsVoiceEqHighInput) {
    settingsVoiceEqHighInput.addEventListener("input", () => {
      voiceSettings.eqHighGain = clamp(Number(settingsVoiceEqHighInput.value), -12, 12);
      scheduleApply();
    });
  }
  if (settingsVoiceSelfTestBtn) {
    settingsVoiceSelfTestBtn.addEventListener("click", async () => {
      if (micSelfTestProcessedStream) {
        stopMicSelfTest();
        showToast("Mic self test stopped.");
        return;
      }
      if (voiceSocket && voiceSocket.readyState === WebSocket.OPEN) {
        alert("Leave voice channel/call before running mic self test.");
        return;
      }
      try {
        await startMicSelfTest();
        showToast("Mic self test started.");
      } catch (err) {
        console.error(err);
        alert(err.message || "Mic self test failed.");
      }
    });
  }
  if (settingsVoiceCompactVideoTilesInput) {
    settingsVoiceCompactVideoTilesInput.addEventListener("change", () => {
      voiceSettings.compactVideoTiles = Boolean(settingsVoiceCompactVideoTilesInput.checked);
      saveAndRefreshVoiceUiOnly();
    });
  }
  if (settingsVoiceVideoTileScaleInput) {
    settingsVoiceVideoTileScaleInput.addEventListener("input", () => {
      voiceSettings.videoTileScale = clamp(Number(settingsVoiceVideoTileScaleInput.value), 0.7, 1.4);
      saveAndRefreshVoiceUiOnly();
    });
  }
  if (settingsVoiceScreenShareQualityInput) {
    settingsVoiceScreenShareQualityInput.addEventListener("change", () => {
      voiceSettings.screenShareQuality = getNormalizedScreenShareQuality(settingsVoiceScreenShareQualityInput.value);
      saveAndRefreshVoiceUiOnly();
      showToast(`Screen share quality set to ${voiceSettings.screenShareQuality}`);
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

  if (settingsForceRefreshBtn) {
    settingsForceRefreshBtn.addEventListener("click", async () => {
      const ok = window.confirm("Force refresh this client? This clears local Tavern caches, unregisters service workers, and reloads.");
      if (!ok) return;
      settingsForceRefreshBtn.disabled = true;
      settingsForceRefreshBtn.textContent = "Refreshing...";
      try {
        const localKeys = Object.keys(localStorage || {});
        localKeys.forEach((key) => {
          if (key.startsWith("tavern.")) localStorage.removeItem(key);
        });
      } catch {}
      try {
        const sessionKeys = Object.keys(sessionStorage || {});
        sessionKeys.forEach((key) => {
          if (key.startsWith("tavern.")) sessionStorage.removeItem(key);
        });
      } catch {}
      if ("caches" in window) {
        try {
          const names = await caches.keys();
          await Promise.all(names.map((name) => caches.delete(name)));
        } catch {}
      }
      if ("serviceWorker" in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((reg) => reg.unregister()));
        } catch {}
      }
      const next = new URL(window.location.href);
      next.searchParams.set("nocache", String(Date.now()));
      window.location.replace(next.toString());
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
    messagesPanel.addEventListener("scroll", () => {
      updateJumpUnreadState();
      maybeLoadOlderMessagesForActiveContext().catch(() => {});
    });
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

  if (channelPinsBtn) {
    channelPinsBtn.addEventListener("click", () => {
      openPinnedMessagesModal().catch((err) => {
        showToast(err?.message || "Failed to open pinned messages");
      });
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

function applyVoiceOccupancyUpdate(voiceChannelsPayload) {
  voiceChannelOccupancy.clear();
  if (!voiceChannelsPayload || typeof voiceChannelsPayload !== "object") {
    renderVoiceUsersInChannelsPanel();
    return;
  }
  Object.entries(voiceChannelsPayload).forEach(([channelId, entries]) => {
    if (!channelId || !Array.isArray(entries)) return;
    const normalized = entries
      .map((entry) => ({
        user_public_id: entry?.user_public_id ? String(entry.user_public_id) : null,
        username: entry?.username ? String(entry.username) : "Unknown",
        muted: !!entry?.muted,
        deafened: !!entry?.deafened,
        camera_on: !!entry?.camera_on,
        screen_on: !!entry?.screen_on,
        link_stream_url: entry?.link_stream_url ? String(entry.link_stream_url) : null,
      }))
      .filter((entry) => !!entry.user_public_id);
    if (normalized.length) voiceChannelOccupancy.set(channelId, normalized);
  });
  renderVoiceUsersInChannelsPanel();
}

function closePresenceSocket() {
  if (!presenceSocket) return;
  presenceSocket.onclose = null;
  presenceSocket.close();
  presenceSocket = null;
  applyVoiceOccupancyUpdate({});
  setRealtimeState("presence", false, 0);
  if (presenceReconnectTimer) {
    clearTimeout(presenceReconnectTimer);
    presenceReconnectTimer = null;
  }
}

function connectPresenceSocket() {
  if (presenceSocketBlocked) return;
  if (presenceSocket) return;
  presenceSocket = new WebSocket(buildWsUrl("/ws/presence"));
  presenceSocket._opened = false;
  presenceSocket.onopen = () => {
    presenceSocket._opened = true;
    presenceSocketFailureCount = 0;
    presenceSocketBlocked = false;
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
      applyVoiceOccupancyUpdate(data.voice_channels || {});
      applyDmPresenceIndicators();
      if (serverMembersModal?.classList.contains("open")) {
        loadServerMembersModal().catch(() => {});
      }
    } catch {
      // Ignore malformed presence payloads
    }
  };

  presenceSocket.onclose = () => {
    const opened = Boolean(presenceSocket?._opened);
    presenceSocket = null;
    applyVoiceOccupancyUpdate({});
    if (presenceReconnectTimer) clearTimeout(presenceReconnectTimer);
    if (!opened) {
      presenceSocketFailureCount += 1;
      if (presenceSocketFailureCount >= 3) {
        presenceSocketBlocked = true;
        showToast("Realtime presence disconnected (auth). Reload/login to reconnect.");
        setRealtimeState("presence", false, 0);
        return;
      }
    }
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

function isChannelSocketConnected(channelPublicId) {
  if (!channelPublicId) return false;
  const socket = channelSockets.get(channelPublicId);
  return Boolean(socket && socket.readyState === WebSocket.OPEN);
}

function isDmSocketConnected(conversationPublicId) {
  if (!conversationPublicId || !dmMessageSocket) return false;
  return dmMessageSocket.readyState === WebSocket.OPEN;
}

function openDmMessageSocket(conversationPublicId) {
  if (dmSocketBlocked) return;
  closeDmMessageSocket();
  dmMessageSocket = new WebSocket(buildWsUrl(`/ws/dms/${conversationPublicId}`));
  dmMessageSocket._opened = false;
  dmMessageSocket.onopen = () => {
    dmMessageSocket._opened = true;
    dmSocketFailureCount = 0;
    dmSocketBlocked = false;
    setRealtimeState("dm", true, 0);
  };
  dmMessageSocket.onmessage = async (event) => {
    let payload = null;
    let eventType = "message_created";
    try {
      payload = JSON.parse(event.data || "{}");
      eventType = payload?.event || "message_created";
      markSeenForContextIfPending("dm", conversationPublicId, payload.user_id);
    } catch {
      // Ignore malformed payload
    }
    if (eventType === "message_created" && payload && payload.user_id !== currentUserId) {
      emitIncomingMessageNotification("dm", conversationPublicId, payload);
    }
    if (activeMode === "dm" && activeDmConversationId === conversationPublicId) {
      const nearBottom = messagesPanel
        ? (messagesPanel.scrollTop + messagesPanel.clientHeight >= messagesPanel.scrollHeight - 64)
        : true;
      if (eventType === "message_created" && payload) {
        appendRealtimeMessageToPanel(payload, {
          context: "dm",
          nearBottom,
          mode: "dm",
          contextId: conversationPublicId,
        });
      } else {
        await loadDmMessages(conversationPublicId, eventType === "message_created" && nearBottom);
      }
    }
  };
  dmMessageSocket.onclose = () => {
    const opened = Boolean(dmMessageSocket?._opened);
    dmMessageSocket = null;
    if (!opened) {
      dmSocketFailureCount += 1;
      if (dmSocketFailureCount >= 3) {
        dmSocketBlocked = true;
        setRealtimeState("dm", false, 0);
        return;
      }
    }
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
  if (currentServerNameEl) {
    currentServerNameEl.textContent = isDmMode
      ? "Direct Messages"
      : (activeServerId ? getServerNameById(activeServerId) : "Spaces");
  }
  if (channelsPanelTitle) channelsPanelTitle.textContent = isDmMode ? "Conversations" : "Channels";
  if (openServerMembersBtn) openServerMembersBtn.classList.toggle("hidden", isDmMode);
  if (openServerSettingsBtn) openServerSettingsBtn.classList.toggle("hidden", isDmMode);
  if (openFriendsBtn) openFriendsBtn.classList.toggle("hidden", !isDmMode);
  if (openCreateDmBtn) openCreateDmBtn.classList.toggle("hidden", !isDmMode);
  if (openAddSeparatorBtn) openAddSeparatorBtn.classList.toggle("hidden", isDmMode);
  if (openDiscordImportBtn) openDiscordImportBtn.classList.toggle("hidden", isDmMode);
  if (openCreateChannelBtn) openCreateChannelBtn.classList.toggle("hidden", isDmMode);
  if (openServerSwitcherBtn) openServerSwitcherBtn.classList.remove("hidden");
  if (openCreateItemBtn) openCreateItemBtn.classList.toggle("hidden", false);
  if (homeDmBtn) homeDmBtn.classList.toggle("active", isDmMode);
  updateServerSwitcherNotificationState();
  updateDmQuickButtonState();
}

function closeServerSwitcherOverlay() {
  if (!serverSwitcherOverlay) return;
  serverSwitcherOverlay.classList.add("hidden");
  serverSwitcherOverlay.setAttribute("aria-hidden", "true");
}

function openServerSwitcherOverlay() {
  if (!serverSwitcherOverlay) return;
  serverSwitcherOverlay.classList.remove("hidden");
  serverSwitcherOverlay.setAttribute("aria-hidden", "false");
}

function updateServerSwitcherNotificationState() {
  if (!openServerSwitcherBtn) return;
  const hasUnreadElsewhere = [...unreadServers].some((id) => id !== activeServerId);
  openServerSwitcherBtn.classList.toggle("has-unread", hasUnreadElsewhere);
}

function updateDmQuickButtonState() {
  if (!homeDmBtn) return;
  const hasUnreadDm = Boolean(channelsPanel?.querySelector(".dm-item.has-unread"));
  homeDmBtn.classList.toggle("has-unread", hasUnreadDm);
}

function updateTopbar(title, showCall) {
  if (!messagesTopbar || !messagesTopbarTitle || !dmCallBtn) return;
  if (!title) {
    messagesTopbar.classList.add("hidden");
    dmCallBtn.classList.add("hidden");
    if (messageSearchBar) messageSearchBar.classList.add("hidden");
    if (messagesTopbarTypeBadge) {
      messagesTopbarTypeBadge.classList.add("hidden");
      messagesTopbarTypeBadge.textContent = "";
    }
    return;
  }
  messagesTopbar.classList.remove("hidden");
  ensureMobileChannelBackButton();
  messagesTopbarTitle.textContent = title;
  dmCallBtn.classList.toggle("hidden", !showCall);
  if (messagesTopbarTypeBadge) {
    const label = activeMode === "dm"
      ? "dm"
      : (activeChannelType || "text");
    messagesTopbarTypeBadge.textContent = `type: ${label}`;
    messagesTopbarTypeBadge.classList.remove("hidden");
  }
  updateMobileNavigationState();
}

function updateComposerPlaceholder() {
  if (!messageInput) return;
  if (activeChannelType === "voice") return;
  if (activeChannelType === "notes") {
    messageInput.placeholder = "Write notes... Use [[Other Note]] to link";
    return;
  }
  messageInput.placeholder = labsSettings.fxCommandHints
    ? "Type a message... (/roll 2d20, /party, /shrug)"
    : "Type a message...";
}

async function ensureNotesEditorShell() {
  if (!messagesPanel || notesEditorShell) return;
  notesEditorShell = document.createElement("div");
  notesEditorShell.className = "notes-editor-shell hidden";
  notesEditorShell.style.display = "block";
  notesEditorShell.style.height = "100%";
  notesEditorShell.style.padding = "8px";
  notesEditorShell.style.position = "relative";

  notesStatusEl = document.createElement("span");
  notesStatusEl.className = "notes-editor-status";
  notesStatusEl.style.display = "none";

  notesSaveBtn = document.createElement("button");
  notesSaveBtn.type = "button";
  notesSaveBtn.textContent = "Save";
  notesSaveBtn.className = "topbar-btn";
  notesSaveBtn.style.position = "absolute";
  notesSaveBtn.style.top = "12px";
  notesSaveBtn.style.right = "12px";
  notesSaveBtn.style.zIndex = "3";
  notesSaveBtn.addEventListener("click", () => {
    saveActiveNotesPage({ showSavedToast: false, switchToPreview: true }).then(() => {
      showToast("Document saved!");
    }).catch((err) => {
      alert(err.message || "Failed to save note");
    });
  });

  notesEditModeBtn = document.createElement("button");
  notesEditModeBtn.type = "button";
  notesEditModeBtn.textContent = "Edit";
  notesEditModeBtn.className = "topbar-btn";
  notesEditModeBtn.style.position = "absolute";
  notesEditModeBtn.style.top = "12px";
  notesEditModeBtn.style.right = "74px";
  notesEditModeBtn.style.zIndex = "3";
  notesEditModeBtn.addEventListener("click", () => {
    showNotesEditMode();
  });

  notesEditorHost = document.createElement("div");
  notesEditorHost.className = "notes-rich-editor-host";
  notesEditorHost.style.height = "100%";
  notesEditorHost.style.minHeight = "360px";
  notesEditorHost.style.borderRadius = "10px";
  notesEditorHost.style.overflow = "hidden";
  notesEditorHost.style.border = "1px solid rgba(255,255,255,0.14)";
  notesEditorHost.style.background = "rgba(0,0,0,0.16)";
  mountNotesPlainFallbackEditor();
  notesEditorShell.appendChild(notesEditorHost);
  notesEditorShell.appendChild(notesEditModeBtn);
  notesEditorShell.appendChild(notesSaveBtn);
  messagesPanel.appendChild(notesEditorShell);
}

function setNotesEditorStatus(text) {
  if (notesStatusEl) notesStatusEl.textContent = text || "";
}

function renderActiveNotesPreview() {
  if (!notesPreviewFrame) return;
  const text = String(getNotesEditorMarkdown() || "");
  const styleBlocks = [...text.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)].map((m) => m[0]).join("\n");
  const markdownSource = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const prepared = injectWikiLinks(markdownSource);
  const htmlBody = window.marked
    ? window.marked.parse(prepared, { gfm: true, breaks: true })
    : escapeHtml(prepared).replaceAll("\n", "<br>");
  const doc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html,body{background:transparent !important}
body{margin:0;padding:14px;color:#e9eef7;font:14px/1.6 Inter,system-ui,sans-serif;word-wrap:break-word}
code,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
pre{background:rgba(255,255,255,.06);padding:10px;border-radius:8px;overflow:auto}
blockquote{margin:0;padding-left:10px;border-left:3px solid rgba(121,198,255,.45)}
a{color:#79c6ff} img{max-width:100%;height:auto}
table{border-collapse:collapse;width:100%} th,td{border:1px solid rgba(255,255,255,.12);padding:6px 8px}
</style>
${styleBlocks}
</head><body>${htmlBody}</body></html>`;
  notesPreviewFrame.srcdoc = doc;
}

function mountNotesPlainFallbackEditor() {
  if (!notesEditorHost) return;
  notesEditorHost.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.style.height = "100%";
  wrap.style.minHeight = "360px";
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  wrap.style.gap = "8px";
  wrap.style.padding = "12px";

  notesEditorTextarea = document.createElement("textarea");
  notesEditorTextarea.className = "notes-editor-textarea";
  notesEditorTextarea.placeholder = "Write markdown / HTML / CSS notes...";
  notesEditorTextarea.style.flex = "0 0 45%";
  notesEditorTextarea.style.minHeight = "220px";
  notesEditorTextarea.style.resize = "none";
  notesEditorTextarea.style.padding = "12px";
  notesEditorTextarea.style.borderRadius = "8px";
  notesEditorTextarea.style.border = "1px solid rgba(255,255,255,0.14)";
  notesEditorTextarea.style.background = "rgba(0,0,0,0.12)";
  notesEditorTextarea.style.color = "inherit";
  notesEditorTextarea.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  notesEditorTextarea.style.lineHeight = "1.5";
  notesEditorTextarea.style.outline = "none";
  notesEditorTextarea.addEventListener("input", () => {
    notesOverlayEditing = true;
    queueNotesAutosave();
  });
  notesPreviewFrame = document.createElement("iframe");
  notesPreviewFrame.className = "notes-preview-frame";
  notesPreviewFrame.setAttribute("sandbox", "allow-same-origin");
  notesPreviewFrame.style.flex = "1";
  notesPreviewFrame.style.width = "100%";
  notesPreviewFrame.style.minHeight = "180px";
  notesPreviewFrame.style.borderRadius = "8px";
  notesPreviewFrame.style.border = "1px solid rgba(255,255,255,0.14)";
  notesPreviewFrame.style.background = "transparent";

  wrap.appendChild(notesEditorTextarea);
  wrap.appendChild(notesPreviewFrame);
  notesEditorHost.appendChild(wrap);
}

function showNotesEditMode() {
  notesOverlayEditing = true;
  notesIsEditMode = true;
  notesPreviewVisible = false;
  if (notesEditorTextarea) {
    notesEditorTextarea.style.display = "";
    notesEditorTextarea.focus();
  }
  if (notesPreviewFrame) notesPreviewFrame.style.display = "none";
  if (notesEditModeBtn) notesEditModeBtn.style.display = "none";
  if (notesSaveBtn) notesSaveBtn.style.display = "";
}

function showNotesPreviewMode() {
  notesOverlayEditing = false;
  notesIsEditMode = false;
  notesPreviewVisible = true;
  renderActiveNotesPreview();
  if (notesEditorTextarea) notesEditorTextarea.style.display = "none";
  if (notesPreviewFrame) notesPreviewFrame.style.display = "";
  if (notesEditModeBtn) notesEditModeBtn.style.display = "";
  if (notesSaveBtn) notesSaveBtn.style.display = "none";
}

function getNotesEditorMarkdown() {
  if (notesEditorTextarea) return String(notesEditorTextarea.value || "");
  return "";
}

function setNotesEditorMarkdown(value) {
  const content = String(value || "");
  if (notesEditorTextarea) notesEditorTextarea.value = content;
}

function queueNotesAutosave() {
  if (activeMode !== "server" || activeChannelType !== "notes") return;
  if (notesSaveTimer) clearTimeout(notesSaveTimer);
  setNotesEditorStatus("Editing...");
  notesSaveTimer = setTimeout(() => {
    notesSaveTimer = null;
    saveActiveNotesPage({ switchToPreview: false }).catch(() => {
      setNotesEditorStatus("Autosave failed");
    });
  }, 900);
}

function getLatestTopLevelMessage(messages) {
  const topLevel = (messages || []).filter((msg) => !msg.parent_message_public_id);
  return topLevel[topLevel.length - 1] || null;
}

async function loadNotesPage(channelPublicId) {
  await ensureNotesEditorShell();
  if (!notesEditorShell) return;
  if (notesSaveTimer) {
    clearTimeout(notesSaveTimer);
    notesSaveTimer = null;
  }
  setJumpUnreadVisible(false);
  updateTextVsVoiceUI();
  messagesPanel.innerHTML = "";
  messagesPanel.appendChild(notesEditorShell);
  notesEditorShell.classList.remove("hidden");
  setNotesEditorStatus("Loading note...");
  const res = await fetch(`/messages/${channelPublicId}`, { credentials: "include" });
  if (!res.ok) {
    setNotesEditorStatus("Could not load note");
    throw new Error(`Failed to load notes page: ${res.status}`);
  }
  const messages = await res.json();
  const latest = getLatestTopLevelMessage(messages);
  activeNoteMessageId = latest?.public_id || null;
  activeNoteLoadedContent = String(latest?.content || "");
  setNotesEditorMarkdown(activeNoteLoadedContent);
  showNotesPreviewMode();
  if (notesEditorTextarea) {
    notesEditorTextarea.scrollTop = 0;
    if (notesIsEditMode) notesEditorTextarea.focus();
  }
  const timeLabel = latest?.edited_at || latest?.created_at;
  setNotesEditorStatus(timeLabel ? `Loaded \u00B7 ${formatTimestamp(timeLabel)}` : "New note");
  channelLastSeen.set(channelPublicId, Date.now());
  markChannelRead(channelPublicId);
  recalculateUnreadServers();
  renderTypingIndicator();
  refreshSendStatusForActiveContext();
}

async function saveActiveNotesPage(options = {}) {
  if (activeMode !== "server" || activeChannelType !== "notes" || !activeChannelId) return;
  const content = getNotesEditorMarkdown();
  if (notesSaveInFlight) return;
  if (content === activeNoteLoadedContent && activeNoteMessageId) {
    setNotesEditorStatus("Saved");
    return;
  }
  notesSaveInFlight = true;
  if (notesSaveBtn) notesSaveBtn.disabled = true;
  setNotesEditorStatus("Saving...");
  try {
    let savedMessage = null;
    if (!activeNoteMessageId) {
      if (!content.trim()) {
        setNotesEditorStatus("Empty note");
        return;
      }
      const res = await fetch(`/messages/${activeChannelId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parent_message_public_id: null }),
      });
      if (!res.ok) throw new Error("Failed to create note");
      savedMessage = await res.json().catch(() => null);
    } else {
      savedMessage = await patchMessageContent(activeNoteMessageId, content);
    }
    activeNoteMessageId = savedMessage?.public_id || activeNoteMessageId;
    activeNoteLoadedContent = content;
    setDeliveredForContext("server", activeChannelId, savedMessage);
    if (options.switchToPreview !== false) showNotesPreviewMode();
    else if (notesPreviewVisible || notesOverlayEditing) renderActiveNotesPreview();
    setNotesEditorStatus("Saved");
    if (options.showSavedToast) showToast("Note saved");
  } finally {
    notesSaveInFlight = false;
    if (notesSaveBtn) notesSaveBtn.disabled = false;
  }
}

function getDefaultBattlemapState() {
  return {
    backgroundImage: "",
    gridEnabled: true,
    gridSize: 48,
    gridOpacity: 0.22,
    pawns: [],
    currentTurnPawnId: null,
    round: 1,
  };
}

function normalizePawnConditions(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .slice(0, 12);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 12);
  }
  return [];
}

function normalizeBattlemapState(raw) {
  const base = getDefaultBattlemapState();
  const src = raw && typeof raw === "object" ? raw : {};
  return {
    ...base,
    ...src,
    gridEnabled: src.gridEnabled !== false,
    gridSize: Math.max(16, Math.min(128, Number(src.gridSize) || base.gridSize)),
    pawns: Array.isArray(src.pawns) ? src.pawns.map((p) => ({
      id: String(p?.id || `pawn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
      name: String(p?.name || "Pawn"),
      type: ["pc", "npc", "enemy"].includes(String(p?.type || "")) ? String(p.type) : "npc",
      x: Math.max(0, Math.min(1, Number(p?.x) || 0.5)),
      y: Math.max(0, Math.min(1, Number(p?.y) || 0.5)),
      hp: Number.isFinite(Number(p?.hp)) ? Number(p.hp) : 10,
      maxHp: Number.isFinite(Number(p?.maxHp)) ? Math.max(1, Number(p.maxHp)) : 10,
      initiative: Number.isFinite(Number(p?.initiative)) ? Number(p.initiative) : 0,
      color: String(p?.color || ""),
      conditions: normalizePawnConditions(p?.conditions),
      concentration: Boolean(p?.concentration),
    })) : [],
    currentTurnPawnId: src.currentTurnPawnId ? String(src.currentTurnPawnId) : null,
    round: Math.max(1, Number(src.round) || base.round),
  };
}

function getBattlemapChannelState(channelId) {
  return normalizeBattlemapState(getStoredObject(getBattlemapStateStorageKey(channelId), getDefaultBattlemapState()));
}

function hasBattlemapStateContent(state) {
  const normalized = normalizeBattlemapState(state);
  return Boolean(normalized.backgroundImage || normalized.pawns.length);
}

function saveBattlemapChannelState(channelId, nextState) {
  if (!channelId) return;
  const stateToSave = nextState || getDefaultBattlemapState();
  const storageKey = getBattlemapStateStorageKey(channelId);
  try {
    saveObject(storageKey, stateToSave);
  } catch {
    // Mobile Safari / PWA storage can fail on large map image Data URLs.
    // Keep a lightweight cache so live battlemap sync/render still works.
    try {
      const fallbackState = {
        ...normalizeBattlemapState(stateToSave),
        backgroundImage: "",
      };
      saveObject(storageKey, fallbackState);
    } catch {
      // Ignore local cache failures; in-memory state + websocket sync can still function.
    }
  }
}

async function fetchBattlemapServerState(channelId) {
  if (!channelId) return null;
  if (battlemapServerLoadPromises.has(channelId)) return battlemapServerLoadPromises.get(channelId);
  const promise = (async () => {
    try {
      const res = await fetch(`/channels/${channelId}/battlemap-state`, { credentials: "include" });
      if (!res.ok) return null;
      const payload = await res.json().catch(() => null);
      return normalizeBattlemapState(payload?.state);
    } catch {
      return null;
    }
  })();
  battlemapServerLoadPromises.set(channelId, promise);
  try {
    return await promise;
  } finally {
    battlemapServerLoadPromises.delete(channelId);
  }
}

async function flushBattlemapServerStateSave(channelId) {
  if (!channelId) return;
  if (battlemapServerSaveInFlight.get(channelId)) {
    battlemapServerSavePendingFlush.add(channelId);
    return;
  }
  const state = battlemapServerSaveQueuedStates.get(channelId);
  if (!state) return;
  battlemapServerSaveInFlight.set(channelId, true);
  try {
    await fetch(`/channels/${channelId}/battlemap-state`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
  } catch {
    // Keep local/websocket state primary if persistence write fails.
  } finally {
    battlemapServerSaveInFlight.delete(channelId);
    if (battlemapServerSavePendingFlush.has(channelId)) {
      battlemapServerSavePendingFlush.delete(channelId);
      if (battlemapServerSaveQueuedStates.has(channelId)) {
        setTimeout(() => {
          flushBattlemapServerStateSave(channelId).catch(() => {});
        }, 50);
      }
    }
  }
}

function queueBattlemapServerStateSave(channelId, state, { immediate = false } = {}) {
  if (!channelId) return;
  battlemapServerSaveQueuedStates.set(channelId, normalizeBattlemapState(state));
  const existingTimer = battlemapServerSaveTimers.get(channelId);
  if (existingTimer) {
    clearTimeout(existingTimer);
    battlemapServerSaveTimers.delete(channelId);
  }
  if (immediate) {
    flushBattlemapServerStateSave(channelId).catch(() => {});
    return;
  }
  const timer = setTimeout(() => {
    battlemapServerSaveTimers.delete(channelId);
    flushBattlemapServerStateSave(channelId).catch(() => {});
  }, BATTLEMAP_SERVER_SAVE_DEBOUNCE_MS);
  battlemapServerSaveTimers.set(channelId, timer);
}

function hydrateBattlemapStateFromServer(channelId, localStateAtOpen) {
  if (!channelId) return;
  fetchBattlemapServerState(channelId).then((serverState) => {
    if (!serverState) return;
    const serverHasContent = hasBattlemapStateContent(serverState);
    const localHasContent = hasBattlemapStateContent(localStateAtOpen);
    if (serverHasContent) {
      saveBattlemapChannelState(channelId, serverState);
      if (channelId === activeChannelId && activeChannelType === "battlemap") {
        battlemapState = serverState;
        if (
          battlemapSelectedPawnId &&
          !serverState.pawns.some((pawn) => pawn.id === battlemapSelectedPawnId)
        ) {
          battlemapSelectedPawnId = null;
        }
        renderBattlemapState();
      }
      return;
    }
    if (localHasContent) {
      queueBattlemapServerStateSave(channelId, localStateAtOpen, { immediate: true });
    }
  }).catch(() => {});
}

function sendChannelSocketEvent(channelId, payload) {
  if (!channelId || !payload || typeof payload !== "object") return false;
  const socket = channelSockets.get(channelId);
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  try {
    socket.send(JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

function persistBattlemapState(channelId, nextState, { broadcast = true, saveRemote = true } = {}) {
  if (!channelId) return;
  const normalized = normalizeBattlemapState(nextState);
  saveBattlemapChannelState(channelId, normalized);
  if (saveRemote) queueBattlemapServerStateSave(channelId, normalized);
  if (broadcast) {
    sendChannelSocketEvent(channelId, {
      type: "battlemap_state_update",
      state: normalized,
    });
  }
}

function getBattlemapPawnColor(pawn) {
  if (pawn?.color) return pawn.color;
  if (pawn?.type === "pc") return "#4da3ff";
  if (pawn?.type === "enemy") return "#d95757";
  return "#7f8c9f";
}

function ensureBattlemapShell() {
  if (!messagesPanel) return;
  const messagesMainPanel = messagesPanel.parentElement;
  if (!messagesMainPanel) return;
  if (battlemapShell && battlemapShell.isConnected) return;
  if (battlemapShell && !battlemapShell.isConnected) {
    battlemapShell = null;
    battlemapCanvasEl = null;
    battlemapGridOverlayEl = null;
    battlemapPawnsLayerEl = null;
    battlemapInitiativeListEl = null;
    battlemapHealthListEl = null;
    battlemapBackgroundInput = null;
    battlemapGridToggleInput = null;
    battlemapGridSizeInput = null;
    battlemapGridSizeValue = null;
    battlemapAddPawnBtn = null;
    battlemapNextTurnBtn = null;
    battlemapRoundLabelEl = null;
    battlemapResetRoundBtn = null;
  }

  battlemapShell = document.createElement("div");
  battlemapShell.className = "battlemap-shell hidden";
  battlemapShell.style.display = "none";
  battlemapShell.style.margin = "8px 8px 0";
  battlemapShell.style.border = "1px solid rgba(255,255,255,0.12)";
  battlemapShell.style.borderRadius = "12px";
  battlemapShell.style.background = "rgba(255,255,255,0.04)";
  battlemapShell.style.overflow = "auto";
  battlemapShell.style.minHeight = "280px";
  battlemapShell.style.height = "360px";
  battlemapShell.style.maxHeight = "70vh";
  battlemapShell.style.resize = "vertical";

  const layout = document.createElement("div");
  layout.style.display = "grid";
  layout.style.gridTemplateColumns = "minmax(0, 1fr) 300px";
  layout.style.height = "100%";
  layout.style.minHeight = "280px";
  battlemapShell.appendChild(layout);

  const left = document.createElement("div");
  left.style.display = "grid";
  left.style.gridTemplateRows = "auto 1fr";
  left.style.minHeight = "0";
  left.style.borderRight = "1px solid rgba(255,255,255,0.08)";
  layout.appendChild(left);

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexWrap = "wrap";
  controls.style.gap = "8px";
  controls.style.padding = "8px";
  controls.style.alignItems = "center";
  controls.style.background = "rgba(255,255,255,0.03)";
  left.appendChild(controls);

  const uploadBtn = document.createElement("button");
  uploadBtn.type = "button";
  uploadBtn.className = "topbar-btn";
  uploadBtn.textContent = "Map Image";
  controls.appendChild(uploadBtn);

  battlemapBackgroundInput = document.createElement("input");
  battlemapBackgroundInput.type = "file";
  battlemapBackgroundInput.accept = "image/*";
  battlemapBackgroundInput.hidden = true;
  controls.appendChild(battlemapBackgroundInput);

  const clearMapBtn = document.createElement("button");
  clearMapBtn.type = "button";
  clearMapBtn.className = "topbar-btn";
  clearMapBtn.textContent = "Clear Map";
  controls.appendChild(clearMapBtn);

  const gridLabel = document.createElement("label");
  gridLabel.style.display = "inline-flex";
  gridLabel.style.alignItems = "center";
  gridLabel.style.gap = "6px";
  gridLabel.style.fontSize = "12px";
  battlemapGridToggleInput = document.createElement("input");
  battlemapGridToggleInput.type = "checkbox";
  gridLabel.appendChild(battlemapGridToggleInput);
  gridLabel.appendChild(document.createTextNode("Grid"));
  controls.appendChild(gridLabel);

  const gridSizeWrap = document.createElement("label");
  gridSizeWrap.style.display = "inline-flex";
  gridSizeWrap.style.alignItems = "center";
  gridSizeWrap.style.gap = "6px";
  gridSizeWrap.style.fontSize = "12px";
  gridSizeWrap.appendChild(document.createTextNode("Size"));
  battlemapGridSizeInput = document.createElement("input");
  battlemapGridSizeInput.type = "range";
  battlemapGridSizeInput.min = "16";
  battlemapGridSizeInput.max = "128";
  battlemapGridSizeInput.step = "1";
  battlemapGridSizeInput.style.width = "100px";
  gridSizeWrap.appendChild(battlemapGridSizeInput);
  battlemapGridSizeValue = document.createElement("span");
  battlemapGridSizeValue.style.color = "var(--muted)";
  battlemapGridSizeValue.style.fontSize = "12px";
  gridSizeWrap.appendChild(battlemapGridSizeValue);
  controls.appendChild(gridSizeWrap);

  battlemapAddPawnBtn = document.createElement("button");
  battlemapAddPawnBtn.type = "button";
  battlemapAddPawnBtn.className = "topbar-btn";
  battlemapAddPawnBtn.textContent = "Add Pawn";
  controls.appendChild(battlemapAddPawnBtn);

  const mapWrap = document.createElement("div");
  mapWrap.style.position = "relative";
  mapWrap.style.minHeight = "220px";
  mapWrap.style.height = "100%";
  mapWrap.style.background = "rgba(0,0,0,0.16)";
  mapWrap.style.overflow = "hidden";
  left.appendChild(mapWrap);

  battlemapCanvasEl = document.createElement("div");
  battlemapCanvasEl.style.position = "absolute";
  battlemapCanvasEl.style.inset = "0";
  battlemapCanvasEl.style.backgroundPosition = "center";
  battlemapCanvasEl.style.backgroundSize = "contain";
  battlemapCanvasEl.style.backgroundRepeat = "no-repeat";
  battlemapCanvasEl.style.backgroundColor = "rgba(0,0,0,0.18)";
  mapWrap.appendChild(battlemapCanvasEl);

  battlemapGridOverlayEl = document.createElement("div");
  battlemapGridOverlayEl.style.position = "absolute";
  battlemapGridOverlayEl.style.inset = "0";
  battlemapGridOverlayEl.style.pointerEvents = "none";
  mapWrap.appendChild(battlemapGridOverlayEl);

  battlemapPawnsLayerEl = document.createElement("div");
  battlemapPawnsLayerEl.style.position = "absolute";
  battlemapPawnsLayerEl.style.inset = "0";
  battlemapPawnsLayerEl.style.pointerEvents = "auto";
  mapWrap.appendChild(battlemapPawnsLayerEl);

  const right = document.createElement("div");
  right.style.display = "grid";
  right.style.gridTemplateRows = "auto 1fr 1fr";
  right.style.minHeight = "0";
  layout.appendChild(right);

  const sideHeader = document.createElement("div");
  sideHeader.style.display = "flex";
  sideHeader.style.justifyContent = "space-between";
  sideHeader.style.alignItems = "center";
  sideHeader.style.padding = "8px 10px";
  sideHeader.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  const sideTitleWrap = document.createElement("div");
  sideTitleWrap.style.display = "grid";
  sideTitleWrap.style.gap = "2px";
  const sideTitle = document.createElement("strong");
  sideTitle.style.fontSize = "13px";
  sideTitle.textContent = "Battle Tools";
  battlemapRoundLabelEl = document.createElement("span");
  battlemapRoundLabelEl.style.fontSize = "11px";
  battlemapRoundLabelEl.style.color = "var(--muted)";
  battlemapRoundLabelEl.textContent = "Round 1";
  sideTitleWrap.appendChild(sideTitle);
  sideTitleWrap.appendChild(battlemapRoundLabelEl);
  sideHeader.appendChild(sideTitleWrap);
  const sideButtons = document.createElement("div");
  sideButtons.style.display = "inline-flex";
  sideButtons.style.gap = "6px";
  battlemapResetRoundBtn = document.createElement("button");
  battlemapResetRoundBtn.type = "button";
  battlemapResetRoundBtn.className = "topbar-btn";
  battlemapResetRoundBtn.textContent = "Reset";
  sideButtons.appendChild(battlemapResetRoundBtn);
  battlemapNextTurnBtn = document.createElement("button");
  battlemapNextTurnBtn.type = "button";
  battlemapNextTurnBtn.className = "topbar-btn";
  battlemapNextTurnBtn.textContent = "Next Turn";
  sideButtons.appendChild(battlemapNextTurnBtn);
  sideHeader.appendChild(sideButtons);
  right.appendChild(sideHeader);

  const initPane = document.createElement("div");
  initPane.style.minHeight = "0";
  initPane.style.overflow = "auto";
  initPane.style.padding = "8px";
  initPane.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  initPane.innerHTML = "<div style='font-weight:600;font-size:12px;margin-bottom:6px;'>Initiative</div>";
  battlemapInitiativeListEl = document.createElement("div");
  battlemapInitiativeListEl.style.display = "grid";
  battlemapInitiativeListEl.style.gap = "6px";
  initPane.appendChild(battlemapInitiativeListEl);
  right.appendChild(initPane);

  const hpPane = document.createElement("div");
  hpPane.style.minHeight = "0";
  hpPane.style.overflow = "auto";
  hpPane.style.padding = "8px";
  hpPane.innerHTML = "<div style='font-weight:600;font-size:12px;margin-bottom:6px;'>Health</div>";
  battlemapHealthListEl = document.createElement("div");
  battlemapHealthListEl.style.display = "grid";
  battlemapHealthListEl.style.gap = "6px";
  hpPane.appendChild(battlemapHealthListEl);
  right.appendChild(hpPane);

  if (messagesPanel) messagesMainPanel.insertBefore(battlemapShell, messagesPanel);
  else messagesMainPanel.appendChild(battlemapShell);

  uploadBtn.addEventListener("click", () => battlemapBackgroundInput?.click());
  battlemapBackgroundInput.addEventListener("change", () => {
    const file = battlemapBackgroundInput.files?.[0];
    if (!file || !activeChannelId || activeChannelType !== "battlemap") return;
    const reader = new FileReader();
    reader.onload = () => {
      if (!battlemapState) return;
      battlemapState.backgroundImage = typeof reader.result === "string" ? reader.result : "";
      persistBattlemapState(activeChannelId, battlemapState);
      renderBattlemapState();
    };
    reader.readAsDataURL(file);
  });
  clearMapBtn.addEventListener("click", () => {
    if (!battlemapState || !activeChannelId) return;
    battlemapState.backgroundImage = "";
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });
  battlemapGridToggleInput.addEventListener("change", () => {
    if (!battlemapState || !activeChannelId) return;
    battlemapState.gridEnabled = !!battlemapGridToggleInput.checked;
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });
  battlemapGridSizeInput.addEventListener("input", () => {
    if (!battlemapState || !activeChannelId) return;
    battlemapState.gridSize = Math.max(16, Math.min(128, Number(battlemapGridSizeInput.value) || 48));
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });
  battlemapAddPawnBtn.addEventListener("click", () => {
    if (!battlemapState || !activeChannelId) return;
    const name = window.prompt("Pawn name:");
    if (!name || !name.trim()) return;
    const typeRaw = (window.prompt("Pawn type: pc / npc / enemy", "npc") || "npc").trim().toLowerCase();
    const type = ["pc", "npc", "enemy"].includes(typeRaw) ? typeRaw : "npc";
    const pawn = {
      id: `pawn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      type,
      x: 0.5 + (Math.random() * 0.16 - 0.08),
      y: 0.5 + (Math.random() * 0.16 - 0.08),
      hp: type === "enemy" ? 15 : 20,
      maxHp: type === "enemy" ? 15 : 20,
      initiative: 0,
      color: "",
      conditions: [],
      concentration: false,
    };
    battlemapState.pawns.push(pawn);
    if (!battlemapState.currentTurnPawnId) battlemapState.currentTurnPawnId = pawn.id;
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });
  battlemapResetRoundBtn.addEventListener("click", () => {
    if (!battlemapState || !activeChannelId) return;
    battlemapState.round = 1;
    const sorted = [...battlemapState.pawns].sort((a, b) => Number(b.initiative || 0) - Number(a.initiative || 0));
    battlemapState.currentTurnPawnId = sorted[0]?.id || battlemapState.pawns[0]?.id || null;
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });
  battlemapNextTurnBtn.addEventListener("click", () => {
    if (!battlemapState || !battlemapState.pawns.length || !activeChannelId) return;
    const sorted = [...battlemapState.pawns].sort((a, b) => Number(b.initiative || 0) - Number(a.initiative || 0));
    if (!sorted.length) return;
    const idx = Math.max(0, sorted.findIndex((p) => p.id === battlemapState.currentTurnPawnId));
    const next = sorted[(idx + 1) % sorted.length];
    if (idx === sorted.length - 1 && sorted.length > 1) {
      battlemapState.round = Math.max(1, Number(battlemapState.round || 1)) + 1;
    }
    battlemapState.currentTurnPawnId = next.id;
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapState();
  });

  const onDragMove = (event) => {
    if (!battlemapDragState || !battlemapState || !battlemapPawnsLayerEl || !activeChannelId) return;
    const rect = battlemapPawnsLayerEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const pawn = battlemapState.pawns.find((p) => p.id === battlemapDragState.pawnId);
    if (!pawn) return;
    pawn.x = x;
    pawn.y = y;
    renderBattlemapPawns();
  };
  const onDragEnd = () => {
    if (!battlemapDragState || !battlemapState || !activeChannelId) return;
    battlemapDragState = null;
    persistBattlemapState(activeChannelId, battlemapState);
    renderBattlemapTrackers();
  };
  window.addEventListener("pointermove", onDragMove);
  window.addEventListener("pointerup", onDragEnd);
}

function renderBattlemapPawns() {
  if (!battlemapPawnsLayerEl || !battlemapState) return;
  battlemapPawnsLayerEl.innerHTML = "";
  (battlemapState.pawns || []).forEach((pawn) => {
    const token = document.createElement("button");
    token.type = "button";
    token.className = "battlemap-pawn-token";
    token.title = `${pawn.name} (${pawn.type})`;
    token.style.position = "absolute";
    token.style.left = `${(pawn.x || 0.5) * 100}%`;
    token.style.top = `${(pawn.y || 0.5) * 100}%`;
    token.style.transform = "translate(-50%, -50%)";
    token.style.width = "34px";
    token.style.height = "34px";
    token.style.borderRadius = "999px";
    token.style.border = pawn.id === battlemapState.currentTurnPawnId ? "2px solid #ffd166" : "2px solid rgba(255,255,255,0.75)";
    token.style.background = getBattlemapPawnColor(pawn);
    token.style.color = "#fff";
    token.style.fontWeight = "700";
    token.style.fontSize = "11px";
    token.style.boxShadow = "0 4px 10px rgba(0,0,0,0.25)";
    token.style.cursor = "grab";
    token.textContent = String(pawn.name || "?").trim().slice(0, 2).toUpperCase();
    token.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      battlemapSelectedPawnId = pawn.id;
      battlemapDragState = { pawnId: pawn.id };
      token.style.cursor = "grabbing";
      renderBattlemapTrackers();
    });
    token.addEventListener("click", (event) => {
      event.preventDefault();
      battlemapSelectedPawnId = pawn.id;
      renderBattlemapTrackers();
    });
    battlemapPawnsLayerEl.appendChild(token);
  });
}

function renderBattlemapTrackers() {
  if (!battlemapState) return;
  const pawns = Array.isArray(battlemapState.pawns) ? battlemapState.pawns : [];
  if (battlemapRoundLabelEl) {
    battlemapRoundLabelEl.textContent = `Round ${Math.max(1, Number(battlemapState.round || 1))}`;
  }
  if (battlemapInitiativeListEl) {
    battlemapInitiativeListEl.innerHTML = "";
    const sorted = [...pawns].sort((a, b) => Number(b.initiative || 0) - Number(a.initiative || 0));
    if (!sorted.length) {
      const empty = document.createElement("div");
      empty.style.color = "var(--muted)";
      empty.style.fontSize = "12px";
      empty.textContent = "No pawns yet";
      battlemapInitiativeListEl.appendChild(empty);
    } else {
      sorted.forEach((pawn) => {
        const row = document.createElement("div");
        row.style.display = "grid";
        row.style.gridTemplateColumns = "18px minmax(0,1fr) 56px";
        row.style.gap = "6px";
        row.style.alignItems = "center";
        row.style.padding = "6px";
        row.style.border = "1px solid rgba(255,255,255,0.08)";
        row.style.borderRadius = "8px";
        row.style.background = pawn.id === battlemapState.currentTurnPawnId ? "rgba(255,209,102,0.12)" : "rgba(255,255,255,0.03)";
        const dot = document.createElement("span");
        dot.style.width = "12px";
        dot.style.height = "12px";
        dot.style.borderRadius = "999px";
        dot.style.background = getBattlemapPawnColor(pawn);
        row.appendChild(dot);
        const name = document.createElement("button");
        name.type = "button";
        name.style.border = "none";
        name.style.background = "transparent";
        name.style.color = "inherit";
        name.style.textAlign = "left";
        name.style.padding = "0";
        name.style.cursor = "pointer";
        name.style.overflow = "hidden";
        name.style.textOverflow = "ellipsis";
        name.style.whiteSpace = "nowrap";
        name.textContent = pawn.concentration ? `${pawn.name} [C]` : pawn.name;
        if (Array.isArray(pawn.conditions) && pawn.conditions.length > 0) {
          name.title = `${pawn.name} - ${pawn.conditions.join(", ")}`;
        }
        name.addEventListener("click", () => {
          battlemapState.currentTurnPawnId = pawn.id;
          battlemapSelectedPawnId = pawn.id;
          if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
          renderBattlemapState();
        });
        row.appendChild(name);
        const initInput = document.createElement("input");
        initInput.type = "number";
        initInput.value = String(Number(pawn.initiative || 0));
        initInput.style.width = "56px";
        initInput.style.height = "28px";
        initInput.style.background = "rgba(255,255,255,0.08)";
        initInput.style.border = "1px solid rgba(255,255,255,0.12)";
        initInput.style.borderRadius = "6px";
        initInput.style.color = "inherit";
        initInput.addEventListener("change", () => {
          pawn.initiative = Number(initInput.value) || 0;
          if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
          renderBattlemapTrackers();
        });
        row.appendChild(initInput);
        battlemapInitiativeListEl.appendChild(row);
      });
    }
  }

  if (battlemapHealthListEl) {
    battlemapHealthListEl.innerHTML = "";
    pawns.forEach((pawn) => {
      const row = document.createElement("div");
      row.style.display = "grid";
      row.style.gridTemplateColumns = "minmax(0,1fr) auto auto auto auto auto auto";
      row.style.gap = "6px";
      row.style.alignItems = "center";
      row.style.padding = "6px";
      row.style.border = "1px solid rgba(255,255,255,0.08)";
      row.style.borderRadius = "8px";
      row.style.background = pawn.id === battlemapSelectedPawnId ? "rgba(121,198,255,0.12)" : "rgba(255,255,255,0.03)";
      pawn.maxHp = Math.max(1, Number(pawn.maxHp || 1));
      pawn.hp = Math.max(0, Math.min(Number(pawn.hp || 0), pawn.maxHp));
      const name = document.createElement("span");
      name.style.minWidth = "0";
      name.style.overflow = "hidden";
      name.style.textOverflow = "ellipsis";
      name.style.whiteSpace = "nowrap";
      name.textContent = pawn.concentration ? `${pawn.name} [C]` : pawn.name;
      if (pawn.hp <= 0) {
        row.style.opacity = "0.66";
        name.style.textDecoration = "line-through";
      }
      row.appendChild(name);
      const hpInput = document.createElement("input");
      hpInput.type = "number";
      hpInput.value = String(Number(pawn.hp || 0));
      hpInput.style.width = "52px";
      hpInput.style.height = "28px";
      hpInput.style.background = "rgba(255,255,255,0.08)";
      hpInput.style.border = "1px solid rgba(255,255,255,0.12)";
      hpInput.style.borderRadius = "6px";
      hpInput.style.color = "inherit";
      hpInput.addEventListener("change", () => {
        pawn.hp = Math.max(0, Number(hpInput.value) || 0);
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });
      row.appendChild(hpInput);
      const slash = document.createElement("span");
      slash.textContent = "/";
      slash.style.color = "var(--muted)";
      row.appendChild(slash);
      const maxInput = document.createElement("input");
      maxInput.type = "number";
      maxInput.value = String(Math.max(1, Number(pawn.maxHp || 1)));
      maxInput.style.width = "52px";
      maxInput.style.height = "28px";
      maxInput.style.background = "rgba(255,255,255,0.08)";
      maxInput.style.border = "1px solid rgba(255,255,255,0.12)";
      maxInput.style.borderRadius = "6px";
      maxInput.style.color = "inherit";
      maxInput.addEventListener("change", () => {
        pawn.maxHp = Math.max(1, Number(maxInput.value) || 1);
        pawn.hp = Math.min(pawn.hp, pawn.maxHp);
        hpInput.value = String(pawn.hp);
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });
      row.appendChild(maxInput);
      const damageBtn = document.createElement("button");
      damageBtn.type = "button";
      damageBtn.textContent = "-1";
      damageBtn.className = "topbar-btn";
      damageBtn.style.height = "26px";
      damageBtn.style.minWidth = "34px";
      damageBtn.style.padding = "0 6px";
      damageBtn.addEventListener("click", () => {
        pawn.hp = Math.max(0, Number(pawn.hp || 0) - 1);
        hpInput.value = String(pawn.hp);
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });
      row.appendChild(damageBtn);
      const healBtn = document.createElement("button");
      healBtn.type = "button";
      healBtn.textContent = "+1";
      healBtn.className = "topbar-btn";
      healBtn.style.height = "26px";
      healBtn.style.minWidth = "34px";
      healBtn.style.padding = "0 6px";
      healBtn.addEventListener("click", () => {
        pawn.hp = Math.min(Math.max(1, Number(pawn.maxHp || 1)), Number(pawn.hp || 0) + 1);
        hpInput.value = String(pawn.hp);
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });
      row.appendChild(healBtn);
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "x";
      removeBtn.title = "Remove pawn";
      removeBtn.style.width = "26px";
      removeBtn.style.height = "26px";
      removeBtn.style.borderRadius = "999px";
      removeBtn.style.border = "none";
      removeBtn.style.background = "rgba(209,71,71,0.85)";
      removeBtn.style.color = "#fff";
      removeBtn.style.cursor = "pointer";
      removeBtn.addEventListener("click", () => {
        battlemapState.pawns = battlemapState.pawns.filter((p) => p.id !== pawn.id);
        if (battlemapState.currentTurnPawnId === pawn.id) {
          battlemapState.currentTurnPawnId = battlemapState.pawns[0]?.id || null;
        }
        if (battlemapSelectedPawnId === pawn.id) battlemapSelectedPawnId = null;
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapState();
      });
      row.appendChild(removeBtn);
      battlemapHealthListEl.appendChild(row);

      const detailsRow = document.createElement("div");
      detailsRow.style.display = "grid";
      detailsRow.style.gridTemplateColumns = "minmax(0,1fr) auto";
      detailsRow.style.gap = "8px";
      detailsRow.style.alignItems = "center";
      detailsRow.style.padding = "0 2px 8px";

      const conditionsInput = document.createElement("input");
      conditionsInput.type = "text";
      conditionsInput.placeholder = "Conditions (comma separated)";
      conditionsInput.value = Array.isArray(pawn.conditions) ? pawn.conditions.join(", ") : "";
      conditionsInput.style.width = "100%";
      conditionsInput.style.height = "28px";
      conditionsInput.style.background = "rgba(255,255,255,0.06)";
      conditionsInput.style.border = "1px solid rgba(255,255,255,0.12)";
      conditionsInput.style.borderRadius = "6px";
      conditionsInput.style.color = "inherit";
      conditionsInput.style.padding = "0 8px";
      conditionsInput.addEventListener("change", () => {
        pawn.conditions = normalizePawnConditions(conditionsInput.value);
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });

      const concentrationLabel = document.createElement("label");
      concentrationLabel.style.display = "inline-flex";
      concentrationLabel.style.alignItems = "center";
      concentrationLabel.style.gap = "6px";
      concentrationLabel.style.fontSize = "12px";
      concentrationLabel.style.color = "var(--muted)";
      const concentrationInput = document.createElement("input");
      concentrationInput.type = "checkbox";
      concentrationInput.checked = Boolean(pawn.concentration);
      concentrationInput.addEventListener("change", () => {
        pawn.concentration = !!concentrationInput.checked;
        if (activeChannelId) persistBattlemapState(activeChannelId, battlemapState);
        renderBattlemapTrackers();
      });
      concentrationLabel.appendChild(concentrationInput);
      concentrationLabel.appendChild(document.createTextNode("Concentration"));

      detailsRow.appendChild(conditionsInput);
      detailsRow.appendChild(concentrationLabel);
      battlemapHealthListEl.appendChild(detailsRow);
    });
  }
}

function renderBattlemapState() {
  if (!battlemapShell || !battlemapState) return;
  if (battlemapGridToggleInput) battlemapGridToggleInput.checked = battlemapState.gridEnabled !== false;
  if (battlemapGridSizeInput) battlemapGridSizeInput.value = String(battlemapState.gridSize || 48);
  if (battlemapGridSizeValue) battlemapGridSizeValue.textContent = `${Math.round(Number(battlemapState.gridSize || 48))}px`;
  if (battlemapCanvasEl) {
    battlemapCanvasEl.style.backgroundImage = battlemapState.backgroundImage ? `url("${battlemapState.backgroundImage}")` : "none";
  }
  if (battlemapGridOverlayEl) {
    const size = Math.max(16, Number(battlemapState.gridSize || 48));
    const alpha = Math.max(0.05, Math.min(0.6, Number(battlemapState.gridOpacity || 0.22)));
    battlemapGridOverlayEl.style.display = battlemapState.gridEnabled === false ? "none" : "";
    battlemapGridOverlayEl.style.backgroundImage = `linear-gradient(to right, rgba(255,255,255,${alpha}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${alpha}) 1px, transparent 1px)`;
    battlemapGridOverlayEl.style.backgroundSize = `${size}px ${size}px`;
  }
  renderBattlemapPawns();
  renderBattlemapTrackers();
}

function loadBattlemapPage(channelPublicId) {
  ensureBattlemapShell();
  battlemapState = getBattlemapChannelState(channelPublicId);
  if (!battlemapState.round) battlemapState.round = 1;
  if (!battlemapState.currentTurnPawnId && battlemapState.pawns[0]?.id) {
    const sorted = [...battlemapState.pawns].sort((a, b) => Number(b.initiative || 0) - Number(a.initiative || 0));
    battlemapState.currentTurnPawnId = sorted[0]?.id || battlemapState.pawns[0].id;
    persistBattlemapState(channelPublicId, battlemapState, { broadcast: false });
  }
  if (battlemapShell) {
    battlemapShell.classList.remove("hidden");
    battlemapShell.style.display = "block";
  }
  renderBattlemapState();
  hydrateBattlemapStateFromServer(channelPublicId, battlemapState);
  sendChannelSocketEvent(channelPublicId, { type: "battlemap_state_request" });
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
  updateServerSwitcherNotificationState();
  updateDmQuickButtonState();
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
  if (activeMode !== "server" || activeChannelType === "voice" || activeChannelType === "notes" || !activeChannelId) {
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
  if (activeMode !== "server" || !activeChannelId || activeChannelType === "voice" || activeChannelType === "notes") return;
  sendChannelSocketEvent(activeChannelId, { type: eventType });
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
      let currentRoleLabel = String(member.role || "member");
      let nickInput = null;
      const updateMemberNameLabel = (nextNicknameRaw = nicknameText) => {
        const nextNickname = String(nextNicknameRaw || "").trim();
        name.textContent = nextNickname
          ? `${nextNickname} (@${member.username}) (${currentRoleLabel})`
          : `${member.username} (${currentRoleLabel})`;
      };
      updateMemberNameLabel(nicknameText);
      const pid = document.createElement("div");
      pid.className = "member-public-id";
      pid.textContent = member.user_public_id;
      attachPublicUserProfileTrigger(name, member.user_public_id);
      attachPublicUserProfileTrigger(pid, member.user_public_id);
      left.appendChild(name);
      left.appendChild(pid);

      if (member.user_id === currentUserId) {
        const nickRow = document.createElement("div");
        nickRow.className = "member-nickname-controls";
        nickInput = document.createElement("input");
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
          updateMemberNameLabel(nickInput.value);
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
            updateMemberNameLabel("");
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
      decoratePresenceLabelWithCustomStatus(label, isOnline, "");
      attachPublicUserProfileTrigger(label, member.user_public_id);
      fetchPublicUserProfile(member.user_public_id).then((profile) => {
        decoratePresenceLabelWithCustomStatus(label, isOnline, profile?.custom_status || "");
      }).catch(() => {});
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
        const selectedLabel = roleSelect.options[roleSelect.selectedIndex]?.textContent || roleSelect.value;
        const previousRoleLabel = currentRoleLabel;
        currentRoleLabel = String(selectedLabel || "").trim() || previousRoleLabel;
        updateMemberNameLabel(nickInput ? nickInput.value : nicknameText);
        try {
          await assignServerMemberRole(activeServerId, member.user_public_id, roleSelect.value);
          await loadServerMembersModal();
        } catch (err) {
          currentRoleLabel = previousRoleLabel;
          updateMemberNameLabel(nickInput ? nickInput.value : nicknameText);
          alert(err.message || "Failed to change member role");
        }
      });

      row.appendChild(left);
      row.appendChild(presence);
      row.appendChild(roleSelect);
      membersListEl.appendChild(row);
    });
  enhanceCustomSelects(membersListEl);
  syncCustomSelects(membersListEl);
}

function setVoiceStatus(text) {
  if (voiceStatus) voiceStatus.textContent = text;
}

function updateTextVsVoiceUI() {
  const isVoice = activeChannelType === "voice";
  const isNotes = activeChannelType === "notes";
  const isBattlemap = activeChannelType === "battlemap";
  const messagesMainPanel = messagesPanel ? messagesPanel.parentElement : null;
  if (messagesMainPanel) messagesMainPanel.classList.toggle("battlemap-chat-split", isBattlemap);
  if (voicePanel) voicePanel.classList.toggle("hidden", !isVoice);
  if (messagesPanel) messagesPanel.classList.toggle("hidden", isVoice);
  if (messageBar) {
    const hideComposer = isVoice || isNotes;
    messageBar.classList.toggle("hidden", hideComposer);
    messageBar.style.display = hideComposer ? "none" : "";
    messageBar.toggleAttribute("hidden", hideComposer);
  }
  if (replyPreview) {
    if (isVoice || isNotes) {
      replyPreview.classList.add("hidden");
      replyPreview.style.display = "none";
    } else {
      // Restore default styling and let setPendingReply() control visibility.
      replyPreview.style.display = "";
    }
  }
  if (typingIndicator && (isVoice || isNotes)) {
    typingIndicator.classList.add("hidden");
    typingIndicator.textContent = "";
  }
  if (messageSearchBar) {
    if (isVoice || isNotes) {
      messageSearchBar.classList.add("hidden");
      messageSearchBar.style.display = "none";
    } else {
      messageSearchBar.style.display = "";
    }
  }
  if (messageSearchToggleBtn) messageSearchToggleBtn.classList.toggle("hidden", isVoice || isNotes);
  if (channelPinsBtn) {
    const hidePins = activeMode !== "server" || isVoice || isNotes || !activeChannelId;
    channelPinsBtn.classList.toggle("hidden", hidePins);
    if (hidePins && pinsModal?.classList?.contains("open")) closeModal(pinsModal);
  }
  if (notesEditorShell) notesEditorShell.classList.toggle("hidden", !isNotes);
  if (battlemapShell) battlemapShell.classList.toggle("hidden", !isBattlemap);
  if (battlemapShell) battlemapShell.style.display = isBattlemap ? "block" : "none";
  if (isVoice && typingIndicator) {
    typingIndicator.classList.add("hidden");
    typingIndicator.textContent = "";
  }
  if (isVoice || isNotes) setJumpUnreadVisible(false);
  if (jumpUnreadBtn && (isVoice || isNotes)) jumpUnreadBtn.classList.add("hidden");
  if (isVoice && voiceChannelTitle) {
    const channelName = channelNameById.get(activeChannelId) || "Voice Channel";
    voiceChannelTitle.textContent = channelName;
  }
  if (!isNotes && notesEditorShell) notesEditorShell.classList.add("hidden");
  if (!isBattlemap && battlemapShell) battlemapShell.classList.add("hidden");
  updateComposerPlaceholder();
  updateMobileNavigationState();
}

function isMobileDashboardLayout() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function ensureMobileChannelBackButton() {
  if (mobileChannelBackBtn?.isConnected) return;
  if (!messagesTopbarTitleWrap) return;
  mobileChannelBackBtn = document.createElement("button");
  mobileChannelBackBtn.type = "button";
  mobileChannelBackBtn.id = "mobile-channel-back-btn";
  mobileChannelBackBtn.className = "topbar-btn hidden";
  mobileChannelBackBtn.textContent = "Back";
  mobileChannelBackBtn.addEventListener("click", () => {
    if (!isMobileDashboardLayout()) return;
    if (activeMode !== "server" || !activeChannelId) return;
    stopTypingNow();
    if (activeChannelType === "voice") leaveVoiceChannel();
    activeChannelId = null;
    activeChannelType = "text";
    activeThreadParentMessageId = null;
    closeModal(threadModal);
    setPendingReply(null);
    updateTopbar("", false);
    highlightActiveChannel();
    updateTextVsVoiceUI();
    persistActiveChatState();
  });
  messagesTopbarTitleWrap.prepend(mobileChannelBackBtn);
}

function updateMobileNavigationState() {
  const isMobile = isMobileDashboardLayout();
  document.body.classList.toggle("mobile-dashboard-layout", isMobile);
  const isServerChannelFocus = isMobile && activeMode === "server" && !!activeChannelId;
  document.body.classList.toggle("mobile-channel-focus", isServerChannelFocus);
  if (mobileChannelBackBtn) {
    mobileChannelBackBtn.classList.toggle("hidden", !isServerChannelFocus);
  }
}

function normalizeNoteChannelName(value) {
  return String(value || "").trim().toLowerCase();
}

function findNotesChannelElementByName(serverId, noteName) {
  const target = normalizeNoteChannelName(noteName);
  if (!serverId || !target) return null;
  return [...document.querySelectorAll(".channel-item[data-channel-type='notes']")].find((el) => (
    el.dataset.serverId === serverId && normalizeNoteChannelName(el.dataset.channelName) === target
  )) || null;
}

async function openOrCreateNotesChannelByName(noteName) {
  const trimmed = String(noteName || "").trim();
  if (!trimmed || !activeServerId) return;
  const existing = findNotesChannelElementByName(activeServerId, trimmed);
  if (existing) {
    existing.click();
    return;
  }
  const shouldCreate = window.confirm(`Create notes channel "${trimmed}"?`);
  if (!shouldCreate) return;
  const res = await fetch(`/channels/server/${activeServerId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: trimmed, type: "notes" }),
  });
  if (!res.ok) {
    let detail = "Failed to create notes channel";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  const created = await res.json();
  await loadChannels(activeServerId, { preferredChannelId: created?.public_id || null });
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
  removeVoiceVideoTilesForPeer(peerId);
  detachVoiceLevelSource(peerId);
}

function resetVoicePeers() {
  [...peerConnections.keys()].forEach((peerId) => closePeerConnection(peerId));
  [...peerAudioSources.keys()].forEach((peerId) => detachVoiceLevelSource(peerId));
  peerAudioSources.clear();
  peerVolumeLevels.clear();
  peerMeta.clear();
  watchedPeerStreamIds.clear();
  clearAllVoiceVideoTiles();
  if (voiceMeterAnimation) {
    cancelAnimationFrame(voiceMeterAnimation);
    voiceMeterAnimation = null;
  }
  if (voiceUsersList) voiceUsersList.innerHTML = "";
  renderVoiceUsersInChannelsPanel();
}

function applyDeafenOutput() {
  peerAudioElements.forEach((audio) => {
    audio.muted = isDeafened;
  });
  peerVideoElements.forEach((entry, key) => {
    if (!entry) return;
    if (!String(key).endsWith(":link") && key !== "local:link") return;
    if (entry.video) entry.video.muted = key === `${MUSIC_BOT_PEER_ID}:link` ? isDeafened : true;
    if (entry.iframe) applyEmbeddedLinkAudioMute(entry);
  });
  applyMusicBotPlaybackVolume();
}

function applyLocalMuteState() {
  if (!localVoiceStream) return;
  const enabled = !isMuted && !isDeafened;
  localVoiceStream.getAudioTracks().forEach((track) => {
    track.enabled = enabled;
  });
}

function updateVoiceMediaButtons() {
  if (cameraVoiceBtn) cameraVoiceBtn.textContent = isCameraEnabled ? "Stop Camera" : "Camera";
  if (screenVoiceBtn) screenVoiceBtn.textContent = isScreenSharing ? "Stop Share" : "Share Screen";
  if (linkStreamVoiceBtn) linkStreamVoiceBtn.textContent = sharedLinkStreamUrl ? "Stop Link Stream" : "Link Stream";
  if (watchSharesVoiceBtn) watchSharesVoiceBtn.textContent = `Watch Shares: ${watchRemoteScreenShares ? "On" : "Off"}`;
}

function getPeerDisplayName(peerId) {
  if (peerId === MUSIC_BOT_PEER_ID) return "Music Bot";
  const peer = peerMeta.get(peerId);
  if (!peer) return peerId === voiceSelfPeerId ? "You" : "Peer";
  return `${peer.username}${peerId === voiceSelfPeerId ? " (you)" : ""}`;
}

function bindUserAvatarImage(imgEl, userPublicId, { alt = "User avatar" } = {}) {
  if (!imgEl) return;
  imgEl.alt = alt;
  if (!userPublicId) {
    imgEl.style.visibility = "hidden";
    imgEl.dataset.avatarBaseSrc = "";
    imgEl.dataset.avatarUserPublicId = "";
    return;
  }
  const baseSrc = resolveMediaUrl(`/api/users/${userPublicId}/avatar`);
  const currentSrc = String(imgEl.getAttribute("src") || "").trim();
  const previousBaseSrc = String(imgEl.dataset.avatarBaseSrc || "").trim();
  const previousUserPublicId = String(imgEl.dataset.avatarUserPublicId || "").trim();
  if (
    previousBaseSrc === baseSrc &&
    previousUserPublicId === String(userPublicId) &&
    currentSrc.startsWith(baseSrc)
  ) {
    imgEl.style.visibility = "visible";
    return;
  }
  imgEl.dataset.avatarBaseSrc = baseSrc;
  imgEl.dataset.avatarUserPublicId = String(userPublicId);
  imgEl.dataset.avatarRetry = "0";
  imgEl.onload = () => {
    imgEl.style.visibility = "visible";
  };
  imgEl.onerror = () => {
    if (imgEl.dataset.avatarRetry !== "1") {
      imgEl.dataset.avatarRetry = "1";
      imgEl.src = `${baseSrc}?ts=${Date.now()}`;
      return;
    }
    imgEl.style.visibility = "hidden";
  };
  imgEl.style.visibility = "visible";
  imgEl.src = baseSrc;
}

async function fetchPublicUserProfile(userPublicId, { force = false } = {}) {
  const publicId = String(userPublicId || "").trim();
  if (!publicId) return null;
  if (!force && publicUserProfileCache.has(publicId)) return publicUserProfileCache.get(publicId);
  if (!force && publicUserProfileInflight.has(publicId)) return publicUserProfileInflight.get(publicId);
  const job = (async () => {
    const res = await fetch(`/users/${publicId}`, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to load user profile (${res.status})`);
    const data = await res.json();
    publicUserProfileCache.set(publicId, data);
    return data;
  })().finally(() => {
    publicUserProfileInflight.delete(publicId);
  });
  publicUserProfileInflight.set(publicId, job);
  return job;
}

function decoratePresenceLabelWithCustomStatus(labelEl, isOnline, customStatus) {
  if (!labelEl) return;
  const base = isOnline ? "Online" : "Offline";
  const status = normalizeCustomStatusInput(customStatus || "");
  labelEl.textContent = status ? `${base} - ${status}` : base;
}

function hydrateUserStatusElement(statusEl, userPublicId, {
  prefix = "",
  emptyText = "",
  hiddenWhenEmpty = true,
} = {}) {
  if (!statusEl) return;
  const publicId = String(userPublicId || "").trim();
  if (!publicId) {
    statusEl.textContent = emptyText;
    if (hiddenWhenEmpty) statusEl.hidden = !emptyText;
    return;
  }
  const apply = (profile) => {
    const status = normalizeCustomStatusInput(profile?.custom_status || "");
    statusEl.textContent = status ? `${prefix}${status}` : emptyText;
    if (hiddenWhenEmpty) statusEl.hidden = !status;
  };
  if (publicUserProfileCache.has(publicId)) apply(publicUserProfileCache.get(publicId));
  else {
    statusEl.textContent = emptyText;
    if (hiddenWhenEmpty) statusEl.hidden = !emptyText;
  }
  fetchPublicUserProfile(publicId).then(apply).catch(() => {});
}

function attachPublicUserProfileTrigger(el, userPublicId) {
  if (!el || el.dataset.publicProfileBound === "1") return;
  const publicId = String(userPublicId || "").trim();
  if (!publicId) return;
  el.dataset.publicProfileBound = "1";
  el.classList.add("user-profile-trigger");
  el.addEventListener("click", (event) => {
    if (publicUserProfileModal?.classList?.contains("open")) return;
    event.preventDefault();
    event.stopPropagation();
    openPublicUserProfileModal(publicId).catch((err) => {
      showToast(err?.message || "Failed to open user profile");
    });
  });
}

async function openPublicUserProfileModal(userPublicId) {
  const publicId = String(userPublicId || "").trim();
  if (!publicId || !publicUserProfileModal) return;
  if (publicUserProfileDmBtn) {
    publicUserProfileDmBtn.disabled = publicId === String(currentUser?.public_id || "");
    publicUserProfileDmBtn.dataset.userPublicId = publicId;
  }
  if (publicUserProfilePublicId) publicUserProfilePublicId.textContent = publicId;
  if (publicUserProfileName) publicUserProfileName.textContent = "Loading...";
  if (publicUserProfileStatus) publicUserProfileStatus.textContent = "Loading...";
  if (publicUserProfileCreatedAt) publicUserProfileCreatedAt.textContent = "-";
  if (publicUserProfileUpdatedAt) publicUserProfileUpdatedAt.textContent = "-";
  bindUserAvatarImage(publicUserProfileAvatar, publicId, { alt: "User avatar" });
  openModal(publicUserProfileModal);
  const profile = await fetchPublicUserProfile(publicId, { force: true });
  const emoji = normalizeNameEmojiInput(profile?.name_emoji || "");
  const color = normalizeHexColor(profile?.username_color || "");
  if (publicUserProfileName) {
    publicUserProfileName.textContent = `${emoji ? `${emoji} ` : ""}${profile?.username || "Unknown"}`;
    publicUserProfileName.style.color = color || "";
  }
  if (publicUserProfileStatus) {
    const status = normalizeCustomStatusInput(profile?.custom_status || "");
    publicUserProfileStatus.textContent = status || "No custom status";
  }
  if (publicUserProfileCreatedAt) publicUserProfileCreatedAt.textContent = formatTimestamp(profile?.created_at) || "-";
  if (publicUserProfileUpdatedAt) publicUserProfileUpdatedAt.textContent = formatTimestamp(profile?.updated_at) || "-";
}

async function openDmFromPublicProfileModal() {
  const publicId = String(publicUserProfileDmBtn?.dataset?.userPublicId || publicUserProfilePublicId?.textContent || "").trim();
  if (!publicId) return;
  if (publicId === String(currentUser?.public_id || "")) {
    showToast("You cannot DM yourself");
    return;
  }
  try {
    const convo = await createOrOpenDmConversation(publicId);
    closeModal(publicUserProfileModal);
    stopTypingNow();
    activeMode = "dm";
    activeDmConversationId = convo.public_id;
    activeServerId = null;
    activeChannelId = null;
    activeChannelType = "text";
    renderTypingIndicator();
    setPendingReply(null);
    activeThreadParentMessageId = null;
    closeModal(threadModal);
    updateSidebarModeUI();
    await loadDmConversations();
    highlightActiveChannel();
    updateTopbar(`@ ${convo.other_username}`, true);
    await loadDmMessages(convo.public_id, true);
    openDmMessageSocket(convo.public_id);
    applyDraftToComposer();
    persistActiveChatState();
  } catch (err) {
    alert(err?.message || "Failed to open DM");
  }
}

function refreshSettingsAvatarPreview({ bustCache = false } = {}) {
  if (!settingsAvatarPreview) return;
  const publicId = currentUser?.public_id;
  if (!publicId) {
    settingsAvatarPreview.style.visibility = "hidden";
    return;
  }
  bindUserAvatarImage(settingsAvatarPreview, publicId, { alt: "Your avatar preview" });
  if (bustCache) {
    settingsAvatarPreview.src = resolveMediaUrl(`/api/users/${publicId}/avatar?ts=${Date.now()}`);
  }
}

function normalizeHexColor(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw) ? raw.toLowerCase() : "";
}

function normalizeNameEmojiInput(value) {
  const glyphs = Array.from(String(value || "").trim()).filter((ch) => !/\s/.test(ch));
  return glyphs.slice(0, 2).join("");
}

async function saveCurrentUserNameStyle({ usernameColor, nameEmoji }) {
  if (!currentUser?.public_id) throw new Error("Current user not loaded");
  const payload = {
    username_color: usernameColor || null,
    name_emoji: nameEmoji || null,
  };
  const res = await fetch(`/users/${currentUser.public_id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = "Failed to save name style";
    try {
      const data = await res.json();
      if (data?.detail) detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    } catch {}
    throw new Error(detail);
  }
  const updated = await res.json();
  if (currentUser) {
    currentUser.username_color = updated.username_color || null;
    currentUser.name_emoji = updated.name_emoji || null;
    if (Object.prototype.hasOwnProperty.call(updated, "custom_status")) currentUser.custom_status = updated.custom_status || null;
    if (currentUser.public_id) {
      publicUserProfileCache.set(currentUser.public_id, { ...(publicUserProfileCache.get(currentUser.public_id) || {}), ...updated });
    }
  }
  refreshUserDisplaySummary();
  return updated;
}

function normalizeCustomStatusInput(value) {
  const raw = sanitizeMojibakeForDisplay(value).trim();
  return raw.slice(0, 140);
}

function sanitizeMojibakeForDisplay(value) {
  let text = String(value ?? "");
  // Attempt to repair common UTF-8 interpreted-as-Latin1 mojibake.
  if (/[\u00c2\u00c3\u00e2]/.test(text)) {
    try {
      const bytes = Uint8Array.from(Array.from(text, (ch) => ch.charCodeAt(0) & 0xff));
      const decoded = new TextDecoder("utf-8").decode(bytes);
      const rawScore = (text.match(/[\u00c2\u00c3\u00e2]/g) || []).length;
      const decodedScore = (decoded.match(/[\u00c2\u00c3\u00e2]/g) || []).length;
      if (decodedScore < rawScore) text = decoded;
    } catch {}
  }
  text = text.replace(/[\u2018\u2019]/g, "'");
  text = text.replace(/[\u201c\u201d]/g, "\"");
  text = text.replace(/\u2026/g, "...");
  text = text.replace(/[\u2013\u2014]/g, "-");
  text = text.replace(/[\u00c2\u00c3]/g, "");
  return text.replace(/\uFFFD+/g, "");
}

function refreshUserDisplaySummary() {
  if (!userDisplay || !currentUser) return;
  const username = sanitizeMojibakeForDisplay(currentUser.username || "").trim() || "User";
  const status = normalizeCustomStatusInput(currentUser.custom_status || "");
  userDisplay.textContent = status
    ? `Logged in as: ${username} - ${status}`
    : `Logged in as: ${username}`;
}

async function saveCurrentUserCustomStatus(customStatus) {
  if (!currentUser?.public_id) throw new Error("Current user not loaded");
  const res = await fetch(`/users/${currentUser.public_id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ custom_status: customStatus || null }),
  });
  if (!res.ok) {
    let detail = "Failed to save custom status";
    try {
      const data = await res.json();
      if (data?.detail) detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    } catch {}
    throw new Error(detail);
  }
  const updated = await res.json();
  if (currentUser) {
    currentUser.custom_status = updated.custom_status || null;
    if (currentUser.public_id) {
      publicUserProfileCache.set(currentUser.public_id, { ...(publicUserProfileCache.get(currentUser.public_id) || {}), ...updated });
    }
  }
  refreshUserDisplaySummary();
  return updated;
}

async function saveCurrentUserUploadPrivacy(stripUploadMetadata) {
  if (!currentUser?.public_id) throw new Error("Current user not loaded");
  const res = await fetch(`/users/${currentUser.public_id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ strip_upload_metadata: Boolean(stripUploadMetadata) }),
  });
  if (!res.ok) {
    let detail = "Failed to save upload privacy";
    try {
      const data = await res.json();
      if (data?.detail) detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
    } catch {}
    throw new Error(detail);
  }
  const updated = await res.json();
  if (currentUser) {
    currentUser.strip_upload_metadata = Boolean(updated?.strip_upload_metadata);
    if (currentUser.public_id) {
      publicUserProfileCache.set(currentUser.public_id, { ...(publicUserProfileCache.get(currentUser.public_id) || {}), ...updated });
    }
  }
  return updated;
}

function setFocusedVoiceVideoTile(key = null) {
  focusedVoiceVideoTileKey = key && peerVideoElements.has(key) ? key : null;
  peerVideoElements.forEach((entry, entryKey) => {
    if (!entry?.tile) return;
    entry.tile.classList.toggle("focused", focusedVoiceVideoTileKey === entryKey);
  });
}

function isRemoteStreamTileVisible(tileKey) {
  const key = String(tileKey || "");
  if (!key.includes(":")) return true;
  const [peerId, source] = key.split(":");
  if (!peerId || peerId === "local") return true;
  if (source === "screen") return watchRemoteScreenShares && watchedPeerStreamIds.has(peerId);
  if (source === "link") return watchedPeerStreamIds.has(peerId);
  return true;
}

function applyRemoteStreamTileVisibilityPreferences() {
  peerVideoElements.forEach((entry, key) => {
    if (!entry?.tile) return;
    entry.tile.classList.toggle("hidden", !isRemoteStreamTileVisible(key));
  });
  updateVoiceVideoGridVisibility();
}

function focusVoiceStreamForPeer(peerId) {
  const peer = peerMeta.get(peerId);
  if (!peer) return;
  let targetKey = null;
  if (peer.screen_on) {
    if (!watchRemoteScreenShares) {
      watchRemoteScreenShares = true;
      updateVoiceMediaButtons();
      applyRemoteScreenShareWatchPreference();
    }
    targetKey = `${peerId}:screen`;
  } else if (peer.link_stream_url) {
    targetKey = `${peerId}:link`;
  }
  if (!targetKey) {
    showToast("This user is not streaming");
    return;
  }
  watchedPeerStreamIds.add(peerId);
  applyRemoteStreamTileVisibilityPreferences();
  if (targetKey.endsWith(":link")) {
    renderRemoteLinkStreamTile(peerId);
  }
  if (targetKey.endsWith(":screen")) {
    const pendingStream = pendingRemoteVideoStreams.get(targetKey);
    if (pendingStream) {
      const tile = ensureVoiceVideoTile(targetKey, {
        label: `${getPeerDisplayName(peerId)} - Screen`,
      });
      if (tile?.video) {
        tile.video.muted = true;
        tile.tile.classList.toggle("hidden", !isRemoteStreamTileVisible(targetKey));
        tile.video.srcObject = pendingStream;
        pendingRemoteVideoStreams.delete(targetKey);
        updateVoiceVideoGridVisibility();
      }
    }
  }
  const entry = peerVideoElements.get(targetKey);
  if (!entry?.tile) {
    showToast("Stream is starting...");
    return;
  }
  setFocusedVoiceVideoTile(targetKey);
  try {
    entry.tile.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  } catch {
    // Ignore scroll support issues
  }
}

function toggleVoiceStreamWatchForPeer(peerId) {
  if (!peerId) return;
  if (watchedPeerStreamIds.has(peerId)) {
    watchedPeerStreamIds.delete(peerId);
    if (
      focusedVoiceVideoTileKey &&
      (focusedVoiceVideoTileKey === `${peerId}:screen` || focusedVoiceVideoTileKey === `${peerId}:link`)
    ) {
      setFocusedVoiceVideoTile(null);
    }
    renderRemoteLinkStreamTile(peerId);
    applyRemoteStreamTileVisibilityPreferences();
    return;
  }
  focusVoiceStreamForPeer(peerId);
}

function bindVoiceVideoTileFocus(key, tile) {
  if (!tile || tile.dataset.focusBound === "1") return;
  tile.dataset.focusBound = "1";
  tile.tabIndex = 0;
  tile.addEventListener("click", (event) => {
    if (event.target?.closest?.(".voice-video-resize-handle, .voice-video-fullscreen-btn")) return;
    setFocusedVoiceVideoTile(focusedVoiceVideoTileKey === key ? null : key);
  });
  tile.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setFocusedVoiceVideoTile(focusedVoiceVideoTileKey === key ? null : key);
  });
}

function getRemoteVideoSourceKeyForTrack(peerId, trackId) {
  const peer = peerMeta.get(peerId) || {};
  const slots = peerRemoteVideoTrackSlots.get(peerId) || { camera: null, screen: null };
  if (slots.camera === trackId) return `${peerId}:camera`;
  if (slots.screen === trackId) return `${peerId}:screen`;

  let source = "camera";
  // If this peer already has a camera slot populated and a second distinct video track arrives,
  // treat it as a screen stream immediately (state message can arrive slightly later than ontrack).
  if (trackId && slots.camera && slots.camera !== trackId && !slots.screen) {
    source = "screen";
  } else
  if (peer.camera_on && peer.screen_on) {
    source = slots.camera ? (slots.screen ? "camera" : "screen") : "camera";
  } else if (peer.screen_on && !peer.camera_on) {
    source = "screen";
  } else {
    source = "camera";
  }
  slots[source] = trackId || slots[source];
  peerRemoteVideoTrackSlots.set(peerId, slots);
  return `${peerId}:${source}`;
}

function parseEmbeddableStreamUrl(rawUrl) {
  const raw = String(rawUrl || "").trim();
  if (!raw) return null;
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const protocol = url.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") return null;
  const host = url.hostname.toLowerCase();
  const path = url.pathname.toLowerCase();
  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url.href);
  if (isDirectVideo) {
    return { kind: "video", src: url.href, label: "Link Video", provider: "direct" };
  }
  if (host.includes("youtube.com") || host === "youtu.be") {
    let videoId = "";
    if (host === "youtu.be") videoId = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (!videoId) videoId = url.searchParams.get("v") || "";
    if (videoId) {
      return {
        kind: "iframe",
        src: `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&enablejsapi=1`,
        label: "YouTube",
        provider: "youtube",
      };
    }
  }
  if (host.includes("vimeo.com")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts.find((p) => /^\d+$/.test(p)) || "";
    if (id) {
      return { kind: "iframe", src: `https://player.vimeo.com/video/${id}?autoplay=1&api=1`, label: "Vimeo", provider: "vimeo" };
    }
  }
  return { kind: "iframe", src: url.href, label: "Link Stream", provider: "generic" };
}

function normalizeMusicBotState(rawState) {
  if (!rawState || typeof rawState !== "object") {
    return {
      invited: false,
      url: null,
      track_title: null,
      playing: false,
      queue_length: 0,
      requested_by_user_public_id: null,
      requested_by_username: null,
    };
  }
  return {
    invited: !!rawState.invited,
    url: rawState.url ? String(rawState.url).trim() : null,
    track_title: rawState.track_title ? String(rawState.track_title).trim() : null,
    playing: !!rawState.playing,
    queue_length: Math.max(0, Number(rawState.queue_length || 0)),
    requested_by_user_public_id: rawState.requested_by_user_public_id ? String(rawState.requested_by_user_public_id) : null,
    requested_by_username: rawState.requested_by_username ? String(rawState.requested_by_username) : null,
  };
}

function applyMusicBotState(nextState) {
  voiceMusicBotState = normalizeMusicBotState(nextState);
  if (!voiceMusicBotState.invited) watchedPeerStreamIds.delete(MUSIC_BOT_PEER_ID);
  renderVoiceUsers();
  renderMusicBotStreamTile();
}

function getMusicBotTrackTitle() {
  const explicit = String(voiceMusicBotState?.track_title || "").trim();
  if (explicit) return explicit;
  const fallbackUrl = String(voiceMusicBotState?.url || "").trim();
  if (!fallbackUrl) return "";
  try {
    const parsed = new URL(fallbackUrl);
    const lastToken = parsed.pathname.split("/").filter(Boolean).pop() || parsed.hostname;
    return decodeURIComponent(lastToken).replace(/[-_]+/g, " ").trim();
  } catch {
    return fallbackUrl;
  }
}

function clearMusicBotPlaybackElements() {
  try {
    if (musicBotAudioEl) {
      musicBotAudioEl.pause?.();
      musicBotAudioEl.src = "";
      musicBotAudioEl.remove();
    }
  } catch {}
  musicBotAudioEl = null;
  if (musicBotIframeEl) {
    musicBotIframeEl.remove();
    musicBotIframeEl = null;
  }
  musicBotIframeProvider = "generic";
}

function ensureMusicBotAudioElement() {
  if (musicBotAudioEl && musicBotAudioEl.isConnected) return musicBotAudioEl;
  const el = document.createElement("audio");
  el.autoplay = true;
  el.playsInline = true;
  el.style.display = "none";
  document.body.appendChild(el);
  musicBotAudioEl = el;
  return el;
}

function ensureMusicBotIframeElement(src, provider = "generic") {
  if (!src) return null;
  const needReplace = !musicBotIframeEl || !musicBotIframeEl.isConnected || musicBotIframeEl.src !== src;
  if (needReplace) {
    if (musicBotIframeEl) musicBotIframeEl.remove();
    const iframe = document.createElement("iframe");
    iframe.allow = "autoplay; encrypted-media";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.src = src;
    iframe.style.position = "fixed";
    iframe.style.left = "-9999px";
    iframe.style.top = "0";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    musicBotIframeEl = iframe;
  }
  musicBotIframeProvider = provider || "generic";
  return musicBotIframeEl;
}

function applyMusicBotPlaybackVolume() {
  if (musicBotAudioEl) {
    const shouldPlay = !!voiceMusicBotState?.playing;
    musicBotAudioEl.muted = isDeafened || !shouldPlay;
    musicBotAudioEl.volume = clamp(Number(musicBotVolume || 100) / 100, 0, 1);
    if (shouldPlay) {
      musicBotAudioEl.play?.().catch(() => {});
    } else {
      musicBotAudioEl.pause?.();
    }
  }
  if (!musicBotIframeEl) return;
  try {
    if (musicBotIframeProvider === "youtube") {
      const shouldPlay = !!voiceMusicBotState?.playing;
      const shouldMute = isDeafened || !shouldPlay || Number(musicBotVolume || 100) <= 0;
      musicBotIframeEl.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: shouldMute ? "mute" : "unMute",
          args: [],
        }),
        "*"
      );
      musicBotIframeEl.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: shouldPlay ? "playVideo" : "pauseVideo",
          args: [],
        }),
        "*"
      );
      if (!shouldMute) {
        musicBotIframeEl.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [Math.max(0, Math.min(100, Number(musicBotVolume || 100)))],
          }),
          "*"
        );
      }
      return;
    }
    if (musicBotIframeProvider === "vimeo") {
      const shouldPlay = !!voiceMusicBotState?.playing;
      const vol = isDeafened ? 0 : clamp(Number(musicBotVolume || 100) / 100, 0, 1);
      musicBotIframeEl.contentWindow?.postMessage({ method: "setVolume", value: vol }, "*");
      musicBotIframeEl.contentWindow?.postMessage({ method: shouldPlay ? "play" : "pause" }, "*");
    }
  } catch {}
}

async function resolveMusicTrackTitle(rawUrl, parsedEntry) {
  const raw = String(rawUrl || "").trim();
  if (!raw) return "";
  try {
    if (parsedEntry?.provider === "youtube") {
      const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(raw)}&format=json`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const title = String(data?.title || "").trim();
        if (title) return title.slice(0, 180);
      }
    }
  } catch {}
  if (parsedEntry?.label === "YouTube" || parsedEntry?.label === "Vimeo") return parsedEntry.label;
  try {
    const parsed = new URL(raw);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return "Track";
  }
}

async function requestFullscreenForElement(el) {
  if (!el) return;
  try {
    if (el.requestFullscreen) await el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  } catch {
    showToast("Fullscreen unavailable for this stream");
  }
}

function applyEmbeddedLinkAudioMute(entry) {
  if (!entry?.iframe) return;
  try {
    if (entry.provider === "youtube") {
      entry.iframe.contentWindow?.postMessage(JSON.stringify({
        event: "command",
        func: isDeafened ? "mute" : "unMute",
        args: [],
      }), "*");
      return;
    }
    if (entry.provider === "vimeo") {
      entry.iframe.contentWindow?.postMessage({
        method: "setVolume",
        value: isDeafened ? 0 : 1,
      }, "*");
    }
  } catch {
    // Ignore provider embed command failures.
  }
}

function getVoiceVideoTileResizeBounds() {
  const gridWidth = Math.max(140, Number(voiceVideoGrid?.clientWidth || 0) - 12);
  return {
    min: 72,
    max: Math.max(120, gridWidth),
  };
}

function applyVoiceVideoTileSizeOverride(key, tile) {
  if (!tile) return;
  const width = Number(voiceVideoTileSizeOverrides.get(key) || 0);
  if (width > 0) {
    tile.style.width = `${Math.round(width)}px`;
    tile.style.maxWidth = "none";
  } else {
    tile.style.removeProperty("width");
    tile.style.removeProperty("max-width");
  }
}

function bindVoiceVideoTileResize(key, tile) {
  if (!tile || tile.dataset.resizeBound === "1") return;
  tile.dataset.resizeBound = "1";
  const handle = document.createElement("div");
  handle.className = "voice-video-resize-handle";
  handle.title = "Drag to resize";
  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = tile.getBoundingClientRect();
    const startX = event.clientX;
    const startWidth = rect.width;
    const pointerId = event.pointerId;
    const { min, max } = getVoiceVideoTileResizeBounds();
    tile.classList.add("is-resizing");
    try {
      handle.setPointerCapture(pointerId);
    } catch {
      // Some browsers may reject capture; fallback to window listeners still works.
    }
    const onMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const nextWidth = clamp(startWidth + dx, min, max);
      voiceVideoTileSizeOverrides.set(key, nextWidth);
      applyVoiceVideoTileSizeOverride(key, tile);
    };
    const onEnd = () => {
      tile.classList.remove("is-resizing");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
  });
  tile.appendChild(handle);
}

function ensureVoiceVideoTile(key, { label = "", isLocal = false } = {}) {
  if (!voiceVideoGrid) return null;
  let entry = peerVideoElements.get(key);
  if (entry?.tile?.isConnected && entry?.video?.isConnected) {
    entry.tile.classList.toggle("screen-share", String(key).endsWith(":screen"));
    applyVoiceVideoTileSizeOverride(key, entry.tile);
    bindVoiceVideoTileFocus(key, entry.tile);
    setFocusedVoiceVideoTile(focusedVoiceVideoTileKey);
    if (entry.labelEl) entry.labelEl.textContent = label || entry.labelEl.textContent || "";
    return entry;
  }
  const tile = document.createElement("div");
  tile.className = `voice-video-tile${isLocal ? " local" : ""}`;
  tile.classList.toggle("screen-share", String(key).endsWith(":screen"));
  tile.dataset.tileKey = key;
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  video.muted = !!isLocal;
  const labelEl = document.createElement("div");
  labelEl.className = "voice-video-label";
  labelEl.textContent = label || (isLocal ? "You" : "Video");
  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.type = "button";
  fullscreenBtn.className = "voice-video-fullscreen-btn";
  fullscreenBtn.title = "Fullscreen";
  fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullscreenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    requestFullscreenForElement(tile);
  });
  tile.appendChild(video);
  tile.appendChild(fullscreenBtn);
  tile.appendChild(labelEl);
  bindVoiceVideoTileResize(key, tile);
  bindVoiceVideoTileFocus(key, tile);
  applyVoiceVideoTileSizeOverride(key, tile);
  voiceVideoGrid.appendChild(tile);
  entry = { tile, video, labelEl, fullscreenBtn, key };
  peerVideoElements.set(key, entry);
  setFocusedVoiceVideoTile(focusedVoiceVideoTileKey);
  return entry;
}

function ensureVoiceIframeTile(key, { label = "", src = "", provider = "generic" } = {}) {
  if (!voiceVideoGrid || !src) return null;
  let entry = peerVideoElements.get(key);
  if (entry?.tile?.isConnected && entry?.iframe?.isConnected) {
    applyVoiceVideoTileSizeOverride(key, entry.tile);
    bindVoiceVideoTileFocus(key, entry.tile);
    setFocusedVoiceVideoTile(focusedVoiceVideoTileKey);
    if (entry.labelEl) entry.labelEl.textContent = label || entry.labelEl.textContent || "";
    entry.provider = provider;
    if (entry.iframe.getAttribute("src") !== src) entry.iframe.src = src;
    applyEmbeddedLinkAudioMute(entry);
    return entry;
  }
  const tile = document.createElement("div");
  tile.className = "voice-video-tile link-stream";
  tile.dataset.tileKey = key;
  const iframe = document.createElement("iframe");
  iframe.className = "voice-video-iframe";
  iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.src = src;
  const labelEl = document.createElement("div");
  labelEl.className = "voice-video-label";
  labelEl.textContent = label || "Link Stream";
  const fullscreenBtn = document.createElement("button");
  fullscreenBtn.type = "button";
  fullscreenBtn.className = "voice-video-fullscreen-btn";
  fullscreenBtn.title = "Fullscreen";
  fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullscreenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    requestFullscreenForElement(tile);
  });
  tile.appendChild(iframe);
  tile.appendChild(fullscreenBtn);
  tile.appendChild(labelEl);
  bindVoiceVideoTileResize(key, tile);
  bindVoiceVideoTileFocus(key, tile);
  applyVoiceVideoTileSizeOverride(key, tile);
  voiceVideoGrid.appendChild(tile);
  entry = { tile, iframe, labelEl, fullscreenBtn, key, provider };
  peerVideoElements.set(key, entry);
  applyEmbeddedLinkAudioMute(entry);
  setFocusedVoiceVideoTile(focusedVoiceVideoTileKey);
  updateVoiceVideoGridVisibility();
  return entry;
}

function removeVoiceVideoTile(key) {
  const entry = peerVideoElements.get(key);
  if (!entry) return;
  try {
    if (entry.video) {
      entry.video.pause?.();
      entry.video.srcObject = null;
    }
  } catch {
    // Ignore cleanup failures
  }
  entry.tile?.remove();
  peerVideoElements.delete(key);
  if (focusedVoiceVideoTileKey === key) focusedVoiceVideoTileKey = null;
  updateVoiceVideoGridVisibility();
  setFocusedVoiceVideoTile(focusedVoiceVideoTileKey);
}

function removeVoiceVideoTilesForPeer(peerId) {
  [...peerVideoElements.keys()].forEach((key) => {
    if (key === "local:camera" || key === "local:screen") return;
    if (key.startsWith(`${peerId}:`)) removeVoiceVideoTile(key);
  });
  peerRemoteVideoTrackSlots.delete(peerId);
}

function updateVoiceVideoGridVisibility() {
  if (!voiceVideoGrid) return;
  const hasTiles = [...peerVideoElements.values()].some((entry) => entry?.tile && !entry.tile.classList.contains("hidden"));
  voiceVideoGrid.classList.toggle("hidden", !hasTiles);
  updateVoicePanelStreamLayout();
}

function updateVoicePanelStreamLayout() {
  if (!voicePanel) return;
  const watchingVisibleStream = [...peerVideoElements.entries()].some(([key, entry]) => {
    if (!entry?.tile) return false;
    if (!String(key).endsWith(":screen") && !String(key).endsWith(":link")) return false;
    return !entry.tile.classList.contains("hidden");
  });
  voicePanel.classList.toggle("voice-panel-has-stream", watchingVisibleStream);
}

function clearAllVoiceVideoTiles() {
  [...peerVideoElements.keys()].forEach((key) => removeVoiceVideoTile(key));
  if (voiceVideoGrid) voiceVideoGrid.innerHTML = "";
  peerVideoElements.clear();
  pendingRemoteVideoStreams.clear();
  clearMusicBotPlaybackElements();
  updateVoiceVideoGridVisibility();
}

function applyRemoteScreenShareWatchPreference() {
  applyRemoteStreamTileVisibilityPreferences();
}

function renderLocalVoiceVideoTiles() {
  if (!voiceVideoGrid) return;
  if (isCameraEnabled && localCameraStream?.getVideoTracks?.().length) {
    const tile = ensureVoiceVideoTile("local:camera", { label: "You - Camera", isLocal: true });
    if (tile) tile.video.srcObject = localCameraStream;
  } else {
    removeVoiceVideoTile("local:camera");
  }
  if (isScreenSharing && localScreenStream?.getVideoTracks?.().length) {
    const tile = ensureVoiceVideoTile("local:screen", { label: "You - Screen", isLocal: false });
    if (tile) {
      tile.tile.classList.remove("local");
      tile.video.muted = true;
      tile.video.srcObject = localScreenStream;
    }
  } else {
    removeVoiceVideoTile("local:screen");
  }
  if (sharedLinkStreamUrl) {
    const parsed = parseEmbeddableStreamUrl(sharedLinkStreamUrl);
    if (parsed) {
      if (parsed.kind === "video") {
        const tile = ensureVoiceVideoTile("local:link", { label: `You - ${parsed.label}`, isLocal: false });
        if (tile?.video) {
          tile.tile.classList.remove("screen-share");
          tile.video.muted = true;
          if (tile.video.src !== parsed.src) {
            tile.video.srcObject = null;
            tile.video.src = parsed.src;
          }
          tile.video.controls = true;
          tile.video.play?.().catch(() => {});
        }
      } else {
        ensureVoiceIframeTile("local:link", { label: `You - ${parsed.label}`, src: parsed.src, provider: parsed.provider });
      }
    } else {
      removeVoiceVideoTile("local:link");
    }
  } else {
    removeVoiceVideoTile("local:link");
  }
  updateVoiceVideoGridVisibility();
}

function updateRemotePeerVideoTileLabels() {
  peerVideoElements.forEach((entry, key) => {
    if (key.startsWith("local:")) return;
    const [peerId, source = "camera"] = key.split(":");
    if (peerId === MUSIC_BOT_PEER_ID) return;
    if (!entry?.labelEl) return;
    const sourceLabel = source === "screen" ? "Screen" : source === "link" ? "Link Stream" : "Camera";
    entry.labelEl.textContent = `${getPeerDisplayName(peerId)} - ${sourceLabel}`;
  });
}

function renderRemoteLinkStreamTile(peerId) {
  const peer = peerMeta.get(peerId);
  const key = `${peerId}:link`;
  if (!watchedPeerStreamIds.has(peerId)) {
    removeVoiceVideoTile(key);
    return;
  }
  const rawUrl = peer?.link_stream_url ? String(peer.link_stream_url) : "";
  if (!rawUrl) {
    removeVoiceVideoTile(key);
    return;
  }
  const parsed = parseEmbeddableStreamUrl(rawUrl);
  if (!parsed) {
    removeVoiceVideoTile(key);
    return;
  }
  if (parsed.kind === "video") {
    const tile = ensureVoiceVideoTile(key, { label: `${getPeerDisplayName(peerId)} - ${parsed.label}` });
    if (tile?.video) {
      tile.tile.classList.remove("screen-share");
      tile.tile.classList.toggle("hidden", !isRemoteStreamTileVisible(key));
      tile.video.muted = true;
      if (tile.video.src !== parsed.src) {
        tile.video.srcObject = null;
        tile.video.src = parsed.src;
      }
      tile.video.controls = true;
      tile.video.play?.().catch(() => {});
    }
  } else {
    const tile = ensureVoiceIframeTile(key, { label: `${getPeerDisplayName(peerId)} - ${parsed.label}`, src: parsed.src, provider: parsed.provider });
    if (tile?.tile) tile.tile.classList.toggle("hidden", !isRemoteStreamTileVisible(key));
  }
  updateVoiceVideoGridVisibility();
}

function renderMusicBotStreamTile() {
  const key = `${MUSIC_BOT_PEER_ID}:link`;
  removeVoiceVideoTile(key);
  const isOpen = watchedPeerStreamIds.has(MUSIC_BOT_PEER_ID);
  const rawUrl = voiceMusicBotState?.invited && voiceMusicBotState?.url ? String(voiceMusicBotState.url) : "";
  if (!isOpen || !rawUrl) {
    clearMusicBotPlaybackElements();
    return;
  }
  const parsed = parseEmbeddableStreamUrl(rawUrl);
  if (!parsed) {
    clearMusicBotPlaybackElements();
    return;
  }
  if (parsed.kind === "video") {
    if (musicBotIframeEl) {
      musicBotIframeEl.remove();
      musicBotIframeEl = null;
    }
    const audioEl = ensureMusicBotAudioElement();
    if (audioEl.src !== parsed.src) audioEl.src = parsed.src;
    applyMusicBotPlaybackVolume();
    audioEl.play?.().catch(() => {});
    return;
  }
  if (musicBotAudioEl) {
    try {
      musicBotAudioEl.pause?.();
      musicBotAudioEl.src = "";
      musicBotAudioEl.remove();
    } catch {}
    musicBotAudioEl = null;
  }
  ensureMusicBotIframeElement(parsed.src, parsed.provider);
  applyMusicBotPlaybackVolume();
}

function getCombinedLocalVoiceStreams() {
  const streams = [];
  if (localVoiceStream) streams.push(localVoiceStream);
  if (isCameraEnabled && localCameraStream) streams.push(localCameraStream);
  if (isScreenSharing && localScreenStream) streams.push(localScreenStream);
  return streams;
}

function getDesiredLocalVoiceTracks() {
  const tracks = [];
  if (localVoiceStream) tracks.push(...localVoiceStream.getAudioTracks());
  if (isCameraEnabled && localCameraStream) tracks.push(...localCameraStream.getVideoTracks());
  if (isScreenSharing && localScreenStream) {
    tracks.push(...localScreenStream.getVideoTracks());
    tracks.push(...localScreenStream.getAudioTracks());
  }
  return tracks;
}

async function ensureLocalCameraStream() {
  if (localCameraStream?.getVideoTracks?.().length) return localCameraStream;
  localCameraStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: { ideal: 640 },
      height: { ideal: 360 },
      frameRate: { ideal: 15, max: 24 },
    },
  });
  return localCameraStream;
}

async function ensureLocalScreenStream() {
  if (localScreenStream?.getVideoTracks?.().length) return localScreenStream;
  let startedWithoutAudio = false;
  try {
    localScreenStream = await navigator.mediaDevices.getDisplayMedia({
      video: getScreenShareVideoConstraints(),
      audio: getScreenShareAudioConstraints(),
    });
  } catch (err) {
    try {
      // Some browsers reject advanced audio constraints; retry with plain audio request.
      localScreenStream = await navigator.mediaDevices.getDisplayMedia({
        video: getScreenShareVideoConstraints(),
        audio: true,
      });
    } catch {
      // Some browsers/platforms reject audio capture for display media; fall back to video-only.
      localScreenStream = await navigator.mediaDevices.getDisplayMedia({
        video: getScreenShareVideoConstraints(),
        audio: false,
      });
      startedWithoutAudio = true;
    }
  }
  const audioTracks = localScreenStream.getAudioTracks?.() || [];
  audioTracks.forEach((track) => {
    track.enabled = true;
    try {
      track.contentHint = "music";
    } catch {
      // Some browsers ignore contentHint.
    }
  });
  if (startedWithoutAudio || audioTracks.length === 0) {
    try {
      showToast("Screen share has no audio. Share a browser tab and enable tab audio.");
    } catch {
      // ignore toast failures
    }
  }
  const videoTrack = localScreenStream.getVideoTracks?.()[0];
  if (videoTrack) {
    videoTrack.onended = () => {
      stopScreenShare({ notifyPeers: true }).catch(() => {});
    };
  }
  return localScreenStream;
}

async function renegotiatePeer(peerId) {
  const pc = peerConnections.get(peerId);
  if (!pc || pc.signalingState === "closed") return;
  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendVoiceSignal(peerId, { description: pc.localDescription });
  } catch {
    // Ignore renegotiation failures (peer may be reconnecting)
  }
}

async function syncPeerMediaTracks(peerId, { renegotiate = true } = {}) {
  const pc = peerConnections.get(peerId);
  if (!pc) return;
  const desiredTracks = getDesiredLocalVoiceTracks();
  const desiredTrackIds = new Set(desiredTracks.map((t) => t.id));
  const senders = pc.getSenders ? pc.getSenders() : [];
  let needsRenegotiation = false;

  for (const sender of senders) {
    if (!sender.track) continue;
    const track = sender.track;
    if (track.kind === "audio") continue;
    if (!desiredTrackIds.has(track.id)) {
      try {
        await sender.replaceTrack(null);
        needsRenegotiation = true;
      } catch {
        // Ignore sender teardown failures
      }
    }
  }

  const existingSenderTrackIds = new Set(
    senders
      .map((sender) => sender.track?.id)
      .filter(Boolean)
  );
  for (const track of desiredTracks) {
    if (existingSenderTrackIds.has(track.id)) continue;
    const sourceStream = track.kind === "audio"
      ? localVoiceStream
      : (isScreenSharing && localScreenStream?.getVideoTracks?.().some((t) => t.id === track.id) ? localScreenStream : localCameraStream);
    if (!sourceStream) continue;
    try {
      pc.addTrack(track, sourceStream);
      needsRenegotiation = true;
    } catch {
      // Ignore addTrack failures for stale PCs
    }
  }

  if (renegotiate && needsRenegotiation) {
    await renegotiatePeer(peerId);
  }
}

async function syncAllPeerMediaTracks({ renegotiate = true } = {}) {
  const jobs = [...peerConnections.keys()].map((peerId) => syncPeerMediaTracks(peerId, { renegotiate }));
  await Promise.allSettled(jobs);
}

async function startCameraShare() {
  await ensureLocalCameraStream();
  isCameraEnabled = true;
  renderLocalVoiceVideoTiles();
  updateVoiceMediaButtons();
  sendVoiceState();
  await syncAllPeerMediaTracks({ renegotiate: true });
}

function stopCameraShare({ notifyPeers = true } = {}) {
  if (localCameraStream) {
    stopStreamTracks(localCameraStream);
    localCameraStream = null;
  }
  isCameraEnabled = false;
  renderLocalVoiceVideoTiles();
  updateVoiceMediaButtons();
  if (notifyPeers) {
    sendVoiceState();
    syncAllPeerMediaTracks({ renegotiate: true }).catch(() => {});
  }
}

async function stopScreenShare({ notifyPeers = true } = {}) {
  if (localScreenStream) {
    stopStreamTracks(localScreenStream);
    localScreenStream = null;
  }
  isScreenSharing = false;
  renderLocalVoiceVideoTiles();
  updateVoiceMediaButtons();
  if (notifyPeers) {
    sendVoiceState();
    await syncAllPeerMediaTracks({ renegotiate: true });
  }
}

async function startScreenShare() {
  await ensureLocalScreenStream();
  isScreenSharing = true;
  renderLocalVoiceVideoTiles();
  updateVoiceMediaButtons();
  sendVoiceState();
  await syncAllPeerMediaTracks({ renegotiate: true });
}

function buildVoiceAudioConstraints() {
  const enableEc = Boolean(voiceSettings.echoCancellation);
  const enableNs = Boolean(voiceSettings.noiseSuppression);
  return {
    // Prefer browser/hardware DSP first; app-side EQ remains optional on top.
    echoCancellation: enableEc,
    noiseSuppression: enableNs,
    autoGainControl: true,
    channelCount: { ideal: 1 },
    sampleRate: { ideal: 48000 },
    sampleSize: { ideal: 16 },
    latency: { ideal: 0.02 },
    advanced: [
      { googEchoCancellation: enableEc },
      { googEchoCancellation2: enableEc },
      { googDAEchoCancellation: enableEc },
      { googNoiseSuppression: enableNs },
      { googNoiseSuppression2: enableNs },
      { googAutoGainControl: true },
    ],
  };
}

async function applyVoiceConstraintsToStream(stream) {
  if (!stream) return;
  const track = stream.getAudioTracks?.()[0];
  if (!track?.applyConstraints) return;
  const supported = navigator.mediaDevices?.getSupportedConstraints?.() || {};
  const next = {};
  if (supported.echoCancellation) next.echoCancellation = Boolean(voiceSettings.echoCancellation);
  if (supported.noiseSuppression) next.noiseSuppression = Boolean(voiceSettings.noiseSuppression);
  if (supported.autoGainControl) next.autoGainControl = true;
  if (supported.channelCount) next.channelCount = 1;
  if (supported.sampleRate) next.sampleRate = 48000;
  next.advanced = [
    { googEchoCancellation: Boolean(voiceSettings.echoCancellation) },
    { googEchoCancellation2: Boolean(voiceSettings.echoCancellation) },
    { googDAEchoCancellation: Boolean(voiceSettings.echoCancellation) },
    { googNoiseSuppression: Boolean(voiceSettings.noiseSuppression) },
    { googNoiseSuppression2: Boolean(voiceSettings.noiseSuppression) },
    { googAutoGainControl: true },
  ];
  if (Object.keys(next).length === 0) return;
  try {
    await track.applyConstraints(next);
  } catch {
    // Constraint support varies by browser/device.
  }
}

function getVoiceConstraintStatus(stream) {
  const track = stream?.getAudioTracks?.()[0];
  const settings = track?.getSettings ? track.getSettings() : {};
  return {
    echoCancellation: settings?.echoCancellation,
    noiseSuppression: settings?.noiseSuppression,
    autoGainControl: settings?.autoGainControl,
  };
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

function applySpeechContentHint(stream) {
  const track = stream?.getAudioTracks?.()[0];
  if (!track) return;
  try {
    track.contentHint = "speech";
  } catch {
    // Some browsers ignore contentHint.
  }
}

function teardownLocalVoiceProcessor() {
  if (!localVoiceProcessor) return;
  if (localVoiceProcessor.runtime?.dispose) {
    try {
      localVoiceProcessor.runtime.dispose();
    } catch {
      // Ignore runtime dispose failures
    }
  }
  const nodes = localVoiceProcessor.nodes || [];
  nodes.forEach((node) => {
    try {
      node.disconnect();
    } catch {
      // Ignore disconnect failures
    }
  });
  localVoiceProcessor = null;
}

function stopStreamTracks(stream, seenTrackIds = null) {
  if (!stream) return;
  stream.getTracks().forEach((track) => {
    if (seenTrackIds && seenTrackIds.has(track.id)) return;
    if (seenTrackIds) seenTrackIds.add(track.id);
    try {
      track.stop();
    } catch {
      // Ignore stop failures
    }
  });
}

function attachDenoiseNodes(ctx, inputNode, nodes) {
  const denoiseStrength = clamp(Number(voiceSettings.denoiseStrength ?? 40), 0, 100) / 100;

  const highPass = ctx.createBiquadFilter();
  highPass.type = "highpass";
  highPass.frequency.value = 80 + Math.round(100 * denoiseStrength);
  highPass.Q.value = 0.7;

  const lowPass = ctx.createBiquadFilter();
  lowPass.type = "lowpass";
  lowPass.frequency.value = 8500 - Math.round(3200 * denoiseStrength);
  lowPass.Q.value = 0.7;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -52 + (20 * denoiseStrength);
  compressor.knee.value = 24;
  compressor.ratio.value = 2 + (2 * denoiseStrength);
  compressor.attack.value = 0.003;
  compressor.release.value = 0.18;

  inputNode.connect(highPass);
  highPass.connect(lowPass);
  lowPass.connect(compressor);
  nodes.push(highPass, lowPass, compressor);
  return compressor;
}

function buildProcessedVoiceStream(rawStream) {
  teardownLocalVoiceProcessor();
  const ctx = ensureVoiceAudioContext();
  if (!ctx || !rawStream) return rawStream;
  if (!voiceSettings.eqEnabled && !voiceSettings.denoiseEnabled) return rawStream;

  const source = ctx.createMediaStreamSource(rawStream);
  const nodes = [source];
  let lastNode = source;

  if (voiceSettings.denoiseEnabled) {
    lastNode = attachDenoiseNodes(ctx, lastNode, nodes);
  }

  if (voiceSettings.eqEnabled) {
    const eqLow = ctx.createBiquadFilter();
    eqLow.type = "lowshelf";
    eqLow.frequency.value = 160;
    eqLow.gain.value = voiceSettings.eqLowGain;

    const eqMid = ctx.createBiquadFilter();
    eqMid.type = "peaking";
    eqMid.frequency.value = 1250;
    eqMid.Q.value = 0.9;
    eqMid.gain.value = voiceSettings.eqMidGain;

    const eqHigh = ctx.createBiquadFilter();
    eqHigh.type = "highshelf";
    eqHigh.frequency.value = 4300;
    eqHigh.gain.value = voiceSettings.eqHighGain;

    lastNode.connect(eqLow);
    eqLow.connect(eqMid);
    eqMid.connect(eqHigh);
    lastNode = eqHigh;
    nodes.push(eqLow, eqMid, eqHigh);
  }

  const destination = ctx.createMediaStreamDestination();
  lastNode.connect(destination);
  nodes.push(destination);

  localVoiceProcessor = { nodes };
  return destination.stream;
}

function updateMicSelfTestUi() {
  const isRunning = !!micSelfTestProcessedStream;
  if (settingsVoiceSelfTestBtn) {
    settingsVoiceSelfTestBtn.textContent = isRunning ? "Stop Mic Self Test" : "Start Mic Self Test";
  }
  if (settingsVoiceSelfTestStatus) {
    settingsVoiceSelfTestStatus.textContent = isRunning
      ? "Self test running (use headphones to avoid feedback)"
      : "Self test idle";
  }
}

function setMicSelfTestStatus(text) {
  if (settingsVoiceSelfTestStatus) settingsVoiceSelfTestStatus.textContent = text;
}

function teardownMicSelfTestGraph() {
  if (micSelfTestNodes.runtime?.dispose) {
    try {
      micSelfTestNodes.runtime.dispose();
    } catch {
      // Ignore runtime dispose failures
    }
  }
  micSelfTestNodes.forEach((node) => {
    try {
      node.disconnect();
    } catch {
      // Ignore disconnect failures
    }
  });
  micSelfTestNodes = [];
}

function buildProcessedVoiceStreamForSelfTest(rawStream) {
  teardownMicSelfTestGraph();
  const ctx = ensureVoiceAudioContext();
  if (!ctx || !rawStream) return rawStream;
  if (!voiceSettings.eqEnabled && !voiceSettings.denoiseEnabled) return rawStream;

  const source = ctx.createMediaStreamSource(rawStream);
  const nodes = [source];
  let lastNode = source;

  if (voiceSettings.denoiseEnabled) {
    lastNode = attachDenoiseNodes(ctx, lastNode, nodes);
  }

  if (voiceSettings.eqEnabled) {
    const eqLow = ctx.createBiquadFilter();
    eqLow.type = "lowshelf";
    eqLow.frequency.value = 160;
    eqLow.gain.value = voiceSettings.eqLowGain;

    const eqMid = ctx.createBiquadFilter();
    eqMid.type = "peaking";
    eqMid.frequency.value = 1250;
    eqMid.Q.value = 0.9;
    eqMid.gain.value = voiceSettings.eqMidGain;

    const eqHigh = ctx.createBiquadFilter();
    eqHigh.type = "highshelf";
    eqHigh.frequency.value = 4300;
    eqHigh.gain.value = voiceSettings.eqHighGain;

    lastNode.connect(eqLow);
    eqLow.connect(eqMid);
    eqMid.connect(eqHigh);
    lastNode = eqHigh;
    nodes.push(eqLow, eqMid, eqHigh);
  }

  const destination = ctx.createMediaStreamDestination();
  lastNode.connect(destination);
  nodes.push(destination);
  micSelfTestNodes = nodes;
  return destination.stream;
}

function stopMicSelfTest() {
  if (micSelfTestAudioEl) {
    try {
      micSelfTestAudioEl.pause();
    } catch {}
    micSelfTestAudioEl.srcObject = null;
    micSelfTestAudioEl = null;
  }
  const seen = new Set();
  stopStreamTracks(micSelfTestProcessedStream, seen);
  stopStreamTracks(micSelfTestRawStream, seen);
  micSelfTestProcessedStream = null;
  micSelfTestRawStream = null;
  teardownMicSelfTestGraph();
  updateMicSelfTestUi();
  setMicSelfTestStatus("Self test idle");
}

async function startMicSelfTest() {
  stopMicSelfTest();
  setMicSelfTestStatus("Starting self test...");
  try {
    const ctx = ensureVoiceAudioContext();
    if (ctx && ctx.state === "suspended") {
      await ctx.resume().catch(() => {});
    }
    if (rawLocalVoiceStream && rawLocalVoiceStream.getAudioTracks().length > 0) {
      const clonedTracks = rawLocalVoiceStream.getAudioTracks().map((track) => track.clone());
      micSelfTestRawStream = new MediaStream(clonedTracks);
    } else {
      micSelfTestRawStream = await navigator.mediaDevices.getUserMedia({
        audio: buildVoiceAudioConstraints(),
        video: false,
      });
      await applyVoiceConstraintsToStream(micSelfTestRawStream);
    }
    micSelfTestProcessedStream = buildProcessedVoiceStreamForSelfTest(micSelfTestRawStream);
    micSelfTestAudioEl = document.createElement("audio");
    micSelfTestAudioEl.autoplay = true;
    micSelfTestAudioEl.playsInline = true;
    micSelfTestAudioEl.volume = 1;
    micSelfTestAudioEl.srcObject = micSelfTestProcessedStream;
    await micSelfTestAudioEl.play();
    updateMicSelfTestUi();
    setMicSelfTestStatus("Self test running (use headphones to avoid feedback)");
  } catch {
    stopMicSelfTest();
    setMicSelfTestStatus("Self test failed");
    throw new Error("Mic self test failed. Check mic permission and try again.");
  }
}

function detachVoiceLevelSource(peerId) {
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

async function refreshLocalVoiceCaptureFromSettings({ showStatusToast = false } = {}) {
  if (!localVoiceStream && !rawLocalVoiceStream) return;
  const previousLocalStream = localVoiceStream;
  const previousRawStream = rawLocalVoiceStream;

  let nextRaw = null;
  let nextProcessed = null;
  try {
    nextRaw = await navigator.mediaDevices.getUserMedia({
      audio: buildVoiceAudioConstraints(),
      video: false,
    });
    await applyVoiceConstraintsToStream(nextRaw);
    nextProcessed = buildProcessedVoiceStream(nextRaw);
  } catch {
    if (showStatusToast) {
      showToast("Could not apply voice processing. Check mic permissions.");
    }
    stopStreamTracks(nextRaw);
    return;
  }

  const nextTrack = nextProcessed?.getAudioTracks?.()[0] || null;
  if (!nextTrack) {
    stopStreamTracks(nextProcessed);
    stopStreamTracks(nextRaw);
    if (showStatusToast) showToast("Voice processing failed to create audio track.");
    return;
  }

  localVoiceStream = nextProcessed;
  rawLocalVoiceStream = nextRaw;
  applySpeechContentHint(rawLocalVoiceStream);
  applySpeechContentHint(localVoiceStream);
  applyLocalMuteState();
  if (voiceSelfPeerId) {
    detachVoiceLevelSource(voiceSelfPeerId);
    attachVoiceLevelStream(voiceSelfPeerId, localVoiceStream);
  }

  const replaceJobs = [];
  peerConnections.forEach((pc) => {
    pc.getSenders()
      .filter((sender) => sender.track && sender.track.kind === "audio")
      .forEach((sender) => {
        replaceJobs.push(sender.replaceTrack(nextTrack).catch(() => {}));
      });
  });
  if (replaceJobs.length > 0) {
    await Promise.all(replaceJobs);
  }

  const seen = new Set();
  stopStreamTracks(previousRawStream, seen);
  stopStreamTracks(previousLocalStream, seen);

  if (showStatusToast) {
    showToast("Voice processing updated.");
  }
  return getVoiceConstraintStatus(nextRaw);
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
  voiceUsersList.oncontextmenu = (event) => {
    if (event.target?.closest?.(".voice-user-row")) return;
    event.preventDefault();
    event.stopPropagation();
    showMusicBotContextMenu(event.clientX, event.clientY);
  };
  entries.forEach((peer) => {
    const row = document.createElement("div");
    row.className = "voice-user-row";
    const canWatchStream = (peer.screen_on || peer.link_stream_url) && peer.peer_id !== voiceSelfPeerId;
    if (canWatchStream) {
      row.style.cursor = "pointer";
      row.title = watchedPeerStreamIds.has(peer.peer_id) ? "Click to stop watching stream" : "Click to watch stream";
      row.addEventListener("click", () => {
        toggleVoiceStreamWatchForPeer(peer.peer_id);
      });
    }
    row.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showContextMenu(event.clientX, event.clientY, [
        {
          label: (peer.screen_on || peer.link_stream_url)
            ? (watchedPeerStreamIds.has(peer.peer_id) ? "Stop Watching Stream" : "Watch Stream")
            : "No Active Stream",
          onClick: () => {
            if (!(peer.screen_on || peer.link_stream_url)) return;
            toggleVoiceStreamWatchForPeer(peer.peer_id);
          },
        },
        {
          label: "Music Bot Controls",
          onClick: () => showMusicBotContextMenu(event.clientX, event.clientY),
        },
      ]);
    });

    const left = document.createElement("div");
    left.className = "voice-user-left";

    const avatar = document.createElement("img");
    avatar.className = "voice-user-avatar";
    bindUserAvatarImage(avatar, peer.user_public_id, { alt: `${peer.username} avatar` });
    attachPublicUserProfileTrigger(avatar, peer.user_public_id);
    const hasStream = Boolean(peer.screen_on || peer.link_stream_url);
    avatar.style.boxShadow = hasStream ? "0 0 0 2px rgba(230,64,64,0.9)" : "";
    avatar.style.border = hasStream ? "1px solid rgba(255,255,255,0.65)" : "";
    left.appendChild(avatar);

    const label = document.createElement("span");
    label.className = "voice-user-name";
    label.textContent = `${peer.username}${peer.peer_id === voiceSelfPeerId ? " (you)" : ""}`;
    attachPublicUserProfileTrigger(label, peer.user_public_id);
    left.appendChild(label);
    const statusText = document.createElement("span");
    statusText.className = "voice-user-status";
    attachPublicUserProfileTrigger(statusText, peer.user_public_id);
    hydrateUserStatusElement(statusText, peer.user_public_id, { emptyText: "", hiddenWhenEmpty: true });
    left.appendChild(statusText);

    const badges = document.createElement("span");
    badges.className = "voice-user-badges";
    badges.innerHTML = `${peer.muted ? '<i class="fas fa-microphone-slash" title="Muted"></i>' : ""}${peer.deafened ? '<i class="fas fa-headphones-alt" title="Deafened"></i>' : ""}${peer.camera_on ? '<i class="fas fa-video" title="Camera On"></i>' : ""}${peer.screen_on ? '<i class="fas fa-desktop" title="Screen Sharing"></i>' : ""}`;
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

  if (voiceMusicBotState?.invited) {
    const botRow = document.createElement("div");
    botRow.className = "voice-user-row";
    const botHasStream = !!(voiceMusicBotState.url && String(voiceMusicBotState.url).trim());
    const isOpen = watchedPeerStreamIds.has(MUSIC_BOT_PEER_ID);
    botRow.title = botHasStream ? "Click the music bot avatar to open/close playback" : "Right-click to queue a music URL";
    botRow.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showMusicBotContextMenu(event.clientX, event.clientY);
    });

    const left = document.createElement("div");
    left.className = "voice-user-left";
    const avatar = document.createElement("div");
    avatar.className = "voice-user-avatar";
    avatar.textContent = "♪";
    avatar.style.display = "inline-flex";
    avatar.style.alignItems = "center";
    avatar.style.justifyContent = "center";
    avatar.style.fontWeight = "700";
    avatar.style.cursor = botHasStream ? "pointer" : "default";
    avatar.title = botHasStream
      ? (isOpen ? "Stop music bot playback" : "Start music bot playback")
      : "No track queued";
    if (botHasStream) {
      avatar.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (watchedPeerStreamIds.has(MUSIC_BOT_PEER_ID)) watchedPeerStreamIds.delete(MUSIC_BOT_PEER_ID);
        else watchedPeerStreamIds.add(MUSIC_BOT_PEER_ID);
        renderMusicBotStreamTile();
        renderVoiceUsers();
      });
    }
    left.appendChild(avatar);

    const label = document.createElement("span");
    label.className = "voice-user-name";
    label.textContent = "Music Bot";
    left.appendChild(label);

    const statusText = document.createElement("span");
    statusText.className = "voice-user-status";
    if (botHasStream) {
      const title = getMusicBotTrackTitle();
      const queueSuffix = Number(voiceMusicBotState.queue_length || 0) > 1
        ? ` (+${Number(voiceMusicBotState.queue_length || 0) - 1} queued)`
        : "";
      if (voiceMusicBotState.playing) {
        statusText.textContent = title ? `Now Playing: ${title}${queueSuffix}` : `Now Playing${queueSuffix}`;
      } else {
        statusText.textContent = title ? `Paused: ${title}${queueSuffix}` : `Paused${queueSuffix}`;
      }
    } else {
      statusText.textContent = "Idle";
    }
    left.appendChild(statusText);

    if (botHasStream) {
      const controls = document.createElement("span");
      controls.className = "voice-user-badges";
      controls.style.gap = "6px";

      const playPauseBtn = document.createElement("button");
      playPauseBtn.type = "button";
      playPauseBtn.className = "voice-btn secondary";
      playPauseBtn.textContent = voiceMusicBotState.playing ? "Pause" : "Play";
      playPauseBtn.style.padding = "2px 8px";
      playPauseBtn.style.fontSize = "11px";
      playPauseBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMusicBotPlayPause();
      });

      const skipBtn = document.createElement("button");
      skipBtn.type = "button";
      skipBtn.className = "voice-btn secondary";
      skipBtn.textContent = "Skip";
      skipBtn.style.padding = "2px 8px";
      skipBtn.style.fontSize = "11px";
      skipBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        skipMusicBotTrack();
      });

      controls.appendChild(playPauseBtn);
      controls.appendChild(skipBtn);
      left.appendChild(controls);
    }

    const badges = document.createElement("span");
    badges.className = "voice-user-badges";
    badges.innerHTML = `${botHasStream ? '<i class="fas fa-music" title="Music Playing"></i>' : '<i class="fas fa-robot" title="Bot Invited"></i>'}`;
    left.appendChild(badges);
    botRow.appendChild(left);

    const wave = document.createElement("div");
    wave.className = "voice-wave";
    const waveFill = document.createElement("span");
    waveFill.className = "voice-wave-fill";
    waveFill.style.transform = botHasStream ? "scaleX(0.6)" : "scaleX(0.05)";
    waveFill.style.opacity = botHasStream ? "0.8" : "0.3";
    wave.appendChild(waveFill);
    botRow.appendChild(wave);

    const volume = document.createElement("input");
    volume.type = "range";
    volume.min = "0";
    volume.max = "200";
    volume.value = String(Math.max(0, Math.min(200, Number(musicBotVolume || 100))));
    volume.className = "voice-volume-slider";
    volume.addEventListener("pointerdown", (event) => event.stopPropagation());
    volume.addEventListener("click", (event) => event.stopPropagation());
    volume.addEventListener("input", () => {
      musicBotVolume = clamp(Number(volume.value), 0, 200);
      applyMusicBotPlaybackVolume();
    });
    botRow.appendChild(volume);

    voiceUsersList.appendChild(botRow);
  }
  renderVoiceUsersInChannelsPanel();
}

function renderVoiceUsersInChannelsPanel() {
  if (!channelsPanel) return;
  const entriesByChannel = new Map();
  voiceChannelOccupancy.forEach((entries, channelId) => {
    entriesByChannel.set(channelId, [...entries].sort((a, b) => a.username.localeCompare(b.username)));
  });
  const activeVoiceChannelId = voiceSocketChannelId || null;
  if (activeVoiceChannelId && peerMeta.size > 0) {
    entriesByChannel.set(
      activeVoiceChannelId,
      [...peerMeta.values()].sort((a, b) => a.username.localeCompare(b.username))
    );
  }
  if (activeVoiceChannelId && voiceMusicBotState?.invited) {
    const current = entriesByChannel.get(activeVoiceChannelId) || [];
    current.push({
      peer_id: MUSIC_BOT_PEER_ID,
      user_public_id: null,
      username: "Music Bot",
      muted: false,
      deafened: false,
      camera_on: false,
      screen_on: false,
      link_stream_url: voiceMusicBotState.url ? String(voiceMusicBotState.url) : null,
    });
    entriesByChannel.set(activeVoiceChannelId, current.sort((a, b) => a.username.localeCompare(b.username)));
  }
  const selfPublicId = String(currentUser?.public_id || "");

  channelsPanel.querySelectorAll(".channel-item[data-channel-type='voice']").forEach((el) => {
    let listEl = el.querySelector(".channel-voice-members");
    if (!listEl) {
      listEl = document.createElement("div");
      listEl.className = "channel-voice-members";
      el.appendChild(listEl);
    }

    const channelId = String(el.dataset.channelId || "");
    const entries = entriesByChannel.get(channelId) || [];
    const hasVoiceMembers = entries.length > 0;
    el.classList.toggle("has-voice-members", hasVoiceMembers);
    listEl.innerHTML = "";
    if (!hasVoiceMembers) return;

    entries.forEach((peer) => {
      const row = document.createElement("div");
      row.className = "channel-voice-member";

      if (peer.peer_id === MUSIC_BOT_PEER_ID) {
        const avatar = document.createElement("div");
        avatar.className = "channel-voice-member-avatar";
        avatar.textContent = "♪";
        avatar.style.display = "inline-flex";
        avatar.style.alignItems = "center";
        avatar.style.justifyContent = "center";
        avatar.style.fontWeight = "700";
        row.appendChild(avatar);
      } else {
        const avatar = document.createElement("img");
        avatar.className = "channel-voice-member-avatar";
        bindUserAvatarImage(avatar, peer.user_public_id, { alt: "" });
        attachPublicUserProfileTrigger(avatar, peer.user_public_id);
        const hasStream = Boolean(peer.screen_on || peer.link_stream_url);
        avatar.style.boxShadow = hasStream ? "0 0 0 2px rgba(230,64,64,0.9)" : "";
        avatar.style.border = hasStream ? "1px solid rgba(255,255,255,0.65)" : "";
        row.appendChild(avatar);
      }

      const name = document.createElement("span");
      name.className = "channel-voice-member-name";
      const isSelf = (peer.peer_id && peer.peer_id === voiceSelfPeerId) || (peer.user_public_id && peer.user_public_id === selfPublicId);
      name.textContent = `${peer.username}${isSelf ? " (you)" : ""}`;
      attachPublicUserProfileTrigger(name, peer.user_public_id);
      row.appendChild(name);

      if (peer.muted || peer.deafened) {
        const badges = document.createElement("span");
        badges.className = "channel-voice-member-badges";
        badges.innerHTML = `${peer.muted ? '<i class="fas fa-microphone-slash" title="Muted"></i>' : ""}${peer.deafened ? '<i class="fas fa-headphones-alt" title="Deafened"></i>' : ""}`;
        row.appendChild(badges);
      }

      listEl.appendChild(row);
    });
  });
}

async function ensureLocalVoiceStream() {
  if (localVoiceStream) return localVoiceStream;
  rawLocalVoiceStream = await navigator.mediaDevices.getUserMedia({
    audio: buildVoiceAudioConstraints(),
    video: false,
  });
  await applyVoiceConstraintsToStream(rawLocalVoiceStream);
  applySpeechContentHint(rawLocalVoiceStream);
  localVoiceStream = buildProcessedVoiceStream(rawLocalVoiceStream);
  applySpeechContentHint(localVoiceStream);
  applyLocalMuteState();
  if (voiceSelfPeerId) attachVoiceLevelStream(voiceSelfPeerId, localVoiceStream);
  renderLocalVoiceVideoTiles();
  return localVoiceStream;
}

function sendVoiceState() {
  if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) return;
  voiceSocket.send(
    JSON.stringify({
      type: "state",
      muted: isMuted,
      deafened: isDeafened,
      camera_on: isCameraEnabled,
      screen_on: isScreenSharing,
      link_stream_url: sharedLinkStreamUrl || null,
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

function sendMusicBotControl(action, extras = {}) {
  if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) {
    showToast("Join a voice channel first");
    return;
  }
  const payload = { type: "music_bot_control", action, ...extras };
  voiceSocket.send(JSON.stringify(payload));
}

function setMusicBotPlaying(playing) {
  sendMusicBotControl("set_playing", { playing: !!playing });
}

function toggleMusicBotPlayPause() {
  if (!voiceMusicBotState?.url) {
    showToast("Queue a song first");
    return;
  }
  setMusicBotPlaying(!voiceMusicBotState.playing);
}

function skipMusicBotTrack() {
  if (!voiceMusicBotState?.url) {
    showToast("No song to skip");
    return;
  }
  sendMusicBotControl("skip");
}

function inviteMusicBot() {
  sendMusicBotControl("invite");
  showToast("Music bot invited");
}

function removeMusicBot() {
  sendMusicBotControl("remove");
  showToast("Music bot removed");
}

async function setMusicBotUrl() {
  if (!voiceMusicBotState?.invited) {
    showToast("Invite the music bot first");
    return;
  }
  const raw = window.prompt("Paste a music URL (YouTube, Vimeo, or direct media):", voiceMusicBotState.url || "");
  if (!raw || !raw.trim()) return;
  const parsed = parseEmbeddableStreamUrl(raw);
  if (!parsed) {
    showToast("Unsupported or invalid link");
    return;
  }
  const title = await resolveMusicTrackTitle(raw.trim(), parsed);
  sendMusicBotControl("set_url", { url: raw.trim(), title });
}

function clearMusicBotUrl() {
  if (!voiceMusicBotState?.invited) return;
  sendMusicBotControl("clear_url");
  showToast("Music bot queue cleared");
}

function showMusicBotContextMenu(x, y) {
  const invited = !!voiceMusicBotState?.invited;
  const hasUrl = !!(voiceMusicBotState?.url && String(voiceMusicBotState.url).trim());
  showContextMenu(x, y, [
    invited
      ? { label: "Set Music URL", onClick: () => setMusicBotUrl() }
      : { label: "Invite Music Bot", onClick: () => inviteMusicBot() },
    {
      label: voiceMusicBotState?.playing ? "Pause" : "Play",
      onClick: () => toggleMusicBotPlayPause(),
    },
    {
      label: "Skip",
      onClick: () => skipMusicBotTrack(),
    },
    {
      label: hasUrl ? "Replace URL" : "Queue URL",
      onClick: () => setMusicBotUrl(),
    },
    {
      label: "Clear URL",
      onClick: () => clearMusicBotUrl(),
    },
    {
      label: "Remove Music Bot",
      danger: true,
      onClick: () => removeMusicBot(),
    },
  ]);
}

async function createPeerConnection(peerId, makeOffer) {
  if (peerConnections.has(peerId)) return peerConnections.get(peerId);

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  peerConnections.set(peerId, pc);

  const stream = await ensureLocalVoiceStream();
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  if (isCameraEnabled && localCameraStream) {
    localCameraStream.getVideoTracks().forEach((track) => pc.addTrack(track, localCameraStream));
  }
  if (isScreenSharing && localScreenStream) {
    localScreenStream.getVideoTracks().forEach((track) => pc.addTrack(track, localScreenStream));
    localScreenStream.getAudioTracks().forEach((track) => pc.addTrack(track, localScreenStream));
  }

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      sendVoiceSignal(peerId, { candidate: event.candidate });
    }
  };

  pc.ontrack = (event) => {
    if (event.track?.kind === "video") {
      const tileKey = getRemoteVideoSourceKeyForTrack(peerId, event.track?.id || "");
      const incomingStream = event.streams[0] || new MediaStream([event.track]);
      if (!isRemoteStreamTileVisible(tileKey) && !tileKey.endsWith(":camera")) {
        pendingRemoteVideoStreams.set(tileKey, incomingStream);
        return;
      }
      const tile = ensureVoiceVideoTile(tileKey, {
        label: `${getPeerDisplayName(peerId)} - ${tileKey.endsWith(":screen") ? "Screen" : "Camera"}`,
      });
      if (tile) {
        tile.video.muted = true;
        tile.tile.classList.toggle("hidden", !isRemoteStreamTileVisible(tileKey));
        tile.video.srcObject = incomingStream;
        updateVoiceVideoGridVisibility();
      }
      return;
    }
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
    const incomingAudioTrack = event.track;
    let targetAudioStream = audio.srcObject instanceof MediaStream ? audio.srcObject : null;
    if (!targetAudioStream) {
      targetAudioStream = new MediaStream();
      audio.srcObject = targetAudioStream;
    }
    if (incomingAudioTrack && !targetAudioStream.getAudioTracks().some((t) => t.id === incomingAudioTrack.id)) {
      targetAudioStream.addTrack(incomingAudioTrack);
    }
    applyDeafenOutput();
    attachVoiceLevelStream(peerId, targetAudioStream);
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
    camera_on: !!peer.camera_on,
    screen_on: !!peer.screen_on,
    link_stream_url: peer.link_stream_url ? String(peer.link_stream_url) : null,
  });
  renderVoiceUsers();
  updateRemotePeerVideoTileLabels();
  renderRemoteLinkStreamTile(peer.peer_id);
}

function removeVoicePeer(peerId) {
  peerMeta.delete(peerId);
  closePeerConnection(peerId);
  renderVoiceUsers();
  updateRemotePeerVideoTileLabels();
}

async function joinVoiceChannel(channelPublicId, wsPathPrefix = "/ws/voice/") {
  if (!channelPublicId) return;
  if (voiceSocket && voiceSocketChannelId === channelPublicId && voiceSocket.readyState === WebSocket.OPEN) return;

  stopMicSelfTest();
  leaveVoiceChannel();
  await ensureLocalVoiceStream();
  updateVoiceMediaButtons();

  const wsUrl = buildWsUrl(`${wsPathPrefix}${channelPublicId}`);
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
      applyMusicBotState(data.music_bot || null);
      voiceSelfPeerId = data.self_peer_id;
      addVoicePeer({
        peer_id: voiceSelfPeerId,
        user_id: currentUserId,
        user_public_id: currentUser?.public_id || null,
        username: currentUser?.username || "You",
        muted: isMuted,
        deafened: isDeafened,
        camera_on: isCameraEnabled,
        screen_on: isScreenSharing,
        link_stream_url: sharedLinkStreamUrl,
      });
      if (localVoiceStream) attachVoiceLevelStream(voiceSelfPeerId, localVoiceStream);
      for (const peer of data.peers || []) {
        addVoicePeer(peer);
        await createPeerConnection(peer.peer_id, true);
      }
      if (voiceMusicBotState?.invited && voiceMusicBotState?.url) {
        watchedPeerStreamIds.add(MUSIC_BOT_PEER_ID);
        renderMusicBotStreamTile();
      }
    } else if (data.type === "peer_joined") {
      addVoicePeer(data.peer);
    } else if (data.type === "peer_left") {
      removeVoicePeer(data.peer_id);
    } else if (data.type === "music_bot_state") {
      applyMusicBotState(data.music_bot || null);
      if (voiceMusicBotState?.invited && voiceMusicBotState?.url) watchedPeerStreamIds.add(MUSIC_BOT_PEER_ID);
      renderMusicBotStreamTile();
    } else if (data.type === "peer_state") {
      const peer = peerMeta.get(data.peer_id);
      if (peer) {
        peer.muted = !!data.muted;
        peer.deafened = !!data.deafened;
        peer.camera_on = !!data.camera_on;
        peer.screen_on = !!data.screen_on;
        peer.link_stream_url = data.link_stream_url ? String(data.link_stream_url) : null;
        if (!peer.camera_on) {
          removeVoiceVideoTile(`${data.peer_id}:camera`);
          const slots = peerRemoteVideoTrackSlots.get(data.peer_id);
          if (slots) slots.camera = null;
        }
        if (!peer.screen_on) {
          removeVoiceVideoTile(`${data.peer_id}:screen`);
          pendingRemoteVideoStreams.delete(`${data.peer_id}:screen`);
          const slots = peerRemoteVideoTrackSlots.get(data.peer_id);
          if (slots) slots.screen = null;
        }
        if (!peer.screen_on && !peer.link_stream_url) {
          watchedPeerStreamIds.delete(data.peer_id);
        }
        renderVoiceUsers();
        updateRemotePeerVideoTileLabels();
        renderRemoteLinkStreamTile(data.peer_id);
        renderMusicBotStreamTile();
      }
    } else if (data.type === "signal") {
      await handleVoiceSignal(data.from_peer_id, data.signal);
    }
  };

  voiceSocket.onclose = () => {
    setVoiceStatus("Disconnected");
    closeVoiceSocket();
    resetVoicePeers();
    applyMusicBotState(null);
    if (activeMode === "dm") {
      activeChannelType = "text";
      updateTextVsVoiceUI();
    }
  };
}

function leaveVoiceChannel() {
  closeVoiceSocket();
  resetVoicePeers();
  applyMusicBotState(null);
  dmCallActive = false;
  const seen = new Set();
  stopStreamTracks(localCameraStream, seen);
  stopStreamTracks(localScreenStream, seen);
  stopStreamTracks(localVoiceStream, seen);
  stopStreamTracks(rawLocalVoiceStream, seen);
  localCameraStream = null;
  localScreenStream = null;
  localVoiceStream = null;
  rawLocalVoiceStream = null;
  isCameraEnabled = false;
  isScreenSharing = false;
  sharedLinkStreamUrl = null;
  teardownLocalVoiceProcessor();
  if (voiceSettingsApplyTimer) {
    clearTimeout(voiceSettingsApplyTimer);
    voiceSettingsApplyTimer = null;
  }
  setVoiceStatus("Not connected");
  updateVoiceMediaButtons();
  renderLocalVoiceVideoTiles();
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

function removeStaleChannelState(channelId) {
  unreadChannels.delete(channelId);
  channelLastSeen.delete(channelId);
  channelPresence.delete(channelId);
  voiceChannelOccupancy.delete(channelId);
  clearTypingForChannel(channelId);
  channelToServer.delete(channelId);
  channelTypeById.delete(channelId);
  channelNameById.delete(channelId);
  channelCategoryById.delete(channelId);
  if (voiceSocketChannelId === channelId) {
    leaveVoiceChannel();
  }
  recalculateUnreadServers();
}

async function connectChannelSocket(channelId) {
  if (!channelId || channelSockets.has(channelId)) return;
  if (!channelToServer.has(channelId)) return;
  if (blockedChannelSocketIds.has(channelId)) return;

  try {
    // Validate channel access/existence before opening websocket to avoid 404 WS loops.
    const probe = await fetch(`/messages/${channelId}?limit=1`, { credentials: "include" });
    if (probe.status === 404 || probe.status === 403) {
      removeStaleChannelState(channelId);
      return;
    }
  } catch {
    // Ignore probe errors; websocket connect may still succeed after transient failures.
  }

  const wsUrl = buildWsUrl(`/ws/messages/${channelId}`);
  const socket = new WebSocket(wsUrl);
  socket._opened = false;
  channelSockets.set(channelId, socket);
  setRealtimeState("channel", false, Date.now() + 2000, channelId);

  socket.onopen = () => {
    socket._opened = true;
    blockedChannelSocketIds.delete(channelId);
    channelSocketFailureCounts.delete(channelId);
    setRealtimeState("channel", true, 0, channelId);
    if (channelId === activeChannelId && activeChannelType === "battlemap") {
      sendChannelSocketEvent(channelId, { type: "battlemap_state_request" });
    }
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
      if (eventType === "battlemap_state_requested") {
        if (channelId === activeChannelId && activeChannelType === "battlemap" && battlemapState) {
          persistBattlemapState(channelId, battlemapState, { saveRemote: false });
        }
        return;
      }
      if (eventType === "battlemap_state_updated") {
        const nextBattlemapState = normalizeBattlemapState(data.state);
        saveBattlemapChannelState(channelId, nextBattlemapState);
        if (channelId === activeChannelId && activeChannelType === "battlemap") {
          battlemapState = nextBattlemapState;
          if (
            battlemapSelectedPawnId &&
            !nextBattlemapState.pawns.some((pawn) => pawn.id === battlemapSelectedPawnId)
          ) {
            battlemapSelectedPawnId = null;
          }
          renderBattlemapState();
        }
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

      if (isNewMessage && data.user_id !== currentUserId && shouldNotifyForMessage(channelId, data)) {
        emitIncomingMessageNotification("server", channelId, data);
      }

      if (channelId === activeChannelId && activeChannelType !== "voice") {
        if (activeChannelType === "notes") {
          if (isNewMessage) {
            markSeenForContextIfPending("server", channelId, data.user_id);
            channelLastSeen.set(channelId, createdTs);
            markChannelRead(channelId);
            recalculateUnreadServers();
          }
          if (data.user_id !== currentUserId) {
            // Another user updated the note page. Refresh the editor from latest content.
            await loadNotesPage(channelId);
          } else {
            setNotesEditorStatus("Saved");
          }
          return;
        }
        const nearBottom = messagesPanel
          ? (messagesPanel.scrollTop + messagesPanel.clientHeight >= messagesPanel.scrollHeight - 64)
          : true;
        if (isNewMessage) {
          markSeenForContextIfPending("server", channelId, data.user_id);
          channelLastSeen.set(channelId, createdTs);
          markChannelRead(channelId);
          recalculateUnreadServers();
        }
        if (isNewMessage && !data.parent_message_public_id) {
          appendRealtimeMessageToPanel(data, {
            context: "channel",
            nearBottom,
            mode: "server",
            contextId: channelId,
          });
        } else {
          await loadMessages(channelId, isNewMessage && nearBottom);
          if (isNewMessage && !nearBottom && data.user_id !== currentUserId) {
            setJumpUnreadVisible(true);
          }
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
    // Handshake failures (e.g. 403) never open; stop retrying after a few attempts.
    if (!socket._opened) {
      const failures = (channelSocketFailureCounts.get(channelId) || 0) + 1;
      channelSocketFailureCounts.set(channelId, failures);
      if (failures >= 3) {
        blockedChannelSocketIds.add(channelId);
        setRealtimeState("channel", false, 0, channelId);
        return;
      }
    }

    const retryAt = Date.now() + 2000;
    setRealtimeState("channel", false, retryAt, channelId);
    // Reconnect after brief delay while still logged in.
    const timer = setTimeout(async () => {
      if (!channelToServer.has(channelId)) return;
      try {
        // If channel no longer exists or user lost access, stop reconnect loop.
        const probe = await fetch(`/messages/${channelId}?limit=1`, { credentials: "include" });
        if (probe.status === 404 || probe.status === 403) {
          removeStaleChannelState(channelId);
          return;
        }
      } catch {
        // Network/proxy blips should still allow reconnect attempts.
      }
      connectChannelSocket(channelId).catch(() => {});
    }, 2000);
    channelReconnectTimers.set(channelId, timer);
  };

  socket.onerror = () => {
    setRealtimeState("channel", false, Date.now() + 2000, channelId);
    socket.close();
  };
}

async function syncRealtimeSubscriptions() {
  const runSync = async () => {
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
          const displayName = getDisplayChannelName(channel);
          nextChannelIds.add(channel.public_id);
          channelSocketFailureCounts.delete(channel.public_id);
          blockedChannelSocketIds.delete(channel.public_id);
          channelToServer.set(channel.public_id, server.public_id);
          channelTypeById.set(channel.public_id, channel.type || "text");
          channelNameById.set(channel.public_id, displayName || channel.name);
          channelCategoryById.set(channel.public_id, channel.category_public_id || null);
          connectChannelSocket(channel.public_id);
        }
      }

      [...channelSockets.keys()].forEach((existingChannelId) => {
        if (!nextChannelIds.has(existingChannelId)) {
          disconnectChannelSocket(existingChannelId);
          removeStaleChannelState(existingChannelId);
        }
      });

      [...channelToServer.keys()].forEach((knownChannelId) => {
        if (!nextChannelIds.has(knownChannelId)) {
          disconnectChannelSocket(knownChannelId);
          removeStaleChannelState(knownChannelId);
        }
      });

      recalculateUnreadServers();
    } catch {
      // Ignore sync failures
    }
  };

  if (realtimeSubscriptionSyncGate) {
    const result = await realtimeSubscriptionSyncGate.run(runSync);
    const snap = realtimeSubscriptionSyncGate.getSnapshot();
    realtimeSubscriptionSyncPromise = snap.in_flight ? Promise.resolve(result) : null;
    lastRealtimeSubscriptionSyncAt = snap.last_run_at || lastRealtimeSubscriptionSyncAt;
    return result;
  }

  const now = Date.now();
  if (realtimeSubscriptionSyncPromise) return realtimeSubscriptionSyncPromise;
  if (now - lastRealtimeSubscriptionSyncAt < REALTIME_SUBSCRIPTION_SYNC_COOLDOWN_MS) return;
  lastRealtimeSubscriptionSyncAt = now;
  realtimeSubscriptionSyncPromise = runSync();
  try {
    await realtimeSubscriptionSyncPromise;
  } finally {
    realtimeSubscriptionSyncPromise = null;
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
  const isDmContext = activeMode === "dm" && !!activeDmConversationId;
  const url = isDmContext
    ? `/dms/${activeDmConversationId}/messages/${messagePublicId}`
    : `/messages/${messagePublicId}`;
  let res;
  try {
    res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    res = null;
  }
  const shouldFallbackToPost = !res || [403, 405, 501].includes(res.status);
  if (shouldFallbackToPost) {
    const fallbackUrl = isDmContext
      ? `/dms/${activeDmConversationId}/messages/${messagePublicId}/delete`
      : `/messages/${messagePublicId}/delete`;
    res = await fetch(fallbackUrl, {
      method: "POST",
      credentials: "include",
    });
  }
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

async function pinMessageByPublicId(messagePublicId) {
  const res = await fetch(`/messages/${messagePublicId}/pin`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to pin message";
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

async function unpinMessageByPublicId(messagePublicId) {
  const res = await fetch(`/messages/${messagePublicId}/pin`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to unpin message";
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

async function fetchPinnedMessages(channelPublicId, limit = 80) {
  const res = await fetch(`/messages/channel/${channelPublicId}/pins?limit=${Math.max(1, Math.min(200, Number(limit) || 80))}`, {
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to load pinned messages";
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

function focusRenderedMessage(messagePublicId) {
  if (!messagesPanel || !messagePublicId) return false;
  let target = null;
  try {
    const safeId = typeof CSS !== "undefined" && CSS.escape
      ? CSS.escape(String(messagePublicId))
      : String(messagePublicId).replace(/["\\]/g, "\\$&");
    target = messagesPanel.querySelector(`.message[data-message-id="${safeId}"]`);
  } catch {
    target = null;
  }
  if (!target) return false;
  try {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch {
    target.scrollIntoView();
  }
  target.classList.remove("message-jump-flash");
  void target.offsetWidth;
  target.classList.add("message-jump-flash");
  setTimeout(() => target.classList.remove("message-jump-flash"), 1350);
  return true;
}

function findRenderedMessageElement(messagePublicId) {
  if (!messagesPanel || !messagePublicId) return null;
  try {
    const safeId = typeof CSS !== "undefined" && CSS.escape
      ? CSS.escape(String(messagePublicId))
      : String(messagePublicId).replace(/["\\]/g, "\\$&");
    return messagesPanel.querySelector(`.message[data-message-id="${safeId}"]`);
  } catch {
    return null;
  }
}

function appendRealtimeMessageToPanel(message, options = {}) {
  if (!messagesPanel || !message?.public_id) return false;
  if (findRenderedMessageElement(message.public_id)) return false;
  const context = options.context || "channel";
  const nearBottom = options.nearBottom !== false;
  const mode = options.mode || "server";
  const contextId = options.contextId || null;
  const placeholder = messagesPanel.querySelector(".message-placeholder");
  if (placeholder) placeholder.remove();
  messagesPanel.appendChild(buildMessageElement(message, { context }));
  const latest = message;
  if (mode === "dm") cacheLatestMessageId("dm", contextId, latest);
  else cacheLatestMessageId("server", contextId, latest);
  if (nearBottom) {
    scrollMessagesToBottom();
    setJumpUnreadVisible(false);
  } else {
    setJumpUnreadVisible(true);
  }
  const paging = getHistoryPaging(mode, contextId);
  if (paging) paging.offset += 1;
  return true;
}

function renderPinnedMessagesModal(rows) {
  if (!pinsModalList) return;
  pinsModalList.innerHTML = "";
  const list = Array.isArray(rows) ? rows : [];
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "pins-modal-empty";
    empty.textContent = "No pinned messages in this channel.";
    pinsModalList.appendChild(empty);
    return;
  }
  list.forEach((msg) => {
    const item = document.createElement("div");
    item.className = "pins-modal-item";

    const header = document.createElement("div");
    header.className = "pins-modal-item-header";
    const author = document.createElement("span");
    author.className = "pins-modal-item-author";
    const pinnedRole = formatServerRoleLabel(msg.server_role);
    author.textContent = pinnedRole ? `${msg.username || "Unknown"} (${pinnedRole})` : (msg.username || "Unknown");
    const time = document.createElement("span");
    time.className = "pins-modal-item-time";
    time.textContent = formatTimestamp(msg.created_at) || "";
    header.appendChild(author);
    header.appendChild(time);

    const body = document.createElement("div");
    body.className = "pins-modal-item-content";
    const raw = String(msg.content || "").trim();
    body.textContent = raw.length > 280 ? `${raw.slice(0, 280)}...` : raw || "(empty)";

    const actions = document.createElement("div");
    actions.className = "pins-modal-item-actions";
    const jumpBtn = document.createElement("button");
    jumpBtn.type = "button";
    jumpBtn.className = "topbar-btn";
    jumpBtn.textContent = "Jump";
    jumpBtn.addEventListener("click", async () => {
      closeModal(pinsModal);
      if (!focusRenderedMessage(msg.public_id)) {
        await loadMessages(activeChannelId, false);
        if (!focusRenderedMessage(msg.public_id)) {
          showToast("Pinned message not currently loaded. Try Search.");
        }
      }
    });
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "topbar-btn";
    copyBtn.textContent = "Copy Link";
    copyBtn.addEventListener("click", async () => {
      const href = `${window.location.origin}${window.location.pathname}#channel=${encodeURIComponent(activeChannelId || "")}&message=${encodeURIComponent(msg.public_id || "")}`;
      try {
        await navigator.clipboard.writeText(href);
        showToast("Pinned message link copied");
      } catch {}
    });
    actions.appendChild(jumpBtn);
    actions.appendChild(copyBtn);

    item.appendChild(header);
    item.appendChild(body);
    item.appendChild(actions);
    pinsModalList.appendChild(item);
  });
}

async function openPinnedMessagesModal() {
  if (activeMode !== "server" || !activeChannelId) return;
  if (activeChannelType === "voice" || activeChannelType === "notes") return;
  if (!pinsModal || !pinsModalList) return;
  pinsModalList.innerHTML = '<div class="pins-modal-empty">Loading pinned messages...</div>';
  openModal(pinsModal);
  try {
    const rows = await fetchPinnedMessages(activeChannelId);
    renderPinnedMessagesModal(rows);
  } catch (err) {
    pinsModalList.innerHTML = "";
    const empty = document.createElement("div");
    empty.className = "pins-modal-empty";
    empty.textContent = err?.message || "Failed to load pinned messages.";
    pinsModalList.appendChild(empty);
  }
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
  const roleByUserId = new Map();
  (Array.isArray(members) ? members : []).forEach((member) => {
    const trimmed = (member.nickname || "").trim();
    if (trimmed) byUserId.set(Number(member.user_id), trimmed);
    const roleRaw = String(member.role || "").trim().toLowerCase();
    if (roleRaw) roleByUserId.set(Number(member.user_id), roleRaw);
  });
  serverNicknamesByServer.set(serverPublicId, byUserId);
  serverRolesByServer.set(serverPublicId, roleByUserId);
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

async function patchServerUploadLimit(serverPublicId, maxUploadSizeMb) {
  const res = await fetch(`/servers/${serverPublicId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ max_upload_size_mb: maxUploadSizeMb }),
  });
  if (!res.ok) {
    let detail = "Failed to update upload limit";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchServerByPublicId(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load server";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchServerUploadDiagnostics(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}/upload-diagnostics`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load upload diagnostics";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchServerActivity(serverPublicId) {
  const res = await fetch(`/servers/${serverPublicId}/activity?limit=120`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load server activity";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

function formatBytes(bytes) {
  const n = Number(bytes || 0);
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = n;
  let idx = 0;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx += 1;
  }
  return `${value.toFixed(value >= 100 || idx === 0 ? 0 : 1)} ${units[idx]}`;
}

function renderServerUploadDiagnostics(data) {
  if (!serverUploadDiagnosticsList) return;
  const payload = data && typeof data === "object" ? data : {};
  const rows = [
    ["Server Upload Limit", payload.max_upload_size_mb ? `${payload.max_upload_size_mb} MB` : "Unlimited"],
    ["Active Upload Sessions", String(Number(payload.active_upload_sessions || 0))],
    ["Pending Upload Bytes", formatBytes(payload.pending_upload_bytes)],
    ["Uploads (24h)", String(Number(payload.uploads_24h_count || 0))],
    ["Uploaded (24h)", formatBytes(payload.uploads_24h_bytes)],
  ];
  serverUploadDiagnosticsList.innerHTML = "";
  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "server-diagnostic-row";
    row.innerHTML = `<strong>${label}:</strong> ${value}`;
    serverUploadDiagnosticsList.appendChild(row);
  });
}

function renderServerActivity(rows) {
  if (!serverSettingsActivityList) return;
  serverSettingsActivityList.innerHTML = "";
  const list = Array.isArray(rows) ? rows : [];
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "message-placeholder";
    empty.textContent = "No recent server activity.";
    serverSettingsActivityList.appendChild(empty);
    return;
  }
  list.forEach((row) => {
    const item = document.createElement("div");
    item.className = "server-activity-row";
    const title = document.createElement("div");
    title.className = "server-activity-title";
    title.textContent = String(row?.event_type || "unknown").replaceAll("_", " ");
    const meta = document.createElement("div");
    meta.className = "server-activity-meta";
    meta.textContent = `${formatTimestamp(row?.ts) || row?.ts || "-"} - actor: ${row?.actor_public_id || "system"}`;
    item.appendChild(title);
    item.appendChild(meta);
    serverSettingsActivityList.appendChild(item);
  });
}

async function createServerRole(serverPublicId, roleName) {
  const res = await fetch(`/servers/${serverPublicId}/roles`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(roleName || "").trim().toLowerCase(),
      can_manage_server: false,
      can_manage_channels: false,
      can_manage_members: false,
      can_manage_roles: false,
      can_moderate_messages: false,
    }),
  });
  if (!res.ok) {
    let detail = "Failed to create role";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function patchServerRole(serverPublicId, rolePublicId, payload) {
  const res = await fetch(`/servers/${serverPublicId}/roles/${rolePublicId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  if (!res.ok) {
    let detail = "Failed to update role";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

function renderServerSettingsRoles(roles) {
  if (!serverSettingsRolesList) return;
  serverSettingsRolesList.innerHTML = "";
  const roleRows = Array.isArray(roles) ? roles : [];
  if (!roleRows.length) {
    const empty = document.createElement("div");
    empty.className = "message-placeholder";
    empty.textContent = "No roles found.";
    serverSettingsRolesList.appendChild(empty);
    return;
  }
  const pickerWrap = document.createElement("div");
  pickerWrap.className = "server-role-picker-row";

  const pickerLabel = document.createElement("label");
  pickerLabel.textContent = "Role";
  pickerLabel.setAttribute("for", "server-role-picker-select");

  const pickerSelect = document.createElement("select");
  pickerSelect.id = "server-role-picker-select";
  pickerSelect.className = "member-role-select";
  roleRows.forEach((role, idx) => {
    const option = document.createElement("option");
    option.value = role.public_id;
    option.textContent = role.name || `role-${idx + 1}`;
    pickerSelect.appendChild(option);
  });

  pickerWrap.appendChild(pickerLabel);
  pickerWrap.appendChild(pickerSelect);
  serverSettingsRolesList.appendChild(pickerWrap);

  const editorHost = document.createElement("div");
  editorHost.className = "server-role-editor-host";
  serverSettingsRolesList.appendChild(editorHost);

  const renderSelectedRoleEditor = () => {
    const selectedId = String(pickerSelect.value || "");
    const role = roleRows.find((row) => String(row.public_id || "") === selectedId) || roleRows[0];
    editorHost.innerHTML = "";
    if (!role) return;

    const card = document.createElement("div");
    card.className = "server-role-card";

    const head = document.createElement("div");
    head.className = "server-role-card-head";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = 30;
    nameInput.value = role.name || "";
    nameInput.placeholder = "Role name";
    const locked = String(role.name || "").toLowerCase() === "owner";
    if (locked) nameInput.disabled = true;

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "server-role-save-btn";
    saveBtn.textContent = "Save";
    if (locked) saveBtn.disabled = true;

    head.appendChild(nameInput);
    head.appendChild(saveBtn);
    card.appendChild(head);

    const liveNamePreview = document.createElement("div");
    liveNamePreview.className = "server-activity-meta";
    const syncRoleNamePreview = () => {
      const typed = String(nameInput.value || "").trim().toLowerCase();
      liveNamePreview.textContent = `Live role name: ${typed || "(empty)"}`;
    };
    syncRoleNamePreview();
    if (!locked) {
      nameInput.addEventListener("input", syncRoleNamePreview);
    }
    card.appendChild(liveNamePreview);

    const permsWrap = document.createElement("div");
    permsWrap.className = "server-role-perms";
    const permDefs = [
      ["can_manage_server", "Manage Server"],
      ["can_manage_channels", "Manage Channels"],
      ["can_manage_members", "Manage Members"],
      ["can_manage_roles", "Manage Roles"],
      ["can_moderate_messages", "Moderate Messages"],
    ];
    const permInputs = new Map();
    permDefs.forEach(([key, label]) => {
      const row = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = Boolean(role[key]);
      if (locked) input.disabled = true;
      const text = document.createElement("span");
      text.textContent = label;
      row.appendChild(input);
      row.appendChild(text);
      permsWrap.appendChild(row);
      permInputs.set(key, input);
    });
    card.appendChild(permsWrap);

    saveBtn.addEventListener("click", async () => {
      try {
        await patchServerRole(activeServerId, role.public_id, {
          name: String(nameInput.value || "").trim().toLowerCase(),
          can_manage_server: Boolean(permInputs.get("can_manage_server")?.checked),
          can_manage_channels: Boolean(permInputs.get("can_manage_channels")?.checked),
          can_manage_members: Boolean(permInputs.get("can_manage_members")?.checked),
          can_manage_roles: Boolean(permInputs.get("can_manage_roles")?.checked),
          can_moderate_messages: Boolean(permInputs.get("can_moderate_messages")?.checked),
        });
        await loadServerSettingsModal();
      } catch (err) {
        alert(err.message || "Failed to update role");
      }
    });

    editorHost.appendChild(card);
  };

  pickerSelect.addEventListener("change", renderSelectedRoleEditor);
  renderSelectedRoleEditor();
  enhanceCustomSelects(serverSettingsRolesList);
  syncCustomSelects(serverSettingsRolesList);
}

async function loadServerSettingsModal() {
  if (!activeServerId) throw new Error("Select a server first.");
  const [server, members, roles] = await Promise.all([
    fetchServerByPublicId(activeServerId),
    fetchServerMembers(activeServerId),
    fetchServerRoles(activeServerId),
  ]);
  const [diagnosticsResult, activityResult] = await Promise.allSettled([
    fetchServerUploadDiagnostics(activeServerId),
    fetchServerActivity(activeServerId),
  ]);
  cacheServerNicknames(activeServerId, members);

  if (serverSettingsNameLabel) serverSettingsNameLabel.textContent = server?.name || "Server";
  if (serverSettingsPublicId) serverSettingsPublicId.textContent = server?.public_id || "-";
  if (serverSettingsMemberCount) serverSettingsMemberCount.textContent = String(Array.isArray(members) ? members.length : 0);
  if (serverSettingsNameInput) serverSettingsNameInput.value = String(server?.name || "");
  if (serverSettingsUploadLimitInput) serverSettingsUploadLimitInput.value = String(Number(server?.max_upload_size_mb || 0));
  if (serverSettingsLogRetentionInput) serverSettingsLogRetentionInput.value = String(Number.isFinite(Number(server?.log_retention_days)) ? Number(server.log_retention_days) : 30);
  if (serverSettingsMessageRetentionInput) serverSettingsMessageRetentionInput.value = String(Number.isFinite(Number(server?.message_retention_days)) ? Number(server.message_retention_days) : -1);
  if (serverSettingsStripMetadataInput) serverSettingsStripMetadataInput.checked = Boolean(server?.strip_upload_metadata);
  if (serverSettingsAutomodEnabled) serverSettingsAutomodEnabled.checked = Boolean(server?.automod_enabled);
  if (serverSettingsAutomodBlockLinks) serverSettingsAutomodBlockLinks.checked = Boolean(server?.automod_block_external_links);
  if (serverSettingsAutomodBlockInvites) serverSettingsAutomodBlockInvites.checked = Boolean(server?.automod_block_invite_links);
  if (serverSettingsAutomodTerms) serverSettingsAutomodTerms.value = String(server?.automod_blocked_terms || "");
  if (serverSettingsAutomodExtensions) serverSettingsAutomodExtensions.value = String(server?.automod_blocked_extensions || "");

  renderServerSettingsRoles(roles);
  renderServerUploadDiagnostics(diagnosticsResult.status === "fulfilled" ? diagnosticsResult.value : {});
  renderServerActivity(activityResult.status === "fulfilled" ? activityResult.value : []);
  applySettingsTooltips(serverSettingsModal || document);
}

function setUploadProgress(visible, pct = 0, label = "") {
  if (!uploadProgressRow || !uploadProgressFill || !uploadProgressText) return;
  uploadProgressRow.classList.toggle("hidden", !visible);
  const clamped = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
  uploadProgressFill.style.width = `${clamped}%`;
  uploadProgressText.textContent = label || (visible ? `Uploading... ${clamped}%` : "");
}

async function uploadMessageAttachment(file, channelPublicId, onProgress = null) {
  const safeType = file?.type || "application/octet-stream";
  const totalSize = Number(file?.size || 0);
  let uploadId = null;
  try {
    const initRes = await fetch(`/api/uploads/message-file/init?channel_public_id=${encodeURIComponent(channelPublicId)}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file?.name || "attachment",
        content_type: safeType,
        total_size: totalSize,
      }),
    });
    const initPayload = await initRes.json().catch(() => ({}));
    if (!initRes.ok) throw new Error(initPayload?.detail || "Failed to start upload");
    uploadId = String(initPayload?.upload_id || "");
    if (!uploadId) throw new Error("Upload session was not created");
    const chunkSize = Math.max(512 * 1024, Number(initPayload?.chunk_size || 2 * 1024 * 1024));
    let loaded = 0;
    let index = 0;

    if (totalSize <= 0) {
      throw new Error("Empty files are not allowed");
    }

    while (loaded < totalSize) {
      const next = Math.min(totalSize, loaded + chunkSize);
      const chunk = file.slice(loaded, next);
      let chunkDone = false;
      let chunkErr = null;
      for (let attempt = 0; attempt < 4 && !chunkDone; attempt += 1) {
        try {
          const chunkRes = await fetch(
            `/api/uploads/message-file/chunk?upload_id=${encodeURIComponent(uploadId)}&index=${index}`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/octet-stream" },
              body: chunk,
            },
          );
          const chunkPayload = await chunkRes.json().catch(() => ({}));
          if (!chunkRes.ok) throw new Error(chunkPayload?.detail || "Failed to upload chunk");
          chunkDone = true;
          chunkErr = null;
          break;
        } catch (err) {
          chunkErr = err;
          if (attempt >= 3) break;
          // Brief backoff for flaky WAN hops.
          await new Promise((r) => setTimeout(r, 350 * (attempt + 1)));
        }
      }
      if (!chunkDone) throw (chunkErr || new Error("Failed to upload chunk"));
      loaded = next;
      index += 1;
      const pct = Math.max(0, Math.min(100, (loaded / totalSize) * 100));
      if (typeof onProgress === "function") onProgress(pct, loaded, totalSize, true);
    }

    const completeRes = await fetch(`/api/uploads/message-file/complete?upload_id=${encodeURIComponent(uploadId)}`, {
      method: "POST",
      credentials: "include",
    });
    const completePayload = await completeRes.json().catch(() => ({}));
    if (!completeRes.ok) throw new Error(completePayload?.detail || "Failed to finalize upload");
    return completePayload;
  } catch (err) {
    if (uploadId) {
      fetch(`/api/uploads/message-file/abort?upload_id=${encodeURIComponent(uploadId)}`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    }
    throw err;
  }
}

async function uploadUserAvatar(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/users/me/avatar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    let detail = "Failed to upload avatar";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
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
  resetInviteFriendSelection();
  ensureInviteFriendPickerDom();
  populateInviteFriendPicker().catch((err) => {
    console.error("Failed to load friends for invite picker:", err);
    renderInviteFriendList([], { error: "Could not load friends" });
    if (submitInviteMemberBtn) submitInviteMemberBtn.disabled = true;
  });
  openModal(inviteMemberModal);
}

function ensureInviteFriendPickerDom() {
  if (!inviteMemberModal) return;
  const modalContent = inviteMemberModal.querySelector(".modal-content");
  if (!modalContent) return;

  inviteFriendPickerEl = document.getElementById("invite-friend-picker") || inviteFriendPickerEl;
  inviteFriendSearchInput = document.getElementById("invite-friend-search-input") || inviteFriendSearchInput;
  inviteFriendListEl = document.getElementById("invite-friend-list") || inviteFriendListEl;

  if (!inviteFriendPickerEl) {
    inviteFriendPickerEl = document.createElement("div");
    inviteFriendPickerEl.id = "invite-friend-picker";
    inviteFriendPickerEl.className = "invite-friend-picker";

    inviteFriendSearchInput = document.createElement("input");
    inviteFriendSearchInput.type = "text";
    inviteFriendSearchInput.id = "invite-friend-search-input";
    inviteFriendSearchInput.placeholder = "Search friends...";

    inviteFriendListEl = document.createElement("div");
    inviteFriendListEl.id = "invite-friend-list";
    inviteFriendListEl.className = "invite-friend-list";
    inviteFriendListEl.setAttribute("role", "listbox");
    inviteFriendListEl.setAttribute("aria-label", "Friends to invite");

    inviteFriendPickerEl.appendChild(inviteFriendSearchInput);
    inviteFriendPickerEl.appendChild(inviteFriendListEl);

    const subtitle = modalContent.querySelector(".settings-subtitle");
    if (subtitle) modalContent.insertBefore(inviteFriendPickerEl, subtitle);
    else if (submitInviteMemberBtn) modalContent.insertBefore(inviteFriendPickerEl, submitInviteMemberBtn);
    else modalContent.appendChild(inviteFriendPickerEl);
  }

  if (inviteUserPublicIdInput) {
    inviteUserPublicIdInput.hidden = true;
    inviteUserPublicIdInput.style.display = "none";
  }

  if (inviteFriendSearchInput && !inviteFriendSearchInput.dataset.boundInviteSearch) {
    inviteFriendSearchInput.dataset.boundInviteSearch = "1";
    inviteFriendSearchInput.addEventListener("input", () => {
      inviteFriendSearchQuery = inviteFriendSearchInput?.value || "";
      renderInviteFriendList(Array.isArray(friendsCache) ? friendsCache : []);
    });
  }
}

function resetInviteFriendSelection() {
  inviteSelectedFriendPublicId = "";
  inviteFriendSearchQuery = "";
  if (inviteUserPublicIdInput) inviteUserPublicIdInput.value = "";
  if (inviteFriendSearchInput) inviteFriendSearchInput.value = "";
  if (submitInviteMemberBtn) submitInviteMemberBtn.disabled = true;
}

function getFriendInviteCode(friend) {
  const username = String(friend?.username || "friend");
  const compactId = String(friend?.public_id || "").replace(/-/g, "");
  const code = compactId.slice(0, 4);
  return code ? `${username}:${code}` : username;
}

function selectInviteFriend(friend) {
  inviteSelectedFriendPublicId = String(friend?.public_id || "");
  if (inviteUserPublicIdInput) inviteUserPublicIdInput.value = inviteSelectedFriendPublicId;
  if (submitInviteMemberBtn) submitInviteMemberBtn.disabled = !inviteSelectedFriendPublicId;
  renderInviteFriendList(Array.isArray(friendsCache) ? friendsCache : []);
}

function renderInviteFriendList(rows, options = {}) {
  ensureInviteFriendPickerDom();
  if (!inviteFriendListEl) return;
  const allRows = Array.isArray(rows) ? rows : [];
  const q = String(inviteFriendSearchQuery || "").trim().toLowerCase();
  const normalized = allRows
    .filter((friend) => friend && friend.public_id && friend.username)
    .slice()
    .sort((a, b) => String(a.username || "").localeCompare(String(b.username || "")));
  const filtered = q
    ? normalized.filter((friend) => {
        const username = String(friend.username || "").toLowerCase();
        const code = getFriendInviteCode(friend).toLowerCase();
        return username.includes(q) || code.includes(q);
      })
    : normalized;

  inviteFriendListEl.innerHTML = "";

  const empty = document.createElement("div");
  empty.className = "invite-friend-list-empty";
  if (options.error) {
    empty.textContent = options.error;
    inviteFriendListEl.appendChild(empty);
    return;
  }
  if (!normalized.length) {
    empty.textContent = "No friends available";
    inviteFriendListEl.appendChild(empty);
    return;
  }
  if (!filtered.length) {
    empty.textContent = "No matching friends";
    inviteFriendListEl.appendChild(empty);
    return;
  }

  filtered.forEach((friend) => {
    const rowBtn = document.createElement("button");
    rowBtn.type = "button";
    rowBtn.className = "invite-friend-row";
    const isSelected = String(friend.public_id) === inviteSelectedFriendPublicId;
    rowBtn.classList.toggle("active", isSelected);
    rowBtn.setAttribute("role", "option");
    rowBtn.setAttribute("aria-selected", isSelected ? "true" : "false");

    const nameEl = document.createElement("span");
    nameEl.className = "invite-friend-row-name";
    nameEl.textContent = String(friend.username || "Friend");

    const codeEl = document.createElement("span");
    codeEl.className = "invite-friend-row-code";
    codeEl.textContent = getFriendInviteCode(friend);

    rowBtn.appendChild(nameEl);
    rowBtn.appendChild(codeEl);
    rowBtn.addEventListener("click", () => selectInviteFriend(friend));
    inviteFriendListEl.appendChild(rowBtn);
  });
}

async function populateInviteFriendPicker() {
  ensureInviteFriendPickerDom();
  if (!inviteUserPublicIdInput) return;
  let rows = Array.isArray(friendsCache) ? friendsCache : [];
  if (rows.length === 0) {
    rows = await fetchFriends();
    friendsCache = Array.isArray(rows) ? rows : [];
    rows = friendsCache;
  }
  inviteUserPublicIdInput.value = "";
  renderInviteFriendList(rows);
  if (submitInviteMemberBtn) submitInviteMemberBtn.disabled = rows.length === 0;
  if (inviteFriendSearchInput) inviteFriendSearchInput.focus();
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

function getServerRole(serverPublicId, userId) {
  const byUserId = serverRolesByServer.get(serverPublicId);
  if (!byUserId) return "";
  const role = byUserId.get(Number(userId));
  return typeof role === "string" ? role : "";
}

function formatServerRoleLabel(roleName) {
  const raw = String(roleName || "").trim();
  if (!raw) return "";
  return raw
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getDisplayMessageAuthor(msg) {
  if (activeMode !== "server" || !activeServerId) {
    return { name: msg.username || "Unknown", isNickname: false, role: "" };
  }
  const nickname = getServerNickname(activeServerId, msg.user_id);
  const role = String(msg.server_role || "").trim().toLowerCase() || getServerRole(activeServerId, msg.user_id);
  if (nickname) return { name: nickname, isNickname: true, role };
  return { name: msg.username || "Unknown", isNickname: false, role };
}

function buildMessageElement(msg, options = {}) {
  const context = options.context || "channel";
  const isThreadContext = context === "thread";
  const isServerMessage = activeMode === "server";
  const wrapper = document.createElement("div");
  const avatar = document.createElement("img");
  const main = document.createElement("div");
  const header = document.createElement("div");
  const author = document.createElement("span");
  const content = document.createElement("span");

  wrapper.classList.add("message");
  wrapper.dataset.messageId = msg.public_id;
  wrapper.title = `Sent: ${formatTimestamp(msg.created_at) || "Unknown time"}`;
  avatar.classList.add("message-user-avatar");
  bindUserAvatarImage(avatar, msg.user_public_id, { alt: `${msg.username || "User"} avatar` });
  attachPublicUserProfileTrigger(avatar, msg.user_public_id);
  main.classList.add("message-main");
  header.classList.add("message-header");
  author.classList.add("message-author");
  content.classList.add("message-content");

  if (msg.parent_message_public_id && !isThreadContext) {
    const replyContext = document.createElement("span");
    replyContext.classList.add("message-reply-context");
    replyContext.textContent = `Reply to ${msg.parent_message_public_id.slice(0, 8)}...`;
    main.appendChild(replyContext);
  }

  const displayAuthor = getDisplayMessageAuthor(msg);
  const nameEmoji = normalizeNameEmojiInput(msg.name_emoji || "");
  author.textContent = `${nameEmoji ? `${nameEmoji} ` : ""}${displayAuthor.name}:`;
  const nameColor = normalizeHexColor(msg.username_color || "");
  if (nameColor) author.style.color = nameColor;
  if (displayAuthor.isNickname && msg.username) {
    author.title = `@${msg.username}`;
  }
  attachPublicUserProfileTrigger(author, msg.user_public_id);
  const roleLabel = formatServerRoleLabel(displayAuthor.role);
  const mentionState = getMentionHighlightState(msg.content || "");
  if (mentionState.everyone) wrapper.classList.add("mentioned-everyone");
  if (mentionState.user) wrapper.classList.add("mentioned-user");
  content.innerHTML = applyMentionHighlightsToRenderedHtml(
    renderMarkdown(msg.content || "", { enableWikiLinks: activeChannelType === "notes" })
  );
  const rollData = parseRollMessage(msg.content || "");

  wrapper.appendChild(avatar);
  main.appendChild(header);
  header.appendChild(author);
  if (roleLabel && context !== "dm") {
    const roleBadge = document.createElement("span");
    roleBadge.className = "message-role-badge";
    roleBadge.textContent = roleLabel;
    header.appendChild(roleBadge);
  }
  main.appendChild(content);
  if (isServerMessage && rollData && rollAnimationsEnabled) {
    const rollEl = buildRollAnimationElement(rollData);
    if (rollEl) main.appendChild(rollEl);
  }

  const meta = document.createElement("span");
  meta.classList.add("message-meta");

  const timeBadge = document.createElement("span");
  timeBadge.classList.add("message-time");
  timeBadge.textContent = formatTimestamp(msg.created_at) || "Unknown time";
  meta.appendChild(timeBadge);

  if (msg.is_pinned) {
    const pinnedLabel = document.createElement("span");
    pinnedLabel.classList.add("message-pinned-badge");
    pinnedLabel.textContent = "Pinned";
    meta.appendChild(pinnedLabel);
  }

  if (msg.edited_at) {
    const editedLabel = document.createElement("span");
    editedLabel.classList.add("message-edited");
    editedLabel.textContent = "edited";
    meta.appendChild(editedLabel);
  }

  header.appendChild(meta);
  wrapper.appendChild(main);

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
    main.appendChild(reactionsEl);
  }

  if (isServerMessage && msg.thread_reply_count > 0 && !isThreadContext) {
    const threadSummary = document.createElement("div");
    threadSummary.classList.add("message-thread-summary");
    threadSummary.textContent = `${msg.thread_reply_count} repl${msg.thread_reply_count === 1 ? "y" : "ies"}`;
    main.appendChild(threadSummary);
  }

  if (isServerMessage || msg.user_id === currentUserId) {
    const actions = document.createElement("div");
    actions.classList.add("message-actions");
    let openMessageReactionMenu = null;
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
      openMessageReactionMenu = (anchorEl) => {
        const existing = (anchorEl || wrapper).querySelector?.(".message-emoji-picker");
        if (existing) {
          closeActiveReactionPicker();
          return;
        }
        openReactionPicker(anchorEl || wrapper, async (emoji) => {
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
      };
      reactBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        openMessageReactionMenu(reactBtn);
      });
      actions.appendChild(reactBtn);

      if (!isThreadContext) {
        const pinBtn = document.createElement("button");
        pinBtn.classList.add("message-action-btn");
        pinBtn.type = "button";
        pinBtn.textContent = msg.is_pinned ? "Unpin" : "Pin";
        pinBtn.addEventListener("click", async () => {
          try {
            if (msg.is_pinned) await unpinMessageByPublicId(msg.public_id);
            else await pinMessageByPublicId(msg.public_id);
            if (isThreadContext) {
              await loadThreadMessages(false);
            } else if (activeChannelId) {
              await loadMessages(activeChannelId, false);
            }
          } catch (err) {
            alert(err.message || "Failed to update pin");
          }
        });
        actions.appendChild(pinBtn);
      }

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

    if (msg.user_id === currentUserId && !isThreadContext) {
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("message-action-btn", "danger");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      actions.appendChild(deleteBtn);

      if (isServerMessage) {
        const editBtn = document.createElement("button");
        editBtn.classList.add("message-action-btn");
        editBtn.type = "button";
        editBtn.textContent = "Edit";
        actions.insertBefore(editBtn, deleteBtn);

        editBtn.addEventListener("click", () => {
          if (wrapper.classList.contains("editing")) return;
          closeActiveReactionPicker();
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
          main.appendChild(editor);
          input.focus();
          try {
            input.setSelectionRange(input.value.length, input.value.length);
            input.style.height = "auto";
            input.style.height = `${Math.min(280, Math.max(84, input.scrollHeight))}px`;
          } catch {}

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
          input.addEventListener("input", () => {
            input.style.height = "auto";
            input.style.height = `${Math.min(280, Math.max(84, input.scrollHeight))}px`;
          });
          input.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              cancelBtn.click();
              return;
            }
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
              event.preventDefault();
              saveBtn.click();
            }
          });
        });
      }

      deleteBtn.addEventListener("click", async () => {
        const ok = window.confirm("Delete this message?");
        if (!ok) return;
        try {
          await deleteMessageByPublicId(msg.public_id);
          if (activeMode === "dm" && activeDmConversationId) {
            await loadDmMessages(activeDmConversationId, false);
          } else if (activeChannelId) {
            await loadMessages(activeChannelId, false);
          }
        } catch (err) {
          alert(err.message || "Failed to delete message");
        }
      });
    }

    if (actions.children.length > 0) {
      wrapper.addEventListener("contextmenu", (event) => {
        if (event.target.closest(".message-emoji-picker")) return;
        event.preventDefault();
        event.stopPropagation();
        const items = [...actions.querySelectorAll(".message-action-btn")].map((btn) => ({
          label: btn.textContent || "Action",
          danger: btn.classList.contains("danger"),
          onClick: () => {
            if ((btn.textContent || "").trim() === "React" && typeof openMessageReactionMenu === "function") {
              openMessageReactionMenu(wrapper);
              return;
            }
            btn.click();
          },
        }));
        if (!items.length) return;
        showContextMenu(event.clientX, event.clientY, items);
      });
    }
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
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

async function createServerCategory(serverPublicId, name) {
  const res = await fetch(`/channels/server/${serverPublicId}/categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    let detail = "Failed to create category";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchServerCategories(serverPublicId) {
  const res = await fetch(`/channels/server/${serverPublicId}/categories`, { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load categories";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchDiscordOauthSession() {
  const res = await fetch("/discord/oauth/session", { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load Discord session: ${res.status}`);
  return res.json();
}

async function fetchDiscordOauthGuilds() {
  const res = await fetch("/discord/oauth/guilds", { credentials: "include" });
  if (!res.ok) {
    let detail = "Failed to load Discord servers";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function runDiscordOauthImport(payload) {
  const res = await fetch("/discord/oauth/import-layout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = "Discord import failed";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function disconnectDiscordOauthSession() {
  const res = await fetch("/discord/oauth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    let detail = "Failed to disconnect Discord session";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function fetchDiscordOauthSettings() {
  const res = await fetch("/users/me/discord-oauth-settings", { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load Discord OAuth settings: ${res.status}`);
  return res.json();
}

async function saveDiscordOauthSettings(payload) {
  const res = await fetch("/users/me/discord-oauth-settings", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = "Failed to save Discord OAuth settings";
    try {
      const data = await res.json();
      if (data?.detail) detail = data.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

async function refreshDiscordImportModalState() {
  if (!discordSessionStatus || !discordGuildSelect) return;
  discordSessionStatus.textContent = "Checking connection...";
  discordGuildSelect.innerHTML = '<option value="">Select Discord server...</option>';
  try {
    const oauthSettings = await fetchDiscordOauthSettings();
    if (discordOauthClientIdInput) discordOauthClientIdInput.value = oauthSettings?.client_id || "";
    if (discordOauthRedirectUriInput) discordOauthRedirectUriInput.value = oauthSettings?.redirect_uri || "";
    if (discordOauthClientSecretInput) discordOauthClientSecretInput.value = "";
    if (discordOauthClientSecretInput?.placeholder) {
      discordOauthClientSecretInput.placeholder = oauthSettings?.has_client_secret
        ? "Discord OAuth Client Secret (saved; leave blank to keep)"
        : "Discord OAuth Client Secret";
    }
  } catch (err) {
    console.error("Failed to load per-user Discord OAuth settings:", err);
  }
  try {
    const session = await fetchDiscordOauthSession();
    if (!session?.connected) {
      discordSessionStatus.textContent = "Not connected";
      return;
    }
    discordSessionStatus.textContent = `Connected as ${session.username || session.discord_user_id || "Discord user"}`;
    const guilds = await fetchDiscordOauthGuilds();
    guilds
      .sort((a, b) => String(a.guild_name || "").localeCompare(String(b.guild_name || "")))
      .forEach((guild) => {
        const option = document.createElement("option");
        option.value = guild.guild_id;
        option.textContent = guild.owner ? `${guild.guild_name} (owner)` : guild.guild_name;
        discordGuildSelect.appendChild(option);
      });
  } catch (err) {
    discordSessionStatus.textContent = "Not connected";
    console.error("Discord OAuth modal refresh failed:", err);
  }
}

function normalizeServerLayoutBundle(raw) {
  const bundle = raw && typeof raw === "object" ? raw : {};
  const layoutTokens = Array.isArray(bundle.layout_tokens)
    ? bundle.layout_tokens.map((token) => String(token || "").trim()).filter(Boolean)
    : [];
  const separators = {};
  const sourceSeparators = bundle.separators && typeof bundle.separators === "object" ? bundle.separators : {};
  Object.entries(sourceSeparators).forEach(([key, value]) => {
    const id = String(key || "").trim();
    const label = String(value || "").trim();
    if (!id || !label) return;
    separators[id] = label;
  });
  const collapsed = {};
  const sourceCollapsed = bundle.collapsed && typeof bundle.collapsed === "object" ? bundle.collapsed : {};
  Object.entries(sourceCollapsed).forEach(([key, value]) => {
    const id = String(key || "").trim();
    if (!id) return;
    collapsed[id] = !!value;
  });
  return { layoutTokens, separators, collapsed };
}

function getServerLayoutState(serverPublicId) {
  if (!serverChannelLayouts.has(serverPublicId)) {
    serverChannelLayouts.set(serverPublicId, { layoutTokens: [], separators: {}, collapsed: {} });
  }
  return serverChannelLayouts.get(serverPublicId);
}

async function fetchServerLayoutState(serverPublicId) {
  const res = await fetch(`/channels/server/${serverPublicId}/layout`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to load server layout: ${res.status}`);
  const parsed = normalizeServerLayoutBundle(await res.json());
  serverChannelLayouts.set(serverPublicId, parsed);
  return parsed;
}

async function saveServerLayoutState(serverPublicId) {
  const state = getServerLayoutState(serverPublicId);
  const res = await fetch(`/channels/server/${serverPublicId}/layout`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      layout_tokens: state.layoutTokens,
      separators: state.separators,
      collapsed: state.collapsed,
    }),
  });
  if (!res.ok) throw new Error(`Failed to save server layout: ${res.status}`);
  const parsed = normalizeServerLayoutBundle(await res.json());
  serverChannelLayouts.set(serverPublicId, parsed);
  return parsed;
}

function queueSaveServerLayoutState(serverPublicId) {
  if (!serverPublicId) return;
  const existingTimer = serverLayoutSaveTimers.get(serverPublicId);
  if (existingTimer) window.clearTimeout(existingTimer);
  const timer = window.setTimeout(() => {
    serverLayoutSaveTimers.delete(serverPublicId);
    saveServerLayoutState(serverPublicId).catch((err) => {
      console.error("Failed to persist server layout:", err);
    });
  }, 180);
  serverLayoutSaveTimers.set(serverPublicId, timer);
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

function getChannelSeparatorCollapseStorageKey(serverId) {
  return `${CHANNEL_SEPARATOR_COLLAPSE_STORAGE_PREFIX}${serverId}`;
}

function getChannelIconsStorageKey(serverId) {
  return `${CHANNEL_ICON_STORAGE_PREFIX}${serverId}`;
}

function normalizeChannelIconEntry(entry) {
  if (!entry) return null;
  if (typeof entry === "string") {
    if (/^data:image\//i.test(entry)) return { type: "image", value: entry };
    const trimmed = entry.trim();
    if (!trimmed) return null;
    return { type: "text", value: trimmed.slice(0, 3) };
  }
  if (typeof entry !== "object") return null;
  const type = String(entry.type || "").trim().toLowerCase();
  const value = String(entry.value || "").trim();
  const glyphs = Array.from(value);
  if (!value) return null;
  if (type === "image" && /^data:image\//i.test(value)) return { type, value };
  if (type === "emoji") return { type, value: glyphs.slice(0, 1).join("") };
  if (type === "text") return { type, value: glyphs.slice(0, 3).join("").toUpperCase() };
  return null;
}

function setStoredChannelIcon(serverPublicId, channelPublicId, iconEntry) {
  if (!serverPublicId || !channelPublicId) return;
  const icons = getStoredObject(getChannelIconsStorageKey(serverPublicId), {});
  const normalized = normalizeChannelIconEntry(iconEntry);
  if (normalized) icons[channelPublicId] = normalized;
  else delete icons[channelPublicId];
  saveObject(getChannelIconsStorageKey(serverPublicId), icons);
}

function renderChannelPrefixIcon(channelPrefix, channel, customIconEntry) {
  if (!channelPrefix) return;
  channelPrefix.textContent = "";
  channelPrefix.innerHTML = "";
  const iconEntry = normalizeChannelIconEntry(customIconEntry);
  if (iconEntry?.type === "image") {
    const iconImg = document.createElement("img");
    iconImg.classList.add("channel-custom-icon");
    iconImg.alt = `${channel.name} icon`;
    iconImg.src = iconEntry.value;
    channelPrefix.appendChild(iconImg);
    return;
  }
  if (iconEntry?.type === "emoji" || iconEntry?.type === "text") {
    const iconBadge = document.createElement("span");
    iconBadge.className = "channel-custom-icon-text";
    iconBadge.textContent = iconEntry.value;
    if (iconEntry.type === "emoji") iconBadge.classList.add("emoji");
    channelPrefix.appendChild(iconBadge);
    return;
  }
  channelPrefix.textContent = channel.type === "voice"
    ? "[V]"
    : channel.type === "notes"
      ? "[N]"
      : channel.type === "battlemap"
        ? "[B]"
      : "#";
}

function getBattlemapStateStorageKey(channelId) {
  return `${BATTLEMAP_STATE_STORAGE_PREFIX}${channelId}`;
}

function persistChannelOrder() {
  if (!activeServerId) return;
  const layoutTokens = [...channelsPanel.querySelectorAll(".channel-item[data-layout-token]")]
    .map((el) => el.dataset.layoutToken)
    .filter((token) => String(token || "").startsWith("ch:"));
  const state = getServerLayoutState(activeServerId);
  state.layoutTokens = layoutTokens;
  serverChannelLayouts.set(activeServerId, state);
  queueSaveServerLayoutState(activeServerId);
  const channelIds = [...channelsPanel.querySelectorAll(".channel-item")].map((el) => el.dataset.channelId);
  saveOrder(getChannelOrderStorageKey(activeServerId), channelIds);
}

function getDisplayChannelName(channel) {
  const rawName = String(channel?.name || "").trim();
  const categoryName = String(channel?.category_name || "").trim();
  if (!rawName) return "";
  if (categoryName) {
    const escaped = categoryName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^\\s*${escaped}\\s*\\/\\s*(.+)\\s*$`, "i");
    const match = rawName.match(regex);
    if (match) {
      const trimmed = String(match[1] || "").trim();
      return trimmed || rawName;
    }
  }
  return rawName;
}

async function loadDmConversations() {
  const res = await fetch("/dms/", { credentials: "include" });
  if (!res.ok) {
    channelsPanel.innerHTML = '<li class="message-placeholder">Could not load DMs right now.</li>';
    throw new Error(`Failed to load DMs: ${res.status}`);
  }
  dmConversations = await res.json();
  dmConversations.sort((a, b) => {
    const aTs = Date.parse(String(a?.last_message_at || a?.created_at || 0)) || 0;
    const bTs = Date.parse(String(b?.last_message_at || b?.created_at || 0)) || 0;
    return bTs - aTs;
  });
  channelsPanel.innerHTML = "";
  dmConversations.forEach((dm) => {
    const li = document.createElement("li");
    li.classList.add("channel-item", "dm-item");
    li.dataset.dmConversationId = dm.public_id;
    li.dataset.dmOtherUserPublicId = dm.other_user_public_id;
    li.dataset.layoutToken = `dm:${dm.public_id}`;
    const nameEl = document.createElement("span");
    nameEl.classList.add("channel-name");
    const avatarEl = document.createElement("img");
    avatarEl.className = "dm-item-avatar";
    bindUserAvatarImage(avatarEl, dm.other_user_public_id, { alt: `${dm.other_username || "User"} avatar` });
    const presenceDot = document.createElement("span");
    presenceDot.className = "dm-presence-dot";
    const nameText = document.createElement("span");
    nameText.textContent = `@ ${dm.other_username}`;
    const statusText = document.createElement("span");
    statusText.className = "dm-item-status";
    hydrateUserStatusElement(statusText, dm.other_user_public_id, { prefix: "- ", emptyText: "", hiddenWhenEmpty: true });
    nameEl.appendChild(avatarEl);
    nameEl.appendChild(presenceDot);
    nameEl.appendChild(nameText);
    nameEl.appendChild(statusText);
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
    li.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showContextMenu(event.clientX, event.clientY, [
        {
          label: "Open DM",
          onClick: () => li.click(),
        },
        {
          label: "View Profile",
          onClick: () => {
            openPublicUserProfileModal(dm.other_user_public_id).catch((err) => {
              showToast(err?.message || "Failed to open user profile");
            });
          },
        },
      ]);
    });
    channelsPanel.appendChild(li);
  });
  highlightActiveChannel();
  applyDmPresenceIndicators();
  updateDmQuickButtonState();
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
  const res = await fetch(`/users/friends?_=${Date.now()}`, {
    credentials: "include",
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to load friends"));
  return res.json();
}

async function fetchFriendRequests() {
  const res = await fetch(`/users/friend-requests?_=${Date.now()}`, {
    credentials: "include",
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to load friend requests"));
  return res.json();
}

async function fetchFriendRequestHistory() {
  const res = await fetch(`/users/friend-requests/history?limit=120&_=${Date.now()}`, {
    credentials: "include",
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to load friend request history"));
  return res.json();
}

async function sendFriendRequest(targetPublicId) {
  const targetToken = encodeURIComponent(String(targetPublicId || "").trim());
  const res = await fetch(`/users/friend-requests/${targetToken}`, {
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

async function readApiErrorDetail(res, fallback) {
  let detail = fallback;
  try {
    const data = await res.clone().json();
    if (typeof data?.detail === "string" && data.detail.trim()) {
      detail = data.detail.trim();
    }
  } catch {}
  return `${detail} (${res.status})`;
}

async function fetchWithTimeout(input, init = {}, timeoutMs = 15000) {
  const timeout = Math.max(1000, Number(timeoutMs) || 15000);
  const controller = new AbortController();
  const existingSignal = init?.signal;
  const onAbort = () => controller.abort();
  if (existingSignal) {
    if (existingSignal.aborted) controller.abort();
    else existingSignal.addEventListener("abort", onAbort, { once: true });
  }
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(input, { ...(init || {}), signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
    if (existingSignal) existingSignal.removeEventListener("abort", onAbort);
  }
}

async function acceptFriendRequest(requestPublicId) {
  const res = await fetch(`/users/friend-requests/${requestPublicId}/accept`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to accept friend request"));
  return res.json();
}

async function removeFriendRequest(requestPublicId) {
  const res = await fetch(`/users/friend-requests/${requestPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to remove friend request"));
}

async function removeFriend(friendPublicId) {
  const res = await fetch(`/users/friends/${friendPublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to remove friend"));
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
    name.textContent = row.username || row.requester_username || row.addressee_username || row.other_username || "Unknown";
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
  const [friends, requests, history] = await Promise.all([fetchFriends(), fetchFriendRequests(), fetchFriendRequestHistory()]);
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
      if (acceptBtn.disabled) return;
      acceptBtn.disabled = true;
      acceptBtn.textContent = "Accepting...";
      try {
        await acceptFriendRequest(req.public_id);
        await refreshFriendsModal();
      } catch (err) {
        alert(err.message || "Failed to accept request");
      } finally {
        acceptBtn.disabled = false;
        acceptBtn.textContent = "Accept";
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

  renderFriendRows(friendRequestsHistoryEl, history || [], (row) => {
    const metaBtn = document.createElement("button");
    metaBtn.type = "button";
    metaBtn.textContent = `${row.direction || "unknown"} - ${row.status || "unknown"}`;
    metaBtn.title = formatTimestamp(row.updated_at) || "";
    metaBtn.disabled = true;
    return [metaBtn];
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

async function fetchAdminSettings() {
  const res = await fetch("/admin/settings", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load admin settings");
  return res.json();
}

async function patchAdminSettings(payload) {
  const res = await fetch("/admin/settings", {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to save admin settings");
  }
  return res.json();
}

async function fetchAdminRegistrationCodes() {
  const res = await fetch("/admin/registration-codes", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load registration codes");
  return res.json();
}

async function createAdminRegistrationCode(note = "") {
  const res = await fetch("/admin/registration-codes", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: String(note || "").trim() }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to generate registration code");
  }
  return res.json();
}

async function revokeAdminRegistrationCode(codePublicId) {
  const res = await fetch(`/admin/registration-codes/${codePublicId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to revoke registration code");
  }
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
    name.textContent = `${evt.event_type || "event"} \u00B7 ${formatTimestamp(evt.ts) || evt.ts || "-"}`;
    const detail = document.createElement("div");
    detail.className = "admin-user-email";
    const actor = evt.actor_public_id ? `actor: ${evt.actor_public_id}` : "actor: system";
    const target = evt.target?.user_public_id || evt.target?.server_public_id || evt.target?.channel_public_id || "-";
    detail.textContent = `${actor} \u00B7 target: ${target}`;
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

function renderAdminSettings(settings) {
  if (adminRequireRegistrationCodeInput) {
    adminRequireRegistrationCodeInput.checked = Boolean(settings?.require_registration_code);
  }
}

function renderAdminRegistrationCodes(codes) {
  if (!adminRegistrationCodesList) return;
  adminRegistrationCodesList.innerHTML = "";
  const list = Array.isArray(codes) ? codes : [];
  if (!list.length) {
    adminRegistrationCodesList.innerHTML = '<div class="message-placeholder">No registration codes yet.</div>';
    return;
  }
  list.forEach((code) => {
    const row = document.createElement("div");
    row.className = "admin-user-row";

    const meta = document.createElement("div");
    meta.className = "admin-user-meta";
    const name = document.createElement("div");
    name.className = "admin-user-name";
    name.textContent = code.note ? `Code (${code.note})` : "Code";
    const detail = document.createElement("div");
    detail.className = "admin-user-email";
    detail.textContent = `created: ${formatTimestamp(code.created_at) || code.created_at || "-"} • status: ${
      code.revoked_at ? "revoked" : (code.used_at ? "used" : "active")
    }`;
    meta.appendChild(name);
    meta.appendChild(detail);
    row.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "admin-user-actions";
    if (!code.used_at && !code.revoked_at) {
      const revokeBtn = document.createElement("button");
      revokeBtn.type = "button";
      revokeBtn.textContent = "Revoke";
      revokeBtn.classList.add("danger");
      revokeBtn.addEventListener("click", async () => {
        try {
          await revokeAdminRegistrationCode(code.public_id);
          const codesNext = await fetchAdminRegistrationCodes();
          renderAdminRegistrationCodes(codesNext);
          showToast("Registration code revoked");
        } catch (err) {
          alert(err.message || "Failed to revoke code");
        }
      });
      actions.appendChild(revokeBtn);
    }
    row.appendChild(actions);
    adminRegistrationCodesList.appendChild(row);
  });
}

async function loadAdminPanel() {
  const [overview, users, audit, settings, registrationCodes] = await Promise.all([
    fetchAdminOverview(),
    fetchAdminUsers(),
    fetchAdminAudit(),
    fetchAdminSettings(),
    fetchAdminRegistrationCodes(),
  ]);
  renderAdminOverview(overview);
  renderAdminUsers(users);
  renderAdminAudit(audit);
  renderAdminSettings(settings);
  renderAdminRegistrationCodes(registrationCodes);
}

async function loadDmMessages(conversationPublicId, shouldScrollToBottom = false, options = {}) {
  const appendOlder = !!options.appendOlder;
  const paging = getHistoryPaging("dm", conversationPublicId);
  if (!paging) return;
  if (appendOlder) {
    if (paging.loadingOlder || !paging.hasMore) return;
    paging.loadingOlder = true;
  } else {
    paging.offset = 0;
    paging.hasMore = true;
    paging.loadingOlder = false;
  }

  try {
    const params = new URLSearchParams();
    params.set("limit", String(MESSAGE_PAGE_SIZE));
    params.set("offset", String(appendOlder ? paging.offset : 0));
    const res = await fetch(`/dms/${conversationPublicId}/messages?${params.toString()}`, { credentials: "include" });
    if (!res.ok) {
      if (!appendOlder) {
        messagesPanel.innerHTML = '<div class="message-placeholder">Could not load messages. Try again.</div>';
      }
      throw new Error(`Failed to load DM messages: ${res.status}`);
    }
    const messages = await res.json();
    const latest = messages[messages.length - 1];
    if (latest?.public_id) {
      cacheLatestMessageId("dm", conversationPublicId, latest);
    }

    if (appendOlder) {
      if (!messages.length) {
        paging.hasMore = false;
        return;
      }
      const placeholder = messagesPanel.querySelector(".message-placeholder");
      if (placeholder) placeholder.remove();
      const prevHeight = messagesPanel.scrollHeight;
      const frag = document.createDocumentFragment();
      messages.forEach((msg) => {
        frag.appendChild(buildMessageElement(msg, { context: "dm" }));
      });
      messagesPanel.prepend(frag);
      const nextHeight = messagesPanel.scrollHeight;
      messagesPanel.scrollTop += Math.max(0, nextHeight - prevHeight);
    } else {
      renderMessagesIncrementally(messages, (msg) => buildMessageElement(msg, { context: "dm" }), shouldScrollToBottom);
      if (messageSearchCount) messageSearchCount.textContent = "0";
      if (messageSearchInput) messageSearchInput.value = "";
      renderTypingIndicator();
      if (shouldScrollToBottom) setJumpUnreadVisible(false);
      else updateJumpUnreadState();
      refreshSendStatusForActiveContext();
    }

    paging.offset += messages.length;
    paging.hasMore = messages.length === MESSAGE_PAGE_SIZE;
  } finally {
    if (appendOlder) paging.loadingOlder = false;
  }
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
    if (data.user?.appearance_settings && typeof data.user.appearance_settings === "object") {
      applyAccountAppearanceSettings(data.user.appearance_settings);
    } else {
      queueAppearanceSettingsAccountSync();
    }
    // Fresh dashboard load indicates authenticated session; clear WS auth-failure blocks.
    presenceSocketBlocked = false;
    presenceSocketFailureCount = 0;
    dmSocketBlocked = false;
    dmSocketFailureCount = 0;
    blockedChannelSocketIds.clear();
    channelSocketFailureCounts.clear();
    if (adminBtn) adminBtn.classList.toggle("hidden", !data.user?.is_superadmin);
    refreshUserDisplaySummary();

    if (data.user?.must_reset_password) {
      alert("This account must reset password before use. Please log out and complete first-use reset from login.");
    }

    connectPresenceSocket();
    updateSidebarModeUI();
    await loadServers();
    await restoreLastActiveChat();
    if (data.user && !data.user.has_seen_tutorial && !isTutorialDismissedLocally()) {
      setTimeout(() => {
        startOnboardingTutorial();
      }, 250);
    }
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
      avatarEl.src = resolveMediaUrl(`/api/servers/${server.public_id}/avatar`);
      avatarEl.onerror = () => {
        avatarEl.style.display = "none";
      };
      li.appendChild(avatarEl);
      li.appendChild(initialsEl);
      li.draggable = true;

      li.addEventListener("click", () => {
        closeServerSwitcherOverlay();
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
                avatarEl.src = resolveMediaUrl(`/api/servers/${server.public_id}/avatar?ts=${Date.now()}`);
              }),
          },
          {
            label: "Set Upload Limit",
            onClick: async () => {
              const currentLimit = Number(server.max_upload_size_mb || 0);
              const raw = window.prompt(
                `Upload limit for ${server.name} in MB (0 = unlimited):`,
                String(currentLimit),
              );
              if (raw === null) return;
              const parsed = Math.floor(Number(raw));
              if (!Number.isFinite(parsed) || parsed < 0) {
                alert("Enter a number 0 or greater.");
                return;
              }
              const updated = await patchServerUploadLimit(server.public_id, parsed);
              server.max_upload_size_mb = updated?.max_upload_size_mb ?? null;
              const nextLabel = server.max_upload_size_mb ? `${server.max_upload_size_mb}MB` : "unlimited";
              showToast(`Upload limit set to ${nextLabel}`);
            },
          },
          {
            label: "Server Settings",
            onClick: async () => {
              activeMode = "server";
              activeServerId = server.public_id;
              try {
                await loadServerSettingsModal();
                openModal(serverSettingsModal);
              } catch (err) {
                alert(err.message || "Failed to load server settings");
              }
            },
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
    updateSidebarModeUI();
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
    const [channelsRes, layoutRes, categoriesRes] = await Promise.all([
      fetch(`/channels/server/${serverPublicId}`, { credentials: "include" }),
      fetch(`/channels/server/${serverPublicId}/layout`, { credentials: "include" }),
      fetch(`/channels/server/${serverPublicId}/categories`, { credentials: "include" }),
    ]);
    if (!channelsRes.ok) throw new Error(`Failed to load channels: ${channelsRes.status}`);
    const channels = await channelsRes.json();
    const categories = categoriesRes.ok ? await categoriesRes.json() : [];
    const serverLayout = layoutRes.ok
      ? normalizeServerLayoutBundle(await layoutRes.json())
      : getServerLayoutState(serverPublicId);
    serverChannelLayouts.set(serverPublicId, serverLayout);
    const channelIcons = getStoredObject(getChannelIconsStorageKey(serverPublicId), {});
    const channelsById = new Map(channels.map((ch) => [ch.public_id, ch]));
    const collapsedCategories = { ...(serverLayout.collapsed || {}) };
    let layout = Array.isArray(serverLayout.layoutTokens) ? [...serverLayout.layoutTokens] : [];
    const hadLegacySepTokens = layout.some((token) => String(token || "").startsWith("sep:"));
    if (layout.length === 0) {
      layout = channels.map((channel) => `ch:${channel.public_id}`);
    }
    layout = layout.filter((token) => token.startsWith("ch:") && channelsById.has(token.slice(3)));
    channels.forEach((channel) => {
      const token = `ch:${channel.public_id}`;
      if (!layout.includes(token)) layout.push(token);
    });

    serverChannelLayouts.set(serverPublicId, {
      layoutTokens: layout,
      separators: {},
      collapsed: collapsedCategories,
    });
    if (hadLegacySepTokens) queueSaveServerLayoutState(serverPublicId);

    channelsPanel.innerHTML = "";
    const renderedCategoryIds = new Set();
    let previousCategoryId = "__none__";
    layout.forEach((token) => {
      const channel = channelsById.get(token.slice(3));
      if (!channel) return;
      const categoryId = String(channel.category_public_id || "").trim() || null;
      const categoryName = String(channel.category_name || "").trim() || "Category";
      if (categoryId && categoryId !== previousCategoryId) {
        renderedCategoryIds.add(categoryId);
        const categoryLi = document.createElement("li");
        categoryLi.className = "channel-category-item";
        categoryLi.dataset.categoryId = categoryId;
        const isCollapsed = !!collapsedCategories[categoryId];
        if (isCollapsed) categoryLi.classList.add("collapsed");
        const categoryToggle = document.createElement("button");
        categoryToggle.type = "button";
        categoryToggle.className = "channel-category-toggle";
        categoryToggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
        categoryToggle.innerHTML = `<i class="fas fa-chevron-${isCollapsed ? "right" : "down"}"></i>`;
        const categoryLabel = document.createElement("span");
        categoryLabel.className = "channel-category-label";
        categoryLabel.textContent = categoryName;
        const toggleCategoryCollapsed = (event) => {
          event.preventDefault();
          event.stopPropagation();
          const state = getServerLayoutState(serverPublicId);
          state.collapsed = { ...(state.collapsed || {}), [categoryId]: !isCollapsed };
          serverChannelLayouts.set(serverPublicId, state);
          queueSaveServerLayoutState(serverPublicId);
          loadChannels(serverPublicId, options);
        };
        categoryToggle.addEventListener("click", toggleCategoryCollapsed);
        categoryLabel.addEventListener("click", toggleCategoryCollapsed);
        categoryLi.appendChild(categoryToggle);
        categoryLi.appendChild(categoryLabel);
        channelsPanel.appendChild(categoryLi);
      }
      previousCategoryId = categoryId || "__none__";
      const displayChannelName = getDisplayChannelName(channel);
      const li = document.createElement("li");
      const nameEl = document.createElement("span");
      nameEl.classList.add("channel-name");
      const channelPrefix = document.createElement("span");
      channelPrefix.classList.add("channel-prefix");
      const customIcon = channelIcons[channel.public_id];
      renderChannelPrefixIcon(channelPrefix, channel, customIcon);
      const channelText = document.createElement("span");
      channelText.textContent = displayChannelName || channel.name;
      nameEl.appendChild(channelPrefix);
      nameEl.appendChild(channelText);
      li.dataset.channelId = channel.public_id;
      li.dataset.serverId = serverPublicId;
      li.dataset.channelName = displayChannelName || channel.name;
      li.dataset.channelType = channel.type;
      li.dataset.layoutToken = token;
      li.classList.add("channel-item");
      if ((channel.type || "text") === "voice") li.classList.add("voice-channel-item");
      if (categoryId && collapsedCategories[categoryId]) {
        li.classList.add("channel-collapsed-hidden");
        li.hidden = true;
      }
      li.appendChild(nameEl);

      channelToServer.set(channel.public_id, serverPublicId);
      channelTypeById.set(channel.public_id, channel.type || "text");
      channelNameById.set(channel.public_id, displayChannelName || channel.name);
      channelCategoryById.set(channel.public_id, channel.category_public_id || null);
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
          updateTopbar(`[V] ${displayChannelName || channel.name}`, false);
          joinVoiceChannel(channel.public_id).catch((err) => {
            console.error("Failed to join voice:", err);
            setVoiceStatus("Mic permission or voice connection failed");
          });
        } else {
          updateTopbar(
            activeChannelType === "notes"
              ? `[N] ${displayChannelName || channel.name}`
              : activeChannelType === "battlemap"
                ? `[B] ${displayChannelName || channel.name}`
                : `# ${displayChannelName || channel.name}`,
            false
          );
          await ensureServerNicknames(serverPublicId);
          if (activeChannelType === "notes") {
            await loadNotesPage(channel.public_id);
          } else if (activeChannelType === "battlemap") {
            loadBattlemapPage(channel.public_id);
            await loadMessages(channel.public_id, true);
            applyDraftToComposer();
          } else {
            loadMessages(channel.public_id, true);
            applyDraftToComposer();
          }
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
                setStoredChannelIcon(serverPublicId, channel.public_id, { type: "image", value: dataUrl });
                loadChannels(serverPublicId);
              }),
          },
          {
            label: "Set Channel Emoji",
            onClick: () => {
              const value = (window.prompt("Channel emoji (example: fire or dice):", "") || "").trim();
              if (!value) return;
              setStoredChannelIcon(serverPublicId, channel.public_id, { type: "emoji", value });
              loadChannels(serverPublicId);
            },
          },
          {
            label: "Set Channel Text",
            onClick: () => {
              const value = (window.prompt("Channel text badge (1-3 chars):", "") || "").trim();
              if (!value) return;
              setStoredChannelIcon(serverPublicId, channel.public_id, { type: "text", value });
              loadChannels(serverPublicId);
            },
          },
          {
            label: "Remove Channel Picture/Icon",
            onClick: () => {
              setStoredChannelIcon(serverPublicId, channel.public_id, null);
              loadChannels(serverPublicId);
            },
          },
          {
            label: `Notifications: All${currentNotif === "all" ? " \u2713" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "all"),
          },
          {
            label: `Notifications: Mentions${currentNotif === "mentions" ? " \u2713" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "mentions"),
          },
          {
            label: `Notifications: Muted${currentNotif === "muted" ? " \u2713" : ""}`,
            onClick: () => setChannelNotificationMode(channel.public_id, "muted"),
          },
          {
            label: "Delete Channel",
            danger: true,
            onClick: () => openDeleteChannelModal(channel.public_id, displayChannelName || channel.name),
          },
        ]);
      });
      channelsPanel.appendChild(li);
    });
    (Array.isArray(categories) ? categories : []).forEach((category) => {
      const categoryId = String(category?.public_id || "").trim();
      if (!categoryId || renderedCategoryIds.has(categoryId)) return;
      const categoryName = String(category?.name || "").trim() || "Category";
      const categoryLi = document.createElement("li");
      categoryLi.className = "channel-category-item empty-category";
      categoryLi.dataset.categoryId = categoryId;
      const isCollapsed = !!collapsedCategories[categoryId];
      if (isCollapsed) categoryLi.classList.add("collapsed");
      const categoryToggle = document.createElement("button");
      categoryToggle.type = "button";
      categoryToggle.className = "channel-category-toggle";
      categoryToggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
      categoryToggle.innerHTML = `<i class="fas fa-chevron-${isCollapsed ? "right" : "down"}"></i>`;
      const categoryLabel = document.createElement("span");
      categoryLabel.className = "channel-category-label";
      categoryLabel.textContent = `${categoryName} (empty)`;
      const toggleCategoryCollapsed = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const state = getServerLayoutState(serverPublicId);
        state.collapsed = { ...(state.collapsed || {}), [categoryId]: !isCollapsed };
        serverChannelLayouts.set(serverPublicId, state);
        queueSaveServerLayoutState(serverPublicId);
        loadChannels(serverPublicId, options);
      };
      categoryToggle.addEventListener("click", toggleCategoryCollapsed);
      categoryLabel.addEventListener("click", toggleCategoryCollapsed);
      categoryLi.appendChild(categoryToggle);
      categoryLi.appendChild(categoryLabel);
      channelsPanel.appendChild(categoryLi);
    });
    renderVoiceUsersInChannelsPanel();
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
async function loadMessages(channelPublicId, shouldScrollToBottom = false, options = {}) {
  try {
    const appendOlder = !!options.appendOlder;
    const paging = getHistoryPaging("server", channelPublicId);
    if (!paging) return;
    if (appendOlder) {
      if (paging.loadingOlder || !paging.hasMore) return;
      paging.loadingOlder = true;
    } else {
      paging.offset = 0;
      paging.hasMore = true;
      paging.loadingOlder = false;
    }

    const channelType = channelTypeById.get(channelPublicId) || (channelPublicId === activeChannelId ? activeChannelType : "text");
    if (channelType === "notes") {
      await loadNotesPage(channelPublicId);
      return;
    }
    if (channelType === "battlemap") {
      loadBattlemapPage(channelPublicId);
      updateTextVsVoiceUI();
    }
    if (activeServerId) await ensureServerNicknames(activeServerId);
    const params = new URLSearchParams();
    params.set("limit", String(MESSAGE_PAGE_SIZE));
    params.set("offset", String(appendOlder ? paging.offset : 0));
    const res = await fetch(`/messages/${channelPublicId}?${params.toString()}`, { credentials: "include" });
    if (!res.ok) {
      if (!appendOlder) {
        messagesPanel.innerHTML = '<div class="message-placeholder">Could not load messages. Try again.</div>';
      }
      throw new Error(`Failed to load messages: ${res.status}`);
    }
    const messages = await res.json();

    if (appendOlder) {
      if (!messages.length) {
        paging.hasMore = false;
        return;
      }
      const placeholder = messagesPanel.querySelector(".message-placeholder");
      if (placeholder) placeholder.remove();
      const prevHeight = messagesPanel.scrollHeight;
      const frag = document.createDocumentFragment();
      messages.forEach((msg) => {
        frag.appendChild(buildMessageElement(msg));
      });
      messagesPanel.prepend(frag);
      const nextHeight = messagesPanel.scrollHeight;
      messagesPanel.scrollTop += Math.max(0, nextHeight - prevHeight);
    } else {
      renderMessagesIncrementally(messages, (msg) => buildMessageElement(msg), shouldScrollToBottom);
      if (messageSearchCount) messageSearchCount.textContent = "0";
      if (messageSearchInput) messageSearchInput.value = "";

      const latest = messages[messages.length - 1];
      if (latest?.public_id) {
        cacheLatestMessageId("server", channelPublicId, latest);
      }
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
      refreshSendStatusForActiveContext();
    }

    paging.offset += messages.length;
    paging.hasMore = messages.length === MESSAGE_PAGE_SIZE;
  } catch (err) {
    console.error("Error loading messages:", err);
  } finally {
    const paging = getHistoryPaging("server", channelPublicId);
    if (paging) paging.loadingOlder = false;
  }
}

// --------------------
// Create Server Modal
// --------------------
if (createServerModal && submitServerBtn) {
  if (openCreateServerBtn) {
    openCreateServerBtn.addEventListener("click", () => openModal(createServerModal));
  }
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
if (createChannelModal && submitChannelBtn) {
  if (openCreateChannelBtn) {
    openCreateChannelBtn.addEventListener("click", async () => {
      if (!activeServerId) return alert("Select a server first!");
      if (channelCategoryInput) {
        channelCategoryInput.innerHTML = '<option value="">No Category</option>';
        try {
          const categories = await fetchServerCategories(activeServerId);
          (Array.isArray(categories) ? categories : []).forEach((category) => {
            const option = document.createElement("option");
            option.value = category.public_id;
            option.textContent = category.name || "Category";
            channelCategoryInput.appendChild(option);
          });
        } catch (err) {
          console.error("Failed to load categories for channel create modal:", err);
        }
      }
      openModal(createChannelModal);
    });
  }
  submitChannelBtn.addEventListener("click", async () => {
    const name = channelNameInput.value.trim();
    const type = (channelTypeInput?.value || "text").trim().toLowerCase();
    if (!name || !activeServerId) return;
    const categoryPublicId = String(channelCategoryInput?.value || "").trim() || null;
    try {
      const res = await fetch(`/channels/server/${activeServerId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, category_public_id: categoryPublicId }),
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
      if (type === "notes" && createdChannel?.type !== "notes") {
        throw new Error("Notes type was not applied. Restart backend to load latest channel-type support.");
      }
      if (type === "battlemap" && createdChannel?.type !== "battlemap") {
        throw new Error("Battlemap type was not applied. Restart backend to load latest channel-type support.");
      }
      channelNameInput.value = "";
      if (channelTypeInput) channelTypeInput.value = "text";
      if (channelCategoryInput) channelCategoryInput.value = "";
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
    closeServerSwitcherOverlay();
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

if (openServerSwitcherBtn) {
  openServerSwitcherBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (serverSwitcherOverlay?.classList.contains("hidden")) {
      openServerSwitcherOverlay();
    } else {
      closeServerSwitcherOverlay();
    }
  });
}

if (closeServerSwitcherBtn) {
  closeServerSwitcherBtn.addEventListener("click", () => {
    closeServerSwitcherOverlay();
  });
}

if (serverSwitcherOverlay) {
  serverSwitcherOverlay.addEventListener("click", (event) => {
    if (event.target === serverSwitcherOverlay) closeServerSwitcherOverlay();
  });
}

if (openCreateItemBtn) {
  openCreateItemBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = openCreateItemBtn.getBoundingClientRect();
    const menuItems = [];
    if (activeMode === "server" && activeServerId) {
      menuItems.push({
        label: "Create Channel",
        onClick: () => openModal(createChannelModal),
      });
      menuItems.push({
        label: "Server Settings",
        onClick: async () => {
          try {
            await loadServerSettingsModal();
            openModal(serverSettingsModal);
          } catch (err) {
            alert(err.message || "Failed to load server settings");
          }
        },
      });
    } else {
      menuItems.push({
        label: "Create Channel",
        onClick: () => alert("Select a space first."),
      });
    }
    menuItems.push({
      label: "Create Space",
      onClick: () => openModal(createServerModal),
    });
    showContextMenu(Math.round(rect.left), Math.round(rect.top - 10), menuItems);
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

if (openServerSettingsBtn && serverSettingsModal) {
  openServerSettingsBtn.addEventListener("click", async () => {
    if (activeMode !== "server" || !activeServerId) {
      alert("Select a server first.");
      return;
    }
    try {
      await loadServerSettingsModal();
      openModal(serverSettingsModal);
    } catch (err) {
      alert(err.message || "Failed to load server settings");
    }
  });
}

if (serverSettingsSaveBtn) {
  serverSettingsSaveBtn.addEventListener("click", async () => {
    if (!activeServerId) return;
    const name = String(serverSettingsNameInput?.value || "").trim();
    if (!name) {
      alert("Server name is required.");
      return;
    }
    const limitRaw = Number(serverSettingsUploadLimitInput?.value || 0);
    const limit = Math.max(0, Math.floor(Number.isFinite(limitRaw) ? limitRaw : 0));
    const logRetentionRaw = Number(serverSettingsLogRetentionInput?.value || 0);
    const logRetentionDays = Math.max(0, Math.floor(Number.isFinite(logRetentionRaw) ? logRetentionRaw : 0));
    const messageRetentionRaw = Number(serverSettingsMessageRetentionInput?.value ?? -1);
    const messageRetentionDays = Math.max(-1, Math.floor(Number.isFinite(messageRetentionRaw) ? messageRetentionRaw : -1));
    const stripUploadMetadata = Boolean(serverSettingsStripMetadataInput?.checked);
    const automodEnabled = Boolean(serverSettingsAutomodEnabled?.checked);
    const automodBlockLinks = Boolean(serverSettingsAutomodBlockLinks?.checked);
    const automodBlockInvites = Boolean(serverSettingsAutomodBlockInvites?.checked);
    const automodTerms = String(serverSettingsAutomodTerms?.value || "").trim();
    const automodExtensions = String(serverSettingsAutomodExtensions?.value || "").trim();
    try {
      await fetch(`/servers/${activeServerId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          max_upload_size_mb: limit,
          log_retention_days: logRetentionDays,
          message_retention_days: messageRetentionDays,
          strip_upload_metadata: stripUploadMetadata,
          automod_enabled: automodEnabled,
          automod_block_external_links: automodBlockLinks,
          automod_block_invite_links: automodBlockInvites,
          automod_blocked_terms: automodTerms,
          automod_blocked_extensions: automodExtensions,
        }),
      }).then(async (res) => {
        if (res.ok) return res.json();
        let detail = "Failed to save server settings";
        try {
          const data = await res.json();
          if (data?.detail) detail = data.detail;
        } catch {}
        throw new Error(detail);
      });
      await loadServers();
      await loadServerSettingsModal();
      showToast("Server settings saved");
    } catch (err) {
      alert(err.message || "Failed to save server settings");
    }
  });
}

if (serverSettingsCreateRoleBtn) {
  serverSettingsCreateRoleBtn.addEventListener("click", async () => {
    if (!activeServerId) return;
    const roleName = String(serverSettingsNewRoleName?.value || "").trim();
    if (!roleName) {
      alert("Role name is required.");
      return;
    }
    try {
      await createServerRole(activeServerId, roleName);
      if (serverSettingsNewRoleName) serverSettingsNewRoleName.value = "";
      await loadServerSettingsModal();
      showToast("Role created");
    } catch (err) {
      alert(err.message || "Failed to create role");
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
  openAddSeparatorBtn.addEventListener("click", async () => {
    if (!activeServerId) {
      alert("Select a server first!");
      return;
    }
    const categoryName = (window.prompt("Category name:") || "").trim();
    if (!categoryName) return;
    try {
      await createServerCategory(activeServerId, categoryName);
      showToast(`Category "${categoryName}" created`);
      await loadChannels(activeServerId);
    } catch (err) {
      alert(err?.message || "Failed to create category");
    }
  });
}

if (openDiscordImportBtn && discordImportModal) {
  openDiscordImportBtn.addEventListener("click", async () => {
    if (!activeServerId) {
      alert("Select a server first!");
      return;
    }
    if (discordImportServerLabel) {
      const serverName = getServerNameById(activeServerId) || activeServerId;
      discordImportServerLabel.textContent = `Target server: ${serverName}`;
    }
    openModal(discordImportModal);
    await refreshDiscordImportModalState();
  });
}

if (discordConnectBtn) {
  discordConnectBtn.addEventListener("click", () => {
    window.open("/discord/oauth/start", "_blank", "noopener");
  });
}

if (discordSaveOauthSettingsBtn) {
  discordSaveOauthSettingsBtn.addEventListener("click", async () => {
    try {
      const clientId = String(discordOauthClientIdInput?.value || "").trim();
      const clientSecret = String(discordOauthClientSecretInput?.value || "").trim();
      const redirectUri = String(discordOauthRedirectUriInput?.value || "").trim();
      await saveDiscordOauthSettings({
        client_id: clientId || null,
        client_secret: clientSecret || null,
        redirect_uri: redirectUri || null,
      });
      if (discordOauthClientSecretInput) discordOauthClientSecretInput.value = "";
      await refreshDiscordImportModalState();
      showToast("Saved Discord OAuth settings");
    } catch (err) {
      alert(err?.message || "Failed to save Discord OAuth settings");
    }
  });
}

if (discordClearOauthSecretBtn) {
  discordClearOauthSecretBtn.addEventListener("click", async () => {
    try {
      await saveDiscordOauthSettings({ clear_client_secret: true });
      if (discordOauthClientSecretInput) discordOauthClientSecretInput.value = "";
      await refreshDiscordImportModalState();
      showToast("Cleared Discord OAuth secret");
    } catch (err) {
      alert(err?.message || "Failed to clear Discord OAuth secret");
    }
  });
}

if (discordRefreshSessionBtn) {
  discordRefreshSessionBtn.addEventListener("click", () => {
    refreshDiscordImportModalState().catch((err) => {
      alert(err?.message || "Failed to refresh Discord session");
    });
  });
}

if (discordDisconnectBtn) {
  discordDisconnectBtn.addEventListener("click", async () => {
    try {
      await disconnectDiscordOauthSession();
      await refreshDiscordImportModalState();
      showToast("Disconnected Discord session");
    } catch (err) {
      alert(err?.message || "Failed to disconnect Discord session");
    }
  });
}

if (discordRunImportBtn) {
  discordRunImportBtn.addEventListener("click", async () => {
    if (!activeServerId) {
      alert("Select a server first!");
      return;
    }
    const guildId = String(discordGuildSelect?.value || "").trim();
    if (!guildId) {
      alert("Select a Discord server first.");
      return;
    }
    try {
      const result = await runDiscordOauthImport({
        server_public_id: activeServerId,
        guild_id: guildId,
        replace_existing: !!discordImportReplaceExistingInput?.checked,
        skip_existing: !!discordImportSkipExistingInput?.checked,
        include_text: true,
        include_voice: true,
        create_categories: !!discordImportCreateCategoriesInput?.checked,
        prefix_category: !!discordImportPrefixCategoryInput?.checked,
      });
      await loadChannels(activeServerId);
      closeModal(discordImportModal);
      showToast(`Imported ${result.created || 0} channels from ${result.guild_name || "Discord"}`);
    } catch (err) {
      alert(err?.message || "Discord import failed");
    }
  });
}

if (submitInviteMemberBtn && inviteMemberModal) {
  submitInviteMemberBtn.addEventListener("click", async () => {
    const userPublicId = (inviteSelectedFriendPublicId || inviteUserPublicIdInput?.value || "").trim();
    if (!inviteServerPublicId || !userPublicId) return;
    try {
      await inviteMemberToServer(inviteServerPublicId, userPublicId);
      closeModal(inviteMemberModal);
      inviteServerPublicId = null;
      resetInviteFriendSelection();
      showToast("Member invited successfully.");
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
      channelCategoryById.delete(deleteChannelTarget.publicId);
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

[createServerModal, createChannelModal, inviteMemberModal, deleteServerModal, deleteChannelModal, userSettingsModal, publicUserProfileModal, richEditorModal, threadModal, pinsModal, friendsModal, createDmModal, discordImportModal, adminModal, serverMembersModal, serverSettingsModal, launchChecklistModal, quickSwitcherModal, shortcutsModal, onboardingTutorialModal, imagePreprocessModal].forEach((modal) => {
  if (!modal) return;
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      if (modal === imagePreprocessModal) resolveImagePreprocessWithOriginal();
      if (modal === userSettingsModal) stopMicSelfTest();
      if (modal === onboardingTutorialModal) {
        clearTutorialHighlight();
        markTutorialComplete();
      }
      closeModal(modal);
      if (modal === threadModal) activeThreadParentMessageId = null;
      if (modal === serverMembersModal) memberNicknameDrafts = new Map();
    }
  });

  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal === imagePreprocessModal) resolveImagePreprocessWithOriginal();
      if (modal === userSettingsModal) stopMicSelfTest();
      if (modal === onboardingTutorialModal) {
        clearTutorialHighlight();
        markTutorialComplete();
      }
      closeModal(modal);
      if (modal === threadModal) activeThreadParentMessageId = null;
      if (modal === serverMembersModal) memberNicknameDrafts = new Map();
    });
  }
});

if (tutorialNextBtn) {
  tutorialNextBtn.addEventListener("click", () => {
    if (tutorialStepIndex < ONBOARDING_TUTORIAL_STEPS.length - 1) {
      tutorialStepIndex += 1;
      renderTutorialStep();
    }
  });
}

if (tutorialPrevBtn) {
  tutorialPrevBtn.addEventListener("click", () => {
    if (tutorialStepIndex > 0) {
      tutorialStepIndex -= 1;
      renderTutorialStep();
    }
  });
}

if (tutorialFinishBtn) {
  tutorialFinishBtn.addEventListener("click", () => {
    finishOnboardingTutorial();
  });
}

if (tutorialSkipBtn) {
  tutorialSkipBtn.addEventListener("click", () => {
    finishOnboardingTutorial();
  });
}

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
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    if (activeMode === "server" && activeChannelType === "notes") {
      event.preventDefault();
      saveActiveNotesPage({ showSavedToast: true }).catch((err) => {
        alert(err.message || "Failed to save note");
      });
      return;
    }
  }
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "d") {
    event.preventDefault();
    toggleRuntimeDiagnosticsPanel().catch((err) => {
      showToast(err?.message || "Failed to open diagnostics");
    });
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
    closeModal(publicUserProfileModal);
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
    if (onboardingTutorialModal?.classList.contains("open")) {
      clearTutorialHighlight();
      markTutorialComplete();
    }
    closeModal(onboardingTutorialModal);
    if (imagePreprocessModal?.classList.contains("open")) resolveImagePreprocessWithOriginal();
    closeModal(imagePreprocessModal);
    activeThreadParentMessageId = null;
  }
});

document.addEventListener("click", (event) => {
  if (suppressNextMessageUiAutoClose) return;
  if (event.target?.closest?.("#context-menu")) return;
  if (event.target?.closest?.(".message-emoji-picker")) return;
  if (event.target?.closest?.(".message-react-trigger")) return;
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
    if (sendMessageInFlight) return;
    if (activeChannelType === "voice" || activeChannelType === "notes") return;
    let content = messageInput.value.trim();
    if (!content) return;
    sendMessageInFlight = true;
    setSendStatus("Sending...", "sending");
    if (sendMessageBtn) sendMessageBtn.disabled = true;
    const commandResult = handleComposerCommand(content);
    if (commandResult.handled) {
      messageInput.value = "";
      clearActiveDraft();
      sendMessageInFlight = false;
      if (sendMessageBtn) sendMessageBtn.disabled = false;
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
        res = await fetchWithTimeout(`/dms/${activeDmConversationId}/messages`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }, 15000);
      } else {
        if (!activeChannelId) return;
        res = await fetchWithTimeout(`/messages/${activeChannelId}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            parent_message_public_id: pendingReplyTo?.public_id || null,
          }),
        }, 15000);
      }
      if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to send message"));
      const createdMessage = await res.json().catch(() => null);
      messageInput.value = "";
      clearActiveDraft();
      if (activeMode === "dm") {
        setDeliveredForContext("dm", activeDmConversationId, createdMessage);
        if (!isDmSocketConnected(activeDmConversationId)) {
          await loadDmMessages(activeDmConversationId, true);
        }
      } else {
        setPendingReply(null);
        setDeliveredForContext("server", activeChannelId, createdMessage);
        if (!isChannelSocketConnected(activeChannelId)) {
          await loadMessages(activeChannelId, true);
        }
      }
    } catch (err) {
      const isTimeout = err?.name === "AbortError";
      const sendErr = isTimeout
        ? "Send timed out after 15s. Check network/backend and retry."
        : (err.message || "Send failed");
      failedSendQueue.push({
        mode: activeMode,
        channelId: activeChannelId,
        dmConversationId: activeDmConversationId,
        content,
      });
      updateRetrySendUi();
      setSendStatus(sendErr, "error");
      console.error(err);
    } finally {
      sendMessageInFlight = false;
      if (sendMessageBtn) sendMessageBtn.disabled = false;
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
      if (activeMode !== "server" || !activeChannelId || activeChannelType === "voice" || activeChannelType === "notes") return;
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
      const res = await fetchWithTimeout(`/messages/${activeChannelId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          parent_message_public_id: activeThreadParentMessageId,
        }),
      }, 15000);
      if (!res.ok) throw new Error(await readApiErrorDetail(res, "Failed to send thread reply"));
      threadMessageInput.value = "";
      await loadThreadMessages(true);
      await loadMessages(activeChannelId, false);
    } catch (err) {
      if (err?.name === "AbortError") {
        alert("Thread reply timed out after 15s. Check network/backend and retry.");
      } else {
        alert(err.message || "Failed to send thread reply");
      }
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
      if (!activeChannelId || activeMode !== "server" || activeChannelType !== "text") {
        throw new Error("Files can only be uploaded in server text channels");
      }
      const isImage = String(file.type || "").startsWith("image/");
      const uploadFile = isImage ? await preprocessImageFile(file) : file;
      const labelBase = `Uploading ${uploadFile?.name || file.name || "file"}...`;
      setUploadProgress(true, 0, `${labelBase} 0%`);
      const result = await uploadMessageAttachment(uploadFile, activeChannelId, (pct, loaded, total, computable) => {
        if (computable && pct != null) {
          setUploadProgress(true, pct, `${labelBase} ${Math.round(pct)}%`);
          return;
        }
        const loadedMb = Number(loaded || 0) / (1024 * 1024);
        setUploadProgress(true, 12, `${labelBase} ${loadedMb.toFixed(1)}MB sent`);
      });
      setUploadProgress(true, 100, "Upload complete");
      window.setTimeout(() => setUploadProgress(false), 500);
      const mediaUrl = resolveMediaUrl(result.url);
      const markdown = isImage
        ? `![${file.name}](${mediaUrl})`
        : `[${result.name || file.name}](${mediaUrl})`;
      messageInput.value = messageInput.value.trim()
        ? `${messageInput.value}\n${markdown}`
        : markdown;
      imageUploadInput.value = "";
      messageInput.focus();
    } catch (err) {
      setUploadProgress(false);
      alert(err.message || "File upload failed");
    }
  });
}

// --------------------
// Logout
// --------------------
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    stopTypingNow();
    stopMicSelfTest();
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
  themeToggle.setAttribute("role", "button");
  themeToggle.setAttribute("tabindex", "0");
  themeToggle.setAttribute("title", "Cycle theme mode (light/medium/dark)");
  themeToggle.addEventListener("click", cycleThemeMode);
  themeToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cycleThemeMode();
    }
  });
}

if (settingsBtn && userSettingsModal) {
  settingsBtn.addEventListener("click", () => {
    if (settingsPublicId) settingsPublicId.textContent = currentUser?.public_id || "-";
    if (settingsFriendInviteCode) settingsFriendInviteCode.textContent = buildFriendInviteCode(currentUser);
    if (settingsUsername) settingsUsername.textContent = currentUser?.username || "-";
    if (settingsUsernameColorInput) settingsUsernameColorInput.value = normalizeHexColor(currentUser?.username_color) || "#4f8fcf";
    if (settingsNameEmojiInput) settingsNameEmojiInput.value = currentUser?.name_emoji || "";
    if (settingsCustomStatusInput) settingsCustomStatusInput.value = currentUser?.custom_status || "";
    if (settingsStripUploadMetadataInput) settingsStripUploadMetadataInput.checked = Boolean(currentUser?.strip_upload_metadata);
    if (settingsEmail) settingsEmail.textContent = currentUser?.email || "-";
    if (settingsUserId) settingsUserId.textContent = String(currentUser?.id ?? "-");
    if (settingsCreatedAt) settingsCreatedAt.textContent = formatTimestamp(currentUser?.created_at) || "-";
    if (settingsUpdatedAt) settingsUpdatedAt.textContent = formatTimestamp(currentUser?.updated_at) || "-";
    refreshSettingsAvatarPreview();
    updateAppearanceControlValues();
    updateLabsControlValues();
    updateVoiceControlValues();
    updateMicSelfTestUi();
    applySafeModeState();
    renderThemePresetGrid();
    populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
    refreshPushButtonState();
    setActiveSettingsTab(activeSettingsTab || "profile");
    refreshConnectionsSettingsPanel().catch(() => {});
    applySettingsTooltips(userSettingsModal || document);
    openModal(userSettingsModal);
  });

}

if (settingsCopyFriendInviteBtn) {
  settingsCopyFriendInviteBtn.addEventListener("click", async () => {
    const code = buildFriendInviteCode(currentUser);
    if (!code || code === "-") {
      showToast("Friend invite code unavailable");
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      showToast("Friend invite copied!");
    } catch {
      showToast("Could not copy friend invite");
    }
  });
}

if (messagesPanel) {
  messagesPanel.addEventListener("click", async (event) => {
    const link = event.target.closest("a[href^='#note:']");
    if (!link) return;
    event.preventDefault();
    if (activeMode !== "server" || activeChannelType !== "notes") return;
    const href = link.getAttribute("href") || "";
    const encodedName = href.slice("#note:".length);
    const noteName = decodeURIComponent(encodedName || "").trim();
    if (!noteName) return;
    try {
      await openOrCreateNotesChannelByName(noteName);
    } catch (err) {
      alert(err.message || "Failed to open note");
    }
  });
}

if (settingsOpenTutorialBtn) {
  settingsOpenTutorialBtn.addEventListener("click", () => {
    setTutorialDismissedLocally(false);
    startOnboardingTutorial();
  });
}

if (settingsTestNotificationBtn) {
  settingsTestNotificationBtn.addEventListener("click", async () => {
    const title = "Tavern Notification Test";
    const body = "If you can see this, notification plumbing is working.";
    showToast(`${title}: ${body}`);

    if (isDesktopTauriRuntime()) {
      const shown = await showDesktopNativeNotification(title, body);
      if (!shown) {
        alert("Desktop notification bridge failed. Open DevTools/terminal and check for '[Tavern desktop] invoke failed'.");
      }
      return;
    }

    if (!canUseBrowserNotifications()) {
      alert("Browser notifications are not supported in this browser.");
      return;
    }
    if (!window.isSecureContext) {
      alert("Browser notifications require HTTPS (or localhost).");
      return;
    }

    try {
      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
      if (Notification.permission !== "granted") {
        alert("Browser notification permission is blocked. Enable it in site settings.");
        return;
      }
      const shown = await showBrowserNotification(
        title,
        body,
        `tavern-test-${Date.now()}`,
        "/dashboard"
      );
      if (!shown) {
        alert("Service worker notification could not be created. Check push permission and service worker status.");
      }
    } catch {
      alert("Notification test failed. Check browser/site notification settings.");
    }
  });
}

if (settingsEnablePushBtn) {
  settingsEnablePushBtn.addEventListener("click", async () => {
    if (isDesktopTauriRuntime()) {
      showToast("Desktop client uses desktop notifications instead of web push");
      return;
    }
    try {
      settingsEnablePushBtn.disabled = true;
      settingsEnablePushBtn.textContent = "Enabling...";
      await subscribePushNotifications({ promptPermission: true });
      showToast("Push notifications enabled.");
    } catch (err) {
      alert(err?.message || "Failed to enable push notifications.");
    } finally {
      settingsEnablePushBtn.disabled = false;
      refreshPushButtonState();
    }
  });
}

if (settingsOpenDiagnosticsBtn) {
  settingsOpenDiagnosticsBtn.addEventListener("click", () => {
    toggleRuntimeDiagnosticsPanel().catch((err) => {
      showToast(err?.message || "Failed to open diagnostics");
    });
  });
}

if (settingsRefreshConnectionsBtn) {
  settingsRefreshConnectionsBtn.addEventListener("click", () => {
    refreshConnectionsSettingsPanel().catch(() => {});
  });
}

if (settingsRunNotificationPollBtn) {
  settingsRunNotificationPollBtn.addEventListener("click", async () => {
    await pollNotificationFallback({ force: true });
    refreshConnectionsSettingsPanel().catch(() => {});
    showToast("Notification poll completed");
  });
}

if (settingsResyncRealtimeBtn) {
  settingsResyncRealtimeBtn.addEventListener("click", async () => {
    await syncRealtimeSubscriptions();
    refreshConnectionsSettingsPanel().catch(() => {});
    showToast("Realtime subscriptions synced");
  });
}

if (publicUserProfileDmBtn) {
  publicUserProfileDmBtn.addEventListener("click", () => {
    openDmFromPublicProfileModal().catch(() => {});
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

if (adminSaveSettingsBtn) {
  adminSaveSettingsBtn.addEventListener("click", async () => {
    try {
      adminSaveSettingsBtn.disabled = true;
      const requireRegistrationCode = Boolean(adminRequireRegistrationCodeInput?.checked);
      const updated = await patchAdminSettings({ require_registration_code: requireRegistrationCode });
      renderAdminSettings(updated);
      showToast("Admin settings saved");
    } catch (err) {
      alert(err.message || "Failed to save admin settings");
    } finally {
      adminSaveSettingsBtn.disabled = false;
    }
  });
}

if (adminGenerateRegistrationCodeBtn) {
  adminGenerateRegistrationCodeBtn.addEventListener("click", async () => {
    try {
      adminGenerateRegistrationCodeBtn.disabled = true;
      const created = await createAdminRegistrationCode(String(adminRegistrationCodeNoteInput?.value || ""));
      if (adminRegistrationCodeNoteInput) adminRegistrationCodeNoteInput.value = "";
      const codeValue = String(created?.code || "");
      if (codeValue) {
        navigator.clipboard?.writeText?.(codeValue).catch(() => {});
        window.alert(`One-time registration code:\n\n${codeValue}\n\n(Copied to clipboard if available)`);
      }
      const codes = await fetchAdminRegistrationCodes();
      renderAdminRegistrationCodes(codes);
    } catch (err) {
      alert(err.message || "Failed to generate registration code");
    } finally {
      adminGenerateRegistrationCodeBtn.disabled = false;
    }
  });
}

if (adminRefreshRegistrationCodesBtn) {
  adminRefreshRegistrationCodesBtn.addEventListener("click", async () => {
    try {
      const codes = await fetchAdminRegistrationCodes();
      renderAdminRegistrationCodes(codes);
    } catch (err) {
      alert(err.message || "Failed to refresh registration codes");
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
      const optimized = await optimizeAvatarFile(processed);
      const uploadResult = await uploadUserAvatar(optimized);
      settingsAvatarInput.value = "";
      if (uploadResult?.url && settingsAvatarPreview) {
        settingsAvatarPreview.src = resolveMediaUrl(uploadResult.url);
      } else {
        refreshSettingsAvatarPreview({ bustCache: true });
      }
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

if (settingsClearUsernameColorBtn && settingsUsernameColorInput) {
  settingsClearUsernameColorBtn.addEventListener("click", async () => {
    try {
      settingsClearUsernameColorBtn.disabled = true;
      await saveCurrentUserNameStyle({
        usernameColor: "",
        nameEmoji: normalizeNameEmojiInput(settingsNameEmojiInput?.value || currentUser?.name_emoji || ""),
      });
      settingsUsernameColorInput.value = "#4f8fcf";
      showToast("Name color reset");
      if (activeChannelId && activeChannelType !== "voice" && activeChannelType !== "notes" && activeMode === "server") {
        loadMessages(activeChannelId, false).catch(() => {});
      }
    } catch (err) {
      alert(err?.message || "Failed to reset name color");
    } finally {
      settingsClearUsernameColorBtn.disabled = false;
    }
  });
}

if (settingsSaveNameStyleBtn) {
  settingsSaveNameStyleBtn.addEventListener("click", async () => {
    try {
      settingsSaveNameStyleBtn.disabled = true;
      const usernameColor = normalizeHexColor(settingsUsernameColorInput?.value || "");
      const nameEmoji = normalizeNameEmojiInput(settingsNameEmojiInput?.value || "");
      await saveCurrentUserNameStyle({ usernameColor, nameEmoji });
      if (settingsNameEmojiInput) settingsNameEmojiInput.value = currentUser?.name_emoji || "";
      showToast("Name style saved");
      if (activeChannelId && activeChannelType !== "voice" && activeChannelType !== "notes" && activeMode === "server") {
        loadMessages(activeChannelId, false).catch(() => {});
      }
    } catch (err) {
      alert(err?.message || "Failed to save name style");
    } finally {
      settingsSaveNameStyleBtn.disabled = false;
    }
  });
}

if (settingsSaveCustomStatusBtn) {
  const saveCustomStatusFromSettings = async () => {
    try {
      settingsSaveCustomStatusBtn.disabled = true;
      const customStatus = normalizeCustomStatusInput(settingsCustomStatusInput?.value || "");
      await saveCurrentUserCustomStatus(customStatus);
      if (settingsCustomStatusInput) settingsCustomStatusInput.value = currentUser?.custom_status || "";
      showToast("Custom status saved");
    } catch (err) {
      alert(err?.message || "Failed to save custom status");
    } finally {
      settingsSaveCustomStatusBtn.disabled = false;
    }
  };
  settingsSaveCustomStatusBtn.addEventListener("click", saveCustomStatusFromSettings);
  settingsCustomStatusInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveCustomStatusFromSettings();
  });
}

if (settingsSaveUploadPrivacyBtn) {
  settingsSaveUploadPrivacyBtn.addEventListener("click", async () => {
    try {
      settingsSaveUploadPrivacyBtn.disabled = true;
      const stripMetadata = Boolean(settingsStripUploadMetadataInput?.checked);
      await saveCurrentUserUploadPrivacy(stripMetadata);
      if (settingsStripUploadMetadataInput) settingsStripUploadMetadataInput.checked = Boolean(currentUser?.strip_upload_metadata);
      showToast("Upload privacy saved");
    } catch (err) {
      alert(err?.message || "Failed to save upload privacy");
    } finally {
      settingsSaveUploadPrivacyBtn.disabled = false;
    }
  });
}

if (cameraVoiceBtn) {
  cameraVoiceBtn.addEventListener("click", async () => {
    if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) {
      showToast("Join a voice channel first");
      return;
    }
    try {
      if (isCameraEnabled) {
        stopCameraShare({ notifyPeers: true });
      } else {
        await startCameraShare();
      }
      const selfPeer = peerMeta.get(voiceSelfPeerId);
      if (selfPeer) selfPeer.camera_on = isCameraEnabled;
      renderVoiceUsers();
    } catch (err) {
      showToast(err?.message || "Could not start camera");
    }
  });
}

if (screenVoiceBtn) {
  screenVoiceBtn.addEventListener("click", async () => {
    if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) {
      showToast("Join a voice channel first");
      return;
    }
    try {
      if (isScreenSharing) {
        await stopScreenShare({ notifyPeers: true });
      } else {
        await startScreenShare();
      }
      const selfPeer = peerMeta.get(voiceSelfPeerId);
      if (selfPeer) selfPeer.screen_on = isScreenSharing;
      renderVoiceUsers();
    } catch (err) {
      showToast(err?.message || "Could not share screen");
    }
  });
}

if (linkStreamVoiceBtn) {
  linkStreamVoiceBtn.addEventListener("click", () => {
    if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) {
      showToast("Join a voice channel first");
      return;
    }
    if (sharedLinkStreamUrl) {
      sharedLinkStreamUrl = null;
      renderLocalVoiceVideoTiles();
      sendVoiceState();
      const selfPeer = peerMeta.get(voiceSelfPeerId);
      if (selfPeer) selfPeer.link_stream_url = null;
      updateVoiceMediaButtons();
      showToast("Link stream stopped");
      return;
    }
    const raw = window.prompt("Paste a stream/video URL (direct video, YouTube, Vimeo, or embeddable link):", "");
    if (!raw || !raw.trim()) return;
    const parsed = parseEmbeddableStreamUrl(raw);
    if (!parsed) {
      showToast("Unsupported or invalid link");
      return;
    }
    sharedLinkStreamUrl = raw.trim();
    renderLocalVoiceVideoTiles();
    sendVoiceState();
    const selfPeer = peerMeta.get(voiceSelfPeerId);
    if (selfPeer) selfPeer.link_stream_url = sharedLinkStreamUrl;
    updateVoiceMediaButtons();
    showToast("Link stream shared");
  });
}

if (watchSharesVoiceBtn) {
  watchSharesVoiceBtn.addEventListener("click", () => {
    watchRemoteScreenShares = !watchRemoteScreenShares;
    updateVoiceMediaButtons();
    applyRemoteScreenShareWatchPreference();
    showToast(watchRemoteScreenShares ? "Watching screen shares" : "Screen shares hidden");
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

  const geometry = createCenterWireframeGeometry(appearanceSettings.centerWireframeShape);
  const material = new THREE.MeshBasicMaterial({ color: 0x7f8072, wireframe: true });
  d20Material = material;
  updateD20ThemeColor();
  const d20 = new THREE.Mesh(geometry, material);
  d20Mesh = d20;
  scene.add(d20);

  const cosmicCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x05060a, transparent: true, opacity: 0 })
  );
  cosmicCore.visible = false;
  scene.add(cosmicCore);

  const cosmicRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.92, 0.11, 16, 64),
    new THREE.MeshBasicMaterial({
      color: 0x7f5bff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicRing.rotation.x = 1.15;
  cosmicRing.visible = false;
  scene.add(cosmicRing);
  centerGlowVisualRefs.cosmicRingMaterial = cosmicRing.material;

  const cosmicAccretionRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.08, 0.18, 20, 96),
    new THREE.MeshBasicMaterial({
      color: 0xff9a45,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicAccretionRing.rotation.x = 1.08;
  cosmicAccretionRing.visible = false;
  scene.add(cosmicAccretionRing);
  centerGlowVisualRefs.cosmicAccretionRingMaterial = cosmicAccretionRing.material;

  const cosmicAccretionGlow = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.28, 20, 96),
    new THREE.MeshBasicMaterial({
      color: 0xffc072,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicAccretionGlow.rotation.x = 1.08;
  cosmicAccretionGlow.visible = false;
  scene.add(cosmicAccretionGlow);
  centerGlowVisualRefs.cosmicAccretionGlowMaterial = cosmicAccretionGlow.material;

  const cosmicHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.5, 1.55, 64),
    new THREE.MeshBasicMaterial({
      color: 0x6dc6ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicHalo.visible = false;
  scene.add(cosmicHalo);
  centerGlowVisualRefs.cosmicHaloMaterial = cosmicHalo.material;

  const cosmicInnerGlow = new THREE.Mesh(
    new THREE.RingGeometry(0.22, 0.52, 48),
    new THREE.MeshBasicMaterial({
      color: 0x8dd7ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicInnerGlow.visible = false;
  scene.add(cosmicInnerGlow);
  centerGlowVisualRefs.cosmicInnerGlowMaterial = cosmicInnerGlow.material;

  const cosmicNebula = new THREE.Mesh(
    new THREE.SphereGeometry(1.24, 20, 20),
    new THREE.MeshBasicMaterial({
      color: 0x5ebdff,
      transparent: true,
      opacity: 0,
      wireframe: false,
      blending: THREE.AdditiveBlending,
    })
  );
  cosmicNebula.visible = false;
  scene.add(cosmicNebula);
  centerGlowVisualRefs.cosmicNebulaMaterial = cosmicNebula.material;

  const cosmicDust = new THREE.Group();
  for (let i = 0; i < 18; i += 1) {
    const dust = new THREE.Mesh(
      new THREE.SphereGeometry(0.018 + Math.random() * 0.025, 8, 8),
      new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xffb577 : i % 3 === 1 ? 0x86d6ff : 0xc39cff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      })
    );
    dust.userData.radius = 0.75 + Math.random() * 0.7;
    dust.userData.speed = 0.45 + Math.random() * 0.9;
    dust.userData.phase = Math.random() * Math.PI * 2;
    dust.userData.yDrift = (Math.random() - 0.5) * 0.22;
    cosmicDust.add(dust);
    centerGlowVisualRefs.cosmicDustMaterials.push(dust.material);
  }
  cosmicDust.visible = false;
  scene.add(cosmicDust);
  updateCenterGlowColors();

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
  let d20PointerActive = false;
  let d20PointerTargetX = 0;
  let d20PointerTargetY = 0;
  let d20PointerInfluence = 0;
  let d20PointerDragSpinX = 0;
  let d20PointerDragSpinY = 0;
  let d20PointerLast = null;
  let d20ActivePointerId = null;
  let lastCenterBounceAt = 0;
  const tesseractAngles = {
    xy: 0,
    xz: 0,
    yz: 0,
    xw: 0,
    yw: 0,
    zw: 0,
  };

  function isSettingsPreviewInteractive() {
    return Boolean(userSettingsModal?.classList?.contains("open"));
  }

  function setD20PointerTargetFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
    d20PointerTargetX = Math.max(-1, Math.min(1, x));
    d20PointerTargetY = Math.max(-1, Math.min(1, y));
  }

  function isPointerInsideCenterVisual(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    const x = event.clientX;
    const y = event.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return false;
    const nx = ((x - rect.left) / rect.width) * 2 - 1;
    const ny = ((y - rect.top) / rect.height) * 2 - 1;
    return ((nx * nx) + (ny * ny)) <= 0.92;
  }

  function beginD20PointerInteraction(event) {
    if (!isPointerInsideCenterVisual(event)) return false;
    d20PointerActive = true;
    d20ActivePointerId = event.pointerId;
    d20PointerInfluence = 1;
    d20PointerLast = { x: event.clientX, y: event.clientY };
    canvas.style.cursor = "grabbing";
    setD20PointerTargetFromEvent(event);
    try { canvas.setPointerCapture(event.pointerId); } catch {}
    event.preventDefault();
    return true;
  }

  // Start drag from anywhere in the document when the pointer is inside
  // the center visual footprint. This avoids missing events when UI layers
  // overlap the canvas element.
  document.addEventListener("pointerdown", (event) => {
    beginD20PointerInteraction(event);
  }, { passive: false });

  document.addEventListener("pointermove", (event) => {
    if (!d20PointerActive) return;
    if (d20ActivePointerId != null && event.pointerId !== d20ActivePointerId) return;
    setD20PointerTargetFromEvent(event);
    d20PointerInfluence = 1;
    if (!d20PointerLast) return;
    const dx = event.clientX - d20PointerLast.x;
    const dy = event.clientY - d20PointerLast.y;
    d20PointerLast = { x: event.clientX, y: event.clientY };
    d20PointerDragSpinY += dx * 0.0055;
    d20PointerDragSpinX += dy * 0.0055;
    event.preventDefault();
  }, { passive: false });

  function endD20PointerInteraction(event) {
    if (d20ActivePointerId != null && event && event.pointerId != null && event.pointerId !== d20ActivePointerId) return;
    d20PointerActive = false;
    d20ActivePointerId = null;
    d20PointerLast = null;
    d20PointerTargetX = 0;
    d20PointerTargetY = 0;
    canvas.style.cursor = "grab";
    try {
      if (event && event.pointerId != null) canvas.releasePointerCapture(event.pointerId);
    } catch {}
  }

  document.addEventListener("pointerup", endD20PointerInteraction);
  document.addEventListener("pointercancel", endD20PointerInteraction);
  document.addEventListener("pointerleave", () => {
    if (d20PointerActive) return;
    d20PointerTargetX = 0;
    d20PointerTargetY = 0;
  });

  function triggerCenterVisualBounce() {
    const now = Date.now();
    if (now - lastCenterBounceAt < 120) return;
    lastCenterBounceAt = now;
    const settingsPreviewMode = Boolean(userSettingsModal?.classList?.contains("open"));
    if (!d20.visible) {
      if (!d20BounceEnabled && !settingsPreviewMode) return;
      cosmicAccretionRing.scale.set(1.22, 0.84, 1.22);
      cosmicAccretionGlow.scale.set(1.24, 0.9, 1.24);
      cosmicRing.scale.setScalar(1.08);
      window.setTimeout(() => {
        cosmicAccretionRing.scale.set(1, 1, 1);
        cosmicAccretionGlow.scale.set(1, 1, 1);
        cosmicRing.scale.setScalar(1);
      }, 180);
      return;
    }
    const bounceScale = settingsPreviewMode ? 1.28 : 1.18;
    d20.scale.set(bounceScale, bounceScale, bounceScale);
    window.setTimeout(() => d20.scale.set(1, 1, 1), settingsPreviewMode ? 220 : 180);
  }

  document.addEventListener("click", (event) => {
    if (!d20.visible) return;
    if (event.target === canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = event.clientX;
    const y = event.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;
    const nx = ((x - rect.left) / rect.width) * 2 - 1;
    const ny = ((y - rect.top) / rect.height) * 2 - 1;
    if ((nx * nx) + (ny * ny) > 0.92) return;
    triggerCenterVisualBounce();
  }, true);

  function animate() {
    requestAnimationFrame(animate);
    if (document.getElementById("space-core-layer")) {
      updateSpaceCoreLayerAnchor();
    }
    const cosmicModeEnabled = document.body.classList.contains("fx-cosmic-d20");
    const settingsPreviewMode = isSettingsPreviewInteractive();
    const desiredPointerInfluence = (d20PointerActive || settingsPreviewMode) ? 1 : 0;
    const centerShape = normalizeCenterWireframeShape(appearanceSettings.centerWireframeShape);
    d20PointerInfluence += (desiredPointerInfluence - d20PointerInfluence) * 0.08;
    d20PointerDragSpinX *= 0.955;
    d20PointerDragSpinY *= 0.955;
    if (centerShape === "tesseract") {
      // Rotate in multiple 4D planes, then project into 3D every frame.
      tesseractAngles.xy += (0.0011 * d20SpinMultiplier) + (d20PointerDragSpinY * 0.22);
      tesseractAngles.yz += (0.0014 * d20SpinMultiplier) + (d20PointerDragSpinX * 0.22);
      tesseractAngles.xz += 0.0008 * d20SpinMultiplier;
      tesseractAngles.xw += (0.0022 * d20SpinMultiplier) + (d20PointerTargetX * 0.016 * d20PointerInfluence);
      tesseractAngles.yw += (0.0019 * d20SpinMultiplier) + (d20PointerTargetY * 0.016 * d20PointerInfluence);
      tesseractAngles.zw += 0.0016 * d20SpinMultiplier;
      updateTesseractGeometryProjection(d20.geometry, tesseractAngles);
      d20.rotation.x = 0;
      d20.rotation.y = 0;
      d20.rotation.z = 0;
    } else {
      d20.rotation.x += (0.002 * d20SpinMultiplier) + (d20PointerTargetY * 0.008 * d20PointerInfluence) + d20PointerDragSpinX;
      d20.rotation.y += (0.003 * d20SpinMultiplier) + (d20PointerTargetX * 0.010 * d20PointerInfluence) + d20PointerDragSpinY;
    }
    floatOffset += 0.01 * d20SpinMultiplier;
    d20.position.y = (Math.sin(floatOffset) * 0.2) + (d20PointerTargetY * 0.06 * d20PointerInfluence);
    d20.position.x = d20PointerTargetX * 0.08 * d20PointerInfluence;
    if (cosmicModeEnabled) {
      const pulse = 0.5 + Math.sin(floatOffset * 1.8) * 0.5;
      d20.visible = false;
      cosmicCore.visible = true;
      cosmicRing.visible = true;
      cosmicAccretionRing.visible = true;
      cosmicAccretionGlow.visible = true;
      cosmicHalo.visible = true;
      cosmicInnerGlow.visible = true;
      cosmicNebula.visible = true;
      cosmicDust.visible = true;
      cosmicCore.position.copy(d20.position);
      cosmicRing.position.copy(d20.position);
      cosmicAccretionRing.position.copy(d20.position);
      cosmicAccretionGlow.position.copy(d20.position);
      cosmicHalo.position.copy(d20.position);
      cosmicInnerGlow.position.copy(d20.position);
      cosmicNebula.position.copy(d20.position);
      cosmicDust.position.copy(d20.position);
      cosmicRing.rotation.z += 0.004 * d20SpinMultiplier;
      cosmicAccretionRing.rotation.z -= 0.007 * d20SpinMultiplier;
      cosmicAccretionRing.rotation.y += 0.002 * d20SpinMultiplier;
      cosmicAccretionGlow.rotation.z += 0.0045 * d20SpinMultiplier;
      cosmicAccretionGlow.rotation.y -= 0.0014 * d20SpinMultiplier;
      cosmicNebula.rotation.y += 0.0025 * d20SpinMultiplier;
      cosmicNebula.rotation.x -= 0.0015 * d20SpinMultiplier;
      cosmicDust.rotation.z += 0.0022 * d20SpinMultiplier;
      cosmicHalo.lookAt(camera.position);
      cosmicInnerGlow.lookAt(camera.position);
      cosmicCore.material.opacity = 0.92;
      cosmicRing.material.opacity = 0.1 + pulse * 0.08;
      cosmicAccretionRing.material.opacity = 0.34 + pulse * 0.24;
      cosmicAccretionGlow.material.opacity = 0.14 + pulse * 0.16;
      cosmicHalo.material.opacity = 0.1 + pulse * 0.1;
      cosmicInnerGlow.material.opacity = 0.1 + pulse * 0.15;
      cosmicNebula.material.opacity = 0.035 + pulse * 0.045;
      cosmicRing.scale.setScalar(0.95 + pulse * 0.08);
      cosmicAccretionRing.scale.set(1.05 + pulse * 0.14, 0.72 + pulse * 0.06, 1.05 + pulse * 0.14);
      cosmicAccretionGlow.scale.set(1.14 + pulse * 0.18, 0.8 + pulse * 0.08, 1.14 + pulse * 0.18);
      cosmicHalo.scale.setScalar(1.04 + pulse * 0.12);
      cosmicInnerGlow.scale.setScalar(0.96 + pulse * 0.12);
      cosmicCore.scale.setScalar(0.88 + pulse * 0.05);
      cosmicDust.children.forEach((dust) => {
        const t = floatOffset * dust.userData.speed + dust.userData.phase;
        const r = dust.userData.radius * (0.95 + pulse * 0.08);
        dust.position.set(
          Math.cos(t) * r,
          dust.userData.yDrift + Math.sin(t * 1.7) * 0.06,
          Math.sin(t) * r * 0.6
        );
        dust.material.opacity = 0.18 + pulse * 0.22;
      });
    } else {
      d20.visible = true;
      cosmicCore.visible = false;
      cosmicRing.visible = false;
      cosmicAccretionRing.visible = false;
      cosmicAccretionGlow.visible = false;
      cosmicHalo.visible = false;
      cosmicInnerGlow.visible = false;
      cosmicNebula.visible = false;
      cosmicDust.visible = false;
      d20Material.transparent = false;
      d20Material.opacity = 1;
      updateD20ThemeColor();
    }
    renderer.render(scene, camera);
  }
  animate();

  canvas.addEventListener("click", () => {
    triggerCenterVisualBounce();
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
loadVoiceSettings();
initSortableList(serversPanel, persistServerOrder);
initSortableList(channelsPanel, persistChannelOrder);
initPanelResizer(serversPanelContainer, "servers", 72, 0.35);
initPanelResizer(channelsPanelContainer, "channels", 160, 0.45);
applyStoredTheme();
loadLabsSettings();
applyLabsSettings();
bindAppearanceControls();
bindLabsControls();
bindSettingsMenuControls();
enhanceCustomSelects(document);
applySettingsTooltips(document);
bindVoiceControls();
bindUtilityControls();
updateAppearanceControlValues();
updateLabsControlValues();
updateVoiceControlValues();
setActiveSettingsTab("profile");
updateMicSelfTestUi();
renderLaunchChecklist();
startRealtimeStatusTicker();
runPreflightChecks();
refreshRuntimeMeta();
renderDashboardCacheMeta();
setInterval(refreshRuntimeMeta, 60000);
applySafeModeState();
applyDraftToComposer();
updateRetrySendUi();
renderThemePresetGrid();
populateThemeTemplateEditor(getThemeById(appearanceSettings.themeId));
updateTextVsVoiceUI();
window.addEventListener("resize", () => {
  applyPanelSizes();
  updateMobileNavigationState();
});
updateMobileNavigationState();
applyDesktopRuntimeUiTweaks();
setupDesktopExternalLinkGuard();
if (!isDesktopTauriRuntime()) {
  setupNotificationPermissionPrompt();
  refreshPushButtonState();
  ensurePushSubscriptionHealthy({ silent: true }).catch(() => {});
  startPushHealthChecks();
}
startNotificationFallbackPolling({ resetBaseline: true });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshSessionOnAppResume({ force: true }).catch(() => {});
    maybeNotifyPushPermissionRevoked();
    if (!isDesktopTauriRuntime()) ensurePushSubscriptionHealthy({ silent: true }).catch(() => {});
    startNotificationFallbackPolling();
    pollNotificationFallback({ force: true }).catch(() => {});
  } else {
    // iOS may suspend timers quickly; refresh token right as app backgrounds.
    refreshSessionOnAppResume({ force: true }).catch(() => {});
    stopMicSelfTest();
    startNotificationFallbackPolling();
  }
});
window.addEventListener("focus", () => {
  refreshSessionOnAppResume().catch(() => {});
  maybeNotifyPushPermissionRevoked();
  if (!isDesktopTauriRuntime()) ensurePushSubscriptionHealthy({ silent: true }).catch(() => {});
  pollNotificationFallback({ force: true }).catch(() => {});
});
window.addEventListener("pageshow", () => {
  refreshSessionOnAppResume({ force: true }).catch(() => {});
});
if (!isDesktopTauriRuntime() && "serviceWorker" in navigator) {
  registerPushServiceWorker().catch(() => {});
  navigator.serviceWorker.addEventListener("message", handleServiceWorkerPushMessage);
}
window.addEventListener("beforeunload", () => {
  stopMicSelfTest();
  clearSessionLifecycleTimers();
});
startSessionLifecycle();
loadDashboard();
if (isDesktopTauriRuntime()) {
  desktopWindowLikelyFocused = true;
  window.addEventListener("focus", () => {
    desktopWindowLikelyFocused = true;
  });
  window.addEventListener("blur", () => {
    desktopWindowLikelyFocused = false;
  });
}
window.setTimeout(() => {
  primeDesktopNotificationBridge().catch(() => {});
}, 500);
window.setTimeout(() => {
  maybeCheckDesktopWrapperUpdate().catch(() => {});
}, 1500);
