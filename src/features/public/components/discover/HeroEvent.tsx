import { Link } from 'react-router-dom';
import type { Event } from '@/shared/proto/event';
import { imageUrl } from '@/shared/upload';
import { formatEventDate } from '@/shared/lib/format';
import { Countdown } from '@/features/public/components/discover/Countdown';

export function HeroEvent({ event }: { event: Event }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-stage shadow-[var(--shadow-e2)]">
      {event.primaryImageId ? (
        <img
          src={imageUrl(event.primaryImageId)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-stage via-stage/55 to-transparent" />
      <div className="relative flex min-h-[420px] flex-col justify-end gap-5 p-6 md:min-h-[520px] md:p-12">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-voltage">
          {formatEventDate(event.startDate)}
          {event.category ? ` — ${event.category}` : ''}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold text-on-stage md:text-6xl">
          {event.title}
        </h1>
        {event.description ? (
          <p className="max-w-xl text-sm leading-relaxed text-on-stage-soft md:text-base line-clamp-2">
            {event.description}
          </p>
        ) : null}
        <div className="mt-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Countdown startEpoch={event.startDate} endEpoch={event.endDate} />
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow-[var(--shadow-e1)] transition-[transform,background-color] duration-[180ms] ease-[var(--ease-out)] hover:bg-brand-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-stage md:w-auto"
          >
            Get tickets
          </Link>
        </div>
      </div>
    </section>
  );
}
