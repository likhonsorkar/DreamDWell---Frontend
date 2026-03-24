import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Link, Outlet } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { Menu, Plus, X, Bell, Search } from 'lucide-react';
import { HeaderSkeleton, StatsSkeleton } from '../components/dashboard/DashboardSkeletons';

const DashboardLayout = () => {
    const {user, errorMSG, successMSG } = useAuthContext();
    const [heading, setHeading] = useState("Overview");
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-base-200/30 flex flex-col lg:flex-row transition-colors duration-300 font-sans">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} loading={loading} />
            
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header/Navbar */}
                <header className="sticky top-0 z-30 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 md:px-8 py-4">
                    {loading ? (
                        <HeaderSkeleton />
                    ) : (
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="lg:hidden p-2 rounded-xl bg-base-200 text-base-content hover:bg-base-300 transition-colors"
                                >
                                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-black text-base-content tracking-tight">
                                        Dream<span className="text-primary">Dwell</span>
                                        <span className="mx-2 text-base-content/20 font-light">/</span>
                                        <span className="text-primary/80 font-bold">{heading}</span>
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="hidden md:flex items-center relative">
                                    <Search className="absolute left-3 text-base-content/40" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="pl-10 pr-4 py-2 bg-base-200 border-none rounded-xl focus:ring-2 ring-primary/20 w-48 md:w-64 transition-all"
                                    />
                                </div>
                                <button className="p-2 rounded-xl bg-base-200 text-base-content hover:bg-base-300 transition-colors relative">
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-base-100"></span>
                                </button>
                                <Link to="/dashboard/addproperty" className="btn btn-primary rounded-xl px-4 md:px-6 shadow-lg shadow-primary/20 font-bold transition-all transform hover:scale-105 flex items-center gap-2 border-none">
                                    <Plus size={18} />
                                    <span className="hidden md:inline">Add Property</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </header>

                <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        {loading ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="skeleton h-10 w-64 rounded-xl"></div>
                                <div className="skeleton h-4 w-96 rounded-lg opacity-60"></div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                    Welcome back, {user?.first_name || "Guest"}! 👋
                                </h2>
                                <p className="text-base-content/60 mt-1 font-medium">
                                    Manage your real estate empire with DreamDwell.
                                </p>
                            </>
                        )}
                    </div>

                    {(successMSG || errorMSG) && (
                        <div className={`mb-8 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300 border shadow-sm ${
                            successMSG ? "bg-success/10 border-success/20 text-success" : "bg-error/10 border-error/20 text-error"
                        }`}>
                            <div className="flex items-center gap-3">
                                {successMSG ? (
                                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="font-bold">{successMSG || errorMSG}</span>
                            </div>
                        </div>
                    )}

                    <div className="animate-in fade-in duration-500">
                        <Outlet context={{ setHeading, loading, setLoading }}/>
                    </div>
                </div>
            </main>  
        </div>
    );
};

export default DashboardLayout;
