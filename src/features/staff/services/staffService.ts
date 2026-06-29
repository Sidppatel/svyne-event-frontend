import { checkInClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { ScanResponse, CheckInStats, StaffEvent, GuestBooking } from '@/shared/proto/bookings';

export async function scanTicket(qrToken: string, eventsId: string): Promise<ScanResponse> {
  return callRpc(() => checkInClient.scan({ qrToken, eventsId }));
}

export async function getCheckInStats(eventsId: string): Promise<CheckInStats> {
  return callRpc(() => checkInClient.getCheckInStats({ value: eventsId }));
}

export async function listEventsForStaff(): Promise<StaffEvent[]> {
  const response = await callRpc(() => checkInClient.listEventsForStaff({}));
  return response.events || [];
}

export async function getGuestList(eventsId: string): Promise<GuestBooking[]> {
  const response = await callRpc(() => checkInClient.getGuestList({ value: eventsId }));
  return response.bookings || [];
}

export async function checkInGuest(eventsId: string, codeOrId: string, type: 'Booking' | 'Ticket'): Promise<ScanResponse> {
  return callRpc(() => checkInClient.checkInGuest({ eventsId, codeOrId, type }));
}
