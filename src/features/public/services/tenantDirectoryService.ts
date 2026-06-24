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

export function tenantUrl(slug: string): string {
  const { protocol, hostname, port } = window.location;
  const baseHost = hostname.endsWith('.localhost')
    ? hostname.slice(hostname.indexOf('.') + 1)
    : hostname.split('.').slice(-2).join('.');
  const portSuffix = port ? `:${port}` : '';
  return `${protocol}//${slug}.${baseHost}${portSuffix}/`;
}
