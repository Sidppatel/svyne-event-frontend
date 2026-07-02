import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export function usePageEntrance<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) {
        return;
      }
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const first = root.firstElementChild;
        const targets =
          first && first.children.length > 1 ? first.children : root.children;
        const limited = Array.from(targets).slice(0, 6);
        gsap.from(limited, {
          opacity: 0,
          y: 12,
          duration: 0.48,
          ease: 'power3.out',
          stagger: 0.04,
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
  return scope;
}
