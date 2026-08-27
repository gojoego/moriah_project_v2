import { Router } from "express";

import {
    createPostController,
    deletePostController,
    getAllPostsController, 
    getMyPostsController,
    getPostsByIdController,
    updatePostController
} from "../../controllers/postsController";

import { authMiddleware } from "../../middleware/auth";

const router = Router();

router.get("/", getAllPostsController);

router.get("/me", authMiddleware, getMyPostsController);

router.get("/:id", getPostsByIdController);

router.post("/", authMiddleware, createPostController);

router.put("/:id", authMiddleware, updatePostController);

router.delete("/:id", authMiddleware, deletePostController);

export default router;
    
    