import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { getMyTenant } from '@/features/admin/services/tenantService';
import { brandingFormFromTenant, brandingFromForm } from '@/features/admin/services/brandingStudio';
import { BrandingPreview } from '@/features/admin/components/branding/BrandingPreview';

export function EventBrandingPreview({ eventName }: { eventName: string }) {
  const tenantLoader = useCallback(() => getMyTenant(), []);
  const tenant = useAsync(tenantLoader);

  if (tenant.loading) {
    return <p className="text-sm text-muted-foreground">Loading preview…</p>;
  }
  if (tenant.error || !tenant.data) {
    return <p className="text-sm text-destructive">{tenant.error ?? 'Could not load branding.'}</p>;
  }

  const branding = brandingFromForm(brandingFormFromTenant(tenant.data), tenant.data.name);

  return (
    <div className="space-y-3">
      <BrandingPreview branding={branding} eventName={eventName} />
      <p className="text-xs text-muted-foreground">
        This is how your published branding frames this event across the public page, ticketing,
        and floor plan. Adjust it in the{' '}
        <Link to="/branding" className="font-medium text-brand hover:underline">
          branding studio
        </Link>
        .
      </p>
    </div>
  );
}
