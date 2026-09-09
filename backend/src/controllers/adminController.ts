import { AuthRequest } from "../types/auth";
import { Response, NextFunction } from "express";

import {
    getAllUsersAdminService, 
    getAllPostsAdminService, 
    deletePostAdminService,
    updateUserRoleService,
    getAdminStatsService
} from "../services/adminService";

import {
    updateUserRoleSchema,
    adminPaginationSchema,
    idSchema,
} from "../schemas/admin";

export async function getAllUsersAdminController(
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
) {
    try {
        const parsed = adminPaginationSchema.safeParse(req.query);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid pagination parameters",
            });
        }
        const { limit, offset } = parsed.data;

        const users = await getAllUsersAdminService({
            limit,
            offset,
        });
        
        return res.json(users);
    } catch (error) {
        next(error);
    }    
}

export async function getAllPostsAdminController(
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
) {
    try {
        const parsed = adminPaginationSchema.safeParse(req.query);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid pagination parameters",
            });
        }

        const { limit, offset } = parsed.data;

        const posts = await getAllPostsAdminService({
            limit, 
            offset,
        });

        return res.json(posts);

    } catch (error) {
        next(error);
    }
}

export async function deletePostAdminController(
    req: AuthRequest, 
    res: Response,
    next: NextFunction
) {
    try {
        const parsedId = idSchema.safeParse(req.params.id);

        if (!parsedId.success) {
            return res.status(400).json({
                error: "Invalid post id",
            });
        }

        const deletedPost = await deletePostAdminService(parsedId.data);

        if (!deletedPost) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        return res.json({
            message: "Post deleted",
            post: deletedPost,
        });
    } catch (error) {
        next(error);
    }   
}

export async function updateUserRoleController(
    req: AuthRequest, 
    res: Response,
    next: NextFunction 
) {
    try {
        const parsedId = idSchema.safeParse(req.params.id);

        if (!parsedId.success) {
            return res.status(400).json({
                error: "Invalid user id",
            });
        }

        const parsedBody = updateUserRoleSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
                error: "Invalid role",
            });
        }
        
        const updatedUser = await updateUserRoleService(
            parsedId.data, 
            parsedBody.data.role
        );

        if (!updatedUser) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.json(updatedUser);
    } catch (error) {
        next(error);        
    }
}

export async function getAdminStatsController(
    _req: AuthRequest, 
    res: Response,
    next: NextFunction
) {
    try {
        const stats = await getAdminStatsService();
        
        return res.json(stats);
    } catch (error) {
        next(error);
    }    
}