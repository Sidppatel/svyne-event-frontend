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
import { AddressAutocomplete } from '@/shared/components/AddressAutocomplete';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Venue } from '@/shared/proto/catalog';


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

export function AdminVenuesPage() {
  const loader = useCallback(() => listVenues(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [draft, setDraft] = useState<VenueDraft>(emptyDraft());
  const [notice, setNotice] = useState<string | null>(null);

  async function add() {
    setNotice(null);
    try {
      await createVenue(draft);
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
          <CardTitle>Add venue</CardTitle>
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
        <Label>Line 1 (type to search)</Label>
        <AddressAutocomplete
          value={draft.line1}
          onChange={(line1) => onChange({ ...draft, line1 })}
          onSelect={(a) => onChange({ ...draft, line1: a.line1, city: a.city, state: a.state, zip: a.zip })}
        />
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
          <Input className="w-20" maxLength={2} value={draft.state} onChange={(e) => onChange({ ...draft, state: e.target.value.toUpperCase() })} />
        </div>
        <div className="space-y-1">
          <Label>Zip</Label>
          <Input className="w-28" value={draft.zip} onChange={(e) => onChange({ ...draft, zip: e.target.value })} />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Phone</Label>
        <Input value={draft.phone} onChange={(e) => onChange({ ...draft, phone: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input value={draft.email} onChange={(e) => onChange({ ...draft, email: e.target.value })} />
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
  const [draft, setDraft] = useState<VenueDraft>(toDraft(venue));
  const [notice, setNotice] = useState<string | null>(null);

  async function persist(isActive: boolean) {
    setNotice(null);
    try {
      await updateVenue(venue.venuesId, draft, isActive);
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
            <span className="ml-2 text-sm text-muted-foreground">
              {[venue.city, venue.state].filter(Boolean).join(', ')}
            </span>
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
