import { authClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import { currentTenantSlug } from '@/shared/subdomain';
import { useAuthStore } from '@/shared/auth/store';
import type { AuthResponse } from '@/shared/proto/auth';

export async function loginWithPassword(email: string, password: string): Promise<AuthResponse> {
  const auth = await callRpc(() =>
    authClient.login({ email, password, tenantSlug: currentTenantSlug() }),
  );
  useAuthStore.getState().setSession(auth);
  return auth;
}

export async function loginWithGoogle(googleToken: string): Promise<AuthResponse> {
  const auth = await callRpc(() =>
    authClient.googleSignIn({ googleToken, tenantSlug: currentTenantSlug() }),
  );
  useAuthStore.getState().setSession(auth);
  return auth;
}

export async function requestMagicLink(email: string): Promise<void> {
  await callRpc(() => authClient.requestMagicLink({ email, tenantSlug: currentTenantSlug() }));
}

export async function verifyMagicLink(token: string): Promise<AuthResponse> {
  const auth = await callRpc(() => authClient.verifyMagicLink({ token }));
  useAuthStore.getState().setSession(auth);
  return auth;
}

export async function requestPasswordReset(email: string): Promise<void> {
  await callRpc(() =>
    authClient.requestPasswordReset({ email, tenantSlug: currentTenantSlug() }),
  );
}

export async function setPassword(token: string, newPassword: string): Promise<void> {
  await callRpc(() => authClient.setPassword({ token, newPassword }));
}

export async function loadProfile(): Promise<void> {
  const profile = await callRpc(() => authClient.me({}));
  useAuthStore.getState().setUser(profile);
}

export async function logout(): Promise<void> {
  const refreshToken = useAuthStore.getState().refreshToken ?? '';
  try {
    await callRpc(() => authClient.logout({ sessionHash: refreshToken }));
  } finally {
    useAuthStore.getState().clear();
  }
}
