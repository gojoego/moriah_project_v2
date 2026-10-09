import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/auth";
import { logError } from "../utils/logger";
import { sanitizeRequestPath } from "../utils/sanitizeRequestPath";

export function authMiddleware(
    req: AuthRequest,
    res: Response, 
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid auth header" });
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
        req.user = decoded;

        next();
    } catch (error) {
        logError("Auth middleware error", {
            requestId: res.locals.requestId,
            method: req.method,
            path: sanitizeRequestPath(req.originalUrl),
            error: error instanceof Error ? error.message : "Unknown error",
        });
        
        return res.status(401).json({ error: "Unauthorized" });
    }
}