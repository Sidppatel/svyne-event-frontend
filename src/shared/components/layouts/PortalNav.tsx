import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { useAuth } from '@/shared/auth/useAuth';
import { roleLabel } from '@/shared/roles';
import { logout } from '@/features/auth/services/authService';

export interface NavLink {
  to: string;
  label: string;
}

export function PortalNav({ title, links }: { title: string; links: NavLink[] }) {
  const { isAuthenticated, user, role } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="font-semibold" style={{ color: 'var(--brand-primary)' }}>
          {title}
        </span>
        <nav className="flex gap-4 text-sm text-gray-700">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-gray-950">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 text-sm">
        {isAuthenticated ? (
          <>
            <span className="text-gray-500">
              {user?.email} · {roleLabel(role)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => navigate('/login')}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}
