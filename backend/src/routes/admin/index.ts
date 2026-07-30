import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import {
    getAllUsers,
    getAllPostsAdmin,
    deletePostAdmin,
    updateUserRole
} from "../../db/queries/admin"

const router = Router();

router.get(
    "/users", 
    authMiddleware, 
    adminMiddleware, 
    async (_req: AuthRequest, res: Response) => {
        try {
            const users = await getAllUsers();
            return res.json(users);
        } catch (error) {
            console.error("Admin get users error: ", error);
            return res.status(500).json({
                error: "Failed to fetch users",
            });
        }
    }
);

router.get(
    "/posts",
    authMiddleware, 
    adminMiddleware,
    async (_req: AuthRequest, res: Response) => {
        try {
            const posts = await getAllPostsAdmin();
            return res.json(posts);
        } catch (error) {
            console.error("Admin get posts error: ", error);
            return res.status(500).json({
                error: "Failed to fetch posts",
            });
        }
    }
)

router.delete(
    "/posts/:id",
    authMiddleware, 
    adminMiddleware,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "Invalid user id",
                });
            }
            
            const deletedPost = await deletePostAdmin(id);

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
);

router.patch(
    "/users/:id/role",
    authMiddleware,
    adminMiddleware,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "Invalid user id",
                });
            }

            const allowedRoles = [
                "user",
                "moderator",
                "admin",
            ] as const;

            if (!allowedRoles.includes(role)) {
                return res.status(400).json({
                    error: "Invalid role",
                });
            }

            const updatedUser = await updateUserRole(
                id, 
                role
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
)

export default router;