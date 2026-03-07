(function attachNotificationHelpers(globalObj) {
  function canUseBrowserNotifications() {
    return typeof window !== "undefined" && "Notification" in window;
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function isBrowserFocusedForNotifications() {
    // Treat any visible tab/app as foreground for in-app notifications.
    return !document.hidden && document.visibilityState === "visible" && document.hasFocus();
  }

  globalObj.TavernNotificationHelpers = {
    canUseBrowserNotifications,
    urlBase64ToUint8Array,
    isBrowserFocusedForNotifications,
  };
})(window);
