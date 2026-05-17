/* ============================================================
   ALI SIGNATURE CONSTRUCTION — MAIN.JS
   ============================================================ */

/* ── Mobile burger ── */
(function () {
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (!burger || !navLinks) return;
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.textContent = '☰';
    }
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.textContent = '☰';
  }));
})();

/* ── Hero image slider ── */
(function () {
  const slides = document.querySelectorAll('.hero .slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (slides.length < 2) return;
  let current = 0;
  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); clearInterval(timer); timer = setInterval(() => goTo((current + 1) % slides.length), 5000); }));
  let timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
})();

/* ── Active nav link ── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Sticky nav shadow ── */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(0,0,0,.6)' : 'none';
  }, { passive: true });
})();

/* ── Contact form → Formspree ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const FORMSPREE_ID = "YOUR_FORM_ID"; // ← replace with your Formspree ID

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn     = document.getElementById('submitBtn');
    const txtEl   = document.getElementById('submitText');
    const spinEl  = document.getElementById('submitSpinner');
    const success = document.getElementById('successMsg');
    const error   = document.getElementById('errorMsg');
    btn.disabled = true;
    txtEl.style.display  = 'none';
    spinEl.style.display = 'inline';
    error.style.display  = 'none';
    const payload = {
      name:    document.getElementById('fname')?.value.trim(),
      phone:   document.getElementById('fphone')?.value.trim(),
      email:   document.getElementById('femail')?.value.trim(),
      address: document.getElementById('faddress')?.value.trim(),
      service: document.getElementById('fservice')?.value.trim(),
      message: document.getElementById('fmessage')?.value.trim(),
      _subject: 'New Estimate Request — Ali Signature Construction',
    };
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { form.style.display = 'none'; success.style.display = 'block'; }
      else throw new Error();
    } catch {
      error.style.display  = 'block';
      btn.disabled         = false;
      txtEl.style.display  = 'inline';
      spinEl.style.display = 'none';
    }
  });
})();

/* ── Projects filter ── */
(function () {
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('#projectsGrid .project, #projectsGrid .project-cta-card').forEach(card => {
        const cats = card.dataset.cat || 'all';
        card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
      });
    });
  });
})();

/* ── Scroll-in animations ── */
(function () {
  const targets = document.querySelectorAll(
    '.service-card, .process-step, .partner-card, .inv-feat, .stat, .contact-item, .team-member-card, .strip-photo'
  );
  if (!targets.length || !('IntersectionObserver' in window)) return;
  targets.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
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
  }, { threshold: 0.1 });
  targets.forEach(el => obs.observe(el));
})();
