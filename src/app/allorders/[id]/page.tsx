import singleProduct from '@/api/singleProduct';
import Details from '@/app/_components/Details/Details';
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
import getLoggedUserOrders from '@/OrdersActions/getUserOrders';
import getRelatedProducts from '@/ProductCategoryActions/relatedProducts.actions';
import { ProductType } from '@/types/product.type';
import React from 'react'

export default async function myOrders({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getLoggedUserOrders(id);

  // data.category._id ===> category id ==> current product

  if(!data) return <h2>No Orders Yet</h2>

  console.log("hello from my orders", data);
  
  

  return (
    <>
    <h1>testing</h1>
      {/* <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {data.data.map((product: ProductType) => (
            <SingleProduct product={product} key={product.id} variant=''/>
          ))}
        </div>
      </div> */}
    </>
  );
}
