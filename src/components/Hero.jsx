import { Link } from 'react-router';
const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661761197559-58493b11151b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest mb-4">
            Easy way to find your dream home
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Find the Perfect <span className="text-orange-400">Place</span> <br /> 
            to Call Home.
          </h1>
          <p className="text-lg text-orange-50 mb-10 max-w-xl mx-auto">
            Browse from over 5,000+ curated listings ranging from cozy city apartments to luxury suburban houses.
          </p>

          <Link to="/property">
            <button className="btn btn-lg bg-orange-500 hover:bg-orange-600 border-none text-white rounded-full px-10 shadow-lg shadow-orange-500/20">
              Browse Listings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;