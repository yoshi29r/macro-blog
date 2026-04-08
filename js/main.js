/* =====================================================
   Rose Macro Insights — Main JavaScript
   ===================================================== */

// ── NAV: scroll effect & burger ──
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  // animate burger lines
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ── SUBSCRIBE FORM ──
const form = document.getElementById('subscribe-form');
const successMsg = document.getElementById('subscribe-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input[type="email"]');
  if (!input.value) return;
  // Simulate subscription
  form.style.display = 'none';
  successMsg.style.display = 'block';
});

// ── SCROLL FADE-IN ANIMATION ──
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to key elements
const animatedEls = document.querySelectorAll(
  '.card, .theme-card, .featured__card, .about__inner, .pull-quote'
);
animatedEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  observer.observe(el);
});

// ── SMOOTH ANCHOR SCROLL (with nav offset) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
