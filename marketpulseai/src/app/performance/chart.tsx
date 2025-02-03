'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import {  StockCredibility } from "@/models/marketModel";

// Dynamically import ApexChart with ssr disabled
const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

const Chartohlc = ({ pastData }: { pastData: StockCredibility[] }) => {

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
        {pastData.map((data, index) => (
          <SwiperSlide key={index} className="flex justify-center !w-[400px]">
            <div className="w-[300px]">
            <ApexChart ohlcData={data.Market_info.OHLC} details={data.DB_info}  otherDetails={data.Market_info}/> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Chartohlc;
