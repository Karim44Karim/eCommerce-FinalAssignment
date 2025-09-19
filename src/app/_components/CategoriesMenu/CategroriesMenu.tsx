
import React from 'react'

import getAllCategories from '@/api/allCategories.api';
import getAllSubCategories from '@/api/allSubCategories.api';
import CategoriesMenuDropDown from '../CategorySlider/CategoriesMenuDropDown/CategoriesMenuDropDown';

export default async function CategroriesMenu() {

const { data: categories } = await getAllCategories();
const { data: subCategories } = await getAllSubCategories();

console.log("hello from new menu", categories);
console.log(subCategories);


return (
  <>
    <CategoriesMenuDropDown
      categories={categories}
      subCategories={subCategories}
    />
  </>
);
}
