const FilterBar = ({ categories, filters, setFilters , onApply }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-xl border-b border-orange-50 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <div className="form-control w-full md:w-auto min-w-[160px]">
            <label className="label py-1"><span className="label-text-alt font-bold text-gray-400 uppercase">Category</span></label>
            <select 
                  value={filters.category} 
                  onChange={e => handleChange("category", e.target.value)} 
                  className="select select-bordered select-sm focus:outline-orange-500 border-orange-100">
              <option value='' selected>Pick Category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>))}
            </select>
          </div>
          <div className="form-control w-[45%] md:w-auto">
            <label className="label py-1"><span className="label-text-alt font-bold text-gray-400 uppercase">Bedrooms</span></label>
            <select 
                  value={filters.bedrooms}
                  onChange={e => handleChange("bedrooms", e.target.value)}
                  className="select select-bordered select-sm focus:outline-orange-500 border-orange-100">
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-control w-[45%] md:w-auto">
            <label className="label py-1"><span className="label-text-alt font-bold text-gray-400 uppercase">Bathrooms</span></label>
            <select 
              value={filters.bathrooms}
              onChange={e => handleChange("bathrooms", e.target.value)}
              className="select select-bordered select-sm focus:outline-orange-500 border-orange-100">
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-control w-full md:w-auto md:mt-6">
            <button onClick={onApply} className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white px-8 shadow-md shadow-orange-100">
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterBar;