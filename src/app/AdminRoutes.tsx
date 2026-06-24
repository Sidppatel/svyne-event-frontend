import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { NotFoundPage } from '@/shared/components/StatusPages';
import { AdminLayout } from '@/shared/components/layouts/AdminLayout';
import { canAccessAdmin } from '@/shared/roles';
import { authRoutes } from '@/app/authRoutes';
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';
import { AdminEventsPage } from '@/features/admin/pages/AdminEventsPage';
import { AdminEventWizardPage } from '@/features/admin/pages/AdminEventWizardPage';
import { AdminEventManagePage } from '@/features/admin/pages/AdminEventManagePage';
import { AdminBookingsPage } from '@/features/admin/pages/AdminBookingsPage';
import { AdminCatalogPage } from '@/features/admin/pages/AdminCatalogPage';
import { AdminInvitationsPage } from '@/features/admin/pages/AdminInvitationsPage';
import { AdminFinancialPage } from '@/features/admin/pages/AdminFinancialPage';
import { AdminFeedbackPage } from '@/features/admin/pages/AdminFeedbackPage';
import { AdminLogsPage } from '@/features/admin/pages/AdminLogsPage';

export default function AdminRoutes() {
  return (
    <Routes>
      {authRoutes()}
      <Route
        element={
          <ProtectedRoute allow={canAccessAdmin}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="events/new" element={<AdminEventWizardPage />} />
        <Route path="events/:eventsId" element={<AdminEventManagePage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="catalog" element={<AdminCatalogPage />} />
        <Route path="invitations" element={<AdminInvitationsPage />} />
        <Route path="financial" element={<AdminFinancialPage />} />
        <Route path="feedback" element={<AdminFeedbackPage />} />
        <Route path="logs" element={<AdminLogsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
