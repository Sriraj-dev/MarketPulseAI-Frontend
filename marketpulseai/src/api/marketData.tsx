import { getCredibilityResponse, getSuggestionsResponse, LivaMarketResponse, StockOHLCResponse, StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiT0xhR0JRR3R2alNFQmg0R3lZUXNtZyIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6IjFLd3pPMHdVaGF5aGszVmp5U2pPMl9wVnJ3eF9aYTdRNW1EdG9HVC02TmRQTU9wd0gxRkUyemNIZFBGdVN0aTh4NjZTNlJPX2hfY0l0VTlZVXh6OERPOXQ2ZUQ1RHo2NS1XWjhFTGtHRFdoT2dqZWR4ckR3bWNkRFhsNFRENnFBRUJEN2N5cHFDSTVzOTZEWldWRHEtZmJqNlIzci0wYTZkMTRadEtyY3FDWSIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6IjM1YzUxY2EzLWIwNTYtNDRhMC05YjI0LWQ2NjVjOTg1NGYzYSIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Mzc5OTMyNDEsImV4cCI6MTczNzk5Njg0MSwiaWF0IjoxNzM3OTkzMjQxLCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiI1OTBiYmIwNi04ODY0LTRkYTEtYmJhYi01MmU5ZWFiMjI1MTMiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.WnIkWWZyqUiSHALu8Ng583bdHTNOpDm8OhxsvMySbo0IZZdzS1LGAbKYSMBf9iFQao6sji5AWUD_vibDp8YsOYnQuHkMsojGJCYIgfe32eNI-IRiKohtUCK_wKZgt5FAmkWDPwyl5ueWoI8asGEsz2KJ89KpIQKl1boj5XLg8wYxR3TnW_pmpfiiB6RIU1JPcPu5CVBNMjJ9CN6z_vmbStlFqPXsyHC7hSUgybfXy8Xi5tR93xQ-p9e1s6gDUMvFXSrmwfs8VJlz3oTSiTyuP_-gRBa_v8YwM3IkqJ_H1F3J3Zla2uDT4ZJlXHDqMmmcoPoDnjzSIgdugqnMd1hkzA';
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
