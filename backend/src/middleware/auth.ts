import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthUser {
    id: string;
    email: string;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response, 
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "no token provided"});
    }

    const token = authHeader.slice("Bearer ".length).trim();

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = verifyToken(token);

        if (typeof decoded === "string") {
            return res.status(401).json({ error: "Invalid token"});
        }
        req.user = decoded as AuthUser;

        next();
    } catch {
        return res.status(401).json({ error: "Invalid token"});
    }
}