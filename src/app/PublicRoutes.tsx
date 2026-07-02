import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { NotFoundPage } from '@/shared/components/StatusPages';
import { PublicLayout } from '@/shared/components/layouts/PublicLayout';
import { authRoutes, authenticated } from '@/app/authRoutes';
import { EventListPage } from '@/features/public/pages/EventListPage';
import { TenantLandingPage } from '@/features/public/pages/TenantLandingPage';
import { currentTenantSlug } from '@/shared/subdomain';
import { EventDetailPage } from '@/features/public/pages/EventDetailPage';
import { PerformerProfilePage } from '@/features/public/pages/PerformerProfilePage';
import { SponsorProfilePage } from '@/features/public/pages/SponsorProfilePage';
import { WalletPage } from '@/features/public/pages/WalletPage';
import { ProfilePage } from '@/features/public/pages/ProfilePage';
import { BookingDetailPage } from '@/features/public/pages/BookingDetailPage';
import { CheckoutPage } from '@/features/public/pages/CheckoutPage';
import { ClaimTicketPage } from '@/features/public/pages/ClaimTicketPage';
import { FeedbackPage } from '@/features/public/pages/FeedbackPage';

export default function PublicRoutes() {
  return (
    <Routes>
      {authRoutes({ allowRegister: true })}
      <Route element={<PublicLayout />}>
        <Route index element={currentTenantSlug() ? <EventListPage /> : <TenantLandingPage />} />
        <Route path="events/:slug" element={<EventDetailPage />} />
        <Route path="performers/:slug" element={<PerformerProfilePage />} />
        <Route path="sponsors/:slug" element={<SponsorProfilePage />} />
        <Route path="claim" element={<ClaimTicketPage />} />
        <Route
          path="tickets"
          element={
            <ProtectedRoute allow={authenticated}>
              <WalletPage />
            </ProtectedRoute>
          }
        />
        <Route path="my-bookings" element={<Navigate to="/tickets" replace />} />
        <Route path="my-tickets" element={<Navigate to="/tickets" replace />} />
        <Route
          path="bookings/:bookingsId"
          element={
            <ProtectedRoute allow={authenticated}>
              <BookingDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout/:bookingsId"
          element={
            <ProtectedRoute allow={authenticated}>
              <CheckoutPage />
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
