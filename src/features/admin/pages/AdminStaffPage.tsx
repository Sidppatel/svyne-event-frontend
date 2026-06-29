import { useCallback, useState } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listAllStaff,
  addOrInviteStaff,
  removeStaffRole,
} from '@/features/admin/services/staffAdminService';
import { rpcErrorMessage } from '@/shared/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { UserCheck, UserMinus, UserPlus, Mail, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminStaffPage() {
  const staffLoader = useCallback(() => listAllStaff(), []);
  const staff = useAsync(staffLoader);
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddOrInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await addOrInviteStaff(email.trim());
      if (res.userExisted) {
        toast.success(`Success: User promoted to staff!`);
      } else {
        toast.success(`Invitation email sent successfully to ${email.trim()}!`);
      }
      setEmail('');
      staff.reload();
    } catch (err) {
      toast.error(rpcErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(usersId: string, email: string) {
    if (!confirm(`Are you sure you want to remove staff role from ${email}? They will be demoted to attendee and lose check-in access.`)) {
      return;
    }

    try {
      await removeStaffRole(usersId);
      toast.success('Staff member demoted successfully.');
      staff.reload();
    } catch (err) {
      toast.error(rpcErrorMessage(err));
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Staff Management
        </h1>
        <p className="text-muted-foreground">
          Manage event check-in staff members. Add existing users by email or invite new ones to create accounts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Add / Invite Staff
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Assign the Staff role to a user.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOrInvite} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="staff-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="staff-email"
                    type="email"
                    placeholder="staff@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Adding...' : 'Add / Invite'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Current Staff Members
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Active users with event check-in permissions.
            </p>
          </CardHeader>
          <CardContent>
            {staff.loading ? (
              <p className="text-muted-foreground text-center py-6">Loading staff list...</p>
            ) : staff.error ? (
              <p className="text-destructive text-center py-6">{staff.error}</p>
            ) : (staff.data ?? []).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground space-y-2">
                <ShieldAlert className="h-8 w-8 mx-auto text-muted-foreground/60" />
                <p>No staff members found.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {(staff.data ?? []).map((member) => (
                  <div key={member.usersId} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {member.firstName || member.lastName 
                          ? `${member.firstName} ${member.lastName}`.trim()
                          : 'Invited User'}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(member.usersId, member.email)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
                    >
                      <UserMinus className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
