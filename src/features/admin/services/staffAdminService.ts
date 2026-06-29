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

export async function listAllStaff(): Promise<StaffMember[]> {
  const response = await callRpc(() => staffClient.listAllStaff({}));
  return response.staff || [];
}

export async function assignStaffByEmail(email: string, eventsId: string): Promise<{ userExisted: boolean; message: string }> {
  const response = await callRpc(() => staffClient.assignStaffByEmail({ email, eventsId }));
  return { userExisted: response.userExisted, message: response.message };
}

export async function addOrInviteStaff(email: string): Promise<{ userExisted: boolean; usersId: string; message: string }> {
  const response = await callRpc(() => staffClient.addOrInviteStaff({ email }));
  return { userExisted: response.userExisted, usersId: response.usersId, message: response.message };
}

export async function removeStaffRole(usersId: string): Promise<void> {
  await callRpc(() => staffClient.removeStaffRole({ value: usersId }));
}
