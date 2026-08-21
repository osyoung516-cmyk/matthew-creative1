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
