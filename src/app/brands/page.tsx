"use client"
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
import Image from 'next/image';
import Link from 'next/link';
import { BrandType } from '@/types/brand.type';
import getAllBrands from '@/api/allBrands.api';

export default function Brands() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBrands = async () => {
      const { data, metadata } = await getAllBrands(); 
      setBrands(data);
      setTotalPages(metadata?.numberOfPages || 1);
    };
    loadBrands();
  }, [page]);

  return (
    <>
      <div className="container w-[80%] mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          {brands.map((brand: BrandType) => (
            <div
              key={brand._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[270px] border shadow m-3 rounded-2xl cursor-pointer"
            >
              <div className="p-3 flex flex-col justify-center items-center">
                <Link href={`products?brand=${brand._id}`}>
                  <Image
                    src={brand.image}
                    width={190}
                    height={180}
                    alt={brand.name}
                    className="object-contain aspect-square"
                  />
                  <p>{brand.name}</p>
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
