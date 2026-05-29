/**
 * 공통 HTML 컴포넌트 인젝션
 * 모든 페이지에서 include
 */

const BASE = (() => {
  const path = window.location.pathname;
  // pages/ 하위 페이지면 '../' 사용
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
      <li><a href="${BASE}index.html" data-i18n="nav_home">홈</a></li>
      <li><a href="${BASE}rooms.html" data-i18n="nav_rooms">객실 안내</a></li>
      <li><a href="${BASE}facilities.html" data-i18n="nav_facilities">시설 안내</a></li>
      <li><a href="${BASE}pricing.html" data-i18n="nav_pricing">요금 안내</a></li>
      <li><a href="${BASE}reservation.html" data-i18n="nav_reservation">예약 안내</a></li>
      <li><a href="${BASE}gallery.html" data-i18n="nav_gallery">갤러리</a></li>
      <li><a href="${BASE}about.html" data-i18n="nav_about">호스텔 소개</a></li>
    </ul>
    <div class="navbar__actions">
      <div class="lang-toggle">
        <button data-lang="ko" class="active">KO</button>
        <button data-lang="en">EN</button>
      </div>
      <a href="${BASE}reservation.html" class="navbar__reserve-btn" data-i18n="nav_reserve_btn">예약하기</a>
      <button class="hamburger" aria-label="메뉴">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="mobile-nav">
  <a href="${BASE}index.html" data-i18n="nav_home">홈</a>
  <a href="${BASE}rooms.html" data-i18n="nav_rooms">객실 안내</a>
  <a href="${BASE}facilities.html" data-i18n="nav_facilities">시설 안내</a>
  <a href="${BASE}pricing.html" data-i18n="nav_pricing">요금 안내</a>
  <a href="${BASE}reservation.html" data-i18n="nav_reservation">예약 안내</a>
  <a href="${BASE}gallery.html" data-i18n="nav_gallery">갤러리</a>
  <a href="${BASE}about.html" data-i18n="nav_about">호스텔 소개</a>
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
        <p class="footer__desc">설악산 국립공원 바로 인근에 자리한 설악산유스호스텔은 배낭여행객부터 가족 단위, 단체 수련회까지 다양한 여행객을 맞이합니다.</p>
        <div class="footer__contact">
          <a href="tel:+821082493453">📞 <span data-i18n="footer_phone">010-8249-3453</span></a>
          <a href="mailto:sorakyhotel@gmail.com">✉️ <span data-i18n="footer_email">sorakyhotel@gmail.com</span></a>
          <a href="#">📍 <span data-i18n="footer_address">강원특별자치도 속초시 청봉로 173</span></a>
        </div>
      </div>
      <div>
        <div class="footer__col-title">바로가기</div>
        <div class="footer__links">
          <a href="${BASE}rooms.html" data-i18n="nav_rooms">객실 안내</a>
          <a href="${BASE}facilities.html" data-i18n="nav_facilities">시설 안내</a>
          <a href="${BASE}pricing.html" data-i18n="nav_pricing">요금 안내</a>
          <a href="${BASE}reservation.html" data-i18n="nav_reservation">예약 안내</a>
          <a href="${BASE}gallery.html" data-i18n="nav_gallery">갤러리</a>
          <a href="${BASE}about.html" data-i18n="nav_about">호스텔 소개</a>
        </div>
      </div>
      <div>
        <div class="footer__col-title">예약 채널</div>
        <div class="footer__links">
          <a href="https://www.yanolja.com" target="_blank" rel="noopener">야놀자</a>
          <a href="https://www.yeogi.com" target="_blank" rel="noopener">여기어때</a>
          <a href="https://www.agoda.com" target="_blank" rel="noopener">아고다</a>
          <a href="https://www.booking.com" target="_blank" rel="noopener">부킹닷컴</a>
          <a href="https://www.hotels.com" target="_blank" rel="noopener">호텔스닷컴</a>
          <a href="https://www.trip.com" target="_blank" rel="noopener">트립닷컴</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright" data-i18n="footer_copyright">© 2026 설악산유스호스텔. All rights reserved.</p>
      <div class="footer__legal">
        <a href="#" data-i18n="footer_privacy">개인정보처리방침</a>
        <a href="${BASE}about.html" data-i18n="footer_sitemap">사이트맵</a>
      </div>
    </div>
  </div>
</footer>
<div class="mobile-cta">
  <div class="mobile-cta__inner">
    <a href="tel:+821082493453" class="mobile-cta__btn mobile-cta__btn--call">
      📞 <span data-i18n="mobile_call">전화 예약</span>
    </a>
    <a href="mailto:sorakyhotel@gmail.com" class="mobile-cta__btn mobile-cta__btn--email">
      ✉️ <span data-i18n="mobile_email">이메일 문의</span>
    </a>
  </div>
</div>
`;

// DOM에 삽입
document.addEventListener('DOMContentLoaded', () => {
  // Navbar
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = NAVBAR_HTML;
  }
  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = FOOTER_HTML;
  }
});
