import { Router } from "express";
import { getUserById } from "../../db/queries/users";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router(); 

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const userId = req.user.id;

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        res.json({
            id: user.id,
            displayName: user.display_name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user"});
    }
});

export default router;