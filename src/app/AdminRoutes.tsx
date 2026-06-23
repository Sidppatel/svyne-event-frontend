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
import { AdminPurchasesPage } from '@/features/admin/pages/AdminPurchasesPage';
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
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/events" element={<AdminEventsPage />} />
        <Route path="admin/events/new" element={<AdminEventWizardPage />} />
        <Route path="admin/events/:eventsId" element={<AdminEventManagePage />} />
        <Route path="admin/purchases" element={<AdminPurchasesPage />} />
        <Route path="admin/catalog" element={<AdminCatalogPage />} />
        <Route path="admin/invitations" element={<AdminInvitationsPage />} />
        <Route path="admin/financial" element={<AdminFinancialPage />} />
        <Route path="admin/feedback" element={<AdminFeedbackPage />} />
        <Route path="admin/logs" element={<AdminLogsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
