// DOM ready
document.addEventListener('DOMContentLoaded', () => {

  // Typing effect for hero
  const typedEl = document.getElementById('typed');
  const words = ['DevOps Engineer', 'Azure • CI/CD • Automation', 'Infrastructure as Code'];
  let w = 0, i = 0, forward = true;

  function type() {
    if (!typedEl) return;
    let current = words[w];
    typedEl.textContent = current.substring(0, i);
    if (forward) {
      i++;
      if (i > current.length) {
        forward = false;
        setTimeout(type, 900);
        return;
      }
    } else {
      i--;
      if (i < 0) {
        forward = true;
        w = (w + 1) % words.length;
      }
    }
    setTimeout(type, forward ? 120 : 50);
  }
  type();

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Smooth scroll and active nav using IntersectionObserver
  const sections = document.querySelectorAll('main section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Smooth click behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const t = document.querySelector(href);
        if (t) t.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

});
