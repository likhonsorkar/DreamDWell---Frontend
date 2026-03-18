import { Link } from 'react-router';
import { BedDouble, Bath } from 'lucide-react';

const ListingCards = ({data}) => {
    return (
        <Link to={`/property/${data.id}`}>
        <div className="card bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-lg">
            <figure className="relative h-56">
                <img src={data.images?.[0]?.image || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800"} alt={data.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-white/50">
                {data.category.toUpperCase()}
                </div>
                <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-lg font-black text-lg">
                ৳{data.rent}<span className="text-xs font-normal opacity-80">/{data.bill_time.toUpperCase()}</span>
                </div>
            </figure>
            <div className="card-body p-5">
                    <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-1">
                    {data.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1 h-10 overflow-hidden">
                        {data.description}
                    </p>
                    <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                            <BedDouble size={16} className="text-orange-500"/>
                            {data.bedrooms} Beds
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                            <Bath size={16} className="text-orange-500"/>
                            {data.bathrooms} Baths
                        </div>
                    </div>
            </div>
        </div>
        </Link>
    );
};
export default ListingCards;