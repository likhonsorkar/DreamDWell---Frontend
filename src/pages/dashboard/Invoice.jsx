import { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useOutletContext } from 'react-router';
const Invoice = () => {
    const { authTokens, setErrorMSG, setSuccessMSG } = useAuthContext();
    const { setHeading, setLoading, loading } = useOutletContext();
    const [invoices, setInvoices] = useState([]);
    const [payclick, setPayClick] = useState(false)
    useEffect(() => {
        const title = "Invoice"
        document.title = title;
        setHeading(title);
        fetchInvoices();
    }, []);
    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/invoices/", {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            setInvoices(response.data);
            setSuccessMSG("Invoices Fetched Successfully");
        } catch (error) {
            setErrorMSG(error.message || "Failed to fetch invoices");
        } finally {
            setLoading(false);
        }
    };
    const handlePayNow = async(invoiceId) => {
        setLoading(true)
        setPayClick(true)
        try{
           const response = await apiClient.post('/payment/initiate', { "invoice_id": invoiceId}, {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            if (response){
                try{
                    setLoading(false)
                    window.location.href = response.data.payment_url;
                }catch(error){
                    console.log(error);
                    alert("Payment Faild");
                }
            }
        }catch(error){
            console.log(error);
        }
    };
    return (
        <div>
            {loading && (
                <div className="p-20 text-center">
                    <div className='text-center m-2'>
                        <span className="loading loading-bars loading-xl text-orange-500"></span>
                    </div>
                    <p className="mt-4 text-gray-500 font-medium">Loading invoices...</p>
                </div>
            )}
            {!loading && (
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden mt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Transaction Info</th>
                                    <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <Clock size={48} className="text-gray-200 mb-4" />
                                                <p className="text-gray-400 font-bold text-lg">No invoices found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-gray-50/20 transition-all group">
                                            <td className="p-6">
                                                <div className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">
                                                    {inv.transaction_id}
                                                </div>
                                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                                                    Type: {inv.invoice_type} | Method: {inv.payment_method}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-gray-700 text-xl">
                                                        ৳{inv.amount}
                                                    </span>
                                                    <span className="text-xs text-gray-400">ID: #{inv.id}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                                                    inv.status === 'paid' 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {inv.status === 'paid' ? 'Paid' : 'Unpaid / Pending'}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handlePayNow(inv.id)}
                                                        disabled={inv.status === 'paid' || payclick}
                                                        className={`
                                                            flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all duration-200
                                                            ${inv.status === 'paid' 
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                                : 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white hover:scale-105 shadow-sm active:scale-95'
                                                            }
                                                        `}
                                                    >
                                                        {inv.status === 'paid' ? (
                                                            <><CheckCircle size={18} /> Complete</>
                                                        ) : (
                                                            <><CreditCard size={18} /> Pay Now</>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Invoice;