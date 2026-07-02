import { Check, ImageIcon } from 'lucide-react';
import { BRANDING_PRESETS, type BrandingPreset } from '@/shared/theme/branding';
import { brandingContrastChecks, type BrandingFormState } from '@/features/admin/services/brandingStudio';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/lib/cn';

type BrandingColorKey = Exclude<keyof BrandingFormState, 'logoImagesId' | 'logoUrl'>;

const COLOR_FIELDS: { key: BrandingColorKey; label: string; hint: string }[] = [
  { key: 'primary', label: 'Primary', hint: 'Brand identity, links, active states' },
  { key: 'secondary', label: 'Secondary', hint: 'Banners and soft panels' },
  { key: 'accent', label: 'Accent', hint: 'Energy touches and secondary links' },
  { key: 'background', label: 'Background', hint: 'Page canvas behind everything' },
  { key: 'text', label: 'Text', hint: 'Headlines and body copy' },
  { key: 'button', label: 'Button', hint: 'Primary call-to-action fill' },
  { key: 'highlight', label: 'Highlight', hint: 'Badges and selected floor-plan tables' },
];

export function BrandingLogoSection({
  logoUrl,
  busy,
  onSelectFile,
}: {
  logoUrl: string;
  busy: boolean;
  onSelectFile: (file: File | undefined) => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-hairline bg-muted">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-full w-full object-contain p-1.5" />
        ) : (
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="branding-logo">{logoUrl ? 'Replace logo' : 'Upload logo'}</Label>
          <Input
            id="branding-logo"
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => onSelectFile(e.target.files?.[0])}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Square images work best. Shown in the site header, ticket emails, and QR tickets, scaled
          automatically for mobile and desktop.
        </p>
        {busy ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
      </div>
    </div>
  );
}

export function BrandingPresetRow({
  form,
  onApply,
}: {
  form: BrandingFormState;
  onApply: (preset: BrandingPreset) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {BRANDING_PRESETS.map((preset) => {
        const active =
          preset.colors.primary === form.primary &&
          preset.colors.accent === form.accent &&
          preset.colors.background === form.background &&
          preset.colors.button === form.button;
        return (
          <button
            key={preset.name}
            type="button"
            onClick={() => onApply(preset)}
            className={cn(
              'rounded-lg border p-2.5 text-left transition-all hover:shadow-[var(--shadow-e1)]',
              active ? 'border-brand ring-1 ring-brand' : 'border-hairline',
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {[preset.colors.primary, preset.colors.accent, preset.colors.highlight, preset.colors.background].map(
                  (swatch, index) => (
                    <span
                      key={index}
                      className="h-4 w-4 rounded-full border border-white"
                      style={{ backgroundColor: swatch }}
                    />
                  ),
                )}
              </div>
              {active ? <Check className="h-3.5 w-3.5 text-brand" /> : null}
            </div>
            <p className="mt-1.5 truncate text-xs font-medium text-ink">{preset.name}</p>
          </button>
        );
      })}
    </div>
  );
}

export function BrandingColorGrid({
  form,
  onChange,
}: {
  form: BrandingFormState;
  onChange: (key: BrandingColorKey, value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {COLOR_FIELDS.map((field) => (
        <div key={field.key} className="space-y-1">
          <Label htmlFor={`branding-${field.key}`}>{field.label}</Label>
          <div className="flex items-center gap-2">
            <Input
              id={`branding-${field.key}`}
              type="color"
              value={form[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="h-9 w-12 shrink-0 cursor-pointer p-1"
            />
            <Input
              value={form[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="flex-1 font-mono text-xs"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">{field.hint}</p>
        </div>
      ))}
    </div>
  );
}

export function BrandingContrastPanel({ form }: { form: BrandingFormState }) {
  const checks = brandingContrastChecks(form);
  return (
    <div className="space-y-1.5">
      {checks.map((check) => (
        <div
          key={check.label}
          className="flex items-center justify-between rounded-md bg-muted px-3 py-1.5"
        >
          <span className="text-xs text-ink-soft">{check.label}</span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-semibold',
              check.passes ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
            )}
          >
            {check.grade}
          </span>
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground">
        WCAG contrast against your background. Aim for AA or better so every guest can read your
        pages.
      </p>
    </div>
  );
}
