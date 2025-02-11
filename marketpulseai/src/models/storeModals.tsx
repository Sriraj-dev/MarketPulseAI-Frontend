import {
  LiveMarketData,
  StockCredibility,
  StockOHLCResponse,
  StockRecommendation,
} from "./marketModel";

export interface StockSummaryState {
  mdxSources: any[];
  loading: boolean;
  error: string;
  fetchStockSummary: () => Promise<void>;
}


export interface RecommendationState {
  recommendations: StockRecommendation[];
  loading: boolean;
  error: string;
  displayCount: number;
  lastFetched: number | null;
  fetchRecommendations: () => Promise<void>;
  loadMore: () => void;
}

export interface RecommendationTableState {
  recommendations: StockRecommendation[];
  loading: boolean;
  error: string | null;
  selectedCompanies: number[];
  fetchRecommendations: () => Promise<void>;
  toggleCompany: (index : number) => void;
}

export interface OHLCState {
  ohlcData: Record<string, StockOHLCResponse>; 
  loadingStates: Record<string, boolean>;
  fetchOhlcData: (ticker: string, date: string) => Promise<void>;
}

export interface LiveMarketState {
  liveData: LiveMarketData[];
  loading: boolean;
  error: string | null;
  fetchLiveMarket: () => Promise<void>;
  lastUpdated: number | null;
}


export interface PerformanceStore {
  pastData: StockCredibility[];
  loading: boolean;
  fetchStockSummary: () => Promise<void>;
}