/* =========================================================================
   PGMais · Social — slide auto-scale
   Each .slide is laid out at native 1080×1350. We scale it via transform
   to fit its host .deck-stage (which has aspect-ratio 1080/1350).
   ========================================================================= */
(function(){
  const NATIVE_W = 1080;

  function fitSlide(slide) {
    const stage = slide.parentElement;
    if (!stage) return;
    const w = stage.getBoundingClientRect().width;
    if (!w) return;
    const scale = w / NATIVE_W;
    slide.style.transform = `scale(${scale})`;
  }

  function fitAll() {
    document.querySelectorAll('.slide').forEach(fitSlide);
  }

  // Initial fit + on resize
  window.addEventListener('load', fitAll);
  window.addEventListener('resize', fitAll);

  // Re-fit when fonts load (Lato self-hosted may shift layout)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitAll);
  }

  // ResizeObserver per stage (handles container-driven layout changes)
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const slide = e.target.querySelector('.slide');
        if (slide) fitSlide(slide);
      }
    });
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.deck-stage').forEach(s => ro.observe(s));
      fitAll();
    });
  } else {
    window.addEventListener('DOMContentLoaded', fitAll);
  }
})();
