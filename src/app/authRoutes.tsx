import { Route } from 'react-router-dom';
import { NotAuthorizedPage } from '@/shared/components/StatusPages';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { SetPasswordPage } from '@/features/auth/pages/SetPasswordPage';
import { MagicLinkVerifyPage } from '@/features/auth/pages/MagicLinkVerifyPage';
import { AcceptInvitationPage } from '@/features/auth/pages/AcceptInvitationPage';

export function authRoutes() {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />
      <Route path="/verify" element={<MagicLinkVerifyPage />} />
      <Route path="/accept-invitation" element={<AcceptInvitationPage />} />
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />
    </>
  );
}

export function authenticated() {
  return true;
}
