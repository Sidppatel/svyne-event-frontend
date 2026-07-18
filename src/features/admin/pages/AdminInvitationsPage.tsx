import { useCallback, useMemo, useState } from 'react';
import { Mail, Send, UserMinus, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listInvitations,
  createInvitation,
  revokeInvitation,
} from '@/features/admin/services/invitationService';
import { listAllStaff, removeStaffRole } from '@/features/admin/services/staffAdminService';
import { rpcErrorMessage } from '@/shared/session';
import { Roles, roleLabel } from '@/shared/roles';
import { useAuth } from '@/shared/auth/useAuth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const INVITABLE_ROLES = [Roles.Admin, Roles.Staff, Roles.SubTenant, Roles.EventManager];

function statusVariant(status: string): 'success' | 'warn' | 'neutral' | 'danger' {
  const s = status.toLowerCase();
  if (s === 'accepted') return 'success';
  if (s === 'pending' || s === 'sent') return 'warn';
  if (s === 'expired') return 'danger';
  return 'neutral';
}

export function AdminInvitationsPage() {
  const { user } = useAuth();
  const loader = useCallback(async () => {
    const [invs, mems] = await Promise.all([listInvitations(), listAllStaff()]);
    return { invitations: invs, members: mems };
  }, []);
  const { data, loading, error, reload } = useAsync(loader);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<number>(Roles.Staff);

  const invitations = useMemo(() => data?.invitations ?? [], [data]);
  const members = useMemo(() => data?.members ?? [], [data]);

  async function guard(action: () => Promise<unknown>) {
    try {
      await action();
      reload();
    } catch (caught) {
      toast.error(rpcErrorMessage(caught));
    }
  }

  return (
    <div className="space-y-8 pb-4">
      <section className="space-y-1.5">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Invitations</h1>
        <p className="text-sm text-ink-soft">Bring people onto your team — send an invite and they’ll get a link to join.</p>
      </section>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <UserPlus className="h-4.5 w-4.5 text-brand" />
          <CardTitle>Invite a member</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1 space-y-1">
            <Label htmlFor="invite-email">Email</Label>
            <Input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="invite-role">Role</Label>
            <Select id="invite-role" className="w-auto" value={role} onChange={(e) => setRole(Number(e.target.value))}>
              {INVITABLE_ROLES.map((value) => (
                <option key={value} value={value}>
                  {roleLabel(value)}
                </option>
              ))}
            </Select>
          </div>
          <Button
            disabled={!email.trim()}
            onClick={() =>
              guard(async () => {
                await createInvitation(email, role);
                toast.success(`Invitation sent to ${email}.`);
                setEmail('');
              })
            }
          >
            <Send className="h-4 w-4" /> Send invitation
          </Button>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-4.5 w-4.5 text-brand" />
              <CardTitle>Active Members</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {members.length > 0 ? (
                <ul className="divide-y divide-hairline">
                  {members.map((member) => {
                    const isSelf = member.email.toLowerCase() === user?.email?.toLowerCase();
                    return (
                      <li key={member.usersId} className="flex items-center justify-between gap-3 px-5 py-3.5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {member.firstName || member.lastName ? `${member.firstName} ${member.lastName}`.trim() : member.email}
                            {isSelf && <span className="ml-1.5 rounded bg-brand/10 px-1.5 py-0.5 text-3xs font-semibold uppercase tracking-wider text-brand">You</span>}
                          </p>
                          <p className="text-xs text-ink-soft">
                            {member.email} • {roleLabel(member.role)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isSelf}
                            onClick={() =>
                              guard(async () => {
                                if (confirm(`Are you sure you want to remove ${member.firstName || member.lastName || member.email} from the team?`)) {
                                  await removeStaffRole(member.usersId);
                                  toast.success('Member removed successfully.');
                                }
                              })
                            }
                            className="h-8 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-35"
                          >
                            <UserMinus className="mr-1 h-3.5 w-3.5" /> Remove
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                  <p className="text-sm text-ink-soft">No active members found</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-2">
              <Mail className="h-4.5 w-4.5 text-brand" />
              <CardTitle>Pending Invitations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {invitations.length > 0 ? (
                <ul className="divide-y divide-hairline">
                  {invitations.map((invitation) => (
                    <li key={invitation.invitationsId} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{invitation.email}</p>
                        <p className="text-xs text-ink-soft">{roleLabel(invitation.role)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <Badge variant={statusVariant(invitation.status)}>{invitation.status}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => guard(() => revokeInvitation(invitation.invitationsId))}
                          className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        >
                          Revoke
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                  <p className="text-sm text-ink-soft">No pending invitations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
