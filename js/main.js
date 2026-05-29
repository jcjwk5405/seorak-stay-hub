/**
 * 설악산유스호스텔 - 공통 JavaScript
 * SYH-WEB-2026-001
 */

'use strict';

/* ============================================================
   다국어 (KO / EN)
   ============================================================ */
const i18n = {
  ko: {
    nav_home: '홈',
    nav_rooms: '객실 안내',
    nav_facilities: '시설 안내',
    nav_pricing: '요금 안내',
    nav_reservation: '예약 안내',
    nav_gallery: '갤러리',
    nav_about: '호스텔 소개',
    nav_reserve_btn: '예약하기',
    hero_badge: '설악산 국립공원 도보 5분',
    hero_title: '자연 속으로,\n설악산의 품에서',
    hero_subtitle: 'Into Nature, Embrace of Seoraksan',
    hero_checkin: '체크인',
    hero_checkout: '체크아웃',
    hero_guests: '인원',
    hero_btn: '예약 가능 확인',
    trust_rooms: '82실 운영',
    trust_walk: '설악산 도보 5분',
    trust_rating: '아고다 7.9 / 위치 8.6',
    trust_parking: '무료 주차 30대',
    section_rooms: '다양한 객실 타입',
    section_rooms_sub: '설악산 뷰와 함께하는 편안한 휴식',
    section_facilities: '편의 시설 한눈에',
    section_facilities_sub: '투숙객을 위한 다양한 편의시설',
    section_seorak: '설악산이 바로 문 앞에',
    section_seorak_sub: '국립공원, 케이블카, 워터피아 — 모두 가까이',
    section_reviews: '투숙객 생생 후기',
    section_reviews_sub: '실제 투숙객의 솔직한 이야기',
    cta_banner_title: '홈페이지 직접 예약 시 특별 혜택',
    cta_banner_text: 'OTA 대비 5% 추가 할인 + 무료 생수 2병 제공',
    cta_btn: '지금 예약하기',
    section_map: '오시는 길',
    section_map_sub: '강원특별자치도 속초시 청봉로 173',
    map_car: '자가용',
    map_car_desc: '속초IC → 설악동 방면 → 청봉로 173',
    map_bus: '고속버스',
    map_bus_desc: '동서울/서울고속 → 속초터미널 → 버스/택시',
    map_train: 'KTX',
    map_train_desc: '강릉역 → 속초행 시외버스 → 설악동 하차',
    map_walk: '버스정류장',
    map_walk_desc: '도보 1분 거리',
    map_kakao_btn: '카카오맵으로 보기',
    view_detail: '자세히 보기',
    reserve_now: '예약하기',
    call_btn: '전화 예약',
    email_btn: '이메일 문의',
    footer_address: '강원특별자치도 속초시 청봉로 173 (설악동 246-77)',
    footer_phone: '010-8249-3453',
    footer_email: 'sorakyhotel@gmail.com',
    footer_license: '허가번호: 제25-1호',
    footer_copyright: '© 2026 설악산유스호스텔. All rights reserved.',
    footer_privacy: '개인정보처리방침',
    footer_sitemap: '사이트맵',
    mobile_call: '전화 예약',
    mobile_email: '이메일 문의',
    checkin_time: '체크인 15:00 이후',
    checkout_time: '체크아웃 11:00까지',
    front_24h: '프런트 24시간 운영',
  },
  en: {
    nav_home: 'Home',
    nav_rooms: 'Rooms',
    nav_facilities: 'Facilities',
    nav_pricing: 'Pricing',
    nav_reservation: 'Reservation',
    nav_gallery: 'Gallery',
    nav_about: 'About',
    nav_reserve_btn: 'Book Now',
    hero_badge: '5 min walk to Seoraksan National Park',
    hero_title: 'Into Nature,\nEmbrace of Seoraksan',
    hero_subtitle: '자연 속으로, 설악산의 품에서',
    hero_checkin: 'Check-in',
    hero_checkout: 'Check-out',
    hero_guests: 'Guests',
    hero_btn: 'Check Availability',
    trust_rooms: '82 Rooms',
    trust_walk: '5 min to Seoraksan',
    trust_rating: 'Agoda 7.9 / Location 8.6',
    trust_parking: 'Free Parking (30 cars)',
    section_rooms: 'Room Types',
    section_rooms_sub: 'Comfortable rest with Seoraksan views',
    section_facilities: 'Facilities at a Glance',
    section_facilities_sub: 'Various amenities for our guests',
    section_seorak: 'Seoraksan Right at Your Door',
    section_seorak_sub: 'National Park, Cable Car, Waterpia — all nearby',
    section_reviews: 'Guest Reviews',
    section_reviews_sub: 'Honest stories from our guests',
    cta_banner_title: 'Special Benefits for Direct Booking',
    cta_banner_text: '5% discount vs OTA + 2 free water bottles',
    cta_btn: 'Book Now',
    section_map: 'Getting Here',
    section_map_sub: '173 Cheongbong-ro, Seorak-dong, Sokcho-si',
    map_car: 'By Car',
    map_car_desc: 'Sokcho IC → Seorak-dong → Cheongbong-ro 173',
    map_bus: 'By Bus',
    map_bus_desc: 'Seoul → Sokcho Terminal → Bus/Taxi',
    map_train: 'By KTX',
    map_train_desc: 'Gangneung Station → Sokcho Bus → Seorak-dong',
    map_walk: 'Bus Stop',
    map_walk_desc: '1 min walk',
    map_kakao_btn: 'View on Kakao Map',
    view_detail: 'View Details',
    reserve_now: 'Book Now',
    call_btn: 'Call Us',
    email_btn: 'Email Us',
    footer_address: '173 Cheongbong-ro, Seorak-dong, Sokcho-si, Gangwon-do',
    footer_phone: '+82-10-8249-3453',
    footer_email: 'sorakyhotel@gmail.com',
    footer_license: 'License No. 25-1',
    footer_copyright: '© 2026 Seorak Youth Hostel. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_sitemap: 'Sitemap',
    mobile_call: 'Call',
    mobile_email: 'Email',
    checkin_time: 'Check-in: After 15:00',
    checkout_time: 'Check-out: Before 11:00',
    front_24h: '24h Front Desk',
  }
};

let currentLang = localStorage.getItem('syh_lang') || 'ko';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('syh_lang', lang);
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';

  // data-i18n 속성 처리
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = i18n[lang][key];
      } else {
        el.innerHTML = i18n[lang][key].replace(/\n/g, '<br>');
      }
    }
  });

  // 언어 버튼 active 상태
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

/* ============================================================
   네비게이션
   ============================================================ */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // 메뉴 클릭 시 닫기
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // 현재 페이지 active 표시
  const currentPath = window.location.pathname;
  document.querySelectorAll('.navbar__menu a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      a.classList.add('active');
    }
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
      if (href === 'index.html' || href === './') {
        a.classList.add('active');
      }
    }
  });

  // 스크롤 시 navbar 그림자
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.1)'
        : 'none';
    }
  });

  // 언어 토글
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  applyLang(currentLang);
}

/* ============================================================
   히어로 슬라이더
   ============================================================ */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startTimer();
    });
  });

  goTo(0);
  startTimer();
}

/* ============================================================
   리뷰 슬라이더
   ============================================================ */
function initReviewSlider() {
  const track = document.querySelector('.review-slides');
  const dots = document.querySelectorAll('.review-dot');
  const prevBtn = document.querySelector('.review-prev');
  const nextBtn = document.querySelector('.review-next');
  if (!track) return;

  let current = 0;
  const total = dots.length;
  let timer;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); startTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); goTo(i); startTimer(); }));

  goTo(0);
  startTimer();
}

/* ============================================================
   탭 컴포넌트
   ============================================================ */
function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const btns = nav.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const container = nav.closest('.tabs-container') || document;
        container.querySelectorAll('.tab-panel').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-panel') === target);
        });
      });
    });
  });
}

/* ============================================================
   객실 필터
   ============================================================ */
function initRoomFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card[data-type]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      roomCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   객실 상세 슬라이더
   ============================================================ */
function initRoomSliders() {
  document.querySelectorAll('.room-detail__slider').forEach(slider => {
    const track = slider.querySelector('.room-detail__slides');
    const prevBtn = slider.querySelector('.room-prev');
    const nextBtn = slider.querySelector('.room-next');
    if (!track) return;

    const slides = track.querySelectorAll('.room-detail__slide');
    let current = 0;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  });
}

/* ============================================================
   갤러리 라이트박스
   ============================================================ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');

  let images = [];
  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = images[idx].src;
    lightboxImg.alt = images[idx].alt;
    if (lightboxCaption) lightboxCaption.textContent = images[idx].caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateImages() {
    images = [];
    document.querySelectorAll('.gallery-item[data-src]').forEach((item, i) => {
      images.push({
        src: item.getAttribute('data-src'),
        alt: item.getAttribute('data-caption') || '',
        caption: item.getAttribute('data-caption') || ''
      });
      item.addEventListener('click', () => openLightbox(i));
    });
  }

  updateImages();

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => openLightbox((currentIdx - 1 + images.length) % images.length));
  if (nextBtn) nextBtn.addEventListener('click', () => openLightbox((currentIdx + 1) % images.length));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox((currentIdx - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') openLightbox((currentIdx + 1) % images.length);
  });
}

/* ============================================================
   갤러리 필터
   ============================================================ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   FAQ 아코디언
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('open');
      // 모두 닫기
      document.querySelectorAll('.faq-question.open').forEach(oq => {
        oq.classList.remove('open');
        oq.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        q.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

/* ============================================================
   예약 바 날짜 기본값
   ============================================================ */
function initBookingBar() {
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  if (!checkinInput || !checkoutInput) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  function fmt(d) {
    return d.toISOString().split('T')[0];
  }

  checkinInput.min = fmt(tomorrow);
  checkinInput.value = fmt(tomorrow);
  checkoutInput.min = fmt(dayAfter);
  checkoutInput.value = fmt(dayAfter);

  checkinInput.addEventListener('change', () => {
    const ci = new Date(checkinInput.value);
    const co = new Date(ci);
    co.setDate(ci.getDate() + 1);
    checkoutInput.min = fmt(co);
    if (new Date(checkoutInput.value) <= ci) {
      checkoutInput.value = fmt(co);
    }
  });

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = 'reservation.html';
    });
  }
}

/* ============================================================
   Lazy Loading
   ============================================================ */
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  } else {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/* ============================================================
   요금 탭 (성수기/비수기)
   ============================================================ */
function initPricingTabs() {
  const tabs = document.querySelectorAll('.pricing-tab-btn');
  const panels = document.querySelectorAll('.pricing-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-pricing');
      panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-pricing-panel') === target));
    });
  });
}

/* ============================================================
   스크롤 애니메이션
   ============================================================ */
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .facility-item, .seorak-card, .discount-card, .facility-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ============================================================
   PWA 서비스워커 등록
   ============================================================ */
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
}

/* ============================================================
   초기화
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initReviewSlider();
  initTabs();
  initRoomFilter();
  initRoomSliders();
  initLightbox();
  initGalleryFilter();
  initFAQ();
  initBookingBar();
  initLazyLoad();
  initPricingTabs();
  initScrollAnimation();
  initPWA();
});
