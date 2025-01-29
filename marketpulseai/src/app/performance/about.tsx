"use client";

import { getOhlcData } from "@/api/marketData";
import { StockOHLCResponse, StockRecommendation } from "@/models/marketModel";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

export function CompanyDetails({ rec }: { rec: StockRecommendation }) {
  const [pastData, setPastData] = useState<StockOHLCResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const data = await getOhlcData(rec.ticker, rec.dateofrecommendation);
        setPastData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock summary:", error);
      }
    };

    fetchStockSummary();
  }, [rec]);

  if (loading) {
    return (
      <div className="my-6 mx-4 p-2">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="flex flex-col gap-4 w-full">
            <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 mx-4 p-2">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="">
          <ApexChart
            ohlcData={pastData?.OHLC}
            details={rec}
            otherDetails={pastData}
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold my-4">Reason</h2>
          <p className="text-muted-foreground max-w-[40rem]">{rec.reason}</p>

          <a
            className="text-primary mt-2 hover:underline-offset-1 hover:underline"
            href={pastData?.yahooLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Know More
          </a>
        </div>
      </div>
    </div>
  );
}
