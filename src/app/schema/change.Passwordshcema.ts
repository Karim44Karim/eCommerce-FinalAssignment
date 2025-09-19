import * as z from "zod";

export const changePasswordSchema = z.object({
currentPassword: z.string().nonempty("this field can't be empty").min(6, "min length is 6 characters"),
password: z.string().nonempty("this field can't be empty").min(6, "min length is 6 characters"),
rePassword: z.string().nonempty("this field can't be empty"),
}).refine((object) => object.password === object.rePassword, {
    path: ['repassword'],
    error: "password & repassword don't match!"
});


export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;