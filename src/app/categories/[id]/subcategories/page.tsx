"use client"

import getAllSubCategoriesOfCategory from '@/api/allSubCategoriesOfCategory.api';
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { SubCategoryType } from '@/types/subCategory.type';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryDetails() {
  const {id} = useParams<{id: string}>();  

  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {

    const loadSubCategories = async () => {
      setisLoading(true);
      const { data, metadata } = await getAllSubCategoriesOfCategory(id);
      console.log(data);
      
      setSubCategories(data);
      setTotalPages(metadata?.numberOfPages || 1);
      setisLoading(false);
    };
    loadSubCategories();
  }, []);

  // data.category._id ===> category id ==> current product
  console.log(subCategories);
  // if (!subCategories[0]) return <h2>No Subcategories Here</h2>;

  return (
    <>
      <div className="container w-[80%] mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          {isLoading && <div>Loading...</div>}
          {!subCategories[0] && !isLoading && <h2>No Subcategories Here</h2>}
          {subCategories.map((subCategory: SubCategoryType) => (
            <div
              key={subCategory._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[270px] border shadow m-3 rounded-2xl cursor-pointer"
            >
              <Link href={`/products?category[in]=${subCategory.category}`}>
                <div className="p-3 flex flex-col justify-center items-center">
                  <p>{subCategory.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* pagination */}
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
