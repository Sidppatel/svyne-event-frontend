import type { Price, PriceRule } from '@/shared/proto/pricing';

export interface RuleGroup {
  key: string;
  name: string;
  ruleType: string;
  activeFrom: string;
  activeUntil: string;
  percent: number;
  priceRuleIds: string[];
  rules: PriceRule[];
}

export function discountedCents(baseCents: number, percent: number): number {
  return Math.round(baseCents * (1 - percent / 100));
}

export function derivePercent(baseCents: number, ruleCents: number): number {
  if (baseCents <= 0) {
    return 0;
  }
  return Math.round((1 - ruleCents / baseCents) * 100);
}

export function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export function isWindowActive(activeFrom: string, activeUntil: string, now: number): boolean {
  const from = Number(activeFrom);
  const until = Number(activeUntil);
  if (from && now < from) {
    return false;
  }
  if (until && now > until) {
    return false;
  }
  return Boolean(from || until);
}

export function windowProgress(activeFrom: string, activeUntil: string, now: number): number {
  const from = Number(activeFrom);
  const until = Number(activeUntil);
  if (!from || !until || until <= from) {
    return 0;
  }
  const ratio = (now - from) / (until - from);
  return Math.min(100, Math.max(0, ratio * 100));
}

export function epochToLocalInput(activeAt: string): string {
  const seconds = Number(activeAt);
  if (!seconds) {
    return '';
  }
  const d = new Date(seconds * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const GROUP_RULE_TYPE = 'Group';

export function isGroupRule(rule: PriceRule): boolean {
  return rule.ruleType === GROUP_RULE_TYPE;
}

export function percentToBps(percent: string): number {
  const value = parseFloat(percent);
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

export function bpsToPercent(bps: number): string {
  return String(bps / 100);
}

export function groupTierSummary(rule: PriceRule, priceName: string): string {
  const scope = rule.scope === 'Event' ? 'All ticket types' : priceName || 'One ticket type';
  const range = rule.maxQty > 0 ? `${rule.minQty}–${rule.maxQty}` : `${rule.minQty}+`;
  let offer: string;
  if (rule.discountKind === 'PercentOff') {
    offer = `${bpsToPercent(rule.discountBps)}% off`;
  } else if (rule.discountKind === 'FixedUnitPrice') {
    offer = `$${(rule.priceCents / 100).toFixed(2)} per ticket`;
  } else {
    offer = `$${(rule.priceCents / 100).toFixed(2)} off the order`;
  }
  const cap = rule.capacity > 0 ? `, first ${rule.capacity} seats` : '';
  return `${scope} · ${range} tickets · ${offer}${cap}`;
}

export function sortGroupTiers(rules: PriceRule[]): PriceRule[] {
  return [...rules].sort((a, b) => a.minQty - b.minQty);
}

export function overlapsExistingTier(
  rules: PriceRule[],
  scope: string,
  ownerId: string,
  minQty: number,
  maxQty: number,
  ignoreId: string,
): boolean {
  const upper = maxQty > 0 ? maxQty : Number.MAX_SAFE_INTEGER;
  return rules.some((r) => {
    if (r.priceRulesId === ignoreId || r.scope !== scope) return false;
    const sameOwner = scope === 'Event' ? true : r.pricesId === ownerId;
    if (!sameOwner) return false;
    const rUpper = r.maxQty > 0 ? r.maxQty : Number.MAX_SAFE_INTEGER;
    return minQty <= rUpper && r.minQty <= upper;
  });
}

function ruleKey(rule: PriceRule): string {
  return [rule.name, rule.ruleType, rule.activeFrom, rule.activeUntil].join('|');
}

export function groupEventRules(prices: Price[], rules: PriceRule[]): RuleGroup[] {
  const baseById = new Map(prices.map((p) => [p.pricesId, p.basePriceCents]));
  const groups = new Map<string, RuleGroup>();
  for (const rule of rules) {
    const key = ruleKey(rule);
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        name: rule.name,
        ruleType: rule.ruleType,
        activeFrom: rule.activeFrom,
        activeUntil: rule.activeUntil,
        percent: derivePercent(baseById.get(rule.pricesId) ?? 0, rule.priceCents),
        priceRuleIds: [],
        rules: [],
      };
      groups.set(key, group);
    }
    group.priceRuleIds.push(rule.priceRulesId);
    group.rules.push(rule);
  }
  return [...groups.values()];
}
