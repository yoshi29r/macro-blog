/* =====================================================
   Rose Macro Insights — Main JavaScript
   ===================================================== */

// ── NAV: scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── NAV: burger dropdown ──
const burger = document.getElementById('burger');
const dropdown = document.getElementById('nav-dropdown');

function positionDropdown() {
  const rect = burger.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px';
}

burger.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('open');
  burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    positionDropdown();
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

window.addEventListener('resize', () => {
  if (dropdown.classList.contains('open')) positionDropdown();
});

// Close dropdown when clicking a link inside it
dropdown.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    dropdown.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    dropdown.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ── SUBSCRIBE FORM ──
const form = document.getElementById('subscribe-form');
const successMsg = document.getElementById('subscribe-success');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    successMsg.style.display = 'block';
  });
}

// ── BLOG FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const filter = btn.dataset.filter;
      blogCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.card, .theme-card, .featured__card, .about__inner, .pull-quote, .blog-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 3) * 0.07}s`;
  observer.observe(el);
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
