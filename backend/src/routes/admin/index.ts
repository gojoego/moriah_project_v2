import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { pool } from "../../db";

const router = Router();

/**
 * GET all users
 * GET /api/admin/users
 */
router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    async (_req: AuthRequest, res: Response) => {
        try {
            const result = await pool.query(`
                SELECT
                    id,
                    display_name,
                    email,
                    role,
                    created_at
                FROM users
                ORDER BY created_at DESC
            `);

            res.json(result.rows);

        } catch (error) {
            console.error("Admin get users error:", error);

            res.status(500).json({
                error: "Failed to fetch users",
            });
        }
    }
);


/**
 * GET all posts (including unpublished)
 * GET /api/admin/posts
 */
router.get(
    "/posts",
    authMiddleware,
    adminMiddleware,
    async (_req: AuthRequest, res: Response) => {
        try {
            const result = await pool.query(`
                SELECT
                    p.id,
                    p.author_id,
                    p.deceased_name,
                    p.background,
                    p.content,
                    p.status,
                    p.created_at,
                    u.display_name AS author_name
                FROM posts p
                JOIN users u ON p.author_id = u.id
                ORDER BY p.created_at DESC
            `);

            res.json(result.rows);

        } catch (error) {
            console.error("Admin get posts error:", error);

            res.status(500).json({
                error: "Failed to fetch posts",
            });
        }
    }
);


/**
 * DELETE any post
 * DELETE /api/admin/posts/:id
 */
router.delete(
    "/posts/:id",
    authMiddleware,
    adminMiddleware,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;

            const result = await pool.query(
                `
                DELETE FROM posts
                WHERE id = $1
                RETURNING *
                `,
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    error: "Post not found",
                });
            }

            res.json({
                message: "Post deleted",
                post: result.rows[0],
            });

        } catch (error) {
            console.error("Admin delete post error:", error);

            res.status(500).json({
                error: "Failed to delete post",
            });
        }
    }
);


/**
 * Change user role
 * PATCH /api/admin/users/:id/role
 */
router.patch(
    "/users/:id/role",
    authMiddleware,
    adminMiddleware,
    async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const allowedRoles = [
                "user",
                "moderator",
                "admin",
            ];

            if (!allowedRoles.includes(role)) {
                return res.status(400).json({
                    error: "Invalid role",
                });
            }

            const result = await pool.query(
                `
                UPDATE users
                SET role = $1
                WHERE id = $2
                RETURNING id, email, role
                `,
                [role, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({
                    error: "User not found",
                });
            }

            res.json(result.rows[0]);

        } catch (error) {
            console.error("Admin update role error:", error);

            res.status(500).json({
                error: "Failed to update user role",
            });
        }
    }
);


export default router;