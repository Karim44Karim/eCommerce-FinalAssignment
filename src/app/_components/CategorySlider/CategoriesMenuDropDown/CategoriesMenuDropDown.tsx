"use client"
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryType } from "@/types/category.type";
import { SubCategoryType } from "@/types/subCategory.type";
import Link from "next/link";

function CategoryItem({
  category,
  subCategories,
}: {
  category: CategoryType;
  subCategories: SubCategoryType[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Link
          href={`/products?category[in]=${category._id}`}
          className="flex justify-between items-center px-2 py-1 hover:bg-gray-100"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {category.name}
          {subCategories.length > 0 && (
            <i className="fa-solid fa-angle-right"></i>
          )}
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="start"
        className="shadow-none border-none"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {subCategories.map((subcategory: SubCategoryType) => (
          <DropdownMenuItem key={subcategory._id} asChild>
            <Link href={`/products?category[in]=${subcategory.category}`}>{subcategory.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CategoriesMenuDropDown({
  categories,
  subCategories,
}: {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
}) {
  return (
    <div className="flex flex-col w-1/2 md:w-1/5 relative border-r my-14">
      {categories?.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          subCategories={subCategories.filter(
            (sub) => sub.category === category._id
          )}
        />
      ))}
    </div>
  );
}
