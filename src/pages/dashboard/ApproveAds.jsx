import { useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Tag } from 'lucide-react';
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
        const title = "Pending Ads";
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
            setSuccessMSG(`Ad Approved Successfully!`);
            queryClient.invalidateQueries(['pending-ads']);
        },
        onError: () => {
            setErrorMSG(`Failed to Approve ad. Try again.`);
        }
    });

    const handleAction = (id) => {
        approveMutation.mutate(id);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-0">
            <div className="flex justify-between items-center mb-6">
                <p className="text-base-content/50 font-bold uppercase tracking-widest text-[10px]">
                    Total Pending: <span className="text-primary">{ads.length}</span>
                </p>
                <button onClick={() => refetch()} className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Refresh List</button>
            </div>

            <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-200 border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 border-b border-base-200">
                                <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Ad Information</th>
                                <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Owner & Price</th>
                                <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Time</th>
                                <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider text-center">Decision</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {status === "success" && ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-base-200/30 transition-all">
                                    <td className="p-6">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-2xl bg-base-200 flex-shrink-0 overflow-hidden border border-base-200">
                                                {ad.images?.[0] ? (
                                                    <img src={ad.images[0].image} className="w-full h-full object-cover" alt={ad.title} />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-base-content/20"><Tag /></div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-bold text-base-content text-lg leading-tight mb-1">
                                                    <Link to={`/property/${ad.id}`} className="hover:text-primary transition-colors">
                                                     {ad.title}
                                                    </Link>
                                                    </h4>
                                                <div className="flex items-center text-base-content/40 text-xs font-medium">
                                                    <MapPin size={14} className="mr-1 text-primary" /> {ad.address}
                                                </div>
                                                <span className="mt-2 text-[10px] font-black uppercase bg-primary/10 text-primary px-3 py-1 rounded-lg w-fit tracking-widest">
                                                    {ad.category}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-xs font-bold text-base-content/40 uppercase mb-1">Owner ID: #{ad.owner}</div>
                                        <div className="text-2xl font-black text-success">৳{ad.rent}</div>
                                        <div className="text-[10px] text-base-content/30 uppercase font-bold tracking-widest">{ad.bill_time}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center text-base-content/50 text-sm font-bold">
                                            <Clock size={14} className="mr-2 text-primary" />
                                            {new Date(ad.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleAction(ad.id)}
                                                disabled={approveMutation.isPending}
                                                className="flex items-center justify-center p-4 bg-success/10 text-success rounded-2xl hover:bg-success hover:text-white hover:scale-105 transition-all duration-300 shadow-sm disabled:opacity-50"
                                                title="Approve"
                                            >
                                                <CheckCircle size={22} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isLoading && <TableSkeleton rows={5} />}
                {status === "success" && ads.length === 0 && (
                    <div className="p-20 text-center">
                        <CheckCircle size={48} className="mx-auto text-success/20 mb-4" />
                        <p className="text-base-content/40 font-black text-xl uppercase tracking-tighter">Great! No pending ads found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ApproveAds;
