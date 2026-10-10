import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth";

import { getUserByIdService, updateDisplayNameService } from "../services/usersService";

import { getZodErrorMessage } from "../utils/zod"

import { updateDisplayNameSchema } from "../schemas/users"

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

export async function updateDisplayNameController(
    req: AuthRequest,
    res: Response
) {
    const parsed = updateDisplayNameSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: getZodErrorMessage(parsed.error),
        });
    }

    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    const updatedUser = await updateDisplayNameService(
        req.user.id,
        parsed.data.displayName
    );
    
    return res.status(200).json({
        id: updatedUser.id,
        displayName: updatedUser.display_name,
        email: updatedUser.email,
        role: updatedUser.role,
    });
}