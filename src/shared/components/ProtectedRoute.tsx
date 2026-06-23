import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/auth/useAuth';

interface ProtectedRouteProps {
  allow: (role: number) => boolean;
  children: ReactNode;
}

export function ProtectedRoute({ allow, children }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!allow(role)) {
    return <Navigate to="/not-authorized" replace />;
  }
  return <>{children}</>;
}
