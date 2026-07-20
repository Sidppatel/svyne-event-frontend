import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import { BrandLockup } from '@/shared/brand/BrandMark';

const sections = [
  { href: '#platform', label: 'Platform' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#founder', label: 'Founder' },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-(--lp-ivory)/95 shadow-[0_1px_0_var(--lp-line)] backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center text-(--lp-ink)" aria-label="TicketSpan home">
          <BrandLockup size="md" tone="ink" />
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className="lp-link text-sm">
              {s.label}
            </a>
          ))}
          <a href="#start" data-magnet className="lp-cta !h-11 !px-6 !text-xs">
            Open your box office
          </a>
        </div>
        <a href="#start" className="lp-cta !h-10 shrink-0 whitespace-nowrap !px-4 !text-xs md:!hidden">
          Start
        </a>
      </nav>
    </header>
  );
}
