import { Search, Home, BedDouble, Bath, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterBar = ({ categories, filters, setFilters, onApply }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      bedrooms: "",
      bathrooms: "",
      search: "",
    });
  };

  return (
    <div className="sticky top-[80px] z-40 bg-base-100/60 backdrop-blur-2xl border-b border-base-200 py-6 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          
          {/* Header/Title for Filters on Mobile */}
          <div className="flex items-center gap-2 lg:hidden w-full mb-2">
            <Filter size={18} className="text-primary" />
            <span className="text-sm font-black uppercase tracking-widest text-base-content/60">Quick Filters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row flex-1 items-end gap-4 w-full">
            
            {/* Search Input */}
            <div className="form-control w-full lg:flex-1">
              <label className="label py-1">
                <span className="label-text-alt font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                  <Search size={12} /> Location Search
                </span>
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Where are you looking?" 
                  value={filters.search} 
                  onChange={e => handleChange("search", e.target.value)} 
                  className="input input-bordered w-full bg-base-100/50 border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl h-12 font-bold" 
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="form-control w-full lg:w-60">
              <label className="label py-1">
                <span className="label-text-alt font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                  <Home size={12} /> Property Type
                </span>
              </label>
              <select 
                value={filters.category} 
                onChange={e => handleChange("category", e.target.value)} 
                className="select select-bordered w-full bg-base-100/50 border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl h-12 font-bold"
              >
                <option value="">Any Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="form-control w-full lg:w-40">
              <label className="label py-1">
                <span className="label-text-alt font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                  <BedDouble size={12} /> Bedrooms
                </span>
              </label>
              <select 
                value={filters.bedrooms}
                onChange={e => handleChange("bedrooms", e.target.value)}
                className="select select-bordered w-full bg-base-100/50 border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl h-12 font-bold"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div className="form-control w-full lg:w-40">
              <label className="label py-1">
                <span className="label-text-alt font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                  <Bath size={12} /> Bathrooms
                </span>
              </label>
              <select 
                value={filters.bathrooms}
                onChange={e => handleChange("bathrooms", e.target.value)}
                className="select select-bordered w-full bg-base-100/50 border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl h-12 font-bold"
              >
                <option value="">Any</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3+ Baths</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto lg:mt-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onApply} 
              className="btn btn-primary flex-1 lg:flex-none lg:px-8 h-12 rounded-2xl text-white font-black shadow-xl shadow-primary/20 border-none"
            >
              Show Results
            </motion.button>
            
            <button 
              onClick={clearFilters}
              className="btn btn-ghost btn-square h-12 w-12 rounded-2xl bg-base-200/50 hover:bg-error/10 hover:text-error border-none transition-all"
              title="Clear All Filters"
            >
              <X size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;