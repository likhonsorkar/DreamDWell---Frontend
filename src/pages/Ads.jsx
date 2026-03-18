import { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar';
import ListingCards from '../components/ads/ListingCards';
import apiClient from '../services/api-client';
import Pagination from '../components/Pagination';
const Ads = () => {
    const [properties, setProperties] = useState({
                    count: 0,
                    next: null,
                    previous: null,
                    results: []
                    });
    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);
    const PROPERTY_CATEGORIES = [
        { value: "family", label: "Family" },
        { value: "Bachelor", label: "Bachelor" },
        { value: "Sublet", label: "Sublet" },
        { value: "Office", label: "Office" },
        { value: "Hostel", label: "Hostel" },
        { value: "Shop", label: "Shop" },
    ];
    const [status, setStatus] = useState("wait");
    const [filters, setFilters] = useState({
        category: "",
        bedrooms: "",
        bathrooms: "",
    });
    useEffect(() =>{
        const title = "Property List";
        document.title = title;
        query();
        }
         ,[currentPages]);
    const query = async() => {
            try{
                const response = await apiClient.get(`/ads/?page=${currentPages}&category=${filters.category}&bedrooms=${filters.bedrooms}&bathrooms=${filters.bathrooms}`);
                setStatus("success");
                setProperties(response.data);
                setTotalPages(Math.ceil(response.data.count / response.data.results.length));
            }catch(error){
                setStatus("error");
            }
    }
    return (
            <>
            <FilterBar categories={PROPERTY_CATEGORIES} setFilters={setFilters} filters={filters} onApply={() => {setCurrentPages(1); query(); console.log(filters); setStatus("wait") } }/>
            {status == "wait" && (<div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>)}
            {status == "success" && (
                <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-gray-800">
                    Available <span className="text-orange-500">Ads Listings</span>
                    <span className="ml-2 text-sm font-medium text-gray-400">({properties.count} results)</span>
                </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.results.length == 0 && (<span>No Ads Found</span>)}
                {properties.results.map(item => (
                    <ListingCards key={item.id} data={item}/>
                ))}
                </div>
                <Pagination totalpages = {totalPages} currentpage = {currentPages} handlepagechange = {setCurrentPages} setloading={setStatus}/>
            </main>
            )}
        </>
    );
};
export default Ads;