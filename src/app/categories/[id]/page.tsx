import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
import getRelatedProducts from '@/ProductCategoryActions/relatedProducts.actions';
import { ProductType } from '@/types/product.type';
import React from 'react'

export default async function categoryItems({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getRelatedProducts(id);

  // data.category._id ===> category id ==> current product

  if(!data) return <h2>No Products Here</h2>
  

  return (
    <>
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {data.data.map((product: ProductType) => (
            <SingleProduct product={product} key={product.id} variant=''/>
          ))}
        </div>
      </div>
    </>
  );
}
