import React from "react";
import { RecommendationsTable } from "./recommendationTable";
import ApexChart from "@/components/features/candle";

const index = () => {

  const recommendations = [
    {
      name: "Adani Enterprises",
      recommendation: "Buy",
      suggestedOn: "2024-12-15",
      suggestedAt: "₹157.5",
      currentPrice: "₹172.4",
      source: "MoneyControl.com",
      description:
        "Adani Enterprises is a diversified company with interests in various sectors.",
    },
    {
      name: "Adani Enterprises",
      recommendation: "Buy",
      suggestedOn: "2024-12-15",
      suggestedAt: "₹157.5",
      currentPrice: "₹172.4",
      source: "MoneyControl.com",
      description:
        "Adani Enterprises is a diversified company with interests in various sectors.",
    },
    {
      name: "Adani Enterprises",
      recommendation: "Buy",
      suggestedOn: "2024-12-15",
      suggestedAt: "₹157.5",
      currentPrice: "₹172.4",
      source: "MoneyControl.com",
      description:
        "Adani Enterprises is a diversified company with interests in various sectors.",
    },
  ];

  return (
    <div className="container w-11/12 mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Past Performance</h2>
      <div className="flex flex-wrap gap-8">
  
      </div>

      <h2 className="text-2xl font-bold mb-6">All Recommendations</h2>
      <RecommendationsTable recommendations={recommendations} />
    </div>
  );
};

export default index;
