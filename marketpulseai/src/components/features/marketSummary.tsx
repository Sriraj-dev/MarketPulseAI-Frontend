'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";

const experienceData = [
  { name: "Nifty 50", value: "28,500", change: "+0.75%", delta: "+156.4" },
  { name: "Nifty 50", value: "28,500", change: "+0.75%", delta: "+156.4" },
  { name: "Nifty 50", value: "28,500", change: "+0.75%", delta: "+156.4" },
  { name: "Nifty 50", value: "28,500", change: "+0.75%", delta: "+156.4" },
  { name: "Sensex", value: "28,500", change: "+0.35%", delta: "+15.4" },
  { name: "Pharma", value: "9,500", change: "-0.25%", delta: "-100.5" },
  { name: "Fin Nifty", value: "15,432", change: "-0.50%", delta: "-250.4" },
];

const MarketSummary = () => {
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
          380: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          720: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4.6,
            spaceBetween: 30,
          },
        }}
      >
        {experienceData.map((experience, index) => (
          <SwiperSlide key={index}>
            <Card className="w-56">
              <CardContent className="flex flex-col p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">{experience.name}</p>
                  <span
                    className={`text-xs ${
                      experience.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {experience.change}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-2xl font-semibold">{experience.value}</p>
                  <span
                    className={`text-sm ${
                      experience.delta.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {experience.delta}
                  </span>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </>
  );
};

export default MarketSummary;
