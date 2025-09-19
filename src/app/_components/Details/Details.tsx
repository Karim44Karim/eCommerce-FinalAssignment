import React from 'react'
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types/product.type';
import Image from 'next/image';
import AddBtn from '../AddBtn/AddBtn';
import DetailsSwiper from '../DetailsSwiper/DetailsSwiper';
import AddToWishlistBtn from '../AddToWishlistBtn/AddToWishlistBtn';
import { Separator } from '@/components/ui/separator';

export default function Details({data}:{data: ProductType}) {
  console.log(data);
  
  return (
    <>
      <div className="text-center mx-auto container w-full lg:w-[80%] flex justify-between pt-16">
        <div className="w-2/3">
          <DetailsSwiper images={data.images} />
        </div>
        <div className="flex flex-col w-1/3">
          <h2 className="text-2xl font-semibold text-start">{data.title}</h2>
          <div className="flex flex-col items-start">
            <div className="flex py-3">
              <div>
                {/* {product.ratingsAverage}{" "} */}
                {[...Array(5).keys()].map((key) => (
                  <i
                    key={key}
                    className={`fas fa-star text-sm ${
                      key < Math.round(data.ratingsAverage)
                        ? "text-yellow-500"
                        : "text-[#BFBFBF]"
                    }`}
                  ></i>
                ))}
              </div>
              <div className="text-[#808080] text-[14px] font-semibold">
                {" "}
                {`(${data.ratingsQuantity})`}
                <span className="ms-1">Reviews | </span>
                {data.quantity ? (
                  <span className="text-emerald-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </div>
            </div>
            <div className="text-2xl">
              {data.price} <span className="ms-1">EGP</span>
            </div>
            <p className="py-3 text-sm text-start">{data.description}</p>
            <Separator className="my-5" />
            <div className="w-full flex justify-between items-center gap-3">
              <div className="border rounded-sm">
                <button className="w-10 h-10 border-e-1 text-xl font-medium">
                  -
                </button>
                <input
                  type="text"
                  className="w-[80px] text-center text-xl font-medium"
                  placeholder="1"
                />
                <button className="w-10 h-10 rounded-sm bg-red-500 text-white text-xl font-medium border-s-1">
                  +
                </button>
              </div>
              <Button variant="destructive" className="flex-grow">
                Buy Now
              </Button>
              <div className="border-1 border-black rounded-sm">
                <AddToWishlistBtn id={data.id} />
              </div>
            </div>
            <div className="py-10">
              <div className="border p-3 flex justify-center items-center gap-3">
                <div>
                  <i className="fa-solid fa-truck text-2xl"></i>
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-xs underline font-medium cursor-pointer">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="border p-3 flex justify-start items-center gap-3">
                <div>
                  <i className="fa-solid fa-arrows-rotate text-2xl"></i>
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-medium">Return Delivery</p>
                  <p className="text-xs font-medium">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="underline cursor-pointer">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
