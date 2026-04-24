import { Router } from "express";
import { signToken } from "../../utils/jwt";

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

        if (process.env.NODE_ENV !== "production") {
            if (!process.env.DEV_PASSWORD) {
                console.error("DEV_PASSWORD not set");
                return res.status(500).json({ error: "Server misconfigured" });
            }

            if (password !== process.env.DEV_PASSWORD) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        }

        const user = {
            id: "753e195a-7c48-4aa7-8f03-4bfd28cd9a7e",
            email,
        };

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