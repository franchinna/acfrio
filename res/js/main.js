/* ==========================================================================
   acfrio — main.js
   JS vanilla, sin dependencias. Todo es progresivo: si esto no carga,
   la página sigue siendo 100% navegable.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------- Menú mobile */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !open);
    });

    // Cerrar al elegir una sección o al presionar Escape
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  }

  /* -------------------------------- Sombra del header + FAB de WhatsApp */
  var header = document.querySelector('.site-header');
  var fab = document.getElementById('fab');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (fab) fab.classList.toggle('is-visible', y > 520);
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* ------------------------------------------- Reveal al entrar en viewport */
  var revealables = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    revealables.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '240px 0px 240px 0px', threshold: 0.02 }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });

    // Red de seguridad: si algo impide que el observer dispare (o si un
    // rastreador renderiza sin hacer scroll), mostramos todo igual.
    window.setTimeout(revealAll, 2500);
  }

  /* -------------------------------- Sección activa en la navegación */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var links = {};
  document.querySelectorAll('.nav__link[href^="#"]').forEach(function (link) {
    links[link.getAttribute('href').slice(1)] = link;
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = links[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.keys(links).forEach(function (id) {
              links[id].removeAttribute('aria-current');
            });
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ------------------------------------------------------- Año del footer */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
