import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
const ImageGallary = ({ image }) => {
    const containerStyle = "w-full max-w-5xl mx-auto h-[350px] md:h-[500px] bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm";
    if (!image || image.length === 0) {
        return (
            <div className={containerStyle}>
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <p className="font-medium">No images available for this property</p>
                </div>
            </div>
        );
    }
    return (
        <div className={containerStyle}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'} 
                spaceBetween={0}
                slidesPerView={1}
                navigation={true} 
                pagination={{ clickable: true, dynamicBullets: true }} 
                autoplay={{ delay: 3000, disableOnInteraction: false }} 
                className="w-full h-full rounded-[2rem]"
            >
                {image.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full group">
                            <img 
                                src={img?.image} 
                                alt={`Property ${index}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/5" />
                            <div className="absolute top-6 right-6 bg-black/40 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20">
                                {index + 1} / {image.length}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageGallary;