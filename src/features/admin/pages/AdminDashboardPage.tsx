import { useCallback } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { getAdminDashboard } from '@/features/admin/services/adminService';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';

export function AdminDashboardPage() {
  const loader = useCallback(() => getAdminDashboard(), []);
  const { data, loading, error } = useAsync(loader);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {data ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Total events" value={data.totalEvents} />
          <Stat label="Active events" value={data.activeEvents} />
          <Stat label="Attendees" value={data.totalAttendees} />
          <Stat label="Revenue (cents)" value={data.totalRevenueCents} />
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="space-y-1">
        <CardTitle>{value}</CardTitle>
        <p className="text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}
