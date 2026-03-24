import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { FilePen, BedDouble, Bath, Building, Calendar, Map, Home, Phone, Mail, Info, LayoutGrid } from 'lucide-react';

const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updateAd, getAdDetails } = useAuthContext();
    const [adsDetail, setAdsDetail] = useState(null);
    const { setHeading, setLoading, loading } = useOutletContext();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];

    useEffect(() => {
        const title = "Update Property"
        document.title = title;
        setHeading(title);
        setLoading(true);
        console.log(`DEBUG: [UpdateProperty] Fetching details for ID: ${id}`);
        getAdDetails(id)
            .then(res => {
                if (res && res.data) {
                    const data = res.data.results ? res.data.results[0] : res.data;
                    console.log("DEBUG: [UpdateProperty] Received data:", data);
                    setAdsDetail(data);
                } else {
                    console.error("DEBUG: [UpdateProperty] No response or data from API");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("DEBUG: [UpdateProperty] Fetch failed:", err);
                setLoading(false);
            });
    }, [id, setHeading, setLoading, getAdDetails]);

    useEffect(() => {
        if (adsDetail) {
            console.log("DEBUG: [UpdateProperty] Checking Auth:", { 
                currentUserId: user?.id, 
                ownerId: adsDetail.owner,
                match: user?.id == adsDetail.owner 
            });
            
            // Use loose comparison == because IDs might be string vs number
            if (user && user.id != adsDetail.owner) {
                console.warn("DEBUG: [UpdateProperty] Unauthorized! Redirecting...");
                navigate('/dashboard');
            }

            Object.keys(adsDetail).forEach((key) => {
                if(key === 'avaiable_from' && adsDetail[key]){
                    setValue(key, new Date(adsDetail[key]).toISOString().split('T')[0]);
                } else {
                    setValue(key, adsDetail[key]);
                }
            });
        }
    }, [adsDetail, setValue, user, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await updateAd(id, data);
            if (response) {
                navigate("/dashboard/myproperty");
            }
        } catch (error) {
            console.error("DEBUG: [UpdateProperty] Submit FAILED:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !adsDetail) {
        return (
            <div className="max-w-4xl mx-auto p-20 text-center bg-base-100 rounded-[3rem] border border-base-200">
                <span className="loading loading-bars loading-xl text-primary"></span>
                <p className="mt-4 text-base-content/40 font-bold uppercase tracking-widest">Retrieving Property Data...</p>
            </div>
        );
    }

    if (!adsDetail && !loading) {
        return (
            <div className="max-w-4xl mx-auto p-20 text-center bg-base-100 rounded-[3rem] border border-base-200">
                <p className="text-xl font-black text-base-content/40 uppercase tracking-tighter">Property Not Found</p>
                <p className="text-xs text-base-content/20 mt-2">Check console for debug logs</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-700">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-base-200/50 border border-base-200 transition-all">
                {/* Header Section */}
                <div className="mb-10 flex items-center gap-4 border-b border-base-200 pb-8">
                    <div className="bg-primary/10 p-4 rounded-[1.5rem] shadow-inner">
                        <FilePen className="text-primary" size={32}/>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-base-content tracking-tighter uppercase tracking-tight">Update Listing</h3>
                        <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1">Modify property details & configuration</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 flex items-center gap-2 mb-2">
                        <Info size={16} className="text-primary" />
                        <h4 className="text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">General Information</h4>
                    </div>

                    <div className="md:col-span-2 form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Property Title</label>
                        <input 
                            {...register("title", { required: "Title is required" })}
                            className={`input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 ${errors.title ? 'ring-2 ring-error/50' : ''}`}
                        />
                        {errors.title && <span className="text-error text-[10px] font-bold mt-1 ml-2 uppercase">{errors.title.message}</span>}
                    </div>

                    <div className="md:col-span-2 form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Detailed Description</label>
                        <textarea 
                            {...register("description", { required: "Description is required" })}
                            className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-none h-32 font-bold focus:ring-2 ring-primary/20"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Monthly Rent (৳)</label>
                        <input type="number" {...register("rent", { valueAsNumber: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold" />
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Advance Amount (৳)</label>
                        <input type="number" {...register("advance", { valueAsNumber: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold" />
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Category</label>
                        <select {...register("category")} className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black">
                            <option value='' disabled>Pick Category</option>
                            {PROPERTY_CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Bill Cycle</label>
                        <select {...register("bill_time")} className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2 mb-2 mt-4">
                        <LayoutGrid size={16} className="text-primary" />
                        <h4 className="text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Specifications</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-4 md:col-span-2">
                        <div className="form-control">
                            <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><BedDouble size={12} className="text-primary"/> Bed</label>
                            <input type="number" {...register("bedrooms", { valueAsNumber: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 text-center font-black" />
                        </div>
                        <div className="form-control">
                            <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><Bath size={12} className="text-primary"/> Bath</label>
                            <input type="number" {...register("bathrooms", { valueAsNumber: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 text-center font-black" />
                        </div>
                        <div className="form-control">
                            <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><Building size={12} className="text-primary"/> Balcony</label>
                            <input type="number" {...register("balcony", { valueAsNumber: true })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 text-center font-black" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Location</label>
                        <input {...register("area")} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold" />
                    </div>

                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Available</label>
                        <input type="date" {...register("avaiable_from")} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black" />
                    </div>

                    <div className="md:col-span-2 form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Address</label>
                        <input {...register("address")} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold" />
                    </div>
                </div>

                <div className="mt-12">
                    <button type="submit" disabled={loading} className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all h-16 disabled:bg-primary/50">
                        {loading ? <span className="loading loading-spinner"></span> : "Synchronize Updates"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProperty;
