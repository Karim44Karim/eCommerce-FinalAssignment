"use client"

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button';
import addToCart from '@/CartActions/addToCart.action';
import { toast } from 'sonner';
import { cartContext } from '@/context/CartContext';

export default function AddBtn({id} : {id: string}) {
    const {numberOfCartItems, setNumberOfCartItems} = useContext(cartContext)!
    async function checkAddProduct(id: string) {
        const res = await addToCart(id);
        console.log(res);
        if (res.status === 'success') {
            toast.success("Product Added Successfully!", {
              position: "top-center",
              duration: 2000,
            });
          setNumberOfCartItems(numberOfCartItems + 1);
        } else{
            toast.error(res.message, {
              position: "top-center",
              duration: 2000,
            });
        }
        
    }

  return <Button onClick={()=> checkAddProduct(id)} className="cursor-pointer w-full">Add to cart</Button>;
}
