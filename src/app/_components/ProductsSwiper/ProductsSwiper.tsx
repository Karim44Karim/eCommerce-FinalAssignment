"use client"
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Pagination, Navigation,  Grid } from 'swiper/modules'

import { CategoryType } from '@/types/category.type';
import Image from 'next/image';
import { ProductType } from '@/types/product.type';
import SingleProduct from '../SingleProduct/SingleProduct';

export default function ProductsSwiper({data, variant, rows}: {data: ProductType[], variant: string, rows: number}) {

  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !size-3 border-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-red-500 border-white",
        }}
        grid={{
          rows: rows,
          fill: "row", 
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation, Grid]}
        navigation={true}
        // className="categories-slider mb-20"
      >
        {data.map((product: ProductType) => (
          <SwiperSlide key={product.id} className="mb-8">
            <div className="w-full">
              <SingleProduct product={product} variant={variant} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
