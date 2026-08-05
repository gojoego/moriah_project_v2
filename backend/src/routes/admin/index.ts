import { Router, Response, Request } from "express";
import { authMiddleware } from "../../middleware/auth";
import {
    getAllUsersAdmin,
    getAllPostsAdmin,
    deletePostAdmin,
    updateUserRole,
    getAdminStats
} from "../../db/queries/admin";
import rateLimit from "express-rate-limit";
import { AuthRequest } from "../../types/auth"

import {
    updateUserRoleSchema,
    adminPaginationSchema,
} from "../../schemas/admin";

import { USER_ROLES } from "../../types/roles";

import { requireRole } from "../../middleware/authorize";

const router = Router();

const adminRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
});

function getPaginationParams(req: Request) {
    const rawLimit = Number(req.query.limit ?? 20);
    const rawOffset = Number(req.query.offset ?? 0);

    const limit = Math.min(
        Number.isNaN(rawLimit) ? 20 : rawLimit,
        100
    );

    const offset = Math.max(
        Number.isNaN(rawOffset) ? 0 : rawOffset,
        0
    );

    return {
        limit,
        offset,
    };
}

router.use(adminRateLimiter);

router.get(
    "/users", 
    authMiddleware, 
    adminRateLimiter,
    requireRole("admin"),
    async (_req: AuthRequest, res: Response) => {
        try {
            const { limit, offset } = getPaginationParams(_req);

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
);

router.get(
    "/posts",
    authMiddleware, 
    requireRole("admin"),
    async (_req: AuthRequest, res: Response) => {
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
)

router.delete(
    "/posts/:id",
    authMiddleware, 
    adminRateLimiter,
    requireRole("admin"),
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
    adminRateLimiter,
    requireRole("admin"),
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const parsed = updateUserRoleSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                    error: "Invalid role",
                });
            }

            const { role } = parsed.data;

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "Invalid user id",
                });
            }

            if (!USER_ROLES.includes(role)) {
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

router.get(
    "/stats", 
    authMiddleware, 
    requireRole("admin"),    
    adminRateLimiter,
    async (_req: AuthRequest, res: Response) => {
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
);

export default router;