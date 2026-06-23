import { useCallback } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getAdminLogs } from '@/features/admin/services/logAdminService';
import { formatEpoch } from '@/shared/lib/format';
import { Card, CardContent } from '@/shared/ui/card';

export function AdminLogsPage() {
  const loader = useCallback(() => getAdminLogs(), []);
  const { data, loading, error } = useAsync(loader);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Activity logs</h1>
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="space-y-2">
        {(data ?? []).map((entry) => (
          <Card key={entry.id}>
            <CardContent className="text-sm">
              <p className="font-medium">
                {entry.action} · {entry.entityType}
              </p>
              <p className="text-gray-500">
                {entry.actorEmail} · {formatEpoch(entry.timestamp)}
              </p>
              <p className="text-gray-400">{entry.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && (data ?? []).length === 0 ? <p className="text-gray-500">No log entries.</p> : null}
    </div>
  );
}
