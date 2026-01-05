const CACHE_NAME = "balotto-cache-v1";
const urlsToCache = [
  "/balotto/index.html",
  "/balotto/assets/logo.png",
  "/balotto/assets/icon-192.png",
  "/balotto/assets/icon-512.png",
  "/balotto/assets/screen1.png",
  "/balotto/assets/screen2.png",
  "/balotto/assets/style.css" // si tu mets ton CSS séparé
];

// Installation et cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch pour servir depuis le cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
