"use client";
import { formatNumber } from "@/lib/numberformat";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  ohlcData: any;
  details: any;
  otherDetails: any;
}

const ApexChart = ({ ohlcData, details, otherDetails }: ApexChartProps) => {
  const state = {
    series: [
      {
        name: "Candle",

        data: ohlcData.map((data: any) => ({
          x: new Date(data.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          y: [data.open, data.high, data.low, data.close],
        })),
      },
    ],
    options: {
      chart: {
        type: "candlestick" as const,
        height: 350,
        toolbar: {
          // Hide the toolbar
          show: false,
        },
      },
      xaxis: {
        // Hide the x-axis
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        // Hide the y-axis
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  };

  return (
    <div className="bg-[#F6F6F6] rounded-2xl p-4 w-fit">
      <div id="chart" className="bg-white my-4 ">
        <div className="w-[15rem] sm:w-[22rem] mx-auto">
          <ReactApexChart
            series={state.series}
            options={state.options}
            type="candlestick"
            height={200}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-base">{details.name}</h4>
            <p className="px-2 rounded text-base font-medium bg-gray-100 pt-2">
              {details.price_change >= 0
                ? `( + ${details.price_change}% )`
                : `( ${details.price_change}% )`}
            </p>
          </div>
          <button className="bg-primary rounded-full text-white text-sm px-4 py-1">
            {otherDetails.sector}
          </button>
        </div>
        <div className="flex justify-between items-center">
        <p className="text-base text-gray-600 mt-2">
          Market Cap: {formatNumber(otherDetails.marketCap)}
        </p>
        <p className="text-base text-gray-600 mt-1">
          Suggested on: {details.dateofrecommendation}
        </p>
        </div>
      </div>
    </div>
  );
};

export default ApexChart;
