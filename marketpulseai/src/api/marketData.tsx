import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiXzlxbDBxd0lMZThOMlFTYnFseEVWUSIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6IlN2V3dSMlVIN0JXREVHWWNaMkVLbDNZLVpPelV6NHBmNXdmXzRtSGJ2QTNKSW1tNGt6ekRDUzByQk43VllwRERaSUFIazBPdmJ1aGVBQ1VhY2xFNGJndFlqNFpHcm54RndDbEpia2hOdVRoMHhiV1Qzb0gyZVFCUVFsRUNVRWUtUEtCSmdwOExzdE5OU3hRNHNDXzdKQlNrUnpCNjR3LUpyTldtQmh6TGQ1VSIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6ImZhMzkyZTRiLWQyNjEtNGMwOS1hOTU4LWRhNTI3Y2QxNGY3MCIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzgwODQ0NzcsImV4cCI6MTczODA4ODA3NywiaWF0IjoxNzM4MDg0NDc3LCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiJkOWE2NDllMS00OWMyLTQxY2EtOWM0NS1jMGU3YmM4ZTIzYWUiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.Q7ESH2qFtQAxxb8CwKEnO-IvdqvomBCBlrPUtX6CV9Kfm4IhAG_TnKbb52gDsg3H7p8ilox1sHmiPjruhf-d6Dc9P8l10FoDn0CWXlYHxXemIqWAitaBDfxFZwRFIgSZiB8SnMjr6TepSRYqz9HsoPJiOlCpIbIDBVZQtFrzb69AbbKTuj0z36kE528Gd9aq_xAiA6LGjLSmgjdMwMPCpza5gEKEFhQGGNCl0xR_0KmN4BmdgykP-PpQ6ddXKb5a-7_7NXwwy2VI9s8lgmsmJhv3ZIbLefXqQOHPkZQIcY8ytgwsFKX7aG2hwxZP-RyFmIFEkv05KfY3LXHLn8u59g';
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
