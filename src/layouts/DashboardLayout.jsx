import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Link, Outlet } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { Menu, Plus, X } from 'lucide-react';
const DashboardLayout = () => {
    const {user, errorMSG, successMSG } = useAuthContext();
    const [heading, setHeading] = useState("Dashboard");
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <main className="flex-1 p-4 md:p-8 lg:p-12 bg-base-100/50 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-xl bg-base-100 border border-base-200 shadow-sm text-base-content"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
                            Dashboard 
                            <span className="text-orange-500 bg-orange-500/10 px-4 py-1 rounded-2xl text-2xl md:text-3xl">
                                {heading}
                            </span>
                        </h1>
                        <p className="text-base-content/70 font-medium mt-1">
                            Welcome back, <span className="text-base-content font-bold">{user?.first_name || "User"}</span>! 
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/addproperty" className="btn bg-orange-500 hover:bg-orange-600 border-none text-white rounded-2xl px-8 shadow-xl shadow-orange-500/20 font-bold transition-all transform hover:scale-105 inline-flex items-center gap-2">
                            <Plus size={20} /> Add Property
                        </Link>
                    </div>
                </div>
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
            <Outlet context={{ setHeading, loading, setLoading }}/>
            </main>  
        </div>
    );
};
export default DashboardLayout;