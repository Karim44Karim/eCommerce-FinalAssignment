"use client"
import React from 'react'
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

export default function ResetPassword() {
    const router = useRouter();
    const resetPasswordSchema = z.object({
        email: z
            .string()
        })
  return (
    <div>ResetPassword</div>
  )
}
