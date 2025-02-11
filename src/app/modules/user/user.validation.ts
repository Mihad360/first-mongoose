import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .max(20, { message: "Password cannot be more than 20 characters" })
    .min(6, { message: "Password must have at least 6 characters" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
