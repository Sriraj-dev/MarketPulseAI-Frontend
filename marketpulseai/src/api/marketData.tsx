import { StockSummaryResponse } from '@/models/marketModel';
import axios from 'axios';

const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiMnhrZ2FvWUkzaGZSOE9zd1RzQldhQSIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6ImhjNXY0SFJyMllMS2ZtS0VKMHo0WjJZR09NU1hLeWIzdXRTU1Q3eXFQbDhSTVRvemRHM2hBM282alRXVjI1WW9PWF9LdmhKUzd3c2RTeDBoT1N4YlAtQnF5clRRLW02bjZ4VTRUbzM1RXVJazdpVHQ4RzJ4WUV5eVd2eTZpQjNfVkk1M1N6UVAxUE95bXV5VUQ2Sy1CbEVMM3E4NG1wRzJhWlBxUGNWeHJmdyIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6IjQ0ZWNkOWM1LTZjMDgtNDQzZS1iNTIwLTllMjMyNDZhMTJjZCIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Mzc5Nzg1NDMsImV4cCI6MTczNzk4MjE0MywiaWF0IjoxNzM3OTc4NTQzLCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiIzMThmZGFlMi04YWRlLTQzY2UtYjE3Yy02Y2VhZGJkYWI4ZTQiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.mIbsWdSdrXRYbbpHHxDgjdeyv_RjiZRI-TsR6rvVT0svJf9qe1JV7MKmzQKiuz_DLTjot-TgL-ss5Ni5xwvgVZJ2Bb7uHouhbcCsaRyuoe-cuAH6XQbMheqPzSBcyBM-4sT01AuNP7Kv27ODrNGe4v8k-04vdZz7xvpNrQ33HATNjlarFV5O9P_eGak9gDb57I2JJqfRQ9K3Ra5GuZV0wL4vJv-OLzOMgKqdQgW5ZDNK5iOvyZmPJ5C8Ad_Y1z8BcDMyWFDf3CBDSuBs2l1hS8CET4vLEG36_k33BnpaHuND1qEfJQvEbkJFR53WhqNULbgGbf8e5SAnarwR6bwUsw';
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

// export const getOhlcData= async (): Promise<StockOHLCResponse> => {
//     try {
//         const response = await axios.get(
//             `https://2mz9j7wrh7.execute-api.us-east-1.amazonaws.com/Stage/getHistoricalMarketData/:ticker/:recommendedAt`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${idToken}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching stock data:", error);
//         throw error;
//     }
// };
