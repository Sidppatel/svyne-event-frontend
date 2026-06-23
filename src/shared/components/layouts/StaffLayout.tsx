import { Outlet } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';

export function StaffLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav title="Svyne Staff" links={[{ to: '/staff', label: 'Check-In' }]} />
      <main className="mx-auto max-w-3xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
