import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { playSuccessChime } from '@/shared/lib/haptic';
import { QrImage } from '@/features/public/components/wallet/QrImage';
import { useAsync } from '@/shared/hooks/useAsync';
import { useAuth } from '@/shared/auth/useAuth';
import {
  getBooking,
  listTickets,
  inviteTicket,
  claimTicketSelf,
  revokeTicket,
} from '@/features/public/services/ticketService';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';

const NOTCH = { ['--svyne-notch' as string]: 'var(--background)' } as CSSProperties;

export function BookingDetailPage() {
  const { bookingsId = '' } = useParams();
  const location = useLocation();
  const justPaid = Boolean((location.state as { justPaid?: boolean } | null)?.justPaid);
  const { user } = useAuth();

  useEffect(() => {
    if (justPaid) playSuccessChime();
  }, [justPaid]);
  const bookingLoader = useCallback(() => getBooking(bookingsId), [bookingsId]);
  const ticketsLoader = useCallback(() => listTickets(bookingsId), [bookingsId]);
  const booking = useAsync(bookingLoader);
  const tickets = useAsync(ticketsLoader);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [activeQr, setActiveQr] = useState<{ qrToken: string; label: string; bookingNumber?: string } | null>(null);

  async function invite(ticketId: string) {
    try {
      await inviteTicket(ticketId, emails[ticketId] ?? '');
      tickets.reload();
    } catch (caught) {
      window.alert(rpcErrorMessage(caught));
    }
  }

  async function handleClaimSelf(ticketId: string) {
    try {
      await claimTicketSelf(ticketId);
      tickets.reload();
    } catch (caught) {
      window.alert(rpcErrorMessage(caught));
    }
  }

  async function handleRevoke(ticketId: string) {
    try {
      await revokeTicket(ticketId);
      tickets.reload();
    } catch (caught) {
      window.alert(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-4">
      {justPaid ? (
        <div className="svyne-page overflow-hidden rounded-lg border border-success/25 bg-surface shadow-[var(--shadow-e1)]">
          <div className="flex items-center gap-3 p-5">
            <CheckCircle2 className="size-6 shrink-0 text-success" />
            <div>
              <p className="font-display text-lg font-semibold text-ink">You're going.</p>
              <p className="text-sm text-ink-soft">
                Payment confirmed — your tickets are below and in your wallet.
              </p>
            </div>
          </div>
          <div className="svyne-ticket-edge" style={NOTCH} />
          <div className="h-3" />
        </div>
      ) : null}
      {booking.loading ? <p className="text-muted-foreground">Loading…</p> : null}
      {booking.error ? <p className="text-destructive">{booking.error}</p> : null}
      {booking.data ? (
        <Card>
          <CardHeader>
            <CardTitle>Booking #{booking.data.bookingNumber}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Status: {booking.data.status}</p>
            {booking.data.lines.length > 0 ? (
              <div className="divide-y rounded-md border">
                {booking.data.lines
                  .filter((l) => !(l.kind === 'Ticket' && l.totalCents === 0 && l.tablesId))
                  .map((l) => (
                  <div key={l.bookingLinesId} className="flex items-center justify-between px-3 py-1.5">
                    <span>
                      <span className="rounded bg-muted px-1 text-xs uppercase text-muted-foreground">{l.kind}</span>{' '}
                      <span className="font-medium text-foreground">{l.label}</span>
                      <span className="text-muted-foreground"> · {l.seats} {l.seats === 1 ? 'seat' : 'seats'}</span>
                    </span>
                    <span className="font-medium text-foreground">{centsToUSD(l.totalCents)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Seats reserved: {booking.data.seatsReserved}</p>
            )}
            <p className="font-medium text-foreground">Total: {centsToUSD(booking.data.totalCents)}</p>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(() => {
            const hasClaimedAny = (tickets.data ?? []).some(
              (t) => t.guestUsersId === user?.usersId && (t.status === 'Claimed' || t.status === 'CheckedIn')
            );
            return (tickets.data ?? []).map((ticket) => {
              const isClaimedByMe = ticket.guestUsersId === user?.usersId && ticket.status === 'Claimed';
              const isClaimedByOthers = ticket.status === 'Claimed' && ticket.guestUsersId !== user?.usersId;
              return (
                <div key={ticket.ticketsId} className="flex flex-wrap items-center gap-2 border-b py-2 text-sm">
                  {ticket.qrToken && (
                    <button
                      type="button"
                      onClick={() => setActiveQr({
                        qrToken: ticket.qrToken,
                        label: `Ticket: ${ticket.ticketCode}`,
                        bookingNumber: booking.data?.bookingNumber,
                      })}
                      className="shrink-0 p-1 bg-white rounded border hover:bg-muted transition-colors cursor-pointer mr-1"
                    >
                      <QrImage value={ticket.qrToken} size={32} className="h-8 w-8 object-contain" />
                    </button>
                  )}
                  <span className="font-medium">{ticket.ticketCode}</span>
                  <span className="text-muted-foreground">seat {ticket.seatNumber}</span>
                  <span className="text-muted-foreground">{ticket.status}</span>
                  {ticket.status === 'CheckedIn' ? (
                    <span className="text-success font-semibold px-2 py-0.5 bg-success/10 rounded-md">
                      Checked In
                    </span>
                  ) : isClaimedByMe ? (
                    <Button size="sm" variant="destructive" onClick={() => handleRevoke(ticket.ticketsId)}>
                      Revoke
                    </Button>
                  ) : (
                    <>
                      <Input
                        className="w-48"
                        placeholder="invite email"
                        value={emails[ticket.ticketsId] ?? ''}
                        onChange={(e) => setEmails((prev) => ({ ...prev, [ticket.ticketsId]: e.target.value }))}
                        disabled={hasClaimedAny || isClaimedByOthers}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => invite(ticket.ticketsId)}
                        disabled={hasClaimedAny || isClaimedByOthers || !(emails[ticket.ticketsId] ?? '').trim()}
                      >
                        Invite
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClaimSelf(ticket.ticketsId)}
                        disabled={hasClaimedAny || isClaimedByOthers}
                      >
                        Claim for myself
                      </Button>
                    </>
                  )}
                </div>
              );
            });
          })()}
          {!tickets.loading && (tickets.data ?? []).length === 0 ? (
            <p className="text-muted-foreground">No tickets.</p>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={activeQr !== null} onOpenChange={(open) => { if (!open) setActiveQr(null); }}>
        <DialogContent className="max-w-xs md:max-w-md flex flex-col items-center p-6 space-y-4 rounded-xl">
          <DialogTitle className="text-center text-xl font-bold">Entry Pass</DialogTitle>
          {activeQr && (
            <>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <QrImage value={activeQr.qrToken} size={250} />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">Scan at the event gate</p>
                <p className="font-mono text-lg font-bold text-foreground tracking-wide mt-2">
                  {activeQr.label}
                </p>
                {activeQr.bookingNumber && (
                  <p className="text-xs text-muted-foreground font-mono">
                    Booking: #{activeQr.bookingNumber}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
