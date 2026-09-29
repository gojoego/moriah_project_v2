import { Router } from "express";
import { getChatResourcesController } from "../../controllers/chatController";

const router = Router();

router.post(
    "/resources",
    getChatResourcesController
);

export default router;