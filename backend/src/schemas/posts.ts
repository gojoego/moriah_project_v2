import { z } from "zod";

export const createPostSchema = z.object({
    deceased_name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be 100 characters or less"),

    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .max(5000, "Content must be 5000 characters or less"),

    background: z
        .string()
        .trim()
        .max(2000, "Background must be 2000 characters or less")
        .optional(),
});

export const updatePostSchema = z.object({
    deceased_name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be 100 characters or less")
        .optional(),

    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .max(5000, "Content must be 5000 characters or less")
        .optional(),

    background: z
        .string()
        .trim()
        .max(2000, "Background must be 2000 characters or less")
        .optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "No valid fields to update",
    }
);