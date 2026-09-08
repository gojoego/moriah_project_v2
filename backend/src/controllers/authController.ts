
import { Request, Response, NextFunction } from "express";

import { signupSchema, loginSchema } from "../schemas/auth";
import { getZodErrorMessage } from "../utils/zod";
import { 
    signupService, 
    loginService, 
    forgotPasswordService, 
    resetPasswordService
} from "../services/authService";
import { forgotPasswordSchema, resetPasswordSchema } from "../schemas/passwordReset";

export async function signupController(
    req: Request, 
    res: Response,
    next: NextFunction
) {
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
        next(error);
    }
}

export async function loginController(
    req: Request,
    res: Response, 
    next: NextFunction
) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const { email, password } = parsed.data;

        const result = await loginService(email, password);

        if (result.status === "invalid_credentials") {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        return res.json({ 
            token: result.token
        });        
    } catch(error) {
        next(error);
    }
}

export async function forgotPasswordController(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const parsed = forgotPasswordSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const { email } = parsed.data;

        const result = await forgotPasswordService(email);

        return res.json({
            message: result.message,
        });
    } catch (error) {
        next(error);
    }  
}

export async function resetPasswordController(
    req: Request, 
    res: Response, 
    next: NextFunction    
){
    try {
        if (!req.body) {
            return res.status(400).json({
                error: "Missing request body"
            });
        }

        const parsed = resetPasswordSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const { token, password } = parsed.data;

        const result = await resetPasswordService(token, password);

        if (result.status === "invalid_token") {
            return res.status(400).json({
                error: result.message,
            });
        }

        return res.json({
            message: result.message,
        });

    } catch (error) {
        next(error);
    }    
}