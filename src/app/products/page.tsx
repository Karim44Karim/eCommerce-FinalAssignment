"use client"
import React, { useEffect, useState } from 'react'
import SingleProduct from '../_components/SingleProduct/SingleProduct';
import { ProductType } from '@/types/product.type';
import getProducts from '@/api/products.api';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from 'next/navigation';

export default function Products() {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const categoryId = searchParams.get("category[in]");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  console.log("testing new new new",categoryId);
  
  useEffect(() => {
    setIsLoading(true);
    const loadProducts = async () => {
      const { data, metadata } = await getProducts("12", "price", page, brand || undefined, categoryId || undefined);
      setProducts(data);
      setTotalPages(metadata?.numberOfPages || 1);
      setIsLoading(false);
    };
    loadProducts();
  }, [page, brand, categoryId]);

  if(isLoading) return <div className='text-center p-20'>Loading...</div>
  if (products.length == 0) return <div className='text-center p-20'>Error Loading Products</div>
  return (
    <>
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap justify-center items-center">
          {products.map((product: ProductType) => (
            <SingleProduct product={product} variant="" key={product.id} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <div className="flex">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={page === pageNum}
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                </div>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
}
