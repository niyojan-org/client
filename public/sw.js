/* ================================
   PUSH EVENT
================================ */

self.addEventListener("push", event => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: {
        // always store RELATIVE url
        url: data.url || "/",
      },
    })
  );
});

/* ================================
   NOTIFICATION CLICK
================================ */

self.addEventListener("notificationclick", event => {
  event.notification.close();

  // Convert relative URL → absolute URL
  const relativeUrl = event.notification.data.url || "/";
  const targetUrl = new URL(relativeUrl, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {

        // 🔁 Focus existing tab if already open
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }

        // 🚀 Otherwise open new tab
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
