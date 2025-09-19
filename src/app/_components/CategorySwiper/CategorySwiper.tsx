"use client"
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules'

import { CategoryType } from '@/types/category.type';
import Image from 'next/image';
import Link from 'next/link';

export default function CategorySwiper({data}: {data: CategoryType[]}) {

  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !size-3 border-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-red-500 border-white",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        navigation={true}
        className="categories-slider mb-20"
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id} className="mb-8">
            <Link href={`/products?category[in]=${category._id}`}>
              <Image
                src={category.image}
                width={270}
                height={220}
                alt="slider-image-1"
                className="w-full h-[150px] object-cover bg-gray-100 mb-4"
              />
              <p className="text-center font-medium">{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
