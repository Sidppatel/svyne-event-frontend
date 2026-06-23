import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  getPurchase,
  listPurchaseTickets,
  inviteTicket,
} from '@/features/public/services/ticketService';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function PurchaseDetailPage() {
  const { purchasesId = '' } = useParams();
  const purchaseLoader = useCallback(() => getPurchase(purchasesId), [purchasesId]);
  const ticketsLoader = useCallback(() => listPurchaseTickets(purchasesId), [purchasesId]);
  const purchase = useAsync(purchaseLoader);
  const tickets = useAsync(ticketsLoader);
  const [emails, setEmails] = useState<Record<string, string>>({});

  async function invite(ticketId: string) {
    try {
      await inviteTicket(ticketId, emails[ticketId] ?? '');
      tickets.reload();
    } catch (caught) {
      window.alert(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-4">
      {purchase.loading ? <p className="text-gray-500">Loading…</p> : null}
      {purchase.error ? <p className="text-red-600">{purchase.error}</p> : null}
      {purchase.data ? (
        <Card>
          <CardHeader>
            <CardTitle>Purchase #{purchase.data.purchaseNumber}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>Status: {purchase.data.status}</p>
            <p>Total: {centsToUSD(purchase.data.totalCents)}</p>
            <p>Seats reserved: {purchase.data.seatsReserved}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(tickets.data ?? []).map((ticket) => (
            <div key={ticket.purchaseTicketsId} className="flex flex-wrap items-center gap-2 border-b py-2 text-sm">
              <span className="font-medium">{ticket.ticketCode}</span>
              <span className="text-gray-500">seat {ticket.seatNumber}</span>
              <span className="text-gray-400">{ticket.status}</span>
              <Input
                className="w-48"
                placeholder="invite email"
                value={emails[ticket.purchaseTicketsId] ?? ''}
                onChange={(e) => setEmails((prev) => ({ ...prev, [ticket.purchaseTicketsId]: e.target.value }))}
              />
              <Button size="sm" variant="outline" onClick={() => invite(ticket.purchaseTicketsId)}>
                Invite
              </Button>
            </div>
          ))}
          {!tickets.loading && (tickets.data ?? []).length === 0 ? (
            <p className="text-gray-500">No tickets.</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
