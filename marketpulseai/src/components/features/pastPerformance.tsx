'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import navigation styles
import { Navigation, FreeMode } from 'swiper/modules';

import dynamic from 'next/dynamic';
import { getCredibility } from '@/api/marketData';
import {  StockCredibility } from '@/models/marketModel';

// Dynamically import ApexChart with ssr disabled
const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});


const PastPerformance = () => {

  const [pastData, setPastData] = useState<StockCredibility[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
     const fetchStockSummary = async () => {
       try { 
         const data = await getCredibility();
         setPastData(data.credible_stocks); 
         setLoading(false);
       } catch (error) {
         console.error("Error fetching stock summary:", error);
       }
     };
 
     fetchStockSummary();
   }, []);
 

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Past Performance</h3>
      <Swiper
        freeMode={false}
        navigation={true}
        modules={[Navigation, FreeMode]}
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={1}
      >
        {/* Pass the data to ApexChart */}
        {pastData.map((data, index) => (
          <SwiperSlide key={index} className="!w-full">
            <ApexChart ohlcData={data.Market_info.OHLC} details={data.DB_info} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PastPerformance;
