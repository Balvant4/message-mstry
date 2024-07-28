import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters.")
  .max(20, "Username must be no more than 20 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters.");

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters." })
  .max(10, { message: "Password must be no more than 10 characters." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter.",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one number.",
  })
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    message: "Password must contain at least one special character.",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address." }),
  password: passwordValidation,
});
