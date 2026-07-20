import type { ReactNode } from 'react';

interface StaticPageShellProps {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
}

export function StaticPageShell({ eyebrow, title, intro, updated, children }: StaticPageShellProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-0 md:py-16">
      <header className="mb-12">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.38em] text-brand">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {intro ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
        {updated ? (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Last updated: {updated}
          </p>
        ) : null}
        <div className="relative mt-8 border-t border-ink">
          <div className="absolute inset-x-0 top-[3px] border-t border-ink/15" aria-hidden="true" />
        </div>
      </header>
      <div className="space-y-12">{children}</div>
    </div>
  );
}

interface StaticSectionProps {
  heading: string;
  children: ReactNode;
}

export function StaticSection({ heading, children }: StaticSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="border-b border-hairline-strong pb-2 font-display text-2xl font-medium tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
