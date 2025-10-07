// Smooth scroll + active nav + small typed effect + mobile nav toggle

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksWrap = document.querySelector('.nav-links');
  if (menuToggle){
    menuToggle.addEventListener('click', () => {
      navLinksWrap.classList.toggle('open');
    });
  }

  // Smooth scroll & active link
  const links = document.querySelectorAll('a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('main section, #home'));

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if (navLinksWrap.classList.contains('open')) navLinksWrap.classList.remove('open');
      }
    });
  });

  // IntersectionObserver for active nav highlight
  const navLinks = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    });
  }, {root:null, threshold: 0.45});

  sections.forEach(s => io.observe(s));

  // Simple typing effect (non-blocking)
  const el = document.getElementById('typed');
  const words = ['DevOps Engineer', 'Azure • CI/CD • Automation', 'Infrastructure as Code', 'Cloud Security Enthusiast'];
  let w = 0, i = 0, forward = true;
  function type(){
    if (!el) return;
    const word = words[w];
    el.textContent = word.substring(0, i);
    if (forward){
      if (i++ === word.length){ forward = false; setTimeout(type, 900); return; }
    } else {
      if (i-- === 0){ forward = true; w = (w+1) % words.length; }
    }
    setTimeout(type, forward ? 100 : 60);
  }
  type();
});
