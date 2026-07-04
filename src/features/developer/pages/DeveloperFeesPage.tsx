import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listFeeFormulas,
  createFeeFormula,
  updateFeeFormula,
  deleteFeeFormula,
  listAllEvents,
  assignFeeFormula,
  previewFee,
  type FeeFormula,
} from '@/features/developer/services/developerFeeService';
import {
  getRevenueReport,
  getTenantActivity,
  listFeeOverrides,
  tierLabel,
} from '@/features/developer/services/developerBillingService';
import {
  buildFeesIntel,
  filterCards,
  sortCards,
  type CardSort,
  type Insight,
  type TenantCard,
} from '@/features/developer/services/feesIntel';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const EMPTY_FORM = { name: '', percent: '', flat: '', min: '', max: '' };
const PREVIEW_PRICE = 5000;

const SORTS: { value: CardSort; label: string }[] = [
  { value: 'fees', label: 'Highest fees' },
  { value: 'leakage', label: 'Most unpriced items' },
  { value: 'tickets', label: 'Most tickets' },
  { value: 'name', label: 'Name' },
];

const INSIGHT_STYLES: Record<Insight['tone'], string> = {
  info: 'border-l-primary bg-primary/5',
  warn: 'border-l-warning bg-warning/10',
  success: 'border-l-success bg-success/10',
};

export function DeveloperFeesPage() {
  const formulasLoader = useCallback(() => listFeeFormulas(), []);
  const eventsLoader = useCallback(() => listAllEvents(), []);
  const activityLoader = useCallback(() => getTenantActivity('', ''), []);
  const overridesLoader = useCallback(() => listFeeOverrides(), []);
  const reportLoader = useCallback(() => getRevenueReport('0', '0'), []);

  const formulas = useAsync(formulasLoader);
  const events = useAsync(eventsLoader);
  const activity = useAsync(activityLoader);
  const overrides = useAsync(overridesLoader);
  const report = useAsync(reportLoader);

  const [form, setForm] = useState(EMPTY_FORM);
  const [overrideReason, setOverrideReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<CardSort>('fees');
  const [expanded, setExpanded] = useState<string | null>(null);

  const formulaList = useMemo(() => formulas.data ?? [], [formulas.data]);
  const byId = useMemo(
    () => new Map(formulaList.map((f) => [f.feeFormulasId, f])),
    [formulaList],
  );

  const intel = useMemo(
    () =>
      buildFeesIntel(
        formulaList,
        events.data ?? [],
        activity.data ?? [],
        overrides.data ?? [],
        report.data,
      ),
    [formulaList, events.data, activity.data, overrides.data, report.data],
  );

  const cards = useMemo(
    () => sortCards(filterCards(intel.cards, search), sort),
    [intel.cards, search, sort],
  );

  const loading = formulas.loading || events.loading || activity.loading;

  async function createFormula() {
    setSubmitting(true);
    setError(null);
    try {
      await createFeeFormula({
        name: form.name,
        percentBps: Math.round(parseFloat(form.percent || '0') * 100),
        flatCents: Math.round(parseFloat(form.flat || '0') * 100),
        minFeeCents: Math.round(parseFloat(form.min || '0') * 100),
        maxFeeCents: Math.round(parseFloat(form.max || '0') * 100),
      });
      setForm(EMPTY_FORM);
      formulas.reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(formula: FeeFormula) {
    try {
      await updateFeeFormula({ ...formula, isActive: !formula.isActive });
      formulas.reload();
      events.reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  async function removeFormula(id: string) {
    try {
      await deleteFeeFormula(id);
      formulas.reload();
      events.reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  async function assign(kind: 'ticket' | 'table', targetId: string, feeFormulasId: string) {
    if (!overrideReason.trim()) {
      setError('Enter an override reason before changing a fee assignment.');
      return;
    }
    try {
      await assignFeeFormula(kind, targetId, feeFormulasId, overrideReason.trim());
      events.reload();
      activity.reload();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pricing command center</h1>
          <p className="text-sm text-muted-foreground">
            Every platform fee, formula and override across all tenants — and where money is leaking.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/fee-overrides" className="text-primary">Manage overrides</Link>
          <Link to="/revenue" className="text-primary">Revenue report</Link>
        </div>
      </header>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {/* ── Zone 1 · Intelligence ─────────────────────────────────── */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Service fee revenue (12 mo)" value={centsToUSD(intel.summary.serviceFeeRevenueCents)} />
        <StatCard
          label="Active fee formulas"
          value={`${intel.summary.activeFormulas} / ${intel.summary.totalFormulas}`}
        />
        <StatCard
          label="Unpriced items"
          value={String(intel.summary.unassignedItems)}
          hint={intel.summary.unassignedItems > 0 ? `of ${intel.summary.pricedItems} priced items` : 'full coverage'}
          tone={intel.summary.unassignedItems > 0 ? 'warn' : 'success'}
        />
        <StatCard
          label="Active overrides"
          value={String(intel.summary.activeOverrides)}
          hint={intel.summary.expiringOverrides > 0 ? `${intel.summary.expiringOverrides} expiring ≤30d` : undefined}
          tone={intel.summary.expiringOverrides > 0 ? 'warn' : 'default'}
        />
      </section>

      {intel.insights.length > 0 ? (
        <section className="space-y-2">
          {intel.insights.map((insight, index) => (
            <div
              key={index}
              className={`rounded-md border border-l-4 px-3 py-2 text-sm ${INSIGHT_STYLES[insight.tone]}`}
            >
              💡 {insight.text}
            </div>
          ))}
        </section>
      ) : null}

      {/* ── Fee formula library ───────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Fee formula library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" className="h-9" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="percent" className="text-xs">Percent %</Label>
              <Input id="percent" className="h-9" value={form.percent} onChange={(e) => setForm((p) => ({ ...p, percent: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="flat" className="text-xs">Flat $</Label>
              <Input id="flat" className="h-9" value={form.flat} onChange={(e) => setForm((p) => ({ ...p, flat: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="min" className="text-xs">Min $</Label>
              <Input id="min" className="h-9" value={form.min} onChange={(e) => setForm((p) => ({ ...p, min: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="max" className="text-xs">Max $</Label>
              <Input id="max" className="h-9" value={form.max} onChange={(e) => setForm((p) => ({ ...p, max: e.target.value }))} />
            </div>
          </div>
          <Button size="sm" onClick={createFormula} disabled={submitting || !form.name}>
            {submitting ? 'Adding…' : 'Add formula'}
          </Button>

          <div className="divide-y rounded-md border">
            {intel.usage.map(({ formula: f, assignedCount }) => (
              <div key={f.feeFormulasId} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                <div>
                  <span className="font-medium">{f.name}</span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {(f.percentBps / 100).toFixed(2)}% + {centsToUSD(f.flatCents)}
                    {f.minFeeCents ? ` · min ${centsToUSD(f.minFeeCents)}` : ''}
                    {f.maxFeeCents ? ` · max ${centsToUSD(f.maxFeeCents)}` : ''}
                  </span>
                  {!f.isActive ? <Badge variant="warn" className="ml-2">inactive</Badge> : null}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {assignedCount} item{assignedCount === 1 ? '' : 's'} · {centsToUSD(previewFee(PREVIEW_PRICE, f))} on $50
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <button className="text-primary" onClick={() => toggleActive(f)}>
                    {f.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button className="text-destructive" onClick={() => removeFormula(f.feeFormulasId)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Zone 2 · Tenant canvas ────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Tenants ({cards.length})
          </h2>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tenant or tier…"
              className="h-9 w-52"
              aria-label="Search tenants"
            />
            <Select
              className="h-9 w-48"
              value={sort}
              onChange={(e) => setSort(e.target.value as CardSort)}
              aria-label="Sort tenants"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
        {!loading && cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tenants match.</p>
        ) : null}

        <div className="grid gap-3">
          {cards.map((card) => (
            <TenantCardView
              key={card.tenantsId}
              card={card}
              open={expanded === card.tenantsId}
              onToggle={() => setExpanded((prev) => (prev === card.tenantsId ? null : card.tenantsId))}
            >
              <div className="space-y-1">
                <Label htmlFor={`reason-${card.tenantsId}`} className="text-xs">
                  Override reason (required to change any assignment)
                </Label>
                <Input
                  id={`reason-${card.tenantsId}`}
                  value={overrideReason}
                  placeholder="e.g. Non-profit fundraiser discount"
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="h-9"
                />
              </div>
              {card.events.map((ev) => (
                <div key={ev.eventsId} className="rounded-md border">
                  <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-1.5 text-sm">
                    <span className="font-medium">{ev.title}</span>
                    <span className="text-xs text-muted-foreground">{ev.status}</span>
                  </div>
                  {ev.items.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-muted-foreground">No ticket types or tables.</p>
                  ) : (
                    <table className="w-full text-sm">
                      <tbody>
                        {ev.items.map((it) => (
                          <tr key={`${it.kind}-${it.id}`} className="border-t">
                            <td className="px-3 py-1.5">
                              <span className="mr-1 rounded bg-surface-sunken px-1 text-[10px] uppercase text-ink-soft">
                                {it.kind}
                              </span>
                              {it.label}
                            </td>
                            <td className="px-2 py-1.5 text-muted-foreground">{centsToUSD(it.priceCents)}</td>
                            <td className="px-2 py-1.5">
                              <Select
                                className="h-10 w-64"
                                value={it.feeFormulasId}
                                onChange={(e) => assign(it.kind as 'ticket' | 'table', it.id, e.target.value)}
                              >
                                <option value="">— none —</option>
                                {formulaList.map((f) => (
                                  <option key={f.feeFormulasId} value={f.feeFormulasId}>
                                    {f.name}
                                  </option>
                                ))}
                              </Select>
                            </td>
                            <td className="px-3 py-1.5 text-right font-medium">
                              {centsToUSD(it.feeFormulasId ? previewFee(it.priceCents, byId.get(it.feeFormulasId)) : it.feeCents)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
              {card.events.length === 0 ? (
                <p className="text-xs text-muted-foreground">No events with priced items for this tenant.</p>
              ) : null}
            </TenantCardView>
          ))}
        </div>
      </section>

      {/* ── Zone 3 · Analytics ────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Service fees by tenant tier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {intel.tierBars.length === 0 ? (
            <p className="text-sm text-muted-foreground">No fee revenue yet.</p>
          ) : (
            intel.tierBars.map((bar) => (
              <div key={bar.tier} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{tierLabel(bar.tier)}</span>
                  <span className="text-muted-foreground">{centsToUSD(bar.serviceFeeCents)}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-sunken">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: 'default' | 'warn' | 'success';
}) {
  const hintClass = tone === 'warn' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-muted-foreground';
  return (
    <Card>
      <CardContent className="space-y-1 pt-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {hint ? <p className={`text-xs ${hintClass}`}>{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

function TenantCardView({
  card,
  open,
  onToggle,
  children,
}: {
  card: TenantCard;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <Card className={open ? 'ring-1 ring-primary/40' : undefined}>
      <button className="w-full text-left" onClick={onToggle}>
        <CardContent className="space-y-2 pt-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{card.name}</p>
              <p className="text-xs text-muted-foreground">
                {card.tier ? tierLabel(card.tier) : 'No billing tier'} · {card.ticketsSold.toLocaleString()} tickets
              </p>
            </div>
            <p className="text-lg font-semibold">{centsToUSD(card.serviceFeeCents)}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="neutral">{card.itemCount} priced item{card.itemCount === 1 ? '' : 's'}</Badge>
            {card.unassignedCount > 0 ? (
              <Badge variant="warn">{card.unassignedCount} unpriced</Badge>
            ) : card.itemCount > 0 ? (
              <Badge variant="success">fully priced</Badge>
            ) : null}
            {card.hasOverride ? <Badge variant="voltage">override</Badge> : null}
          </div>
        </CardContent>
      </button>
      {open ? <CardContent className="space-y-3 border-t pt-3">{children}</CardContent> : null}
    </Card>
  );
}
