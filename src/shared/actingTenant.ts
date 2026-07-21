import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ActingTenantState {
  tenantsId: string | null;
  tenantName: string | null;
  notifyTenant: boolean;
  setActingTenant: (tenantsId: string, tenantName: string) => void;
  setNotifyTenant: (notify: boolean) => void;
  clear: () => void;
}

export const useActingTenantStore = create<ActingTenantState>()(
  persist(
    (set) => ({
      tenantsId: null,
      tenantName: null,
      notifyTenant: false,
      setActingTenant: (tenantsId, tenantName) => set({ tenantsId, tenantName }),
      setNotifyTenant: (notifyTenant) => set({ notifyTenant }),
      clear: () => set({ tenantsId: null, tenantName: null, notifyTenant: false }),
    }),
    { name: 'ticketspan-acting-tenant' },
  ),
);

export function getActingTenant(): { tenantsId: string | null; notifyTenant: boolean } {
  const { tenantsId, notifyTenant } = useActingTenantStore.getState();
  return { tenantsId, notifyTenant };
}
