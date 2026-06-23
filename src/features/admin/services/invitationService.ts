import { invitationClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Invitation } from '@/shared/proto/admin';

export async function listInvitations(): Promise<Invitation[]> {
  const response = await callRpc(() =>
    invitationClient.listInvitations({ offset: 0, limit: 100, search: '' }),
  );
  return response.invitations;
}

export async function createInvitation(email: string, role: number): Promise<string> {
  const response = await callRpc(() => invitationClient.createInvitation({ email, role }));
  return response.value;
}

export async function revokeInvitation(invitationsId: string): Promise<void> {
  await callRpc(() => invitationClient.revokeInvitation({ value: invitationsId }));
}

export async function acceptInvitation(
  token: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<void> {
  await callRpc(() => invitationClient.acceptInvitation({ token, password, firstName, lastName }));
}
