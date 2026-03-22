import React, { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const ManageRequests = () => {
    const { setSuccessMSG, setErrorMSG } = useAuthContext();
    const { setHeading } = useOutletContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        const title = "Manage Request";
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
            setSuccessMSG("Request Accepted");
            queryClient.invalidateQueries({ queryKey: ['owner-requests'] });
        },
        onError: (error) => {
            setErrorMSG(error.message || "Failed to accept request");
        }
    });

    return (
        <div>
            {isLoading && <TableSkeleton rows={5} />}

            {!isLoading && (
                <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-200 border border-base-200 overflow-hidden mt-6 transition-all duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 border-b border-base-200">
                                    <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Ads Title</th>
                                    <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Requester</th>
                                    <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider">Status</th>
                                    <th className="p-6 text-sm font-bold text-base-content/60 uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <Clock size={48} className="text-base-content/10 mb-4" />
                                                <p className="text-base-content/40 font-black text-xl uppercase tracking-tighter">No requests found at the moment.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((request) => (
                                        <tr key={request.id} className="hover:bg-base-200/30 transition-all group">
                                            <td className="p-6">
                                                <div className="font-bold text-base-content text-lg group-hover:text-primary transition-colors">
                                                    {request.advertisement_details?.title}
                                                </div>
                                                <div className="text-[10px] text-base-content/40 uppercase font-black tracking-widest mt-1">
                                                    Property ID: #{request.advertisement_details?.id}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base-content/80">
                                                        {request.requester?.first_name} {request.requester?.last_name}
                                                    </span>
                                                    <span className="text-xs text-base-content/40 font-medium">{request.requester?.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    request.is_accepted 
                                                    ? 'bg-success/10 text-success' 
                                                    : 'bg-primary/10 text-primary animate-pulse'
                                                }`}>
                                                    {request.is_accepted ? 'Accepted' : 'Pending Review'}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => acceptMutation.mutate(request.id)}
                                                        disabled={request.is_accepted || acceptMutation.isPending}
                                                        className={`
                                                            flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300
                                                            ${request.is_accepted 
                                                                ? 'bg-base-200 text-base-content/30 cursor-not-allowed' 
                                                                : 'bg-success/10 text-success hover:bg-success hover:text-white hover:scale-105 shadow-lg shadow-success/10 active:scale-95'
                                                            }
                                                        `}
                                                    >
                                                        <CheckCircle size={16} />
                                                        {request.is_accepted ? 'Approved' : 'Accept Request'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRequests;
