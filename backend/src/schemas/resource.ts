import { z } from "zod";

import {
    RESOURCE_CATEGORIES,
    RESOURCE_TYPES,
    RESOURCE_AUDIENCES,
    RESOURCE_FORMATS,
} from "../constants/resources";

export const resourceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "resource name required")
        .max(150, "resource name must be 150 characters or less"),
    
    description: z
        .string()
        .trim()
        .min(1, "description required")
        .max(150, "description name must be 150 characters or less"),       
    
    url: z.url("valid URL required"),

    category: z.enum(RESOURCE_CATEGORIES),

    resourceType: z.enum(RESOURCE_TYPES),

    audience: z
        .array(z.enum(RESOURCE_AUDIENCES))
        .optional(),
    
    format: z
        .array(z.enum(RESOURCE_FORMATS))
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

export const resourceQuerySchema = z.object({
    category: z.enum(RESOURCE_CATEGORIES).optional(), 

    resourceType: z.enum(RESOURCE_TYPES).optional(), 

    audience: z.enum(RESOURCE_AUDIENCES).optional(),

    format: z.enum(RESOURCE_FORMATS).optional(),

    search: z
        .string()
        .trim()
        .min(1)
        .optional(),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .optional(),
    
    offset: z.coerce
        .number()
        .int()
        .nonnegative()
        .optional(),
});

export type ResourceQuery = z.infer<typeof resourceQuerySchema>;