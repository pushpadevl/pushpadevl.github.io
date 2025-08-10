
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  // Header scroll state
  const onScrollHeader = () => {
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive:true });

  // Magnetic buttons
  const magnets = document.querySelectorAll('.btn.magnetic');
  magnets.forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', x + '%');
      btn.style.setProperty('--my', y + '%');
      const dx = (x - 50) / 50, dy = (y - 50) / 50;
      btn.style.transform = `translate(${dx*4}px, ${dy*3}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });

  if (prefersReduced) {
    // Immediately reveal without animations
    document.querySelectorAll('.will-reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  // Hero intro sequence (staggered)
  const heroTimeline = gsap.timeline({ defaults:{ ease: 'power2.out', duration:.8 } });
  heroTimeline
    .from('.hero h1', { y:24, opacity:0 })
    .from('.hero .subhead', { y:16, opacity:0 }, '-=0.4')
    .from('.hero .btn', { y:12, opacity:0, stagger:0.1 }, '-=0.4')
    .from('.hero .hero-media', { y:20, opacity:0 }, '-=0.5')
    .from('.hero .accent-line', { width:0, opacity:0 }, '-=0.6');

  // Scroll reveals
  document.querySelectorAll('.will-reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (!el.classList.contains('revealed')) {
          gsap.to(el, { opacity:1, y:0, duration:.7, ease:'power2.out', onComplete: () => el.classList.add('revealed') });
        }
      }
    });
  });

  // Parallax on larger visuals
  document.querySelectorAll('.parallax').forEach((el) => {
    gsap.to(el, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // KPI count-up on view
  const formatNumber = (n) => {
    return Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
  };
  document.querySelectorAll('.kpi').forEach(kpi => {
    const valueEl = kpi.querySelector('.kpi-value');
    const to = parseFloat(kpi.dataset.countTo || '0');
    const from = parseFloat(kpi.dataset.countFrom || '0');
    const suffix = kpi.dataset.suffix || '';
    if (!valueEl || isNaN(to)) return;

    ScrollTrigger.create({
      trigger: kpi,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: from };
        gsap.to(obj, {
          val: to,
          duration: 1.2,
          ease: 'power1.out',
          onUpdate: () => {
            valueEl.textContent = formatNumber(obj.val) + suffix;
          }
        });
      }
    });
  });

  // Section titles subtle scale/opacity
  document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
      opacity:0,
      y: 18,
      duration:.7,
      ease:'power2.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%'
      }
    });
  });
})();
