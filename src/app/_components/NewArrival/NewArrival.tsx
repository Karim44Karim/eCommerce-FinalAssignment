import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle';
import img1 from "../../../../public/ps5.png"
import img2 from "../../../../public/fashion.jpg"
import img3 from "../../../../public/speakers.png"
import img4 from "../../../../public/perfume.png"
import Image from 'next/image';
import Link from 'next/link';

export default function NewArrival() {
  return (
    <>
      <section className="w-[80%] mx-auto">
        <SectionTitle title={"Featured"} subtitle={"New Arrival"} />
        <div className="py-8">
          <div className="grid grid-cols-4 grid-rows-4 gap-4">
            <div className="col-span-2 row-span-4 relative bg-black">
              {" "}
              <Image
                src={img1}
                alt={"ps-5"}
                width={511}
                height={511}
                loading="lazy"
                className="w-full object-cover h-full"
              ></Image>
              <div className="text-white absolute bottom-1/8 p-6">
                <h3 className="font-semibold text-2xl">Playstation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link href={"/products"} className="underline">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="col-span-2 row-span-2 col-start-3 relative bg-black">
              {" "}
              <Image
                src={img2}
                alt={"ps-5"}
                width={511}
                height={250}
                loading="lazy"
                className="w-full object-cover h-full"
              ></Image>
              <div className="text-white absolute bottom-1/8 p-6">
                <h3 className="font-semibold text-2xl">Playstation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link href={"/products"} className="underline">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="row-span-2 col-start-3 row-start-3 relative bg-black">
              {" "}
              <Image
                src={img3}
                alt={"ps-5"}
                width={250}
                height={250}
                loading="lazy"
                className="w-full object-cover h-full"
              ></Image>
              <div className="text-white absolute bottom-1/8 p-6">
                <h3 className="font-semibold text-2xl">Playstation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link href={"/products"} className="underline">
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="row-span-2 col-start-4 row-start-3 relative bg-black">
              {" "}
              <Image
                src={img4}
                alt={"ps-5"}
                width={250}
                height={250}
                loading="lazy"
                className="w-full object-cover h-full"
              ></Image>
              <div className="text-white absolute bottom-1/8 p-6">
                <h3 className="font-semibold text-2xl">Playstation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link href={"/products"} className="underline">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-20">
          <div className="w-1/3 flex justify-center items-center flex-col">
            <div className="h-15 w-15 bg-black rounded-full flex justify-center items-center text-2xl border-8">
              <i className="fa-solid fa-truck-fast text-white bg-black"></i>
            </div>
            <h3 className="font-semibold text-2xl mt-3">FREE AND FAST DELIVERY</h3>
            <p className="font-medium text-sm mt-3">
              Free delivery for all orders over $140
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col">
            <div className="h-15 w-15 bg-black rounded-full flex justify-center items-center text-2xl border-8">
              <i className="fa-solid fa-headphones text-white bg-black"></i>
            </div>
            <h3 className="font-semibold text-2xl mt-3">24/7 CUSTOMER SERVICE</h3>
            <p className="font-medium text-sm mt-3">
              Friendly 24/7 customer support
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col">
            <div className="h-15 w-15 bg-black rounded-full flex justify-center items-center text-2xl border-8">
              <i className="fa-solid fa-shield   text-white bg-black"></i>
            </div>
            <h3 className="font-semibold text-2xl mt-3">MONEY BACK GUARANTEE</h3>
            <p className="font-medium text-sm mt-3">
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
