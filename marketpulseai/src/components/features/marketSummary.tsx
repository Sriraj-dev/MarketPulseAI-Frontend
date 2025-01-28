"use client";
import { getLiveMarket } from "@/api/marketData";
import { LiveMarketData } from "@/models/marketModel";
import React, { useEffect, useState } from "react";


const MarketSummary = () => {
 const [liveData, setLiveData] = useState<LiveMarketData[]>([]); 

  useEffect(() => {
    const fetchStockSummary = async () => {
      try { 
        const data = await getLiveMarket();
        setLiveData(data); 
      } catch (error) {
        console.error("Error fetching stock summary:", error);
      }
    };

    fetchStockSummary();
  }, []);



  return (
    <div className="my-3 bg-backgroundImage pb-6 mx-auto">
    <div className="group flex overflow-hidden">
      <div className="animate-loop-scroll group-hover:paused flex space-x-14">
        {liveData.map((experience, index) => (
          <div className="w-32 h-fit border-[#4D5E7A] border rounded-xl" key={index}>
            <div className="flex flex-col py-2 px-3  font-semibold">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[13px] leading-3 text-muted-foreground">
                  {experience.name}
                </p>
                <span
                  className={`text-xs ${
                    experience.percent_change.toString().startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.percent_change.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xs">{experience.current_price.toFixed(0)}</p>
                <span
                  className={`text-xs ${
                  experience.price_change.toFixed(2).startsWith("+")
                    ? "text-secondary"
                    : "text-danger"
                  }`}
                >
                  {experience.price_change.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="animate-loop-scroll group-hover:paused flex space-x-14 ml-[calc(36px)]"
        aria-hidden="true"
      >
        {liveData.map((experience, index) => (
          <div className="w-32 h-fit border-[#4D5E7A] border rounded-xl" key={index}>
            <div className="flex flex-col py-2 px-3  font-semibold">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[13px] leading-3 text-muted-foreground">
                  {experience.name}
                </p>
                <span
                  className={`text-xs ${
                    experience.percent_change.toString().startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.percent_change.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xs">{experience.current_price.toFixed(0)}</p>
                <span
                  className={`text-xs ${
                  experience.price_change.toFixed(2).startsWith("+")
                    ? "text-secondary"
                    : "text-danger"
                  }`}
                >
                  {experience.price_change.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default MarketSummary;
