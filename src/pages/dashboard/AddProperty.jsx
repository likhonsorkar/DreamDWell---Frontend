import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { FilePlus, ImagePlus, BedDouble, Bath, Building, Calendar, Map, Home, Phone, Mail } from 'lucide-react';
const AddProperty = () => {
    const navigate = useNavigate();
    const { CreateAds, AddAdsImage } = useAuthContext();
    const [adsId, setAdsId] = useState();
    const [adsimage, setAddImage] = useState([]);
    const [upImage, setUpImage] = useState([]);
    const [imageError, setImageError] = useState(null);
    const { setHeading, setLoading, loading } = useOutletContext();
    useEffect(() => {
        const title = "Add Property"
        document.title = title;
        setHeading(title);
    }, []);
    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        const response = await CreateAds(data);
        if (response) {
            setAdsId(response.data.id);
        }
        setLoading(false);
    }
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setUpImage(files);
        setAddImage(files.map(file => URL.createObjectURL(file)));
        if(files.length > 0) {
            setImageError(null);
        }
    }
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
            console.error("add property error: ", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-w-4xl mx-auto">
            {loading && (
                <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>
            )}
            {!loading && (
                <>
                    {!adsId ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 border-b border-gray-100 pb-4 mb-4 flex items-center gap-3">
                                <FilePlus className="text-orange-500" size={28}/>
                                <h3 className="text-2xl font-black text-gray-800">Property Information</h3>
                            </div>
                            <div className="md:col-span-2">
                                <label className="label font-bold text-gray-600">Title</label>
                                <input {...register("title", { required: "Title is required" })} placeholder="e.g. Modern Villa with Garden" className={`input input-bordered w-full rounded-2xl bg-gray-50 ${errors.title ? 'border-red-400' : 'border-gray-100'}`} />
                                {errors.title && <span className="text-red-500 text-xs mt-1 ml-2">{errors.title.message}</span>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="label font-bold text-gray-600">Description</label>
                                <textarea {...register("description", { required: "Description is required" })} className="textarea textarea-bordered w-full rounded-2xl bg-gray-50 h-28 border-gray-100" />
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600">Price (Monthly/Weekly)</label>
                                <input type="number" {...register("rent", { valueAsNumber: true, required: "Price is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600">Advance (৳)</label>
                                <input defaultValue="0" type="number" {...register("advance", { valueAsNumber: true, required: "If no advance payment is needed, please enter 0." })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600">Category</label>
                                <select {...register("category", { required: "Category field is required" })} className="select select-bordered w-full rounded-2xl bg-gray-50 border-gray-100 font-bold">
                                    <option value='' disabled>Pick Category</option>
                                    {PROPERTY_CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600">Bill Cycle</label>
                                <select {...register("bill_time", { required: "Select a Bill Cycle" })} className="select select-bordered w-full rounded-2xl bg-gray-50 border-gray-100 font-bold">
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly" selected>Monthly</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 border-b border-gray-100 pb-4 my-4 flex items-center gap-3">
                                <Home className="text-orange-500" size={28}/>
                                <h3 className="text-2xl font-black text-gray-800">Apartment Details</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                <div>
                                    <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><BedDouble size={14}/> Bedrooms</label>
                                    <input type="number" {...register("bedrooms", { valueAsNumber: true, required: "Number of bedrooms is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                                </div>
                                <div>
                                    <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Bath size={14}/> Bathrooms</label>
                                    <input type="number" {...register("bathrooms", { valueAsNumber: true, required: "Number of bathrooms is required" })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                                </div>
                                <div>
                                    <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Building size={14}/> Balcony</label>
                                    <input type="number" {...register("balcony", { valueAsNumber: true, required: "If no balcony, please enter 0." })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                                </div>
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600">Area</label>
                                <input {...register("area", { required: "Area is required" })} placeholder="Ex. Dhaka, Mohammadpur" className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Calendar size={14}/> Available From</label>
                                <input type="date" {...register("avaiable_from", { required: "Please select the date this property is available from." })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
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
                                <input {...register("contact_phone", { required: "Contact phone is required." })} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                            </div>
                            <div>
                                <label className="label font-bold text-gray-600 inline-flex items-center gap-1"><Mail size={14}/> Email</label>
                                <input {...register("contact_email")} className="input input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                            </div>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-100 transition-all active:scale-95">
                                Create Listing & Proceed to Photos
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className='bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100'>
                        <div className="mb-4 flex items-center gap-3">
                            <ImagePlus className="text-orange-500" size={28}/>
                            <h3 className="text-2xl font-black text-gray-800">Upload Property Images</h3>
                        </div>
                        <label className="label font-bold text-gray-600">Property Images</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" />
                        <p className="text-xs text-gray-400 mt-1 ml-2">You can select multiple photos.</p>
                        {imageError && <span className="text-red-500 text-xs mt-1 ml-2">{imageError}</span>}
                        {adsimage.length > 0 && (
                            <div className='flex flex-wrap gap-4 mt-4'>
                                {adsimage.map((src, idx) => {
                                    return (<img key={idx} src={src} alt='preview' className='w-24 h-24 rounded-lg object-cover shadow-md' />)
                                })}
                            </div>)}
                        <div className="mt-8">
                            <button onClick={handleImageUpload} className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-100 transition-all active:scale-95">
                                Upload Photos & Finish
                            </button>
                        </div>
                    </div>
                )}
            </>
            )}
        </div>
    );
};
export default AddProperty;