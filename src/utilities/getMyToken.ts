"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
try {
    const encodedToken =
      (await cookies()).get("next-auth.session-token")?.value ||
      (await cookies()).get("__Secure-next-auth.session-token")?.value;

      console.log("hello from encoded token", encodedToken);
      
      if(!encodedToken) return null;

    const token = await decode({token: encodedToken, secret: process.env.NEXTAUTH_SECRET!});
      console.log("hello from tokennnnnnnnnnn", token);
  
    
    return token?.token || null;
} catch (error) {
  return null;
}
}