(function attachSessionHelpers(globalObj) {
  function isPwaMode() {
    const isStandaloneDisplay =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(display-mode: standalone)").matches;
    const isIosStandalone = window.navigator?.standalone === true;
    return Boolean(isStandaloneDisplay || isIosStandalone);
  }

  globalObj.TavernSessionHelpers = {
    isPwaMode,
  };
})(window);
