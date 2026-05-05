import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt";
import { getUserByEmail } from "../../db/queries/users";

const router = Router();

router.post("/login", async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await getUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials"});
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials"})
        }

        const token = signToken({
            id: user.id,
            email: user.email,
        });

        return res.json({ token });

    } catch (error) {
        console.error("Login error:", {
            message: error instanceof Error ? error.message : "Unknown error",
        });

        return res.status(500).json({ error: "Login failed" });
    }
});

export default router;