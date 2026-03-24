import React, { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock, Users, Home, TrendingUp, AlertCircle, Mail, MapPin, Tag } from 'lucide-react';
import { useOutletContext, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const ManageRequests = () => {
    const { setSuccessMSG, setErrorMSG } = useAuthContext();
    const { setHeading } = useOutletContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        const title = "Property Requests";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: requests = [], status, isLoading, refetch } = useQuery({
        queryKey: ['owner-requests'],
        queryFn: async () => {
            const response = await apiClient.get("/owner-requests/");
            return response.data.results;
        }
    });

    const acceptMutation = useMutation({
        mutationFn: async (id) => {
            await apiClient.post(`/owner-requests/${id}/accept/`, { is_accepted: true });
        },
        onSuccess: () => {
            setSuccessMSG("Property Request Accepted Successfully!");
            queryClient.invalidateQueries({ queryKey: ['owner-requests'] });
        },
        onError: (error) => {
            setErrorMSG(error.message || "Failed to accept request. Please try again.");
        }
    });

    const totalAccepted = requests.filter(r => r.is_accepted).length;
    const pendingRequests = requests.filter(r => !r.is_accepted).length;

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
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard 
                        title="Pending Review" 
                        value={pendingRequests} 
                        icon={Clock} 
                        color="bg-amber-500" 
                        subtitle="Awaiting Your Approval"
                    />
                    <StatCard 
                        title="Total Accepted" 
                        value={totalAccepted} 
                        icon={CheckCircle} 
                        color="bg-emerald-500" 
                        subtitle="Successfully Matched"
                    />
                </div>

                {/* Table Container */}
                <div className="bg-base-100 rounded-[3rem] shadow-xl shadow-base-200/50 border border-base-200 overflow-hidden">
                    <div className="p-8 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100/50">
                        <div>
                            <h3 className="text-xl font-black text-base-content tracking-tight uppercase tracking-tighter">Inbound Inquiries</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                <Users size={12} className="text-primary" /> Management Dashboard
                            </p>
                        </div>
                        <button onClick={() => refetch()} className="text-[10px] font-black uppercase text-primary hover:text-primary-focus transition-colors tracking-widest">
                            Sync Data
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/30 text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em] border-b border-base-200">
                                    <th className="p-6">Property Link</th>
                                    <th className="p-6">Requester Details</th>
                                    <th className="p-6">Current Status</th>
                                    <th className="p-6 text-center">Decision</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200/60">
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-32 text-center">
                                            <div className="flex flex-col items-center max-w-xs mx-auto">
                                                <div className="w-20 h-20 bg-base-200 rounded-[2rem] flex items-center justify-center text-base-content/20 mb-6">
                                                    <Mail size={40} />
                                                </div>
                                                <h4 className="text-xl font-black text-base-content tracking-tight">Zero Requests</h4>
                                                <p className="text-sm text-base-content/40 font-medium mt-2 leading-relaxed">When potential tenants express interest in your properties, they'll appear here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((request) => (
                                        <tr key={request.id} className="hover:bg-base-200/20 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                        <Home size={24} />
                                                    </div>
                                                    <div>
                                                        <Link to={`/property/${request.advertisement_details?.id}`} className="font-black text-base-content text-lg tracking-tight hover:text-primary transition-colors line-clamp-1">
                                                            {request.advertisement_details?.title}
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-[10px] text-base-content/30 font-bold uppercase tracking-widest mt-0.5">
                                                            <Tag size={12} /> Ref ID: #ADS-{request.advertisement_details?.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-base-content text-md tracking-tight">
                                                        {request.requester?.first_name} {request.requester?.last_name}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Mail size={12} className="text-base-content/30" />
                                                        <span className="text-[10px] text-base-content/40 font-bold tracking-tight">{request.requester?.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {request.is_accepted ? (
                                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit">
                                                        <CheckCircle size={14} className="animate-in zoom-in" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Matched</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full w-fit">
                                                        <Clock size={14} className="animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Incoming</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => acceptMutation.mutate(request.id)}
                                                        disabled={request.is_accepted || acceptMutation.isPending}
                                                        className={`
                                                            flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300
                                                            ${request.is_accepted 
                                                                ? 'bg-base-200 text-base-content/30 cursor-default border border-base-200' 
                                                                : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 shadow-xl shadow-emerald-500/20 active:scale-95'
                                                            }
                                                        `}
                                                    >
                                                        {request.is_accepted ? (
                                                            <><CheckCircle size={14} /> Approved</>
                                                        ) : (
                                                            <>
                                                                {acceptMutation.isPending ? <span className="loading loading-spinner loading-xs"></span> : <CheckCircle size={14} />}
                                                                Approve Request
                                                            </>
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
                    
                    {/* Bottom Info */}
                    <div className="p-6 bg-base-200/20 border-t border-base-200 flex items-center gap-3">
                        <AlertCircle size={18} className="text-primary/50" />
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.1em]">
                            Note: Once a request is accepted, it's considered a commitment. Communicate with the tenant for next steps.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRequests;
