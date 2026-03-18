import { Link } from 'react-router';
const CTASection = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="bg-orange-600 rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">List your property with us today!</h2>
            <p className="text-orange-100 text-lg">Reach thousands of potential renters and get the best market value for your property.</p>
          </div>
          <Link to="/login?next=/dashboard" className="btn bg-white hover:bg-orange-50 border-none text-orange-600 btn-lg rounded-full px-12 shadow-2xl font-black">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CTASection;