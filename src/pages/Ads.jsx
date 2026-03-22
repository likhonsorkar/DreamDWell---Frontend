import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import FilterBar from '../components/FilterBar';
import ListingCards from '../components/ads/ListingCards';
import apiClient from '../services/api-client';
import Pagination from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { ListingCardSkeleton } from '../components/ads/Skeletons';
import { motion, AnimatePresence } from 'framer-motion';

const Ads = () => {
    const [searchParams] = useSearchParams();
    const [currentPages, setCurrentPages] = useState(1);
    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];
    const [filters, setFilters] = useState({
        category: searchParams.get("category") || "",
        bedrooms: "",
        bathrooms: "",
        search: searchParams.get("search") || "",
    });

    useEffect(() => {
        document.title = "Property List";
    }, []);

    const { data: properties, status, refetch } = useQuery({
        queryKey: ["ads", currentPages, filters],
        queryFn: async () => {
            const response = await apiClient.get(`/ads/?page=${currentPages}&category=${filters.category}&bedrooms=${filters.bedrooms}&bathrooms=${filters.bathrooms}&search=${filters.search}`);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
    });

    const totalPages = properties ? Math.ceil(properties.count / (properties.results.length || 10)) : 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <>
            <FilterBar 
                categories={PROPERTY_CATEGORIES} 
                setFilters={setFilters} 
                filters={filters} 
                onApply={() => { setCurrentPages(1); refetch(); }} 
            />
            
            <AnimatePresence mode="wait">
                {status === "pending" ? (
                    <motion.main 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4 py-8 flex-grow"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className="skeleton h-10 w-64"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <ListingCardSkeleton key={i} />
                            ))}
                        </div>
                    </motion.main>
                ) : status === "success" ? (
                    <motion.main 
                        key="content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="container mx-auto px-4 py-8 flex-grow"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-black text-base-content">
                                Available <span className="text-primary">Ads Listings</span>
                                <span className="ml-2 text-sm font-medium text-base-content/40">({properties.count} results)</span>
                            </h1>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {properties.results.length === 0 && (
                                <span className="text-base-content/60">No Ads Found</span>
                            )}
                            {properties.results.map(item => (
                                <motion.div key={item.id} variants={itemVariants}>
                                    <ListingCards data={item} />
                                </motion.div>
                            ))}
                        </div>
                        
                        <Pagination 
                            totalpages={totalPages} 
                            currentpage={currentPages} 
                            handlepagechange={setCurrentPages} 
                        />
                    </motion.main>
                ) : (
                    <motion.div 
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-red-500 font-bold">Failed to load ads. Please try again.</p>
                        <button onClick={() => refetch()} className="btn btn-sm mt-4 bg-primary text-white">Retry</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Ads;

