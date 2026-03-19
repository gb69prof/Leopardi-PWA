const CACHE_VERSION = 'v3';
const STATIC_CACHE = `eco-leopardi-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `eco-leopardi-runtime-${CACHE_VERSION}`;
const OFFLINE_FALLBACK = 'offline.html';

const APP_SHELL = [
  'index.html',
  'offline.html',
  'style.css',
  'script.js',
  'glossario.js',
  'manifest.json',
  'quiz.html',
  'video.html',
  'schemi.html',
  'biografia.html',
  'leopardi-romanticismo.html',
  'filosofia.html',
  'sensismo.html',
  'meccanicismo.html',
  'stoicismo.html',
  'pessimismo-storico.html',
  'poetica.html',
  'infinito.html',
  'pessimismo-cosmico.html',
  'presa-coscienza.html',
  'sconforto.html',
  'saffo.html',
  'bruto.html',
  'titanismo.html',
  'conclusione.html',
  'assets/images/bruto.webp',
  'assets/images/filosofia.webp',
  'assets/images/idillio.webp',
  'assets/images/infinito.webp',
  'assets/images/Islandese-Natura.webp',
  'assets/images/leopardi_ritratto.webp',
  'assets/images/leopardi_romanticismo.webp',
  'assets/images/meccanicismo.webp',
  'assets/images/pessimismo-cosmico.webp',
  'assets/images/pessimismo-storico.webp',
  'assets/images/poetica-vago-indefinito.webp',
  'assets/images/saffo.webp',
  'assets/images/sconforto.webp',
  'assets/images/sensismo.webp',
  'assets/images/teoria-visione-suono.webp',
  'assets/images/titanismo.webp',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const req = event.request;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(req);
          return cachedPage || caches.match(OFFLINE_FALLBACK);
        })
    );
    return;
  }

  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(() => {
          if (req.destination === 'document') {
            return caches.match(OFFLINE_FALLBACK);
          }
          return new Response('', { status: 504, statusText: 'Offline' });
        });
    })
  );
});
