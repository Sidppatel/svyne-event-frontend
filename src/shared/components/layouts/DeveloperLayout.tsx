import { Outlet } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';

export function DeveloperLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav
        title="Svyne Developer"
        links={[
          { to: '/', label: 'Tenants' },
          { to: '/dashboard', label: 'Overview' },
          { to: '/fees', label: 'Fees' },
          { to: '/logs', label: 'System Logs' },
        ]}
      />
      <main className="mx-auto max-w-6xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
