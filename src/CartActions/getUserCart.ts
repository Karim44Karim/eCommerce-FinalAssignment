"use server"
import getMyToken from "@/utilities/getMyToken"

export default async function getLoggedUserCart() {

    const token = await getMyToken();

    if (!token){
        // throw new Error("Please Login First!");
          return { message: "Please Login First!", statusCode: 401 };
    }
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json",
        },
    })

    const payload = await res.json();
    return payload;
}