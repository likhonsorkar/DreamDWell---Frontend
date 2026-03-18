import React, { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import apiClient from '../../services/api-client';
import { CheckCircle, Clock } from 'lucide-react';
import { useOutletContext } from 'react-router';

const ManageRequests = () => {
    const { authTokens, setErrorMSG, setSuccessMSG } = useAuthContext();
    const { setHeading, setLoading, loading } = useOutletContext();
    const [requests, setRequests] = useState([]);
    useEffect(()=> {
        const title = "Manage Request"
        document.title = title;
        setHeading(title);
        fetchRequest();
    }, [])
    const fetchRequest = async() => {
        setLoading(true)
        try{
            const response = await apiClient.get("/owner-requests/", {
                headers: { Authorization: `JWT ${authTokens?.access}` },
            });
            setRequests(response.data);
            setSuccessMSG("Data Fetched Succesfull");
        }catch(error){
            setErrorMSG(error)
        }finally{
            setLoading(false)
        }
    }
    const handleAccept = async(id) => {
        setLoading(true);

    try {
        const response = await apiClient.post(
            `/owner-requests/${id}/accept/`,
                { is_accepted: true },
                {
                    headers: { 
                        Authorization: `JWT ${authTokens?.access}` 
                    },
                }
            );
            if (response && (response.status === 200 || response.status === 201)) {
                fetchRequest();  
                setSuccessMSG("Request Accepted");
            }

        } catch (error) {
            console.error("Failed to accept request:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
           {loading && (
                    <div className="p-20 text-center">
                        <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading user requests</p>
                    </div>
                )}

          {!loading && (
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Ads Title</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Requester</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <Clock size={48} className="text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold text-lg">No requests found at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                requests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50/20 transition-all group">
                                        <td className="p-6">
                                            <div className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">
                                                {request.advertisement_details?.title}
                                            </div>
                                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
                                                Property ID: #{request.advertisement_details?.id}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-700">
                                                    {request.requester?.first_name} {request.requester?.last_name}
                                                </span>
                                                <span className="text-xs text-gray-400">{request.requester?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${
                                                request.is_accepted 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-orange-100 text-orange-600'
                                            }`}>
                                                {request.is_accepted ? 'Accepted' : 'Pending Review'}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleAccept(request.id)}
                                                    disabled={request.is_accepted}
                                                    className={`
                                                        flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all duration-200
                                                        ${request.is_accepted 
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white hover:scale-105 shadow-sm active:scale-95'
                                                        }
                                                    `}
                                                >
                                                    <CheckCircle size={18} />
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