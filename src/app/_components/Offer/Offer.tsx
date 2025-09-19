import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import img1 from "../../../../public/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
import Countdown from '../CountDown/CountDown'
export default function Offer() {
    
  return (
    <section>
      <div className="container mx-auto w-[80%] text-white bg-black">
        <div className="flex justify-between items-center p-10">
          <div className='flex flex-col gap-12'>
            <h3 className="text-[#00FF66] font-semibold">Categories</h3>
            <h3 className="font-semibold text-5xl">Enhance Your Experience</h3>
            <div>
              <Countdown targetDate="2025-09-21T23:59:59Z" />{" "}
            </div>
            <div>
              <Button asChild className='bg-[#00FF66] px-12 py-6'>
                <Link href={"/products"}>Buy Now!</Link>
              </Button>
            </div>
          </div>
          <div>
            <Image
              src={img1}
              width={568}
              height={330}
              alt={"offer-image"}
              className="object-contain aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
