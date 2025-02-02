"use client";
import { useLiveMarketStore } from "@/stores/rootStore";
import React, { useEffect } from "react";

const MarketSummary = () => {
  const { liveData, fetchLiveMarket } = useLiveMarketStore();

  useEffect(() => {
    fetchLiveMarket();

    // Optional: Add auto-refresh every 30 seconds
    const interval = setInterval(fetchLiveMarket, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveMarket]);

  return (
    <div className="my-3 bg-backgroundImage pb-6 mx-auto">
      <div className="group flex overflow-hidden">
        <div className="animate-loop-scroll group-hover:paused flex space-x-14">
          {liveData.map((experience, index) => (
            <div
              className="w-32 h-fit border-[#4D5E7A] border rounded-xl"
              key={index}
            >
              <div className="flex flex-col py-2 px-3  font-semibold">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[13px] leading-3 text-muted-foreground">
                    {experience.name}
                  </p>
                  <span
                    className={`text-xs ${
                      experience.percent_change.toString().startsWith("-")
                        ? "text-danger"
                        : "text-secondary"
                    }`}
                  >
                    {experience.percent_change.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs">
                    {experience.current_price.toFixed(0)}
                  </p>
                  <span
                    className={`text-xs ${
                      experience.price_change.toFixed(2).startsWith("-")
                        ? "text-danger"
                        : "text-secondary"
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
            <div
              className="w-32 h-fit border-[#4D5E7A] border rounded-xl"
              key={index}
            >
              <div className="flex flex-col py-2 px-3  font-semibold">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[13px] leading-3 text-muted-foreground">
                    {experience.name}
                  </p>
                  <span
                    className={`text-xs ${
                      experience.percent_change.toString().startsWith("-")
                        ? "text-danger"
                        : "text-secondary"
                    }`}
                  >
                    {experience.percent_change.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs">
                    {experience.current_price.toFixed(0)}
                  </p>
                  <span
                    className={`text-xs ${
                      experience.price_change.toFixed(2).startsWith("-")
                        ? "text-danger"
                        : "text-secondary"
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
