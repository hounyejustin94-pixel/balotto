// Nom du cache
const CACHE_NAME = 'balotto-cache-v1';

// Liste des fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',      // si tu sépares ton CSS
  '/script.js',      // si tu sépares ton JS
  '/assets/logo.png',
  '/assets/logo-192.png',
  '/assets/logo-512.png',
  '/screen1.png',
  '/screen2.png'
];

// Installation du service worker et mise en cache des fichiers
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activation du service worker et nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME){
            console.log('[SW] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interception des requêtes et réponse depuis le cache si offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si trouvé dans le cache, retourne le cache
        if(response) return response;
        // Sinon, fetch normalement
        return fetch(event.request)
          .then(fetchResponse => {
            // Mise en cache de la nouvelle requête pour la prochaine fois
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          });
      })
      .catch(() => {
        // Optionnel : tu peux renvoyer une page offline spécifique
        return caches.match('/index.html');
      })
  );
});
