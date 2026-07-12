import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { resolvePortalContext } from '@/shared/subdomain';
import { Toaster } from '@/shared/ui/sonner';

const PublicRoutes = lazy(() => import('@/app/PublicRoutes'));
const AdminRoutes = lazy(() => import('@/app/AdminRoutes'));
const DeveloperRoutes = lazy(() => import('@/app/DeveloperRoutes'));
const StaffRoutes = lazy(() => import('@/app/StaffRoutes'));

function AppLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-5 bg-stage text-on-stage">
      <span className="flex items-center gap-2 font-display text-2xl">
        <span className="h-2 w-2 animate-pulse rounded-full bg-voltage" /> Svyne
      </span>
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-on-stage-soft/30 border-t-voltage" />
    </div>
  );
}

function selectRoutes(portal: string) {
  switch (portal) {
    case 'admin':
      return <AdminRoutes />;
    case 'developer':
      return <DeveloperRoutes />;
    case 'staff':
      return <StaffRoutes />;
    default:
      return <PublicRoutes />;
  }
}

export function App() {
  useLocation(); 
  const { portal } = resolvePortalContext();
  return (
    <>
      <Suspense fallback={<AppLoading />}>
        {selectRoutes(portal)}
      </Suspense>
      <Toaster position="bottom-center" />
    </>
  );
}
