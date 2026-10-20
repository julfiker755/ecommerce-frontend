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

//  === profile_Update ==
export const profile_Update = z.object({
  name: z.string().trim().nonempty("Full name is required"),
  email: emailField,
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[3-9]\d{8}$/, "Enter a valid 11 digit number"),
  address: z.string().trim().nonempty("Address is required"),
});

//  === change_Pass ==
export const change_Pass = z
  .object({
    current_password: z.string().nonempty("Current password is required"),
    password: passwordField,
    password_confirmation: z.string().nonempty("Confirm your password"),
  })
  .refine((v) => v.password === v.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })
  .refine((v) => v.password !== v.current_password, {
    message: "New password must be different",
    path: ["password"],
  });

//  === product_Create ==
export const product_Create = z.object({
  name: z.string().trim().nonempty("Product name is required"),
  short_description: z.string().trim().nonempty("Short description is required"),
  category: z.string().nonempty("Category is required"),
  brand: z.string().nonempty("Brand is required"),
  description: z.string().optional(),
  purchase_price: z.string().nonempty("Purchase price is required"),
  selling_price: z.string().nonempty("Selling price is required"),
  offer_price: z.string().optional(),
  stock: z.string().nonempty("Stock quantity is required"),
  stock_status: z.string().nonempty("Stock status is required"),
  status: z.string().nonempty("Status is required"),
  variants: z
    .array(
      z.object({
        purchase_price: z.string().optional(),
        selling_price: z.string().optional(),
        offer_price: z.string().optional(),
        stock: z.string().optional(),
        stock_status: z.string().optional(),
      })
    )
    .optional(),
});
