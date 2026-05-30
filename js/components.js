/**
 * 공통 HTML 컴포넌트 인젝션
 * data-ko / data-en 방식 적용
 * SYH-WEB-2026-003
 */

const BASE = (() => {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
})();

const NAVBAR_HTML = `
<nav class="navbar">
  <div class="navbar__inner">
    <a href="${BASE}index.html" class="navbar__logo">
      <span class="navbar__logo-main">설악산유스호스텔</span>
      <span class="navbar__logo-sub">Seorak Youth Hostel</span>
    </a>
    <ul class="navbar__menu">
      <li><a href="${BASE}index.html"
        data-ko="홈" data-en="Home">홈</a></li>
      <li><a href="${BASE}rooms.html"
        data-ko="객실 안내" data-en="Rooms">객실 안내</a></li>
      <li><a href="${BASE}facilities.html"
        data-ko="시설 안내" data-en="Facilities">시설 안내</a></li>
      <li><a href="${BASE}pricing.html"
        data-ko="요금 안내" data-en="Pricing">요금 안내</a></li>
      <li><a href="${BASE}reservation.html"
        data-ko="예약 안내" data-en="Reservation">예약 안내</a></li>
      <li><a href="${BASE}gallery.html"
        data-ko="갤러리" data-en="Gallery">갤러리</a></li>
      <li><a href="${BASE}about.html"
        data-ko="호스텔 소개" data-en="About">호스텔 소개</a></li>
    </ul>
    <div class="navbar__actions">
      <!-- 데스크톱 언어 토글 (768px 이상 표시) -->
      <div class="lang-toggle lang-toggle-desktop">
        <button data-lang="ko" class="active">KO</button>
        <button data-lang="en">EN</button>
      </div>
      <!-- 모바일 언어 토글 (767px 이하 표시, 햄버거 왼쪽) -->
      <div class="lang-toggle lang-toggle-mobile">
        <button data-lang="ko" class="active">KO</button>
        <button data-lang="en">EN</button>
      </div>
      <a href="${BASE}reservation.html" class="navbar__reserve-btn navbar__reserve-btn--desktop"
        data-ko="예약하기" data-en="Book Now">예약하기</a>
      <button class="hamburger" aria-label="메뉴">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-nav">
  <a href="${BASE}index.html"
    data-ko="홈" data-en="Home">홈</a>
  <a href="${BASE}rooms.html"
    data-ko="객실 안내" data-en="Rooms">객실 안내</a>
  <a href="${BASE}facilities.html"
    data-ko="시설 안내" data-en="Facilities">시설 안내</a>
  <a href="${BASE}pricing.html"
    data-ko="요금 안내" data-en="Pricing">요금 안내</a>
  <a href="${BASE}reservation.html"
    data-ko="예약 안내" data-en="Reservation">예약 안내</a>
  <a href="${BASE}gallery.html"
    data-ko="갤러리" data-en="Gallery">갤러리</a>
  <a href="${BASE}about.html"
    data-ko="호스텔 소개" data-en="About">호스텔 소개</a>
  <!-- 햄버거 메뉴 하단 언어 토글 -->
  <div class="mobile-nav__lang">
    <div class="lang-toggle">
      <button data-lang="ko" class="active">KO</button>
      <button data-lang="en">EN</button>
    </div>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__grid">
      <div>
        <div class="footer__logo">설악산유스호스텔</div>
        <p class="footer__desc"
          data-ko="설악산 국립공원 바로 인근에 자리한 설악산유스호스텔은 배낭여행객부터 가족 단위, 단체 수련회까지 다양한 여행객을 맞이합니다."
          data-en="Located right next to Seoraksan National Park, Seorak Youth Hostel welcomes backpackers, families, and group retreats alike.">
          설악산 국립공원 바로 인근에 자리한 설악산유스호스텔은 배낭여행객부터 가족 단위, 단체 수련회까지 다양한 여행객을 맞이합니다.
        </p>
        <div class="footer__contact">
          <a href="tel:+821082493453">📞 010-8249-3453</a>
          <a href="mailto:sorakyhotel@gmail.com">✉️ sorakyhotel@gmail.com</a>
          <a href="#">📍 <span
            data-ko="강원특별자치도 속초시 청봉로 173"
            data-en="173 Cheongbong-ro, Sokcho-si, Gangwon-do">강원특별자치도 속초시 청봉로 173</span></a>
        </div>
      </div>
      <div>
        <div class="footer__col-title"
          data-ko="바로가기" data-en="Quick Links">바로가기</div>
        <div class="footer__links">
          <a href="${BASE}rooms.html"
            data-ko="객실 안내" data-en="Rooms">객실 안내</a>
          <a href="${BASE}facilities.html"
            data-ko="시설 안내" data-en="Facilities">시설 안내</a>
          <a href="${BASE}pricing.html"
            data-ko="요금 안내" data-en="Pricing">요금 안내</a>
          <a href="${BASE}reservation.html"
            data-ko="예약 안내" data-en="Reservation">예약 안내</a>
          <a href="${BASE}gallery.html"
            data-ko="갤러리" data-en="Gallery">갤러리</a>
          <a href="${BASE}about.html"
            data-ko="호스텔 소개" data-en="About">호스텔 소개</a>
        </div>
      </div>
      <div>
        <div class="footer__col-title"
          data-ko="예약 채널" data-en="Book Online">예약 채널</div>
        <div class="footer__links">
          <a href="https://nol.yanolja.com/stay/domestic/10054309" target="_blank" rel="noopener">야놀자</a>
          <a href="https://www.yeogi.com/domestic-accommodations/76184" target="_blank" rel="noopener">여기어때</a>
          <a href="https://www.agoda.com/sorak-y-hostel/hotel/sokcho-si-kr.html" target="_blank" rel="noopener">Agoda</a>
          <a href="https://www.booking.com/hotel/kr/seolagsanyuseuhoseutel.ko.html" target="_blank" rel="noopener">Booking.com</a>
          <a href="https://kr.hotels.com/ho3193386592/seol-agsan-yuseu-hoseutel-sogcho-hangug/" target="_blank" rel="noopener">Hotels.com</a>
          <a href="https://kr.trip.com/hotels/sokcho-si-hotel-detail-21861661/sorak-y-hostel/" target="_blank" rel="noopener">Trip.com</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright"
        data-ko="© 2026 설악산유스호스텔. All rights reserved."
        data-en="© 2026 Seorak Youth Hostel. All rights reserved.">
        © 2026 설악산유스호스텔. All rights reserved.
      </p>
      <div class="footer__legal">
        <a href="#"
          data-ko="개인정보처리방침" data-en="Privacy Policy">개인정보처리방침</a>
        <a href="${BASE}about.html"
          data-ko="사이트맵" data-en="Sitemap">사이트맵</a>
      </div>
    </div>
  </div>
</footer>
<!-- 모바일 하단 고정 CTA 바 (767px 이하) -->
<div class="mobile-cta">
  <div class="mobile-cta__inner">
    <!-- 언어 토글 (왼쪽) -->
    <div class="lang-toggle mobile-cta__lang">
      <button data-lang="ko" class="active">KO</button>
      <button data-lang="en">EN</button>
    </div>
    <a href="tel:+821082493453" class="mobile-cta__btn mobile-cta__btn--call"
      data-ko="📞 전화 예약" data-en="📞 Call Us">📞 전화 예약</a>
    <a href="${BASE}reservation.html" class="mobile-cta__btn mobile-cta__btn--email"
      data-ko="📅 예약 안내" data-en="📅 Book Now">📅 예약 안내</a>
  </div>
</div>
`;

// DOM에 삽입
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = NAVBAR_HTML;
  }
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }
  // 컴포넌트 삽입 후 즉시 한국어 강제 적용
  document.querySelectorAll('[data-ko]').forEach(el => {
    el.textContent = el.getAttribute('data-ko');
  });
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === 'ko');
  });
});

