import React, { useEffect } from 'react';
import { Users, FileText, Clock, BookmarkCheck, Wallet, ArrowRightLeft, ClipboardList } from 'lucide-react';
import { useOutletContext } from 'react-router';
import apiClient from '../../services/api-client';
import useAuthContext from '../../hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { StatsSkeleton } from '../../components/dashboard/DashboardSkeletons';

const Dashboard = () => {
    const { setHeading } = useOutletContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const title = "Dashboard Overview";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data, isLoading, status } = useQuery({
        queryKey: ['dashboard-stats', user?.id],
        queryFn: async () => {
            let adminData = null;
            if (user?.is_staff) {
                const adminRes = await apiClient.get("/dashboard/statistics");
                adminData = adminRes.data;
            }
            const userRes = await apiClient.get("/dashboard/user/statistics");
            return {
                stats: adminData,
                userStats: userRes.data
            };
        },
        enabled: !!user
    });

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-0 space-y-8">
                <div className="skeleton h-8 w-48 ml-2"></div>
                <StatsSkeleton />
                <div className="skeleton h-8 w-48 ml-2 mt-8"></div>
                <StatsSkeleton />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="p-20 text-center text-error font-bold">
                Failed to load dashboard statistics.
            </div>
        );
    }

    const { stats, userStats } = data || {};

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-0">
            <div className="space-y-8">
                {/* --- Admin Section --- */}
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
                    <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm transition-all group">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-base-content/60 font-medium text-sm mb-1">Wallet Balance</p>
                                <h3 className="text-3xl font-black text-primary">৳{userStats?.wallet_balance || "0.00"}</h3>
                            </div>
                            <div className="bg-primary/10 p-4 rounded-2xl">
                                <Wallet className="text-primary" size={24} />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-base-200 uppercase text-[10px] text-base-content/40 font-bold tracking-widest text-center">Available for use</div>
                    </div>
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
        </div>
    );
};

export default Dashboard;
