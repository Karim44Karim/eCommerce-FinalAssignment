"use client"
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

export default function DetailsSwiper({ images }:{images: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex w-[80%] mx-auto justify-aruond items-center">
      {/* Thumbnails (vertical) */}
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={16}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-60 h-[600px]" // width for thumbs + fixed height
      >
        {images.map((src: string, i) => (
          <SwiperSlide key={i}>
            <div className='max-w-[170px]'>
              <img
                src={src}
                className="w-full max-h-[138px] cursor-pointer object-cover bg-gray-100"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main slider (horizontal) */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[500px] h-[600px] bg-grey-100 object-contain"
      >
        {images.map((src: string, i) => (
          <SwiperSlide key={i}>
            <img src={src} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
