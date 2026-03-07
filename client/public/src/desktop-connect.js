(() => {
  const STORAGE_KEY = "tavern.desktopServerUrl";
  const input = document.getElementById("server-url-input");
  const connectBtn = document.getElementById("connect-btn");
  const openSavedBtn = document.getElementById("open-saved-btn");
  const clearSavedBtn = document.getElementById("clear-saved-btn");
  const openWebLoginBtn = document.getElementById("open-web-login-btn");
  const savedLine = document.getElementById("saved-line");
  const errorBox = document.getElementById("error-box");

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = String(message || "Invalid server URL");
    errorBox.style.display = "block";
  }

  function clearError() {
    if (!errorBox) return;
    errorBox.textContent = "";
    errorBox.style.display = "none";
  }

  function normalizeServerOrigin(raw) {
    const value = String(raw || "").trim();
    if (!value) throw new Error("Enter a server URL.");
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error("Server URL must include http:// or https://");
    }
    if (!/^https?:$/i.test(url.protocol)) {
      throw new Error("Only http:// and https:// URLs are supported.");
    }
    return url.origin;
  }

  function setSavedServer(origin) {
    localStorage.setItem(STORAGE_KEY, origin);
    renderSavedServer();
  }

  function getSavedServer() {
    return String(localStorage.getItem(STORAGE_KEY) || "").trim();
  }

  function renderSavedServer() {
    if (!savedLine) return;
    const saved = getSavedServer();
    if (!saved) {
      savedLine.hidden = true;
      savedLine.innerHTML = "";
      return;
    }
    savedLine.hidden = false;
    savedLine.innerHTML = `Saved server: <code>${saved}</code>`;
    if (input && !String(input.value || "").trim()) input.value = saved;
  }

  function openTavernWithServer(origin) {
    // In the desktop wrapper, load the server-hosted app directly so auth/cookies
    // stay same-origin and work like the browser version.
    window.location.href = `${origin}/`;
  }

  function handleConnect() {
    clearError();
    try {
      const origin = normalizeServerOrigin(input?.value || "");
      setSavedServer(origin);
      openTavernWithServer(origin);
    } catch (err) {
      showError(err?.message || "Could not use that server URL.");
    }
  }

  connectBtn?.addEventListener("click", handleConnect);
  input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handleConnect();
  });

  openSavedBtn?.addEventListener("click", () => {
    clearError();
    const saved = getSavedServer();
    if (!saved) {
      showError("No saved server URL yet.");
      return;
    }
    openTavernWithServer(saved);
  });

  clearSavedBtn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderSavedServer();
    clearError();
  });

  openWebLoginBtn?.addEventListener("click", () => {
    clearError();
    const saved = getSavedServer();
    if (saved) {
      openTavernWithServer(saved);
      return;
    }
    window.location.href = "index.html";
  });

  renderSavedServer();
})();
