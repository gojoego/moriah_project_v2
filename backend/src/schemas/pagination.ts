import { z } from "zod";

export const paginationSchema = z.object({
    limit: z
        .coerce
        .number()
        .int()
        .positive()
        .optional(),
    offset: z  
        .coerce
        .number()
        .int()
        .nonnegative()
        .optional(),
})