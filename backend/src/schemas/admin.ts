import { z } from "zod";

export const updateUserRoleSchema = z.object({
    role: z.enum([
        "user",
        "moderator",
        "admin",
    ]),
});

export const adminPaginationSchema = z.object({
    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20),

    offset: z
        .coerce
        .number()
        .int()
        .min(0)
        .default(0),
});