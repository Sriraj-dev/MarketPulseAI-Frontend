
export interface StockSummary {
    analysis: string[];
}

export interface MarketAnalysisData {
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


  export interface LiveMarketData {
    ticker: string;
    name: string;
    current_price: number;
    price_change: number;
    percent_change: number;
  }
  
  export type LivaMarketResponse = LiveMarketData[];


  export type getSuggestionsResponse = StockRecommendation[];


  export type StockOHLCResponse = {
    message: string;
    ticker: string;
    OHLC: OHLC[];
    sector: string;
    marketCap : number;
    yahooLink : string;
  }
  

  export interface StockRecommendation {
    id: number;
    name: string;
    recommendation: "Buy" | "Sell";
    source: string;
    ticker:string;
    reason: string;
    type: string;
    dateofrecommendation: string;
    suggested_at_price: number;
    current_price: number;
}

// export type getCredibilityResponse = CredibilityResponse[];

// export interface CredibilityResponse {
//   id: number;
//   name: string;
//   recommendation: "Buy" | "Sell";
//   source: string;
//   ticker:string;
//   reason: string;
// }

export interface getCredibilityResponse {
    credible_stocks: StockCredibility[];
  }

  export interface StockCredibility {
    DB_info: DBInfo;
    Market_info: MarketInfo;
  }

  
  export interface OHLC {
    date: string;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
  }
  
  export interface MarketInfo {
    message: string;
    ticker: string;
    OHLC: OHLC[];
  }
  
  export interface DBInfo {
    updated_at: string;
    recommendation: string;
    suggested_at_price: number;
    dateofrecommendation: string;
    ticker: string;
    current_price: number;
    feedid: string;
    source: string;
    name: string;
    reason: string;
    type: string;
  }