"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { signInResponseType } from '@/types/signInRes.type';
import {checkoutSchemaType, checkoutSchema} from '@/app/schema/checkout.schema'
import onlinePayment from '@/checkoutActions/onlineCheckoutAction';

export default function Checkout() {

  const {id} : {id: string} = useParams();
  
  
  // const router = useRouter();

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    console.log(values);

    const res = await onlinePayment(id ,"",values);

    if(res.status === "success"){
      console.log(res.session.url);
      window.location.href = res.session.url;

      
    }
    
    //   try {
    //   const res: signInResponseType | undefined = await signIn("credentials", {        
    //   redirect: false,
    //   email: values.email,
    //   password: values.password,
    // });
    // console.log(res);
    
    // if(res?.ok){
    //   console.log(res);
    //   toast.success("Logged In Successfully!", {position: "top-center", duration: 3000});
    //   router.push('/');
    // } else{
    //   throw new Error(res?.error?? "Login Failed");
    // }

    // } catch (error) {
    //   console.log(error);
    //   toast.error("An unexpected error occurred", {position: "top-center", duration: 3000});
    // }
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
            <Button className="mt-4 cursor-pointer w-full">Pay Now</Button>
          </form>
        </Form>
        <div>
          <Link
            href="/forgotPassword"
            className="text-[color:#DB4444] text-sm hover:underline hover:underline-offset-1  hover:cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
}