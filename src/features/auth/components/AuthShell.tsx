import type { ReactNode } from 'react';
import { BrandLockup } from '@/shared/brand/BrandMark';
import { usePageEntrance } from '@/shared/hooks/usePageEntrance';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  blurb: string;
  quote: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, blurb, quote, children }: AuthShellProps) {
  const panel = usePageEntrance<HTMLDivElement>();
  return (
    <div className="landing-ivory grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-stage p-12 text-on-stage lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-6 border border-on-stage/15" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-8 border border-on-stage/8" aria-hidden="true" />
        <BrandLockup tone="ivory" className="relative" />
        <div className="relative space-y-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.38em] text-on-stage-soft">{eyebrow}</p>
          <h2 className="font-display text-4xl font-medium leading-tight">{title}</h2>
          <p className="max-w-md text-base leading-relaxed text-on-stage-soft">{blurb}</p>
        </div>
        <p className="relative max-w-md font-display text-lg italic leading-snug text-on-stage-soft">
          &ldquo;{quote}&rdquo;
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div ref={panel} className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <BrandLockup className="text-foreground" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
