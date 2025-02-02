import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const codeapi = process.env.NEXT_PUBLIC_TOKEN_API_URL;

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

      response.cookies.set('accessToken', accessToken, { sameSite: 'lax', maxAge: 259200 });
      response.cookies.set('idToken', idToken, { sameSite: 'lax', maxAge: 259200 });
      response.cookies.set('refreshToken', refreshToken, { sameSite: 'lax', maxAge: 2592000 });
      return response;
    } catch (error) {
      console.error('Token exchange error:', error);
      return NextResponse.redirect('https://us-east-1kaujab9qo.auth.us-east-1.amazoncognito.com/login/continue?client_id=4v4ts3vvisupphos53v5rkcv31&redirect_uri=https%3A%2F%2Fmarket-pulse-ai-frontend.vercel.app&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile');
    }
  }

  if (((!idToken || isTokenExpired(idToken)) || (!accessToken || isTokenExpired(accessToken))) && refreshToken) {
    try {
      const refreshResponse = await axios.get(
       `${codeapi}/refreshSession`,
        { headers: { refresh_token: refreshToken } }
      );
      if (refreshResponse.status !== 200)   return NextResponse.redirect('https://us-east-1kaujab9qo.auth.us-east-1.amazoncognito.com/login/continue?client_id=4v4ts3vvisupphos53v5rkcv31&redirect_uri=https%3A%2F%2Fmarket-pulse-ai-frontend.vercel.app&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile');

      const { accessToken, idToken: newIdToken, refreshToken: newRefreshToken } = refreshResponse.data;
      const response = NextResponse.next();

      response.cookies.set('accessToken', accessToken, { sameSite: 'lax', maxAge: 259200 });
      response.cookies.set('idToken', newIdToken, { sameSite: 'lax', maxAge: 259200 });

      return response;
    } catch (refreshError) {
      console.error('Refresh token error:', refreshError);

      const response = NextResponse.redirect('https://us-east-1kaujab9qo.auth.us-east-1.amazoncognito.com/login/continue?client_id=4v4ts3vvisupphos53v5rkcv31&redirect_uri=https%3A%2F%2Fmarket-pulse-ai-frontend.vercel.app&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile');
      response.cookies.delete('accessToken');
      response.cookies.delete('idToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  if (!refreshToken) {
    const loginUrl = 'https://us-east-1kaujab9qo.auth.us-east-1.amazoncognito.com/login/continue?client_id=4v4ts3vvisupphos53v5rkcv31&redirect_uri=https%3A%2F%2Fmarket-pulse-ai-frontend.vercel.app&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile';
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/performance', '/performance/:path*'],
};