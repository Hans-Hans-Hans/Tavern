self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {};
  }

  const title = payload.title || "Tavern";
  const body = payload.body || payload.content || "New activity";
  const targetUrl = payload.url || "/dashboard";

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((client) => {
      try {
        client.postMessage({
          type: "push_message",
          payload,
        });
      } catch {
        // Ignore individual client postMessage failures.
      }
    });

    // Always show a user-visible notification for push events.
    // Safari/iOS web push expects push events to produce a visible notification.
    await self.registration.showNotification(title, {
      body,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: payload.tag || `tavern-${Date.now()}`,
      data: {
        url: targetUrl,
      },
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || "/dashboard";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.focus();
          if ("navigate" in client) client.navigate(url);
          return client;
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
