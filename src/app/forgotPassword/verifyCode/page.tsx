"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from "zod";
import verifyResetCode from '@/app/ResetPasswordActions/verifyResetCode';
import AppButton from '@/app/_components/AppBtn/AppBtn';

export default function VerifyCode() {
    const router = useRouter();
          const [isLoading, setIsLoading] = useState(false);


    const resetCodeSchema = z.object({
    resetCode: z
        .string()
    })

    type ResetCodeSchemaType = z.infer<typeof resetCodeSchema>

      const form = useForm<ResetCodeSchemaType>({
        defaultValues: {
          resetCode: "",
        },
        resolver: zodResolver(resetCodeSchema),
      });
      
  async function handleVerifyCode(values: ResetCodeSchemaType) {
    console.log(values.resetCode);

    try {
            setIsLoading(true);

    const res = await verifyResetCode(values.resetCode);
    
    if(res?.status === "Success"){
      console.log("testing",res);
              setIsLoading(false);

      toast.success("Code Verification Successful!", {position: "top-center", duration: 3000});
      router.push('/forgotPassword/resetPassword');
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
          Please Enter The Reset Code Sent To Your Email
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerifyCode)}>
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AppButton isLoading={isLoading} className="mt-4 cursor-pointer w-full">
              Verify Code
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
