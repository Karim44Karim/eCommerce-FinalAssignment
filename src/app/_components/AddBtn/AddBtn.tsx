"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import addToCart from "@/CartActions/addToCart.action";
import { toast } from "sonner";
import { cartContext } from "@/context/CartContext";

export default function AddBtn({ id }: { id: string }) {
  const { numberOfCartItems, setNumberOfCartItems } = useContext(cartContext)!;
  const [isLoading, setIsLoading] = useState(false);

  async function checkAddProduct(productId: string) {
    try {
      setIsLoading(true);
      const res = await addToCart(productId);
      console.log(res);

      if (res.status === "success") {
        toast.success("Product Added Successfully!", {
          position: "top-center",
          duration: 2000,
        });
        setNumberOfCartItems(numberOfCartItems + 1);
      } else {
        toast.error(res.message, {
          position: "top-center",
          duration: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={() => checkAddProduct(id)}
      className="cursor-pointer w-full rounded-none"
      disabled={isLoading}
    >
      {isLoading && (
        <Spinner
          size="sm"
          aria-label="loading spinner"
          className="me-2"
        />
      )}
      {isLoading ? "Adding..." : "Add to cart"}
    </Button>
  );
}
