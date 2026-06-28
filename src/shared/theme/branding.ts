export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  fontFamily: string;
}

export const DEFAULT_BRANDING: TenantBranding = {
  primaryColor: '#000000', // Expo: black is the only brand voltage
  secondaryColor: '#f0f0f3', // surface-strong
  accentColor: '#ab6400', // warning/amber accent
  logoUrl: null,
  fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
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
