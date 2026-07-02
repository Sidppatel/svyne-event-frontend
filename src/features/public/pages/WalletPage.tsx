import { useCallback, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listMyTickets } from '@/features/public/services/ticketService';
import { listMyBookings } from '@/features/public/services/publicEventService';
import { formatEventDate } from '@/shared/lib/format';
import { Skeleton } from '@/shared/ui/skeleton';
import { Badge } from '@/shared/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { QrImage } from '@/features/public/components/wallet/QrImage';
import { upcomingLabel } from '@/features/public/lib/discover';
import { Ticket } from 'lucide-react';

const NOTCH = { ['--svyne-notch' as string]: 'var(--background)' } as CSSProperties;

interface ActiveQr {
  qrToken: string;
  label: string;
  bookingNumber?: string;
}

export function WalletPage() {
  const ticketsLoader = useCallback(() => listMyTickets(), []);
  const bookingsLoader = useCallback(() => listMyBookings(), []);
  const { data: tickets, loading: ticketsLoading, error: ticketsError } = useAsync(ticketsLoader);
  const { data: bookings, loading: bookingsLoading, error: bookingsError } = useAsync(bookingsLoader);
  const [activeQr, setActiveQr] = useState<ActiveQr | null>(null);

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-semibold text-ink">Your tickets</h1>
        <p className="text-sm text-ink-soft">Show the QR code at the door — that's your entry.</p>
      </div>

      {ticketsError ? <p className="text-sm text-destructive">{ticketsError}</p> : null}

      {ticketsLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-lg" />
          ))}
        </div>
      ) : (tickets ?? []).length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(tickets ?? []).map((ticket) => (
            <div
              key={ticket.ticketsId}
              className="flex items-center justify-between gap-4 overflow-hidden rounded-lg border border-hairline bg-surface p-5 shadow-[var(--shadow-e1)]"
            >
              <div className="min-w-0 flex-1 space-y-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/events/${ticket.eventSlug}`}
                      className="max-w-[240px] truncate font-display text-lg font-semibold text-foreground transition-colors hover:text-brand"
                    >
                      {ticket.eventTitle}
                    </Link>
                    <Badge variant="voltage">{ticket.ticketTypeLabel || 'General entry'}</Badge>
                  </div>
                  {ticket.venueName ? <p className="truncate text-sm text-ink-soft">{ticket.venueName}</p> : null}
                  <p className="flex items-center gap-2 text-xs text-ink-soft">
                    {formatEventDate(ticket.eventStartDate)}
                    {upcomingLabel(ticket.eventStartDate) ? (
                      <Badge variant="voltage">{upcomingLabel(ticket.eventStartDate)}</Badge>
                    ) : null}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-surface-sunken px-2 py-0.5 font-mono text-ink-soft">
                    {ticket.ticketCode}
                  </span>
                  {ticket.seatNumber ? (
                    <span className="rounded bg-surface-sunken px-2 py-0.5 text-ink-soft">
                      Seat {ticket.seatNumber}
                    </span>
                  ) : null}
                  <Badge variant={ticket.status === 'CheckedIn' ? 'success' : 'neutral'}>
                    {ticket.status === 'CheckedIn' ? 'Checked in' : ticket.status}
                  </Badge>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1.5 rounded-lg border border-hairline bg-white p-2">
                {ticket.qrToken ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveQr({
                        qrToken: ticket.qrToken,
                        label: `${ticket.ticketTypeLabel || 'General entry'} (${ticket.ticketCode})`,
                        bookingNumber: ticket.bookingNumber,
                      })
                    }
                    className="group flex cursor-pointer flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <QrImage
                      value={ticket.qrToken}
                      size={110}
                      className="transition-transform duration-[180ms] group-hover:scale-105"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint transition-colors group-hover:text-brand">
                      Tap to enlarge
                    </span>
                  </button>
                ) : (
                  <span className="p-4 text-xs text-ink-faint">No QR yet</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 rounded-lg border border-dashed border-hairline-strong py-16 text-center">
          <Ticket className="mx-auto size-8 stroke-1 text-ink-faint" />
          <p className="font-display text-lg font-semibold text-ink">No tickets yet</p>
          <p className="text-sm text-ink-soft">Your passes land here the moment you book.</p>
          <Link
            to="/"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-hover"
          >
            Browse events
          </Link>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">Bookings</h2>
        {bookingsError ? <p className="text-sm text-destructive">{bookingsError}</p> : null}
        {bookingsLoading ? (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : (bookings ?? []).length > 0 ? (
          <div className="space-y-3">
            {(bookings ?? []).map((booking) => (
              <Link
                key={booking.bookingsId}
                to={`/bookings/${booking.bookingsId}`}
                className="block overflow-hidden rounded-lg border border-hairline bg-surface shadow-[var(--shadow-e1)] transition-[transform,box-shadow] duration-[280ms] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-e2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-start justify-between gap-2 p-4">
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Booking</p>
                    <p className="font-mono text-lg font-medium text-ink">#{booking.bookingNumber}</p>
                  </div>
                  <Badge variant={booking.status === 'Paid' ? 'success' : 'neutral'}>{booking.status}</Badge>
                </div>
                <div className="svyne-ticket-edge" style={NOTCH} />
                <div className="flex items-center justify-between p-4 text-sm">
                  <span className="text-ink-soft">Seats reserved</span>
                  <span className="font-mono text-lg font-medium text-ink">{booking.seatsReserved}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-hairline py-8 text-center text-sm text-ink-soft">
            No bookings yet.
          </p>
        )}
      </section>

      <Dialog
        open={activeQr !== null}
        onOpenChange={(open) => {
          if (!open) setActiveQr(null);
        }}
      >
        <DialogContent className="flex max-w-xs flex-col items-center space-y-4 rounded-xl p-6 md:max-w-md">
          <DialogTitle className="text-center font-display text-xl font-semibold">Entry pass</DialogTitle>
          {activeQr && (
            <>
              <div className="rounded-xl border border-hairline bg-white p-4 shadow-[var(--shadow-e1)]">
                <QrImage value={activeQr.qrToken} size={250} />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-sm text-ink-soft">Scan at the gate</p>
                <p className="mt-2 font-mono text-lg font-medium tracking-wide text-foreground">{activeQr.label}</p>
                {activeQr.bookingNumber && (
                  <p className="font-mono text-xs text-ink-soft">Booking #{activeQr.bookingNumber}</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
