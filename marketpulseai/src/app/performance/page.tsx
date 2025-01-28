'use client'
import React, { useEffect, useState } from "react";
import { RecommendationsTable } from "./recommendationTable";
import Chartohlc from "./chart";
import { getCredibility } from "@/api/marketData";
import { StockCredibility } from "@/models/marketModel";

const Performance = () => {

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
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Past Performance</h2>
      <Chartohlc pastData={pastData} /> 
      <div className="flex flex-wrap gap-8">
  
      </div>

      <h2 className="text-2xl font-bold mb-6">All Recommendations</h2>
      <RecommendationsTable  />
    </div>
  );
};

export default Performance;
