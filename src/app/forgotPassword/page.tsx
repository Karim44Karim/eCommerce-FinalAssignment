"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPasswordSchema, forgotPasswordSchemaType } from '../schema/forgotPassword.schema';
import forgotPassword from '../ResetPasswordActions/forgotPassword.action';
import AppButton from '../_components/AppBtn/AppBtn';

export default function ForgotPassword() {
  const router = useRouter();
        const [isLoading, setIsLoading] = useState(false);

  const form = useForm<forgotPasswordSchemaType>({
    defaultValues: {
    email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
});


  async function handleForgotPassword(email: forgotPasswordSchemaType) {
    console.log(email);

    try {
            setIsLoading(true);

    const res = await forgotPassword(email);
    console.log(res);
    
    if(res?.statusMsg === "success"){
      console.log("testing",res);
              setIsLoading(false);

      toast.success(res.message, {position: "top-center", duration: 3000});
      router.push('/forgotPassword/verifyCode');
    } else{
      throw new Error(res?.message);
    }
    } catch (error) {
              setIsLoading(false);

      console.log(error);
      toast.error("An unexpected error occurred", {position: "top-center", duration: 3000});
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">
          Please Enter Your Email And We Will Send You A Password Reset Code
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleForgotPassword)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AppButton isLoading={isLoading} className="mt-4 cursor-pointer w-full">
              Send Password Reset Code
            </AppButton>
          </form>
        </Form>
        <div>
          <Link
            href="/forgotPassword"
            className="text-[color:#DB4444] text-sm hover:underline hover:underline-offset-1  hover:cursor-pointer"
          >
            {"Didn't Receive Code! Send a new Code?"}
          </Link>
        </div>
      </div>
    </>
  );
}