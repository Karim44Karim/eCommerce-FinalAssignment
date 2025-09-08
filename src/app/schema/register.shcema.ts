import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("this field can't be empty")
    .min(2, "min length is 2 characters")
    .max(10, "max length is 10 characters"),
    email: z.email().nonempty("this field can't be empty"),
password: z.string().nonempty("this field can't be empty").min(6, "min length is 6 characters"),
rePassword: z.string().nonempty("this field can't be empty"),
phone: z.string().regex(/^(2|\+2)?01[0125][0-9]{8}$/),
}).refine((object) => object.password === object.rePassword, {
    path: ['repassword'],
    error: "password & repassword don't match!"
});


export type registerSchemaType = z.infer<typeof registerSchema>;