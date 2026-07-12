import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  getMyTenant,
  updateMyTenantContact,
  getTenantStripeProfile,
  type TenantContactInput,
} from '@/features/admin/services/tenantService';
import { getStripeStatus, startStripeOnboarding } from '@/features/admin/services/financialService';
import { useAuth } from '@/shared/auth/useAuth';
import { rpcErrorMessage } from '@/shared/session';
import { formatUsPhone } from '@/shared/lib/validation';
import type { Tenant, TenantStripeProfile } from '@/shared/proto/tenant';
import type { StripeStatus } from '@/shared/proto/admin';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';


const EMPTY: TenantContactInput = {
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
};

export function AdminTenantSettingsPage() {
  const { tenantsId } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [form, setForm] = useState<TenantContactInput>(EMPTY);
  const [stripe, setStripe] = useState<StripeStatus | null>(null);
  const [stripeProfile, setStripeProfile] = useState<TenantStripeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const stripeReturn = searchParams.get('stripe');

  useEffect(() => {
    getMyTenant()
      .then((value) => {
        setTenant(value);
        setForm({
          phone: value.phone,
          addressLine1: value.addressLine1,
          addressLine2: value.addressLine2,
          city: value.city,
          state: value.state,
          zip: value.zip,
        });
      })
      .catch((caught) => setError(rpcErrorMessage(caught)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!tenantsId) {
      return;
    }
    getStripeStatus(tenantsId).then(setStripe).catch(() => undefined);
    getTenantStripeProfile(tenantsId).then(setStripeProfile).catch(() => undefined);
  }, [tenantsId]);

  useEffect(() => {
    if (!stripeReturn || !tenantsId) {
      return;
    }
    getStripeStatus(tenantsId).then(setStripe).catch((caught) => setError(rpcErrorMessage(caught)));
    searchParams.delete('stripe');
    setSearchParams(searchParams, { replace: true });
    
  }, [stripeReturn, tenantsId, searchParams, setSearchParams]);

  function field(key: keyof TenantContactInput) {
    return (value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await updateMyTenantContact(form);
      setNotice('Settings saved.');
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  async function openStripe() {
    setError(null);
    try {
      const url = await startStripeOnboarding(tenantsId ?? '');
      window.open(url, '_blank');
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading…</p>;
  }

  const hasAccount = stripeProfile?.hasAccount ?? false;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-ink">Tenant Settings</h1>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
        <div className="border-b border-hairline px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Business profile</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ReadOnly label="Slug" value={tenant?.slug ?? ''} />
            <ReadOnly label="Company name" value={tenant?.name ?? ''} />
            <ReadOnly label="Legal name" value={tenant?.legalName ?? ''} />
          </div>

          <Labeled label="Company phone" value={form.phone} onChange={(v) => field('phone')(formatUsPhone(v))} />
          <Labeled label="Address line 1" value={form.addressLine1} onChange={field('addressLine1')} />
          <Labeled label="Address line 2" value={form.addressLine2} onChange={field('addressLine2')} />
          <div className="grid grid-cols-3 gap-3">
            <Labeled label="City" value={form.city} onChange={field('city')} />
            <Labeled label="State" value={form.state} onChange={field('state')} />
            <Labeled label="Zip code" value={form.zip} onChange={field('zip')} />
          </div>

          {notice ? <p className="text-sm text-success">{notice}</p> : null}
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
        <div className="border-b border-hairline px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Branding</h2>
        </div>
        <div className="flex items-center justify-between gap-4 p-6">
          <p className="text-sm text-muted-foreground">
            Logo, color palette, and the live preview of your public pages now live in the branding
            studio.
          </p>
          <Link
            to="/branding"
            className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-e1)] hover:bg-brand-hover"
          >
            Open branding studio
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
        <div className="border-b border-hairline px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Stripe</h2>
        </div>
        <div className="p-6 space-y-3">
          {hasAccount ? (
            <div className="text-sm text-muted-foreground">
              <p>Account: {stripeProfile?.businessName || '—'}</p>
              {stripe?.bankLast4 ? <p>Payout bank: •••• {stripe.bankLast4}</p> : null}
              {stripe ? (
                <p>
                  charges: {String(stripe.chargesEnabled)} · payouts: {String(stripe.payoutsEnabled)} · details:{' '}
                  {String(stripe.detailsSubmitted)}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No Stripe account connected yet.</p>
          )}
          <Button size="sm" onClick={openStripe}>
            {hasAccount ? 'Manage on Stripe' : 'Connect Stripe account'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Labeled({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} disabled readOnly />
    </div>
  );
}
