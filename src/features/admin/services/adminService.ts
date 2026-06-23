import { dashboardClient, eventClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { AdminDashboard } from '@/shared/proto/admin';
import type { Event } from '@/shared/proto/event';

export async function getAdminDashboard(): Promise<AdminDashboard> {
  return callRpc(() => dashboardClient.getAdminDashboard({}));
}

export async function listAdminEvents(): Promise<Event[]> {
  const response = await callRpc(() =>
    eventClient.listEvents({ page: { offset: 0, limit: 100, search: '' }, status: '', category: '' }),
  );
  return response.events;
}
