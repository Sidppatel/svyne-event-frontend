import { purchaseClient, ticketClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Purchase, PurchaseStats, Ticket } from '@/shared/proto/purchase';

export async function listPurchases(eventsId: string, status: string): Promise<Purchase[]> {
  const response = await callRpc(() =>
    purchaseClient.listPurchases({ page: { offset: 0, limit: 100, search: '' }, eventsId, status }),
  );
  return response.purchases;
}

export async function getPurchase(purchasesId: string): Promise<Purchase> {
  return callRpc(() => purchaseClient.getPurchase({ value: purchasesId }));
}

export async function getPurchaseStats(eventsId: string): Promise<PurchaseStats> {
  return callRpc(() => purchaseClient.getPurchaseStats({ value: eventsId }));
}

export async function confirmPurchase(purchasesId: string, qrToken: string): Promise<void> {
  await callRpc(() => purchaseClient.confirmPurchase({ purchasesId, qrToken }));
}

export async function cancelPurchase(purchasesId: string): Promise<void> {
  await callRpc(() => purchaseClient.cancelPurchase({ value: purchasesId }));
}

export async function refundPurchase(purchasesId: string): Promise<void> {
  await callRpc(() => purchaseClient.refundPurchase({ value: purchasesId }));
}

export async function listPurchaseTickets(purchasesId: string): Promise<Ticket[]> {
  const response = await callRpc(() => ticketClient.listPurchaseTickets({ value: purchasesId }));
  return response.tickets;
}

export async function inviteTicket(purchaseTicketsId: string, email: string): Promise<void> {
  await callRpc(() => ticketClient.inviteTicket({ purchaseTicketsId, email }));
}
