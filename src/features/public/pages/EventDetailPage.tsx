import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { getEventBySlug, getEventLayout } from '@/features/public/services/publicEventService';
import {
  listEventTicketTypes,
  reserveOpenCapacity,
  reserveTable,
} from '@/features/public/services/paymentService';
import type { EventTicketType } from '@/shared/proto/bookings';
import type { Table } from '@/shared/proto/booking';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import { addCents, multiplySeats } from '@/shared/lib/math';
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
  const isTableLayout = layoutMode === 'tables' || layoutMode === 'table' || layoutMode === 'Grid';
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  async function goToCheckout(reserve: () => Promise<{ bookingsId: string }>) {
    setBusy(true);
    setBookingError(null);
    try {
      const { bookingsId } = await reserve();
      navigate(`/checkout/${bookingsId}`);
    } catch (caught) {
      setBookingError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return isTableLayout ? (
    <TablePanel eventsId={eventsId} busy={busy} error={bookingError} onReserve={goToCheckout} />
  ) : (
    <OpenCapacityPanel eventsId={eventsId} busy={busy} error={bookingError} onReserve={goToCheckout} />
  );
}

interface PanelProps {
  eventsId: string;
  busy: boolean;
  error: string | null;
  onReserve: (reserve: () => Promise<{ bookingsId: string }>) => void;
}

function OpenCapacityPanel({ eventsId, busy, error, onReserve }: PanelProps) {
  const loader = useCallback(() => listEventTicketTypes(eventsId), [eventsId]);
  const { data: ticketTypes, loading } = useAsync(loader);
  const [selectedId, setSelectedId] = useState('');
  const [seats, setSeats] = useState(1);

  const selected = useMemo<EventTicketType | undefined>(
    () => ticketTypes?.find((t) => t.eventTicketTypesId === selectedId),
    [ticketTypes, selectedId],
  );
  const subtotal = multiplySeats(selected?.priceCents ?? 0, seats);
  const fee = multiplySeats(selected?.platformFeeCents ?? 0, seats);
  const total = addCents(subtotal, fee);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserve tickets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? <p className="text-sm text-gray-500">Loading ticket types…</p> : null}
        {!loading && (ticketTypes ?? []).length === 0 ? (
          <p className="text-sm text-gray-500">No tickets on sale yet.</p>
        ) : null}

        <div className="space-y-2">
          {(ticketTypes ?? []).map((tt) => (
            <button
              key={tt.eventTicketTypesId}
              type="button"
              onClick={() => setSelectedId(tt.eventTicketTypesId)}
              className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm ${
                selectedId === tt.eventTicketTypesId ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <span>
                <span className="font-medium">{tt.label}</span>
                {tt.description ? <span className="block text-xs text-gray-500">{tt.description}</span> : null}
              </span>
              <span className="text-right">
                <span className="block font-medium">{centsToUSD(tt.priceCents)}</span>
                {tt.platformFeeCents > 0 ? (
                  <span className="block text-xs text-gray-500">+ {centsToUSD(tt.platformFeeCents)} service fee</span>
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <Label htmlFor="seats">Quantity</Label>
          <Input
            id="seats"
            type="number"
            min={1}
            max={selected?.maxQuantity && selected.maxQuantity > 0 ? selected.maxQuantity : undefined}
            value={seats}
            onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
          />
        </div>

        {selected ? (
          <div className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-between"><span>Ticket price</span><span>{centsToUSD(subtotal)}</span></div>
            <div className="flex justify-between"><span>Service fee</span><span>{centsToUSD(fee)}</span></div>
            <div className="flex justify-between font-medium"><span>Total</span><span>{centsToUSD(total)}</span></div>
          </div>
        ) : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button
          disabled={busy || !selected || total <= 0}
          onClick={() =>
            onReserve(() =>
              reserveOpenCapacity({
                eventsId,
                seats,
                eventTicketTypesId: selectedId,
                subtotalCents: subtotal,
                feeCents: fee,
                totalCents: total,
              }),
            )
          }
        >
          {busy ? 'Reserving…' : 'Continue to payment'}
        </Button>
      </CardContent>
    </Card>
  );
}

function TablePanel({ eventsId, busy, error, onReserve }: PanelProps) {
  const layoutLoader = useCallback(() => getEventLayout(eventsId), [eventsId]);
  const { data: layout, loading } = useAsync(layoutLoader);
  const [tableId, setTableId] = useState('');

  const selected = useMemo<Table | undefined>(
    () => layout?.tables.find((t) => t.tablesId === tableId),
    [layout, tableId],
  );
  const subtotal = selected?.priceCents ?? 0;
  const fee = selected?.platformFeeCents ?? 0;
  const total = addCents(subtotal, fee);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(layout?.tables ?? []).map((table) => (
            <Button
              key={table.tablesId}
              size="sm"
              variant={tableId === table.tablesId ? 'default' : 'outline'}
              disabled={table.status !== 'Available'}
              onClick={() => setTableId(table.tablesId)}
            >
              {table.label} · {centsToUSD(table.priceCents)}
              {table.platformFeeCents > 0 ? ` + ${centsToUSD(table.platformFeeCents)} fee` : ''}
            </Button>
          ))}
          {loading ? <p className="text-sm text-gray-500">Loading tables…</p> : null}
          {!loading && (layout?.tables ?? []).length === 0 ? (
            <p className="text-sm text-gray-500">No tables published yet.</p>
          ) : null}
        </div>

        {selected ? (
          <div className="space-y-0.5 text-sm text-gray-700">
            <div className="flex justify-between"><span>Table price</span><span>{centsToUSD(subtotal)}</span></div>
            <div className="flex justify-between"><span>Service fee</span><span>{centsToUSD(fee)}</span></div>
            <div className="flex justify-between font-medium"><span>Total</span><span>{centsToUSD(total)}</span></div>
          </div>
        ) : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button
          disabled={busy || !selected || total <= 0}
          onClick={() =>
            onReserve(() =>
              reserveTable({
                eventsId,
                tablesId: tableId,
                seats: 1,
                subtotalCents: subtotal,
                feeCents: fee,
                totalCents: total,
              }),
            )
          }
        >
          {busy ? 'Reserving…' : 'Continue to payment'}
        </Button>
      </CardContent>
    </Card>
  );
}
