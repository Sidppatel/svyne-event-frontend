export interface JwtClaims {
  sub?: string;
  role?: number;
  tenants_id?: string | null;
  tenant_slug?: string;
  exp?: number;
}

function decodeBase64Url(segment: string): string {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  if (typeof atob === 'function') {
    return atob(padded);
  }
  return Buffer.from(padded, 'base64').toString('binary');
}

export function decodeJwt(token: string): JwtClaims | null {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }
  try {
    const payload = decodeBase64Url(parts[1]);
    const json = decodeURIComponent(
      Array.from(payload)
        .map((char) => '%' + char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
    const parsed = JSON.parse(json) as Record<string, unknown>;
    const role = typeof parsed.role === 'string' ? Number(parsed.role) : (parsed.role as number | undefined);
    return {
      sub: parsed.sub as string | undefined,
      role,
      tenants_id: (parsed.tenants_id as string | null | undefined) ?? null,
      tenant_slug: parsed.tenant_slug as string | undefined,
      exp: parsed.exp as number | undefined,
    };
  } catch {
    return null;
  }
}

export function isExpired(expiresAtSeconds: number | undefined, skewSeconds = 30): boolean {
  if (!expiresAtSeconds) {
    return true;
  }
  const nowSeconds = Math.floor(Date.now() / 1000);
  return nowSeconds >= expiresAtSeconds - skewSeconds;
}
