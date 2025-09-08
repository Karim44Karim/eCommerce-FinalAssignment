import * as z from "zod";

export const loginSchema = z.object({
    password: z.string().nonempty("this field can't be empty").min(6, "min length is 6 characters"),
    email: z.email().nonempty("this field can't be empty"),
});


export type loginSchemaType = z.infer<typeof loginSchema>;