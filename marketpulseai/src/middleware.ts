import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const codeapi = process.env.NEXT_PUBLIC_AUTHSERVICE_URL;
const awsloginpage = process.env.NEXT_PUBLIC_SIGNUP_PAGE;
const hostedui = process.env.NEXT_PUBLIC_HOSTED_UI;
//TODO ::

function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get('code');
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const accessToken = req.cookies.get('accessToken')?.value;
  const idToken = req.cookies.get('idToken')?.value;

  if (code) {
    try {
      const apiResponse = await axios.get(`${codeapi}/login?code=${code}`);

      if (apiResponse.status !== 200) throw new Error('Token exchange failed');

      const { accessToken, idToken, refreshToken } = apiResponse.data;
      const newUrl = new URL(url);
      newUrl.searchParams.delete('code');

      const response = NextResponse.redirect(newUrl);

      response.cookies.set('accessToken', accessToken, { maxAge: 259200 ,  secure: true });
      response.cookies.set('idToken', idToken, {  maxAge: 259200 ,  secure: true});
      response.cookies.set('refreshToken', refreshToken, {  maxAge: 2592000 ,  secure: true});
      return response;
    } catch (error) {
      console.error('Token exchange error:', error);
      return NextResponse.redirect(`${awsloginpage}`);
    }
  }

  if (((!idToken || isTokenExpired(idToken)) || (!accessToken || isTokenExpired(accessToken))) && refreshToken) {
    try {
      const refreshResponse = await axios.get(
        `${codeapi}/refreshSession`,
        { headers: { refresh_token: refreshToken } }
      );
      if (refreshResponse.status !== 200)   return NextResponse.redirect(`${awsloginpage}`);
      const { accessToken : newaccessToken , idToken: newIdToken } = refreshResponse.data;
      
      const response = NextResponse.redirect(`${hostedui}`);

      response.cookies.set('accessToken', newaccessToken, {  maxAge: 259200 , secure: true});
      response.cookies.set('idToken', newIdToken, {  maxAge: 259200  ,  secure: true});

      return response;
    } catch (refreshError) {
      console.error('Refresh token error:', refreshError);
      const response = NextResponse.redirect(`${awsloginpage}`);
      response.cookies.delete('accessToken');
      response.cookies.delete('idToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  if (!refreshToken) {
    const loginUrl = `${awsloginpage}`;
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/performance', '/performance/:path*'],
};