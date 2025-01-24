'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import ApexChart from "@/components/features/candle";

const Extra = () => {
  return (
    <>
    <div className="mb-8">
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
         
          <SwiperSlide >
                 <ApexChart />

          </SwiperSlide>
          <SwiperSlide >
                 <ApexChart />

          </SwiperSlide>
          <SwiperSlide >
                 <ApexChart />

          </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};

export default Extra;
