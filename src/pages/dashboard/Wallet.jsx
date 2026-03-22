import { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft , AlertCircle, Banknote, X } from 'lucide-react';
import apiClient from '../../services/api-client';
import { useOutletContext } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { WalletSkeleton } from '../../components/dashboard/DashboardSkeletons';

const WalletDashboard = () => {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const { setHeading } = useOutletContext();

    useEffect(() => {
        const title = "My Wallet";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: wallet, isLoading, status } = useQuery({
        queryKey: ['wallet'],
        queryFn: async () => {
            const response = await apiClient.get("/wallet/");
            console.log(response);
            return response.data.results;
        }
    });

    if (isLoading) return <WalletSkeleton />;

    if (status === "error") return (
        <div className="p-20 text-center text-error font-bold">
            Failed to load wallet data.
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-black rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-2">Available Balance</p>
                                <h2 className="text-6xl font-black tracking-tighter">
                                    ৳{wallet?.balance || "0.00"}
                                </h2>
                            </div>
                            <div className="bg-primary p-4 rounded-3xl shadow-xl shadow-primary/30 ring-1 ring-white/10">
                                <Wallet size={32} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-12 flex items-center gap-6">
                            <button 
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl"
                            >
                                Withdraw Funds
                            </button>
                            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                                Last updated: <br/> {new Date(wallet?.updated_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
                </div>
                <div className="bg-base-100 rounded-[3rem] border border-base-200 p-8 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/20">
                        <AlertCircle size={32} />
                    </div>
                    <h4 className="font-black text-base-content uppercase tracking-tighter text-lg">Secure Wallet</h4>
                    <p className="text-base-content/50 text-sm mt-2 font-medium">All transactions are encrypted and secured by SSLCommerz technology.</p>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-base-content px-4 tracking-tight">Recent <span className="text-primary">Transactions</span></h3>
                <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-base-200/50 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">
                                <tr>
                                    <th className="p-6">Details</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {!wallet?.recent_transactions?.length ? (
                                    <tr>
                                        <td colSpan="3" className="p-20 text-center">
                                            <div className="flex flex-col items-center opacity-20">
                                                <Banknote size={48} className="mb-4" />
                                                <p className="font-black uppercase tracking-widest text-sm">No history recorded</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    wallet.recent_transactions.map((tx, idx) => (
                                        <tr key={idx} className="group hover:bg-base-200/30 transition-all">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'} ring-1 ring-current/10`}>
                                                        {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-base-content uppercase text-sm tracking-tight">{tx.type}</div>
                                                        <div className="text-[10px] text-base-content/30 font-black uppercase tracking-widest">Successful Transfer</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="px-3 py-1 bg-base-200 text-base-content/40 text-[10px] font-black rounded-full uppercase tracking-widest">Complete</span>
                                            </td>
                                            <td className={`p-6 text-right font-black text-xl ${tx.type === 'credit' ? 'text-success' : 'text-error'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}৳{tx.amount}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showWithdrawModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-base-100 rounded-[3rem] max-w-md w-full p-10 relative shadow-2xl animate-in zoom-in duration-300 border border-white/10">
                        <button 
                            onClick={() => setShowWithdrawModal(false)}
                            className="absolute top-8 right-8 p-2 hover:bg-base-200 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="text-center">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8 ring-1 ring-primary/20 animate-pulse">
                                <Banknote size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-base-content mb-4 tracking-tighter">Node Update</h3>
                            <p className="text-base-content/60 leading-relaxed font-medium">
                                We are currently updating our payment nodes to ensure faster, one-click payouts. 
                                <span className="block mt-4 font-black text-primary uppercase tracking-widest text-xs">Available within 48 hours</span>
                            </p>
                            <button 
                                onClick={() => setShowWithdrawModal(false)}
                                className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-focus transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default WalletDashboard;
