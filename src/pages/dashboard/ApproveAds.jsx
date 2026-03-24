import { useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Tag, AlertCircle, TrendingUp, Users, ExternalLink, ShieldCheck } from 'lucide-react';
import { useOutletContext, Link } from 'react-router';
import apiClient from '../../services/api-client';
import useAuthContext from '../../hooks/useAuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const ApproveAds = () => {
    const { setHeading } = useOutletContext();
    const { setSuccessMSG, setErrorMSG } = useAuthContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        const title = "Ad Moderation";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: ads = [], status, isLoading, refetch } = useQuery({
        queryKey: ['pending-ads'],
        queryFn: async () => {
            const response = await apiClient.get("/dashboard/ads/");
            return response.data.results;
        }
    });

    const approveMutation = useMutation({
        mutationFn: async (id) => {
            await apiClient.post(`dashboard/ads/${id}/approve/`, {});
        },
        onSuccess: () => {
            setSuccessMSG(`Advertisement Approved Successfully!`);
            queryClient.invalidateQueries(['pending-ads']);
        },
        onError: () => {
            setErrorMSG(`Failed to Approve ad. Try again.`);
        }
    });

    const handleAction = (id) => {
        approveMutation.mutate(id);
    };

    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-base-content/40 font-bold text-[10px] uppercase tracking-widest">{title}</p>
                <h3 className="text-2xl font-black text-base-content tracking-tight">{value}</h3>
                <p className="text-[10px] font-bold text-base-content/30 uppercase mt-0.5">{subtitle}</p>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="skeleton h-28 w-full rounded-[2.5rem]"></div>
                    <div className="skeleton h-28 w-full rounded-[2.5rem]"></div>
                </div>
                <TableSkeleton rows={5} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="space-y-8 pb-20">
                {/* Admin Moderation Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard 
                        title="Pending Queue" 
                        value={ads.length} 
                        icon={Clock} 
                        color="bg-amber-500" 
                        subtitle="Awaiting Verification"
                    />
                    <StatCard 
                        title="Safety Checks" 
                        value="Active" 
                        icon={ShieldCheck} 
                        color="bg-indigo-500" 
                        subtitle="System Moderation Status"
                    />
                </div>

                <div className="bg-base-100 rounded-[3rem] shadow-xl shadow-base-200/50 border border-base-200 overflow-hidden">
                    <div className="p-8 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100/50">
                        <div>
                            <h3 className="text-xl font-black text-base-content tracking-tight uppercase tracking-tighter">Content Moderation</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                <Users size={12} className="text-primary" /> Verification Gateway
                            </p>
                        </div>
                        <button onClick={() => refetch()} className="text-[10px] font-black uppercase text-primary hover:text-primary-focus transition-colors tracking-widest bg-primary/10 px-6 py-2.5 rounded-xl border border-primary/20">
                            Sync Queue
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/30 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em] border-b border-base-200">
                                    <th className="p-6">Advertisement Details</th>
                                    <th className="p-6">Financial Context</th>
                                    <th className="p-6">Timestamp</th>
                                    <th className="p-6 text-center">Decision</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200/60">
                                {ads.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-32 text-center">
                                            <div className="flex flex-col items-center max-w-xs mx-auto">
                                                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600/30 mb-6">
                                                    <ShieldCheck size={40} />
                                                </div>
                                                <h4 className="text-xl font-black text-base-content tracking-tight">Queue is Clear</h4>
                                                <p className="text-sm text-base-content/40 font-medium mt-2 leading-relaxed">No advertisements are currently waiting for your approval. Everything is up to date.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    ads.map((ad) => (
                                        <tr key={ad.id} className="hover:bg-base-200/20 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 rounded-2xl bg-base-200 flex-shrink-0 overflow-hidden border border-base-200 shadow-sm transition-transform group-hover:scale-105">
                                                        {ad.images?.[0] ? (
                                                            <img src={ad.images[0].image} className="w-full h-full object-cover" alt={ad.title} />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-base-content/20">
                                                                <Tag size={28} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <Link to={`/property/${ad.id}`} className="font-black text-base-content text-lg tracking-tight hover:text-primary transition-colors line-clamp-1">
                                                            {ad.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-[10px] text-base-content/30 font-bold uppercase tracking-widest mt-1">
                                                            <MapPin size={12} className="text-primary" /> {ad.address}
                                                        </div>
                                                        <span className="mt-2 text-[8px] font-black uppercase bg-primary/10 text-primary px-3 py-1 rounded-lg w-fit tracking-widest">
                                                            {ad.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-[10px] font-black text-base-content/30 uppercase mb-1 tracking-widest">Owner ID: #{ad.owner}</div>
                                                <div className="text-2xl font-black text-emerald-600 tracking-tighter">৳{ad.rent}</div>
                                                <div className="text-[10px] text-base-content/30 uppercase font-bold tracking-widest">{ad.bill_time}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center text-base-content/50 text-xs font-black bg-base-200 px-3 py-1.5 rounded-lg w-fit">
                                                    <Clock size={12} className="mr-2 text-primary" />
                                                    {new Date(ad.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => handleAction(ad.id)}
                                                        disabled={approveMutation.isPending}
                                                        className="flex items-center justify-center p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                                                        title="Verify & Approve"
                                                    >
                                                        {approveMutation.isPending ? <span className="loading loading-spinner loading-xs"></span> : <CheckCircle size={22} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Security Info */}
                    <div className="p-6 bg-base-200/20 border-t border-base-200 flex items-center gap-3">
                        <AlertCircle size={18} className="text-primary/50" />
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.1em]">
                            Moderator Policy: Ensure property details align with community guidelines before approval. Check for high-quality images.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproveAds;
