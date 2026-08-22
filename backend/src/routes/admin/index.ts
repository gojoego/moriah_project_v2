import { Router } from "express";

import {
    deletePostAdminController,
    getAdminStatsController,
    getAllPostsAdminController,
    getAllUsersAdminController,
    updateUserRoleController
} from "../../controllers/adminController"

import { adminRateLimiter } from "../../middleware/rateLimit";
import { authMiddleware } from "../../middleware/auth";
import { requireRole } from "../../middleware/authorize";

const router = Router();

router.use(adminRateLimiter);
router.use(authMiddleware);
router.use(requireRole("admin"));

router.get("/users", getAllUsersAdminController);

router.get("/posts", getAllPostsAdminController);

router.delete("/posts/:id", deletePostAdminController);

router.patch("/users/:id/role", updateUserRoleController);

router.get("/stats", getAdminStatsController);

export default router;