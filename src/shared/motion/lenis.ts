import type Lenis from 'lenis';

let instance: Lenis | null = null;
let rafId = 0;
let refCount = 0;
let initializing = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function teardown() {
  if (instance) {
    cancelAnimationFrame(rafId);
    instance.destroy();
    instance = null;
  }
  refCount = 0;
}

export function acquireLenis(): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }
  refCount += 1;
  if (!instance && !initializing) {
    initializing = true;
    void Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: LenisCtor }, { gsap }, { ScrollTrigger }]) => {
      initializing = false;
      if (refCount <= 0) return;
      gsap.registerPlugin(ScrollTrigger);
      instance = new LenisCtor({
        lerp: 0.14,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
      });
      instance.on('scroll', ScrollTrigger.update);
      const loop = (time: number) => {
        instance?.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
      ScrollTrigger.refresh();
    });
  }
  return () => {
    refCount -= 1;
    if (refCount <= 0) {
      teardown();
    }
  };
}
