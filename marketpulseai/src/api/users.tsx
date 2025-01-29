import { UserDetailsResponse } from '@/models/userModel';
import axios from 'axios';
const idToken = 'eyJraWQiOiJXUkJudWxOMyswcjhlYzljaCtRd0V1eE53eU1pWHNlM1wvblFMdERyWlVhRT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiU3B6WER5YkRQT3NiVnRxTGVlQzdxUSIsInN1YiI6Ijk0Zjg0NDA4LTEwMjEtNzA5My0yNGRkLTc1ZjI1ZGZkYmE4NCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9rQVVqYWI5cW9fR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfa0FVamFiOXFvIiwiY3VzdG9tOnZhbGlkX3VudGlsIjoiMjAyNS0wMi0yNCIsImNvZ25pdG86dXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR2FtZXIgMTM1NzkiLCJub25jZSI6ImJLWVo0X3pEOVhodVJLVmpfU2cxWDUyUGJOMklsSVdIYUdmbDZFVUtfYU52SEUycm5mWW8wakRLbWc2dVpteWdndjAwVHN1UXdSNnRpRHFqS0tNS0tUMFFrUnRxTnIzd3BTQmtvckJFRDc0ZlhaRV9BY2hXdl9uM1BnU0FWMDl5VVd4Y2xvaUdVZE1MNkdxYUpET0xlekU2blpka0xaZGpwdXphTVp6NjI3NCIsInBpY3R1cmUiOiJodHRwczpcL1wvbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwvYVwvQUNnOG9jSVRvQXJGWEZqMXhmeERjUzd2U0I2bi13eG9qdHQwMXBTUTZwT0ZKOGJaRVNtcFJBPXM5Ni1jIiwib3JpZ2luX2p0aSI6IjFjN2I5NmY0LWZiN2EtNDZlYi1hOWUyLWJkNzUzNDFhYWNjNCIsImF1ZCI6IjR2NHRzM3Z2aXN1cHBob3M1M3Y1cmtjdjMxIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzM3ODAwODQwNzQ2IiwidXNlcklkIjoiMTA3ODQxODA0NTQwMDQ2MjU1MDcyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzgxNTgyMzQsImV4cCI6MTczODE2MTgzNCwiaWF0IjoxNzM4MTU4MjM1LCJjdXN0b206c3Vic2NyaXB0aW9uX3N0YXR1cyI6ImZyZWUiLCJqdGkiOiI0ZjAxN2M2MS1iMGM0LTQyNTAtOTMyYi03NjRjOTE2ODcxZTIiLCJlbWFpbCI6ImdhbWVycGxheWVyMTM1N0BnbWFpbC5jb20ifQ.LHiHUz_MT2pBVzfjcGsY8TQQRZ-fGbhYQ2LlcpUOYHSfsCx89GiWi8DyxLCaLMlaJvYhtvqbr1CImw2ntGy3WlRzo7gXBkUW3qFcylh2jL5U3pVA1L18IPrjZlu7myZcooFd3vAhamNPozwfSuj6xMZ4YxBDR6c3tGj4XatsxKOCmft0OB71FlITD4YnOQ-uy83R8CHYJurKdIaXbqEuB2UxbNv5nxpqw69GCP7k75DpAydxq0o0MCjTycDWUS5D_QNqGDcQgmek7oCKosG3Hn-kSpXP7GhTSolFFUh7A05baMxi6d4KoloQSYJ0Twxcn_KsecDa9fmeORlsBNl5Lg';
const accessToken = 'eyJraWQiOiJOVk9TKzVxZFMzWk9ONlBLclNVZnh5SGhmU1R4UHY2VFAyODZucE1Cd1dBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NGY4NDQwOC0xMDIxLTcwOTMtMjRkZC03NWYyNWRmZGJhODQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfa0FVamFiOXFvX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9rQVVqYWI5cW8iLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0djR0czN2dmlzdXBwaG9zNTN2NXJrY3YzMSIsIm9yaWdpbl9qdGkiOiIyMmFiNjQ1OS00NjE3LTRiMzItODdiMy04OTg1YTZmZDkzYzMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzM4MTU5NjgwLCJleHAiOjE3MzgxNjMyODAsImlhdCI6MTczODE1OTY4MCwianRpIjoiNmZmYTRjOWUtZGM0Ni00ZTUyLTllNzctZjQ3NWY1YjUwMmU3IiwidXNlcm5hbWUiOiJnb29nbGVfMTA3ODQxODA0NTQwMDQ2MjU1MDcyIn0.FsRFyAQUqGjoHfHgH5K4nUUTZcZrT3JjmZaA-fsONmH7h4PBx1Y-HTCDzNhR9CGRMFutFoRFqeYvRetQZI9D-_I53cFGPX5xNdm3ltg26sHsfoBweDE07Fwd_htL3iuwyGk_tLjzJWNTHVVK4LwaODgjuvRI28erswDgAc_YH3yXgCFF7MbUU3mwbhKDJ8PQiIJrg6M48wb2-_NSN93jqGNT1nFZA1LZLYcFz-6lwgjUCbNkFA7oQ63GNxhaCvpTsnSmeFGoj0YnyrJgvByaVNiNCs6rkgyoHkdD5HRPrlDvgt1WMp_BJtmPNZip1O4SinB-d2z9XOYy6IEcEkWKqA'

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