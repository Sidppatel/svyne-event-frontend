import { Outlet } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';
import { useAuth } from '@/shared/auth/useAuth';
import { canManageTenantSettings } from '@/shared/roles';

export function AdminLayout() {
  const { role } = useAuth();
  const links = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/events', label: 'Events' },
    { to: '/admin/purchases', label: 'Purchases' },
    { to: '/admin/catalog', label: 'Catalog' },
    { to: '/admin/feedback', label: 'Feedback' },
    { to: '/admin/logs', label: 'Logs' },
  ];
  if (canManageTenantSettings(role)) {
    links.push({ to: '/admin/invitations', label: 'Invitations' });
    links.push({ to: '/admin/financial', label: 'Financial' });
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
