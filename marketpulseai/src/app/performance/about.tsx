"use client";

import { StockRecommendation } from "@/models/marketModel";
import { useOhlcStore } from "@/stores/rootStore";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

export function CompanyDetails({ rec }: { rec: StockRecommendation }) {
  const key = `${rec.ticker}-${rec.dateofrecommendation}`;
  const { ohlcData, loadingStates, fetchOhlcData } = useOhlcStore();
  const pastData = ohlcData[key];
  const loading = loadingStates[key] ?? true;

  useEffect(() => {
    fetchOhlcData(rec.ticker, rec.dateofrecommendation);
  }, [rec.ticker, rec.dateofrecommendation, fetchOhlcData]);

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
