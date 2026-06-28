import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, type EventDraft } from '@/features/admin/services/eventAdminService';
import { listVenues } from '@/features/admin/services/catalogService';
import type { Venue } from '@/shared/proto/catalog';
import { listEnums, type EnumOption } from '@/shared/enums';
import { tzForState, zonedInputToEpoch } from '@/shared/lib/timezone';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Separator } from '@/shared/ui/separator';
import { Field, FieldLabel, FieldGroup } from '@/shared/ui/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { DateTimePicker } from '@/shared/ui/date-time-picker';

export function AdminEventWizardPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<EnumOption[]>([]);
  const [category, setCategory] = useState('');
  const [eventTypes, setEventTypes] = useState<EnumOption[]>([]);
  const [eventType, setEventType] = useState('Open');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesId, setVenuesId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const venueTz = tzForState(venues.find((v) => v.venuesId === venuesId)?.state);

  useEffect(() => {
    listVenues()
      .then((loaded) => {
        setVenues(loaded);
        if (loaded.length > 0) {
          setVenuesId(loaded[0].venuesId);
        }
      })
      .catch((caught) => setError(rpcErrorMessage(caught)));
    listEnums('EventCategory')
      .then((loaded) => {
        setCategories(loaded);
        if (loaded.length > 0) {
          setCategory(loaded[0].value);
        }
      })
      .catch((caught) => setError(rpcErrorMessage(caught)));
    listEnums('EventType')
      .then((loaded) => {
        setEventTypes(loaded);
        if (loaded.length > 0) {
          setEventType(loaded[0].value);
        }
      })
      .catch((caught) => setError(rpcErrorMessage(caught)));
  }, []);

  async function submit() {
    if (!venuesId) {
      setError('Select a venue first');
      return;
    }
    setSubmitting(true);
    setError(null);
    const draft: EventDraft = {
      title,
      slug: '',
      description,
      status: 'Draft',
      category,
      startDate: zonedInputToEpoch(start, venueTz),
      endDate: zonedInputToEpoch(end, venueTz),
      // Open seating has no floor plan; Table/Both need the grid layout.
      layoutMode: eventType === 'Open' ? 'Open' : 'Grid',
      eventType,
      venuesId,
      imagePath: '',
    };
    try {
      const eventsId = await createEvent(draft);
      navigate(`/events/${eventsId}`);
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="svyne-page mx-auto w-full max-w-2xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">New event</h1>
        <p className="text-sm text-muted-foreground">
          Set up the basics now — tickets, tables and pricing come after you create the event.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Event details</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <SectionLabel>Details</SectionLabel>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summer Gala 2026"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="eventType">Event type</FieldLabel>
                <Select
                  id="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  {eventTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value === 'Open'
                        ? 'Open seating (ticket tiers)'
                        : option.value === 'Table'
                          ? 'Table based (floor plan)'
                          : 'Both (tiers + tables)'}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell guests what to expect…"
                  rows={4}
                />
              </Field>
            </div>

            <Separator />

            <SectionLabel>Venue &amp; schedule</SectionLabel>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="venue">Venue</FieldLabel>
                <Select id="venue" value={venuesId} onChange={(e) => setVenuesId(e.target.value)}>
                  {venues.length === 0 ? (
                    <option value="">No venues — create one first</option>
                  ) : null}
                  {venues.map((venue) => (
                    <option key={venue.venuesId} value={venue.venuesId}>
                      {venue.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <FieldLabel>Start</FieldLabel>
                <DateTimePicker value={start} onChange={setStart} timeZone={venueTz} />
              </Field>
              <Field>
                <FieldLabel>End</FieldLabel>
                <DateTimePicker value={end} onChange={setEnd} timeZone={venueTz} />
              </Field>
            </div>

            {error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <Separator />

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => navigate(-1)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={submit} disabled={submitting}>
                {submitting ? 'Creating…' : 'Create event'}
              </Button>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{children}</p>
  );
}
