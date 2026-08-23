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
// The same service records pageviews and supplies TODAY / TOTAL counts.
(() => {
  const todayEl = document.querySelector('#visitor-today');
  const totalEl = document.querySelector('#visitor-total');
  if (!todayEl || !totalEl) return;

  const counterBase = 'https://osyoung88.goatcounter.com/counter/TOTAL.json';
  const format = (value) => {
    const n = Number(String(value ?? '').replace(/,/g, ''));
    return Number.isFinite(n) ? new Intl.NumberFormat('ko-KR').format(n) : (value || '—');
  };

  // GoatCounter's public visitor-counter endpoint supports start/end date filters.
  // Use the visitor's local calendar date for TODAY; TOTAL has no date filter.
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd}`;

  Promise.allSettled([
    fetch(counterBase, { cache: 'no-store' }).then(r => {
      if (!r.ok) throw new Error(`GoatCounter total: ${r.status}`);
      return r.json();
    }),
    fetch(`${counterBase}?start=${encodeURIComponent(today)}`, { cache: 'no-store' }).then(r => {
      if (!r.ok) throw new Error(`GoatCounter today: ${r.status}`);
      return r.json();
    })
  ]).then(([totalResult, todayResult]) => {
    totalEl.textContent = totalResult.status === 'fulfilled' ? format(totalResult.value.count) : '—';
    todayEl.textContent = todayResult.status === 'fulfilled' ? format(todayResult.value.count) : '—';
  });
})();
