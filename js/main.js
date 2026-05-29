/**
 * 설악산유스호스텔 - 공통 JavaScript
 * SYH-WEB-2026-002
 */

'use strict';

/* ============================================================
   다국어 (KO / EN) — data-ko / data-en 방식
   ============================================================ */
let currentLang = localStorage.getItem('syh_lang') || 'ko';

/**
 * 언어 전환 함수
 * - [data-ko] / [data-en] 속성을 가진 모든 요소의 textContent를 교체
 * - img[data-alt-ko] / img[data-alt-en] 속성으로 alt 텍스트도 전환
 * - input[data-placeholder-ko] / input[data-placeholder-en] 지원
 */
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('syh_lang', lang);
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';

  // 텍스트 요소 전환 (data-ko / data-en)
  document.querySelectorAll('[data-ko]').forEach(el => {
    const text = lang === 'ko' ? el.dataset.ko : el.dataset.en;
    if (text !== undefined) {
      // 줄바꿈 또는 HTML 태그 포함 시 innerHTML 사용
      if (text.includes('\n') || text.includes('<')) {
        el.innerHTML = text.replace(/\n/g, '<br>');
      } else {
        el.textContent = text;
      }
    }
  });

  // img alt 텍스트 전환 (data-alt-ko / data-alt-en)
  document.querySelectorAll('img[data-alt-ko]').forEach(img => {
    img.alt = lang === 'ko' ? img.dataset.altKo : (img.dataset.altEn || img.dataset.altKo);
  });

  // input placeholder 전환 (data-placeholder-ko / data-placeholder-en)
  document.querySelectorAll('[data-placeholder-ko]').forEach(el => {
    el.placeholder = lang === 'ko'
      ? el.dataset.placeholderKo
      : (el.dataset.placeholderEn || el.dataset.placeholderKo);
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
      if (href === 'index.html' || href === './' || href === '../index.html') {
        a.classList.add('active');
      }
    }
  });

  // 스크롤 시 navbar 그림자
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.5)'
        : 'none';
    }
  });

  // 언어 토글 버튼 이벤트
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  // 저장된 언어 적용
  applyLang(currentLang);
}

/* ============================================================
   히어로 슬라이더 (fade, 5초 간격)
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
