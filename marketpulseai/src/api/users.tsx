import { UserDetailsResponse } from '@/models/userModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidnJqY2RObjVCWlNmbHNVdEJEZ0xzZyIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJwaWN0dXJlIjoiaHR0cHM6XC9cL2xoMy5nb29nbGV1c2VyY29udGVudC5jb21cL2FcL0FDZzhvY0lUb0FyRlhGajF4ZnhEY1M3dlNCNm4td3hvanR0MDFwU1E2cE9GSjhiWkVTbXBSQT1zOTYtYyIsIm9yaWdpbl9qdGkiOiI3ODdmOGVlZC02ZWQzLTRiZTQtOWZlZC1jOTc1MWJiMTRiYmEiLCJhdWQiOiI0djR0czN2dmlzdXBwaG9zNTN2NXJrY3YzMSIsImlkZW50aXRpZXMiOlt7ImRhdGVDcmVhdGVkIjoiMTczNzgwMDg0MDc0NiIsInVzZXJJZCI6IjEwNzg0MTgwNDU0MDA0NjI1NTA3MiIsInByb3ZpZGVyTmFtZSI6Ikdvb2dsZSIsInByb3ZpZGVyVHlwZSI6Ikdvb2dsZSIsImlzc3VlciI6bnVsbCwicHJpbWFyeSI6InRydWUifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM4MTYzNjA1LCJleHAiOjE3MzgxNjcyMDUsImlhdCI6MTczODE2MzYwNSwiY3VzdG9tOnN1YnNjcmlwdGlvbl9zdGF0dXMiOiJmcmVlIiwianRpIjoiMzA4ZjQwOTAtODU5Yy00ZTMxLWIwNjYtMjRlZDNhYjA0NmI4IiwiZW1haWwiOiJnYW1lcnBsYXllcjEzNTdAZ21haWwuY29tIn0.Z4vkMUhbczTwPUFiun4T1b0l1QcdmxO19hwaJpwG8ejeiLLdRmkRiybzq6jBdwNFEXA1snYacADfC0vd2GYqz2Ytx0MujC7quwBQnoIyUrrs1WsL17OqmI70-4xnHncu3WjgzUL4ifdGenReu2g7woc4xrz1RXgd6PD-SUee9KL0fmasjZQOrM2b8dzFUfsuTySw95WrvbyzeZEW6XL2pm6wxlSdLJOpOtnCtbxkFn6bz-g__bbgaBvsFRBt7DjprW70G9I7sSE2EcHdFOPxEc7jDxtpm02YJ80FBewlSowPMou7Ex6xI0M-qFRgvjtaJuCBtmttsOhW9xdMU0VPQg';
const accessToken = 'eyJraWQiOiJOVk9TKzVxZFMzWk9ONlBLclNVZnh5SGhmU1R4UHY2VFAyODZucE1Cd1dBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NGY4NDQwOC0xMDIxLTcwOTMtMjRkZC03NWYyNWRmZGJhODQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfa0FVamFiOXFvX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9rQVVqYWI5cW8iLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0djR0czN2dmlzdXBwaG9zNTN2NXJrY3YzMSIsIm9yaWdpbl9qdGkiOiI3ODdmOGVlZC02ZWQzLTRiZTQtOWZlZC1jOTc1MWJiMTRiYmEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzM4MTYzNjA1LCJleHAiOjE3MzgxNjcyMDUsImlhdCI6MTczODE2MzYwNSwianRpIjoiZGFjNjQ3OTYtNTYzZi00MmEzLWIxM2MtOTEwOGMyMWZkMGY2IiwidXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIn0.KRgQvK2XYTsqwraUulfEBb7N61mozATqfIAFWAlbaN7cryK_HaXRRm9nUaQWywbkIofmTlSHr20ouSdum2WSGfSdtcbaOfwfCNCm9BUdZBlp3tE-p2dz0QqwoYjd1OtdksaqA_3QQ3eNzv77WseLInPNPu5R5aBUkBwDDB5KkecqI1yXoOUk-IsGRbzRSP4N3W1SZQfElrFFeA_hYB0JAmtrhrrFDLto6ncTx5o8wPhjCk5VZmx0bpDQtSDFMut7_FVGawv37Flph7hZ4CEm7hG-WFnooSzOphWVZHZcVaTIZelKZcU5wMeTXSGz5Iu56mbe5Ac0NpyIIWhUxYjWRg'

export const getUserDetails  = async (): Promise<UserDetailsResponse> => {
    try {
      const response = await axios.get(
        'https://kxtyfwp155.execute-api.us-east-1.amazonaws.com/Stage/getUserDetails',
        {
          headers: {
            Authorization: `Bearer ${idToken}`, 
            'access_token': accessToken, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };


// {
//     "message": "User details fetched successfully",
//     "userDetails": {
//         "email": "gamerplayer1357@gmail.com",
//         "email_verified": "false",
//         "preferred_username": "Gamer 13579",
//         "picture": "https://lh3.googleusercontent.com/a/ACg8ocIToArFXFj1xfxDcS7vSB6n-wxojtt01pSQ6pOFJ8bZESmpRA=s96-c",
//         "custom:valid_until": "2025-02-24",
//         "custom:subscription_status": "free",
//         "sub": "94f84408-1021-7093-24dd-75f25dfdba84",
//         "identities": "[{\"dateCreated\":\"1737800840746\",\"userId\":\"107841804540046255072\",\"providerName\":\"Google\",\"providerType\":\"Google\",\"issuer\":null,\"primary\":\"true\"}]"
//     }
// }