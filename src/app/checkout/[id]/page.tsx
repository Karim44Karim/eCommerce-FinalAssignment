"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { signInResponseType } from '@/types/signInRes.type';
import {checkoutSchemaType, checkoutSchema} from '@/app/schema/checkout.schema'
import onlinePayment from '@/checkoutActions/onlineCheckoutAction';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import cashPayment from '@/checkoutActions/cashCheckoutAction';
import { cartContext } from '@/context/CartContext';
import AppButton from '@/app/_components/AppBtn/AppBtn';

export default function Checkout() {

  const {id} : {id: string} = useParams();
  
  
  const router = useRouter();
        const [isLoading, setIsLoading] = useState(false);

  const {numberOfCartItems, setNumberOfCartItems} = useContext(cartContext)!;

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      payment: "cash",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
  try {
    console.log(values);
          setIsLoading(true);


    if (values.payment === "card") {
      const res = await onlinePayment(id, "", values);

      if (res.status === "success") {
                setIsLoading(false);

        window.location.href = res.session.url;
      } else {
                setIsLoading(false);

        toast.error(res.message || "Card payment failed. Please try again.", {position:"top-center"});
      }
    } else {
              setIsLoading(false);

      const res = await cashPayment(id, values);

      if (res.status === "success") {
                setIsLoading(false);

        toast.success("Order placed successfully!", {position:"top-center"});
        router.push("/");
        setNumberOfCartItems(0);

      } else {
                setIsLoading(false);

        toast.error(res.message || "Cash payment failed. Please try again.", {position:"top-center"});
      }
    }
  } catch (error) {
            setIsLoading(false);

    console.error(error);
    toast.error("Something went wrong. Please try again later.", {position:"top-center"});
  }
}
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Checkout Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup defaultValue="cash" className="mt-4" {...field} onValueChange={field.onChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Bank</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on delivery</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AppButton isLoading={isLoading} className="mt-4 cursor-pointer w-full">Pay Now</AppButton>
          </form>
        </Form>
        <div>
        </div>
      </div>
    </>
  );
}