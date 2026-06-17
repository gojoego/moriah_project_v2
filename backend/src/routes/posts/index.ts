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

import { CreatePostInput } from "../../types/post";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

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

            const body = req.body as Partial<CreatePostInput>;
            
            const name = body.deceased_name;

            if (typeof name !== "string") {
                return res.status(400).json({ error: "Invalid deceased_name" });
            }

            const cleanName = name.trim();

            if (!cleanName){
                return res.status(400).json({ error: "Invalid deceased_name" })
            }

            const contentVal = body.content;

            if (typeof contentVal !== "string") {
                return res.status(400).json({ error: "Invalid content" });
            }

            const cleanContent = contentVal.trim();

            if (!cleanContent) {
                return res.status(400).json({ error: "Invalid content" });
            }

            const backgroundVal = body.background;

            const cleanBackground = 
                typeof backgroundVal === "string" && backgroundVal.trim()
                ? backgroundVal.trim()
                : undefined;

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized"})
            }

            const newPost = await insertPost(userId, {
                deceased_name: cleanName,
                content: cleanContent,
                ...(cleanBackground 
                    ? { background: cleanBackground } 
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

            const body = req.body as Partial<CreatePostInput>;

            const updates: Partial<CreatePostInput> = {};

            if (body.deceased_name !== undefined) {
                if (typeof body.deceased_name !== "string") {
                    return res.status(400).json({
                        error: "Invalid deceased name",
                    });
                }

                const cleanName = body.deceased_name.trim();

                if (!cleanName) {
                    return res.status(400).json({
                        error: "Invalid deceased name",
                    });
                }

                updates.deceased_name = cleanName;
            }

            if (body.content !== undefined) {
                if (typeof body.content !== "string") {
                    return res.status(400).json({
                        error: "Invalid content",
                    });
                }

                const cleanContent = body.content.trim();

                if (!cleanContent) {
                    return res.status(400).json({
                        error: "Invalid content",
                    });
                }

                updates.content = cleanContent;
            }

            if (body.background !== undefined) {
                if (typeof body.background !== "string") {
                    return res.status(400).json({
                        error: "Invalid background",
                    });
                }

                const cleanBackground = body.background.trim();

                updates.background = cleanBackground || undefined;
            }

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({
                    error: "No valid fields to update",
                });
            }

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
    
    