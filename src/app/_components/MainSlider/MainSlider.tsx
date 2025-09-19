"use client"
import React from 'react'
import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules'

export default function MainSlider() {
  const swiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-3 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    loop: true,
    autoplay: { delay: 2000, disableOnInteraction: false },
    modules: [Pagination, Autoplay],
  };
  const images = [
    {
      path: img1.src,
      label: "slide 1",
    },
        {
      path: img2.src,
      label: "slide 2",
    },
        {
      path: img3.src,
      label: "slide 3",
    },
  ]
  return (
    <>
      {/* <section className="w-[80%] mx-auto my-4 flex">
        <div className="w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image
                src={img1}
                alt="slider-image-1"
                className="w-full object-cover h-[400px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={img2}
                alt="slider-image-1"
                className="w-full object-cover h-[400px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={img3}
                alt="slider-image-1"
                className="w-full object-cover h-[400px]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <Image
            src={img2}
            alt="slider-image-2"
            className="w-full object-cover h-[200px]"
          />
          <Image
            src={img3}
            alt="slider-image-3"
            className="w-full object-cover h-[200px]"
          />
        </div>
      </section> */}
      <section className="w-[80%] mx-auto flex mb-20 mt-24">
        <Swiper className='main-slider' {...swiperOptions}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image.path}
                alt={image.label}
                width={1920}
                height={344}
                loading="lazy"
                className="w-full object-cover h-[21.5rem]"
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
