import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { NotFoundPage } from '@/shared/components/StatusPages';
import { centsToUSD, centsToUsdInput, usdToCents, formatEventDate } from '@/shared/lib/format';
import {
  type DemoEvent,
  type DemoEventFilter,
  type DemoEventInput,
  getDemoOrganizer,
  getDemoOrganizerStats,
  listDemoEvents,
  createDemoEvent,
  updateDemoEvent,
  deleteDemoEvent,
  resetDemoDb,
  daysLeftLabel,
  soldPercent,
  monthBarPercents,
  epochToDateInput,
  dateInputToEpoch,
} from '@/features/public/lib/organizerDemoDb';
import { CalendarX, MapPin, Ticket, Share2, Plus, RotateCcw } from 'lucide-react';

const PAGE_SIZE = 6;
const publicFilters: { key: DemoEventFilter; label: string }[] = [
  { key: 'all', label: 'All Events' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'virtual', label: 'Virtual' },
];
const adminFilters: { key: DemoEventFilter; label: string }[] = [
  ...publicFilters,
  { key: 'draft', label: 'Drafts' },
];

export function OrganizerPage({ admin = false }: { admin?: boolean }) {
  const { slug = '' } = useParams();
  const organizer = getDemoOrganizer(slug);
  const [filter, setFilter] = useState<DemoEventFilter>('all');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [version, setVersion] = useState(0);
  const [editing, setEditing] = useState<DemoEvent | 'new' | null>(null);
  const [copied, setCopied] = useState(false);

  void version;
  const events = listDemoEvents(slug, filter, search, admin);
  const stats = admin ? getDemoOrganizerStats(slug) : null;
  const barPercents = stats ? monthBarPercents(stats.revenueByMonth) : [];

  if (!organizer) {
    return <NotFoundPage />;
  }

  const shown = events.slice(0, visible);
  const changed = () => setVersion((v) => v + 1);

  const share = () => {
    void navigator.clipboard.writeText(`${window.location.origin}/organizer/${slug}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const remove = (event: DemoEvent) => {
    if (window.confirm(`Delete "${event.title}"? This cannot be undone.`)) {
      deleteDemoEvent(event.id);
      changed();
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      <header className="space-y-5 rounded-2xl border border-hairline bg-surface p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              {organizer.emoji} {organizer.name}
            </h1>
            <p className="text-ink-soft">{organizer.tagline}</p>
            <p className="text-sm text-ink-faint">Organized by {organizer.owner}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {admin ? (
              <>
                <Button onClick={() => setEditing('new')}>
                  <Plus /> Create Event
                </Button>
                <Button variant="outline" onClick={share}>
                  <Share2 /> {copied ? 'Link copied!' : 'Share'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    resetDemoDb();
                    changed();
                  }}
                >
                  <RotateCcw /> Reset Demo
                </Button>
                <Link to={`/organizer/${slug}`} className="inline-flex">
                  <Button variant="outline">View Public Page</Button>
                </Link>
              </>
            ) : (
              <>
                <Button onClick={() => window.alert('Following! (demo)')}>Follow Organizer</Button>
                <Button variant="outline" onClick={share}>
                  <Share2 /> {copied ? 'Link copied!' : 'Share'}
                </Button>
              </>
            )}
          </div>
        </div>

        {admin && stats ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <StatBox label="Events" value={String(stats.eventCount)} />
              <StatBox label="Tickets Sold" value={String(stats.totalSold)} />
              <StatBox label="Total Revenue" value={centsToUSD(stats.totalRevenueCents)} />
              <StatBox label="This Month" value={centsToUSD(stats.monthRevenueCents)} />
              <StatBox label="Avg Ticket" value={centsToUSD(stats.avgTicketCents)} />
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="mb-3 text-sm font-medium text-ink-soft">Revenue by month (12 months)</p>
              <div className="flex h-24 items-end gap-1.5">
                {stats.revenueByMonth.map((m, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <div
                      className="w-full rounded-t bg-brand/70"
                      style={{ height: `${Math.max(barPercents[i], 2)}%` }}
                      title={centsToUSD(m.cents)}
                    />
                    <span className="text-[10px] text-ink-faint">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-6 text-sm">
            <span className="text-ink-soft">
              <strong className="text-ink">{events.length}</strong> events
            </span>
            <span className="text-ink-soft">
              <strong className="text-ink">{organizer.followers}</strong> followers
            </span>
          </div>
        )}
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {(admin ? adminFilters : publicFilters).map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setVisible(PAGE_SIZE);
              }}
              className={
                filter === f.key
                  ? 'cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground'
                  : 'cursor-pointer rounded-full border border-hairline-strong px-4 py-1.5 text-sm text-ink-soft hover:bg-surface-sunken'
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search events..."
          className="max-w-xs"
        />
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {shown.map((event) => (
            <DemoEventCard key={event.id} event={event} admin={admin} onEdit={setEditing} onDelete={remove} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md space-y-3 rounded-lg border border-dashed border-hairline-strong p-16 text-center">
          <div className="inline-flex rounded-full bg-surface-sunken p-4 text-ink-faint">
            <CalendarX className="h-8 w-8" />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">No events found</h3>
          <p className="text-sm text-ink-soft">
            {search || filter !== 'all' ? 'Try widening your filters.' : 'No events published yet.'}
          </p>
        </div>
      )}

      {events.length > visible ? (
        <div className="space-y-2 text-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More Events
          </Button>
          <p className="text-sm text-ink-faint">
            Showing {shown.length} of {events.length} events
          </p>
        </div>
      ) : null}

      {editing ? (
        <EventFormDialog
          event={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSave={(input) => {
            if (editing === 'new') {
              createDemoEvent(slug, input);
            } else {
              updateDemoEvent(editing.id, input);
            }
            setEditing(null);
            changed();
          }}
        />
      ) : null}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface-sunken p-3 text-center">
      <p className="font-display text-xl font-semibold text-ink">{value}</p>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function DemoEventCard({
  event,
  admin,
  onEdit,
  onDelete,
}: {
  event: DemoEvent;
  admin: boolean;
  onEdit: (event: DemoEvent) => void;
  onDelete: (event: DemoEvent) => void;
}) {
  const percent = soldPercent(event.sold, event.capacity);
  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            {event.emoji} {event.title}
          </h3>
          {event.status === 'draft' ? (
            <span className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-xs font-medium text-ink-soft">
              Draft
            </span>
          ) : (
            <span className="whitespace-nowrap text-xs font-medium text-ink-soft">
              ⏳ {daysLeftLabel(event.startsAt)}
            </span>
          )}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 shrink-0" />
          {event.venue}, {event.city}
        </p>
        <p className="text-sm text-ink-soft">📅 {formatEventDate(event.startsAt)}</p>
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-sm text-ink-soft">
            <Ticket className="h-4 w-4 shrink-0" />
            {event.sold} of {event.capacity} tickets sold
          </p>
          <div className="h-1.5 w-full rounded-full bg-surface-sunken">
            <div className="h-1.5 rounded-full bg-brand" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <p className="text-sm font-medium text-ink">
          {admin
            ? `💰 Revenue: ${centsToUSD(event.revenueCents)} · ${event.sold} tickets`
            : event.priceFromCents > 0
              ? `💰 Starting at ${centsToUSD(event.priceFromCents)}`
              : '💰 Free'}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {admin ? (
            <>
              <Button size="sm" onClick={() => onEdit(event)}>
                Edit Event
              </Button>
              <Button size="sm" variant="outline" onClick={() => window.alert('Public event detail (demo)')}>
                View Public Event
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(event)}>
                Delete
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => window.alert('Event detail page (demo)')}>
              View Event →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EventFormDialog({
  event,
  onClose,
  onSave,
}: {
  event: DemoEvent | null;
  onClose: () => void;
  onSave: (input: DemoEventInput) => void;
}) {
  const [title, setTitle] = useState(event?.title ?? '');
  const [venue, setVenue] = useState(event?.venue ?? '');
  const [city, setCity] = useState(event?.city ?? '');
  const [date, setDate] = useState(event ? epochToDateInput(event.startsAt) : '');
  const [capacity, setCapacity] = useState(event ? String(event.capacity) : '100');
  const [price, setPrice] = useState(event ? centsToUsdInput(event.priceFromCents) : '25.00');
  const [status, setStatus] = useState<'published' | 'draft'>(event?.status ?? 'published');
  const [virtual, setVirtual] = useState(event?.virtual ?? false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      return;
    }
    onSave({
      title: title.trim(),
      venue: venue.trim() || 'TBD',
      city: virtual ? 'Virtual' : city.trim() || 'TBD',
      startsAt: dateInputToEpoch(date),
      capacity: Math.max(1, Number(capacity) || 1),
      priceFromCents: usdToCents(price),
      status,
      virtual,
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="demo-title">Title</Label>
            <Input id="demo-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="demo-venue">Venue</Label>
              <Input id="demo-venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-city">City</Label>
              <Input id="demo-city" value={city} onChange={(e) => setCity(e.target.value)} disabled={virtual} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="demo-date">Date</Label>
              <Input id="demo-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-capacity">Capacity</Label>
              <Input
                id="demo-capacity"
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-price">Price ($)</Label>
              <Input id="demo-price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" checked={virtual} onChange={(e) => setVirtual(e.target.checked)} />
              Virtual event
            </label>
            <div className="flex items-center gap-2">
              <Label htmlFor="demo-status">Status</Label>
              <Select
                id="demo-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{event ? 'Save Changes' : status === 'draft' ? 'Create Draft' : 'Publish'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
