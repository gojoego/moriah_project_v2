import { z } from "zod";

export const chatResourceRequestSchema = z.object({
    message: z.string().trim().min(1),
});

export type ChatResourceRequest = z.infer<typeof chatResourceRequestSchema>;