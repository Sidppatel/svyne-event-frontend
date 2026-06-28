import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listTableTemplates,
  createTableTemplate,
  updateTableTemplate,
} from '@/features/admin/services/tableTemplateService';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUsdInput, usdToCents } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { TableTemplate } from '@/shared/proto/booking';

const SHAPES = ['Round', 'Rectangle', 'Square', 'Cocktail'];

const COLOR_PALETTE = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

function nextUnusedColor(used: string[]): string {
  const taken = new Set(used.map((c) => c.toLowerCase()));
  return COLOR_PALETTE.find((c) => !taken.has(c.toLowerCase())) ?? '#4f46e5';
}

export function AdminTableTypesPage() {
  const loader = useCallback(() => listTableTemplates(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [notice, setNotice] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [colorOverride, setColorOverride] = useState<string | null>(null);
  const suggestedColor = nextUnusedColor((data ?? []).map((t) => t.defaultColor || '').filter(Boolean));
  const color = colorOverride ?? suggestedColor;
  const [capacity, setCapacity] = useState(8);
  const [priceUsd, setPriceUsd] = useState('0.00');
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(80);
  const [shape, setShape] = useState('Round');
  const [allInclusive, setAllInclusive] = useState(true);

  async function add() {
    setNotice(null);
    try {
      await createTableTemplate({
        name,
        defaultColor: color,
        defaultCapacity: capacity,
        defaultPriceCents: usdToCents(priceUsd),
        defaultWidth: width,
        defaultHeight: height,
        defaultShape: shape,
        defaultIsAllInclusive: allInclusive,
      });
      setName('');
      setPriceUsd('0.00');
      setColorOverride(null);
      reload();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Table Types</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add table type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1">
              <Label>Name (locked after creation)</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Color</Label>
              <Input type="color" className="h-9 w-16 p-1" value={color} onChange={(e) => setColorOverride(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Capacity</Label>
              <Input type="number" className="w-24" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Price (USD)</Label>
              <Input className="w-28" value={priceUsd} onChange={(e) => setPriceUsd(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Width</Label>
              <Input type="number" className="w-24" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Height</Label>
              <Input type="number" className="w-24" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Shape</Label>
              <select
                className="h-9 rounded-md border px-2 text-sm"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
              >
                {SHAPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <Switch checked={allInclusive} onCheckedChange={setAllInclusive} label="All-inclusive" />
              <Label>All-inclusive</Label>
            </div>
            <Button onClick={add} disabled={!name.trim()}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? <p className="text-muted-foreground">Loading…</p> : null}
      {error ? <p className="text-destructive">{error}</p> : null}
      <div className="space-y-3">
        {(data ?? []).map((template) => (
          <TableTypeRow key={template.tableTemplatesId} template={template} onChanged={reload} />
        ))}
      </div>
    </div>
  );
}

function TableTypeRow({ template, onChanged }: { template: TableTemplate; onChanged: () => void }) {
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [color, setColor] = useState(template.defaultColor || '#4f46e5');
  const [capacity, setCapacity] = useState(template.defaultCapacity);
  const [priceUsd, setPriceUsd] = useState(centsToUsdInput(template.defaultPriceCents));
  const [width, setWidth] = useState(template.defaultWidth);
  const [height, setHeight] = useState(template.defaultHeight);
  const [shape, setShape] = useState(template.defaultShape || 'Round');
  const [allInclusive, setAllInclusive] = useState(template.defaultIsAllInclusive);

  async function persist(isActive: boolean) {
    setNotice(null);
    try {
      await updateTableTemplate({
        tableTemplatesId: template.tableTemplatesId,
        defaultColor: color,
        defaultCapacity: capacity,
        defaultPriceCents: usdToCents(priceUsd),
        defaultWidth: width,
        defaultHeight: height,
        defaultShape: shape,
        defaultIsAllInclusive: allInclusive,
        isActive,
      });
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
          <div className="flex items-center gap-3">
            <span className="inline-block h-5 w-5 rounded" style={{ backgroundColor: template.defaultColor || '#ccc' }} />
            <span className="font-medium">{template.name}</span>
            <span className="text-sm text-muted-foreground">
              {template.defaultCapacity} seats · {template.defaultShape}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={template.isActive} onCheckedChange={(v) => persist(v)} label="Enabled" />
            <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}>
              {editing ? 'Close' : 'Edit'}
            </Button>
          </div>
        </div>
        {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
        {editing ? (
          <div className="flex flex-wrap items-end gap-3 border-t pt-3">
            <div className="space-y-1">
              <Label>Color</Label>
              <Input type="color" className="h-9 w-16 p-1" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Capacity</Label>
              <Input type="number" className="w-24" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Price (USD)</Label>
              <Input className="w-28" value={priceUsd} onChange={(e) => setPriceUsd(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Width</Label>
              <Input type="number" className="w-24" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Height</Label>
              <Input type="number" className="w-24" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
            <div className="space-y-1">
              <Label>Shape</Label>
              <select
                className="h-9 rounded-md border px-2 text-sm"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
              >
                {SHAPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 pb-2">
              <Switch checked={allInclusive} onCheckedChange={setAllInclusive} label="All-inclusive" />
              <Label>All-inclusive</Label>
            </div>
            <Button size="sm" onClick={() => persist(template.isActive)}>
              Save
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
