import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_MARKET_API_URL;

const getIdToken = (): string => {
  const cookies = document.cookie
    .split('; ')
    .reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);
  return cookies['idToken'];
};

export const getStocksummary = async (): Promise<StockSummaryResponse> => {
    const idToken = getIdToken();
    try {
        const response = await axios.get(
            `${apiUrl}/getSummary`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};

export const getOhlcData = async (ticker: string, recommendedAt: string): Promise<StockOHLCResponse> => {
    const idToken = getIdToken();
    try {
        const response = await axios.get(
            `${apiUrl}/getHistoricalMarketData/${ticker}/${recommendedAt}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};

export const getLiveMarket = async (): Promise<LivaMarketResponse> => {
    const idToken = getIdToken();
    try {
        const response = await axios.get(
            `${apiUrl}/getLiveMarketData`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }

        );
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};

export const getSuggestions = async (useFullType: boolean = false): Promise<getSuggestionsResponse> => {
    const idToken = getIdToken();
    const typeParam = useFullType ? "full" : ""; 
    try {
        const response = await axios.get(
            `${apiUrl}/getSuggestions?type=${typeParam}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data.suggestions;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};

export const getCredibility= async (): Promise<getCredibilityResponse> => {
    const idToken = getIdToken();
    try {
        const response = await axios.get(
            `${apiUrl}/getCredibility`,
            {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        throw error;
    }
};