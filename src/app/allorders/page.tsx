import getLoggedUserOrders from '@/OrdersActions/getUserOrders';
import verifyToken from '@/OrdersActions/verifyToken';
import { CartItem, OrderType } from '@/types/order.type';
import getMyToken from '@/utilities/getMyToken'
import React from 'react'

export default async function AllOrders() {

  const token = await getMyToken();

    if (!token) {
    return <div>No token found. Please log in.</div>;
  }

  const {decoded} = await verifyToken(token);

  
    if (!decoded?.id) {
    return <div>Invalid token. Please log in again.</div>;
  }
  const orders = await getLoggedUserOrders(decoded.id);

    if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  
  return (
    <div className="container w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-8">
        {orders.map((order: OrderType, index: number) => (
          <div
            key={order._id}
            className="p-6 border rounded-lg shadow-sm bg-white"
          >
            <div className="mb-4">
              <p className="font-semibold">
                <strong>Order #{index + 1}</strong> – {order._id}
              </p>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Payment: {order.paymentMethodType} (
                {order.isPaid ? "Paid" : "Unpaid"})
              </p>
              <p className="text-sm">
                Delivery: {order.isDelivered ? "Delivered" : "Pending"}
              </p>
              <p className="mt-2 font-medium">
                Total: {order.totalOrderPrice} | Shipping: {order.shippingPrice}{" "}
                | Tax: {order.taxPrice}
              </p>
            </div>

            {order.cartItems && order.cartItems.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <ul className="space-y-2">
                  {order.cartItems.map((item: CartItem) => (
                    <li
                      key={item._id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        <p>{item.product?.title ?? "Unknown Product"}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.count} × {item.price}
                        </p>
                      </div>
                      <p className="font-medium">{item.count * item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
