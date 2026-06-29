import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listVenues,
  createVenue,
  updateVenue,
  listVenueImages,
  addVenueImage,
  removeVenueImage,
  setPrimaryVenueImage,
  type VenueDraft,
} from '@/features/admin/services/catalogService';
import { rpcErrorMessage } from '@/shared/session';
import { uploadImage, imageUrl } from '@/shared/upload';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { MapPin } from 'lucide-react';
import {
  US_STATES,
  isValidEmail,
  isValidState,
  isValidUsPhone,
  toPhoneE164,
  formatUsPhone,
} from '@/shared/lib/validation';
import type { Venue } from '@/shared/proto/catalog';

function venueError(draft: VenueDraft): string | null {
  if (!draft.name.trim()) {
    return 'Name is required';
  }
  if (draft.email && !isValidEmail(draft.email)) {
    return 'Enter a valid email address';
  }
  if (draft.phone && !isValidUsPhone(draft.phone)) {
    return 'Enter a valid US phone (+1 and 10 digits)';
  }
  if (draft.state && !isValidState(draft.state)) {
    return 'Select a valid US state';
  }
  return null;
}

function normalizeVenue(draft: VenueDraft): VenueDraft {
  return { ...draft, phone: draft.phone ? toPhoneE164(draft.phone) : '' };
}


function emptyDraft(): VenueDraft {
  return {
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  };
}

function toDraft(venue: Venue): VenueDraft {
  return {
    name: venue.name,
    description: venue.description,
    phone: venue.phone,
    email: venue.email,
    website: venue.website,
    line1: venue.line1,
    line2: venue.line2,
    city: venue.city,
    state: venue.state,
    zip: venue.zip,
  };
}

function withDisplayPhone(draft: VenueDraft): VenueDraft {
  return { ...draft, phone: formatUsPhone(draft.phone) };
}

export function AdminVenuesPage() {
  const loader = useCallback(() => listVenues(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [draft, setDraft] = useState<VenueDraft>(emptyDraft());
  const [notice, setNotice] = useState<string | null>(null);

  async function add() {
    const err = venueError(draft);
    if (err) {
      setNotice(err);
      return;
    }
    setNotice(null);
    try {
      await createVenue(normalizeVenue(draft));
      setDraft(emptyDraft());
      reload();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Venues</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            Add venue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <VenueFields draft={draft} onChange={setDraft} />
          <Button onClick={add} disabled={!draft.name.trim()}>
            Add venue
          </Button>
        </CardContent>
      </Card>

      {loading ? <p className="text-muted-foreground">Loading…</p> : null}
      {error ? <p className="text-destructive">{error}</p> : null}
      <div className="space-y-3">
        {(data ?? []).map((venue) => (
          <VenueRow key={venue.venuesId} venue={venue} onChanged={reload} />
        ))}
      </div>
    </div>
  );
}

function VenueFields({ draft, onChange }: { draft: VenueDraft; onChange: (d: VenueDraft) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="space-y-1 md:col-span-2">
        <Label>Line 1</Label>
        <Input value={draft.line1} onChange={(e) => onChange({ ...draft, line1: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label>Line 2</Label>
        <Input value={draft.line2} onChange={(e) => onChange({ ...draft, line2: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label>City</Label>
        <Input value={draft.city} onChange={(e) => onChange({ ...draft, city: e.target.value })} />
      </div>
      <div className="flex gap-3">
        <div className="space-y-1">
          <Label>State</Label>
          <Select className="w-40" value={draft.state} onChange={(e) => onChange({ ...draft, state: e.target.value })}>
            <option value="">Select State</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} - {s.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Zip</Label>
          <Input className="w-28" value={draft.zip} onChange={(e) => onChange({ ...draft, zip: e.target.value })} />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Phone (US)</Label>
        <Input
          placeholder="+1 (555) 123-4567"
          value={draft.phone}
          onChange={(e) => onChange({ ...draft, phone: formatUsPhone(e.target.value) })}
        />
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input
          type="email"
          value={draft.email}
          onChange={(e) => onChange({ ...draft, email: e.target.value })}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <Label>Website</Label>
        <Input value={draft.website} onChange={(e) => onChange({ ...draft, website: e.target.value })} />
      </div>
    </div>
  );
}

function VenueRow({ venue, onChanged }: { venue: Venue; onChanged: () => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<VenueDraft>(withDisplayPhone(toDraft(venue)));
  const [notice, setNotice] = useState<string | null>(null);

  async function persist(isActive: boolean) {
    const err = venueError(draft);
    if (err) {
      setNotice(err);
      return;
    }
    setNotice(null);
    try {
      await updateVenue(venue.venuesId, normalizeVenue(draft), isActive);
      setEditing(false);
      onChanged();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-medium">{venue.name}</span>
            {venue.city || venue.state ? (
              <span className="ml-2 text-sm text-muted-foreground inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {[venue.city, venue.state].filter(Boolean).join(', ')}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={venue.isActive} onCheckedChange={(v) => persist(v)} label="Enabled" />
            <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}>
              {editing ? 'Close' : 'Edit'}
            </Button>
          </div>
        </div>
        {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
        {editing ? (
          <div className="space-y-4 border-t pt-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <VenueFields draft={draft} onChange={setDraft} />
            <Button size="sm" onClick={() => persist(venue.isActive)}>
              Save
            </Button>
            <VenueGallery venuesId={venue.venuesId} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function VenueGallery({ venuesId }: { venuesId: string }) {
  const loader = useCallback(() => listVenueImages(venuesId), [venuesId]);
  const { data, reload } = useAsync(loader);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function upload(file: File | undefined) {
    if (!file) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await uploadImage(file, 'venue', venuesId);
      await addVenueImage(venuesId, result.imagesId);
      reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  async function guard(action: () => Promise<void>) {
    setError(null);
    try {
      await action();
      reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-2 border-t pt-3">
      <Label>Images</Label>
      <Input type="file" accept="image/*" disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
      {error ? <p className="text-sm text-amber-600">{error}</p> : null}
      <div className="flex flex-wrap gap-3">
        {(data ?? []).map((image) => (
          <div key={image.imagesId} className="w-28 space-y-1">
            <img src={imageUrl(image.imagesId)} alt="" className="h-20 w-28 rounded object-cover" />
            <div className="flex items-center justify-between text-xs">
              {image.isPrimary ? (
                <span className="text-green-600">Primary</span>
              ) : (
                <button className="text-blue-600" onClick={() => guard(() => setPrimaryVenueImage(venuesId, image.imagesId))}>
                  Set primary
                </button>
              )}
              <button className="text-red-600" onClick={() => guard(() => removeVenueImage(venuesId, image.imagesId))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
