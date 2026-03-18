import { useEffect, useState } from "react";
import CTASection from "../components/CTASections";
import FeaturedListings from "../components/FeaturedListings";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import apiClient from "../services/api-client";
import CategoryTabs from "../components/ads/CategoryTabs";
const Home = () => {
    const [recentAds, setRecentAds] = useState([]);
    const [categoriesData, setCategoriesData] = useState({
        family: [],
        bachelor: [],
        sublet: []
    });
    const [status, setStatus] = useState("wait");
    const query = async() => {
        try{
            const allads = await apiClient.get("/ads/");
            const family = await apiClient.get("/ads/?category=family");
            const bachelor = await apiClient.get("/ads/?category=Bachelor");
            const sublet = await  apiClient.get("/ads/?category=Sublet");
            setCategoriesData({
                family: family.data.results.slice(0, 3),
                bachelor: bachelor.data.results.slice(0, 3),
                sublet: sublet.data.results.slice(0, 3)
            });
            setRecentAds(allads.data.results.slice(0, 6));
            setStatus("success");
        }catch(error){
            setStatus("error");
            console.log(error);
        }
    }
    useEffect(()=>{
      const title = "House For Rent | find your home";
      document.title = title;
      query();
    }, [])
    return (
    <main className="flex-grow">
        <Hero/>
        {status == "wait" && (<div className='text-center m-2'><span className="loading loading-bars loading-xl text-orange-500"></span></div>)}
        {status === "success" && (
                <>
                    <section className="py-5">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-between items-end mb-1">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">Recent Ads</h2>
                                    <p className="text-gray-500">Discover the latest listings added today</p>
                                </div>
                                <button className="text-orange-600 font-bold hover:underline">View All</button>
                            </div>
                            <FeaturedListings properties={recentAds} />
                        </div>
                    </section>
                    <CategoryTabs data={categoriesData} />
                </>
            )}
            {status === "error" && (
                <div className="text-center py-20">
                    <p className="text-red-500 font-bold">Failed to load data. Please try again.</p>
                    <button onClick={query} className="btn btn-sm mt-4 bg-orange-500 text-white">Retry</button>
                </div>
            )}
        <WhyChooseUs />
        <HowItWorks />
        <CTASection />
      </main>
    );
};

export default Home;