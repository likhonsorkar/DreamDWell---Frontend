// import { Link } from 'react-router';
// const Hero = () => {
//   return (
//     <section className="relative py-20 lg:py-32">
//       <div 
//         className="absolute inset-0 bg-cover bg-center" 
//         style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661761197559-58493b11151b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
//       ></div>
//       <div className="absolute inset-0 bg-black/50"></div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="max-w-3xl text-center mx-auto">
//           <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
//             Easy way to find your dream home
//           </span>
//           <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
//             Find the Perfect <span className="text-primary">Place</span> <br /> 
//             to Call Home.
//           </h1>
//           <p className="text-lg text-primary mb-10 max-w-xl mx-auto">
//             Browse from over 5,000+ curated listings ranging from cozy city apartments to luxury suburban houses.
//           </p>

//           <Link to="/property">
//             <button className="btn btn-lg bg-primary hover:bg-primary border-none text-white rounded-full px-10 shadow-lg shadow-primary/20">
//               Browse Listings
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Hero;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, Home, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    navigate(`/property?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10 }}
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
        }}
      ></motion.div>
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/20"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          
          {/* Status Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-content text-sm font-bold mb-8 shadow-xl shadow-primary/5"
          >
            <CheckCircle size={16} className="text-primary" />
            <span className="tracking-widest uppercase text-xs">Verified Listings Only</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter"
          >
            Find Your Next <br /> 
            <span className="text-primary italic relative">
              Perfect
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> Stay.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium opacity-90"
          >
            Discover 5,000+ hand-picked rental properties. From luxury villas to cozy bachelor pads, we have it all.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            variants={itemVariants}
            className="bg-base-100 p-3 rounded-[2rem] md:rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-3 max-w-4xl border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 px-6 w-full border-b md:border-b-0 md:border-r border-base-200 py-3">
              <MapPin size={22} className="text-primary shrink-0" />
              <input 
                type="text" 
                placeholder="Where are you looking?" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-base-content w-full font-bold text-lg"
              />
            </div>

            <div className="flex items-center gap-4 px-6 w-full py-3">
              <Home size={22} className="text-base-content/30 shrink-0" />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-base-content w-full cursor-pointer font-bold text-lg appearance-none"
              >
                <option value="">Category</option>
                <option value="family">Family House</option>
                <option value="Bachelor">Bachelor Seat</option>
                <option value="Sublet">Sublet Room</option>
                <option value="Office">Office Space</option>
                <option value="Hostel">Hostel</option>
                <option value="Shop">Retail Shop</option>
              </select>
            </div>

            <button 
              onClick={handleSearch}
              className="btn btn-primary rounded-full px-12 w-full md:w-auto h-16 text-xl font-black shadow-2xl shadow-primary/30 flex items-center gap-3"
            >
              Search <Search size={22} />
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center gap-8"
          >
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 ring-2 ring-primary/20 flex items-center justify-center text-sm font-black">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="rounded-full w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg">1,200+ Booked</span>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">In the last 24 hours</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;