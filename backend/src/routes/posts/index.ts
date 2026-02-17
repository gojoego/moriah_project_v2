import { Router } from "express";
import { getAllPosts, getPostsById } from "../../db/queries/posts";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
  console.error("getAllPosts error:", error);
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
    const post = await getPostsById(req.params.id);

    if (!post) return res.status(404).json({ error: "post not found"});

    res.json(post);
  } catch (error) {
    console.error("getPostById error:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

export default router;

