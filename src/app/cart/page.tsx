"use client"
import { authOptions } from '@/auth';
import clearCart from '@/CartActions/clearCart.action';
import getLoggedUserCart from '@/CartActions/getUserCart';
import removeCartItem from '@/CartActions/removeCartItem.action';
import updateCartQuantity from '@/CartActions/updateCartQuantity.action';
import { Button } from '@/components/ui/button';
import { cartContext } from '@/context/CartContext';
import getMyToken from '@/utilities/getMyToken';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { CartProductType } from '@/types/cart.type';
import Link from 'next/link';


export default function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [total, setTotal] = useState(0);
  const [cartId, setcartId] = useState("");

  const {numberOfCartItems, setNumberOfCartItems} = useContext(cartContext)!;
  console.log(products);
  
  // const session = await getServerSession(authOptions);

  // if(!session){
  //   redirect('/login');
  // }

  // const [token, setToken] = useState<string | undefined>("");

  // async function getTheToken() {
  //   const token = await getMyToken();
  //   console.log(token);
  //   setToken(token);
  //   }
  
  //   useEffect(() => {
  //     getTheToken();
  //   }, [])
async function clearCartItems() {
  const res = await clearCart();
  if (res.message === 'success') {
    toast.success("Cart Cleared Successfully!", {
      position: "top-center",
      duration: 2000,
    });
    // getUserCart();
    setProducts([]);
    console.log("test testtest testtest test",res.data.cartId);
    
  } else{
    toast.error("Failed To Clear Cart!", {
      position: "top-center",
      duration: 2000,
    });
  }
}

  async function updateProduct(id:string, count:string, sign: string) {
    setCurrentId(id);
    setIsUpdating(true);
    const res = await updateCartQuantity(id, count);
    console.log(res);
    if(res.status ==='success'){
      setProducts(res.data.products);
      toast.success("Quantity Updated Successfully!", {
        position: "top-center",
        duration: 2000,
      });
    if (sign === "-") {
      setNumberOfCartItems(numberOfCartItems - 1);
      
    } else if (sign === "+") {
      setNumberOfCartItems(numberOfCartItems + 1);
    }
    getUserCart();
    setIsUpdating(false);
    } else{
      toast.error("Failed To Update Quantity!", {
        position: "top-center",
        duration: 2000,
      });
    setIsUpdating(false);
    }
    
  }
  async function deleteProduct(id:string) {
    setIsUpdating(true);
    const res = await removeCartItem(id);
    if (res.status === 'success'){
      setProducts(res.data.products);
      toast.success("Product Deleted Successfully!", {
        position: "top-center",
        duration: 2000,
      });
    let sum = 0;
    res.data.products.forEach((element: CartProductType) => {
      sum += element.count;
    });
    setNumberOfCartItems(sum);
    getUserCart();
    setIsUpdating(false);

    } else{
      toast.error("Failed To Remove Item From Cart!", {
        position: "top-center",
        duration: 2000,
      });
    setIsUpdating(false);
    }
    
    
  }
  async function getUserCart(){
    try {
      setIsLoading(true);
      const res = await getLoggedUserCart();
      console.log(res);
      
      if (res.status === 'success') {
        setProducts(res.data.products);
        setIsLoading(false);
        setTotal(res.data.totalCartPrice);
        setcartId(res.cartId);
      }
    } catch (error) {
        setIsLoading(false);
        console.log(error);
      
    }

  }
    
  useEffect(() => {
    getUserCart();
  }, []);
  
  if (isLoading) {
    return (
      <h2 className="text-center text-3xl font-bold my-12 text-slate-900">
        Loading...
      </h2>
    );
  }
  return (
    <>
      {products?.length > 0 ? (
        <div className="w-2/3 mx-auto my-12">
          <div className="flex justify-end">
            <Button
              onClick={() => clearCartItems()}
              className="cursor-pointer my-4 bg-red-500 hover:bg-red-700"
            >
              Clear Cart
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-center text-3xl font-bold text-emerald-600">
              Total Cart Price: {total}
            </h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-16 py-3">
                          <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product: CartProductType) => (
                        <tr
                          key={product.product._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="p-4">
                            <img
                              src={product.product.imageCover}
                              className="w-16 md:w-32 max-w-full max-h-full"
                              alt={product.product.title}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.product.title}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <button
                                disabled={isUpdating}
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    `${product.count - 1}`,
                                    "-"
                                  )
                                }
                                className="disabled:bg-slate-600 disabled:text-white inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <div>
                                {currentId === product.product.id &&
                                isUpdating ? (
                                  <i className="fas fa-spinner fa-spin"></i>
                                ) : (
                                  <span>{product.count}</span>
                                )}
                              </div>
                              <button
                                disabled={isUpdating}
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    `${product.count + 1}`,
                                    "+"
                                  )
                                }
                                className="disabled:bg-slate-600 disabled:text-white inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.price * product.count} EGP
                          </td>
                          <td className="px-6 py-4">
                            <button
                              disabled={isUpdating}
                              onClick={() => deleteProduct(product.product.id)}
                              className="text-red-500 font-semibold cursor-pointer hover:underline disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </tbody>
            </table>
          </div>
          <Link href={`/checkout/${cartId}`}>
            <Button className="bg-blue-600 text-white w-full cursor-pointer my-4 p-5 hover:bg-blue-700">
              Checkout Now
            </Button>
          </Link>
        </div>
      ) : (
        <h2 className="text-center text-3xl font-bold text-red-600 my-12">
          Cart Is Empty!
        </h2>
      )}
    </>
  );
}
