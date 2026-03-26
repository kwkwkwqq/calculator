const CACHE_NAME = 'calculator-pwa-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  console.log('[SW] Установка');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Кэшируем файлы');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('[SW] Ошибка кэширования:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Активация');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Удаляем старый кэш:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('[SW] Из кэша:', event.request.url);
              return cachedResponse;
            }
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return new Response('Нет соединения', {
              status: 503,
              statusText: 'Offline'
            });
          });
      })
  );
});