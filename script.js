(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.site-nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuBtn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(open)));
  });

  document.querySelectorAll('.site-nav a').forEach((a) => a.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      menuBtn?.focus();
    }
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  const backToTop = document.querySelector('#back-to-top');
  backToTop?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  // Marketing CTA/event tracking across GA4, Umami, and Clarity.
  document.querySelectorAll('[data-analytics-event]').forEach((el) => {
    el.addEventListener('click', () => {
      const eventName = el.dataset.analyticsEvent;
      if (!eventName) return;
      try { window.gtag?.('event', eventName); } catch (_) {}
      try { window.umami?.track?.(eventName); } catch (_) {}
      try { window.clarity?.('event', eventName); } catch (_) {}
    });
  });

  // GoatCounter public visitor counter.
  const todayEl = document.querySelector('#visitor-today');
  const totalEl = document.querySelector('#visitor-total');
  if (todayEl && totalEl) {
    const counterBase = 'https://osyoung88.goatcounter.com/counter/TOTAL.json';
    const formatCount = (value) => {
      const normalized = String(value ?? '').replace(/[\s,\u00a0\u202f]/g, '');
      const n = Number(normalized);
      return Number.isFinite(n) ? new Intl.NumberFormat('ko-KR').format(n) : '—';
    };
    const requestCount = async (url, target) => {
      try {
        const response = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        target.textContent = formatCount(data.count);
      } catch (_) {
        target.textContent = '—';
      }
    };
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    requestCount(counterBase, totalEl);
    requestCount(`${counterBase}?start=${encodeURIComponent(today)}&end=${encodeURIComponent(today)}`, todayEl);
  }
})();
