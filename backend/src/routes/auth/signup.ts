import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
    const {
        email, 
        password, 
        displayName
    } = req.body;

    if (!email || !password || !displayName) {
        return res.status(400).json({ error: "missing required fields"});
    }

    return res.json({
        user: {
            id: crypto.randomUUID(),
            email,
            displayName,
            role: "user",
            createdAt: new Date().toISOString(),
        }, 
        token: "demo-token",
    });
});

export default router;