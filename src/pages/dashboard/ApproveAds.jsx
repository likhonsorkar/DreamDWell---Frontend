import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, MapPin, Tag, Image } from 'lucide-react';
import { useOutletContext, Link } from 'react-router';
import apiClient from '../../services/api-client';
import useAuthContext from '../../hooks/useAuthContext';
const ApproveAds = () => {
    const { setHeading, loading, setLoading } = useOutletContext();
    const { authTokens, setSuccessMSG, setErrorMSG } = useAuthContext();
    const [ads, setAds] = useState([]);
    useEffect(() => {
        const title = "Pending Ads"
        document.title = title;
        setHeading(title);
        fetchPendingAds();
    }, []);
    const fetchPendingAds = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("/dashboard/ads/", {
                headers: { 'Authorization': `JWT ${authTokens?.access}` },
            });
            setAds(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMSG("Failed to fetch pending ads.");
        } finally {
            setLoading(false);
        }
    };
    const handleAction = async (id) => {
        setLoading(true);
        try {
            await apiClient.post(`dashboard/ads/${id}/approve/`, {}, {
                headers: { 'Authorization': `JWT ${authTokens?.access}` },
            });
            setSuccessMSG(`Ad Approved Successfully!`);
        } catch (error) {
            console.error("Action failed:", error);
            setErrorMSG(`Failed to Approve ad. Try again.`);
        } finally {
            setLoading(false);
            fetchPendingAds();
        }
    };
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-0">
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-500 font-medium">Total Pending: <span className="text-orange-600">{ads.length}</span></p>
                <button onClick={fetchPendingAds} className="text-sm font-bold text-orange-600 hover:underline">Refresh List</button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Ad Information</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Owner & Price</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider">Time</th>
                                <th className="p-6 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Decision</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {!loading && ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-gray-50/20 transition-all">
                                    <td className="p-6">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex-shrink-0 overflow-hidden border">
                                                {ad.images?.[0] ? (
                                                    <img src={ad.images[0].image} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><Tag /></div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                                                    <Link to={`/property/${ad.id}`} >
                                                     {ad.title}
                                                    </Link>
                                                    </h4>
                                                <div className="flex items-center text-gray-400 text-xs">
                                                    <MapPin size={14} className="mr-1" /> {ad.address}
                                                </div>
                                                <span className="mt-2 text-[10px] font-bold uppercase bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md w-fit">
                                                    {ad.category}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-bold text-gray-700">User ID: #{ad.owner}</div>
                                        <div className="text-xl font-black text-green-600">৳{ad.rent}</div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{ad.bill_time}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Clock size={14} className="mr-2" />
                                            {new Date(ad.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleAction(ad.id)}
                                                className="flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-200 shadow-sm"
                                                title="Approve"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {loading && (
                    <div className="p-20 text-center">
                        <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>
                        <p className="mt-4 text-gray-500">Getting new ads...</p>
                    </div>
                )}
                {!loading && ads.length === 0 && (
                    <div className="p-20 text-center">
                        <CheckCircle size={48} className="mx-auto text-green-200 mb-4" />
                        <p className="text-gray-400 font-bold text-lg">No pending ads found to approve.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ApproveAds;