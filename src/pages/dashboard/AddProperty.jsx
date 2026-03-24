import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { FilePlus, ImagePlus, BedDouble, Bath, Building, Calendar, Map, Home, Phone, Mail, CheckCircle, AlertCircle, Trash2, LayoutGrid, Info } from 'lucide-react';
import { GeneralFormSkeleton } from '../../components/dashboard/DashboardSkeletons';

const AddProperty = () => {
    const navigate = useNavigate();
    const { CreateAds, AddAdsImage } = useAuthContext();
    const [adsId, setAdsId] = useState();
    const [adsimage, setAddImage] = useState([]);
    const [upImage, setUpImage] = useState([]);
    const [imageError, setImageError] = useState(null);
    const { setHeading, setLoading, loading } = useOutletContext();

    useEffect(() => {
        const title = "List Property";
        document.title = title;
        setHeading(title);
    }, [setHeading]);

    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            bill_time: "monthly",
            category: ""
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await CreateAds(data);
            if (response) {
                setAdsId(response.data.id);
            }
        } catch (error) {
            console.error("Failed to create ad:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setUpImage(files);
        setAddImage(files.map(file => URL.createObjectURL(file)));
        if(files.length > 0) {
            setImageError(null);
        }
    };

    const handleImageUpload = async () => {
        if (!upImage.length) {
            setImageError("Please select at least one image before uploading.");
            return;
        }
        setLoading(true);
        try {
            const response = await AddAdsImage(upImage, adsId);
            if (response) {
                navigate("/dashboard/myproperty");
            }
        } catch (error) {
            console.error("add property image error: ", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !adsId) {
        return <GeneralFormSkeleton />;
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-700">
            {!adsId ? (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-base-200/50 border border-base-200 transition-all">
                    {/* Header Section */}
                    <div className="mb-10 flex items-center gap-4 border-b border-base-200 pb-8">
                        <div className="bg-primary/10 p-4 rounded-[1.5rem] shadow-inner">
                            <FilePlus className="text-primary" size={32}/>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-base-content tracking-tighter uppercase tracking-tight">List New Property</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1">Property details & configurations</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Information Header */}
                        <div className="md:col-span-2 flex items-center gap-2 mb-2">
                            <Info size={16} className="text-primary" />
                            <h4 className="text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">General Information</h4>
                        </div>

                        <div className="md:col-span-2 form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Property Title</label>
                            <input 
                                {...register("title", { required: "Title is required" })} 
                                placeholder="e.g. Modern Villa with Garden" 
                                className={`input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold placeholder:text-base-content/20 focus:ring-2 ring-primary/20 transition-all ${errors.title ? 'ring-2 ring-error/50' : ''}`} 
                            />
                            {errors.title && <span className="text-error text-[10px] font-bold mt-1 ml-2 uppercase">{errors.title.message}</span>}
                        </div>

                        <div className="md:col-span-2 form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Detailed Description</label>
                            <textarea 
                                {...register("description", { required: "Description is required" })} 
                                placeholder="Describe the unique features of your property..."
                                className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-none h-32 font-bold placeholder:text-base-content/20 focus:ring-2 ring-primary/20 transition-all" 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Monthly Rent (৳)</label>
                            <input 
                                type="number" 
                                {...register("rent", { valueAsNumber: true, required: "Price is required" })} 
                                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Advance Amount (৳)</label>
                            <input 
                                defaultValue="0" 
                                type="number" 
                                {...register("advance", { valueAsNumber: true, required: "Advance is required" })} 
                                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Category</label>
                            <select 
                                {...register("category", { required: "Category field is required" })} 
                                className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black focus:ring-2 ring-primary/20 transition-all"
                            >
                                <option value="" disabled>Pick Category</option>
                                {PROPERTY_CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Bill Cycle</label>
                            <select 
                                {...register("bill_time", { required: "Select a Bill Cycle" })} 
                                className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black focus:ring-2 ring-primary/20 transition-all"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        {/* Specifications Header */}
                        <div className="md:col-span-2 flex items-center gap-2 mb-2 mt-4">
                            <LayoutGrid size={16} className="text-primary" />
                            <h4 className="text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Specifications</h4>
                        </div>

                        <div className="grid grid-cols-3 gap-4 md:col-span-2">
                            <div className="form-control">
                                <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><BedDouble size={12} className="text-primary"/> Bedrooms</label>
                                <input type="number" {...register("bedrooms", { valueAsNumber: true, required: "Req" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black text-center focus:ring-2 ring-primary/20 transition-all" />
                            </div>
                            <div className="form-control">
                                <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><Bath size={12} className="text-primary"/> Bathrooms</label>
                                <input type="number" {...register("bathrooms", { valueAsNumber: true, required: "Req" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black text-center focus:ring-2 ring-primary/20 transition-all" />
                            </div>
                            <div className="form-control">
                                <label className="label text-[8px] font-black uppercase text-base-content/60 tracking-widest inline-flex items-center gap-1"><Building size={12} className="text-primary"/> Balcony</label>
                                <input type="number" {...register("balcony", { valueAsNumber: true, required: "Req" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black text-center focus:ring-2 ring-primary/20 transition-all" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Area / Location</label>
                            <input {...register("area", { required: "Area is required" })} placeholder="Ex. Dhaka, Mohammadpur" className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" />
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1 inline-flex items-center gap-1"><Calendar size={14}/> Available From</label>
                            <input type="date" {...register("avaiable_from", { required: "Date is required" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-black focus:ring-2 ring-primary/20 transition-all" />
                        </div>

                        <div className="md:col-span-2 form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1 inline-flex items-center gap-1"><Map size={14}/> Full Address</label>
                            <input {...register("address", { required: "Address is required" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" />
                        </div>

                        {/* Contact Header */}
                        <div className="md:col-span-2 flex items-center gap-2 mb-2 mt-4">
                            <Phone size={16} className="text-primary" />
                            <h4 className="text-[10px] font-black uppercase text-base-content/40 tracking-[0.2em]">Contact Verification</h4>
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Phone Number</label>
                            <input {...register("contact_phone", { required: "Phone is required" })} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" />
                        </div>

                        <div className="form-control">
                            <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1 inline-flex items-center gap-1"><Mail size={14}/> Official Email</label>
                            <input {...register("contact_email")} className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold focus:ring-2 ring-primary/20 transition-all" />
                        </div>
                    </div>

                    <div className="mt-12">
                        <button type="submit" className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all active:scale-95 h-16">
                            Construct Listing & Gallery
                        </button>
                    </div>
                </form>
            ) : (
                <div className='bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-base-200/50 border border-base-200 animate-in zoom-in duration-500'>
                    <div className="mb-10 flex items-center gap-4 border-b border-base-200 pb-8">
                        <div className="bg-primary/10 p-4 rounded-[1.5rem] shadow-inner">
                            <ImagePlus className="text-primary" size={32}/>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-base-content tracking-tighter uppercase tracking-tight">Gallery Media</h3>
                            <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-1">Property visual representation</p>
                        </div>
                    </div>
                    
                    <div className="form-control">
                        <label className="label text-[10px] font-black uppercase text-base-content/60 tracking-widest ml-1">Upload Assets</label>
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            className="file-input file-input-bordered w-full rounded-2xl bg-base-200 border-none font-bold h-14" 
                        />
                        <div className="flex items-center justify-between mt-2 px-2">
                            <p className="text-[10px] text-base-content/30 font-bold uppercase tracking-widest">Multiple selection enabled • Supports JPG, PNG</p>
                            {imageError && <span className="text-error text-[10px] font-black uppercase tracking-widest">{imageError}</span>}
                        </div>
                    </div>

                    {adsimage.length > 0 && (
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-base-200/30 p-6 rounded-[2rem] border border-base-200 border-dashed">
                            {adsimage.map((src, idx) => (
                                <div key={idx} className="relative group aspect-square">
                                    <img src={src} alt='preview' className='w-full h-full rounded-2xl object-cover shadow-lg opacity-80 group-hover:opacity-100 transition-all grayscale hover:grayscale-0' />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-2xl">
                                        <CheckCircle className="text-white" size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 flex flex-col gap-4">
                        <button 
                            onClick={handleImageUpload} 
                            disabled={loading}
                            className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all active:scale-95 h-16"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Finalize & Synchronize Gallery"}
                        </button>
                        <p className="text-[10px] text-center text-base-content/30 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <ShieldCheck size={14} className="text-primary" /> Assets are secured with encrypted cloud storage
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProperty;
