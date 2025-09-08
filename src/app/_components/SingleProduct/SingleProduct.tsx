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


export default function SingleProduct({product}: {product: ProductType}) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
      <div className="prod p-4">
        <Card className="gap-2 p-2 relative">
          <Link href={`/products/${product.id}`}>
            <CardHeader>
              <CardTitle>
                <Image
                  src={product.imageCover}
                  width={500}
                  height={500}
                  alt=""
                />
              </CardTitle>
              <CardDescription className="text-emerald-500">
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="font-bold line-clamp-1">
              <p>{product.title}</p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <span>{product.price} EGP</span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-500"></i>
                </span>
              </div>
            </CardFooter>
          </Link>
          <AddBtn id={product.id} />
          <AddToWishlistBtn id={product.id} />
        </Card>
      </div>
    </div>
  );
}
