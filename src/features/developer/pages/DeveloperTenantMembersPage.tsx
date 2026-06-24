import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  listTenantMembers,
  getTenantStripeStatus,
  getTenant,
  updateTenant,
  getTenantStripeProfile,
  updateTenantStripeProfile,
} from '@/features/developer/services/developerService';
import { roleLabel } from '@/shared/roles';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function DeveloperTenantMembersPage() {
  const { tenantsId = '' } = useParams();
  const membersLoader = useCallback(() => listTenantMembers(tenantsId), [tenantsId]);
  const stripeLoader = useCallback(() => getTenantStripeStatus(tenantsId), [tenantsId]);
  const members = useAsync(membersLoader);
  const stripe = useAsync(stripeLoader);

  return (
    <div className="space-y-4">
      <Link to="/" className="text-sm text-indigo-600">
        ← Back to tenants
      </Link>
      <h1 className="text-xl font-semibold">Tenant settings</h1>

      <TenantBasicForm tenantsId={tenantsId} />

      {stripe.data ? (
        <Card>
          <CardHeader>
            <CardTitle>Stripe status</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>Account: {stripe.data.stripeConnectedAccountId || '—'}</p>
            <p>
              charges: {String(stripe.data.chargesEnabled)} · payouts: {String(stripe.data.payoutsEnabled)} ·
              details submitted: {String(stripe.data.detailsSubmitted)}
            </p>
          </CardContent>
        </Card>
      ) : null}

      <StripeProfileForm tenantsId={tenantsId} />

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {members.loading ? <p className="text-gray-500">Loading…</p> : null}
          {members.error ? <p className="text-red-600">{members.error}</p> : null}
          {(members.data ?? []).map((member) => (
            <div key={member.usersId} className="flex items-center justify-between text-sm">
              <span>
                {member.displayName} · {member.email}
              </span>
              <span className="text-gray-500">{roleLabel(member.role)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TenantBasicForm({ tenantsId }: { tenantsId: string }) {
  const [form, setForm] = useState({ name: '', legalName: '', countryCode: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTenant(tenantsId)
      .then((t) => setForm({ name: t.name, legalName: t.legalName, countryCode: t.countryCode }))
      .catch((e) => setStatus(rpcErrorMessage(e)));
  }, [tenantsId]);

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      await updateTenant({ tenantsId, ...form });
      setStatus('Saved.');
    } catch (e) {
      setStatus(rpcErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {(
          [
            ['name', 'Name'],
            ['legalName', 'Legal name'],
            ['countryCode', 'Country code'],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-1">
            <Label htmlFor={`t-${key}`}>{label}</Label>
            <Input
              id={`t-${key}`}
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
          </div>
        ))}
        {status ? <p className="text-sm text-gray-600 md:col-span-2">{status}</p> : null}
        <div className="md:col-span-2">
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StripeProfileForm({ tenantsId }: { tenantsId: string }) {
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const [form, setForm] = useState({
    businessType: 'individual',
    businessName: '',
    businessUrl: '',
    productDescription: '',
    mcc: '',
    supportEmail: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTenantStripeProfile(tenantsId)
      .then((p) => {
        setHasAccount(p.hasAccount);
        // Always pre-fill from the saved profile — the data is captured at
        // onboarding before any Stripe account exists, so don't gate on hasAccount.
        setForm({
          businessType: p.businessType || 'individual',
          businessName: p.businessName,
          businessUrl: p.businessUrl,
          productDescription: p.productDescription,
          mcc: p.mcc,
          supportEmail: p.supportEmail,
        });
      })
      .catch((e) => setStatus(rpcErrorMessage(e)));
  }, [tenantsId]);

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      await updateTenantStripeProfile({ tenantsId, ...form });
      setStatus('Stripe profile updated.');
    } catch (e) {
      setStatus(rpcErrorMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stripe business profile</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {hasAccount === false ? (
          <p className="text-sm text-amber-600 md:col-span-2">
            No Stripe account yet — saved here now and used to pre-fill the seller's onboarding form when the admin clicks Start onboarding.
          </p>
        ) : (
          <p className="text-sm text-green-700 md:col-span-2">
            Connected account exists — changes are pushed to Stripe on save.
          </p>
        )}

        <div className="space-y-1">
          <Label htmlFor="s-businessType">Business type</Label>
          <select
            id="s-businessType"
            className="h-9 w-full rounded-md border border-gray-300 px-2 text-sm"
            value={form.businessType}
            onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))}
          >
            <option value="individual">Individual / sole proprietorship</option>
            <option value="company">Company</option>
          </select>
        </div>

        {(
          [
            ['businessName', 'Business / legal name'],
            ['businessUrl', 'Business website URL'],
            ['mcc', 'Industry MCC (4-digit code)'],
            ['supportEmail', 'Support email'],
            ['productDescription', 'Product description'],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-1">
            <Label htmlFor={`s-${key}`}>{label}</Label>
            <Input
              id={`s-${key}`}
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
          </div>
        ))}

        {status ? <p className="text-sm text-gray-600 md:col-span-2">{status}</p> : null}
        <div className="md:col-span-2">
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Stripe profile'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
