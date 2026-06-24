import { Outlet } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';
import { useAuth } from '@/shared/auth/useAuth';
import { canManageTenantSettings } from '@/shared/roles';

export function AdminLayout() {
  const { role } = useAuth();
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/events', label: 'Events' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/feedback', label: 'Feedback' },
    { to: '/logs', label: 'Logs' },
  ];
  if (canManageTenantSettings(role)) {
    links.push({ to: '/invitations', label: 'Invitations' });
    links.push({ to: '/financial', label: 'Financial' });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav title="Svyne Admin" links={links} />
      <main className="mx-auto max-w-6xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
