import { ticketClient, purchaseClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Ticket, Purchase } from '@/shared/proto/purchase';

export async function getPurchase(purchasesId: string): Promise<Purchase> {
  return callRpc(() => purchaseClient.getPurchase({ value: purchasesId }));
}

export async function listPurchaseTickets(purchasesId: string): Promise<Ticket[]> {
  const response = await callRpc(() => ticketClient.listPurchaseTickets({ value: purchasesId }));
  return response.tickets;
}

export async function inviteTicket(purchaseTicketsId: string, email: string): Promise<void> {
  await callRpc(() => ticketClient.inviteTicket({ purchaseTicketsId, email }));
}

export async function claimTicket(token: string): Promise<void> {
  await callRpc(() => ticketClient.claimTicket({ token }));
}
