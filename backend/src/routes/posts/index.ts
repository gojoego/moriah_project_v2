import { NextFunction, Router, Request, Response } from "express";
import { getAllPosts, getPostsById, insertPost } from "../../db/queries/posts";
import { CreatePostInput } from "../../types/post";

const router = Router();

router.get("/", async (req, res) => {
    console.log("query param limit:", req.query.limit);
    const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;
    try {
        const posts = await getAllPosts({limit});
        res.json(posts);
    } catch {
        res.status(500).json({ error: "getAllPosts() failed" });  }
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
            
        if (!post) return res.status(404).json({ error: "post not found"});
            
        res.json(post);
    } catch (error) {
        console.error("getPostById error:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
            
        // TEMP: using hardcoded user until auth + deterministic seed is implemented
        const mockUserId = "753e195a-7c48-4aa7-8f03-4bfd28cd9a7e";

        const newPost = await insertPost(mockUserId, {
            deceased_name: cleanName,
            content: cleanContent,
            ...(cleanBackground ? { background: cleanBackground } : {}),
        });

        if (!newPost) {
            return res.status(500).json({ error: "Failed to create post" });
        }

        return res.status(201).json(newPost);
    } catch (error) {
        next(error)
    }
});

export default router;
    
    