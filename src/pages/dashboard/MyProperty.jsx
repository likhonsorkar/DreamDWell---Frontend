import { useEffect } from 'react';
import { ImageIcon, Pencil, Trash2, MapPin, Home } from 'lucide-react';
import { Link, useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { TableSkeleton } from '../../components/dashboard/DashboardSkeletons';

const MyProperty = () => {
    const { setHeading } = useOutletContext();
    const { fetchMyAds } = useAuthContext();

    useEffect(() => {
        const title = "My Properties";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const { data: properties, status, refetch } = useQuery({
        queryKey: ['my-properties'],
        queryFn: async () => {
            const response = await fetchMyAds();
            return response.data;
        }
    });

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-0">
            <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-200 border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 border-b border-base-200">
                                <th className="p-5 text-sm font-bold text-base-content/60 uppercase tracking-wider">Property Info</th>
                                <th className="p-5 text-sm font-bold text-base-content/60 uppercase tracking-wider">Category</th>
                                <th className="p-5 text-sm font-bold text-base-content/60 uppercase tracking-wider">Rent</th>
                                <th className="p-5 text-sm font-bold text-base-content/60 uppercase tracking-wider">Status</th>
                                <th className="p-5 text-sm font-bold text-base-content/60 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {status === "success" && properties.results.map((item) => (
                                <tr key={item.id} className="hover:bg-base-200/30 transition-colors">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-base-200 flex-shrink-0 border border-base-200">
                                                {item.images.length > 0 ? (
                                                    <img src={item.images[0].image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-base-content/30">
                                                        <Home size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-base-content line-clamp-1">{item.title}</div>
                                                <div className="flex items-center text-xs text-base-content/40 mt-1">
                                                    <MapPin size={12} className="mr-1" /> {item.area}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 bg-base-200 text-base-content/70 rounded-lg text-xs font-bold uppercase">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="font-black text-base-content">৳{item.rent}</div>
                                        <div className="text-[10px] uppercase text-base-content/40 font-bold leading-none">{item.bill_time}</div>
                                    </td>
                                    <td className="p-5">
                                        {item.is_approved ? (
                                            <span className="flex items-center gap-1.5 text-success text-xs font-bold bg-success/10 px-3 py-1.5 rounded-full w-fit">
                                                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1.5 rounded-full">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/dashboard/property/${item.id}/images`}>
                                                <button 
                                                    className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group"
                                                    title="Manage Images"
                                                >
                                                    <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </Link>
                                            <Link to={`/dashboard/updateproperty/${item.id}`}>
                                                <button className="p-3 bg-base-200 text-base-content/60 rounded-2xl hover:bg-base-content hover:text-base-100 transition-all shadow-sm">
                                                    <Pencil size={18} />
                                                </button>
                                            </Link>
                                            <button 
                                                className="p-3 bg-error/10 text-error rounded-2xl transition-all shadow-sm cursor-not-allowed opacity-50"
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
                {status === "pending" && <TableSkeleton rows={5} />}
                {status === "success" && properties.results.length === 0 && (
                    <div className="p-20 text-center">
                        <Home size={48} className="mx-auto text-base-content/10 mb-4" />
                        <p className="text-base-content/40 font-bold text-lg uppercase tracking-tighter">No properties found. List your first home today!</p>
                        <Link to="/dashboard/addproperty" className="btn btn-sm mt-6 bg-primary hover:bg-primary-focus border-none text-white rounded-xl shadow-xl shadow-primary/20 px-8">
                            + Add Your First Property
                        </Link>
                    </div>
                )}
                {status === "error" && (
                    <div className="p-20 text-center">
                        <p className="text-error font-black text-xl mb-4 uppercase">Failed to load properties.</p>
                        <button onClick={() => refetch()} className="btn btn-sm bg-primary border-none text-white rounded-xl px-10">Retry</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProperty;
