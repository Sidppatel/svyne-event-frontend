import { useCallback, useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listPricesForEvent,
  listEventPriceRules,
  listPriceRules,
  createGroupTier,
  updateGroupTier,
  deletePriceRule,
} from '@/features/admin/services/pricingService';
import {
  isGroupRule,
  sortGroupTiers,
  groupTierSummary,
  percentToBps,
  overlapsExistingTier,
} from '@/features/admin/services/pricingRules';
import { usdToCents } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Price, PriceRule } from '@/shared/proto/pricing';

const KINDS = [
  { value: 'PercentOff', label: 'Percentage off each ticket' },
  { value: 'FixedUnitPrice', label: 'Fixed price per ticket' },
  { value: 'AmountOffOrder', label: 'Fixed amount off the order' },
];

interface Draft {
  appliesTo: string;
  minQty: string;
  maxQty: string;
  discountKind: string;
  percent: string;
  amount: string;
  capacity: string;
}

const EMPTY_DRAFT: Draft = {
  appliesTo: 'Event',
  minQty: '10',
  maxQty: '',
  discountKind: 'PercentOff',
  percent: '15',
  amount: '',
  capacity: '',
};

export function GroupDiscountsPanel({ eventsId }: { eventsId: string }) {
  const load = useCallback(async () => {
    const prices = await listPricesForEvent(eventsId);
    const tiers = prices.filter((p) => p.pricingType === 'TicketTier');
    const perPrice = await Promise.all(tiers.map((p) => listPriceRules(p.pricesId)));
    const eventRules = await listEventPriceRules(eventsId);
    const rules = [...eventRules, ...perPrice.flat()].filter(isGroupRule);
    return { prices: tiers, rules: sortGroupTiers(rules) };
  }, [eventsId]);

  const state = useAsync(load);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const prices = state.data?.prices ?? [];
  const rules = state.data?.rules ?? [];

  function priceName(rule: PriceRule): string {
    return prices.find((p: Price) => p.pricesId === rule.pricesId)?.name ?? '';
  }

  async function submit() {
    setError(null);
    const minQty = Number(draft.minQty);
    const maxQty = draft.maxQty ? Number(draft.maxQty) : 0;
    if (!Number.isFinite(minQty) || minQty < 2) {
      setError('Minimum tickets must be at least 2.');
      return;
    }
    if (maxQty > 0 && maxQty < minQty) {
      setError('Maximum tickets must be greater than the minimum.');
      return;
    }
    const scope = draft.appliesTo === 'Event' ? 'Event' : 'Price';
    const ownerId = scope === 'Event' ? eventsId : draft.appliesTo;
    if (scope === 'Price' && draft.discountKind === 'AmountOffOrder') {
      setError('Amount off the order applies to the whole cart; choose all ticket types.');
      return;
    }
    if (overlapsExistingTier(rules, scope, ownerId, minQty, maxQty, '')) {
      setError('That quantity range overlaps an existing tier.');
      return;
    }

    setBusy(true);
    try {
      await createGroupTier({
        ownerId,
        scope,
        name: draft.discountKind === 'PercentOff'
          ? `Group ${minQty}+ (${draft.percent}% off)`
          : `Group ${minQty}+`,
        minQty,
        maxQty,
        discountKind: draft.discountKind,
        discountBps: draft.discountKind === 'PercentOff' ? percentToBps(draft.percent) : 0,
        priceCents: draft.discountKind === 'PercentOff' ? 0 : usdToCents(draft.amount),
        capacity: draft.capacity ? Number(draft.capacity) : 0,
        activeFrom: '0',
        activeUntil: '0',
      });
      setDraft(EMPTY_DRAFT);
      setOpen(false);
      await state.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save the tier.');
    } finally {
      setBusy(false);
    }
  }

  async function toggle(rule: PriceRule) {
    await updateGroupTier({
      priceRulesId: rule.priceRulesId,
      isActive: !rule.isActive,
      ownerId: rule.scope === 'Event' ? eventsId : rule.pricesId,
      scope: rule.scope === 'Event' ? 'Event' : 'Price',
      name: rule.name,
      minQty: rule.minQty,
      maxQty: rule.maxQty,
      discountKind: rule.discountKind,
      discountBps: rule.discountBps,
      priceCents: rule.priceCents,
      capacity: rule.capacity,
      activeFrom: rule.activeFrom,
      activeUntil: rule.activeUntil,
    });
    await state.reload();
  }

  async function remove(rule: PriceRule) {
    await deletePriceRule(rule.priceRulesId);
    await state.reload();
  }

  return (
    <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/20 px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <CardTitle className="mt-1 font-display text-base font-bold text-foreground">
            Group discounts
          </CardTitle>
        </div>
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          disabled={open || prices.length === 0}
          className="ticketspan-spring-btn h-9 px-4 rounded-lg font-bold text-xs"
        >
          <Plus className="mr-1.5 h-4 w-4" /> Add tier
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {state.loading ? <p className="text-sm text-muted-foreground">Loading tiers…</p> : null}
        {error ? (
          <p className="rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-xs font-bold text-destructive">
            {error}
          </p>
        ) : null}

        {open ? (
          <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="gd-applies">Applies to</Label>
                <Select
                  id="gd-applies"
                  value={draft.appliesTo}
                  onChange={(e) => setDraft({ ...draft, appliesTo: e.target.value })}
                >
                  <option value="Event">All ticket types</option>
                  {prices.map((p) => (
                    <option key={p.pricesId} value={p.pricesId}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gd-kind">Discount type</Label>
                <Select
                  id="gd-kind"
                  value={draft.discountKind}
                  onChange={(e) => setDraft({ ...draft, discountKind: e.target.value })}
                >
                  {KINDS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gd-min">Minimum tickets</Label>
                <Input
                  id="gd-min"
                  type="number"
                  min={2}
                  value={draft.minQty}
                  onChange={(e) => setDraft({ ...draft, minQty: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gd-max">Maximum tickets (optional)</Label>
                <Input
                  id="gd-max"
                  type="number"
                  min={2}
                  placeholder="No upper limit"
                  value={draft.maxQty}
                  onChange={(e) => setDraft({ ...draft, maxQty: e.target.value })}
                />
              </div>
              {draft.discountKind === 'PercentOff' ? (
                <div className="space-y-1.5">
                  <Label htmlFor="gd-percent">Percent off</Label>
                  <Input
                    id="gd-percent"
                    type="number"
                    min={1}
                    max={100}
                    value={draft.percent}
                    onChange={(e) => setDraft({ ...draft, percent: e.target.value })}
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label htmlFor="gd-amount">
                    {draft.discountKind === 'FixedUnitPrice' ? 'Price per ticket' : 'Amount off order'}
                  </Label>
                  <Input
                    id="gd-amount"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={draft.amount}
                    onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
                  />
                </div>
              )}
              {draft.discountKind !== 'AmountOffOrder' ? (
                <div className="space-y-1.5">
                  <Label htmlFor="gd-cap">Discounted seat cap (optional)</Label>
                  <Input
                    id="gd-cap"
                    type="number"
                    min={1}
                    placeholder="All qualifying seats"
                    value={draft.capacity}
                    onChange={(e) => setDraft({ ...draft, capacity: e.target.value })}
                  />
                </div>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={submit} disabled={busy}>
                Save tier
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setError(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {!state.loading && rules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-10 text-center">
            <Users className="mx-auto h-7 w-7 stroke-1 text-muted-foreground" />
            <p className="mt-2 text-sm font-semibold text-foreground">No group discounts</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add a tier to reward buyers who book several tickets at once.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.priceRulesId}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{rule.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {groupTierSummary(rule, priceName(rule))}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggle(rule)}>
                    {rule.isActive ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Delete tier"
                    onClick={() => remove(rule)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
