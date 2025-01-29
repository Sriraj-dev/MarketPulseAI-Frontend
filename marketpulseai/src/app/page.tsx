import MarketSummary from "@/components/features/marketSummary";
import Overview from "@/components/features/overview";
import Recommendations from "@/components/features/recommendations";

export default function Home() {
  return (
    <>
      <MarketSummary />
      <div className="flex lg:flex-row flex-col gap-8 px-6">
        <div className="lg:w-2/3 ">
        <Overview  />
        </div>
        <div>
        <Recommendations />
        </div>
      </div>
    </>
  );
}
