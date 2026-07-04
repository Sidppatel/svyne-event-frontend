import { staffClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { StaffMember } from '@/shared/proto/admin';

export async function listStaffForEvent(eventsId: string): Promise<StaffMember[]> {
  const response = await callRpc(() => staffClient.listStaffForEvent({ value: eventsId }));
  return response.staff;
}

export async function unassignStaff(usersId: string, eventsId: string): Promise<void> {
  await callRpc(() => staffClient.unassignStaff({ usersId, eventsId }));
}

export async function assignStaffByEmail(email: string, eventsId: string, role: number): Promise<{ userExisted: boolean; message: string }> {
  const response = await callRpc(() => staffClient.assignStaffByEmail({ email, eventsId, role }));
  return { userExisted: response.userExisted, message: response.message };
}
