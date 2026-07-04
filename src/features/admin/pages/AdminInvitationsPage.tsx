import { useCallback, useMemo, useState } from 'react';
import { Mail, Send, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listInvitations,
  createInvitation,
  revokeInvitation,
} from '@/features/admin/services/invitationService';
import { rpcErrorMessage } from '@/shared/session';
import { Roles, roleLabel } from '@/shared/roles';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const INVITABLE_ROLES = [Roles.Admin, Roles.Staff, Roles.SubTenant];

function statusVariant(status: string): 'success' | 'warn' | 'neutral' | 'danger' {
  const s = status.toLowerCase();
  if (s === 'accepted') return 'success';
  if (s === 'pending' || s === 'sent') return 'warn';
  if (s === 'expired') return 'danger';
  return 'neutral';
}

export function AdminInvitationsPage() {
  const loader = useCallback(() => listInvitations(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<number>(Roles.Staff);

  const invitations = useMemo(() => data ?? [], [data]);

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
      ) : invitations.length > 0 ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
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
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Mail className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">No invitations yet</h3>
              <p className="max-w-md text-sm text-ink-soft">Invite your first teammate above — they’ll show up here once the invite goes out.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
