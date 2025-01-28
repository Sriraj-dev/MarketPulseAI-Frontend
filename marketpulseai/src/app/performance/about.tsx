"use client";

import { getOhlcData } from "@/api/marketData";
import { StockOHLCResponse, StockRecommendation } from "@/models/marketModel";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator
  }
  console.log(rec, "pastData", pastData);

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
          <h2 className="text-2xl font-bold my-4">About</h2>
          <p className="text-muted-foreground max-w-[40rem]">{rec.reason}</p>

          <a
            className="text-primary mt-2"
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
