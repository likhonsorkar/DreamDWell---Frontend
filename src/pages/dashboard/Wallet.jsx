import { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft , AlertCircle, Banknote, X } from 'lucide-react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { useOutletContext } from 'react-router';
const WalletDashboard = () => {
    const { authTokens } = useAuthContext();
    const [wallet, setWallet] = useState(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const { setHeading, setLoading, loading } = useOutletContext();
    useEffect(() => {
        const title = "My Wallet"
        document.title = title;
        setHeading(title);
        fetchWalletData();
    }, []);
    const fetchWalletData = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/wallet/", {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            setWallet(response.data[0]);
        } catch (error) {
            console.error("Wallet fetch error", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) return (
        <div className="p-20 text-center">
            <span className="loading loading-bars loading-xl text-orange-500"></span>
            <p className="mt-4 text-gray-400 font-medium">Syncing Wallet...</p>
        </div>
    );
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Available Balance</p>
                                <h2 className="text-6xl font-black tracking-tighter">
                                    ৳{wallet?.balance || "0.00"}
                                </h2>
                            </div>
                            <div className="bg-orange-500 p-4 rounded-3xl shadow-lg shadow-orange-500/30">
                                <Wallet size={32} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-12 flex items-center gap-6">
                            <button 
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl"
                            >
                                Withdraw Funds
                            </button>
                            <div className="text-gray-500 text-xs font-medium">
                                Last updated: <br/> {new Date(wallet?.updated_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
                </div>
                {/* Status/Security Card */}
                <div className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle size={32} />
                    </div>
                    <h4 className="font-bold text-gray-800">Secure Wallet</h4>
                    <p className="text-gray-400 text-sm mt-2">All transactions are encrypted and secured by SSLCommerz technology.</p>
                </div>
            </div>
            {/* Transactions Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-800 px-4">Recent Transactions</h3>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <tr>
                                <th className="p-6">Details</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {!wallet?.recent_transactions?.length ? (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-gray-400 font-medium">
                                        No transactions recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                wallet.recent_transactions.map((tx, idx) => (
                                    <tr key={idx} className="group hover:bg-gray-50/50 transition-all">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 capitalize">{tx.type}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">SUCCESSFUL TRANSACTION</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-full uppercase">Complete</span>
                                        </td>
                                        <td className={`p-6 text-right font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                            {tx.type === 'credit' ? '+' : '-'}৳{tx.amount}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] max-w-md w-full p-8 relative shadow-2xl animate-in zoom-in duration-300">
                        <button 
                            onClick={() => setShowWithdrawModal(false)}
                            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="text-center">
                            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Banknote size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-2">Withdraw Unavailable</h3>
                            <p className="text-gray-500 leading-relaxed">
                                We are currently updating our payment nodes to ensure faster payouts. 
                                <span className="block mt-2 font-bold text-orange-600 italic">Withdrawals will resume within 48 hours.</span>
                            </p>
                            <button 
                                onClick={() => setShowWithdrawModal(false)}
                                className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
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