import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth";

import { getUserByIdService } from "../services/usersService";

export async function getUserByIdController(
    req: AuthRequest,
    res: Response, 
    next: NextFunction
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const userId = req.user.id;

        const user = await getUserByIdService(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        return res.json({
            id: user.id,
            displayName: user.display_name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
}