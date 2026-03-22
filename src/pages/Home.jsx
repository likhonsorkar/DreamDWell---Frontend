import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { motion } from "framer-motion";

// Components
import Hero from "../components/Hero";
import FeaturedListings from "../components/FeaturedListings";
import CategoryTabs from "../components/ads/CategoryTabs";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASections";

const Home = () => {
  useEffect(() => {
    document.title = "House For Rent | Find Your Perfect Home";
  }, []);

  const { data, status, refetch } = useQuery({
    queryKey: ["home-data"],
    queryFn: async () => {
      const [allads, family, bachelor, sublet] = await Promise.all([
        apiClient.get("/ads/"),
        apiClient.get("/ads/?category=family"),
        apiClient.get("/ads/?category=Bachelor"),
        apiClient.get("/ads/?category=Sublet")
      ]);

      return {
        recentAds: allads.data.results.slice(0, 6),
        categoriesData: {
          family: family.data.results.slice(0, 3),
          bachelor: bachelor.data.results.slice(0, 3),
          sublet: sublet.data.results.slice(0, 3)
        }
      };
    }
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-base-100 flex flex-col overflow-x-hidden">
      <Hero />

      {/* --- Section: Recent Ads --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-12 md:py-24"
      >
        <div className="container mx-auto px-4">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
                Explore <span className="text-primary">Recent Ads</span>
              </h2>
              <p className="text-base-content/50 mt-3 text-lg font-medium max-w-xl">
                The latest hand-picked properties added to our platform. Hand-verified for your peace of mind.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-full px-8 shadow-xl shadow-primary/20"
            >
              Explore All Listings
            </motion.button>
          </header>

          {status === "pending" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex flex-col gap-5 w-full">
                  <div className="skeleton h-64 w-full rounded-[2.5rem]"></div>
                  <div className="skeleton h-6 w-32 rounded-lg"></div>
                  <div className="skeleton h-4 w-full rounded-lg"></div>
                  <div className="skeleton h-4 w-3/4 rounded-lg"></div>
                </div>
              ))}
            </div>
          )}

          {status === "success" && (
            <FeaturedListings properties={data.recentAds} />
          )}

          {status === "error" && (
            <div className="bg-error/5 border border-error/10 rounded-[3rem] p-16 text-center max-w-3xl mx-auto shadow-2xl">
              <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-2xl font-black mb-4">Connection Lost</h3>
              <p className="text-base-content/60 max-w-md mx-auto leading-relaxed">We couldn't reach the server to fetch the latest listings. Please check your network and try again.</p>
              <button onClick={() => refetch()} className="btn btn-primary mt-10 rounded-2xl px-12 h-14 font-bold shadow-xl shadow-primary/20">Retry Connection</button>
            </div>
          )}
        </div>
      </motion.section>

      {/* --- Section: Category Tabs --- */}
      {status === "success" && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="bg-base-200/40 py-24 relative overflow-hidden"
        >
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Find by <span className="text-primary">Category</span></h2>
               <p className="text-base-content/50 font-medium">Browse properties tailored to your specific lifestyle and requirements.</p>
               <div className="w-24 h-1.5 bg-primary/30 mx-auto rounded-full mt-6"></div>
            </div>
            <CategoryTabs data={data.categoriesData} />
          </div>
        </motion.section>
      )}

      {/* Other Info Sections with scroll animations */}
      <ScrollSection><HowItWorks /></ScrollSection>
      <ScrollSection><WhyChooseUs /></ScrollSection>
      <ScrollSection><CTASection /></ScrollSection>
    </main>
  );
};

const ScrollSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default Home;