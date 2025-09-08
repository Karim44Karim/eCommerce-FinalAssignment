"use server"
import getMyToken from "@/utilities/getMyToken"

export default async function getLoggedUserWishlist() {

    const token = await getMyToken();

    if (!token){
        throw new Error("Please Login First!");
    }
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: "GET",
        headers: {
            token,
            "Content-Type": "application/json",
        },
    })

    const payload = await res.json();
    return payload;
}