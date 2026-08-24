const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));


const backToTop = document.querySelector('#back-to-top');
backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});

// GoatCounter visitor counter for osyoung88.goatcounter.com.
// Fetch the public JSON counter and render only the number so the footer stays native to the site design.
(() => {
  const todayEl = document.querySelector('#visitor-today');
  const totalEl = document.querySelector('#visitor-total');
  if (!todayEl || !totalEl) return;

  const counterBase = 'https://osyoung88.goatcounter.com/counter/TOTAL.json';
  const formatCount = (value) => {
    const normalized = String(value ?? '').replace(/[\s,\u00a0\u202f]/g, '');
    const n = Number(normalized);
    return Number.isFinite(n) ? new Intl.NumberFormat('ko-KR').format(n) : (value || '—');
  };

  const requestCount = (url, target) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', function () {
      try {
        if (this.status < 200 || this.status >= 300) throw new Error(`HTTP ${this.status}`);
        const data = JSON.parse(this.responseText);
        target.textContent = formatCount(data.count);
      } catch (err) {
        target.textContent = '—';
        console.warn('GoatCounter visitor counter:', err);
      }
    });
    req.addEventListener('error', function () {
      target.textContent = '—';
    });
    req.open('GET', url);
    req.send();
  };

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd}`;

  requestCount(counterBase, totalEl);
  requestCount(`${counterBase}?start=${encodeURIComponent(today)}&end=${encodeURIComponent(today)}`, todayEl);
})();
