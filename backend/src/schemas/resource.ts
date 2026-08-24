import { z } from "zod";

export const resourceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "resource name required")
        .max(20, "resource name must be 20 characters or less"),
    
    description: z
        .string()
        .trim()
        .min(1, "description required")
        .max(150, "description name must be 150 characters or less"),       
    
    url: z.url("valid URL required"),

    category: z
        .string()
        .trim()
        .min(1, "category required"),

    resourceType: z
        .string()
        .trim()
        .min(1, "resource type required"),

    audience: z
        .array(z
            .string()
            .trim()
            .min(1)
        )
        .optional(),
    
    format: z
        .array(z
            .string()
            .trim()
            .min(1)
        )
        .min(1, "at least one format is required"),
    
    locationScope: z
        .string()
        .trim()
        .optional(),

    tags: z
        .array(z
            .string()
            .trim()
            .min(1)
        )
        .optional(),

    isActive: z
        .boolean()
})

export type ResourceInput = z.infer<typeof resourceSchema>;