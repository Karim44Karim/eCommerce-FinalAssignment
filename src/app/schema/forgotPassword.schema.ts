import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email().nonempty("this field can't be empty"),

});


export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
