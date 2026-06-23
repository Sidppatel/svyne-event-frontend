import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listMyPurchases } from '@/features/public/services/publicEventService';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';

export function MyBookingsPage() {
  const loader = useCallback(() => listMyPurchases(), []);
  const { data, loading, error } = useAsync(loader);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My bookings</h1>
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="space-y-3">
        {(data ?? []).map((purchase) => (
          <Link key={purchase.purchasesId} to={`/purchases/${purchase.purchasesId}`}>
            <Card>
              <CardContent className="space-y-1">
                <CardTitle>#{purchase.purchaseNumber}</CardTitle>
                <p className="text-sm text-gray-500">Status: {purchase.status}</p>
                <p className="text-sm text-gray-500">Seats reserved: {purchase.seatsReserved}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {!loading && (data ?? []).length === 0 ? <p className="text-gray-500">No bookings yet.</p> : null}
    </div>
  );
}
