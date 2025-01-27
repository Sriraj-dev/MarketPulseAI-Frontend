'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PastPerformance from "./pastPerformance";
import { getStocksummary } from "@/api/marketData";
import { StockRecommendation, StockSummaryResponse } from "@/models/marketModel";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
      const fetchRecommendations = async () => {
          try {
              const data: StockSummaryResponse = await getStocksummary();
              const allRecommendations = data.market_analysis.flatMap(analysis => analysis.data.recommendations);
              setRecommendations(allRecommendations);
          } catch (error) {
              setError("Error fetching recommendations");
              console.error("Error details:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="lg:w-[26rem] w-full mx-auto mb-8">
      <div className="bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recommendations</h3>
          <Link
            className="text-sm text-blue-600 underline underline-offset-4"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            href="/performance"
          >
            See All
          </Link>
        </div>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="space-y-4">
          {recommendations.map((rec , index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-2 hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="flex sm:justify-between sm:flex-row flex-col gap-2 sm:gap-0 sm:items-center items-start">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-base">
                      {" "}
                      <span>{index + 1} . </span>
                      {rec.name}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-2xl text-xs font-medium ${
                        rec.recommendation === "Buy"
                          ? "bg-secondary text-white"
                          : "bg-danger text-white"
                      }`}
                    >
                      {rec.recommendation}
                    </span>
                  </div>
                  <button className="bg-primary rounded-full text-white text-xs px-4 py-1">
                   {rec.source}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2 sm:ml-6 ml-2">
                  {rec.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PastPerformance />
    </div>
  );
};

export default Recommendations;
