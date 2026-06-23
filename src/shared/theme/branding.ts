export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  fontFamily: string;
}

export const DEFAULT_BRANDING: TenantBranding = {
  primaryColor: '#4f46e5',
  secondaryColor: '#0ea5e9',
  accentColor: '#f59e0b',
  logoUrl: null,
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
};

export function applyBranding(branding: TenantBranding): void {
  if (typeof document === 'undefined') {
    return;
  }
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', branding.primaryColor);
  root.style.setProperty('--brand-secondary', branding.secondaryColor);
  root.style.setProperty('--brand-accent', branding.accentColor);
  root.style.setProperty('--brand-font', branding.fontFamily);
}
