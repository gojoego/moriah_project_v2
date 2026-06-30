import { z } from "zod";

export const signupSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email("Invalid email address")),

    password: z
        .string()
        .min(8, "Passwords must be 8 characters or more"),

    displayName: z
        .string()
        .trim()
        .min(1, "Display name is required")
        .max(50, "Display name must be 50 characters or less"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email("Invalid email address")),

    password: z
        .string()
        .min(1, "Password is required"),
});