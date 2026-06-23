import { useCallback } from 'react';
import { useAsync } from '@/shared/hooks/useAsync';
import { loadProfile } from '@/features/auth/services/authService';
import { useAuth } from '@/shared/auth/useAuth';
import { roleLabel } from '@/shared/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function ProfilePage() {
  const loader = useCallback(() => loadProfile(), []);
  const { loading, error } = useAsync(loader);
  const { user, role } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {user.firstName} {user.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-gray-600">
            <p>Email: {user.email}</p>
            <p>Role: {roleLabel(role)}</p>
            <p>Tenant: {user.tenantSlug || '—'}</p>
            <p>Verified: {user.emailVerified ? 'yes' : 'no'}</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
