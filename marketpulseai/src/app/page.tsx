import MarketSummary from "@/components/features/marketSummary";
import Overview from "@/components/features/overview";
import Recommendations from "@/components/features/recommendations";

export default function Home() {
  return (
    <>
      <MarketSummary />
      <div className="flex lg:flex-row flex-col gap-8 px-6">
        <div className="lg:w-full ">
        <Overview  />
        </div>
        <div id="recommendations" className="lg:w-1/3">
        <Recommendations />
        </div>
      </div>
    </>
  );
}
