import { Router } from "express";

const router = Router(); 

router.get("/me", (_req, res) => {
    return res.json({
        id: "demo-user-id",
        email: "demo@demo.com",
        displayName: "demo user",
        role: "user",
    });
});

export default router;