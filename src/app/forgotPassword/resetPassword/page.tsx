"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { resetPasswordSchema, resetPasswordSchemaType } from '@/app/schema/reset.Passwordshcema';
import AppButton from '@/app/_components/AppBtn/AppBtn';

export default function ResetPassword() {
  
  const router = useRouter();
        const [isLoading, setIsLoading] = useState(false);


  const form = useForm<resetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleResetPassword(values: resetPasswordSchemaType) {
    console.log(values);

    try {
            setIsLoading(true);

          const res = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    );
    
    if(res.statusText === 'OK'){
      console.log(res);
      toast.success("Password Reset Successfully!", {position: "top-center", duration: 3000});
              setIsLoading(false);

      router.push('/login');
    }
    if (res.statusText != 'OK') {
      throw new Error("Something went wrong!")
    }
    } catch (error) {
              setIsLoading(false);

  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Something went wrong!", {
      position: "top-center",
      duration: 3000,
    });
  } else if (error instanceof Error) {
    toast.error(error.message, {
      position: "top-center",
      duration: 3000,
    });
  } else {
    toast.error("An unexpected error occurred!", {
      position: "top-center",
      duration: 3000,
    });
  }
}


    
  }
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
      <h1 className='text-3xl text-center font-bold my-4'>Reset Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPassword)}>
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
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repassword:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AppButton isLoading={isLoading} className='mt-4 cursor-pointer w-full'>Reset Password</AppButton>
          </form>
        </Form>
      </div>
    </>
  );
}
