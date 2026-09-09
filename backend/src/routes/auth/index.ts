import { Router } from "express";
import { 
    rateLimiter, 
    loginAccountRateLimiter, 
    forgotPasswordAccountRateLimiter } from "../../middleware/rateLimit";

import {
    signupController, 
    loginController,
    forgotPasswordController,
    resetPasswordController
} from "../../controllers/authController";

const router = Router();

router.use(rateLimiter);

router.post("/signup", signupController);

router.post(
    "/login", 
    loginAccountRateLimiter, 
    loginController
);

router.post(
    "/forgot-password", 
    forgotPasswordAccountRateLimiter,
    forgotPasswordController
);

router.post("/reset-password", resetPasswordController);

export default router;