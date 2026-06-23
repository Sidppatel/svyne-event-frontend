import type { Portal } from '@/shared/roles';

export interface PortalContext {
  portal: Portal;
  tenantSlug: string;
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

function readDevOverride(): Portal | null {
  if (typeof window !== 'undefined') {
    const param = new URLSearchParams(window.location.search).get('portal');
    if (param === 'public' || param === 'admin' || param === 'staff' || param === 'developer') {
      window.localStorage.setItem('svyne-portal', param);
      return param;
    }
    const stored = window.localStorage.getItem('svyne-portal');
    if (stored === 'public' || stored === 'admin' || stored === 'staff' || stored === 'developer') {
      return stored;
    }
  }
  const fromEnv = import.meta.env.VITE_PORTAL;
  if (fromEnv === 'public' || fromEnv === 'admin' || fromEnv === 'staff' || fromEnv === 'developer') {
    return fromEnv;
  }
  return null;
}

export function resolvePortalContext(): PortalContext {
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const labels = host.split('.');
  const first = labels[0];
  const isLocal = LOCAL_HOSTS.has(host) || host.endsWith('.localhost');

  if (path.startsWith('/staff')) {
    return { portal: 'staff', tenantSlug: isLocal ? '' : first };
  }

  if (isLocal) {
    const override = readDevOverride();
    return { portal: override ?? 'public', tenantSlug: '' };
  }

  if (first === 'admin') {
    return { portal: 'admin', tenantSlug: '' };
  }
  if (first === 'developer') {
    return { portal: 'developer', tenantSlug: '' };
  }
  return { portal: 'public', tenantSlug: first };
}

export function currentTenantSlug(): string {
  return resolvePortalContext().tenantSlug;
}
