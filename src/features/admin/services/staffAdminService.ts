import { staffClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { StaffMember } from '@/shared/proto/admin';

export async function listStaffForEvent(eventsId: string): Promise<StaffMember[]> {
  const response = await callRpc(() => staffClient.listStaffForEvent({ value: eventsId }));
  return response.staff;
}

export async function assignStaff(usersId: string, eventsId: string): Promise<void> {
  await callRpc(() => staffClient.assignStaff({ usersId, eventsId }));
}

export async function unassignStaff(usersId: string, eventsId: string): Promise<void> {
  await callRpc(() => staffClient.unassignStaff({ usersId, eventsId }));
}
