import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { NotFoundPage } from '@/shared/components/StatusPages';
import { PublicLayout } from '@/shared/components/layouts/PublicLayout';
import { authRoutes, authenticated } from '@/app/authRoutes';
import { EventListPage } from '@/features/public/pages/EventListPage';
import { EventDetailPage } from '@/features/public/pages/EventDetailPage';
import { MyBookingsPage } from '@/features/public/pages/MyBookingsPage';
import { ProfilePage } from '@/features/public/pages/ProfilePage';
import { PurchaseDetailPage } from '@/features/public/pages/PurchaseDetailPage';
import { ClaimTicketPage } from '@/features/public/pages/ClaimTicketPage';
import { FeedbackPage } from '@/features/public/pages/FeedbackPage';

export default function PublicRoutes() {
  return (
    <Routes>
      {authRoutes()}
      <Route element={<PublicLayout />}>
        <Route index element={<EventListPage />} />
        <Route path="events/:slug" element={<EventDetailPage />} />
        <Route path="claim" element={<ClaimTicketPage />} />
        <Route
          path="my-bookings"
          element={
            <ProtectedRoute allow={authenticated}>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="purchases/:purchasesId"
          element={
            <ProtectedRoute allow={authenticated}>
              <PurchaseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectedRoute allow={authenticated}>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute allow={authenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
