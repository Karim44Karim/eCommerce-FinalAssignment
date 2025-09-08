"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
try {
    const encodedToken =
      (await cookies()).get("next-auth.session-token")?.value ||
      (await cookies()).get("__secure-next-auth.session-token")?.value;

      if(!encodedToken) return null;

    const token = await decode({token: encodedToken, secret: process.env.NEXTAUTH_SECRET!});
  
    
    return token?.token || null;
} catch (error) {
  return null;
}
}