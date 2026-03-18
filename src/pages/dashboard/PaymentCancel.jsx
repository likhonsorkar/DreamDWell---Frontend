import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-100 p-12 max-w-lg w-full text-center border border-gray-100">
                <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={56} />
                </div>
                <h2 className="text-4xl font-black text-gray-800 mb-2">Payment Canceled</h2>
                <p className="text-gray-500 font-medium">The payment process was canceled by the user. No funds were deducted from your account.</p>

                <div className="mt-12 flex flex-col gap-4">
                    <Link to="/dashboard/invoice" className="bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl">
                        Back to Billing
                    </Link>
                    <Link to="/" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors">
                        <Home size={16} /> Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;