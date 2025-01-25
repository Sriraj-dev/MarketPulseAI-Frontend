'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";

// Dynamically import ApexChart with ssr disabled
const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

const Extra = () => {
  return (
    <div className="mb-8">
      <Swiper
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        spaceBetween={20} 
        slidesPerView="auto" 
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={index} className="flex justify-center !w-[400px]">
            <div className="w-[300px]"> {/* Adjust width as per your card size */}
              <ApexChart />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Extra;
