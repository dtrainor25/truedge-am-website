/* ============================================
   TRUEDGE ASSET MANAGEMENT — MAIN JS
   - Sticky nav on scroll
   - Mobile menu toggle
   - Scroll reveal animations
   - Contact form handling
   ============================================ */

(function () {
  'use strict';

  // ---- STICKY NAV ----
  var header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- MOBILE MENU ----
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });

  // ---- SCROLL REVEAL ----
  var revealEls = document.querySelectorAll('[data-reveal]');
  var revealObserver;

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var siblings = Array.from(
              entry.target.parentElement.querySelectorAll('[data-reveal]:not(.revealed)')
            );
            var idx = siblings.indexOf(entry.target);
            var delay = Math.min(idx * 100, 300);

            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, delay);

            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 76;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- CONTACT FORM ----
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#C9A84C';
        btn.style.color = '#1A1A1A';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
          form.reset();
        }, 3000);
      }, 1200);
    });
  }

  // ---- PLACEHOLDER IMAGE FALLBACKS ----
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });

})();
