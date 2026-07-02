import { NavLink } from 'react-router-dom';
import { Compass, Ticket, User } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

const TABS = [
  { to: '/', label: 'Events', icon: Compass, end: true },
  { to: '/tickets', label: 'Tickets', icon: Ticket, end: false },
  { to: '/profile', label: 'Profile', icon: User, end: false },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hairline bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-[180ms]',
              isActive ? 'text-brand' : 'text-ink-faint',
            )
          }
        >
          <Icon className="size-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
