"use client"

import React, { useContext, useState } from 'react'

import { ProductType } from '@/types/product.type';
import SingleProduct from '../_components/SingleProduct/SingleProduct';
import { wishlistContext } from '@/context/WishlistContext';


export default function Wishlist() {


  const { wishlistProducts, isLoading } = useContext(wishlistContext)!;

  // const {numberOfWishlistItems, setnumberOfWishlistItems} = useContext(wishlistContext)!;
  // console.log(products);
  
  // async function deleteProduct(id:string) {
  //   setIsUpdating(true);
  //   const res = await removeCartItem(id);
  //   if (res.status === 'success'){
  //     setProducts(res.data.products);
  //     toast.success("Product Deleted Successfully!", {
  //       position: "top-center",
  //       duration: 2000,
  //     });
  //   getUserWishlist();
  //   setIsUpdating(false);

  //   } else{
  //     toast.error("Failed To Remove Item From Cart!", {
  //       position: "top-center",
  //       duration: 2000,
  //     });
  //   setIsUpdating(false);
  //   }
    
    
  // }



  
  if (isLoading) {
    return (
      <h2 className="text-center text-3xl font-bold my-12 text-slate-900">
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {wishlistProducts?.map((product: ProductType) => (
            <SingleProduct product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
}
