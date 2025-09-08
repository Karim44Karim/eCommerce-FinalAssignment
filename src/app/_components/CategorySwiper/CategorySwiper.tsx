"use client"
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { CategoryType } from '@/types/category.type';
import Image from 'next/image';

export default function CategorySwiper({data}: {data: CategoryType[]}) {
  return (
    <>
      <div className="w-[80%] mx-auto">
        <div className='text-slate-500 font-semibold my-2'>Shop Popular Categories</div>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {data.map((category: CategoryType) => (
            <SwiperSlide key={category._id}>
              <Image
                src={category.image}
                width={500}
                height={500}
                alt="slider-image-1"
                className="w-full h-[150px] object-cover"
              />
              <p className="text-center font-bold">{category.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
