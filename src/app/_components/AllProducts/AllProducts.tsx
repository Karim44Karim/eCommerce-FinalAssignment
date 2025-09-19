import SingleProduct from '../SingleProduct/SingleProduct';
import getProducts from '@/api/products.api';
import { ProductType } from '@/types/product.type';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductsSwiper from '../ProductsSwiper/ProductsSwiper';
import { Separator } from '@/components/ui/separator';

export default async function AllProducts({
  number,
  sectionTitle,
  subTitle,
  sort,
  variant, 
  rows
}: {
  number: string;
  sectionTitle: string;
  subTitle: string;
  sort: string;
  variant: string;
  rows: number;
}) {
  const {data} = await getProducts(number, sort);
  return (
    <div className="container w-[80%] mx-auto my-12">
      <SectionTitle title={sectionTitle} subtitle={subTitle} />

      {variant === "slider" ? (
        <ProductsSwiper data={data} variant={variant} rows={rows} />
      ) : (
        <div className="flex flex-wrap mx-auto justify-around items-center">
          {data.map((product: ProductType) => (
            <SingleProduct
              product={product}
              key={product.id}
              variant={variant}
            />
          ))}
        </div>
      )}
      <div className="text-center">
        <Button variant="destructive" asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
      <Separator className='mt-5' />
    </div>
  );
}
