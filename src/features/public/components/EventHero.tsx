import type { CSSProperties } from 'react';
import { CalendarDays, Users, Ticket } from 'lucide-react';
import type { Event } from '@/shared/proto/event';
import { imageUrl } from '@/shared/upload';
import { formatEventDate } from '@/shared/lib/format';
import { Badge } from '@/shared/ui/badge';

const EVENT_TYPE_LABEL: Record<string, string> = {
  Open: 'General admission',
  Table: 'Table seating',
  Both: 'Tickets & tables',
};

export function EventHero({ event }: { event: Event }) {
  const date = formatEventDate(event.startDate);
  const hasImage = Boolean(event.primaryImageId);
  return (
    <header className="overflow-hidden rounded-2xl bg-card shadow-[0_8px_32px_rgba(36,21,34,0.12)]">
      <div className="relative">
        {hasImage ? (
          <img
            data-hero-img
            src={imageUrl(event.primaryImageId)}
            alt=""
            className="h-[44vh] max-h-[520px] w-full object-cover md:h-[58vh]"
          />
        ) : (
          <div
            data-hero-img
            className="h-[36vh] max-h-[420px] w-full bg-[color:var(--color-surface-dark)]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(36,21,34,0.85)] via-[rgba(36,21,34,0.25)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-5 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-soft">
            {event.category}
          </span>
          {event.status ? <Badge>{event.status}</Badge> : null}
        </div>
      </div>

      <div className="p-5 md:p-8">
        <h1
          data-hero-title
          className="text-3xl font-bold leading-[1.05] text-ink md:text-5xl"
        >
          {event.title}
        </h1>
        <div
          data-hero-meta
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-body"
        >
          {date ? (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-marigold" aria-hidden />
              <span className="font-medium text-ink">{date}</span>
            </span>
          ) : null}
          {event.totalCapacity > 0 ? (
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-marigold" aria-hidden />
              {event.totalCapacity} seats
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Ticket className="size-4 text-marigold" aria-hidden />
            {EVENT_TYPE_LABEL[event.eventType] ?? EVENT_TYPE_LABEL.Open}
          </span>
        </div>
      </div>

      <div className="px-5 md:px-8">
        <div data-hero-edge className="svyne-ticket-edge" style={{ '--svyne-notch': '#ffffff' } as CSSProperties} />
      </div>
      <div className="h-5" />
    </header>
  );
}
