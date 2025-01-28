import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiOHFuXzZqYkdhTmJBRm1jZDFWTFY0QSIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6IjVObEZnSVl3dE5OS2dxRzZnaUNoelIwUmxFQTFMaW9YMG5uQXR1TC10b0dHMF93QUd4c1hnX2s2VFhqUTNsWlR4bm9BYTgtTFA1a0NUS0d1anRiUlVUbTVaa2ZsZ3h1ZXFuR3NoREZzWkRBWU0wR3licGZ1VWJocjhFSS04d0F4RC1xc3FaQmFsd3dpTjFxeHBqOFlVMFlDaHBSaFFWNTZldEhlMzlrZDdTMCIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6ImViNTVmZmRmLTE4OWQtNGE1My04NjUzLWIxMTRjNTM2ZDQ2NyIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzgwNzMwOTIsImV4cCI6MTczODA3NjY5MiwiaWF0IjoxNzM4MDczMDkyLCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiI2MTQwZGJlOC0yZDg3LTQzZWUtODdiOS01NTZmMGZhOWY1YjQiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.gW7-8boRpKYZ2yE9VjSdMmp2DQ9hlBQi6FSbjfBIsvCEWViCePMvRqajlOp4sfQPSg0GasXQIm11oeVOUZZbVvkFJfNJnSsqIDrsfqIVb56ddYHZyi35WPbR_UQNtyhS5xr3FQ_V53HQfDJXU9wsicp8agiM7FRdkS02rvFQyP_O9JYYH_ENe7ybk45npXrtsiPKAUSyvwF4-2f4N9QCtTdUqTy59Yd9kg9mFEzQ8UDnKnt3m3CfPAFI9WxfOv0Tj9tQf5_LI0IAeLaySSRYQbBozj9KH8_oSNab85v_pnw7_lFZP4i9LGoqB4qoP33PGWT4fiiKYP3YTQtXYbIvQw';
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
