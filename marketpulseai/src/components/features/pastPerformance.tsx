'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import navigation styles
import { Navigation, FreeMode } from 'swiper/modules';
import dynamic from 'next/dynamic';
import { usePerformanceStore } from '@/stores/rootStore';

// Dynamically import ApexChart with ssr disabled
const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

const ShimmerLoader = () => (
  <div className="space-y-6">
    <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
  </div>
);

const PastPerformance = () => {
  const { pastData, loading, fetchStockSummary } = usePerformanceStore();

  useEffect(() => {
    fetchStockSummary();
  }, [fetchStockSummary]);

  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Past Performance</h3>
      {loading ? (
        <ShimmerLoader />
      ) : pastData.length > 0 ? (
        <Swiper
          freeMode={false}
          navigation={true}
          modules={[Navigation, FreeMode]}
          className="mySwiper"
          spaceBetween={20}
          slidesPerView={1}
        >
          {pastData.map((data, index) => (
            <SwiperSlide key={index} className="!w-full">
              <ApexChart ohlcData={data.Market_info.OHLC} details={data.DB_info} otherDetails={data.Market_info} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-lg">No recommendations available right now</p>
      )}
    </div>
  );
};

export default PastPerformance;
