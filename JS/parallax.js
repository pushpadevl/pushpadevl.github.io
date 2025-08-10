(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bg = document.querySelector('.site-bg');
  if (!bg) return;

  // Parallax intensity: lower value = more subtle movement
  // Example: 0.15 means BG moves 15% as fast as page scroll
  const SPEED = 0.05;

  let ticking = false;
  let lastY = 0;

  const onScroll = () => {
    lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  const update = () => {
    ticking = false;
    if (prefersReduced) return;
    // Apply a negative translate so BG appears to move slower
    const y = Math.round(lastY * SPEED);
    // translate3d for GPU acceleration
    bg.style.transform = 'translate3d(0,' + (-y) + 'px,0)';
    
  };

  // Initial position
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
})();