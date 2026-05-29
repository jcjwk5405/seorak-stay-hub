// 설악산유스호스텔 Service Worker v2.0
const CACHE_NAME = 'seorak-hostel-v2';
const BASE_PATH = '/seorak-hostel';

const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/rooms.html`,
  `${BASE_PATH}/gallery.html`,
  `${BASE_PATH}/pricing.html`,
  `${BASE_PATH}/reservation.html`,
  `${BASE_PATH}/facilities.html`,
  `${BASE_PATH}/about.html`,
  `${BASE_PATH}/css/style.css`,
  `${BASE_PATH}/js/main.js`,
  `${BASE_PATH}/js/components.js`,
  `${BASE_PATH}/manifest.json`,
  // 이미지 (영문 파일명)
  `${BASE_PATH}/images/exterior-01.png`,
  `${BASE_PATH}/images/exterior-05.png`,
  `${BASE_PATH}/images/lobby-01.jpeg`,
  `${BASE_PATH}/images/front-desk-01.jpeg`,
  `${BASE_PATH}/images/room-bed-01.png`,
  `${BASE_PATH}/images/room-bed-02.png`,
  `${BASE_PATH}/images/room-bed-03.png`,
  `${BASE_PATH}/images/room-bed-04.jpg`,
  `${BASE_PATH}/images/room-bed-05.jpg`,
  `${BASE_PATH}/images/room-bed-06.jpeg`,
  `${BASE_PATH}/images/room-interior-18.png`,
  `${BASE_PATH}/images/ondol-01.jpeg`,
  `${BASE_PATH}/images/ondol-03.jpg`,
  `${BASE_PATH}/images/ondol-04.png`,
  `${BASE_PATH}/images/ondol-05.png`,
  `${BASE_PATH}/images/hall-03.jpeg`,
  `${BASE_PATH}/images/outdoor-06.jpeg`,
  `${BASE_PATH}/images/icon-192.png`,
  `${BASE_PATH}/images/icon-512.png`
];

// Install: 정적 에셋 캐시
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: 구버전 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: Cache First → Network Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match(`${BASE_PATH}/index.html`);
        }
      });
    })
  );
});
