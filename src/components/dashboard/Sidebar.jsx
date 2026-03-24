import { NavLink, useNavigate } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { LayoutGrid, Home, ThumbsUp, LogOut, Mail, Wallet, ClipboardList, User, User2Icon, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SidebarSkeleton } from './DashboardSkeletons';
const Sidebar = ({ isOpen, setIsOpen, loading }) => {
    const {logoutUser, user} = useAuthContext();
    const { theme, toggleTheme } = useTheme();
    const urlNavigator = useNavigate();
    const navLinkClasses = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive 
                ? "bg-primary/10 text-primary font-bold shadow-sm" 
                : "text-base-content/70 hover:bg-base-200/50 hover:text-primary font-medium"
        }`;
    const handleClose = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };
    if (loading) {
        return (
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-base-100 border-r border-base-200 flex flex-col h-screen transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <SidebarSkeleton />
            </aside>
        );
    }
    return (
            <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-base-100 border-r border-base-200 flex flex-col h-screen transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:h-screen
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
                <div className="p-8 flex items-center justify-between">
                    <NavLink to="/" onClick={handleClose} className="text-2xl font-black tracking-tighter text-base-content flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Home size={20} className="text-white" />
                        </div>
                        <span>DREAM<span className="text-primary">DWELL</span></span>
                    </NavLink>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-base-content/70 hover:bg-base-200 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-bold text-base-content/40 px-4 mb-2 uppercase tracking-widest">Main Menu</div>
                    <NavLink to="/dashboard" end className={navLinkClasses} onClick={handleClose}>
                        <LayoutGrid size={20} />
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/myproperty" className={navLinkClasses} onClick={handleClose}>
                        <Home size={20} />
                        My Properties
                    </NavLink>
                    <NavLink to="/dashboard/requests" className={navLinkClasses} onClick={handleClose}>
                        <Mail size={20} />
                        Rental Requests
                    </NavLink>
                    <NavLink to="/dashboard/invoice" className={navLinkClasses} onClick={handleClose}>
                        <ClipboardList size={20} />
                        My Invoice
                    </NavLink>
                    <NavLink to="/dashboard/wallet" className={navLinkClasses} onClick={handleClose}>
                        <Wallet size={20} />
                        My Wallet
                    </NavLink>
                    <NavLink to="/dashboard/profile" className={navLinkClasses} onClick={handleClose}>
                        <User2Icon size={20} />
                        My Profile
                    </NavLink>

                    {user?.is_staff && (
                        <div className="mt-6 pt-6 border-t border-base-200/60">
                            <div className="text-xs font-bold text-base-content/40 px-4 mb-2 uppercase tracking-widest">Admin Panel</div>
                            <NavLink to="/dashboard/approveads" className={navLinkClasses} onClick={handleClose}>
                                <ThumbsUp size={20} />
                                Approve Ads
                            </NavLink> 
                            <NavLink to="/dashboard/userlist" className={navLinkClasses} onClick={handleClose}>
                                <User size={20} />
                                User List
                            </NavLink> 
                        </div>
                    )}
                </nav>
                <div className="p-4 mt-auto border-t border-base-200 space-y-2">
                    <button 
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-4 py-3 text-base-content/70 hover:bg-base-200 rounded-xl font-bold transition-all"
                    >
                        {theme === 'dark' ? (
                            <>
                                <Sun size={20} className="text-yellow-500" />
                                Light Mode
                            </>
                        ) : (
                            <>
                                <Moon size={20} className="text-primary" />
                                Dark Mode
                            </>
                        )}
                    </button>

                    <button onClick={()=> {logoutUser(); urlNavigator("/login");}} className="flex items-center gap-3 w-full px-4 py-3 text-error hover:bg-error/10 rounded-xl font-bold transition-all">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
    );
};
export default Sidebar;


