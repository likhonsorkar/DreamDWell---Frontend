import { NavLink, useNavigate } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { LayoutGrid, Home, ThumbsUp, LogOut, Mail, Wallet, ClipboardList, User, User2Icon, X } from 'lucide-react';
const Sidebar = ({ isOpen, setIsOpen }) => {
    const {logoutUser, user} = useAuthContext();
    const urlNavigator = useNavigate();
    const navLinkClasses = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive 
                ? "bg-orange-50 text-orange-600 font-bold" 
                : "text-gray-500 hover:bg-orange-50 hover:text-orange-600 font-medium"
        }`;
    const handleClose = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };
    return (
            <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col h-screen transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:h-screen
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
                <div className="p-8 flex items-center justify-between">
                    <NavLink to="/" onClick={handleClose} className="text-xl font-black tracking-tighter text-gray-800">
                        HOUSEFOR<span className="text-orange-500">RENT</span>
                    </NavLink>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <NavLink to="/dashboard" end className={navLinkClasses}>
                        <LayoutGrid size={20} />
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/myproperty" className={navLinkClasses}>
                        <Home size={20} />
                        My Properties
                    </NavLink>
                    <NavLink to="/dashboard/requests" className={navLinkClasses}>
                        <Mail size={20} />
                        Rental Requests
                    </NavLink>
                    <NavLink to="/dashboard/invoice" className={navLinkClasses}>
                        <ClipboardList size={20} />
                        My Invoice
                    </NavLink>
                    <NavLink to="/dashboard/wallet" className={navLinkClasses}>
                        <Wallet size={20} />
                        My Wallet
                    </NavLink>
                    <NavLink to="/dashboard/profile" className={navLinkClasses}>
                        <User2Icon size={20} />
                        My Profile
                    </NavLink>
                    {user?.is_staff && (
                        <>
                       <NavLink to="/dashboard/approveads" className={navLinkClasses}>
                            <ThumbsUp size={20} />
                            Approve Ads
                        </NavLink> 
                        <NavLink to="/dashboard/userlist" className={navLinkClasses}>
                            <User size={20} />
                            User List
                        </NavLink> 
                        </>
                    )}
                </nav>
                <div className="p-4 mt-auto border-t border-gray-100">
                    <button onClick={()=> {logoutUser(); urlNavigator("/login");}} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
    );
};
export default Sidebar;