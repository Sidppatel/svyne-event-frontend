import { financialClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { MonthlyReport, StripeStatus } from '@/shared/proto/admin';

export async function getMonthlyReport(
  eventsId: string,
  year: number,
  month: number,
): Promise<MonthlyReport> {
  return callRpc(() => financialClient.getMonthlyReport({ eventsId, year, month }));
}

export async function getStripeStatus(tenantsId: string): Promise<StripeStatus> {
  return callRpc(() => financialClient.getStripeStatus({ value: tenantsId }));
}

export async function startStripeOnboarding(tenantsId: string): Promise<string> {
  const response = await callRpc(() => financialClient.startStripeOnboarding({ value: tenantsId }));
  return response.url;
}
