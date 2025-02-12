'use client'
import React, { useEffect } from "react";
import { RecommendationsTable } from "./recommendationTable";
import Chartohlc from "./chart";
import { usePerformanceStore } from "@/stores/rootStore";

// Shimmer loader component remains the same
const ShimmerLoader = () => {
  return (
    <div className="space-y-6">
      <div className="w-full h-[30px] bg-gray-200 animate-pulse"></div>
      <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
    </div>
  );
};

const Performance = () => {
  const { pastData, loading, fetchStockSummary } = usePerformanceStore();

  useEffect(() => {
    fetchStockSummary();
  }, [fetchStockSummary]);

  return (
    <div className="w-11/12 mx-auto py-8">
      
      <h2 className="text-2xl font-bold mb-6">Past Performance</h2>
      {loading ? (
        <ShimmerLoader />
      ) : pastData && pastData.length > 0 ? (
        <Chartohlc pastData={pastData} />
      ) : (
        <p className="text-gray-500 text-lg">No recommendations available right now</p>
      )}
    
    
      <h2 className="text-2xl font-bold mt-8">All Recommendations</h2>
      {/* Add the disclaimer text here */}
      <p className="text-sm text-gray-600 mb-4">
        These suggestions are generated from the daily market news data using AI. Please 
        do your own research before investing in the market.
      </p>
      <RecommendationsTable />

    </div>
  );
};

export default Performance;
