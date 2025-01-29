'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PastPerformance from "./pastPerformance";
import { getSuggestions } from "@/api/marketData";
import { StockRecommendation } from "@/models/marketModel";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(3); // To track how many recommendations to show

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getSuggestions();
        setRecommendations(data);
      } catch (error) {
        setError("Error fetching recommendations");
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 3); // Increment by 3
  };

  if (loading) {
    return (
      <div className="lg:w-[26rem] w-full mx-auto mb-8">
        <PastPerformance />
        <div className="bg-white mt-10">
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
         
          <div className="space-y-4">
            {/* Display loading skeleton */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-start gap-4 p-2">
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="flex items-start gap-4 p-2">
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter for weekly recommendations and slice based on displayCount
  const weeklyRecommendations = recommendations.filter((rec) => rec.type === "Weekly");
  const recommendationsToDisplay = weeklyRecommendations.slice(0, displayCount); // Slice based on displayCount

  return (
    <div className="lg:w-[26rem] w-full mx-auto mb-8">
      <PastPerformance />
      <div className="bg-white mt-10">
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
       
        <div className="space-y-4">
          {recommendationsToDisplay.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-2 "
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
                <p className=" text-gray-600 mt-2 sm:ml-6 ml-2">
                  {rec.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
        {recommendationsToDisplay.length < weeklyRecommendations.length && (
          <button
            onClick={loadMore}
            className="mt-4 bg-[#F6F6F6] text-xl text-black w-full px-4 py-2 "
          >
            <p className="flex m-auto justify-center"> Load More</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
