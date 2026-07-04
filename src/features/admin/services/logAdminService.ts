import { logClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { LogEntry } from '@/shared/proto/admin';

export interface AdminLogQuery {
  eventsId?: string;
  search?: string;
  offset?: number;
  limit?: number;
}

export interface AdminLogResult {
  entries: LogEntry[];
  total: number;
}

export async function getAdminLogs(query: AdminLogQuery = {}): Promise<AdminLogResult> {
  const response = await callRpc(() =>
    logClient.getAdminLogs({
      page: { offset: query.offset ?? 0, limit: query.limit ?? 50, search: query.search ?? '' },
      action: '',
      entityType: '',
      from: '0',
      to: '0',
      eventsId: query.eventsId ?? '',
    }),
  );
  return { entries: response.entries, total: response.meta?.total ?? response.entries.length };
}
