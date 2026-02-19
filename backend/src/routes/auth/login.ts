import { Router } from "express";

const router = Router();

router.post("/auth/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "invalid creds"});
    }

    return res.json({
        user: {
            id: "demo-user-id",
            email, 
            displayName: "demo user",
            role: "user"
        }, 
        token: "demo-token",
    });
});

export default router;