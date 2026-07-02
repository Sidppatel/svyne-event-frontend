import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listMyTickets } from '@/features/public/services/ticketService';
import { formatEventDate } from '@/shared/lib/format';
import { Skeleton } from '@/shared/ui/skeleton';
import { Badge } from '@/shared/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { QrImage } from '@/features/public/components/wallet/QrImage';
import { upcomingLabel, partitionTicketsByUpcoming } from '@/features/public/lib/discover';
import { Ticket as TicketIcon } from 'lucide-react';
import type { Ticket } from '@/shared/proto/bookings';
import { cn } from '@/shared/lib/cn';

interface ActiveQr {
  qrToken: string;
  label: string;
  bookingNumber?: string;
}

export function TicketsPage() {
  const ticketsLoader = useCallback(() => listMyTickets(), []);
  const { data: tickets, loading, error } = useAsync(ticketsLoader);
  const [activeQr, setActiveQr] = useState<ActiveQr | null>(null);

  const { upcoming, previous } = useMemo(
    () => partitionTicketsByUpcoming(tickets ?? []),
    [tickets],
  );

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-semibold text-ink">Your tickets</h1>
        <p className="text-sm text-ink-soft">Show the QR code at the door — that's your entry.</p>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-lg" />
          ))}
        </div>
      ) : (tickets ?? []).length === 0 ? (
        <div className="space-y-3 rounded-lg border border-dashed border-hairline-strong py-16 text-center">
          <TicketIcon className="mx-auto size-8 stroke-1 text-ink-faint" />
          <p className="font-display text-lg font-semibold text-ink">No tickets yet</p>
          <p className="text-sm text-ink-soft">Your passes land here the moment you book.</p>
          <Link
            to="/"
            className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-hover"
          >
            Browse events
          </Link>
        </div>
      ) : (
        <>
          {upcoming.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-ink">Coming up</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcoming.map((ticket) => (
                  <TicketPass key={ticket.ticketsId} ticket={ticket} highlight onShowQr={setActiveQr} />
                ))}
              </div>
            </section>
          ) : null}

          {previous.length > 0 ? (
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-ink">Previous tickets</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {previous.map((ticket) => (
                  <TicketPass key={ticket.ticketsId} ticket={ticket} onShowQr={setActiveQr} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}

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

function TicketPass({
  ticket,
  highlight = false,
  onShowQr,
}: {
  ticket: Ticket;
  highlight?: boolean;
  onShowQr: (qr: ActiveQr) => void;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 overflow-hidden rounded-lg border bg-surface p-5 shadow-[var(--shadow-e1)]',
        highlight ? 'border-brand/40 ring-1 ring-brand/20' : 'border-hairline opacity-80',
      )}
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
              onShowQr({
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
  );
}
