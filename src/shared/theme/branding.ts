export interface TenantBranding {
  primaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  fontFamily: string;
  voltage: number;
}

export const DEFAULT_BRANDING: TenantBranding = {
  primaryColor: '#8a2d3b',
  accentColor: '#e8940a',
  logoUrl: null,
  fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
  voltage: 0.5,
};

export function applyBranding(branding: TenantBranding): void {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  root.style.setProperty('--brand', branding.primaryColor);
  root.style.setProperty('--voltage-accent', branding.accentColor);
  root.style.setProperty('--font-body-stack', branding.fontFamily);
  root.style.setProperty('--voltage', String(branding.voltage));
  root.style.setProperty('--brand-primary', branding.primaryColor);
  root.style.setProperty('--brand-accent', branding.accentColor);
  root.style.setProperty('--brand-font', branding.fontFamily);
}
