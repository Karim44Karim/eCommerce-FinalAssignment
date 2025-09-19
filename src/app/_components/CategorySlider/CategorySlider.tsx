import getAllCategories from '@/api/allCategories.api'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Separator } from "@/components/ui/separator"

export default async function CategorySlider() {
    const {data} = await getAllCategories();

  return (
    <>
      <div className="w-[80%] mx-auto">
        <SectionTitle title={"Categories"} subtitle={"Browse By Category"} />
        <CategorySwiper data={data} />
        <Separator />
      </div>
    </>
  );
}
