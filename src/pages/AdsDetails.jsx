import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import ImageGallary from '../components/ads/ImageGallary';
import Review from '../components/reviews/Review';
import ReviewForm from '../components/reviews/ReviewForm';
import useAuthContext from '../hooks/useAuthContext';
import { BedDouble, Bath, Calendar, MapPin, Tag, CalendarDays, Building } from 'lucide-react';
const AdsDetails = () => {
    const {id} = useParams();
    const location = useLocation();
    const [status, setStatus] = useState('wait');
    const [properties, setProperties] = useState();
    const [images, setImages] = useState();
    const [reviews, setReviews] = useState([]);
    const [requestStatus, setRequestStatus] = useState('');
    const { user, getAdDetails, getAdImages, getReviews, requestToRent } = useAuthContext(); 
    const fetchData = async () => {
        setStatus('wait');
        try {
            const [detailsRes, imagesRes, reviewsRes] = await Promise.all([
                getAdDetails(id),
                getAdImages(id),
                getReviews(id)
            ]);
            if (detailsRes) {
                setProperties(detailsRes.data);
                setImages(imagesRes ? imagesRes.data : []);
                setReviews(reviewsRes ? reviewsRes.data : []);
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };
    useEffect(() => {
        fetchData();
    }, [id, user]);
    if (properties){
      document.title = properties?.title;
    }
    const handleRequestToRent = async () => {
        if (!user) {
            return;
        }
        setRequestStatus('sending');
        const response = await requestToRent(id);
        if (response) {
            setRequestStatus('sent');
        } else {
            setRequestStatus('error');
        }
    };
    const isOwner = user && properties?.owner === user.id;
    return (
      <main className="container mx-auto px-4 py-8">
        {status === "wait" && (<div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>)}
        {status === "error" && (<div className='text-center m-2 text-red-500 font-bold'>Failed to load property details.</div>)}
        {status === "success" && (
          <>
            <ImageGallary image={images}/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 badge badge-lg bg-orange-100 text-orange-600 border-none font-bold px-4 py-3 uppercase tracking-wider text-xs">
                      <Tag size={14} /> {properties?.category}
                    </span>
                    <span className="text-sm font-medium text-gray-400 inline-flex items-center gap-2"> <CalendarDays size={14} /> Published on {new Date(properties?.created_at).toLocaleDateString()}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">{properties?.title}</h1>
                  <p className="flex items-center gap-2 text-gray-500 mt-4">
                    <MapPin size={20} className="text-orange-500" />
                    {properties?.address}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-orange-50/50 rounded-3xl border border-orange-100">
                  <div className="text-center flex flex-col items-center gap-2">
                    <BedDouble className="text-orange-500" size={28}/>
                    <span className="block text-gray-800 font-bold">{properties?.bedrooms} Bedrooms</span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <Bath className="text-orange-500" size={28}/>
                    <span className="block text-gray-800 font-bold">{properties?.bathrooms} Bathrooms</span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <Building className="text-orange-500" size={28}/>
                    <span className="block text-gray-800 font-bold">{properties?.balcony} Balcony</span>
                  </div>
                  <div className="text-center flex flex-col items-center gap-2">
                    <Calendar className="text-orange-500" size={28}/>
                    <span className="block text-gray-800 font-bold">From {new Date(properties?.avaiable_from).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {properties?.description}
                  </p>
                </div>
                <div className="pt-8 border-t border-gray-100">
                  <Review reviews={reviews} adId={id} setReviews={setReviews} />
                  {user ? (
                      <ReviewForm adId={id} setReviews={setReviews} />
                  ) : (
                      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mt-8 text-center">
                          <p className="text-gray-700 font-medium">Please <Link to={`/login?next=${location.pathname}`} className="text-orange-600 font-bold hover:underline">login</Link> to leave a review.</p>
                      </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-8 bg-white rounded-[2.5rem] border border-orange-100 shadow-[0_20px_60px_-15px_rgba(255,165,0,0.1)]">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Rent Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-orange-600">৳{properties?.rent}</span>
                        <span className="text-gray-500 font-medium">/{properties?.bill_time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-3 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Advance Payment</span>
                      <span className="text-gray-800 font-bold">৳{properties?.advance}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Electricity Bill</span>
                      <span className="text-gray-800 font-bold">Not included</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {user && !isOwner && requestStatus !== 'sent' && (
                        <button
                            onClick={handleRequestToRent}
                            disabled={requestStatus === 'sending'}
                            className="btn btn-lg bg-orange-500 hover:bg-orange-600 border-none text-white w-full rounded-2xl shadow-xl shadow-orange-100"
                        >
                            {requestStatus === 'sending' ? 'Sending Request...' : 'Request to Rent'}
                        </button>
                    )}
                    {requestStatus === 'sent' && (
                         <div className="bg-green-50 text-green-700 p-3 rounded-xl text-center font-bold">
                            Request Sent!
                         </div>
                    )}
                    {requestStatus === 'error' && (
                         <div className="bg-red-50 text-red-700 p-3 rounded-xl text-center font-bold">
                            Failed to Send Request.
                         </div>
                    )}
                    {!user && ( 
                        <div className="bg-orange-50 text-orange-700 p-3 rounded-xl text-center font-bold">
                            <Link to={`/login?next=${location.pathname}`} className="text-orange-600 hover:underline">Login</Link> to request.
                        </div>
                    )}
                    {isOwner && ( 
                        <div className="bg-gray-100 text-gray-700 p-3 rounded-xl text-center font-bold">
                            You own this property.
                        </div>
                    )}
                    <div className="flex gap-2">
                      {properties?.contact_phone && <a href={`tel:${properties?.contact_phone}`} className="btn btn-outline border-orange-200 text-orange-600 flex-1 rounded-xl">
                        Call
                      </a>}
                      {properties?.contact_email && <a href={`mailto:${properties?.contact_email}`} className="btn btn-outline border-orange-200 text-orange-600 flex-1 rounded-xl">
                        Email
                      </a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    );
};

export default AdsDetails;