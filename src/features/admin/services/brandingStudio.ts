import type { Tenant } from '@/shared/proto/tenant';
import type { TenantBrandingInput } from '@/features/admin/services/tenantService';
import {
  DEFAULT_BRANDING,
  contrastGrade,
  parseBrandTokens,
  serializeBrandTokens,
  type ContrastGrade,
  type TenantBranding,
} from '@/shared/theme/branding';
import type { CssColor } from '@adobe/leonardo-contrast-colors';

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
  tokens: Record<string, string>;
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
    tokens: parseBrandTokens(tenant.brandTokensJson),
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
    brandTokensJson: serializeBrandTokens(form.tokens),
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
    tokens: form.tokens,
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

export type BrandingColorSet = Pick<
  BrandingFormState,
  'primary' | 'secondary' | 'accent' | 'background' | 'text' | 'button' | 'highlight'
>;

export async function suggestBrandingColors(
  primarySeed: string,
  accentSeed: string,
): Promise<BrandingColorSet> {
  const { Color, BackgroundColor, Theme } = await import('@adobe/leonardo-contrast-colors');
  const neutral = new BackgroundColor({
    name: 'neutral',
    colorKeys: [primarySeed as CssColor],
    ratios: { secondary: 1.12, text: 15 },
    colorSpace: 'CAM02',
    smooth: false,
  });
  const brand = new Color({
    name: 'brand',
    colorKeys: [primarySeed as CssColor],
    ratios: { primary: 6.5, button: 5 },
    colorSpace: 'CAM02',
    smooth: false,
  });
  const accent = new Color({
    name: 'accent',
    colorKeys: [accentSeed as CssColor],
    ratios: { accent: 2.4, highlight: 3.2 },
    colorSpace: 'CAM02',
    smooth: false,
  });
  const theme = new Theme({
    colors: [neutral, brand, accent],
    backgroundColor: neutral,
    lightness: 98,
    output: 'HEX',
  });
  const resolved: Record<string, string> = {};
  let background = '';
  for (const group of theme.contrastColors) {
    if ('background' in group) {
      background = group.background;
      continue;
    }
    for (const value of group.values) {
      resolved[value.name] = value.value;
    }
  }
  return {
    background,
    secondary: resolved.secondary,
    text: resolved.text,
    primary: resolved.primary,
    button: resolved.button,
    accent: resolved.accent,
    highlight: resolved.highlight,
  };
}
