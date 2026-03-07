(function attachRuntimeDiagnostics(globalObj) {
  let panelEl = null;
  let contentEl = null;
  let visible = false;

  function ensurePanel() {
    if (panelEl && panelEl.isConnected) return;
    panelEl = document.createElement("div");
    panelEl.id = "runtime-diagnostics-panel";
    panelEl.style.position = "fixed";
    panelEl.style.right = "12px";
    panelEl.style.bottom = "12px";
    panelEl.style.width = "min(92vw, 520px)";
    panelEl.style.maxHeight = "70vh";
    panelEl.style.overflow = "auto";
    panelEl.style.background = "rgba(12, 15, 20, 0.96)";
    panelEl.style.color = "#e8eef7";
    panelEl.style.border = "1px solid rgba(255,255,255,0.12)";
    panelEl.style.borderRadius = "12px";
    panelEl.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)";
    panelEl.style.padding = "10px";
    panelEl.style.zIndex = "99999";
    panelEl.style.font = "12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    panelEl.style.display = "none";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.gap = "8px";
    header.style.marginBottom = "8px";

    const title = document.createElement("strong");
    title.textContent = "Runtime Diagnostics";
    title.style.fontSize = "13px";
    header.appendChild(title);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Close";
    closeBtn.style.border = "1px solid rgba(255,255,255,0.15)";
    closeBtn.style.background = "rgba(255,255,255,0.05)";
    closeBtn.style.color = "inherit";
    closeBtn.style.borderRadius = "8px";
    closeBtn.style.padding = "4px 8px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => hide());
    header.appendChild(closeBtn);

    contentEl = document.createElement("pre");
    contentEl.style.whiteSpace = "pre-wrap";
    contentEl.style.wordBreak = "break-word";
    contentEl.style.margin = "0";
    contentEl.textContent = "Loading...";

    panelEl.appendChild(header);
    panelEl.appendChild(contentEl);
    document.body.appendChild(panelEl);
  }

  function show() {
    ensurePanel();
    visible = true;
    panelEl.style.display = "block";
  }

  function hide() {
    visible = false;
    if (panelEl) panelEl.style.display = "none";
  }

  async function toggle(options) {
    ensurePanel();
    if (visible) {
      hide();
      return;
    }
    show();
    contentEl.textContent = "Loading diagnostics...";
    const getSnapshot = options?.getSnapshot;
    const loadServerHealth = options?.loadServerHealth;
    const client = typeof getSnapshot === "function" ? await Promise.resolve(getSnapshot()) : {};
    let health = null;
    let healthError = null;
    if (typeof loadServerHealth === "function") {
      try {
        health = await loadServerHealth();
      } catch (err) {
        healthError = err?.message || String(err);
      }
    }
    contentEl.textContent = JSON.stringify({
      client,
      server_health: health,
      server_health_error: healthError,
    }, null, 2);
  }

  globalObj.TavernRuntimeDiagnostics = {
    toggle,
    hide,
  };
})(window);
