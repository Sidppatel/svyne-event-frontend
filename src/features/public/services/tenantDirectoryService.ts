import { tenantClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';

export interface PublicTenant {
  slug: string;
  name: string;
}

export async function listPublicTenants(): Promise<PublicTenant[]> {
  const response = await callRpc(() => tenantClient.listPublicTenants({}));
  return response.tenants.map((tenant) => ({ slug: tenant.slug, name: tenant.name }));
}
