import { useCallback, useMemo, useState } from 'react';
import { Calendar, Check, ChevronsUpDown, ScrollText, Search } from 'lucide-react';
import { useAsync } from '@/shared/hooks/useAsync';
import { listAdminEvents } from '@/features/admin/services/adminService';
import { getAdminLogs } from '@/features/admin/services/logAdminService';
import { formatEpoch, formatEventDate } from '@/shared/lib/format';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/cn';
import type { Event } from '@/shared/proto/event';

const PAGE_SIZE = 25;

function pickDefaultEvent(events: Event[], now: Date): string {
  if (events.length === 0) return '';
  const nowSec = Math.floor(now.getTime() / 1000);
  const upcoming = events
    .filter((e) => (Number(e.startDate) || 0) >= nowSec)
    .sort((a, b) => (Number(a.startDate) || 0) - (Number(b.startDate) || 0));
  if (upcoming.length > 0) return upcoming[0].eventsId;
  const recent = [...events].sort((a, b) => (Number(b.startDate) || 0) - (Number(a.startDate) || 0));
  return recent[0].eventsId;
}

export function AdminLogsPage() {
  const eventsLoader = useCallback(() => listAdminEvents(), []);
  const { data: events, loading: eventsLoading } = useAsync(eventsLoader);

  const now = useMemo(() => new Date(), []);
  const allEvents = useMemo(() => events ?? [], [events]);
  const [override, setOverride] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = override !== '' ? override : pickDefaultEvent(allEvents, now);
  const selectedEvent = allEvents.find((e) => e.eventsId === selected) ?? null;
  const filteredEvents = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return allEvents;
    return allEvents.filter((e) => e.title.toLowerCase().includes(term));
  }, [allEvents, query]);

  const logsLoader = useCallback(
    () => (selected === '' ? Promise.resolve({ entries: [], total: 0 }) : getAdminLogs({ eventsId: selected, limit: shown })),
    [selected, shown],
  );
  const { data: logs, loading: logsLoading, error } = useAsync(logsLoader);
  const entries = logs?.entries ?? [];
  const total = logs?.total ?? 0;

  function choose(id: string) {
    setOverride(id);
    setShown(PAGE_SIZE);
    setPickerOpen(false);
    setQuery('');
  }

  return (
    <div className="space-y-8 pb-4">
      <section className="space-y-1.5">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Activity logs</h1>
        <p className="text-sm text-ink-soft">Pick an event to see everything that happened behind it — newest first.</p>
      </section>

      <section className="max-w-md space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Event</label>
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <button
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-hairline-strong bg-surface px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-surface-sunken"
              disabled={eventsLoading || allEvents.length === 0}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-brand" />
                <span className="truncate font-medium text-foreground">
                  {eventsLoading ? 'Loading events…' : selectedEvent ? selectedEvent.title : 'No events yet'}
                </span>
              </span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-ink-faint" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <div className="relative border-b border-hairline p-2">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events…" className="border-0 pl-8 shadow-none focus-visible:ring-0" autoFocus />
            </div>
            <div className="max-h-72 overflow-y-auto p-1">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((e) => (
                  <button
                    key={e.eventsId}
                    onClick={() => choose(e.eventsId)}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-surface-sunken',
                      e.eventsId === selected ? 'text-brand' : 'text-foreground',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{e.title}</span>
                      <span className="block text-xs text-ink-faint">{formatEventDate(e.startDate)}</span>
                    </span>
                    {e.eventsId === selected ? <Check className="h-4 w-4 shrink-0" /> : null}
                  </button>
                ))
              ) : (
                <p className="px-2.5 py-6 text-center text-sm text-ink-soft">No events match “{query}”.</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </section>

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
      ) : null}

      {logsLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : entries.length > 0 ? (
        <>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <ul className="divide-y divide-hairline">
                {entries.map((entry) => (
                  <li key={entry.id} className="flex gap-4 px-5 py-4">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand/60" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-medium text-foreground">
                          <span className="capitalize">{entry.action}</span>{' '}
                          <span className="text-ink-soft">· {entry.entityType}</span>
                        </p>
                        <p className="text-xs tabular-nums text-ink-faint">{formatEpoch(entry.timestamp)}</p>
                      </div>
                      {entry.detail ? <p className="mt-0.5 text-sm text-ink-soft">{entry.detail}</p> : null}
                      {entry.actorEmail ? <p className="mt-0.5 text-xs text-ink-faint">{entry.actorEmail}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {shown < total ? (
            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <ScrollText className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {allEvents.length === 0 ? 'No events yet' : 'Nothing logged for this event'}
              </h3>
              <p className="max-w-md text-sm text-ink-soft">
                {allEvents.length === 0
                  ? 'Once you create events and start working on them, their activity trail shows up here.'
                  : 'No recorded actions for this event yet — pricing changes and edits will appear here as they happen.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
