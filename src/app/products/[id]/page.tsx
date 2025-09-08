import singleProduct from '@/api/singleProduct';
import Details from '@/app/_components/Details/Details';
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
import getRelatedProducts from '@/ProductCategoryActions/relatedProducts.actions';
import { ProductType } from '@/types/product.type';
import React from 'react'

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await singleProduct(id);

  // data.category._id ===> category id ==> current product

  if(!data) return <h2>No Products Here</h2>
  const relatedProducts = await getRelatedProducts(data.category._id);
  console.log(relatedProducts);
  

  return (
    <>
      <Details data={data} />
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {relatedProducts.data.map((product: ProductType) => (
            <SingleProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
