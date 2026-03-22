import { Link, useNavigate} from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { LogOut, User, Settings, UserCircle, LayoutDashboard, Sun, Moon, Home as HomeIcon } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const {user, logoutUser, successMSG, errorMSG} = useAuthContext();
    const { theme, toggleTheme } = useTheme();
    const urlNavigator = useNavigate();
    
    const navLinks = (
        <>
            <li><Link to="/property" className="hover:text-primary font-bold transition-colors">Find a Home</Link></li>
            <li><Link to={`/login?next=/dashboard/addproperty`} className="hover:text-primary font-bold transition-colors">List Property</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-primary font-bold transition-colors">How it works</Link></li>
        </>
    );
    const authnavLinks = (
        <>
            <li><Link to="/property" className="hover:text-primary font-bold transition-colors">Find a Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary font-bold transition-colors">Dashboard</Link></li>
            <li><Link to="/dashboard/addproperty" className="hover:text-primary font-bold transition-colors">List Property</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-primary font-bold transition-colors">How it works</Link></li>
        </>
    );

    const handleLogout = () => {
        logoutUser();
        urlNavigator("/login");
    };

    return (
        <>
        <header className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-200 sticky top-0 z-50 px-4 md:px-12 h-20 transition-all duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden p-2 hover:bg-primary/10 rounded-xl mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 animate-in slide-in-from-top-2 duration-200">
                        {!user ? navLinks : authnavLinks}
                    </ul>
                </div>
                
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/30"
                    >
                        <HomeIcon size={22} className="text-white" />
                    </motion.div>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-base-content">
                        Dream<span className="text-primary">Dwell</span>
                    </span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 text-base-content/60">
                    {!user ? navLinks : authnavLinks}
                </ul>
            </div>

            <div className="navbar-end gap-2 md:gap-4">
                <motion.button 
                    whileTap={{ scale: 0.9, rotate: 15 }}
                    onClick={toggleTheme} 
                    className="btn btn-ghost btn-circle hover:bg-base-200 rounded-full"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === 'light' ? <Moon size={20} className="text-slate-700" /> : <Sun size={20} className="text-amber-400" />}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>

                {!user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn btn-ghost btn-sm md:btn-md text-base-content/70 font-bold px-4 rounded-xl hover:bg-base-200 transition-all">Log In</Link>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/signup" className="btn btn-sm md:btn-md btn-primary text-white px-6 shadow-xl shadow-primary/20 rounded-xl font-bold border-none">
                                Sign Up
                            </Link>
                        </motion.div>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <motion.div 
                            tabIndex={0} 
                            role="button" 
                            whileHover={{ scale: 1.05 }}
                            className="btn btn-ghost btn-circle avatar online p-0.5 border-2 border-primary/20"
                        >
                            <div className="w-10 rounded-full">
                                {user.profile_image ? (
                                    <img alt="User" src={user.profile_image} />
                                ) : (
                                    <div className="w-full h-full bg-base-200 flex items-center justify-center text-primary font-black uppercase">
                                        {user.first_name?.[0] || <UserCircle size={24} />}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[1] mt-4 w-60 p-3 shadow-2xl border border-base-200">
                            <li className="menu-title px-4 py-2 opacity-50 font-black text-[10px] uppercase tracking-widest">User Menu</li>
                            <li>
                                <Link to="/dashboard" className="py-3 rounded-xl font-bold flex gap-3 hover:bg-primary/10 hover:text-primary transition-all">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="py-3 rounded-xl font-bold flex gap-3 hover:bg-primary/10 hover:text-primary transition-all">
                                    <User size={18} /> Profile Details
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="py-3 rounded-xl font-bold flex gap-3 hover:bg-primary/10 hover:text-primary transition-all">
                                    <Settings size={18} /> Account Settings
                                </Link>
                            </li>
                            <div className="divider my-1 opacity-50"></div>
                            <li>
                                <button onClick={handleLogout} className="py-3 rounded-xl font-bold flex gap-3 text-error hover:bg-error/10 transition-all">
                                    <LogOut size={18} /> Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>

        <AnimatePresence>
            {(successMSG || errorMSG) && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`w-full py-4 px-6 border-b z-40 overflow-hidden ${
                        successMSG ? "bg-success/10 border-success/20 text-success" : "bg-error/10 border-error/20 text-error"
                    }`}
                >
                    <div className="container mx-auto flex items-center justify-center gap-3">
                        {successMSG ? (
                            <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : (
                            <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center animate-bounce">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        <span className="text-sm font-black tracking-tight uppercase">
                            {successMSG || errorMSG}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default Header;
