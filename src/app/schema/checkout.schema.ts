import * as z from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .nonempty("Details can't be empty")
    .min(3, "Address must be at least 3 characters"),
  phone: z
    .string()
    .nonempty("Phone can't be empty")
    .regex(/^01[1250][0-9]{8}$/, "Please enter a valid phone number"),
  city: z
    .string()
    .nonempty("Details can't be empty")
    .min(2, "City must be at least 2 characters"),
  payment: z.enum(["cash", "card"], {
    message: "Payment method is required",
  }),
});


export type checkoutSchemaType = z.infer<typeof checkoutSchema>;