import { Outlet, useLocation } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';
import { usePageEntrance } from '@/shared/hooks/usePageEntrance';

export function StaffLayout() {
  const { pathname } = useLocation();
  const page = usePageEntrance<HTMLElement>();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <PortalNav section="staff" links={[{ to: '/staff', label: 'Check-In' }]} />
      <div className="flex-1 md:pl-64">
        <main ref={page} key={pathname} className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
