/* ============================================
   ALI SIGNATURE CONSTRUCTION — MAIN.JS
   ============================================ */

/* ── Mobile burger menu ─────────────────────── */
(function () {
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.textContent = '☰';
    }
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.textContent = '☰';
    });
  });
})();

/* ── Hero image slider ──────────────────────── */
(function () {
  const slides = document.querySelectorAll('.hero .slide');
  if (slides.length < 2) return;

  let current = 0;

  function next() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(next, 5000);
})();

/* ── Active nav link highlight ──────────────── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Sticky nav shadow on scroll ────────────── */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 24px rgba(0,0,0,.6)'
      : 'none';
  }, { passive: true });
})();

/* ── Contact form → mailto ──────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = (document.getElementById('name')?.value    || '').trim();
    const phone   = (document.getElementById('phone')?.value   || '').trim();
    const email   = (document.getElementById('email')?.value   || '').trim();
    const service = (document.getElementById('service')?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    const subject = encodeURIComponent(`Estimate Request – ${service || 'Construction Project'}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${message}`
    );

    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  });
})();

/* ── Scroll-in fade animation ───────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.service-card, .process-step, .partner-card, .inv-feat, .stat, .contact-item'
  );

  if (!targets.length || !('IntersectionObserver' in window)) return;

  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = `opacity .45s ease ${(i % 6) * 60}ms, transform .45s ease ${(i % 6) * 60}ms`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => obs.observe(el));
})();
