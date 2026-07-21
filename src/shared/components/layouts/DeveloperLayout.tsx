import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PortalNav } from '@/shared/components/layouts/PortalNav';
import { usePageEntrance } from '@/shared/hooks/usePageEntrance';
import { useActingTenantStore } from '@/shared/actingTenant';
import { Switch } from '@/shared/ui/switch';
import { Button } from '@/shared/ui/button';

export function DeveloperLayout() {
  const { pathname } = useLocation();
  const page = usePageEntrance<HTMLElement>();
  const navigate = useNavigate();
  const { tenantsId, tenantName, notifyTenant, setNotifyTenant, clear } = useActingTenantStore();
  return (
    <div data-portal="developer" className="min-h-screen bg-background">
      <PortalNav
        section="developer"
        links={[
          { to: '/', label: 'Dashboard' },
          { to: '/tenants', label: 'Tenants' },
          { to: '/events', label: 'Events' },
          { to: '/leads', label: 'Leads' },
          { to: '/billing', label: 'Billing' },
          { to: '/pay-per-event', label: 'Pay Per Event' },
          { to: '/fees', label: 'Fees' },
          { to: '/fee-overrides', label: 'Fee Overrides' },
          { to: '/revenue', label: 'Revenue' },
          { to: '/tax', label: 'Tax' },
          { to: '/tax-lookup', label: 'Tax Lookup' },
          { to: '/tax-remittance', label: 'Tax Remittance' },
          { to: '/reporting-access', label: 'Reporting Access' },
          { to: '/logs', label: 'System Logs' },
        ]}
      />
      {tenantsId ? (
        <div className="border-b border-amber-500/30 bg-amber-500/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-2 md:px-6">
            <span className="text-sm font-medium text-foreground">
              Acting as tenant: <strong>{tenantName ?? tenantsId}</strong>
            </span>
            <span className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Switch
                checked={notifyTenant}
                label="Notify tenant of changes"
                onCheckedChange={setNotifyTenant}
              />
              Notify tenant
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                clear();
                navigate('/tenants');
              }}
            >
              Exit tenant
            </Button>
          </div>
        </div>
      ) : null}
      <main ref={page} key={pathname} className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
