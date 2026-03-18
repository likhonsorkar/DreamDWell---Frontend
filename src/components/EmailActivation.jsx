import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
const EmailActivation = () => {
    const {uid, token} =  useParams();
    const [status, setStatus] = useState("wait");
    const {emailActivation} = useAuthContext();
    useEffect(()=>{
      const activateAccount = async () => {
        try {
            const apihit = await emailActivation({ uid, token });

            if (apihit) {
                setStatus("success");
            } else {
                setStatus("wrong");
            }
        } catch (error) {
            setStatus("wrong");
        }
    };
    activateAccount();
    }, []);
    return (
        <main className="min-h-[90vh] flex items-center justify-center p-6 bg-orange-50/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-12 text-center">
            <div className="flex justify-center mb-8">
                <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
            </div>
            {status == "wait" && (<span className="loading loading-bars loading-xl text-orange-500"></span>)}
            {status == "success" && (
                <div>
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">Success!</h2>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                    Your account has been successfully activated. You can now access all features.
                </p>
                <Link to="/login" className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 shadow-xl shadow-orange-100 text-lg rounded-2xl font-bold">
                    Go to Login
                </Link>
            </div>)}
            {status == "wrong" && (
                <div className="mt-12 pt-12 border-t border-gray-100"> 
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                    <svg xmlns="http://www.w3.org/2000/xlink" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">Invalid Link</h2>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                    The activation code or URL is wrong. It may have expired or already been used.
                </p>
                <div className="space-y-3">
                    <Link to="/" className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-500 hover:border-orange-500 w-full h-14 rounded-2xl text-lg font-bold">
                        Back to Home
                    </Link>
                </div>
            </div>)}
        </div>
    </main>
    );
};

export default EmailActivation;