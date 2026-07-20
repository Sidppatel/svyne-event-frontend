import { cn } from '@/shared/lib/cn';

export const BRAND = Object.freeze({
  name: 'TicketSpan',
  wordmark: 'TICKETSPAN',
  tagline: 'Premium Ticketing',
  green: '#1F3D2B',
  ink: '#191714',
  ivory: '#F5F1E8',
  serifStack: "'Cormorant Garamond', 'Cormorant Garamond Fallback', Georgia, serif",
  monoStack: "'JetBrains Mono', 'JetBrains Mono Fallback', ui-monospace, monospace",
});

export function BrandMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="61" height="61" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="7.5" y="7.5" width="49" height="49" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <text
        x="32"
        y="42.5"
        textAnchor="middle"
        fontSize="26"
        fill="currentColor"
        style={{ fontFamily: BRAND.serifStack, fontWeight: 600, letterSpacing: '0.04em' }}
      >
        TS
      </text>
    </svg>
  );
}

interface BrandLockupProps {
  size?: 'sm' | 'md';
  tone?: 'ink' | 'ivory' | 'current';
  section?: string;
  showTagline?: boolean;
  className?: string;
}

export function BrandLockup({
  size = 'md',
  tone = 'current',
  section,
  showTagline = true,
  className,
}: BrandLockupProps) {
  const markSize = size === 'md' ? 'h-11 w-11' : 'h-8 w-8';
  const wordSize = size === 'md' ? 'text-lg' : 'text-[15px]';
  const accentColor = tone === 'ivory' ? '#CFDCC9' : BRAND.green;
  return (
    <span className={cn('flex items-center', size === 'md' ? 'gap-3.5' : 'gap-2.5', className)}>
      <BrandMark className={`${markSize} shrink-0`} />
      <span className="leading-tight">
        <span
          className={cn('flex items-baseline gap-2 font-semibold tracking-[0.12em]', wordSize)}
          style={{ fontFamily: BRAND.serifStack }}
        >
          {BRAND.wordmark}
          {section ? (
            <span className="text-xs font-medium uppercase tracking-[0.18em] opacity-60">{section}</span>
          ) : null}
        </span>
        {showTagline ? (
          <span
            className="block text-[8.5px] uppercase"
            style={{ fontFamily: BRAND.monoStack, letterSpacing: '0.38em', color: tone === 'current' ? undefined : accentColor }}
          >
            {BRAND.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
