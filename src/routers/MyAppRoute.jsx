import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

// Lazy-load pages
const Home = lazy(() => import("../pages/Home"));
const Ads = lazy(() => import("../pages/Ads"));
const AdsDetails = lazy(() => import("../pages/AdsDetails"));
const Login = lazy(() => import("../pages/Login"));
const Registrations = lazy(() => import("../pages/Registrations"));
const EmailActivation = lazy(() => import("../components/EmailActivation"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AddProperty = lazy(() => import("../pages/dashboard/AddProperty"));
const Profile = lazy(() => import("../pages/dashboard/profile"));
const UpdateProperty = lazy(() => import("../pages/dashboard/UpdateProperty"));
const ManagePropertyImages = lazy(() => import("../pages/dashboard/ManagePropertyImages"));
const ManageRequests = lazy(() => import("../pages/dashboard/ManageRequests"));
const ProfileView = lazy(() => import("../pages/ProfileView"));
const ApproveAds = lazy(() => import("../pages/dashboard/ApproveAds"));
const MyProperty = lazy(() => import("../pages/dashboard/MyProperty"));
const Invoice = lazy(() => import("../pages/dashboard/Invoice"));
const WalletDashboard = lazy(() => import("../pages/dashboard/Wallet"));
const PaymentFailed = lazy(() => import("../pages/dashboard/PaymentFailed"));
const PaymentCancel = lazy(() => import("../pages/dashboard/PaymentCancel"));
const PaymentSuccess = lazy(() => import("../pages/dashboard/PaymentSuccess"));
const UserList = lazy(() => import("../pages/dashboard/UserList"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const PasswordResetConfirm = lazy(() => import("../pages/PasswordResetConfirm"));

const FullPageLoader = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium animate-pulse">Loading experience...</p>
    </div>
);

const MyAppRoute = () => {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Registrations/>} />
                    <Route path="/property" element={<Ads/>}/>
                    <Route path="/property/:id" element={<AdsDetails/>}/>
                    <Route path="/profile/:id" element={<ProfileView/>} />
                    <Route path="/activate/:uid/:token" element={<EmailActivation/>} />
                    <Route path="/password/reset" element={<ResetPassword/>} />
                    <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm/>} />
                    <Route path="/payment/success/:tranId" element={<PaymentSuccess/>} />
                    <Route path="/payment/failed" element={<PaymentFailed/>} />
                    <Route path="payment/cancel" element={<PaymentCancel/>} />
                    <Route path="*" element={<NotFound/>} />
                </Route>

                <Route path="/dashboard" element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="addproperty" element={<AddProperty/>} />
                    <Route path="myproperty" element={<MyProperty/>} />
                    <Route path="requests" element={<ManageRequests/>} />
                    <Route path="profile" element={<Profile/>} />
                    <Route path="updateproperty/:id" element={<UpdateProperty/>}/>
                    <Route path="property/:id/images" element={<ManagePropertyImages />} />
                    <Route path="approveads" element={<ApproveAds/>} />
                    <Route path="invoice" element={<Invoice/>} />
                    <Route path="wallet" element={<WalletDashboard/>} />
                    <Route path="userlist" element={<UserList/>} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default MyAppRoute;

