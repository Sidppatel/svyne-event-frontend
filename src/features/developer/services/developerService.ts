import { tenantClient, logClient, dashboardClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type {
  Tenant,
  CreateTenantResponse,
  TenantMember,
  TenantStripeStatus,
} from '@/shared/proto/tenant';
import type { LogEntry, DeveloperDashboard } from '@/shared/proto/admin';

export async function getDeveloperDashboard(): Promise<DeveloperDashboard> {
  return callRpc(() => dashboardClient.getDeveloperDashboard({}));
}

export async function listTenantMembers(tenantsId: string): Promise<TenantMember[]> {
  const response = await callRpc(() => tenantClient.listTenantMembers({ value: tenantsId }));
  return response.members;
}

export async function getTenantStripeStatus(tenantsId: string): Promise<TenantStripeStatus> {
  return callRpc(() => tenantClient.getTenantStripeStatus({ value: tenantsId }));
}

export async function archiveTenant(tenantsId: string): Promise<void> {
  await callRpc(() => tenantClient.archiveTenant({ value: tenantsId }));
}

export async function listTenants(): Promise<Tenant[]> {
  const response = await callRpc(() => tenantClient.listTenants({ offset: 0, limit: 100, search: '' }));
  return response.tenants;
}

export interface NewTenantInput {
  slug: string;
  name: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
}

export async function createTenant(input: NewTenantInput): Promise<CreateTenantResponse> {
  return callRpc(() =>
    tenantClient.createTenant({
      slug: input.slug,
      name: input.name,
      adminEmail: input.adminEmail,
      adminFirstName: input.adminFirstName,
      adminLastName: input.adminLastName,
      legalName: input.name,
      countryCode: 'US',
    }),
  );
}

export async function getDeveloperLogs(): Promise<LogEntry[]> {
  const response = await callRpc(() =>
    logClient.getDeveloperLogs({
      page: { offset: 0, limit: 100, search: '' },
      action: '',
      entityType: '',
      from: '0',
      to: '0',
    }),
  );
  return response.entries;
}
