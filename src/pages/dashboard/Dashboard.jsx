import React, { useEffect, useState } from 'react';
import { Users, FileText, Clock, BookmarkCheck, Wallet, ArrowRightLeft, ClipboardList } from 'lucide-react';
import { useOutletContext } from 'react-router';
import apiClient from '../../services/api-client';
import useAuthContext from '../../hooks/useAuthContext';

const Dashboard = () => {
    const { setHeading } = useOutletContext();
    const { user } = useAuthContext();
    const [stats, setStats] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const title = "Dashboard Overview";
        document.title = title;
        setHeading(title);
        fetchAllStats();
    }, []);

    const fetchAllStats = async () => {
        setLoading(true);
        try {
            // Admin Stats (If staff)
            let adminData = null;
            if (user?.is_staff) {
                const adminRes = await apiClient.get("/dashboard/statistics");
                adminData = adminRes.data;
            }

            // User Stats (Always fetch for current user)
            const userRes = await apiClient.get("/dashboard/user/statistics");
            
            setStats(adminData);
            setUserStats(userRes.data);
        } catch (error) {
            console.error("Stats fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-0">
            {loading ? (
                <div className="p-20 text-center">
                    <span className="loading loading-bars loading-xl text-orange-500"></span>
                    <p className="mt-4 text-base-content/60">Syncing Statistics...</p>
                </div>
            ) : (
                <div className="space-y-8">
                    
                    {/* --- Admin Section (Only shown if is_staff) --- */}
                    {user?.is_staff && (
                        <>
                            <h3 className="text-xl font-bold text-base-content/80 ml-2">Admin Global Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-base-content/60 font-medium text-sm mb-1">Total Platform Users</p>
                                            <h3 className="text-3xl font-black text-base-content">{stats?.total_user || 0}</h3>
                                        </div>
                                        <div className="bg-blue-500/10 p-4 rounded-2xl">
                                            <Users className="text-blue-600" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Global User Count</div>
                                </div>

                                <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-base-content/60 font-medium text-sm mb-1">System Pending Ads</p>
                                            <h3 className="text-3xl font-black text-base-content">{stats?.pending_approval_advertisements || 0}</h3>
                                        </div>
                                        <div className="bg-yellow-500/10 p-4 rounded-2xl">
                                            <Clock className="text-yellow-600" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Requires Approval</div>
                                </div>

                                <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-base-content/60 font-medium text-sm mb-1">Booked Ads (Platform)</p>
                                            <h3 className="text-3xl font-black text-base-content">{stats?.booked_advertisements || 0}</h3>
                                        </div>
                                        <div className="bg-teal-500/10 p-4 rounded-2xl">
                                            <BookmarkCheck className="text-teal-600" size={24} />
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Total Successful Rents</div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- Personal User Section --- */}
                    <h3 className="text-xl font-bold text-base-content/80 ml-2">My Personal Activity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                        
                        {/* Wallet Balance */}
                        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base-content/60 font-medium text-sm mb-1">Wallet Balance</p>
                                    <h3 className="text-3xl font-black text-orange-600">৳{userStats?.wallet_balance || "0.00"}</h3>
                                </div>
                                <div className="bg-orange-500/10 p-4 rounded-2xl">
                                    <Wallet className="text-orange-600" size={24} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Available for use</div>
                        </div>

                        {/* My Ads Count */}
                        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base-content/60 font-medium text-sm mb-1">My Advertisements</p>
                                    <h3 className="text-3xl font-black text-base-content">{userStats?.count_my_ads || 0}</h3>
                                </div>
                                <div className="bg-blue-500/10 p-4 rounded-2xl">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Total Ads by me</div>
                        </div>

                        {/* Pending Invoices */}
                        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base-content/60 font-medium text-sm mb-1">Pending Invoices</p>
                                    <h3 className="text-3xl font-black text-error">{userStats?.pending_invoice || 0}</h3>
                                </div>
                                <div className="bg-error/10 p-4 rounded-2xl">
                                    <Clock className="text-error" size={24} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Action Required</div>
                        </div>

                        {/* Rent Requests */}
                        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base-content/60 font-medium text-sm mb-1">Rent Requests</p>
                                    <h3 className="text-3xl font-black text-base-content">{userStats?.total_rent_request || 0}</h3>
                                </div>
                                <div className="bg-purple-500/10 p-4 rounded-2xl">
                                    <ClipboardList className="text-purple-600" size={24} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Incoming Requests</div>
                        </div>

                        {/* Transactions Count */}
                        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base-content/60 font-medium text-sm mb-1">Transaction History</p>
                                    <h3 className="text-3xl font-black text-base-content">{userStats?.total_transaction_count || 0}</h3>
                                </div>
                                <div className="bg-base-200 p-4 rounded-2xl">
                                    <ArrowRightLeft className="text-base-content/60" size={24} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Total Activities</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;