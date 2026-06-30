import { ZodError } from "zod";

export function getZodErrorMessage(error: ZodError): string {
    return error.issues[0]?.message ?? "Invalid request";
}