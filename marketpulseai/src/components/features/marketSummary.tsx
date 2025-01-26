"use client";
import React from "react";
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
    <div className="my-6 bg-backgroundImage pb-6 mx-auto">
    <div className="group flex overflow-hidden">
      <div className="animate-loop-scroll group-hover:paused flex space-x-14">
        {experienceData.map((experience, index) => (
          <div className="w-36 h-fit border-[#4D5E7A] border rounded-xl" key={index}>
            <div className="flex flex-col p-3 font-semibold">
              <div className="flex justify-between items-center mb-2">
                <p className="text-base leading-5 text-muted-foreground">
                  {experience.name}
                </p>
                <span
                  className={`text-xs ${
                    experience.change.startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.change}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xs">{experience.value}</p>
                <span
                  className={`text-xs ${
                    experience.delta.startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.delta}
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
        {experienceData.map((experience, index) => (
          <div className="w-36 h-fit border-[#4D5E7A] border rounded-xl" key={index}>
            <div className="flex flex-col p-3 font-semibold">
              <div className="flex justify-between items-center mb-2">
                <p className="text-base leading-5 text-muted-foreground">
                  {experience.name}
                </p>
                <span
                  className={`text-xs ${
                    experience.change.startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.change}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xs">{experience.value}</p>
                <span
                  className={`text-xs ${
                    experience.delta.startsWith("+")
                      ? "text-secondary"
                      : "text-danger"
                  }`}
                >
                  {experience.delta}
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
