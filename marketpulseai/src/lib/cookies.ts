"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteThemeCookies() {
  const awsloginpage = process.env.NEXT_PUBLIC_SIGNUP_PAGE;
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("idToken");
  cookieStore.delete("refreshToken");

  redirect(
    `${awsloginpage}`
  );
}
