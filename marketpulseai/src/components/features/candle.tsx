"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  ohlcData: any;
  details: any;
}

const ApexChart = ({ ohlcData , details }: ApexChartProps) => {

  const state = {
    series: [
      {
        name: "Candle",
       
        data: ohlcData.map((data: any) => ({
          x: new Date(data.date).getTime(), 
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
    <div className="bg-[#F6F6F6] rounded-2xl p-4 w-fit" >
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
            <span className={`px-2 py-0.5 rounded text-xs font-medium `}>
              (+ 5.5%)
            </span>
          </div>
          <button className="bg-primary rounded-full text-white text-xs px-4 py-1">
           {details.source}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Market Cap : 383.67 billion
        </p>
      </div>
    </div>
  );
};

export default ApexChart;
