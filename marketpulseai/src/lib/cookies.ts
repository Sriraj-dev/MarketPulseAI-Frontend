"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteThemeCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("idToken");
  cookieStore.delete("refreshToken");

  redirect(
    "https://us-east-1kaujab9qo.auth.us-east-1.amazoncognito.com/login/continue?client_id=4v4ts3vvisupphos53v5rkcv31&redirect_uri=https%3A%2F%2Fmarket-pulse-ai-frontend.vercel.app&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile"
  );
}
