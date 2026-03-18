import { useState } from 'react';
import FeaturedListings from '../FeaturedListings';
const CategoryTabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState('family');
    const tabs = [
        { id: 'family', label: 'Family Houses' },
        { id: 'bachelor', label: 'Bachelor Mess' },
        { id: 'sublet', label: 'Sublet Rooms' },
    ];
    return (
        <section className="py-5 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Find by Category</h2>
                    <div className="flex justify-center gap-2 mt-6 bg-gray-100 p-1 rounded-2xl w-fit mx-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-xl font-bold transition-all ${
                                    activeTab === tab.id 
                                    ? "bg-orange-500 text-white shadow-lg" 
                                    : "text-gray-500 hover:text-orange-500"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-8 transition-opacity duration-300">
                    {data[activeTab].length > 0 ? (
                        <FeaturedListings properties={data[activeTab]} />
                    ) : (
                        <p className="text-center text-gray-400 py-10">No listings found in this category.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
export default CategoryTabs;