export interface StockRecommendation {
    id: number;
    name: string;
    recommendation: "Buy" | "Sell";
    source: string;
    ticker:string;
    reason: string;
}

export interface StockSummary {
    analysis: string[];
}

export interface MarketAnalysisData {
    recommendations: StockRecommendation[];
    analysis: StockSummary[];
}

export interface MarketAnalysis {
    start_date: string;
    end_date: string;
    type: "Daily" | "Weekly" | "Monthly";
    data: MarketAnalysisData;
}

export interface StockSummaryResponse {
    message: string;
    market_analysis: MarketAnalysis[];
}

// interface StockOHLCResponse {
//     message: string;
//     chart_ohlc: ChartOhlc[];
// }



// type ChartOhlc = {
//     date: string; 
//     close: number; 
//     high: number; 
//     low: number; 
//     open: number; 
//     volume: number; 
//   };
  