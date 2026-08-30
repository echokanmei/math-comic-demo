const CACHE_NAME = 'math-comic-demo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/page-1.jpg','./images/page-2.jpg','./images/page-3.jpg','./images/page-4.jpg',
  './images/page-5.jpg','./images/page-6.jpg','./images/page-7.jpg','./images/page-8.jpg',
  './icons/icon-192.png','./icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
