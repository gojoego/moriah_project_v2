import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authMiddleware } from "../../middleware/auth";
import { getUserByIdController } from "../../controllers/usersController"
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
    getUserByIdController 
);

export default router;