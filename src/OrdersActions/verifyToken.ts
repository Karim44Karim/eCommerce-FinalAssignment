"use server"

import getMyToken from "@/utilities/getMyToken";

export default async function verifyToken(token: string) {

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}