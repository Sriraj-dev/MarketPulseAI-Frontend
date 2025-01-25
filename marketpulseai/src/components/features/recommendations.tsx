import React from "react";
import Link from "next/link";
import PastPerformance from "./pastPerformance";

const Recommendations = () => {
  return (
    <div className="lg:w-[26rem] w-full  mx-auto mb-8">
      <div className="bg-white ">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold">Recommendations</h3>
          <Link
            className="text-sm text-blue-600 underline underline-offset-4"
            href="/performance"
          >
            See All
          </Link>
        </div>
        <p className="mb-4">
          Lorem iat, ullam voluptates voluptas aliquid facilis nulla quasi
          impedit earum nisi inventore harum saepe at!
        </p>
        <div className="space-y-4">
          {[
            {
              id: 1,
              name: "Adani Enterprises",
              tag: "Buy",
              description:
                "Target price increase by Venture Securities suggests strong upside potential",
            },
            {
              id: 2,
              name: "Bajaj Finance",
              tag: "Buy",
              description:
                "Robust growth metrics with a 28% year-on-year rise in assets",
            },
            {
              id: 3,
              name: "JSW Energy",
              tag: "Sell",
              description:
                "Strong bullish momentum expected post-acquisition announcement",
            },
          ].map((rec) => (
            <div
              key={rec.name}
              className="flex items-start gap-4 p-2 hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="flex sm:justify-between sm:flex-row flex-col gap-2 sm:gap-0 sm:items-center items-start">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-base">
                      {" "}
                      <span>{rec.id} . </span>
                      {rec.name}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        rec.tag === "Buy"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rec.tag}
                    </span>
                  </div>
                  <button className="bg-secondary rounded-full text-white text-xs px-4 py-1">
                    MoneyControl.com
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2 sm:ml-6 ml-2">
                  {rec.description}
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
