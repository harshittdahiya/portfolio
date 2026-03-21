/* =====================================================
   HARSHIT CHAUDHARY — PORTFOLIO JAVASCRIPT
   ===================================================== */

/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');
  let mx = -100, my = -100; // start off-screen
  let rx = -100, ry = -100;
  let gx = -100, gy = -100;

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

  // Smooth glow follow
  function animateGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Grow ring on hover over interactive elements
  document.querySelectorAll('a, button, .skill-pill, .project-card, .contact-item, input, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

  // Hide on leave, show on enter
  document.addEventListener('mouseleave', () => { 
    dot.style.opacity = '0'; 
    ring.style.opacity = '0'; 
    glow.style.opacity = '0'; 
  });
  document.addEventListener('mouseenter', () => { 
    dot.style.opacity = '1'; 
    ring.style.opacity = '1'; 
    glow.style.opacity = '1'; 
  });
})();


/* ── 2. FLOATING PARTICLES ── */
(function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
})();


/* ── 3. NAVBAR SCROLL STATE ── */
(function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();


/* ── 4. COUNT-UP ANIMATION ── */
(function initCountUp() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            entry.target.textContent = target + '+';
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(count) + '+';
          }
        }, 30);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();


/* ── 5. MAGNETIC BUTTONS ── */
(function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ── 6. IMAGE GLOW FOLLOW ── */
(function initImageGlow() {
  const imageGlow = document.getElementById('imageGlow');
  const heroPhoto = document.querySelector('.hero-photo');

  heroPhoto.addEventListener('mousemove', e => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    imageGlow.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  heroPhoto.addEventListener('mouseleave', () => {
    imageGlow.style.transform = '';
  });
})();


/* ── 7. SKILL TAGS ANIMATION ── */
(function initSkillTags() {
  const skillPills = document.querySelectorAll('.skill-pill');
  skillPills.forEach((pill, index) => {
    pill.style.animationDelay = (index * 0.1) + 's';
    pill.classList.add('fade-in-up');
  });
})();


/* ── 8. CERTIFICATE SHINE ── */
(function initCertShine() {
  const certImages = document.querySelectorAll('.cert-preview');
  certImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.animation = 'shine 1.5s ease-in-out';
    });
    img.addEventListener('mouseleave', () => {
      img.style.animation = '';
    });
  });
})();


/* ── 9. PROJECT ICONS ANIMATION ── */
(function initProjectIcons() {
  const icons = document.querySelectorAll('.card-link svg');
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.animation = 'bounce 0.6s ease';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.animation = '';
    });
  });
})();


/* ── 10. TECH TAGS GLOW ── */
(function initTechGlow() {
  const tags = document.querySelectorAll('.tech-tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.boxShadow = '0 0 15px rgba(0,210,255,0.5)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.boxShadow = '';
    });
  });
})();


/* ── 11. EDUCATION TIMELINE ── */
(function initEducationTimeline() {
  const educationSection = document.getElementById('education');
  const cards = educationSection.querySelectorAll('.project-card');

  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      const connector = document.createElement('div');
      connector.className = 'timeline-connector';
      connector.style.position = 'absolute';
      connector.style.left = '50%';
      connector.style.top = '100%';
      connector.style.width = '2px';
      connector.style.height = '40px';
      connector.style.background = 'linear-gradient(to bottom, var(--accent), transparent)';
      connector.style.transform = 'translateX(-50%)';
      card.style.position = 'relative';
      card.appendChild(connector);
    }
  });
})();


/* ── 12. SCROLL REVEAL ENHANCED ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
})();


/* ── 13. HAMBURGER MENU ── */
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
    threshold: [0.25, 0.45, 0.65],
    rootMargin: `-${72}px 0px -35% 0px`  // offset for fixed nav
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


/* ── 5. TYPING ANIMATION (loops through roles) ── */
(function initTyping() {
  const textEl   = document.getElementById('typingText');
  const cursorEl = document.getElementById('typingCursor');
  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "AI-Powered App Developer",
    "Problem Solver",
    "Tech Innovator"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isTyping = true;
  let isPaused = false;

  function typeChar() {
    if (isPaused) return;

    const currentRole = roles[roleIndex];

    if (isTyping) {
      if (charIndex < currentRole.length) {
        textEl.textContent += currentRole.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 90); // typing speed: ~90ms per char
      } else {
        // Finished typing, pause
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isTyping = false;
          typeChar();
        }, 1200); // pause after typing: 1.2s
      }
    } else {
      // Backspacing
      if (charIndex > 0) {
        textEl.textContent = textEl.textContent.slice(0, -1);
        charIndex--;
        setTimeout(typeChar, 50); // backspace speed: faster, 50ms
      } else {
        // Finished backspacing, move to next role
        isTyping = true;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeChar, 200); // small delay before next typing
      }
    }
  }

  // Start after a short delay (lets hero fade-in finish)
  setTimeout(() => {
    typeChar();
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


/* ── 8. 3D TILT EFFECT ── */
(function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .skill-category');

  cards.forEach(card => {
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    card.addEventListener('mousemove', e => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // max 8 deg
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      card.style.transform = '';
    });
  });
})();


/* ── 9. SMOOTH SCROLL for anchor links ── */
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


/* ── 10. OCCASIONAL GLITCH EFFECT ── */
(function initOccasionalGlitch() {
  const glitchText = document.querySelector('.glitch-text');
  if (!glitchText) return;

  function triggerGlitch() {
    glitchText.classList.add('glitch-active');
    setTimeout(() => {
      glitchText.classList.remove('glitch-active');
    }, 300);
  }

  // Trigger glitch randomly every 8-15 seconds
  function scheduleNextGlitch() {
    const delay = 8000 + Math.random() * 7000; // 8-15 seconds
    setTimeout(() => {
      triggerGlitch();
      scheduleNextGlitch();
    }, delay);
  }

  // Start the cycle
  scheduleNextGlitch();
})();