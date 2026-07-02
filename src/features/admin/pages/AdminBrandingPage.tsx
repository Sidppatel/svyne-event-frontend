import { useEffect, useMemo, useState } from 'react';
import { getMyTenant, updateMyTenantBranding } from '@/features/admin/services/tenantService';
import {
  brandingFormFromTenant,
  brandingFromForm,
  brandingInputFromForm,
  type BrandingFormState,
} from '@/features/admin/services/brandingStudio';
import {
  BrandingColorGrid,
  BrandingContrastPanel,
  BrandingLogoSection,
  BrandingPresetRow,
} from '@/features/admin/components/branding/BrandingControls';
import { BrandingPreview } from '@/features/admin/components/branding/BrandingPreview';
import { DEFAULT_BRANDING, type BrandingPreset } from '@/shared/theme/branding';
import { uploadImage } from '@/shared/upload';
import { useAuth } from '@/shared/auth/useAuth';
import { rpcErrorMessage } from '@/shared/session';
import { Button } from '@/shared/ui/button';

const EMPTY_FORM: BrandingFormState = {
  logoImagesId: '',
  logoUrl: '',
  primary: DEFAULT_BRANDING.primary,
  secondary: DEFAULT_BRANDING.secondary,
  accent: DEFAULT_BRANDING.accent,
  background: DEFAULT_BRANDING.background,
  text: DEFAULT_BRANDING.text,
  button: DEFAULT_BRANDING.button,
  highlight: DEFAULT_BRANDING.highlight,
};

export function AdminBrandingPage() {
  const { tenantsId } = useAuth();
  const [form, setForm] = useState<BrandingFormState>(EMPTY_FORM);
  const [tenantName, setTenantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoBusy, setLogoBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    getMyTenant()
      .then((tenant) => {
        setForm(brandingFormFromTenant(tenant));
        setTenantName(tenant.name);
      })
      .catch((caught) => setError(rpcErrorMessage(caught)))
      .finally(() => setLoading(false));
  }, []);

  const previewBranding = useMemo(() => brandingFromForm(form, tenantName), [form, tenantName]);

  function setColor(key: keyof BrandingFormState, value: string) {
    setNotice(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: BrandingPreset) {
    setNotice(null);
    setForm((prev) => ({ ...prev, ...preset.colors }));
  }

  async function onLogo(file: File | undefined) {
    if (!file || !tenantsId) {
      return;
    }
    setLogoBusy(true);
    setError(null);
    try {
      const result = await uploadImage(file, 'tenant', tenantsId);
      setForm((prev) => ({
        ...prev,
        logoImagesId: result.imagesId,
        logoUrl: URL.createObjectURL(file),
      }));
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setLogoBusy(false);
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await updateMyTenantBranding(brandingInputFromForm(form));
      setNotice('Branding published. Your public pages now use this look.');
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold text-ink">Branding</h1>
          <p className="text-sm text-muted-foreground">
            Shape how {tenantName || 'your brand'} looks on public event pages, ticketing, and the
            floor plan. Changes appear in the live preview instantly and publish when you save.
          </p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Publishing…' : 'Publish branding'}
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {notice ? <p className="text-sm text-success">{notice}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
            <div className="border-b border-hairline px-5 py-3.5">
              <h2 className="font-display text-base font-semibold text-ink">Logo</h2>
            </div>
            <div className="p-5">
              <BrandingLogoSection logoUrl={form.logoUrl} busy={logoBusy} onSelectFile={onLogo} />
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
            <div className="border-b border-hairline px-5 py-3.5">
              <h2 className="font-display text-base font-semibold text-ink">Colors</h2>
            </div>
            <div className="space-y-5 p-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Presets
                </p>
                <BrandingPresetRow form={form} onApply={applyPreset} />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Custom palette
                </p>
                <BrandingColorGrid form={form} onChange={setColor} />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Accessibility
                </p>
                <BrandingContrastPanel form={form} />
              </div>
            </div>
          </section>
        </div>

        <section className="xl:sticky xl:top-6 xl:self-start">
          <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-[var(--shadow-e1)]">
            <div className="border-b border-hairline px-5 py-3.5">
              <h2 className="font-display text-base font-semibold text-ink">Live preview</h2>
            </div>
            <div className="p-5">
              <BrandingPreview branding={previewBranding} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
