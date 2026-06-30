import { 
    NextFunction, 
    Router, 
    Response 
} from "express";

import { 
    getAllPosts, 
    getPostsById, 
    insertPost, 
    getPostsByAuthorId, 
    updatePost, 
    deletePost
} from "../../db/queries/posts";

import { authMiddleware, AuthRequest } from "../../middleware/auth";
import { createPostSchema, updatePostSchema } from "../../schemas/posts";
import { getZodErrorMessage } from "../../utils/zod";

const router = Router();

router.get("/", async (req, res) => {
    console.log("query param limit:", req.query.limit);

    const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

    try {
        const posts = await getAllPosts({ limit });

        console.log("Posts fetched:", posts.length);

        res.json(posts);
    } catch (error) {
        console.error("❌ getAllPosts error:", error); // 🔥 KEY CHANGE

        res.status(500).json({
            error: "getAllPosts() failed",
        });
    }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized"});
        }

        const posts = await getPostsByAuthorId(userId);

        res.json(posts);
    } catch (error) {
        console.error("getPostsByAuthorId error:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
        
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ error: "Invalid post id" });
    }
        
    try {
        const post = await getPostsById(id);
            
        if (!post) {
            return res.status(404).json({ error: "Post not found"});  
        } 
            
        res.json(post);
    } catch (error) {
        console.error("getPostById error:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

router.post(
    "/",
    authMiddleware,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: "Missing body" });
            }

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized"})
            }

            const parsed = createPostSchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({
                    error: getZodErrorMessage(parsed.error),
                });
            }

            const {
                deceased_name, 
                content,
                background
            } = parsed.data;

            const newPost = await insertPost(userId, {
                deceased_name,
                content,
                ...(background !== undefined
                    ? { background }
                    : {}),
            });

            if (!newPost) {
                return res.status(500).json({ error: "Failed to create post" });
            }

            return res.status(201).json(newPost);
        } catch (error) {
            next(error)
        }
    }
);

router.put(
    "/:id",
    authMiddleware,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "Invalid post id",
                });
            }

            const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            if (!uuidRegex.test(id)) {
                return res.status(400).json({
                    error: "Invalid post id",
                });
            }

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({
                    error: "Unauthorized",
                });
            }

            if (!req.body) {
                return res.status(400).json({
                    error: "Missing request body",
                });
            }

            const existingPost = await getPostsById(id);

            if (!existingPost) {
                return res.status(404).json({
                    error: "Post not found",
                });
            }

            if (existingPost.author_id !== userId) {
                return res.status(403).json({
                    error: "Forbidden",
                });
            }

            const parsed = updatePostSchema.safeParse(req.body);

            if (!parsed.success){
                return res.status(400).json({ 
                    error: getZodErrorMessage(parsed.error)
                });
            }

            const updates = parsed.data;

            const updatedPost = await updatePost(id, updates);

            if (!updatedPost) {
                return res.status(500).json({
                    error: "Failed to update post",
                });
            }

            return res.json(updatedPost);
        } catch (error) {
            next(error);
        }
    }
);


router.delete(
    "/:id",
    authMiddleware,
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            
            if (Array.isArray(id)) {
                return res.status(400).json({ error: "Invalid post id"});
            }

            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            if (!uuidRegex.test(id)) {
                return res.status(400).json({ error: "Invalid post id"});
            }

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized"});
            }

            const existingPost = await getPostsById(id);
            
            if (!existingPost) {
                return res.status(404).json({ error: "Post not found"});
            }

            if (existingPost.author_id !== userId) {
                return res.status(403).json({ error: "Forbidden"});
            }

            await deletePost(id);
            
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export default router;
    
    