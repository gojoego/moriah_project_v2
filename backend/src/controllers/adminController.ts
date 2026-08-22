import { AuthRequest } from "../types/auth";
import { Response } from "express";

import {
    getAllUsersAdmin,
    getAllPostsAdmin,
    deletePostAdmin,
    updateUserRole,
    getAdminStats
} from "../db/queries/admin";

import {
    updateUserRoleSchema,
    adminPaginationSchema,
    idSchema,
} from "../schemas/admin";

export async function getAllUsersAdminController(_req: AuthRequest, res: Response) {
    try {
        const parsed = adminPaginationSchema.safeParse(_req.query);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid pagination parameters",
            });
        }
        const { limit, offset } = parsed.data;

        const users = await getAllUsersAdmin({
            limit,
            offset,
        });
        
        return res.json(users);
    } catch (error) {
        console.error("Admin get users error: ", error);
        return res.status(500).json({
            error: "Failed to fetch users",
        });
    }    
}

export async function getAllPostsAdminController(_req: AuthRequest, res: Response) {
    try {
        const parsed = adminPaginationSchema.safeParse(_req.query);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid pagination parameters",
            });
        }

        const { limit, offset } = parsed.data;

        const posts = await getAllPostsAdmin({
            limit, 
            offset,
        });

        return res.json(posts);

    } catch (error) {
        console.error("Admin get posts error: ", error);

        return res.status(500).json({
            error: "Failed to fetch posts",
        });
    }
}

export async function deletePostAdminController(req: AuthRequest, res: Response) {
    try {
        const parsedId = idSchema.safeParse(req.params.id);

        if (!parsedId.success) {
            return res.status(400).json({
                error: "Invalid post id",
            });
        }

        const deletedPost = await deletePostAdmin(parsedId.data);

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
        console.error("Admin delete post error:", error);

        return res.status(500).json({
            error: "Failed to delete post",
        });
    }   
}

export async function updateUserRoleController(req: AuthRequest, res: Response) {
    try {
        const parsedId = idSchema.safeParse(req.params.id);

        if (!parsedId.success) {
            return res.status(400).json({
                error: "Invalid post id",
            });
        }

        const parsedBody = updateUserRoleSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
                error: "Invalid role",
            });
        }
        
        const updatedUser = await updateUserRole(
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
        console.error("Admin update role error:", error);

        return res.status(500).json({
            error: "Failed to update role",
        });           
    }
}

export async function getAdminStatsController(_req: AuthRequest, res: Response) {
    try {

        const stats = await getAdminStats();
        
        return res.json(stats);
    } catch (error) {
        console.error("Admin get stats error: ", error);
        return res.status(500).json({
            error: "Failed to fetch stats",
        });
    }    
}