import { checkInClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { ScanResponse, CheckInStats } from '@/shared/proto/purchase';

export async function scanTicket(qrToken: string, eventsId: string): Promise<ScanResponse> {
  return callRpc(() => checkInClient.scan({ qrToken, eventsId }));
}

export async function getCheckInStats(eventsId: string): Promise<CheckInStats> {
  return callRpc(() => checkInClient.getCheckInStats({ value: eventsId }));
}
