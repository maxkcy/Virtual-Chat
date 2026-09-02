/*!
 * Virtual Chat — landing page interactions & enhancements
 *
 * Source file : script.ts
 * Compiled to : script.js   (tsc — see tsconfig.json)
 *
 * Phase 2: the hero logo is rendered by three.js inside initHeroScene() —
 * a flat plane textured with `assets/vcicon-wbkg.png` that sways, tilts
 * toward the pointer, and turns when clicked or dragged.
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
// Hero — three.js logo scene
// ---------------------------------------------------------------------------
// The hero logo is rendered by three.js on a transparent canvas: a flat plane
// textured with `assets/vcicon-wbkg.png` floating in 3D space. The logo sways,
// tilts toward the pointer, and turns a full spin when clicked — or is turned
// freely by dragging. It gracefully falls back to the static <img> when the
// three.js CDN is unreachable or the user prefers reduced motion.

declare const THREE: any; // three.js UMD global (script tag in index.html)

const HERO_CANVAS_ID = 'hero-canvas';
const HERO_TEXTURE_SRC = 'assets/vcicon-wbkg.png';
const HERO_FOV = 45;
const HERO_CAM_Z = 5.2;
const HERO_PLANE_SIZE = 4.1;
const TAU = Math.PI * 2;

// Hero background — perspective grid floor (full-bleed canvas).
const HERO_GRID_CANVAS_ID = 'hero-grid-canvas';
const HERO_GRID_SIZE = 44;
const HERO_GRID_DIVISIONS = 44;
const HERO_GRID_CENTER_COLOR = 0xff8c2e; // bright orange accent — the two centre axes
const HERO_GRID_LINE_COLOR = 0xaf4f00; // main brand orange — the grid lines

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

/**
 * Full-bleed perspective grid floor behind the whole hero. A flat grid on the
 * ground plane recedes toward the horizon; scene fog fades its colour to black
 * with distance, giving the "bright near the bottom → black far at the top"
 * gradient. Rendering is cheap and static, so it only redraws on resize.
 */
function initHeroGrid(): void {
  const canvas = document.getElementById(HERO_GRID_CANVAS_ID) as HTMLCanvasElement | null;
  const hero = canvas ? (canvas.closest('.hero') as HTMLElement | null) : null;
  if (!canvas || !hero) return;

  // Keep the plain black hero background when three.js is missing or motion
  // is reduced.
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  scene.background = null; // transparent → CSS --bg (black) shows through

  // Low camera looking almost level — just a light downward tilt — so the
  // horizon climbs high and the floor fills most of the screen.
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 1.4, 4.2);
  camera.lookAt(0, 0.3, -10);

  // Flat grid lying on the ground plane (XZ), all lines in the brand orange.
  const grid = new THREE.GridHelper(
    HERO_GRID_SIZE,
    HERO_GRID_DIVISIONS,
    HERO_GRID_CENTER_COLOR,
    HERO_GRID_LINE_COLOR
  );
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  scene.add(grid);

  // Subtle orange glow on the floor itself (strongest near, fading far).
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 2;
  glowCanvas.height = 256;
  const glowCtx = glowCanvas.getContext('2d');
  if (glowCtx) {
    const grad = glowCtx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(255,140,46,0)'); // far → transparent
    grad.addColorStop(0.6, 'rgba(255,140,46,0.14)');
    grad.addColorStop(1, 'rgba(255,140,46,0.5)'); // near → orange glow
    glowCtx.fillStyle = grad;
    glowCtx.fillRect(0, 0, 2, 256);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(HERO_GRID_SIZE, HERO_GRID_SIZE),
      new THREE.MeshBasicMaterial({
        map: glowTexture,
        transparent: true,
        depthWrite: false,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);
  }

  // Near-to-far fade: lines close to the camera are full colour, then dissolve
  // into black at the horizon.
  scene.fog = new THREE.Fog(0x000000, 3.4, 17);

  const render = (): void => renderer.render(scene, camera);

  const resize = (): void => {
    const w = hero.clientWidth || 1;
    const h = hero.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };

  window.addEventListener('resize', resize);
  resize();
}

function initHeroScene(): void {
  const canvas = document.getElementById(HERO_CANVAS_ID) as HTMLCanvasElement | null;
  const slot = canvas ? (canvas.parentElement as HTMLElement | null) : null;
  if (!canvas || !slot) return;

  // Keep the static logo when three.js is missing or motion is reduced.
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // transparent → the grid floor shows through

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(HERO_FOV, 1, 0.1, 100);
  camera.position.z = HERO_CAM_Z;

  const raycaster = new THREE.Raycaster();
  const pointerNdc = { x: 0, y: 0 };

  let plane: any = null; // THREE.Mesh — the logo
  let rafId = 0;
  let lastTime = performance.now();

  // Rotation state.
  let yaw = 0.5;
  let pitch = 0.15;
  let targetYaw = 0.5;
  let targetPitch = 0.15;
  let spinOffset = 0; // extra full turns accumulated from clicks
  let hoverTilt = 0; // -1..1, pointer Y influence on pitch

  // Drag state.
  let dragging = false;
  let startClientX = 0;
  let startClientY = 0;
  let startYaw = 0;
  let startPitch = 0;
  let moved = 0;

  const sway = (t: number): number => Math.sin(t * 0.35) * 0.45;

  const setNdc = (e: PointerEvent, rect: DOMRect): void => {
    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const onPointerMove = (e: PointerEvent): void => {
    if (!plane) return;
    const rect = canvas.getBoundingClientRect();
    setNdc(e, rect);

    if (dragging) {
      const dx = e.clientX - startClientX;
      const dy = e.clientY - startClientY;
      moved += Math.abs(dx) + Math.abs(dy);
      targetYaw = startYaw + dx * 0.012;
      targetPitch = clamp(startPitch + dy * 0.012, -0.8, 0.8);
    } else {
      hoverTilt = -pointerNdc.y * 0.4;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObject(plane);
      canvas.style.cursor = hits.length > 0 ? 'grab' : 'default';
    }
  };

  const onPointerDown = (e: PointerEvent): void => {
    if (!plane) return;
    const rect = canvas.getBoundingClientRect();
    setNdc(e, rect);
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObject(plane);
    if (hits.length === 0) return; // only grab when clicking the logo

    dragging = true;
    moved = 0;
    startClientX = e.clientX;
    startClientY = e.clientY;
    startYaw = yaw;
    startPitch = pitch;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const onPointerUp = (e: PointerEvent): void => {
    if (!dragging) return;
    dragging = false;
    if (canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    canvas.style.cursor = 'grab';

    const t = performance.now() * 0.001;
    if (moved < 6) {
      // A click: turn the logo a full spin.
      spinOffset += TAU;
      targetYaw = spinOffset + sway(t);
    } else {
      // End of a drag: absorb the rotation so idle sway has no jump.
      spinOffset = targetYaw - sway(t);
    }
  };

  const onPointerLeave = (): void => {
    if (!dragging) hoverTilt = 0;
  };

  const resize = (): void => {
    const w = slot.clientWidth || 1;
    const h = slot.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const tick = (now: number): void => {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const t = now * 0.001;

    if (plane) {
      if (!dragging) {
        targetYaw = spinOffset + sway(t);
        targetPitch = Math.sin(t * 0.22) * 0.08 + hoverTilt;
      }
      yaw += (targetYaw - yaw) * Math.min(1, dt * 5);
      pitch += (targetPitch - pitch) * Math.min(1, dt * 5);
      plane.rotation.y = yaw;
      plane.rotation.x = pitch;
      plane.position.y = Math.sin(t * 1.2) * 0.06;
      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(tick);
  };

  const onVisibility = (): void => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else if (plane) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  };

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);

  const loader = new THREE.TextureLoader();
  loader.load(
    HERO_TEXTURE_SRC,
    (texture: any) => {
      texture.encoding = THREE.sRGBEncoding;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      plane = new THREE.Mesh(new THREE.PlaneGeometry(HERO_PLANE_SIZE, HERO_PLANE_SIZE), material);
      scene.add(plane);

      resize();
      canvas.classList.remove('hero-canvas--hidden');
      document.documentElement.classList.add('hero-3d');

      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointerleave', onPointerLeave);

      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    },
    undefined,
    () => {
      /* Texture failed to load — keep the static logo. */
    }
  );
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
  initHeroGrid();
  initHeroScene();
});