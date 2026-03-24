import React, { useEffect } from 'react';
import { Users, FileText, Clock, BookmarkCheck, Wallet, ArrowRightLeft, ClipboardList, TrendingUp, Home as HomeIcon, Star } from 'lucide-react';
import { useOutletContext, Link } from 'react-router';
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
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="skeleton h-8 w-48 rounded-lg"></div>
                <StatsSkeleton />
                <div className="skeleton h-8 w-48 rounded-lg mt-12"></div>
                <StatsSkeleton />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-base-100 rounded-[3rem] border border-dashed border-base-300">
                <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center mb-4">
                    <X size={32} />
                </div>
                <h3 className="text-xl font-bold text-base-content uppercase tracking-tight">Oops! Something went wrong</h3>
                <p className="text-base-content/50 mt-2 max-w-xs">Failed to load your dashboard statistics. Please try refreshing the page.</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary btn-sm rounded-xl px-8 mt-6">Reload Dashboard</button>
            </div>
        );
    }

    const { stats, userStats } = data || {};

    const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl hover:shadow-base-200 transition-all duration-300 group">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-base-content/40 font-bold text-xs uppercase tracking-[0.15em]">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-black text-base-content tracking-tighter">{value}</h3>
                        {trend && <span className="text-success text-xs font-bold flex items-center gap-0.5"><TrendingUp size={12} /> {trend}</span>}
                    </div>
                </div>
                <div className={`${color} p-4 rounded-[1.5rem] shadow-inner transform group-hover:rotate-12 transition-transform duration-500`}>
                    <Icon className="text-white" size={28} />
                </div>
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
                <div className="text-[10px] font-black uppercase text-base-content/30 tracking-[0.2em] whitespace-nowrap">{subtitle}</div>
                <div className="h-1.5 flex-1 bg-base-200 rounded-full overflow-hidden">
                    <div className={`h-full ${color.replace('bg-', 'bg-opacity-100 bg-')} w-2/3 rounded-full opacity-20`}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="space-y-12 pb-20">
                {/* --- Admin Section --- */}
                {user?.is_staff && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-primary rounded-full"></div>
                            <h3 className="text-2xl font-black text-base-content tracking-tight">System Global Performance</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard 
                                title="Total Users" 
                                value={stats?.total_user || 0} 
                                icon={Users} 
                                color="bg-indigo-500" 
                                subtitle="Total Platform Members"
                                trend="+12%"
                            />
                            <StatCard 
                                title="Pending Approvals" 
                                value={stats?.pending_approval_advertisements || 0} 
                                icon={Clock} 
                                color="bg-amber-500" 
                                subtitle="Requires Admin Action"
                            />
                            <StatCard 
                                title="Successful Bookings" 
                                value={stats?.booked_advertisements || 0} 
                                icon={BookmarkCheck} 
                                color="bg-emerald-500" 
                                subtitle="Total Completed Rentals"
                                trend="+5%"
                            />
                        </div>
                    </div>
                )}

                {/* --- Personal User Section --- */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-secondary rounded-full"></div>
                        <h3 className="text-2xl font-black text-base-content tracking-tight">My Property Insights</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Featured Wallet Card */}
                        <div className="lg:col-span-2 bg-primary rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20 group">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                                <div className="space-y-4 text-center md:text-left">
                                    <p className="text-primary-content/60 font-black uppercase tracking-[0.2em] text-xs">Total Balance</p>
                                    <h2 className="text-6xl font-black tracking-tighter italic">৳{userStats?.wallet_balance || "0.00"}</h2>
                                </div>
                                <div className="bg-white/10 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/20 transform group-hover:scale-110 transition-transform duration-700">
                                    <Wallet size={64} className="text-white opacity-90" />
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary-focus/40 rounded-full blur-3xl"></div>
                        </div>

                        {/* Secondary Stats */}
                        <div className="grid grid-rows-2 gap-6">
                            <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                        <HomeIcon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-base-content/40 font-bold text-[10px] uppercase tracking-widest">My Listings</p>
                                        <h4 className="text-2xl font-black text-base-content">{userStats?.count_my_ads || 0}</h4>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-base-200 flex items-center justify-center text-base-content/20 group-hover:text-primary transition-all">
                                    <Star size={18} />
                                </div>
                            </div>
                            <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 flex items-center justify-between group cursor-pointer hover:border-error/50 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="bg-error/10 p-4 rounded-2xl text-error group-hover:bg-error group-hover:text-white transition-all">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="text-base-content/40 font-bold text-[10px] uppercase tracking-widest">Pending Invoices</p>
                                        <h4 className="text-2xl font-black text-base-content">{userStats?.pending_invoice || 0}</h4>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-error/10 text-error rounded-lg text-[10px] font-black uppercase tracking-widest">Action</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <StatCard 
                            title="Rental Requests" 
                            value={userStats?.total_rent_request || 0} 
                            icon={ClipboardList} 
                            color="bg-purple-500" 
                            subtitle="Total incoming rental inquiries"
                            trend="+3 new"
                        />
                        <StatCard 
                            title="Recent Activity" 
                            value={userStats?.total_transaction_count || 0} 
                            icon={ArrowRightLeft} 
                            color="bg-slate-600" 
                            subtitle="Wallet transactions & activities"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
