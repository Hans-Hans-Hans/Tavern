(function () {
  function createPollGate(options = {}) {
    const minIntervalMs = Math.max(0, Number(options.minIntervalMs) || 0);
    let inFlight = false;
    let lastRunAt = 0;
    return {
      start({ force = false } = {}) {
        const now = Date.now();
        if (inFlight) return false;
        if (!force && minIntervalMs > 0 && now - lastRunAt < minIntervalMs) return false;
        inFlight = true;
        lastRunAt = now;
        return true;
      },
      end() {
        inFlight = false;
      },
      getSnapshot() {
        return {
          in_flight: inFlight,
          last_run_at: lastRunAt,
          min_interval_ms: minIntervalMs,
        };
      },
    };
  }

  function createCooldownTaskGate(options = {}) {
    const cooldownMs = Math.max(0, Number(options.cooldownMs) || 0);
    let inFlightPromise = null;
    let lastRunAt = 0;
    return {
      async run(task) {
        if (inFlightPromise) return inFlightPromise;
        const now = Date.now();
        if (cooldownMs > 0 && now - lastRunAt < cooldownMs) return null;
        lastRunAt = now;
        inFlightPromise = (async () => {
          try {
            return await task();
          } finally {
            inFlightPromise = null;
          }
        })();
        return inFlightPromise;
      },
      getSnapshot() {
        return {
          in_flight: Boolean(inFlightPromise),
          last_run_at: lastRunAt,
          cooldown_ms: cooldownMs,
        };
      },
    };
  }

  window.TavernNetworkGates = {
    createPollGate,
    createCooldownTaskGate,
  };
})();
