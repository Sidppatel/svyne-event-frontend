import { useCallback } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getDeveloperLogs } from '@/features/developer/services/developerService';
import { Card, CardContent } from '@/shared/ui/card';

export function DeveloperLogsPage() {
  const loader = useCallback(() => getDeveloperLogs(), []);
  const { data, loading, error } = useAsync(loader);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">System logs</h1>
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="space-y-2">
        {(data ?? []).map((entry) => (
          <Card key={entry.id}>
            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">
                {entry.action} · {entry.entityType}
              </p>
              <p className="text-gray-500">{entry.actorEmail}</p>
              <p className="text-gray-400">{entry.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && (data ?? []).length === 0 ? <p className="text-gray-500">No logs.</p> : null}
    </div>
  );
}
