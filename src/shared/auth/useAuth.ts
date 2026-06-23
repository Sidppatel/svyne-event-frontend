import { useAuthStore } from '@/shared/auth/store';
import { Roles } from '@/shared/roles';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const clear = useAuthStore((state) => state.clear);

  const role = user?.role ?? Roles.Attendee;

  return {
    user,
    role,
    isAuthenticated: Boolean(accessToken),
    tenantsId: user?.tenantsId ?? null,
    tenantSlug: user?.tenantSlug ?? '',
    logout: clear,
  };
}
