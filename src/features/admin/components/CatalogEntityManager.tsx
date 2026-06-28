import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { rpcErrorMessage } from '@/shared/session';
import { uploadImage, imageUrl } from '@/shared/upload';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { NamedDraft } from '@/features/admin/services/catalogService';

interface MetaRow {
  key: string;
  value: string;
}

export interface CatalogEntity {
  name: string;
  slug: string;
  primaryImagePath: string;
  metaJson: string;
  isActive: boolean;
}

interface ManagerProps<T extends CatalogEntity> {
  title: string;
  entityType: string;
  suggestedKeys: string[];
  load: () => Promise<T[]>;
  create: (draft: NamedDraft) => Promise<string>;
  update: (id: string, draft: NamedDraft) => Promise<void>;
  remove: (id: string) => Promise<void>;
  idOf: (item: T) => string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseMeta(metaJson: string): MetaRow[] {
  try {
    const parsed = JSON.parse(metaJson || '[]');
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({ key: String(item.key ?? ''), value: String(item.value ?? '') }));
    }
  } catch {
    return [];
  }
  return [];
}

function serializeMeta(rows: MetaRow[]): string {
  return JSON.stringify(
    rows
      .filter((row) => row.key.trim())
      .map((row, index) => ({ key: row.key.trim(), value: row.value, isPublic: true, sortOrder: index })),
  );
}

export function CatalogEntityManager<T extends CatalogEntity>(props: ManagerProps<T>) {
  const loader = useCallback(() => props.load(), [props]);
  const { data, loading, error, reload } = useAsync(loader);
  const [notice, setNotice] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [imagesId, setImagesId] = useState('');
  const [meta, setMeta] = useState<MetaRow[]>([]);

  async function add() {
    setNotice(null);
    try {
      await props.create({
        name,
        slug: slugify(name),
        imagePath: imagesId,
        metaJson: serializeMeta(meta),
        isActive: true,
      });
      setName('');
      setImagesId('');
      setMeta([]);
      reload();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{props.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add {props.title.toLowerCase().replace(/s$/, '')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <ImageField entityType={props.entityType} imagesId={imagesId} onChange={setImagesId} />
          <MetaEditor rows={meta} onChange={setMeta} suggestedKeys={props.suggestedKeys} />
          <Button onClick={add} disabled={!name.trim()}>
            Add
          </Button>
        </CardContent>
      </Card>

      {loading ? <p className="text-muted-foreground">Loading…</p> : null}
      {error ? <p className="text-destructive">{error}</p> : null}
      <div className="space-y-3">
        {(data ?? []).map((item) => (
          <EntityRow
            key={props.idOf(item)}
            item={item}
            entityType={props.entityType}
            suggestedKeys={props.suggestedKeys}
            onSave={(draft) => props.update(props.idOf(item), draft)}
            onRemove={() => props.remove(props.idOf(item))}
            onChanged={reload}
          />
        ))}
      </div>
    </div>
  );
}

function EntityRow<T extends CatalogEntity>({
  item,
  entityType,
  suggestedKeys,
  onSave,
  onRemove,
  onChanged,
}: {
  item: T;
  entityType: string;
  suggestedKeys: string[];
  onSave: (draft: NamedDraft) => Promise<void>;
  onRemove: () => Promise<void>;
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [name, setName] = useState(item.name);
  const [imagesId, setImagesId] = useState(item.primaryImagePath);
  const [meta, setMeta] = useState<MetaRow[]>(parseMeta(item.metaJson));

  async function persist(isActive: boolean) {
    setNotice(null);
    try {
      await onSave({ name, slug: item.slug, imagePath: imagesId, metaJson: serializeMeta(meta), isActive });
      setEditing(false);
      onChanged();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  async function guard(action: () => Promise<void>) {
    setNotice(null);
    try {
      await action();
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
            {item.primaryImagePath ? (
              <img src={imageUrl(item.primaryImagePath)} alt="" className="h-10 w-10 rounded object-cover" />
            ) : null}
            <span className="font-medium">{item.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={item.isActive} onCheckedChange={(v) => persist(v)} label="Enabled" />
            <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}>
              {editing ? 'Close' : 'Edit'}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => guard(onRemove)}>
              Remove
            </Button>
          </div>
        </div>
        {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
        {editing ? (
          <div className="space-y-4 border-t pt-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <ImageField entityType={entityType} imagesId={imagesId} onChange={setImagesId} />
            <MetaEditor rows={meta} onChange={setMeta} suggestedKeys={suggestedKeys} />
            <Button size="sm" onClick={() => persist(item.isActive)}>
              Save
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ImageField({
  entityType,
  imagesId,
  onChange,
}: {
  entityType: string;
  imagesId: string;
  onChange: (imagesId: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File | undefined) {
    if (!file) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await uploadImage(file, entityType, '');
      onChange(result.imagesId);
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-1">
      <Label>Image</Label>
      <div className="flex items-center gap-3">
        {imagesId ? <img src={imageUrl(imagesId)} alt="" className="h-16 w-16 rounded object-cover" /> : null}
        <Input type="file" accept="image/*" disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
      </div>
      {error ? <p className="text-sm text-amber-600">{error}</p> : null}
    </div>
  );
}

function MetaEditor({
  rows,
  onChange,
  suggestedKeys,
}: {
  rows: MetaRow[];
  onChange: (rows: MetaRow[]) => void;
  suggestedKeys: string[];
}) {
  function update(index: number, patch: Partial<MetaRow>) {
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  return (
    <div className="space-y-2">
      <Label>Metadata, links &amp; social</Label>
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2">
          <Input
            className="w-44"
            placeholder="key"
            list="catalog-meta-keys"
            value={row.key}
            onChange={(e) => update(index, { key: e.target.value })}
          />
          <Input placeholder="value" value={row.value} onChange={(e) => update(index, { value: e.target.value })} />
          <Button size="sm" variant="ghost" onClick={() => onChange(rows.filter((_, i) => i !== index))}>
            ✕
          </Button>
        </div>
      ))}
      <datalist id="catalog-meta-keys">
        {suggestedKeys.map((key) => (
          <option key={key} value={key} />
        ))}
      </datalist>
      <Button size="sm" variant="outline" onClick={() => onChange([...rows, { key: '', value: '' }])}>
        Add field
      </Button>
    </div>
  );
}
