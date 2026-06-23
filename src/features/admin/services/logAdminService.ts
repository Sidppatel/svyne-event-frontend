import { logClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { LogEntry } from '@/shared/proto/admin';

export async function getAdminLogs(): Promise<LogEntry[]> {
  const response = await callRpc(() =>
    logClient.getAdminLogs({
      page: { offset: 0, limit: 100, search: '' },
      action: '',
      entityType: '',
      from: '0',
      to: '0',
    }),
  );
  return response.entries;
}
