// Custom cursor – direct, no lerp
const cursor = document.getElementById('cursor');
if (cursor && !window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('active');
  });
  document.querySelectorAll('a, button, .project-card, .screenshot-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

// Nav scroll
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Hero portrait parallax
const heroPortrait = document.querySelector('.hero-portrait');
if (heroPortrait) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        heroPortrait.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Detail page hero bg parallax
const heroBg = document.querySelector('.project-hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// General scroll fade-in animations
const animTargets = [
  '.section-eyebrow', '.about-grid', '.contact-left', '.contact-right',
  '.highlight-section h2', '.highlight-section p',
  '.detail-block', '.screenshot-item', '.lifted-split-text', '.lifted-split-img',
  '.nav-projects', '.film-quote', '.project-hero-desc', '.project-hero-links',
  '.project-hero-meta', '.back-link'
];
animTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-in');
    if (i % 4 === 1) el.classList.add('delay-1');
    if (i % 4 === 2) el.classList.add('delay-2');
    if (i % 4 === 3) el.classList.add('delay-3');
  });
});
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Project card stagger animation
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); cardObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  projectCards.forEach(card => cardObserver.observe(card));
}

// Lightbox (traildiary)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.screenshot-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}