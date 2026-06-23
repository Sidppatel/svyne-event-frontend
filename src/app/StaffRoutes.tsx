import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { NotFoundPage } from '@/shared/components/StatusPages';
import { StaffLayout } from '@/shared/components/layouts/StaffLayout';
import { isStaff, canAccessAdmin } from '@/shared/roles';
import { authRoutes } from '@/app/authRoutes';
import { StaffCheckInPage } from '@/features/staff/pages/StaffCheckInPage';

export default function StaffRoutes() {
  return (
    <Routes>
      {authRoutes()}
      <Route
        element={
          <ProtectedRoute allow={(role) => isStaff(role) || canAccessAdmin(role)}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/staff" replace />} />
        <Route path="staff" element={<StaffCheckInPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
