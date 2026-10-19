/**
 * Nexora Digital — Main JavaScript
 * Handles: Navigation, Scroll Effects, Animations,
 *          Portfolio Filter, Form Validation, UI Interactions
 * Author: Nexora Digital Team  |  Version: 1.0.0
 */

'use strict';

/* ============================================================
   1. DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileNav();
  initSmoothScroll();
  initActiveNavLinks();
  initScrollReveal();
  initPortfolioFilter();
  initContactForm();
  initBackToTop();
  initCursorGlow();
  initCounters();
  initHeroBarChart();
});

/* ============================================================
   2. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = `${Math.min(pct, 100)}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   3. NAVBAR — Scroll Shrink & Active Section Highlighting
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   4. MOBILE NAVIGATION DRAWER
   ============================================================ */
function initMobileNav() {
  const toggle    = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop  = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  if (!toggle || !mobileNav) return;

  const openMenu = () => {
    toggle.classList.add('open');
    mobileNav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Trap focus within the drawer
    mobileNav.querySelector('.mobile-nav-drawer').focus();
  };

  const closeMenu = () => {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  };

  const toggleMenu = () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', toggleMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close on any mobile link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ============================================================
   5. SMOOTH SCROLLING (for all anchor links)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   6. ACTIVE NAV LINK — Intersection Observer
   ============================================================ */
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id], div[id="hero"]');

  if (!navLinks.length || !sections.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      const matches = link.getAttribute('data-section') === id ||
                      link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', matches);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold:  0,
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   7. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );
  if (!targets.length) return;

  // Respect user's reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -80px 0px',
      threshold:  0.08,
    }
  );

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   8. PORTFOLIO FILTER
   ============================================================ */
function initPortfolioFilter() {
  const filterBtns     = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const grid           = document.getElementById('portfolio-grid');

  if (!filterBtns.length || !portfolioCards.length) return;

  // Inject the CSS for hidden state once
  const filterStyle = document.createElement('style');
  filterStyle.textContent = `
    .portfolio-card {
      transition: opacity 0.3s ease, transform 0.3s ease, all 0.3s ease;
    }
    .portfolio-card.filter-hidden {
      opacity: 0;
      transform: scale(0.92) translateY(8px);
      pointer-events: none;
      position: absolute;
      visibility: hidden;
    }
  `;
  document.head.appendChild(filterStyle);

  // Set grid to relative so absolutely-positioned hidden cards don't affect layout
  if (grid) grid.style.position = 'relative';

  const filter = (category) => {
    portfolioCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const matches = category === 'all' || cardCategory === category;

      if (matches) {
        card.classList.remove('filter-hidden');
        card.style.position = '';
        card.style.visibility = '';
      } else {
        card.classList.add('filter-hidden');
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      filter(btn.getAttribute('data-filter') || 'all');
    });
  });
}

/* ============================================================
   9. CONTACT FORM — Validation & Demo Submission
   ============================================================ */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successDiv = document.getElementById('form-success');
  const resetBtn   = document.getElementById('form-reset-btn');
  const formInner  = document.getElementById('contact-form-inner');

  if (!form) return;

  /* ── Validation Rules ────────────────────────────────────── */
  const validators = {
    name:    (v) => v.trim().length >= 2,
    email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: (v) => v.trim().length >= 3,
    message: (v) => v.trim().length >= 20,
  };

  const errorMessages = {
    name:    'Please enter your full name (at least 2 characters).',
    email:   'Please enter a valid email address.',
    subject: 'Please enter a subject.',
    message: 'Please enter a message (at least 20 characters).',
  };

  const getField = (name) => form.querySelector(`[name="${name}"]`);
  const getError = (name) => document.getElementById(`${name}-error`);

  const showError = (name) => {
    const field = getField(name);
    const error = getError(name);
    if (field) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    }
    if (error) {
      error.textContent = errorMessages[name];
      error.classList.add('visible');
    }
  };

  const clearError = (name) => {
    const field = getField(name);
    const error = getError(name);
    if (field) {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    }
    if (error) error.classList.remove('visible');
  };

  /* ── Live Validation on Input ────────────────────────────── */
  Object.keys(validators).forEach(name => {
    const field = getField(name);
    if (!field) return;

    // Validate on blur
    field.addEventListener('blur', () => {
      const valid = validators[name](field.value);
      valid ? clearError(name) : showError(name);
    });

    // Clear error on input once user starts fixing
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        const valid = validators[name](field.value);
        if (valid) clearError(name);
      }
    });
  });

  /* ── Form Submission ─────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    let isValid = true;
    Object.keys(validators).forEach(name => {
      const field = getField(name);
      if (!field) return;
      const valid = validators[name](field.value);
      if (valid) {
        clearError(name);
      } else {
        showError(name);
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus the first error field
      const firstError = form.querySelector('.form-input.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate async submission
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Show success state
      if (formInner)  formInner.style.display = 'none';
      if (successDiv) successDiv.classList.add('visible');

      // Scroll to success message
      successDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1800); // Simulated 1.8s network delay
  });

  /* ── Reset / Send Another ────────────────────────────────── */
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(validators).forEach(clearError);
      if (successDiv) successDiv.classList.remove('visible');
      if (formInner)  formInner.style.display = '';
      formInner?.querySelector('input')?.focus();
    });
  }
}

/* ============================================================
   10. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggle();
}

/* ============================================================
   11. CURSOR GLOW EFFECT (desktop only)
   ============================================================ */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Only enable on non-touch devices
  if (window.matchMedia('(hover: none)').matches) {
    glow.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;
  let rafId  = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(animate);
  });

  const animate = () => {
    // Smooth lerp toward mouse position
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top  = `${glowY}px`;

    const dx = mouseX - glowX;
    const dy = mouseY - glowY;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  };
}

/* ============================================================
   12. ANIMATED COUNTERS (hero stats)
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.hero-stat-number');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const parseTarget = (text) => {
    const match = text.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const formatValue = (value, original) => {
    const hasDecimal = original.includes('.');
    const prefix = original.match(/^[^0-9]*/)[0];
    const suffix = original.match(/[^0-9.%+k]*[%+k]*$/)[0];
    const formatted = hasDecimal ? value.toFixed(1) : Math.round(value).toString();
    return prefix + formatted + suffix;
  };

  const animateCounter = (el) => {
    const originalText = el.textContent;
    const target = parseTarget(originalText);
    if (!target) return;

    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;

      el.textContent = formatValue(current, originalText);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = originalText;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   13. HERO BAR CHART ANIMATION
   ============================================================ */
function initHeroBarChart() {
  const bars = document.querySelectorAll('.bar-item');
  if (!bars.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Animate bars on load with stagger
  bars.forEach((bar, i) => {
    const targetHeight = bar.style.height;
    bar.style.height = '0%';
    bar.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

    setTimeout(() => {
      bar.style.height = targetHeight;
    }, 400 + i * 80);
  });

  // Subtle pulse animation every 3 seconds
  setInterval(() => {
    const activeBar = document.querySelector('.bar-item.active');
    if (!activeBar) return;
    activeBar.style.transform = 'scaleY(1.05)';
    setTimeout(() => { activeBar.style.transform = ''; }, 400);
  }, 3000);
}

/* ============================================================
   14. KEYBOARD NAVIGATION IMPROVEMENTS
   ============================================================ */
document.addEventListener('keydown', (e) => {
  // Skip to main content on Tab from body
  if (e.key === 'Tab' && !e.shiftKey) {
    const focused = document.activeElement;
    if (focused === document.body) {
      const main = document.getElementById('main-content');
      if (main) {
        e.preventDefault();
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    }
  }
});

/* ============================================================
   15. SERVICE CARD — Tilt effect on hover (desktop)
   ============================================================ */
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.service-card, .portfolio-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) *  4;

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
})();

/* ============================================================
   16. BUTTON RIPPLE EFFECT
   ============================================================ */
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Don't apply ripple to submit button during loading
      if (this.classList.contains('loading')) return;

      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const ripple = document.createElement('span');
      const size   = Math.max(rect.width, rect.height) * 2;

      Object.assign(ripple.style, {
        position:        'absolute',
        width:           `${size}px`,
        height:          `${size}px`,
        borderRadius:    '50%',
        background:      'rgba(255,255,255,0.15)',
        left:            `${x - size / 2}px`,
        top:             `${y - size / 2}px`,
        transform:       'scale(0)',
        animation:       'ripple-anim 0.6s ease-out forwards',
        pointerEvents:   'none',
      });

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject keyframes once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple-anim {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ============================================================
   17. TESTIMONIAL CARDS — Staggered entrance
   ============================================================ */
(function initTestimonialStagger() {
  const cards = document.querySelectorAll('.testimonial-card');
  cards.forEach((card, i) => {
    if (!card.classList.contains('stagger-1') &&
        !card.classList.contains('stagger-2') &&
        !card.classList.contains('stagger-3') &&
        !card.classList.contains('stagger-4') &&
        !card.classList.contains('stagger-5') &&
        !card.classList.contains('stagger-6')) {
      card.style.transitionDelay = `${i * 0.07}s`;
    }
  });
})();

/* ============================================================
   18. TRUSTED LOGOS MARQUEE — subtle opacity wave
   ============================================================ */
(function initLogoWave() {
  const logos = document.querySelectorAll('.trusted-logo');
  if (!logos.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  logos.forEach((logo, i) => {
    logo.style.animationDelay = `${i * 0.15}s`;
    logo.style.animation = `logo-wave 3s ${i * 0.3}s ease-in-out infinite alternate`;
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes logo-wave {
      from { opacity: 0.3; }
      to   { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   19. ABOUT STATS — reveal counter animation
   ============================================================ */
(function initAboutCounters() {
  const statBigs = document.querySelectorAll('.about-stat-big');
  if (!statBigs.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el   = entry.target;
        const text = el.textContent;
        const num  = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!num) return;

        const prefix = text.match(/^[^0-9]*/)[0];
        const suffix = text.replace(prefix, '').replace(String(num), '');
        const duration  = 1500;
        const startTime = performance.now();

        const tick = (now) => {
          const p    = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const cur  = num * ease;
          el.textContent = prefix + (Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  statBigs.forEach(el => observer.observe(el));
})();

/* ============================================================
   20. SECTION TRANSITION LINES — decorative accent
   ============================================================ */
(function initSectionDividers() {
  document.querySelectorAll('.section-divider').forEach(div => {
    div.style.width = '0';
    div.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = '60px';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(div);
  });
})();
