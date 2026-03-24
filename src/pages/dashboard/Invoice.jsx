import { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock, CreditCard, Receipt, FileText, TrendingUp, AlertCircle, Download, ExternalLink, Calendar } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { TableSkeleton, StatsSkeleton } from '../../components/dashboard/DashboardSkeletons';

const Invoice = () => {
    const { authTokens, setErrorMSG, setSuccessMSG } = useAuthContext();
    const { setHeading } = useOutletContext();
    const [payclick, setPayClick] = useState(false);

    useEffect(() => {
        const title = "Financial Records";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: invoices = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['invoices'],
        queryFn: async () => {
            const response = await apiClient.get("/invoices/");
            return response.data.results;
        }
    });

    const paymentMutation = useMutation({
        mutationFn: async (invoiceId) => {
            const response = await apiClient.post('/payment/initiate', { "invoice_id": invoiceId });
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.payment_url) {
                window.location.href = data.payment_url;
            }
        },
        onError: (err) => {
            setErrorMSG(err.response?.data?.message || "Payment Initiation Failed. Please try again.");
            setPayClick(false);
        }
    });

    const handlePayNow = (invoiceId) => {
        setPayClick(true);
        paymentMutation.mutate(invoiceId);
    };

    // Derived statistics
    const totalPaid = invoices.filter(inv => inv.status === 'paid').length;
    const totalPending = invoices.filter(inv => inv.status !== 'paid').length;
    const totalAmount = invoices.reduce((acc, inv) => acc + parseFloat(inv.amount), 0);

    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-base-content/40 font-bold text-[10px] uppercase tracking-widest">{title}</p>
                <h3 className="text-2xl font-black text-base-content">{value}</h3>
                <p className="text-[10px] font-bold text-base-content/30 uppercase mt-0.5">{subtitle}</p>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="skeleton h-28 w-full rounded-[2.5rem]"></div>
                    ))}
                </div>
                <TableSkeleton rows={5} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-base-100 rounded-[3rem] border border-dashed border-base-300">
                <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-base-content uppercase tracking-tight">Failed to load invoices</h3>
                <p className="text-base-content/50 mt-2 max-w-xs">{error?.message || "Something went wrong while fetching your records."}</p>
                <button onClick={() => refetch()} className="btn btn-primary btn-sm rounded-xl px-8 mt-6">Try Again</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="space-y-8 pb-20">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Records" 
                        value={invoices.length} 
                        icon={Receipt} 
                        color="bg-slate-700" 
                        subtitle="Billing Statements"
                    />
                    <StatCard 
                        title="Paid Invoices" 
                        value={totalPaid} 
                        icon={CheckCircle} 
                        color="bg-emerald-500" 
                        subtitle="Completed Payments"
                    />
                    <StatCard 
                        title="Pending Bills" 
                        value={totalPending} 
                        icon={Clock} 
                        color="bg-amber-500" 
                        subtitle="Awaiting Attention"
                    />
                </div>

                {/* Invoice Table Container */}
                <div className="bg-base-100 rounded-[3rem] shadow-xl shadow-base-200/50 border border-base-200 overflow-hidden">
                    <div className="p-8 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100/50">
                        <div>
                            <h3 className="text-xl font-black text-base-content tracking-tight">Billing & Transactions</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1">Transaction History</p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-base-content/30 bg-base-200 px-4 py-2 rounded-xl border border-base-200">
                            Total Volume: <span className="text-primary ml-1">৳{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/30 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em] border-b border-base-200">
                                    <th className="p-6">Transaction Details</th>
                                    <th className="p-6">Amount & Type</th>
                                    <th className="p-6">Payment Status</th>
                                    <th className="p-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200/60">
                                {invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-32 text-center">
                                            <div className="flex flex-col items-center max-w-xs mx-auto">
                                                <div className="w-20 h-20 bg-base-200 rounded-[2rem] flex items-center justify-center text-base-content/20 mb-6">
                                                    <FileText size={40} />
                                                </div>
                                                <h4 className="text-xl font-black text-base-content tracking-tight">No invoices yet</h4>
                                                <p className="text-sm text-base-content/40 font-medium mt-2 leading-relaxed">Your billing history will appear here once you make rentals or transactions.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-base-200/20 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                                                        inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                                                    }`}>
                                                        <Receipt size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-base-content text-lg tracking-tight group-hover:text-primary transition-colors uppercase">
                                                            {inv.transaction_id || `ID-00${inv.id}`}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] text-base-content/30 font-bold uppercase tracking-widest mt-0.5">
                                                            <Calendar size={12} /> {new Date(inv.created_at || Date.now()).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-black text-base-content text-xl tracking-tighter">
                                                    ৳{inv.amount}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] bg-base-200 text-base-content/50 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                                                        {inv.invoice_type}
                                                    </span>
                                                    <span className="text-[10px] text-base-content/20 font-bold uppercase">•</span>
                                                    <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest">
                                                        {inv.payment_method || 'Digital'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {inv.status === 'paid' ? (
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit">
                                                        <CheckCircle size={14} className="animate-in zoom-in" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Settled</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 px-4 py-1.5 rounded-full w-fit">
                                                        <Clock size={14} className="animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Pay</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center items-center gap-2">
                                                    {inv.status === 'paid' ? (
                                                        <button className="p-3 bg-base-200 text-base-content/30 rounded-2xl cursor-default transition-all" title="Invoice Settled">
                                                            <ExternalLink size={18} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handlePayNow(inv.id)}
                                                            disabled={paymentMutation.isPending || payclick}
                                                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-primary-focus hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-50"
                                                        >
                                                            {paymentMutation.isPending ? (
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                            ) : (
                                                                <CreditCard size={14} />
                                                            )}
                                                            Secure Pay
                                                        </button>
                                                    )}
                                                    <button className="p-3 bg-base-200 text-base-content/40 rounded-2xl hover:bg-base-300 transition-all" title="Download PDF">
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer Info */}
                    <div className="p-6 bg-base-200/20 border-t border-base-200 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <AlertCircle size={18} />
                        </div>
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.1em]">
                            Security Tip: DreamDwell never asks for your PIN. Always check the URL before entering payment details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
