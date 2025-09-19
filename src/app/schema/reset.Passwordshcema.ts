import * as z from "zod";

export const resetPasswordSchema = z.object({
    email: z.email().nonempty("this field can't be empty"),
newPassword: z.string().nonempty("this field can't be empty").min(6, "min length is 6 characters"),
rePassword: z.string().nonempty("this field can't be empty"),
}).refine((object) => object.newPassword === object.rePassword, {
    path: ['repassword'],
    error: "password & repassword don't match!"
});


export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;