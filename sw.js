const CACHE_NAME = 'math-comic-v2';
const ASSETS = [
  './', './index.html', './manifest.json',
  './images/cover.png',
  './images/P01.png','./images/P02.png','./images/P03.png','./images/P04.png','./images/P05.png',
  './images/P06.png','./images/P07.png','./images/P08.png','./images/P09.png','./images/P10.png',
  './content/P01.js','./content/P02.js','./content/P03.js','./content/P04.js','./content/P05.js',
  './content/P06.js','./content/P07.js','./content/P08.js','./content/P09.js','./content/P10.js',
  './images/onboarding/xiaohe.png','./images/onboarding/axing_explain.png',
  './images/onboarding/axing_history.png','./images/onboarding/axing_practice.png',
  './audio/sfx/complete.mp3',
  './icons/icon-192.png','./icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
