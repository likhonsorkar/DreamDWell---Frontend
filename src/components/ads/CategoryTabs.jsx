import { useState } from 'react';
import FeaturedListings from '../FeaturedListings';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState('family');
    const tabs = [
        { id: 'family', label: 'Family Houses' },
        { id: 'bachelor', label: 'Bachelor Mess' },
        { id: 'sublet', label: 'Sublet Rooms' },
    ];

    return (
        <section className="py-12 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-base-100 p-1.5 rounded-[2rem] shadow-xl border border-base-200 relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
                                    activeTab === tab.id ? "text-white" : "text-base-content/40 hover:text-base-content"
                                }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-20">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {data[activeTab] && data[activeTab].length > 0 ? (
                            <FeaturedListings properties={data[activeTab]} />
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <p className="text-xl font-bold text-base-content/30 uppercase tracking-tighter">No listings in this category yet</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default CategoryTabs;
