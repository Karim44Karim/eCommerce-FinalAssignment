"use client"

import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { wishlistContext } from '@/context/WishlistContext';
import addToWishlist from '@/WishlistActions/addToWishlist.action';
import { ProductType } from '@/types/product.type';
import removeWishlistItem from '@/WishlistActions/removeWishlistItem.action';

export default function AddToWishlistBtn({id} : {id: string}) {
    const {numberOfWishlistItems, setnumberOfWishlistItems, wishlistProducts, getUserWishlist} = useContext(wishlistContext)!
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
      setIsInWishlist(
        wishlistProducts.some((element: ProductType) => element.id === id)
      );
    }, [wishlistProducts, id]);

    async function checkAddProductToWishlist(id: string) {
        if (isInWishlist) {
          setIsInWishlist(false);
          const res = await removeWishlistItem(id);
          console.log(res);
          if (res.status === "success") {
            await getUserWishlist();
            toast.success("Product Removed From Wishlist Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          } else {
            setIsInWishlist(false);
            toast.error(res.message, {
              position: "top-center",
              duration: 2000,
            });
          }
        } else{
          setIsInWishlist(true);
          const res = await addToWishlist(id);
          console.log(res);
          await getUserWishlist();
          if (res.status === "success") {
            toast.success("Product Added Successfully!", {
              position: "top-center",
              duration: 3000,
            });
          } else {
            setIsInWishlist(false);
            toast.error(res.message, {
              position: "top-center",
              duration: 2000,
            });
          }
        }
        
    }

  return (
    <>
      <div
        onClick={() => checkAddProductToWishlist(id)}
        className="flex items-center justify-center size-8 bg-white rounded-full  hover:cursor-pointer hover:text-red-400"
      >
        <i className={`fa-regular fa-heart ${isInWishlist? 'fa-solid text-red-400':''}`} ></i>
      </div>
    </>
  );
}