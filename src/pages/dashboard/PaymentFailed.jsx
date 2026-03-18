import { XCircle, RefreshCcw, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

const PaymentFailed = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-red-100 p-12 max-w-lg w-full text-center border border-red-50">
                <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={56} />
                </div>
                <h2 className="text-4xl font-black text-gray-800 mb-2">Payment Failed</h2>
                <p className="text-gray-500 font-medium">We couldn't process your payment. This might be due to insufficient funds or a network issue.</p>

                <div className="mt-8 p-4 bg-red-50 rounded-2xl flex items-start gap-3 text-left">
                    <AlertCircle className="text-red-500 shrink-0" size={20} />
                    {/* <p className="text-xs text-red-700 font-medium leading-relaxed">
                        Ref ID: {tranId} <br/>
                        Please check your account details or contact your bank if the issue persists.
                    </p> */}
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <Link to="/dashboard/invoice" className="bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                        <RefreshCcw size={18} /> Try Again
                    </Link>
                    <Link to="/support" className="text-gray-400 font-bold text-sm hover:text-gray-600">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;