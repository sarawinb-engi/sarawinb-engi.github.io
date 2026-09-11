/* Progressive enhancement: all portfolio content remains available without JS. */
(() => {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  document.documentElement.classList.add('js-enabled');
  if (button && navigation) {
    button.hidden = false;
    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });
    const mobile = window.matchMedia('(max-width: 760px)');
    const updateMenu = () => { button.hidden = !mobile.matches; setOpen(false); };
    mobile.addEventListener('change', updateMenu);
    updateMenu();
  }
  // One scroll update per frame; no continuously running animation loop.
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  let frame = 0;
  const paintScroll = () => {
    frame = 0;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    header?.style.setProperty('--reading-progress', String(progress));
    header?.classList.toggle('is-scrolled', window.scrollY > 32);
  };
  const scheduleScroll = () => {
    if (!frame) frame = requestAnimationFrame(paintScroll);
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  window.addEventListener('load', scheduleScroll, { once: true });
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', scheduleScroll));
  paintScroll();

  // Animate only content below the initial viewport. Text is visible without JS.
  let revealObserver;
  const revealTargets = [...document.querySelectorAll('.section-heading, .project-card, .timeline-item, .capability-grid article, .about-layout, .contact-layout')];
  const clearMotion = () => {
    revealObserver?.disconnect();
    revealTargets.forEach(element => element.classList.remove('reveal-pending'));
    document.querySelectorAll('.is-arriving').forEach(element => element.classList.remove('is-arriving'));
    paintScroll();
  };
  if (!motion.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.querySelector('.project-art')?.classList.add('is-arriving');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    revealTargets.forEach(element => {
      element.classList.add('reveal');
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add('reveal-pending');
        revealObserver.observe(element);
      }
    });
  }
  motion.addEventListener('change', clearMotion);
  window.addEventListener('beforeprint', clearMotion);
  window.addEventListener('pageshow', scheduleScroll);
  // Keep the navigation in sync without moving focus or changing the URL.
  if ('IntersectionObserver' in window && navigation) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('#intro, #works, #experience, #skills, #about, #footer').forEach(section => sectionObserver.observe(section));
  }
  // Finite conceptual flow animations, explicitly replayable; never live machine data.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.project-card').forEach(card => {
    const art = card.querySelector('.project-art');
    const replay = card.querySelector('.replay-flow');
    if (!art || !replay) return;
    let pointerFrame = 0;
    const resetSurface = () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      art.style.removeProperty('--pointer-x');
      art.style.removeProperty('--pointer-y');
      art.classList.remove('is-pointed');
    };
    const syncMotion = () => {
      replay.hidden = motion.matches;
      if (motion.matches) {
        art.classList.remove('is-arriving');
        resetSurface();
      }
    };
    const replayAnimation = () => {
      if (motion.matches) return;
      art.classList.remove('is-arriving');
      // Restart a short CSS sequence on an explicit action, without a timer loop.
      void art.offsetWidth;
      art.classList.add('is-arriving');
    };
    replay.addEventListener('click', replayAnimation);
    art.addEventListener('pointerenter', () => {
      if (finePointer.matches && !motion.matches) replayAnimation();
    });
    art.addEventListener('pointermove', event => {
      if (!finePointer.matches || motion.matches) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = art.getBoundingClientRect();
        art.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        art.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
        art.classList.add('is-pointed');
        pointerFrame = 0;
      });
    });
    art.addEventListener('pointerleave', resetSurface);
    motion.addEventListener('change', syncMotion);
    finePointer.addEventListener('change', resetSurface);
    syncMotion();
  });
  // Two identical logo groups travel exactly one group width for a seamless loop.
  const marquee = document.querySelector('.logo-marquee');
  const marqueeToggle = document.querySelector('.marquee-toggle');
  if (marquee && marqueeToggle) {
    let manuallyPaused = false;
    const syncMarquee = () => {
      marquee.classList.toggle('motion-ready', !motion.matches);
      marquee.classList.toggle('is-paused', manuallyPaused);
      marqueeToggle.hidden = motion.matches;
      marqueeToggle.setAttribute('aria-pressed', String(manuallyPaused));
      marqueeToggle.textContent = manuallyPaused ? 'Resume motion' : 'Pause motion';
    };
    marqueeToggle.addEventListener('click', () => {
      manuallyPaused = !manuallyPaused;
      syncMarquee();
    });
    document.addEventListener('visibilitychange', () => {
      marquee.classList.toggle('is-background', document.hidden);
    });
    motion.addEventListener('change', syncMarquee);
    syncMarquee();
    if ('IntersectionObserver' in window) {
      const marqueeObserver = new IntersectionObserver(([entry]) => {
        marquee.classList.toggle('is-offscreen', !entry.isIntersecting);
      });
      marqueeObserver.observe(marquee);
    }
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
