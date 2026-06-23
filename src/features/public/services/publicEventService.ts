import { eventClient, purchaseClient, tableBookingClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Event } from '@/shared/proto/event';
import type { Purchase } from '@/shared/proto/purchase';
import type { EventLayout } from '@/shared/proto/booking';

export async function listPublicEvents(search: string): Promise<Event[]> {
  const response = await callRpc(() =>
    eventClient.listEvents({ page: { offset: 0, limit: 50, search }, status: '', category: '' }),
  );
  return response.events;
}

export async function getEventBySlug(slug: string): Promise<Event> {
  return callRpc(() => eventClient.getEventBySlug({ slug }));
}

export async function listMyPurchases(): Promise<Purchase[]> {
  const response = await callRpc(() =>
    purchaseClient.listPurchases({ page: { offset: 0, limit: 50, search: '' }, eventsId: '', status: '' }),
  );
  return response.purchases;
}

export interface ReserveSeatsInput {
  eventsId: string;
  seats: number;
  eventTicketTypesId: string;
}

export async function reserveOpenCapacity(input: ReserveSeatsInput): Promise<string> {
  const response = await callRpc(() =>
    purchaseClient.reserveOpenCapacity({
      eventsId: input.eventsId,
      seats: input.seats,
      eventTicketTypesId: input.eventTicketTypesId,
      subtotalCents: 0,
      feeCents: 0,
      totalCents: 0,
    }),
  );
  return response.purchaseNumber;
}

export async function getEventLayout(eventsId: string): Promise<EventLayout> {
  return callRpc(() => tableBookingClient.getEventLayout({ value: eventsId }));
}

export interface TablePurchaseInput {
  eventsId: string;
  tablesId: string;
  seats: number;
}

export async function purchaseTable(input: TablePurchaseInput): Promise<string> {
  const response = await callRpc(() =>
    purchaseClient.createPurchase({
      eventsId: input.eventsId,
      tablesId: input.tablesId,
      seats: input.seats,
      eventTicketTypesId: '',
      subtotalCents: 0,
      feeCents: 0,
      totalCents: 0,
    }),
  );
  return response.purchaseNumber;
}
