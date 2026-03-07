(function attachSessionLifecycle(globalObj) {
  function createSessionLifecycleController(options) {
    const showToast = options.showToast;
    const isPwaMode = options.isPwaMode;
    const fetchSessionStatus = options.fetchSessionStatus;
    const refreshSessionStatus = options.refreshSessionStatus;
    const warningMs = Number(options.warningMs || 5 * 60 * 1000);
    const finalWarningMs = Number(options.finalWarningMs || 60 * 1000);
    const MAX_TIMEOUT_MS = 2147483647 - 1000;

    let warningTimer = null;
    let finalWarningTimer = null;
    let refreshTimer = null;
    let started = false;
    let warningShownForExpiryAtMs = 0;
    let finalWarningShownForExpiryAtMs = 0;
    let scheduledExpiryAtMs = 0;

    function clear() {
      if (warningTimer) clearTimeout(warningTimer);
      if (finalWarningTimer) clearTimeout(finalWarningTimer);
      if (refreshTimer) clearTimeout(refreshTimer);
      warningTimer = null;
      finalWarningTimer = null;
      refreshTimer = null;
    }

    function schedule(expiresInSeconds) {
      clear();
      const ms = Math.max(0, Number(expiresInSeconds || 0) * 1000);
      if (!ms) return;
      scheduledExpiryAtMs = Date.now() + ms;

      // Browsers clamp/overflow very large setTimeout delays (~24.8 days).
      // For persistent logins, stage scheduling in chunks until we're within a safe timer window.
      if (ms > MAX_TIMEOUT_MS) {
        refreshTimer = setTimeout(() => {
          const remainingMs = Math.max(0, scheduledExpiryAtMs - Date.now());
          schedule(Math.ceil(remainingMs / 1000));
        }, MAX_TIMEOUT_MS);
        return;
      }

      const warnAt = Math.max(0, ms - warningMs);
      const finalWarnAt = Math.max(0, ms - finalWarningMs);

      if (scheduledExpiryAtMs > warningShownForExpiryAtMs) {
        warningTimer = setTimeout(() => {
          if (scheduledExpiryAtMs <= warningShownForExpiryAtMs) return;
          warningShownForExpiryAtMs = scheduledExpiryAtMs;
          showToast("Session expires soon. Save your draft if needed.");
        }, warnAt);
      }

      if (scheduledExpiryAtMs > finalWarningShownForExpiryAtMs) {
        finalWarningTimer = setTimeout(() => {
          if (scheduledExpiryAtMs <= finalWarningShownForExpiryAtMs) return;
          finalWarningShownForExpiryAtMs = scheduledExpiryAtMs;
          showToast("You may be logged out in about 1 minute.");
        }, finalWarnAt);
      }

      const refreshLeadMs = isPwaMode() ? 2 * 60 * 1000 : 5 * 60 * 1000;
      const refreshAt = Math.max(90 * 1000, ms - refreshLeadMs);
      refreshTimer = setTimeout(async () => {
        try {
          const data = await refreshSessionStatus();
          schedule(data?.expires_in_seconds);
        } catch {
          // Ignore refresh failures; warning timers still cover expiry.
        }
      }, refreshAt);
    }

    async function start() {
      if (started) return;
      started = true;
      try {
        const data = await fetchSessionStatus();
        schedule(data?.expires_in_seconds);
      } catch {
        // Ignore session introspection failures.
      }
    }

    return {
      clear,
      schedule,
      start,
    };
  }

  globalObj.TavernSessionLifecycle = {
    createSessionLifecycleController,
  };
})(window);
