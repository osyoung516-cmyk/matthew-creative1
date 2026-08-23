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
// Use GoatCounter's official visitor-counter renderer rather than a cross-origin fetch.
(() => {
  const todayEl = document.querySelector('#visitor-today');
  const totalEl = document.querySelector('#visitor-total');
  if (!todayEl || !totalEl) return;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd}`;

  const gcStyle = `
    div {
      display: inline !important;
      width: auto !important;
      height: auto !important;
      min-width: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      background: transparent !important;
      color: #aeb5bf !important;
      font: inherit !important;
      line-height: inherit !important;
    }
    #gcvc-for, #gcvc-by { display: none !important; }
    #gcvc-views {
      color: #aeb5bf !important;
      font: inherit !important;
      line-height: inherit !important;
    }
  `;

  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (window.goatcounter && typeof window.goatcounter.visit_count === 'function') {
      clearInterval(timer);
      todayEl.textContent = '';
      totalEl.textContent = '';

      window.goatcounter.visit_count({
        append: '#visitor-today',
        type: 'html',
        path: 'TOTAL',
        start: today,
        no_branding: true,
        style: gcStyle
      });

      window.goatcounter.visit_count({
        append: '#visitor-total',
        type: 'html',
        path: 'TOTAL',
        no_branding: true,
        style: gcStyle
      });
    } else if (tries >= 100) {
      clearInterval(timer);
      todayEl.textContent = '—';
      totalEl.textContent = '—';
    }
  }, 100);
})();
