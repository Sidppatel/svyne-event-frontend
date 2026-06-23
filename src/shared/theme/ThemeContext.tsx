import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_BRANDING, applyBranding, type TenantBranding } from '@/shared/theme/branding';
import { currentTenantSlug } from '@/shared/subdomain';

interface ThemeContextValue {
  branding: TenantBranding;
  tenantSlug: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  branding: DEFAULT_BRANDING,
  tenantSlug: '',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const tenantSlug = currentTenantSlug();
  const [branding] = useState<TenantBranding>(DEFAULT_BRANDING);

  useEffect(() => {
    applyBranding(branding);
  }, [branding]);

  const value = useMemo(() => ({ branding, tenantSlug }), [branding, tenantSlug]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTenantBranding(): ThemeContextValue {
  return useContext(ThemeContext);
}
