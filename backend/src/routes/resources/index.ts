import { Router } from "express";

import { getAllResourcesController } from "../../controllers/resourceController";

const router = Router();

router.use("/", getAllResourcesController);

export default router;