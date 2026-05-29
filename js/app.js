// ══════════════════════════════════════════════
// 설악산유스호스텔 PWA — app.js
// ══════════════════════════════════════════════

// ── Service Worker Registration ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ── PWA Install Prompt ──
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    const toast = document.getElementById('installToast');
    if (toast) toast.classList.add('show');
  }, 3000);
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  }
  closeInstallToast();
}

function closeInstallToast() {
  const toast = document.getElementById('installToast');
  if (toast) toast.classList.remove('show');
}

// ── Navigation Scroll Effect ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile Navigation Toggle ──
function toggleNav() {
  const menu = document.getElementById('mobileMenu');
  const bars = document.querySelectorAll('.nav-toggle span');
  if (menu) {
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  }
}

// Close mobile menu on link click
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
  });
});

// ── Intersection Observer for Fade Animations ──
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(el => observer.observe(el));
}

// ── Active Nav Link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && (href === currentPage || href.includes(currentPage))) {
    a.classList.add('active');
  }
});

// ── Tab System ──
function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panels[i].classList.add('active');
    });
  });
}
document.querySelectorAll('[data-tabs]').forEach(el => initTabs(el.id));

// ── Hero Canvas Mountain Animation ──
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], stars = [];
  let animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initScene();
  }

  function initScene() {
    // Stars
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.6,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.7 + 0.2,
      tw: Math.random() * Math.PI * 2
    }));
    // Floating particles
    particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * W, y: H * 0.4 + Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1,
      r: Math.random() * 2 + 1, a: Math.random() * 0.4 + 0.1, life: 1
    }));
  }

  function drawMountain(ctx, W, H) {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#03091a');
    sky.addColorStop(0.5, '#0a1628');
    sky.addColorStop(1, '#122040');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Moon glow
    const moonX = W * 0.75, moonY = H * 0.18;
    const glow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 120);
    glow.addColorStop(0, 'rgba(200,168,75,0.15)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Moon
    ctx.beginPath();
    ctx.arc(moonX, moonY, 22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,168,75,0.85)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(moonX + 8, moonY - 4, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#07112a';
    ctx.fill();

    // Background mountains (far)
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H * 0.55);
    ctx.lineTo(W * 0.1, H * 0.35);
    ctx.lineTo(W * 0.22, H * 0.52);
    ctx.lineTo(W * 0.32, H * 0.28);
    ctx.lineTo(W * 0.45, H * 0.48);
    ctx.lineTo(W * 0.55, H * 0.32);
    ctx.lineTo(W * 0.65, H * 0.42);
    ctx.lineTo(W * 0.78, H * 0.22);
    ctx.lineTo(W * 0.88, H * 0.38);
    ctx.lineTo(W, H * 0.44);
    ctx.lineTo(W, H);
    ctx.closePath();
    const mtnFar = ctx.createLinearGradient(0, H * 0.2, 0, H);
    mtnFar.addColorStop(0, '#1a3358');
    mtnFar.addColorStop(1, '#0f1f3a');
    ctx.fillStyle = mtnFar;
    ctx.fill();

    // Snow caps far
    [[W * 0.32, H * 0.28], [W * 0.55, H * 0.32], [W * 0.78, H * 0.22]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.moveTo(px - 14, py + 16);
      ctx.lineTo(px, py);
      ctx.lineTo(px + 14, py + 16);
      ctx.fillStyle = 'rgba(200,168,75,0.25)';
      ctx.fill();
    });

    // Foreground mountains
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H * 0.72);
    ctx.lineTo(W * 0.08, H * 0.58);
    ctx.lineTo(W * 0.18, H * 0.68);
    ctx.lineTo(W * 0.3, H * 0.48);
    ctx.lineTo(W * 0.42, H * 0.62);
    ctx.lineTo(W * 0.52, H * 0.44);
    ctx.lineTo(W * 0.62, H * 0.6);
    ctx.lineTo(W * 0.72, H * 0.5);
    ctx.lineTo(W * 0.82, H * 0.62);
    ctx.lineTo(W, H * 0.55);
    ctx.lineTo(W, H);
    ctx.closePath();
    const mtnNear = ctx.createLinearGradient(0, H * 0.4, 0, H);
    mtnNear.addColorStop(0, '#0d1e3a');
    mtnNear.addColorStop(1, '#060e1c');
    ctx.fillStyle = mtnNear;
    ctx.fill();

    // Main peak snow caps
    [[W * 0.3, H * 0.48], [W * 0.52, H * 0.44], [W * 0.72, H * 0.5]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.moveTo(px - 18, py + 20);
      ctx.lineTo(px, py);
      ctx.lineTo(px + 18, py + 20);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fill();
    });

    // Forest silhouette
    ctx.fillStyle = '#04090f';
    for (let i = 0; i < W; i += 10) {
      const h = 20 + Math.random() * 30;
      const bx = i + 5;
      const by = H * 0.82 + (Math.sin(i * 0.05) * 10);
      ctx.beginPath();
      ctx.moveTo(bx - 5, by);
      ctx.lineTo(bx, by - h);
      ctx.lineTo(bx + 5, by);
      ctx.fill();
    }
    // Ground
    ctx.fillRect(0, H * 0.88, W, H * 0.12);
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawMountain(ctx, W, H);
    t += 0.008;

    // Stars twinkle
    stars.forEach(s => {
      s.tw += 0.02;
      const alpha = s.a * (0.7 + 0.3 * Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${alpha})`;
      ctx.fill();
    });

    // Particles (fireflies)
    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(t + i) * 0.3;
      p.y += p.vy;
      p.a -= 0.003;
      if (p.a <= 0 || p.y < H * 0.3) {
        particles[i] = { x: Math.random() * W, y: H * 0.85, vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1, r: Math.random() * 2 + 1, a: 0.4 };
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${Math.max(0, p.a)})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animate();
}

// ── Date Input defaults ──
function initDates() {
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (!checkin || !checkout) return;
  const today = new Date();
  const tmr = new Date(today); tmr.setDate(tmr.getDate() + 1);
  const dat2 = new Date(today); dat2.setDate(dat2.getDate() + 2);
  checkin.min = today.toISOString().split('T')[0];
  checkin.value = tmr.toISOString().split('T')[0];
  checkout.min = dat2.toISOString().split('T')[0];
  checkout.value = dat2.toISOString().split('T')[0];
  checkin.addEventListener('change', () => {
    const d = new Date(checkin.value); d.setDate(d.getDate() + 1);
    checkout.min = d.toISOString().split('T')[0];
    if (new Date(checkout.value) <= new Date(checkin.value)) {
      checkout.value = d.toISOString().split('T')[0];
    }
  });
}

// ── Search handler ──
function handleSearch(e) {
  if (e) e.preventDefault();
  const checkin = document.getElementById('checkin')?.value;
  const checkout = document.getElementById('checkout')?.value;
  const guests = document.getElementById('guests')?.value || '2';
  if (checkin && checkout) {
    const params = new URLSearchParams({ checkin, checkout, guests });
    window.location.href = `pages/reservation.html?${params.toString()}`;
  }
}

// ── Reservation form submission ──
function handleReservation(e) {
  e.preventDefault();
  const name = document.getElementById('resName')?.value;
  const roomType = document.getElementById('resRoom')?.value;
  if (name && roomType) {
    showModal(`
      <div style="text-align:center; padding: 12px 0;">
        <div style="font-size:3rem; margin-bottom:16px;">✅</div>
        <h3 style="color:var(--gold); margin-bottom:12px; font-family:'Noto Serif KR',serif;">예약이 접수되었습니다!</h3>
        <p style="color:rgba(255,255,255,0.75); font-size:0.9rem; line-height:1.7;">
          <strong style="color:var(--cream);">${name}</strong> 고객님,<br>
          예약이 성공적으로 접수되었습니다.<br><br>
          입력하신 이메일/연락처로<br>확인 메시지를 발송해 드립니다.<br><br>
          예약 확인 및 문의사항은<br>📞 033-636-XXXX 로 연락해 주세요.
        </p>
      </div>
    `);
  }
}

// ── Modal ──
function showModal(html) {
  let modal = document.getElementById('globalModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.style.cssText = `
      position:fixed; inset:0; z-index:3000;
      display:flex; align-items:center; justify-content:center;
      background:rgba(0,0,0,0.7); backdrop-filter:blur(8px);
      padding:24px;
    `;
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="
      background:var(--navy-mid);
      border:1px solid var(--gold);
      border-radius:20px;
      padding:40px;
      max-width:420px;
      width:100%;
      position:relative;
      animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
    ">
      <style>@keyframes modalIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }</style>
      <button onclick="closeModal()" style="
        position:absolute; top:16px; right:16px;
        background:rgba(255,255,255,0.1); border:none; border-radius:50%;
        width:32px; height:32px; cursor:pointer; color:rgba(255,255,255,0.7);
        font-size:1rem; display:flex; align-items:center; justify-content:center;
      ">✕</button>
      ${html}
      <button onclick="closeModal()" class="btn btn-primary" style="width:100%; margin-top:24px; justify-content:center;">확인</button>
    </div>
  `;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('globalModal');
  if (modal) modal.style.display = 'none';
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Init all on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initDates();
  document.querySelectorAll('[data-tabs]').forEach(el => initTabs(el.id));
});
