
import { Request, Response } from "express";

import { signupSchema } from "../schemas/auth";
import { getZodErrorMessage } from "../utils/zod";
import { signupService } from "../services/authService";

export async function signupController(req: Request, res: Response) {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const result = await signupService(parsed.data);
 
        if (!result) {
            return res.status(400).json({
                error: "Invalid signup credentials",
            });
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error("Signup error: ", {
            message: 
                error instanceof Error 
                    ? error.message 
                    : "Unknown error",
        });

        return res.status(500).json({ 
            error: "Signup failed"
        });
    }
}