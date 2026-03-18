import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { FilePen, BedDouble, Bath, Building, Calendar, Map, Home, Phone, Mail } from 'lucide-react';
const UpdateProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updateAd, getAdDetails } = useAuthContext();
    const [adsDetail, setAdsDetail] = useState(null);
    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];
    const { setHeading, setLoading, loading } = useOutletContext();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    useEffect(() => {
        const title = "Update Property"
        document.title = title;
        setHeading(title);
        setLoading(true);
        getAdDetails(id)
            .then(res => {
                if (res) {
                    setAdsDetail(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, setHeading, setLoading, getAdDetails]);
    useEffect(() => {
        if (adsDetail) {
            if (user && user.id !== adsDetail.owner) {
                navigate('/dashboard');
            }
            Object.keys(adsDetail).forEach((key) => {
                if(key === 'avaiable_from'){
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
            console.error("Failed to update ad:", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading && !adsDetail) {
        return <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>;
    }
    if (!adsDetail && !loading) {
        return <div className="text-center p-8">Property Not Found</div>;
    }
    return (
        <div className="max-w-4xl mx-auto">
            {!loading && (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
                        <FilePen className="text-orange-500" size={28}/>
                        <h3 className="text-2xl font-black text-gray-800">Update Property Information</h3>
                    </div>
                    <div className="md:col-span-2">
                        <label className="label font-bold text-gray-600">Title</label>
                        <input 
                            {...register("title", { required: "Title is required" })}
                            placeholder="e.g. Modern Villa with Garden"
                            className={`input input-bordered w-full rounded-2xl bg-gray-50 ${errors.title ? 'border-red-400' : 'border-gray-100'}`}
                        />
                        {errors.title && <span className="text-red-500 text-xs mt-1 ml-2">{errors.title.message}</span>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="label font-bold text-gray-600">Description</label>
                        <textarea 
                            {...register("description", { required: "Description is required" })}
                            className="textarea textarea-bordered w-full rounded-2xl bg-gray-50 h-28 border-gray-100"
                        />
                    </div>

                    <div>
                        <label className="label font-bold text-gray-600">Price (Monthly/Weekly)</label>
                        <input 
                            type="number" 
                            {...register("rent", { valueAsNumber: true, required: "Price is required" })}
                            className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100"
                        />
                    </div>

                    <div>
                        <label className="label font-bold text-gray-600">Advance (৳)</label>
                        <input 
                            defaultValue="0"
                            type="number" 
                            {...register("advance", { valueAsNumber: true, required: "If no advance payment is needed, please enter 0."})}
                            className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100"
                        />
                    </div>

                    <div>
                        <label className="label font-bold text-gray-600">Category</label>
                        <select {...register("category", {required: "Category field is required"})} className="select select-bordered w-full rounded-2xl bg-gray-50 border-gray-100 font-bold">
                            <option value='' disabled>Pick Category</option>
                            {PROPERTY_CATEGORIES.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>))}
                        </select>
                    </div>

                    <div>
                        <label className="label font-bold text-gray-600">Bill Cycle</label>
                        <select {...register("bill_time", {required: "Select a Bill Cycle"})} className="select select-bordered w-full rounded-2xl bg-gray-50 border-gray-100 font-bold">
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 border-b border-gray-100 pb-4 my-4 flex items-center gap-3">
                        <Home className="text-orange-500" size={28}/>
                        <h3 className="text-2xl font-black text-gray-800">Apartment Details</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:col-span-2">
                        <div>
                            <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><BedDouble size={14}/> Bedrooms</label>
                            <input type="number" {...register("bedrooms", { valueAsNumber: true , required: "Number of bedrooms is required"})} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                        </div>
                        <div>
                            <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Bath size={14}/> Bathrooms</label>
                            <input type="number" {...register("bathrooms", { valueAsNumber: true, required: "Number of bathrooms is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                        </div>
                        <div>
                            <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Building size={14}/> Balcony</label>
                            <input type="number" {...register("balcony", { valueAsNumber: true, required:"If no balcony, please enter 0."})} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                        </div>
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">Area</label>
                        <input {...register("area", {required: "Area is required"})} placeholder="Ex. Dhaka, Mohammadpur" className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Calendar size={14}/> Available From</label>
                        <input type="date" {...register("avaiable_from", {required: "Please select the date this property is available from."})} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Map size={14}/> Full Address</label>
                        <input {...register("address", { required: "Address is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div className="md:col-span-2 border-b border-gray-100 pb-4 my-4 flex items-center gap-3">
                        <Phone className="text-orange-500" size={28}/>
                        <h3 className="text-2xl font-black text-gray-800">Contact Information</h3>
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600">Phone</label>
                        <input {...register("contact_phone", { required: "Contact phone is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                    <div>
                        <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Mail size={14}/> Email</label>
                        <input {...register("contact_email")} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                    </div>
                </div>
                <div className="mt-8">
                    <button 
                        type="submit" 
                        className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-100 transition-all active:scale-95"
                    >
                        Update Listing
                    </button>
                </div>
            </form>
            )}
        </div>
    );
};
export default UpdateProperty;