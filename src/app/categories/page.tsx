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
import { CategoryType } from '@/types/category.type';
import getAllCategories from '@/api/allCategories.api';
import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const loadCategories = async () => {
      const { data, metadata } = await getAllCategories(); 
      setCategories(data);
      setTotalPages(metadata?.numberOfPages || 1);
      setIsLoading(false);
    };
    loadCategories();
  }, [page]);

    if(isLoading) return <div className='text-center p-20'>Loading...</div>

  return (
    <>
      <div className="container w-[80%] mx-auto my-24">
        <div className="flex flex-wrap justify-center items-center">
          {categories.map((category: CategoryType) => (
            <div
              key={category._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[270px] border shadow m-3 rounded-2xl cursor-pointer"
            >
              <div className="p-3 flex flex-col justify-center items-center">
                <Link href={`categories/${category._id}/subcategories`}>
                  <Image
                    src={category.image}
                    width={190}
                    height={180}
                    alt={category.name}
                    className="object-contain aspect-square"
                  />
                  <p>{category.name}</p>
                </Link>
              </div>
            </div>
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
