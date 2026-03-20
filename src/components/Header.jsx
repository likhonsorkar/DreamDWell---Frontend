import { Link, useNavigate} from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { LogOut, User, Settings, UserCircle, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

const Header = () => {
    const {user, logoutUser, successMSG, errorMSG} = useAuthContext();
    const { theme, toggleTheme } = useTheme();
    const urlNavigator = useNavigate();
    const navLinks = (
        <>
            <li><Link to="/property" className="hover:text-orange-500 font-medium">Find a Home</Link></li>
            <li><Link to={`/login?next=/dashboard/addproperty`} className="hover:text-orange-500 font-medium">List Property</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-orange-500 font-medium">How it works</Link></li>
        </>
    );
    const authnavLinks = (
        <>
            <li><Link to="/property" className="hover:text-orange-500 font-medium">Find a Home</Link></li>
            <li><a href="/dashboard" className="hover:text-orange-500 font-medium">Dashboard</a></li>
            <li><Link to="/dashboard/addproperty" className="hover:text-orange-500 font-medium">List Property</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-orange-500 font-medium">How it works</Link></li>
        </>
    );
    const handleLogout = () => {
        logoutUser();
        urlNavigator("/login");
    };
    return (
        <>
        <header className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-2 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200">
                        {!user ? navLinks : authnavLinks}
                    </ul>
                </div>
                <div className="flex items-center gap-2 cursor-pointer ml-2 lg:ml-0">
                    <div className="bg-primary p-1.5 md:p-2 rounded-lg shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>
                    <Link to="/" className="text-lg md:text-xl font-black tracking-tight text-base-content">
                        Dream<span className="text-primary">Dwell</span>
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 text-base-content/70">
                    {!user ? navLinks : authnavLinks}
                </ul>
            </div>
            <div className="navbar-end gap-1 md:gap-3">
                <button 
                    onClick={toggleTheme} 
                    className="btn btn-ghost btn-circle"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {!user ? (
                <div className="flex items-center gap-2">
                    <Link to="/login" className="btn btn-ghost btn-sm md:btn-md text-base-content/70 font-semibold px-2 md:px-4">Log In</Link>
                    <Link to="/signup" className="btn btn-sm md:btn-md btn-primary text-white px-3 md:px-6 shadow-lg shadow-primary/20 rounded-full md:rounded-xl">
                    Sign Up
                    </Link>
                </div>
                    ) : (
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user.profile_image ? (
                                <img
                                    alt="User Profile"
                                    src={user.profile_image}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center text-base-content/50">
                                    <UserCircle size={24} />
                                </div>
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-base-200">
                        <li>
                            <Link to="/dashboard">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/profile">
                                <User size={16} /> Profile
                            </Link>
                        </li>
                        <li><a><Settings size={16} /> Settings</a></li>
                        <li><button onClick={handleLogout}><LogOut size={16} /> Logout</button></li>
                    </ul>
                </div> )
                }
            </div>
        </header>
        {(successMSG || errorMSG) && (
                <div className={`w-full py-3 px-4 animate-in slide-in-from-top duration-300 border-b ${
                    successMSG ? "bg-success/10 border-success/20" : "bg-error/10 border-error/20"
                }`}>
                    <div className="container mx-auto flex items-center justify-center gap-2">
                        {successMSG ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        <span className={`text-sm font-bold ${successMSG ? "text-success" : "text-error"}`}>
                            {successMSG || errorMSG}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;