import { Response, NextFunction } from "express";
import { UserRole } from "../types/roles";
import { AuthRequest } from '../types/auth';

export function requireRole(
    ...allowedRoles: UserRole[]
) {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({error: "Forbidden"});
        }

        next();
    }
}