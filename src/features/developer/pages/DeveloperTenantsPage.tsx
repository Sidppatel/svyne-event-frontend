import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import { listTenants, createTenant, archiveTenant } from '@/features/developer/services/developerService';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const EMPTY_FORM = { slug: '', name: '', adminEmail: '', adminFirstName: '', adminLastName: '' };

export function DeveloperTenantsPage() {
  const loader = useCallback(() => listTenants(), []);
  const { data, loading, error, reload } = useAsync(loader);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setFormError(null);
    try {
      await createTenant(form);
      setForm(EMPTY_FORM);
      reload();
    } catch (caught) {
      setFormError(rpcErrorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Tenants</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create tenant</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {(
            [
              ['slug', 'Slug'],
              ['name', 'Name'],
              ['adminEmail', 'Admin email'],
              ['adminFirstName', 'Admin first name'],
              ['adminLastName', 'Admin last name'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                value={form[key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
          {formError ? <p className="text-sm text-red-600 md:col-span-2">{formError}</p> : null}
          <div className="md:col-span-2">
            <Button onClick={submit} disabled={submitting}>
              {submitting ? 'Creating…' : 'Create tenant'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? <p className="text-gray-500">Loading…</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="space-y-2">
        {(data ?? []).map((tenant) => (
          <Card key={tenant.tenantsId}>
            <CardContent className="flex flex-wrap items-center justify-between gap-2">
              <Link to={`/developer/tenants/${tenant.tenantsId}`} className="font-medium text-indigo-600">
                {tenant.name} <span className="text-gray-400">/{tenant.slug}</span>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {tenant.memberCount} members · {tenant.eventCount} events
                </span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    submitting
                      ? undefined
                      : archiveTenant(tenant.tenantsId).then(reload).catch((caught) => setFormError(rpcErrorMessage(caught)))
                  }
                >
                  Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
