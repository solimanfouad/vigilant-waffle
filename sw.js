const C="media-pwa-v5";
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(["./","./index.html","./manifest.webmanifest","./icon.svg"])));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== C && caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(x => x || fetch(e.request))));
