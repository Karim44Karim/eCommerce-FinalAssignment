"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema, registerSchemaType } from '../schema/register.shcema';
import {zodResolver} from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

export default function Register() {
  
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    console.log(values);

    try {
          const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    );
    if(res.data.message === 'success'){
      console.log(res);
      toast.success("Account Registered Successfully!", {position: "top-center", duration: 3000});
      router.push('/login');
    }
    if (res.data.message != 'success') {
      throw new Error("Something went wrong!")
    }
    } catch (error) {
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
      <h1 className='text-3xl text-center font-bold my-4'>Register Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-4 cursor-pointer w-full'>Register Now</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
