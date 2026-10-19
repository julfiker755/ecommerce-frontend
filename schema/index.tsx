import { z } from "zod";

const emailField = z
  .string()
  .nonempty("Email is required")
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email address",
  });

const passwordField = z
  .string()
  .nonempty("Password is required")
  .min(6, "Password must be at least 6 characters long");

//  === sign_In ==
export const sign_In = z.object({
  email: emailField,
  password: passwordField,
});

//  === sign_Up ==
export const sign_Up = z
  .object({
    name: z.string().trim().nonempty("Full name is required"),
    email: emailField,
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[3-9]\d{8}$/, "Enter a valid 11 digit number"),
    password: passwordField,
    password_confirmation: z.string().nonempty("Confirm your password"),
  })
  .refine((v) => v.password === v.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

//  === forgot_Pass ==
export const forgot_Pass = z.object({
  email: emailField,
});

//  === new_Pass ==
export const new_Pass = z
  .object({
    password: passwordField,
    password_confirmation: z.string().nonempty("Confirm your password"),
  })
  .refine((v) => v.password === v.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
