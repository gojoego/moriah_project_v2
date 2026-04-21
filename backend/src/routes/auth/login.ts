import { Router } from "express";
import { signToken } from "../../utils/jwt";
import { getUserByEmail } from "../../db/queries/users";

const router = Router();

router.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = signToken({
            id: user.id, 
            email: user.email
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed"})
    };
});

export default router;