import { Link, useParams } from 'react-router';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';

const PaymentSuccess = () => {
    const {tranId} = useParams()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-green-100 p-12 max-w-lg w-full text-center border border-green-50 animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={56} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-gray-800 mb-2">Payment Success!</h2>
                <p className="text-gray-500 font-medium">Your transaction has been completed successfully.</p>
                
                <div className="bg-gray-50 rounded-2xl p-6 my-8 border border-dashed border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">Transaction ID</span>
                        <span className="text-gray-800 font-black tracking-tight">{tranId || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">Status</span>
                        <span className="text-green-600 font-black tracking-tight uppercase">Confirmed</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/dashboard/invoice" className="bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                        View Invoices <ArrowRight size={18} />
                    </Link>
                    <button className="text-gray-400 font-bold text-sm hover:text-gray-600 flex items-center justify-center gap-2 py-2">
                        <Download size={16} /> Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;