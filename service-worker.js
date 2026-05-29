// 설악산유스호스텔 Service Worker v1.0
const CACHE_NAME = 'seorak-hostel-v1';
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
  // 이미지
  `${BASE_PATH}/images/건물외관_01_1024x768.png`,
  `${BASE_PATH}/images/외관_05_598x399.png`,
  `${BASE_PATH}/images/로비_01_968x607.jpeg`,
  `${BASE_PATH}/images/프론트_339x206.jpeg`,
  `${BASE_PATH}/images/침대1_1280x1024.png`,
  `${BASE_PATH}/images/침대_4.jpg`,
  `${BASE_PATH}/images/침대_5.jpg`,
  `${BASE_PATH}/images/침대_6.jpeg`,
  `${BASE_PATH}/images/침대2_15_696x392.png`,
  `${BASE_PATH}/images/침대3_17_696x392.png`,
  `${BASE_PATH}/images/객실_18_696x392.png`,
  `${BASE_PATH}/images/온돌_05.png`,
  `${BASE_PATH}/images/온돌1_06_375x250.jpeg`,
  `${BASE_PATH}/images/온돌3.jpg`,
  `${BASE_PATH}/images/온돌4_16_696x392.png`,
  `${BASE_PATH}/images/강당_03_339x206.jpeg`,
  `${BASE_PATH}/images/기타_06_339x206.jpeg`
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
  // POST 요청은 캐시 제외
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // 유효한 응답만 캐시에 저장
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // 오프라인 폴백
        if (event.request.destination === 'document') {
          return caches.match(`${BASE_PATH}/index.html`);
        }
      });
    })
  );
});
