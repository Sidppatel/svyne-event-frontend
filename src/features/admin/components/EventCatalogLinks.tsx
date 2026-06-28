import { useCallback, useState } from 'react';
import { Mic2, Award } from 'lucide-react';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listPerformers,
  listSponsors,
  setEventPerformers,
  setEventSponsors,
} from '@/features/admin/services/catalogService';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Select } from '@/shared/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { LucideIcon } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

function parseLinks(json: string, idKey: string): Option[] {
  try {
    const parsed = JSON.parse(json || '[]');
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({ id: String(item[idKey] ?? ''), name: String(item.name ?? '') }))
        .filter((item) => item.id);
    }
  } catch {
    return [];
  }
  return [];
}

export function EventCatalogLinks({
  eventsId,
  performersJson,
  sponsorsJson,
  onChanged,
}: {
  eventsId: string;
  performersJson: string;
  sponsorsJson: string;
  onChanged: () => void;
}) {
  const performersLoader = useCallback(() => listPerformers(), []);
  const sponsorsLoader = useCallback(() => listSponsors(), []);
  const performers = useAsync(performersLoader);
  const sponsors = useAsync(sponsorsLoader);

  const performerOptions = (performers.data ?? [])
    .filter((p) => p.isActive)
    .map((p) => ({ id: p.performersId, name: p.name }));
  const sponsorOptions = (sponsors.data ?? [])
    .filter((s) => s.isActive)
    .map((s) => ({ id: s.sponsorsId, name: s.name }));

  return (
    <>
      <LinkManager
        icon={Mic2}
        title="Performers"
        options={performerOptions}
        selected={parseLinks(performersJson, 'performerId')}
        onChange={(ids) => setEventPerformers(eventsId, ids).then(onChanged)}
      />
      <LinkManager
        icon={Award}
        title="Sponsors"
        options={sponsorOptions}
        selected={parseLinks(sponsorsJson, 'sponsorId')}
        onChange={(ids) => setEventSponsors(eventsId, ids).then(onChanged)}
      />
    </>
  );
}

function LinkManager({
  icon: Icon,
  title,
  options,
  selected,
  onChange,
}: {
  icon: LucideIcon;
  title: string;
  options: Option[];
  selected: Option[];
  onChange: (ids: string[]) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedIds = selected.map((s) => s.id);
  const available = options.filter((o) => !selectedIds.includes(o.id));

  async function apply(ids: string[]) {
    setBusy(true);
    setError(null);
    try {
      await onChange(ids);
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:size-4">
          <Icon />
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Select
          className="w-64"
          value=""
          disabled={busy || available.length === 0}
          onChange={(e) => e.target.value && apply([...selectedIds, e.target.value])}
        >
          <option value="">{available.length === 0 ? `No more ${title.toLowerCase()}` : `+ Add ${title.toLowerCase()}`}</option>
          {available.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </Select>
        {error ? <p className="text-sm text-amber-foreground">{error}</p> : null}
        {selected.length === 0 ? (
          <p className="text-sm text-muted-foreground">None linked yet.</p>
        ) : (
          <div className="space-y-1">
            {selected.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-1 text-sm">
                <span>{item.name || item.id}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => apply(selectedIds.filter((id) => id !== item.id))}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
