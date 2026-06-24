import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginWithPassword,
  loginWithGoogle,
  signUp,
  type SignUpInput,
  requestMagicLink,
  requestPasswordReset,
  setPassword,
} from '@/features/auth/services/authService';
import { rpcErrorMessage } from '@/shared/session';
import { homePathForRole } from '@/shared/roles';

export function useAuthFlow() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const run = useCallback(async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string, password: string) =>
      run(async () => {
        const auth = await loginWithPassword(email, password);
        navigate(homePathForRole(auth.user?.role ?? 0));
      }),
    [run, navigate],
  );

  const google = useCallback(
    (googleToken: string) =>
      run(async () => {
        const auth = await loginWithGoogle(googleToken);
        navigate(homePathForRole(auth.user?.role ?? 0));
      }),
    [run, navigate],
  );

  const register = useCallback(
    (input: SignUpInput) =>
      run(async () => {
        const auth = await signUp(input);
        navigate(homePathForRole(auth.user?.role ?? 0));
      }),
    [run, navigate],
  );

  const magicLink = useCallback(
    (email: string) =>
      run(async () => {
        await requestMagicLink(email);
        setNotice('Check your email for a sign-in link.');
      }),
    [run],
  );

  const forgotPassword = useCallback(
    (email: string) =>
      run(async () => {
        await requestPasswordReset(email);
        setNotice('If that email exists, a reset link was sent.');
      }),
    [run],
  );

  const submitNewPassword = useCallback(
    (token: string, password: string) =>
      run(async () => {
        await setPassword(token, password);
        setNotice('Password set. You can now sign in.');
        navigate('/login');
      }),
    [run, navigate],
  );

  return { loading, error, notice, login, google, register, magicLink, forgotPassword, submitNewPassword };
}
