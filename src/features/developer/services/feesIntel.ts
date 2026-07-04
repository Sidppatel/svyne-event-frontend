import { centsToUSD } from '@/shared/lib/format';
import type { FeeFormula, DeveloperEvent } from '@/features/developer/services/developerFeeService';
import type { FeeOverrideRow, RevenueReport, TenantActivityRow } from '@/features/developer/services/developerBillingService';

export type InsightTone = 'info' | 'warn' | 'success';
export interface Insight {
  tone: InsightTone;
  text: string;
}

export interface FeesSummary {
  serviceFeeRevenueCents: number;
  serviceFeeItemCount: number;
  activeFormulas: number;
  totalFormulas: number;
  pricedItems: number;
  unassignedItems: number;
  activeOverrides: number;
  expiringOverrides: number;
}

export interface TenantCard {
  tenantsId: string;
  name: string;
  tier: string;
  ticketsSold: number;
  serviceFeeCents: number;
  subscriptionStatus: string;
  events: DeveloperEvent[];
  itemCount: number;
  unassignedCount: number;
  hasOverride: boolean;
}

export interface FormulaUsage {
  formula: FeeFormula;
  assignedCount: number;
}

export interface TierBar {
  tier: string;
  serviceFeeCents: number;
  pct: number;
}

export interface FeesIntel {
  summary: FeesSummary;
  insights: Insight[];
  cards: TenantCard[];
  usage: FormulaUsage[];
  tierBars: TierBar[];
}

export type CardSort = 'fees' | 'leakage' | 'tickets' | 'name';

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

function sourceRevenueCents(report: RevenueReport | null | undefined, source: string): { cents: number; count: number } {
  const row = report?.bySource.find((r) => r.source === source);
  return { cents: row ? Number(row.revenueCents) : 0, count: row ? row.itemCount : 0 };
}

function itemCounts(events: DeveloperEvent[]): { priced: number; unassigned: number } {
  let priced = 0;
  let unassigned = 0;
  for (const ev of events) {
    for (const item of ev.items) {
      priced += 1;
      if (!item.feeFormulasId) unassigned += 1;
    }
  }
  return { priced, unassigned };
}

function buildUsage(formulas: FeeFormula[], events: DeveloperEvent[]): FormulaUsage[] {
  const counts = new Map<string, number>();
  for (const ev of events) {
    for (const item of ev.items) {
      if (item.feeFormulasId) counts.set(item.feeFormulasId, (counts.get(item.feeFormulasId) ?? 0) + 1);
    }
  }
  return formulas.map((formula) => ({ formula, assignedCount: counts.get(formula.feeFormulasId) ?? 0 }));
}

function buildCards(
  events: DeveloperEvent[],
  activity: TenantActivityRow[],
  overrides: FeeOverrideRow[],
): TenantCard[] {
  const overrideTenants = new Set(overrides.map((o) => o.tenantsId));
  const byTenant = new Map<string, TenantCard>();

  const ensure = (tenantsId: string, name: string): TenantCard => {
    let card = byTenant.get(tenantsId);
    if (!card) {
      card = {
        tenantsId,
        name,
        tier: '',
        ticketsSold: 0,
        serviceFeeCents: 0,
        subscriptionStatus: '',
        events: [],
        itemCount: 0,
        unassignedCount: 0,
        hasOverride: overrideTenants.has(tenantsId),
      };
      byTenant.set(tenantsId, card);
    }
    return card;
  };

  for (const row of activity) {
    const card = ensure(row.tenantsId, row.name);
    card.name = row.name || card.name;
    card.tier = row.tier;
    card.ticketsSold = row.ticketsSold;
    card.serviceFeeCents = Number(row.serviceFeeCents);
    card.subscriptionStatus = row.subscriptionStatus;
  }

  for (const ev of events) {
    const card = ensure(ev.tenantsId, ev.tenantName);
    card.events.push(ev);
    const counts = itemCounts([ev]);
    card.itemCount += counts.priced;
    card.unassignedCount += counts.unassigned;
  }

  return [...byTenant.values()];
}

function buildInsights(
  summary: FeesSummary,
  cards: TenantCard[],
  usage: FormulaUsage[],
): Insight[] {
  const insights: Insight[] = [];

  const topEarner = cards.reduce<TenantCard | null>(
    (best, card) => (card.serviceFeeCents > (best?.serviceFeeCents ?? 0) ? card : best),
    null,
  );
  if (topEarner && topEarner.serviceFeeCents > 0) {
    insights.push({
      tone: 'info',
      text: `${topEarner.name} leads platform fees at ${centsToUSD(topEarner.serviceFeeCents)} across ${topEarner.ticketsSold.toLocaleString()} tickets sold.`,
    });
  }

  if (summary.unassignedItems > 0) {
    const affected = cards.filter((c) => c.unassignedCount > 0).length;
    insights.push({
      tone: 'warn',
      text: `${summary.unassignedItems} priced item${summary.unassignedItems === 1 ? '' : 's'} across ${affected} tenant${affected === 1 ? '' : 's'} have no fee formula — you're collecting $0 platform fee on them.`,
    });
  } else if (summary.pricedItems > 0) {
    insights.push({
      tone: 'success',
      text: `Every one of your ${summary.pricedItems} priced items has a fee formula. Full fee coverage.`,
    });
  }

  if (summary.activeOverrides > 0) {
    const expiring = summary.expiringOverrides;
    insights.push({
      tone: expiring > 0 ? 'warn' : 'info',
      text: `${summary.activeOverrides} active fee override${summary.activeOverrides === 1 ? '' : 's'} discount your standard rate${expiring > 0 ? `; ${expiring} expire within 30 days` : ''}.`,
    });
  }

  const idle = usage.filter((u) => u.formula.isActive && u.assignedCount === 0).map((u) => u.formula.name);
  if (idle.length > 0) {
    insights.push({
      tone: 'info',
      text: `${idle.length} active formula${idle.length === 1 ? ' is' : 's are'} assigned to nothing: ${idle.slice(0, 3).join(', ')}${idle.length > 3 ? '…' : ''}.`,
    });
  }

  return insights;
}

export function buildFeesIntel(
  formulas: FeeFormula[],
  events: DeveloperEvent[],
  activity: TenantActivityRow[],
  overrides: FeeOverrideRow[],
  report: RevenueReport | null | undefined,
): FeesIntel {
  const serviceFees = sourceRevenueCents(report, 'service_fees');
  const counts = itemCounts(events);
  const cutoff = Math.floor(Date.now() / 1000) + THIRTY_DAYS_SECONDS;
  const expiringOverrides = overrides.filter((o) => {
    const expires = Number(o.expiresAtEpochSeconds);
    return expires > 0 && expires <= cutoff;
  }).length;

  const summary: FeesSummary = {
    serviceFeeRevenueCents: serviceFees.cents,
    serviceFeeItemCount: serviceFees.count,
    activeFormulas: formulas.filter((f) => f.isActive).length,
    totalFormulas: formulas.length,
    pricedItems: counts.priced,
    unassignedItems: counts.unassigned,
    activeOverrides: overrides.length,
    expiringOverrides,
  };

  const usage = buildUsage(formulas, events);
  const cards = buildCards(events, activity, overrides);
  const insights = buildInsights(summary, cards, usage);

  const tierMax = report
    ? report.byTier.reduce((max, r) => Math.max(max, Number(r.serviceFeeCents)), 1)
    : 1;
  const tierBars: TierBar[] = (report?.byTier ?? [])
    .map((r) => {
      const cents = Number(r.serviceFeeCents);
      return { tier: r.tier, serviceFeeCents: cents, pct: Math.round((cents / tierMax) * 100) };
    })
    .filter((b) => b.serviceFeeCents > 0)
    .sort((a, b) => b.serviceFeeCents - a.serviceFeeCents);

  return { summary, insights, cards, usage, tierBars };
}

export function sortCards(cards: TenantCard[], sort: CardSort): TenantCard[] {
  const copy = [...cards];
  switch (sort) {
    case 'fees':
      return copy.sort((a, b) => b.serviceFeeCents - a.serviceFeeCents);
    case 'leakage':
      return copy.sort((a, b) => b.unassignedCount - a.unassignedCount);
    case 'tickets':
      return copy.sort((a, b) => b.ticketsSold - a.ticketsSold);
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function filterCards(cards: TenantCard[], query: string): TenantCard[] {
  const q = query.trim().toLowerCase();
  if (!q) return cards;
  return cards.filter(
    (c) => c.name.toLowerCase().includes(q) || c.tier.toLowerCase().includes(q),
  );
}
