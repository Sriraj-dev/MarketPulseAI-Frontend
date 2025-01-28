import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';

const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiOUhHVXA2WkdIOTdRNFRuMVhzbG9GZyIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6ImRMazlSUDQ5TkJFVV9PcHNfOXo2Ukd6MnZNM0xZNENTWG5TSVV2VGt0OEpxZE5sMkZLT2ttZ0FKemJ0Y2Z2TmNNMVNxbDlKVUhPR0Rza19uUGpKUF91ejdOMVZxNllPNGhLYnU0NnZ2cDE5VHduRDJBWDNVci1CdG5CS2poRlpUQk1WTHpvWUFHbzU3U2JFNnZaSDFkUDhpdGtsUEpUNWNLVFFlUkQwQ0EtYyIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6ImZmZGNlZmRiLWFlMTgtNDFhMS04ZjU2LTA4OGI3NGQ0NTk5NiIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzgwNjc2OTIsImV4cCI6MTczODA3MTI5MiwiaWF0IjoxNzM4MDY3NjkyLCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiIwNDYzZjIxOC02NGY2LTRlYjItOWI2My0xNjIxYWZmODYzMzEiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.NsS5iNLC0eY-_MzuOqo4cSKZqZjGdf1T5rioZDyJRD0xsvxmxt82o8tmTvpifOOtVJnl7Z_rfcFFpv2mF-9YcCghgU9pg39T9YAxbtxvv-SvCjHmqxyVtfsWWQBHkCcOzeRQdIO-3otMJNIaS_5cXUK_ePilyFXp0DRus2CYXiuMbyZ3I9GHt8AWMDOUr3QocviAhLnGV75z2BDhjc_l52md9seiF2dBLvfhc7o2lkr42JjgYmiG1FLRwycPYnaI43QzOB5p1PUbGmMHkS283lcKNfvfXj0eTr-H1v9ab3BKXtV18eHhlv7ie10TPuVOT7oDR2Agorn3AxhPL3g4Qg';
// const API_KEY = process.env.NEXT_PUBLIC_MARKET_DATA_API_KEY;

export const getStocksummary = async (): Promise<StockSummaryResponse> => {
    try {
        const response = await axios.get(
            `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getSummary`,
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
    try {
        const response = await axios.get(
            `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getHistoricalMarketData/${ticker}/${recommendedAt}`,
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
    try {
        const response = await axios.get(
            `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getLiveMarketData`,
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


export const getSuggestions= async (): Promise<getSuggestionsResponse> => {
    try {
        const response = await axios.get(
            `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getSuggestions`,
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
    try {
        const response = await axios.get(
            `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getCredibility`,
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
