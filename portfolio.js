/* =====================================================
   HARSHIT CHAUDHARY — PORTFOLIO JAVASCRIPT
   ===================================================== */

/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = -100, my = -100; // start off-screen
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Smooth ring follow using rAF
  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow ring on hover over interactive elements
  document.querySelectorAll('a, button, .skill-pill, .project-card, .contact-item, input, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

  // Hide on leave, show on enter
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();


/* ── 2. NAVBAR SCROLL STATE ── */
(function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();


/* ── 3. HAMBURGER MENU ── */
(function initHamburger() {
  const btn       = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close when a mobile link is clicked
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();


/* ── 4. SMOOTH NAV HIGHLIGHT ── */
(function initNavHighlight() {
  const links     = document.querySelectorAll('.nav-link');
  const highlight = document.getElementById('navHighlight');
  const sections  = [];

  links.forEach(link => {
    const id = link.getAttribute('data-section');
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  // Move highlight to a given link element
  function moveHighlight(linkEl) {
    if (!linkEl) return;
    const navLinksContainer = document.getElementById('navLinks');
    const containerRect = navLinksContainer.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    highlight.style.left  = (linkRect.left - containerRect.left) + 'px';
    highlight.style.width = linkRect.width + 'px';
    // Vertically center the pill (34px height)
    highlight.style.top = ((linkRect.height - 34) / 2) + 'px';
  }

  // Activate a section in the navbar
  function setActive(id) {
    links.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      moveHighlight(activeLink);
    }
  }

  // Initial position — set on home
  window.addEventListener('load', () => {
    const firstLink = document.querySelector('.nav-link[data-section="home"]');
    if (firstLink) {
      firstLink.classList.add('active');
      moveHighlight(firstLink);
    }
  });

  // Intersection Observer for scroll-based detection
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: `-${72}px 0px -40% 0px`  // offset for fixed nav
  });

  sections.forEach(({ el }) => observer.observe(el));

  // Click to scroll
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('data-section');
      const target = document.getElementById(id);
      if (target) {
        const navH = document.getElementById('navbar').offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Also update highlight on window resize
  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) moveHighlight(active);
  });
})();


/* ── 5. TYPING ANIMATION (runs once, no loop) ── */
(function initTyping() {
  const textEl   = document.getElementById('typingText');
  const cursorEl = document.getElementById('typingCursor');
  const text     = 'Full Stack Developer';
  let i = 0;
  let started = false;

  function typeChar() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 90 + Math.random() * 40); // slightly random speed
    } else {
      // Done — hide blinking cursor after a pause
      setTimeout(() => {
        cursorEl.style.display = 'none';
      }, 1800);
    }
  }

  // Start after a short delay (lets hero fade-in finish)
  setTimeout(() => {
    if (!started) {
      started = true;
      typeChar();
    }
  }, 700);
})();


/* ── 6. SCROLL-TRIGGERED SECTION ANIMATIONS ── */
(function initScrollAnimations() {
  const animEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((sib, i) => { if (sib === entry.target) delay = i * 120; });
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animEls.forEach(el => observer.observe(el));
})();


/* ── 7. CONTACT FORM (send message via FormSubmit) ── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('contactStatus');
  if (!form || !statusEl) return;

  function setStatus(message, type = 'info') {
    statusEl.textContent = message;
    statusEl.className = `contact-status ${type}`;
  }

  form.addEventListener('submit', e => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmsg').value.trim();
    if (!name || !email || !message) {
      e.preventDefault();
      setStatus('Please enter your name, email, and message.', 'error');
      return;
    }
    setStatus('Sending your message…', 'info');
  });
})();


/* ── 8. SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});