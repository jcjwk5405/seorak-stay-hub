// 설악산유스호스텔 Service Worker v3.0
const CACHE_NAME = 'seorak-stay-hub-v1';
const BASE_PATH = '/seorak-stay-hub';

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
      return self.skipWaiting(); // 즉시 새 SW 활성화
    })
  );
});

// Activate: 구버전 캐시 전부 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim(); // 열려 있는 탭에도 즉시 적용
    })
  );
});

// Fetch: Network First → Cache Fallback
// HTML/JS/CSS는 항상 네트워크 최신본 우선, 실패 시 캐시 제공
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 이미지는 Cache First (변경 빈도 낮음)
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // HTML / JS / CSS → Network First
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
      }
      return networkResponse;
    }).catch(() => {
      // 네트워크 실패 시 캐시 제공 (오프라인 대비)
      return caches.match(event.request).then((cached) => {
        return cached || caches.match(`${BASE_PATH}/index.html`);
      });
    })
  );
});
