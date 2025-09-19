import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/types/product.type';
import AddBtn from '../AddBtn/AddBtn';
import AddToWishlistBtn from '../AddToWishlistBtn/AddToWishlistBtn';
import { wishlistContext } from '@/context/WishlistContext';
import { projectUpdate } from 'next/dist/build/swc/generated-native';


export default function SingleProduct({product, variant}: {product: ProductType, variant?: string}) {
  return (
    <div className={`${variant === "slider" ? "max-w-[270px]":"w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[270px]"}`}>
      <div className="prod p-4">
        <Card className="group gap-2 p-2 relative border-0 shadow-none">
          <div className="bg-gray-100 overflow-hidden rounded-sm">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle className="overflow-y-hidden mx-auto">
                  <Image
                    src={product.imageCover}
                    width={190}
                    height={180}
                    alt={product.description}
                    className="object-contain aspect-square"
                  />
                </CardTitle>
                <CardDescription className="text-emerald-500">
                  {/* {product.category.name} */}
                </CardDescription>
              </CardHeader>
            </Link>

            <div className="w-full left-0 bottom-0 transition-all duration-300 translate-y-full group-hover:translate-y-0 invisible group-hover:visible">
              <AddBtn id={product.id} />
            </div>
          </div>

          <CardContent className="font-semibold pt-3 px-0">
            <Link href={`/products/${product.id}`}>
              <p className="line-clamp-1">{product.title}</p>
            </Link>
          </CardContent>
          <CardFooter className="px-0">
            <div className="flex w-full flex-col">
              <div>
                <span className="text-red-500 font-medium">
                  {product.price}
                </span>
                <span className="text-red-500 px-1 font-medium">EGP</span>
              </div>
              <div className="flex flex-row">
                <div className="flex justify-center items-center pe-3">
                  {/* {product.ratingsAverage}{" "} */}
                  {[...Array(5).keys()].map((key) => (
                    <i
                      key={key}
                      className={`fas fa-star text-sm ${
                        key < Math.round(product.ratingsAverage)
                          ? "text-yellow-500"
                          : "text-[#BFBFBF]"
                      }`}
                    ></i>
                  ))}
                </div>
                <div className="text-[#808080] text-[14px] font-semibold">
                  {" "}
                  {`(${product.ratingsQuantity})`}
                </div>
              </div>
            </div>
          </CardFooter>
          <div className="absolute top-7 right-7">
            <AddToWishlistBtn id={product.id} />
          </div>
          <div className="flex items-center justify-center size-8 bg-white rounded-full absolute top-16 right-7 hover:cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <i className={`fa-regular fa-eye hover:text-blue-400`}></i>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
