import { isHexColor, readableTextOn } from '@/shared/theme/colorUtils';

export interface TenantBranding {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  button: string;
  highlight: string;
  logoUrl: string | null;
  tenantName: string;
}

export const DEFAULT_BRANDING: TenantBranding = {
  primary: '#8a2d3b',
  secondary: '#f3f0eb',
  accent: '#e8940a',
  background: '#faf8f5',
  text: '#1c1917',
  button: '#8a2d3b',
  highlight: '#e8940a',
  logoUrl: null,
  tenantName: '',
};

export interface BrandingPreset {
  name: string;
  colors: Pick<
    TenantBranding,
    'primary' | 'secondary' | 'accent' | 'background' | 'text' | 'button' | 'highlight'
  >;
}

export const BRANDING_PRESETS: BrandingPreset[] = [
  {
    name: 'Svyne Classic',
    colors: {
      primary: '#8a2d3b',
      secondary: '#f3f0eb',
      accent: '#e8940a',
      background: '#faf8f5',
      text: '#1c1917',
      button: '#8a2d3b',
      highlight: '#e8940a',
    },
  },
  {
    name: 'Midnight Stage',
    colors: {
      primary: '#4f46e5',
      secondary: '#e0e7ff',
      accent: '#f59e0b',
      background: '#f8fafc',
      text: '#0f172a',
      button: '#4f46e5',
      highlight: '#f59e0b',
    },
  },
  {
    name: 'Forest Gala',
    colors: {
      primary: '#166534',
      secondary: '#ecfdf5',
      accent: '#ca8a04',
      background: '#fafdf7',
      text: '#14201a',
      button: '#166534',
      highlight: '#ca8a04',
    },
  },
  {
    name: 'Coastal Club',
    colors: {
      primary: '#0e7490',
      secondary: '#e0f2fe',
      accent: '#f97316',
      background: '#f8fbfc',
      text: '#0c1a20',
      button: '#0e7490',
      highlight: '#f97316',
    },
  },
  {
    name: 'Noir Premiere',
    colors: {
      primary: '#18181b',
      secondary: '#f4f4f5',
      accent: '#d4a017',
      background: '#fafafa',
      text: '#18181b',
      button: '#18181b',
      highlight: '#d4a017',
    },
  },
];

export function brandingCssVars(branding: TenantBranding): Record<string, string> {
  const vars: Record<string, string> = {};
  const set = (name: string, value: string) => {
    vars[name] = value;
  };
  if (isHexColor(branding.primary)) {
    set('--brand', branding.primary);
    set('--brand-hover', `color-mix(in srgb, ${branding.primary} 85%, #000000)`);
    set('--brand-ink', readableTextOn(branding.primary));
    set('--ring', branding.primary);
    set('--brand-primary', branding.primary);
  }
  if (isHexColor(branding.secondary)) {
    set('--brand-secondary', branding.secondary);
    set('--secondary', branding.secondary);
    set('--secondary-foreground', readableTextOn(branding.secondary));
  }
  if (isHexColor(branding.accent)) {
    set('--voltage-accent', branding.accent);
    set('--voltage-accent-ink', readableTextOn(branding.accent));
    set('--brand-accent', branding.accent);
  }
  if (isHexColor(branding.background)) {
    set('--canvas', branding.background);
    set('--surface-sunken', `color-mix(in srgb, ${branding.background} 88%, #8a8378)`);
  }
  if (isHexColor(branding.text)) {
    set('--ink', branding.text);
    set('--ink-soft', `color-mix(in srgb, ${branding.text} 72%, ${branding.background || '#ffffff'})`);
    set('--ink-faint', `color-mix(in srgb, ${branding.text} 45%, ${branding.background || '#ffffff'})`);
  }
  if (isHexColor(branding.button)) {
    set('--primary', branding.button);
    set('--primary-foreground', readableTextOn(branding.button));
  }
  if (isHexColor(branding.highlight)) {
    set('--marigold', branding.highlight);
    set('--marigold-foreground', readableTextOn(branding.highlight));
  }
  return vars;
}

export function applyBranding(branding: TenantBranding): void {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  for (const [name, value] of Object.entries(brandingCssVars(branding))) {
    root.style.setProperty(name, value);
  }
}
