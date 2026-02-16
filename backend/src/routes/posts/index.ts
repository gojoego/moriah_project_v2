import { Router } from "express";
import { getAllPosts } from "../../db/queries/posts";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
  console.error("getAllPosts error:", error);
  res.status(500).json({ error: "getAllPosts() failed" });  }
});

router.get("/:id", (req, res) => {
  return res.json({
    id: req.params.id,
    deceasedName: "John",
    background: "My brother",
    content: "I wish I could have told you...",
    status: "published",
    createdAt: new Date().toISOString(),
  });
});

export default router;

