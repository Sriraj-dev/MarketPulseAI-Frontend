'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import navigation styles
import { Navigation , FreeMode } from 'swiper/modules';

import dynamic from 'next/dynamic';

// Dynamically import ApexChart with ssr disabled
const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});


const PastPerformance = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Recommendations</h3>
      <Swiper
      freeMode={false}
        navigation={true}
        modules={[Navigation , FreeMode]} 
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={1}
      >
     <SwiperSlide className="!w-full "><ApexChart /></SwiperSlide>
        <SwiperSlide className="!w-full "><ApexChart /></SwiperSlide>
        <SwiperSlide className="!w-full "><ApexChart /></SwiperSlide>
      </Swiper>

 
    </div>
  );
};

export default PastPerformance;
