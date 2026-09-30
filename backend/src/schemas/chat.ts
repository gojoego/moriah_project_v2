import { z } from "zod";

export const chatResourceRequestSchema = z.object({
    message: z
        .string()
        .trim()
        .min(1, "Message is required")
        .max(2000, "Message must be 2000 characters or fewer"),
});

export type ChatResourceRequest = z.infer<typeof chatResourceRequestSchema>;