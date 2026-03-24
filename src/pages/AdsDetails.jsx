import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import ImageGallary from '../components/ads/ImageGallary';
import Review from '../components/reviews/Review';
import ReviewForm from '../components/reviews/ReviewForm';
import useAuthContext from '../hooks/useAuthContext';
import { BedDouble, Bath, Calendar, MapPin, Tag, CalendarDays, Building } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PropertyDetailSkeleton } from '../components/ads/Skeletons';
import { motion, AnimatePresence } from 'framer-motion';

const AdsDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { user, getAdDetails, getAdImages, getReviews, requestToRent } = useAuthContext();
    const queryClient = useQueryClient();

    const { data, status, refetch } = useQuery({
        queryKey: ['ad-details', id],
        queryFn: async () => {
            const detailsRes = await getAdDetails(id);
            if (!detailsRes) throw new Error("Failed to load property details");

            const imagesRes = await getAdImages(id);
            const reviewsRes = await getReviews(id);

            return {
                properties: detailsRes.data,
                images: imagesRes?.data?.results || [],
                reviews: reviewsRes?.data?.results || []
            };
        },
        enabled: !!id
    });

    const mutation = useMutation({
        mutationFn: () => requestToRent(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['ad-details', id]);
        }
    });

    useEffect(() => {
        if (data?.properties?.title) {
            document.title = data.properties.title;
        }
    }, [data]);

    if (status === "pending") {
        return <PropertyDetailSkeleton />;
    }

    if (status === "error") {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className='text-center m-2 text-error font-bold'>Failed to load property details.</div>
                <div className="text-center">
                    <button onClick={() => refetch()} className="btn btn-primary btn-sm mt-4">Retry</button>
                </div>
            </main>
        );
    }

    const { properties, images, reviews } = data;
    const isOwner = user && properties?.owner === user.id;

    return (
        <AnimatePresence>
            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="container mx-auto px-4 py-8"
            >
                <ImageGallary image={images} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-2 badge badge-lg bg-primary/10 text-primary border-none font-bold px-4 py-3 uppercase tracking-wider text-xs">
                                    <Tag size={14} /> {properties?.category}
                                </span>
                                <span className="text-sm font-medium text-base-content/40 inline-flex items-center gap-2"> 
                                    <CalendarDays size={14} /> Published on {new Date(properties?.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-base-content leading-tight">{properties?.title}</h1>
                            <p className="flex items-center gap-2 text-base-content/60 mt-4">
                                <MapPin size={20} className="text-primary" />
                                {properties?.address}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-primary/5 rounded-3xl border border-primary/20"
                        >
                            <div className="text-center flex flex-col items-center gap-2">
                                <BedDouble className="text-primary" size={28} />
                                <span className="block text-base-content font-bold">{properties?.bedrooms} Bedrooms</span>
                            </div>
                            <div className="text-center flex flex-col items-center gap-2">
                                <Bath className="text-primary" size={28} />
                                <span className="block text-base-content font-bold">{properties?.bathrooms} Bathrooms</span>
                            </div>
                            <div className="text-center flex flex-col items-center gap-2">
                                <Building className="text-primary" size={28} />
                                <span className="block text-base-content font-bold">{properties?.balcony} Balcony</span>
                            </div>
                            <div className="text-center flex flex-col items-center gap-2">
                                <Calendar className="text-primary" size={28} />
                                <span className="block text-base-content font-bold">From {new Date(properties?.avaiable_from).toLocaleDateString()}</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl font-bold text-base-content border-l-4 border-primary pl-4">Description</h3>
                            <p className="text-base-content/70 leading-relaxed text-lg">
                                {properties?.description}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-8 border-t border-base-200"
                        >
                            <Review reviews={reviews} adId={id} setReviews={(newReviews) => {
                                queryClient.setQueryData(['ad-details', id], (old) => ({ ...old, reviews: newReviews instanceof Function ? newReviews(old.reviews) : newReviews }));
                            }} />
                            {user ? (
                                <ReviewForm adId={id} setReviews={(newReviews) => {
                                    queryClient.setQueryData(['ad-details', id], (old) => ({ ...old, reviews: newReviews instanceof Function ? newReviews(old.reviews) : newReviews }));
                                }} />
                            ) : (
                                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 mt-8 text-center">
                                    <p className="text-base-content/80 font-medium">Please <Link to={`/login?next=${location.pathname}`} className="text-primary font-bold hover:underline">login</Link> to leave a review.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 p-8 bg-base-100 rounded-[2.5rem] border border-primary/10 shadow-[0_20px_60px_-15px_rgba(var(--color-primary),0.1)]">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-base-content/40 text-sm font-bold uppercase tracking-widest">Rent Price</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-primary">৳{properties?.rent}</span>
                                        <span className="text-base-content/60 font-medium">/{properties?.bill_time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between py-3 border-b border-base-200">
                                    <span className="text-base-content/60 font-medium">Advance Payment</span>
                                    <span className="text-base-content font-bold">৳{properties?.advance}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-base-200">
                                    <span className="text-base-content/60 font-medium">Electricity Bill</span>
                                    <span className="text-base-content font-bold">Not included</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {user && !isOwner && mutation.status !== 'success' && (
                                    <button
                                        onClick={() => mutation.mutate()}
                                        disabled={mutation.isPending}
                                        className="btn btn-lg bg-primary hover:bg-primary border-none text-white w-full rounded-2xl shadow-xl shadow-primary/20"
                                    >
                                        {mutation.isPending ? 'Sending Request...' : 'Request to Rent'}
                                    </button>
                                )}
                                {mutation.isSuccess && (
                                    <div className="bg-success/10 text-success p-3 rounded-xl text-center font-bold">
                                        Request Sent!
                                    </div>
                                )}
                                {mutation.isError && (
                                    <div className="bg-error/10 text-error p-3 rounded-xl text-center font-bold">
                                        Failed to Send Request.
                                    </div>
                                )}
                                {!user && (
                                    <div className="bg-primary/10 text-primary p-3 rounded-xl text-center font-bold">
                                        <Link to={`/login?next=${location.pathname}`} className="text-primary hover:underline">Login</Link> to request.
                                    </div>
                                )}
                                {isOwner && (
                                    <div className="bg-base-200 text-base-content/60 p-3 rounded-xl text-center font-bold">
                                        You own this property.
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    {properties?.contact_phone && <a href={`tel:${properties?.contact_phone}`} className="btn btn-outline border-primary/20 text-primary flex-1 rounded-xl">
                                        Call
                                    </a>}
                                    {properties?.contact_email && <a href={`mailto:${properties?.contact_email}`} className="btn btn-outline border-primary/20 text-primary flex-1 rounded-xl">
                                        Email
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </AnimatePresence>
    );
};

export default AdsDetails;
