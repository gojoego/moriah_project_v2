import { z } from "zod";

export const updateDisplayNameSchema = z.object({
    displayName: z
        .string()
        .trim()
        .min(1, "Display name is required")
        .max(50, "Display name must be 50 characters or fewer"),
});

export type UpdateDisplayNameInput =
    z.infer<typeof updateDisplayNameSchema>;