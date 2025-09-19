"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { resetPasswordSchema, resetPasswordSchemaType } from '@/app/schema/reset.Passwordshcema';
import { changePasswordSchema, changePasswordSchemaType } from '../schema/change.Passwordshcema';
import getMyToken from '@/utilities/getMyToken';
import AppButton from '../_components/AppBtn/AppBtn';

export default function ManageAccount() {
  
  const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

  const form = useForm<changePasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  async function handleResetPassword(values: changePasswordSchemaType) {
    console.log(values);
          setIsLoading(true);

    const token = await getMyToken();
    try {
          const res = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values,
            {
              headers: { token, "Content-Type": "application/json" },
            }
          );
    
    if(res.statusText === 'OK'){
      console.log(res);
      toast.success("Password Changed Successfully!", {position: "top-center", duration: 3000});
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
      <h2 className='text-3xl font-bold my-4'>Manage Account</h2>
      <h3 className='text-2xl font-bold my-4'>Change Password</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPassword)}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
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
            <AppButton isLoading={isLoading} className='mt-4 cursor-pointer w-full'>Change Password</AppButton>
          </form>
        </Form>
      </div>
    </>
  );
}
