import { useEffect, useState } from 'react';
import {ImageIcon, Pencil, Trash2, MapPin, Home } from 'lucide-react';
import { Link, useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
const MyProperty = () => {
    const { setHeading } = useOutletContext();
    const {authTokens, fetchMyAds} = useAuthContext();
    const [status, setStatus] = useState("wait");
    const [properties, setProperties] = useState({
        count: 0,
        next: null,
        previous: null,
        results: []
    });
    const query = async () => {
        setStatus("loading");
       try {
            const response = await fetchMyAds();
            if (response) {
                setProperties(response.data);
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    }
    useEffect(() => {
        const title = "My Properties"
        document.title = title;
        setHeading(title);
        query();
    }, []);
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-0">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Property Info</th>
                                <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Category</th>
                                <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Rent</th>
                                <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {status === "success" && properties.results.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50">
                                                {item.images.length > 0 ? (
                                                    <img src={item.images[0].image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Home size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 line-clamp-1">{item.title}</div>
                                                <div className="flex items-center text-xs text-gray-400 mt-1">
                                                    <MapPin size={12} className="mr-1" /> {item.area}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="font-black text-gray-800">৳{item.rent}</div>
                                        <div className="text-[10px] uppercase text-gray-400 font-bold leading-none">{item.bill_time}</div>
                                    </td>
                                    <td className="p-5">
                                        {item.is_approved ? (
                                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full w-fit">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-orange-500 text-xs font-bold bg-orange-50 px-3 py-1.5 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/dashboard/property/${item.id}/images`}>
                                                <button 
                                                    className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
                                                    title="Manage Images"
                                                >
                                                    <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </Link>
                                            <Link to={`/dashboard/updateproperty/${item.id}`}>
                                                <button className="p-3 bg-gray-50 text-gray-600 rounded-2xl hover:bg-gray-800 hover:text-white transition-all shadow-sm">
                                                    <Pencil size={18} />
                                                </button>
                                            </Link>
                                            <button 
                                                className="p-3 bg-red-50 text-red-500 rounded-2xl transition-all shadow-sm cursor-not-allowed"
                                                disabled
                                                title="Delete functionality not yet implemented"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {status === "loading" && (
                    <div className="p-20 text-center">
                        <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading your properties...</p>
                    </div>
                )}
                {status === "success" && properties.results.length === 0 && (
                    <div className="p-20 text-center">
                        <Home size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-medium">No properties found. List your first home today!</p>
                        <Link to="/dashboard/addproperty" className="btn btn-sm mt-4 bg-orange-500 hover:bg-orange-600 border-none text-white rounded-xl shadow-lg shadow-orange-100">
                            + Add Your First Property
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProperty;