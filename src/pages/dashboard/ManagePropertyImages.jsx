import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { ImagePlus, Trash2 } from 'lucide-react';
import { GeneralFormSkeleton } from '../../components/dashboard/DashboardSkeletons';

const ManagePropertyImages = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, AddAdsImage, successMSG, deleteAdImage, getAdImages, getAdDetails } = useAuthContext();
    const { setHeading, setLoading, loading } = useOutletContext();
    const [propertyImages, setPropertyImages] = useState([]);
    const [upImage, setUpImage] = useState([]);
    const [addImage, setAddImage] = useState([]);
    const [imageError, setImageError] = useState(null);
    const [adsDetail, setAdsDetail] = useState(null); 

    const fetchAdAndImages = async () => {
        setLoading(true);
        try {
            const [adDetailsRes, imagesRes] = await Promise.all([
                getAdDetails(id),
                getAdImages(id)
            ]);
            if (!adDetailsRes) {
                navigate('/dashboard');
                return;
            }
            if (user && user.id !== adDetailsRes.data.owner) {
                navigate('/dashboard');
                return;
            }
            setAdsDetail(adDetailsRes.data);
            setPropertyImages(imagesRes.data);
        } catch (err) {
            console.error(err);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const title = "Manage Gallery"
        document.title = title;
        setHeading(title);
        fetchAdAndImages();
    }, []);

    useEffect(() => {
        if (successMSG) {
            fetchAdAndImages();
            setAddImage([]);
            setUpImage([]);
            setImageError(null);
        }
    }, [successMSG]);

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
            await AddAdsImage(upImage, id);
        } catch (error) {
            console.error("add property error: ", error);
            setImageError("Failed to upload images.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (imageId) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;
        setLoading(true);
        try {
            await deleteAdImage(id, imageId);
        } catch (error) {
            console.error("Failed to delete image:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !adsDetail) {
        return <GeneralFormSkeleton />;
    }

    if (!adsDetail && !loading) {
        return (
            <div className="max-w-4xl mx-auto p-20 text-center bg-base-100 rounded-[2.5rem] border border-base-200">
                <p className="text-xl font-black text-base-content/40 uppercase tracking-tighter">Property not found or unauthorized access</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-base-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-base-200 border border-base-200 transition-all duration-500">
                <div className="mb-10 flex items-center gap-4 border-b border-base-200 pb-6">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <ImagePlus className="text-primary" size={28}/>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-base-content tracking-tight leading-none">Property Gallery</h3>
                        <p className="text-xs text-base-content/40 font-bold uppercase tracking-widest mt-2">Managing: {adsDetail?.title}</p>
                    </div>
                </div>

                <div className="space-y-10">
                    <section>
                        <h4 className="text-sm font-black text-base-content/40 uppercase tracking-[0.2em] mb-6">Existing Assets</h4>
                        {propertyImages.length === 0 ? (
                            <div className="bg-base-200/50 p-10 rounded-3xl border border-dashed border-base-300 text-center">
                                <p className="text-base-content/30 font-bold italic text-sm">No images have been uploaded yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {propertyImages.map(image => (
                                    <div key={image.id} className="relative group aspect-square">
                                        <img src={image.image} alt="Property" className="w-full h-full object-cover rounded-[1.5rem] shadow-sm ring-1 ring-base-200" />
                                        <button 
                                            onClick={() => handleDelete(image.id)} 
                                            className="absolute top-3 right-3 bg-error text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 shadow-lg active:scale-90"
                                            title="Delete Image"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="pt-10 border-t border-base-200">
                        <h4 className="text-sm font-black text-base-content/40 uppercase tracking-[0.2em] mb-6">Append New Photos</h4>
                        <div className="space-y-6">
                            <div className="form-control">
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*"
                                    onChange={handleImageChange} 
                                    className="file-input file-input-bordered w-full rounded-2xl bg-base-200 border-base-200 font-bold h-14" 
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/40 font-bold uppercase tracking-widest">Select multiple high-quality JPGS or PNGs</span>
                                    {imageError && <span className="label-text-alt text-error font-black uppercase tracking-widest">{imageError}</span>}
                                </label>
                            </div>

                            {addImage.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-base-200/30 p-4 rounded-3xl border border-base-200">
                                    {addImage.map((image, index) => (
                                        <div key={index} className="aspect-square">
                                            <img src={image} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-sm opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-crosshair" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {upImage.length > 0 && (
                                <button 
                                    onClick={handleImageUpload} 
                                    disabled={loading}
                                    className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95 h-16"
                                >
                                    {loading ? <span className="loading loading-spinner"></span> : "Synchronize Gallery"}
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ManagePropertyImages;



