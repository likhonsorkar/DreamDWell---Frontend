import { Routes, Route } from "react-router"
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Ads from "../pages/Ads";
import AdsDetails from "../pages/AdsDetails";
import Login from "../pages/Login";
import Registrations from "../pages/Registrations";
import EmailActivation from "../components/EmailActivation";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import AddProperty from "../pages/dashboard/AddProperty";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/dashboard/profile";
import UpdateProperty from "../pages/dashboard/UpdateProperty";
import ManagePropertyImages from "../pages/dashboard/ManagePropertyImages";
import ManageRequests from "../pages/dashboard/ManageRequests";
import ProfileView from "../pages/ProfileView";
import ApproveAds from "../pages/dashboard/ApproveAds";
import MyProperty from "../pages/dashboard/MyProperty";
import Invoice from "../pages/dashboard/Invoice";
import WalletDashboard from "../pages/dashboard/Wallet";
import PaymentFailed from "../pages/dashboard/PaymentFailed";
import PaymentCancel from "../pages/dashboard/PaymentCancel";
import PaymentSuccess from "../pages/dashboard/PaymentSuccess";
import UserList from "../pages/dashboard/UserList";
import ResetPassword from "../pages/ResetPassword";
import PasswordResetConfirm from "../pages/PasswordResetConfirm";

const MyAppRoute = () => {
    return (
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
    );
};

export default MyAppRoute;