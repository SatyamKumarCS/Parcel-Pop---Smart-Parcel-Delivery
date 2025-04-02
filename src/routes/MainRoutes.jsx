import { BrowserRouter, Routes, Route } from 'react-router';
import App from '@/App';
import HomePage from '@/pages/HomePage';
import LogInAndRegisterPage from '../pages/LogInAndRegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import BookParcelPage from '@/pages/BookParcelPagee';
import UpdateBookedParcelPage from '@/pages/UpdateBookedParcelPage';
import MyBookingPage from '@/pages/MyBookingPage';
import MyProfilePage from '@/pages/MyProfilePage';
import AllParcelsPage from '@/pages/AllParcelsPage';
import AllUsersPage from '@/pages/AllUsersPage';
import AllDeliveryMenPage from '@/pages/AllDeliveryMenPage';
import DeliveryListPage from '@/pages/DeliveryListPage';
import ParcelStatistics from '@/pages/ParcelStatistics';
import MyReviews from '@/pages/MyReviews';
import PaymentPage from '@/pages/PaymentPage';
import PaymentSuccess from '@/components/PaymentSuccess';
import PrivateRoute from '@/components/PrivateRoute';
import TrackParcelPage from '@/pages/TrackParcelPage';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />

                    <Route path="signin-signup" element={<LogInAndRegisterPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="payment-success" element={<PaymentSuccess />} />
                    <Route path="track/:Parcel_id" element={<TrackParcelPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Route>
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute allowedRoles={['Admin', 'User', 'DeliveryMan']}>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                >
                    <Route path="book-parcel" element={<BookParcelPage />} />
                    <Route path="myBookigs" element={<MyBookingPage />} />
                    <Route path="myProfile" element={<MyProfilePage />} />

                    <Route path="updateBooking/:id" element={<UpdateBookedParcelPage />} />
                    <Route path="allParcel" element={<AllParcelsPage />} />
                    <Route path="allUsers" element={<AllUsersPage />} />
                    <Route path="allDeliveryMen" element={<AllDeliveryMenPage />} />
                    <Route path="myDelivery" element={<DeliveryListPage />} />
                    <Route path="parcelStatistics" element={<ParcelStatistics />} />
                    <Route path="myReviews" element={<MyReviews />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
