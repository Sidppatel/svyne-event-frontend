import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  getEventBySlug,
  getEventLayout,
  reserveOpenCapacity,
  bookingTable,
} from '@/features/public/services/publicEventService';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function EventDetailPage() {
  const { slug = '' } = useParams();
  const loader = useCallback(() => getEventBySlug(slug), [slug]);
  const { data: event, loading, error } = useAsync(loader);

  if (loading) {
    return <p className="text-gray-500">Loading…</p>;
  }
  if (error || !event) {
    return <p className="text-red-600">{error ?? 'Event not found.'}</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">{event.description}</p>
          <p className="text-sm text-gray-500">Category: {event.category}</p>
          <p className="text-sm text-gray-500">Status: {event.status}</p>
        </CardContent>
      </Card>
      <BookingPanel eventsId={event.eventsId} layoutMode={event.layoutMode} />
    </div>
  );
}

function BookingPanel({ eventsId, layoutMode }: { eventsId: string; layoutMode: string }) {
  const isTableLayout = layoutMode === 'tables' || layoutMode === 'table';
  const layoutLoader = useCallback(() => getEventLayout(eventsId), [eventsId]);
  const layout = useAsync(layoutLoader);

  const [seats, setSeats] = useState(1);
  const [tableId, setTableId] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  async function reserve() {
    setBooking(true);
    setBookingError(null);
    setConfirmation(null);
    try {
      const bookingNumber =
        isTableLayout && tableId
          ? await bookingTable({ eventsId, tablesId: tableId, seats })
          : await reserveOpenCapacity({ eventsId, seats, eventTicketTypesId: '' });
      setConfirmation(bookingNumber);
    } catch (caught) {
      setBookingError(rpcErrorMessage(caught));
    } finally {
      setBooking(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isTableLayout ? 'Select a table' : 'Reserve seats'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isTableLayout ? (
          <div className="flex flex-wrap gap-2">
            {(layout.data?.tables ?? []).map((table) => (
              <Button
                key={table.tablesId}
                size="sm"
                variant={tableId === table.tablesId ? 'default' : 'outline'}
                disabled={table.status !== 'Available'}
                onClick={() => setTableId(table.tablesId)}
              >
                {table.label} · {table.status}
              </Button>
            ))}
            {layout.loading ? <p className="text-sm text-gray-500">Loading tables…</p> : null}
            {!layout.loading && (layout.data?.tables ?? []).length === 0 ? (
              <p className="text-sm text-gray-500">No tables published yet.</p>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-1">
          <Label htmlFor="seats">Seats</Label>
          <Input id="seats" type="number" min={1} value={seats} onChange={(e) => setSeats(Number(e.target.value))} />
        </div>

        {bookingError ? <p className="text-sm text-red-600">{bookingError}</p> : null}
        {confirmation ? <p className="text-sm text-green-600">Reserved. Confirmation: {confirmation}</p> : null}

        <Button onClick={reserve} disabled={booking || (isTableLayout && !tableId)}>
          {booking ? 'Reserving…' : 'Reserve'}
        </Button>
      </CardContent>
    </Card>
  );
}
