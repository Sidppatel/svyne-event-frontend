import type { GroupDiscountHint } from '@/shared/proto/bookings';
import { centsToUSD } from '@/shared/lib/format';

export type GroupDiscountState = 'none' | 'progress' | 'applied';

export function groupDiscountState(hint: GroupDiscountHint | undefined): GroupDiscountState {
  if (!hint) return 'none';
  if (hint.appliedMinQty > 0) return 'applied';
  if (hint.nextTierMinQty > 0) return 'progress';
  return 'none';
}

export function tierOfferLabel(kind: string, bps: number, priceCents: number): string {
  if (kind === 'PercentOff') return `${bps / 100}% off`;
  if (kind === 'FixedUnitPrice') return `${centsToUSD(priceCents)} per ticket`;
  if (kind === 'AmountOffOrder') return `${centsToUSD(priceCents)} off your order`;
  return 'a group discount';
}

export function nextTierMessage(hint: GroupDiscountHint): string {
  const offer = tierOfferLabel(hint.nextTierKind, hint.nextTierBps, hint.nextTierPriceCents);
  const seats = hint.nextTierSeatsAway;
  const noun = seats === 1 ? 'ticket' : 'tickets';
  if (hint.eligibleQty === 0) {
    return `Buy ${hint.nextTierMinQty}+ tickets and get ${offer}.`;
  }
  return `Add ${seats} more ${noun} to get ${offer}.`;
}

export function appliedMessage(hint: GroupDiscountHint): string {
  return `${hint.appliedRuleName} applied — you saved ${centsToUSD(hint.groupDiscountCents)}.`;
}

export function cappedMessage(hint: GroupDiscountHint): string {
  const seats = hint.discountedSeats;
  return `The discount covers ${seats} ${seats === 1 ? 'ticket' : 'tickets'}; the rest are at full price.`;
}

export function tierProgressPercent(hint: GroupDiscountHint): number {
  if (hint.nextTierMinQty <= 0) return 100;
  return Math.min(100, Math.round((hint.eligibleQty / hint.nextTierMinQty) * 100));
}
