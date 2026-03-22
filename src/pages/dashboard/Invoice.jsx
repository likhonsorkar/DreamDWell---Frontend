import { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const Invoice = () => {
    const { authTokens, setErrorMSG, setSuccessMSG } = useAuthContext();
    const { setHeading, setLoading, loading } = useOutletContext();
    const [invoices, setInvoices] = useState([]);
    const [payclick, setPayClick] = useState(false)

    useEffect(() => {
        const title = "Invoice Management"
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
            setInvoices(response.data.results);
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
                window.location.href = response.data.payment_url;
            }
        }catch(error){
            console.log(error);
            setErrorMSG("Payment Initiation Failed");
        } finally {
            setLoading(false)
            setPayClick(false)
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-0">
            {loading && <TableSkeleton rows={5} />}
            
            {!loading && (
                <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-200 border border-base-200 overflow-hidden transition-all duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 border-b border-base-200">
                                    <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">Transaction Info</th>
                                    <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">Amount</th>
                                    <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">Status</th>
                                    <th className="p-6 text-sm font-bold text-base-content/40 uppercase tracking-[0.2em] text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center">
                                            <div className="flex flex-col items-center opacity-20">
                                                <Clock size={48} className="mb-4" />
                                                <p className="font-black uppercase tracking-widest text-lg">No history recorded</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-base-200/30 transition-all group">
                                            <td className="p-6">
                                                <div className="font-black text-base-content text-lg tracking-tight group-hover:text-primary transition-colors">
                                                    {inv.transaction_id || `INV-${inv.id}`}
                                                </div>
                                                <div className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mt-1">
                                                    Type: {inv.invoice_type} • Method: {inv.payment_method}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-base-content text-xl tracking-tighter">
                                                        ৳{inv.amount}
                                                    </span>
                                                    <span className="text-[10px] text-base-content/30 font-bold uppercase tracking-widest">Digital Invoice</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    inv.status === 'paid' 
                                                    ? 'bg-success/10 text-success' 
                                                    : 'bg-warning/10 text-warning animate-pulse'
                                                }`}>
                                                    {inv.status === 'paid' ? 'Completed' : 'Pending Payment'}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handlePayNow(inv.id)}
                                                        disabled={inv.status === 'paid' || payclick}
                                                        className={`
                                                            flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
                                                            ${inv.status === 'paid' 
                                                                ? 'bg-base-200 text-base-content/30 cursor-not-allowed' 
                                                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:scale-105 shadow-lg shadow-primary/10 active:scale-95'
                                                            }
                                                        `}
                                                    >
                                                        {inv.status === 'paid' ? (
                                                            <><CheckCircle size={16} /> Paid</>
                                                        ) : (
                                                            <><CreditCard size={16} /> Pay Now</>
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

