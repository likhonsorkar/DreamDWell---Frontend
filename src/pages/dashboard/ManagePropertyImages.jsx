import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router';
import useAuthContext from '../../hooks/useAuthContext';
import { ImagePlus, Trash2 } from 'lucide-react';
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
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            navigate('/dashboard');
        }
    };
    useEffect(() => {
        const title = "Manage Images"
        document.title = title;
        setHeading(title);
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
        return <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>;
    }
    if (!adsDetail && !loading) {
        return <div className="text-center p-8">Property Images Not Found or Unauthorized</div>;
    }
    return (
        <div className="max-w-4xl mx-auto">
            {loading && (
                <div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>
            )}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">
                <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <ImagePlus className="text-orange-500" size={28}/>
                    <h3 className="text-2xl font-black text-gray-800">Manage Images for "{adsDetail?.title}"</h3>
                </div>

                <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4">Existing Images</h4>
                {propertyImages.length === 0 ? (
                    <p className="text-gray-500">No images uploaded for this property yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {propertyImages.map(image => (
                            <div key={image.id} className="relative group">
                                <img src={image.image} alt="Property" className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-100" />
                                <button 
                                    onClick={() => handleDelete(image.id)} 
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                                    title="Delete Image"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4 border-t border-gray-100 pt-6">Upload New Images</h4>
                <div>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageChange} 
                        className="file-input file-input-bordered w-full rounded-2xl bg-gray-50 border-gray-100" 
                    />
                    <p className="text-xs text-gray-400 mt-1 ml-2">You can select multiple photos.</p>
                    {imageError && <span className="text-red-500 text-xs mt-1 ml-2">{imageError}</span>}

                    {addImage.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {addImage.map((image, index) => (
                                <img key={index} src={image} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-100" />
                            ))}
                        </div>
                    )}
                    {upImage.length > 0 && (
                        <button 
                            onClick={handleImageUpload} 
                            className="btn bg-orange-500 hover:bg-orange-600 border-none text-white w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-orange-100 transition-all active:scale-95 mt-6"
                        >
                            Upload Images
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ManagePropertyImages;

