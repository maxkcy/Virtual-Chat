/*!
 * Virtual Chat — landing page interactions & enhancements
 *
 * Source file : script.ts
 * Compiled to : script.js   (tsc — see tsconfig.json)
 *
 * Phase 2 note: the three.js hero model (logo `assets/vcicon-wbkg.png`
 * rotating on the Y axis with a slight X-axis tilt toward the mouse)
 * will be implemented inside initHeroScene().
 */

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

function $(selectors: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(selectors);
}

function $$(selectors: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll<HTMLElement>(selectors);
}

// ---------------------------------------------------------------------------
// Copy-to-clipboard for <pre><code> blocks
// ---------------------------------------------------------------------------

function initCopyButtons(): void {
  const buttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll<HTMLButtonElement>('.copy-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.pre-wrap')?.querySelector('code');
      if (!code) return;
      void copyTextToClipboard(code.textContent ?? '', btn);
    });
  });
}

async function copyTextToClipboard(text: string, btn: HTMLButtonElement): Promise<void> {
  const showCopied = (): void => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    window.setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  };

  try {
    await navigator.clipboard.writeText(text);
    showCopied();
  } catch {
    // Fallback for older browsers / non-secure contexts (file://, old http).
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopied();
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// ---------------------------------------------------------------------------
// FAQ accordion (single item open at a time)
// ---------------------------------------------------------------------------

function initFaq(): void {
  const items: NodeListOf<HTMLDetailsElement> = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.hasAttribute('open');

      // Close every other open item.
      items.forEach((other) => {
        if (other !== item) other.removeAttribute('open');
      });

      if (isOpen) {
        item.removeAttribute('open');
      } else {
        item.setAttribute('open', '');
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Mobile navigation toggle
// ---------------------------------------------------------------------------

function initNav(): void {
  const toggle = $('#nav-toggle');
  const menu = $('#nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------------------------
// Screenshot lightbox
// ---------------------------------------------------------------------------

function initLightbox(): void {
  const lightbox = $('#lightbox');
  const gallery = $('.carousel');
  if (!lightbox || !gallery) return;

  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const open = (src: string, alt: string): void => {
    if (img) {
      img.src = src;
      img.alt = alt;
    }
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = (): void => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  gallery.querySelectorAll<HTMLImageElement>('img').forEach((thumb) => {
    thumb.addEventListener('click', () => open(thumb.src, thumb.alt));
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ---------------------------------------------------------------------------
// Screenshot carousel
// ---------------------------------------------------------------------------

function initCarousel(): void {
  const carousel = document.querySelector<HTMLElement>('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector<HTMLElement>('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.carousel-slide'));
  const prevBtn = carousel.querySelector<HTMLButtonElement>('.carousel-btn--prev');
  const nextBtn = carousel.querySelector<HTMLButtonElement>('.carousel-btn--next');
  const dotsWrap = carousel.querySelector<HTMLElement>('.carousel-dots');
  const counter = carousel.querySelector<HTMLElement>('.carousel-counter');

  if (!track || slides.length === 0) return;
  const trackEl: HTMLElement = track;

  let index = 0;
  let autoplayTimer: number | null = null;
  const AUTOPLAY_MS = 4500;

  // Build dots.
  const dots: HTMLButtonElement[] = [];
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(dot);
    dots.push(dot);
  });

  function render(): void {
    trackEl.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  }

  function goTo(i: number): void {
    index = (i + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  function next(): void {
    goTo(index + 1);
  }

  function prev(): void {
    goTo(index - 1);
  }

  function startAutoplay(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(next, AUTOPLAY_MS);
  }

  function stopAutoplay(): void {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay(): void {
    startAutoplay();
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Pause autoplay while hovering / focusing / touching.
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // Keyboard arrows.
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe.
  let touchStartX = 0;
  let touchStartY = 0;
  carousel.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      stopAutoplay();
    },
    { passive: true }
  );
  carousel.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
      startAutoplay();
    },
    { passive: true }
  );

  render();
  startAutoplay();
}

// ---------------------------------------------------------------------------
// Scroll reveal (fade-in on intersection)
// ---------------------------------------------------------------------------

function initReveal(): void {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

// ---------------------------------------------------------------------------
// Active nav-link highlighting
// ---------------------------------------------------------------------------

function initActiveNav(): void {
  const links: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]');

  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map<string, HTMLAnchorElement>();
  links.forEach((link) => {
    const id = (link.getAttribute('href') ?? '').slice(1);
    if (id) byId.set(id, link);
  });

  const sections = Array.from(byId.keys())
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove('active'));
        byId.get(entry.target.id)?.classList.add('active');
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => io.observe(s));
}

// ---------------------------------------------------------------------------
// Hero background
// ---------------------------------------------------------------------------
// Phase 1 : static logo <img> rendered on the --bkg gradient (see index.html).
// Phase 2 : three.js scene — logo texture rotating on Y, slight X tilt toward
//           the mouse. Canvas is already wired in place below.

const HERO_CANVAS_ID = 'hero-canvas';

function initHeroScene(): void {
  const canvas = document.getElementById(HERO_CANVAS_ID) as HTMLCanvasElement | null;
  if (!canvas) return;

  // Keep the (currently empty) canvas invisible until the three.js scene is
  // implemented in phase 2.
  canvas.classList.add('hero-canvas--hidden');

  // TODO(phase 2): three.js scene
  //  - THREE.TextureLoader().load('assets/vcicon-wbkg.png')
  //  - MeshBasicMaterial({ map }) on a PlaneGeometry
  //  - continuous rotation.y += dt * speed
  //  - lerp rotation.x toward mouse-tracking target on pointermove
  //  - pause on document.visibilitychange
  //  - respect prefers-reduced-motion + small-screen quality tiers
  //  - remove hero-canvas--hidden once ready
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initFaq();
  initNav();
  initLightbox();
  initCarousel();
  initReveal();
  initActiveNav();
  initHeroScene();
});