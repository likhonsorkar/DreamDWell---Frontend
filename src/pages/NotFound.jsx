import { useEffect } from 'react';
import { Link } from 'react-router';
const NotFound = () => {
    useEffect(()=>{
        const title = "House For Rent - Page Not Found";
        document.title = title;
    }, [])
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-orange-50/20 relative overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-200 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-[120px] opacity-20"></div>
            <div className="max-w-2xl w-full text-center z-10">
                <div className="relative inline-block mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-black text-gray-200 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-orange-500 p-6 rounded-3xl shadow-2xl shadow-orange-200 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-12 h-12 md:w-16 md:h-16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 px-4">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        to="/" 
                        className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-8 h-14 rounded-2xl shadow-xl shadow-orange-100 text-lg font-bold group w-full md:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn btn-ghost text-gray-400 hover:text-orange-600 hover:bg-orange-50 px-8 h-14 rounded-2xl text-lg font-bold w-full md:w-auto"
                    >
                        Try Again
                    </button>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <Link to="/find" className="hover:text-orange-500 transition-colors">Find Homes</Link>
                    <Link to="/how" className="hover:text-orange-500 transition-colors">How it works</Link>
                    <Link to="/support" className="hover:text-orange-500 transition-colors">Support</Link>
                </div>
            </div>
        </main>
    );
};
export default NotFound;