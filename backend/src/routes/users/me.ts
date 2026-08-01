import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getUserById } from "../../db/queries/users";
import { authMiddleware } from "../../middleware/auth";
import { AuthRequest } from "../../types/auth"
const router = Router(); 

const meRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

router.get(
    "/me", 
    meRateLimiter, 
    authMiddleware, 
    async (req: AuthRequest, res) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    error: "Unauthorized",
                });
            }

            const userId = req.user!.id;

            const user = await getUserById(userId);

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
            console.error("GET /me error:", {
                message: error instanceof Error ? error.message : "Unknown error",
            });

            res.status(500).json({ error: "Failed to fetch user" });        
        }
});

export default router;