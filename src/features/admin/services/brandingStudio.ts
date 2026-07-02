import type { Tenant } from '@/shared/proto/tenant';
import type { TenantBrandingInput } from '@/features/admin/services/tenantService';
import { DEFAULT_BRANDING, type TenantBranding } from '@/shared/theme/branding';
import { contrastGrade, type ContrastGrade } from '@/shared/theme/colorUtils';

export interface BrandingFormState {
  logoImagesId: string;
  logoUrl: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  button: string;
  highlight: string;
}

export function brandingFormFromTenant(tenant: Tenant): BrandingFormState {
  return {
    logoImagesId: tenant.logoUrl ? (tenant.logoUrl.split('/').pop() ?? '') : '',
    logoUrl: tenant.logoUrl,
    primary: tenant.brandPrimary || DEFAULT_BRANDING.primary,
    secondary: tenant.brandSecondary || DEFAULT_BRANDING.secondary,
    accent: tenant.brandAccent || DEFAULT_BRANDING.accent,
    background: tenant.brandBackground || DEFAULT_BRANDING.background,
    text: tenant.brandText || DEFAULT_BRANDING.text,
    button: tenant.brandButton || DEFAULT_BRANDING.button,
    highlight: tenant.brandHighlight || DEFAULT_BRANDING.highlight,
  };
}

export function brandingInputFromForm(form: BrandingFormState): TenantBrandingInput {
  return {
    logoImagesId: form.logoImagesId,
    brandPrimary: form.primary,
    brandSecondary: form.secondary,
    brandAccent: form.accent,
    brandBackground: form.background,
    brandText: form.text,
    brandButton: form.button,
    brandHighlight: form.highlight,
  };
}

export function brandingFromForm(form: BrandingFormState, tenantName: string): TenantBranding {
  return {
    primary: form.primary,
    secondary: form.secondary,
    accent: form.accent,
    background: form.background,
    text: form.text,
    button: form.button,
    highlight: form.highlight,
    logoUrl: form.logoUrl || null,
    tenantName,
  };
}

export interface ContrastCheck {
  label: string;
  grade: ContrastGrade;
  passes: boolean;
}

export function brandingContrastChecks(form: BrandingFormState): ContrastCheck[] {
  const checks: [string, string, string][] = [
    ['Text on background', form.text, form.background],
    ['Primary on background', form.primary, form.background],
    ['Button label on button', buttonLabelColor(form.button), form.button],
    ['Highlight on background', form.highlight, form.background],
  ];
  return checks.map(([label, foreground, background]) => {
    const grade = contrastGrade(foreground, background);
    return { label, grade, passes: grade !== 'Fail' };
  });
}

function buttonLabelColor(button: string): string {
  return contrastGrade('#ffffff', button) === 'Fail' ? '#1c1917' : '#ffffff';
}
