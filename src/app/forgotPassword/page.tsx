"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { signInResponseType } from '@/types/signInRes.type';
import { forgotPasswordSchema, forgotPasswordSchemaType } from '../schema/forgotPassword.schema';
import forgotPassword from '../ResetPasswordActions/forgotPassword.action';

export default function ForgotPassword() {
  const router = useRouter();
  const form = useForm<forgotPasswordSchemaType>({
    defaultValues: {
    email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
});


  async function handleForgotPassword(email: forgotPasswordSchemaType) {
    console.log(email);

    try {
    const res = await forgotPassword(email);
    console.log(res);
    
    if(res?.statusMsg === "success"){
      console.log("testing",res);
      toast.success(res.message, {position: "top-center", duration: 3000});
      router.push('/forgotPassword/verifyCode');
    } else{
      throw new Error(res?.message);
    }
    } catch (error) {
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
            <Button className="mt-4 cursor-pointer w-full">
              Send Password Reset Code
            </Button>
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