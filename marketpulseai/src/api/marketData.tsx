import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidnJqY2RObjVCWlNmbHNVdEJEZ0xzZyIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJwaWN0dXJlIjoiaHR0cHM6XC9cL2xoMy5nb29nbGV1c2VyY29udGVudC5jb21cL2FcL0FDZzhvY0lUb0FyRlhGajF4ZnhEY1M3dlNCNm4td3hvanR0MDFwU1E2cE9GSjhiWkVTbXBSQT1zOTYtYyIsIm9yaWdpbl9qdGkiOiI3ODdmOGVlZC02ZWQzLTRiZTQtOWZlZC1jOTc1MWJiMTRiYmEiLCJhdWQiOiI0djR0czN2dmlzdXBwaG9zNTN2NXJrY3YzMSIsImlkZW50aXRpZXMiOlt7ImRhdGVDcmVhdGVkIjoiMTczNzgwMDg0MDc0NiIsInVzZXJJZCI6IjEwNzg0MTgwNDU0MDA0NjI1NTA3MiIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM4MTYzNjA1LCJleHAiOjE3MzgxNjcyMDUsImlhdCI6MTczODE2MzYwNSwiY3VzdG9tOnN1YnNjcmlwdGlvbl9zdGF0dXMiOiJmcmVlIiwianRpIjoiMzA4ZjQwOTAtODU5Yy00ZTMxLWIwNjYtMjRlZDNhYjA0NmI4IiwiZW1haWwiOiJnYW1lcnBsYXllcjEzNTdAZ21haWwuY29tIn0.Z4vkMUhbczTwPUFiun4T1b0l1QcdmxO19hwaJpwG8ejeiLLdRmkRiybzq6jBdwNFEXA1snYacADfC0vd2GYqz2Ytx0MujC7quwBQnoIyUrrs1WsL17OqmI70-4xnHncu3WjgzUL4ifdGenReu2g7woc4xrz1RXgd6PD-SUee9KL0fmasjZQOrM2b8dzFUfsuTySw95WrvbyzeZEW6XL2pm6wxlSdLJOpOtnCtbxkFn6bz-g__bbgaBvsFRBt7DjprW70G9I7sSE2EcHdFOPxEc7jDxtpm02YJ80FBewlSowPMou7Ex6xI0M-qFRgvjtaJuCBtmttsOhW9xdMU0VPQg';


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
