import { create } from 'zustand';
import { serialize } from 'next-mdx-remote/serialize';
import { getSuggestions ,getOhlcData , getLiveMarket , getStocksummary , getCredibility } from '@/api/marketData';
import {LiveMarketState , OHLCState, RecommendationState, RecommendationTableState, StockSummaryState, PerformanceStore } from '@/models/storeModals';


// useStockSummaryStore.ts
export const useStockSummaryStore = create<StockSummaryState>((set) => ({
  mdxSources: [],
  loading: false,
  error: '',
  fetchStockSummary: async () => {
    set({ loading: true, error: '' });
    try {
      const data = await getStocksummary();
      
      const analysis = data.market_analysis.map((item: any) => ({
        type: item.type,
        analysis: item.data.analysis,
      }));

      const marketnews = data.market_analysis.map((item: any) => ({
        type: item.type,
        analysis: item.data.marketnews,
      }));

      const allData = [...marketnews, ...analysis];

      const serializedContentPromises = allData.map(async (item: any) => {
        if (item.analysis) {
          const serialized = await serialize(item.analysis);
          return { type: item.type, content: serialized };
        }
        return null;
      });

      const results = await Promise.all(serializedContentPromises);
      const validResults = results.filter(Boolean);

      set({ mdxSources: validResults, loading: false });
    } catch (error) {
      set({ error: 'Our website is updating right now , please try after some time .', loading: false });
      console.error('Error details:', error);
    }
  },
}));


// recommendationStore.ts

export const useRecommendationStore = create<RecommendationState>()(
    (set, get) => ({
      recommendations: [],
      loading: true,
      error: '',
      displayCount: 3,
      lastFetched: null,

      fetchRecommendations: async () => {
        // Return cached data if it's fresh (under 5 minutes old)
        const { lastFetched } = get();
        if (lastFetched && Date.now() - lastFetched < 300_000) { // 5 minutes
          return;
        }

        set({ loading: true, error: '' });
        try {
          const data = await getSuggestions();
          set({ 
            recommendations: data,
            loading: false,
            lastFetched: Date.now()
          });
        } catch (error) {
          set({ 
            error: 'We are facing some technical issue, Please try after sometime .',
            loading: false 
          });
          console.error("Error details:", error);
        }
      },

      loadMore: () => {
        set((state) => ({ displayCount: state.displayCount + 3 }));
      },
    }),
);



export const useRecommendationTableStore = create<RecommendationTableState>((set) => ({
  recommendations: [],
  loading: true,
  error: null,
  selectedCompanies: [],

  fetchRecommendations: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getSuggestions(true);
      set({ recommendations: data, loading: false });
    } catch (error) {
      set({
        error: 'We are facing some technical issue, Please Try After some time',
        loading: false
      });
      console.error("Error details:", error);
    }
  },

  toggleCompany: (index : any) => {
    set((state) => ({
      selectedCompanies: state.selectedCompanies.includes(index)
        ? state.selectedCompanies.filter((_) => _ !== index)
        : [...state.selectedCompanies, index]
    }));
  }
}));




// ohlcStore.ts

export const useOhlcStore = create<OHLCState>((set, get) => ({
  ohlcData: {},
  loadingStates: {},

  fetchOhlcData: async (ticker, date) => {
    const key = `${ticker}-${date}`;
    
    // Return if data already exists
    if (get().ohlcData[key]) return;

    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: true }
    }));

    try {
      const data = await getOhlcData(ticker, date);
      set((state) => ({
        ohlcData: { ...state.ohlcData, [key]: data },
        loadingStates: { ...state.loadingStates, [key]: false }
      }));
    } catch (error) {
      console.error("Error fetching OHLC data:", error);
      set((state) => ({
        loadingStates: { ...state.loadingStates, [key]: false }
      }));
    }
  }
}));



// liveMarketStore.ts

export const useLiveMarketStore = create<LiveMarketState>((set) => ({
  liveData: [],
  loading: false,
  error: null,
  lastUpdated: null,

  fetchLiveMarket: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getLiveMarket();
      set({ 
        liveData: data,
        loading: false,
        lastUpdated: Date.now()
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch market data',
        loading: false
      });
      console.error("Error fetching live market data:", error);
    }
  }
}));


// stores/usePerformanceStore.ts

export const usePerformanceStore = create<PerformanceStore>((set) => ({
  pastData: [],
  loading: true,
  fetchStockSummary: async () => {
    try {
      const data = await getCredibility();
      set({ pastData: data.credible_stocks, loading: false });
    } catch (error) {
      console.error("Error fetching stock summary:", error);
      set({ loading: false });
    }
  },
}));