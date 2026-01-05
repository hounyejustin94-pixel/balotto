const CACHE_NAME = 'balotto-cache-v1';
const urlsToCache = [
  '/',
  '/balotto/index.html',
  '/balotto/assets/logo.png',
  '/balotto/assets/icon-192.png',
  '/balotto/assets/icon-512.png',
  '/balotto/assets/screen1.png',
  '/balotto/assets/screen2.png',
  '/balotto/style.css',   // si tu sépares ton CSS
  '/balotto/app.js'       // si tu sépares ton JS
];

// Installer le SW et mettre en cache les ressources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activer le SW et nettoyer l’ancien cache si besoin
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Intercepter les requêtes et servir depuis le cache si disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
