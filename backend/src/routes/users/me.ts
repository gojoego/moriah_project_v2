import { Router } from "express";
import { getUserById } from "../../db/queries/users";

const router = Router(); 

router.get("/me", async (_req, res) => {
    try {
        const userId = "753e195a-7c48-4aa7-8f03-4bfd28cd9a7e";

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        res.json({
            displayName: user.display_name,
            email: user.email,
        });
    } catch (error) {
        console.error("getUserById error: ", error);
        res.status(500).json({ error: "Failed to fetch user"});
    }
});

export default router;