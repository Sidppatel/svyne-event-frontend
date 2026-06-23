import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listTenantMembers,
  getTenantStripeStatus,
} from '@/features/developer/services/developerService';
import { roleLabel } from '@/shared/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function DeveloperTenantMembersPage() {
  const { tenantsId = '' } = useParams();
  const membersLoader = useCallback(() => listTenantMembers(tenantsId), [tenantsId]);
  const stripeLoader = useCallback(() => getTenantStripeStatus(tenantsId), [tenantsId]);
  const members = useAsync(membersLoader);
  const stripe = useAsync(stripeLoader);

  return (
    <div className="space-y-4">
      <Link to="/developer" className="text-sm text-indigo-600">
        ← Back to tenants
      </Link>
      <h1 className="text-xl font-semibold">Tenant members</h1>

      {stripe.data ? (
        <Card>
          <CardHeader>
            <CardTitle>Stripe</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>Account: {stripe.data.stripeConnectedAccountId || '—'}</p>
            <p>
              charges: {String(stripe.data.chargesEnabled)} · payouts: {String(stripe.data.payoutsEnabled)}
            </p>
          </CardContent>
        </Card>
      ) : null}

      {members.loading ? <p className="text-gray-500">Loading…</p> : null}
      {members.error ? <p className="text-red-600">{members.error}</p> : null}
      <div className="space-y-2">
        {(members.data ?? []).map((member) => (
          <Card key={member.usersId}>
            <CardContent className="flex items-center justify-between text-sm">
              <span>
                {member.displayName} · {member.email}
              </span>
              <span className="text-gray-500">{roleLabel(member.role)}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
