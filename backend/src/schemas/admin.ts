import { z } from "zod";
import { USER_ROLES } from "../types/roles";

export const updateUserRoleSchema = z.object({
    role: z.enum(USER_ROLES)
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