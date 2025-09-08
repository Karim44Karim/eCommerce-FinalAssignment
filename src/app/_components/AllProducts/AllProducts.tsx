import React, { useContext } from 'react'
import SingleProduct from '../SingleProduct/SingleProduct';
import getProducts from '@/api/products.api';
import { ProductType } from '@/types/product.type';

export default async function AllProducts() {
    
    const data = await getProducts();
  return (
    <div className="container w-[80%] mx-auto my-12">
      <div className="flex flex-wrap">
        {data.map((product: ProductType) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
