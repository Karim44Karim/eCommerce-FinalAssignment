"use server"

export default async function getLoggedUserOrders(id: string) {


    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = await res.json();
    return payload;
}