import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { ImagePlus, Trash2, AlertCircle } from 'lucide-react';
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
            console.log(`DEBUG: [ManageGallery] Fetching for Ad ID: ${id}`);
            const [adDetailsRes, imagesRes] = await Promise.all([
                getAdDetails(id),
                getAdImages(id)
            ]);

            if (!adDetailsRes || !adDetailsRes.data) {
                console.error("DEBUG: [ManageGallery] Ad Details missing");
                setLoading(false);
                return;
            }

            const adData = adDetailsRes.data.results ? adDetailsRes.data.results[0] : adDetailsRes.data;
            console.log("DEBUG: [ManageGallery] Ad Data:", adData);
            setAdsDetail(adData);

            // Handle paginated or direct array responses
            const imagesList = imagesRes.data.results || imagesRes.data;
            console.log("DEBUG: [ManageGallery] Images List:", imagesList);
            setPropertyImages(Array.isArray(imagesList) ? imagesList : []);

        } catch (err) {
            console.error("DEBUG: [ManageGallery] Critical Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const title = "Manage Gallery"
        document.title = title;
        setHeading(title);
        fetchAdAndImages();
    }, [id]); // Add id dependency

    useEffect(() => {
        if (adsDetail && user) {
            console.log("DEBUG: [ManageGallery] Auth Check:", { 
                user: user.id, 
                owner: adsDetail.owner,
                match: user.id == adsDetail.owner 
            });
            if (user.id != adsDetail.owner) {
                console.warn("DEBUG: [ManageGallery] Unauthorized Access Attempt");
                navigate('/dashboard');
            }
        }
    }, [adsDetail, user, navigate]);

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
        if(files.length > 0) setImageError(null);
    };

    const handleImageUpload = async () => {
        if (!upImage.length) return setImageError("Select images first");
        setLoading(true);
        try {
            await AddAdsImage(upImage, id);
        } catch (error) {
            console.error("DEBUG: [ManageGallery] Upload Error:", error);
            setImageError("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (imageId) => {
        if (!window.confirm("Delete this image?")) return;
        setLoading(true);
        try {
            await deleteAdImage(id, imageId);
        } catch (error) {
            console.error("DEBUG: [ManageGallery] Delete Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !adsDetail) return <GeneralFormSkeleton />;

    if (!adsDetail && !loading) {
        return (
            <div className="max-w-4xl mx-auto p-20 text-center bg-base-100 rounded-[3rem] border border-base-200">
                <AlertCircle className="mx-auto mb-4 text-base-content/20" size={48} />
                <p className="text-xl font-black text-base-content/40 uppercase tracking-tighter">Property Data Unavailable</p>
                <p className="text-xs text-base-content/20 mt-2">Check console for DEBUG logs</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-700">
            <div className="bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-base-200/50 border border-base-200">
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
                        <h4 className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-6">Existing Assets ({propertyImages.length})</h4>
                        {propertyImages.length === 0 ? (
                            <div className="bg-base-200/30 p-10 rounded-3xl border border-dashed border-base-200 text-center">
                                <p className="text-base-content/30 font-bold italic text-sm">No images found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {propertyImages.map(image => (
                                    <div key={image.id} className="relative group aspect-square">
                                        <img src={image.image} alt="" className="w-full h-full object-cover rounded-2xl shadow-sm ring-1 ring-base-200" />
                                        <button onClick={() => handleDelete(image.id)} className="absolute top-3 right-3 bg-error text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all shadow-lg"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="pt-10 border-t border-base-200">
                        <h4 className="text-[10px] font-black text-base-content/40 uppercase tracking-widest mb-6">Append New Photos</h4>
                        <div className="space-y-6">
                            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full rounded-2xl bg-base-200/50 border-none h-14 font-bold" />
                            {addImage.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-base-200/20 p-4 rounded-3xl">
                                    {addImage.map((image, index) => (
                                        <img key={index} src={image} alt="" className="aspect-square w-full object-cover rounded-xl opacity-60" />
                                    ))}
                                </div>
                            )}
                            {upImage.length > 0 && (
                                <button onClick={handleImageUpload} disabled={loading} className="btn btn-lg bg-primary hover:bg-primary-focus border-none text-white w-full rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all h-16">
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
