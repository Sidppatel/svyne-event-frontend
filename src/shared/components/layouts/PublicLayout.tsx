import { Outlet } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav
        title="Svyne"
        links={[
          { to: '/', label: 'Events' },
          { to: '/my-bookings', label: 'My Bookings' },
          { to: '/feedback', label: 'Feedback' },
          { to: '/profile', label: 'Profile' },
        ]}
      />
      <main className="mx-auto max-w-5xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
