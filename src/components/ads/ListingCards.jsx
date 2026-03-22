import { Link } from 'react-router';
import { BedDouble, Bath, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ListingCards = ({data}) => {
    return (
        <Link to={`/property/${data.id}`}>
            <motion.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden rounded-[2rem]"
            >
                <figure className="relative h-64 overflow-hidden">
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={data.images?.[0]?.image || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800"} 
                        alt={data.title} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                        {data.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40">
                        ৳{data.rent}<span className="text-[10px] font-bold opacity-70 ml-1">/{data.bill_time === "monthly" ? "MO" : "YR"}</span>
                    </div>
                </figure>
                <div className="card-body p-6">
                    <div className="flex items-center gap-1.5 text-base-content/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                        <MapPin size={12} className="text-primary" />
                        <span className="line-clamp-1">{data.address}</span>
                    </div>
                    
                    <h2 className="card-title text-xl font-black text-base-content leading-tight group-hover:text-primary transition-colors">
                        {data.title}
                    </h2>
                    
                    <p className="text-base-content/60 text-sm mt-3 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                        {data.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-base-200">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-base-content/70 font-bold text-xs bg-base-200/50 px-3 py-1.5 rounded-xl">
                                <BedDouble size={14} className="text-primary"/>
                                {data.bedrooms}
                            </div>
                            <div className="flex items-center gap-2 text-base-content/70 font-bold text-xs bg-base-200/50 px-3 py-1.5 rounded-xl">
                                <Bath size={14} className="text-primary"/>
                                {data.bathrooms}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-base-content/30 uppercase">
                            <Calendar size={12} />
                            {new Date(data.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ListingCards;
