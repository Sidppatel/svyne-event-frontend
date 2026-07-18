import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Ticket, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAsync } from '@/shared/hooks/useAsync';
import { useAuth } from '@/shared/auth/useAuth';
import { isEventManager } from '@/shared/roles';
import { listAdminEvents } from '@/features/admin/services/adminService';
import { deleteEvent, changeEventStatus } from '@/features/admin/services/eventAdminService';
import { filterEvents, countEvents, type EventFilter } from '@/features/admin/lib/dashboardInsights';
import { ManagedEventCard } from '@/features/admin/components/ManagedEventCard';
import { publishBlockers } from '@/features/admin/lib/eventInsights';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent } from '@/shared/ui/card';
import type { Event } from '@/shared/proto/event';

const PAGE_SIZE = 9;

const FILTERS: { id: EventFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'draft', label: 'Drafts' },
];

export function AdminEventsPage() {
  const { tenantSlug, role } = useAuth();
  const loader = useCallback(() => listAdminEvents(), []);
  const { data, loading, error, reload } = useAsync(loader);

  const [filter, setFilter] = useState<EventFilter>('all');
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

  const now = useMemo(() => new Date(), []);
  const events = useMemo(() => data ?? [], [data]);
  const counts = useMemo(() => countEvents(events, now), [events, now]);
  const filtered = useMemo(() => filterEvents(events, filter, search, now), [events, filter, search, now]);
  const visible = filtered.slice(0, shown);

  function pick(next: EventFilter) {
    setFilter(next);
    setShown(PAGE_SIZE);
  }

  async function act(action: () => Promise<void>) {
    try {
      await action();
      reload();
    } catch (caught) {
      toast.error(rpcErrorMessage(caught));
    }
  }

  function publish(event: Event) {
    const missing = publishBlockers(event);
    if (missing.length > 0) {
      toast.error(`Please fill in all required fields before publishing: ${missing.join(', ')}`);
      return;
    }
    void act(() => changeEventStatus(event.eventsId, 'Published'));
  }

  function share(event: Event) {
    if (!tenantSlug || !event.slug) {
      toast.error('Publish this event to get a shareable link.');
      return;
    }
    const { protocol, host } = window.location;
    const labels = host.split('.');
    labels[0] = tenantSlug;
    void navigator.clipboard.writeText(`${protocol}//${labels.join('.')}/events/${event.slug}`);
    toast.success('Share link copied to clipboard.');
  }

  function remove(event: Event) {
    if (window.confirm(`Delete "${event.title}"? This can't be undone.`)) {
      act(() => deleteEvent(event.eventsId));
    }
  }

  return (
    <div className="space-y-8 pb-4">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Your events</h1>
          <p className="text-sm text-ink-soft">
            {counts.total === 0
              ? 'Everything you run will live here.'
              : `${counts.total} ${counts.total === 1 ? 'event' : 'events'} · ${counts.active} live right now.`}
          </p>
        </div>
        {isEventManager(role) ? null : (
          <Link to="/events/new">
            <Button size="lg">
              <Plus /> New event
            </Button>
          </Link>
        )}
      </section>

      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex flex-wrap gap-1 rounded-lg border border-hairline bg-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => pick(f.id)}
              className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f.id ? 'bg-brand text-brand-ink shadow-[var(--shadow-e1)]' : 'text-ink-soft hover:bg-surface-sunken'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShown(PAGE_SIZE);
            }}
            placeholder="Search events…"
            className="pl-9"
          />
        </div>
      </section>

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event) => (
              <ManagedEventCard
                key={event.eventsId}
                event={event}
                now={now}
                onPublish={() => publish(event)}
                onCancel={() => act(() => changeEventStatus(event.eventsId, 'Cancelled'))}
                onDelete={() => remove(event)}
                onShare={() => share(event)}
              />
            ))}
          </div>
          {shown < filtered.length ? (
            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
          ) : null}
        </>
      ) : events.length === 0 ? (
        <EmptyEvents canCreate={!isEventManager(role)} />
      ) : (
        <p className="rounded-lg border border-dashed border-hairline-strong p-10 text-center text-sm text-ink-soft">
          Nothing matches that. Try another filter or search.
        </p>
      )}
    </div>
  );
}

function EmptyEvents({ canCreate }: { canCreate: boolean }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-5 px-6 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Ticket className="h-7 w-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">No events yet</h3>
          <p className="max-w-md text-sm text-ink-soft">
            {canCreate
              ? 'Creating the first one takes a couple of minutes — add a title and date, set your ticket prices, and publish.'
              : 'Once an admin assigns you to an event, it will show up here.'}
          </p>
        </div>
        {canCreate ? (
          <Link to="/events/new">
            <Button size="lg">
              <Plus /> Create your first event <ArrowRight />
            </Button>
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
