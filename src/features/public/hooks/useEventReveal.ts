import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useEventReveal<T extends HTMLElement = HTMLElement>(ready: boolean) {
  const scope = useRef<T>(null);
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !ready) {
        return;
      }
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-hero-img]', { scale: 1.06, opacity: 0, duration: 0.8 })
          .from('[data-hero-title]', { yPercent: 40, opacity: 0, duration: 0.6 }, '-=0.4')
          .from('[data-hero-meta] > *', { y: 12, opacity: 0, stagger: 0.08 }, '-=0.3')
          .fromTo(
            '[data-hero-edge]',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.5 },
            '-=0.1',
          );

        gsap.set('[data-reveal]', { opacity: 0, y: 24 });
        const batch = ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              overwrite: true,
            }),
        });
        return () => batch.forEach((st) => st.kill());
      });
      return () => mm.revert();
    },
    { scope, dependencies: [ready] },
  );
  return scope;
}
