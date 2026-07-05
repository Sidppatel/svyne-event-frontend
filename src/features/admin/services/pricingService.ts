import { pricingClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Price, PriceRule, PriceBreakdown } from '@/shared/proto/pricing';

export interface PriceInput {
  eventsId: string;
  name: string;
  pricingType: string; 
  basePriceCents: number;
  perAttendeeCents: number;
  isAllInclusive: boolean;
  feeFormulasId: string; 
  maxQuantity: number;
}

export interface PriceRuleInput {
  pricesId: string;
  name: string;
  ruleType: string; 
  priority: number;
  priceCents: number;
  activeFrom: string; 
  activeUntil: string;
  minRemaining: number; 
  maxRemaining: number;
  capacity: number; 
}

export async function createPrice(input: PriceInput): Promise<string> {
  const res = await callRpc(() => pricingClient.createPrice(input));
  return res.value;
}

export async function updatePrice(input: {
  pricesId: string;
  name: string;
  basePriceCents: number;
  perAttendeeCents: number;
  isAllInclusive: boolean;
  maxQuantity: number;
  isActive: boolean;
  feeFormulasId: string;
}): Promise<void> {
  await callRpc(() => pricingClient.updatePrice(input));
}

export async function getPrice(pricesId: string): Promise<Price> {
  return callRpc(() => pricingClient.getPrice({ value: pricesId }));
}

export async function listPricesForEvent(eventsId: string): Promise<Price[]> {
  const res = await callRpc(() => pricingClient.listPricesForEvent({ value: eventsId }));
  return res.prices;
}

export async function deletePrice(pricesId: string): Promise<void> {
  await callRpc(() => pricingClient.deletePrice({ value: pricesId }));
}

export async function createPriceRule(input: PriceRuleInput): Promise<string> {
  
  
  const { pricesId, ...rest } = input;
  const res = await callRpc(() =>
    pricingClient.createPriceRule({ ...rest, ownerId: pricesId, scope: 'Price' }),
  );
  return res.value;
}

export async function updatePriceRule(input: PriceRuleInput & { priceRulesId: string; isActive: boolean }): Promise<void> {
  await callRpc(() => pricingClient.updatePriceRule(input));
}

export async function deletePriceRule(priceRulesId: string): Promise<void> {
  await callRpc(() => pricingClient.deletePriceRule({ value: priceRulesId }));
}

export async function listPriceRules(pricesId: string): Promise<PriceRule[]> {
  const res = await callRpc(() => pricingClient.listPriceRules({ value: pricesId }));
  return res.rules;
}

export async function calculatePrice(
  pricesId: string,
  seats: number,
  at = '0',
  remaining = -1,
): Promise<PriceBreakdown> {
  return callRpc(() => pricingClient.calculatePrice({ pricesId, seats, at, remaining }));
}

export async function setTenantDefaultFeeFormula(
  tenantsId: string,
  feeFormulasId: string,
  reason: string,
): Promise<void> {
  await callRpc(() => pricingClient.setTenantDefaultFeeFormula({ tenantsId, feeFormulasId, reason }));
}
