import { useEffect } from 'react';
import { ImageIcon, Pencil, Trash2, MapPin, Home, Plus, CheckCircle, Clock, Tag, ExternalLink, AlertCircle } from 'lucide-react';
import { Link, useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const MyProperty = () => {
    const { setHeading } = useOutletContext();
    const { fetchMyAds } = useAuthContext();

    useEffect(() => {
        const title = "Inventory Management";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: properties, status, isLoading, refetch } = useQuery({
        queryKey: ['my-properties'],
        queryFn: async () => {
            const response = await fetchMyAds();
            return response.data;
        }
    });

    const activeListings = properties?.results?.filter(p => p.is_approved).length || 0;
    const pendingApproval = properties?.results?.filter(p => !p.is_approved).length || 0;

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
                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard 
                        title="Live on Market" 
                        value={activeListings} 
                        icon={CheckCircle} 
                        color="bg-emerald-500" 
                        subtitle="Publicly Visible"
                    />
                    <StatCard 
                        title="In Review" 
                        value={pendingApproval} 
                        icon={Clock} 
                        color="bg-primary" 
                        subtitle="Awaiting Moderation"
                    />
                </div>

                {/* Table Container */}
                <div className="bg-base-100 rounded-[3rem] shadow-xl shadow-base-200/50 border border-base-200 overflow-hidden">
                    <div className="p-8 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100/50">
                        <div>
                            <h3 className="text-xl font-black text-base-content tracking-tight uppercase tracking-tighter">Property Catalog</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                <Tag size={12} className="text-primary" /> Manage your listings
                            </p>
                        </div>
                        <Link to="/dashboard/addproperty" className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-widest flex items-center gap-2 border-none">
                            <Plus size={18} /> Add New Entry
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/30 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em] border-b border-base-200">
                                    <th className="p-6">Property Overview</th>
                                    <th className="p-6">Financials</th>
                                    <th className="p-6">Moderation</th>
                                    <th className="p-6 text-center">Management</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200/60">
                                {properties?.results?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-32 text-center">
                                            <div className="flex flex-col items-center max-w-xs mx-auto">
                                                <div className="w-20 h-20 bg-base-200 rounded-[2rem] flex items-center justify-center text-base-content/20 mb-6">
                                                    <Home size={40} />
                                                </div>
                                                <h4 className="text-xl font-black text-base-content tracking-tight">Catalog is Empty</h4>
                                                <p className="text-sm text-base-content/40 font-medium mt-2 leading-relaxed">You haven't added any properties yet. Start your journey by listing your first asset.</p>
                                                <Link to="/dashboard/addproperty" className="btn btn-primary btn-sm rounded-xl px-8 mt-8 uppercase font-black tracking-widest text-[10px]">Create First Listing</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    properties?.results?.map((item) => (
                                        <tr key={item.id} className="hover:bg-base-200/20 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-base-200 flex-shrink-0 border border-base-200 shadow-sm transition-transform group-hover:scale-105">
                                                        {item.images.length > 0 ? (
                                                            <img src={item.images[0].image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-base-content/20">
                                                                <Home size={28} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Link to={`/property/${item.id}`} className="font-black text-base-content text-lg tracking-tight hover:text-primary transition-colors line-clamp-1">
                                                            {item.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-[10px] text-base-content/30 font-bold uppercase tracking-widest mt-1">
                                                            <MapPin size={12} className="text-primary" /> {item.area || 'Location Pending'}
                                                        </div>
                                                        <div className="mt-2 text-[8px] bg-base-200 text-base-content/50 px-2 py-0.5 rounded w-fit font-black uppercase tracking-widest">
                                                            Type: {item.category}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-black text-base-content text-xl tracking-tighter">
                                                    ৳{item.rent}
                                                </div>
                                                <div className="text-[10px] font-black uppercase text-base-content/30 tracking-widest mt-0.5">
                                                    Cycle: {item.bill_time}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {item.is_approved ? (
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit">
                                                        <CheckCircle size={14} className="animate-in zoom-in" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full w-fit">
                                                        <Clock size={14} className="animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Pending</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link to={`/dashboard/property/${item.id}/images`} title="Visual Media">
                                                        <button className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                            <ImageIcon size={18} />
                                                        </button>
                                                    </Link>
                                                    <Link to={`/dashboard/updateproperty/${item.id}`} title="Edit Content">
                                                        <button className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                                                            <Pencil size={18} />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        className="p-3 bg-error/10 text-error rounded-2xl transition-all shadow-sm opacity-50 cursor-not-allowed"
                                                        disabled
                                                        title="Protected Action"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="p-6 bg-base-200/20 border-t border-base-200 flex items-center gap-3">
                        <AlertCircle size={18} className="text-primary/50" />
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.1em]">
                            Management System: Active properties are visible to thousands of potential tenants. Keep your details accurate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProperty;
