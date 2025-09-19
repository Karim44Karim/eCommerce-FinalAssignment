"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { loginSchema, loginSchemaType } from '../schema/login.schema';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { signInResponseType } from '@/types/signInRes.type';
import getLoggedUserCart from '@/CartActions/getUserCart';
import getLoggedUserWishlist from '@/WishlistActions/getUserWishlist';
import { wishlistContext } from '@/context/WishlistContext';
import { cartContext } from '@/context/CartContext';

export default function Login() {
  
  const router = useRouter();

  const { numberOfCartItems, setNumberOfCartItems } = useContext(cartContext)!;
  const { numberOfWishlistItems, getUserWishlist } = useContext(wishlistContext)!;

    
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    console.log(values);

        async function getUserCart() {
            try {
                const res = await getLoggedUserCart();
                console.log(res);
                if(res.status === 'success'){
                    console.log(res.data.products);
                    let sum =0;
                    res.data.products.forEach((element: { count: number }) => {
                        sum += element.count;
                    });
                    setNumberOfCartItems(sum);
                    
                }
            } catch (error) {
                console.log("not logged in");
            }
            
        }
  //     const res = await signIn("credentials", {
  //     redirect: false,
  //     email: values.email,
  //     password: values.password,
  //   });

  //   if (res?.error) {
  //     toast.error(error.response.data.message, {position: "top-center", duration: 3000});
  //   } else {
  //     toast.success("Logged In Successfully!", {position: "top-center", duration: 3000});
  //     router.push("/");
  //   }
  // }
      try {
      const res: signInResponseType | undefined = await signIn("credentials", {        
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log(res);
    
    if(res?.ok){
      console.log(res);
      toast.success("Logged In Successfully!", {position: "top-center", duration: 3000});
      getUserCart();
      getUserWishlist();
      router.push('/');

    } else{
      throw new Error(res?.error?? "Login Failed");
    }

    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred", {position: "top-center", duration: 3000});
    }
    // try {
    //       const res = await axios.post(
    //   "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //   values
    // );
    // if(res.data.message === 'success'){
    //   console.log(res);
    //   toast.success("Logged In Successfully!", {position: "top-center", duration: 3000});
    //   router.push('/');
    // }
    // } catch (error) {
    //   toast.error(error.response.data.message, {position: "top-center", duration: 3000});
    // }


    
  }
  return (
    <>
      <div className="w-1/2 mx-auto my-12">
      <h1 className='text-3xl text-center font-bold my-4'>Login Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
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
            <Button className='mt-4 cursor-pointer w-full'>Login Now</Button>
          </form>
        </Form>
        <div>
          <Link href='/forgotPassword' className='text-[color:#DB4444] text-sm hover:underline hover:underline-offset-1  hover:cursor-pointer'>Forgot Password?</Link>
        </div>
      </div>
    </>
  )
}