import { Router } from "express";

const router = Router(); 

router.post("/", (req, res) => {
    const {
        deceasedName,
        background, 
        content
    } = req.body;

    if (!deceasedName || !content) {
        return res.status(400).json({ error: "missing required fields"});
    }

    return res.json({
        id: crypto.randomUUID(),
        authorId: "demo-user-id",
        deceasedName, 
        background,
        content, 
        status: "published",
        createdAt: new Date().toISOString(),
    });
});

router.get("/", (_req, res) => {
  return res.json([
    {
      id: "post-1",
      deceasedName: "John",
      content: "I wish I could have told you...",
      status: "published",
      createdAt: new Date().toISOString(),
    },
    {
      id: "post-2",
      deceasedName: "Maria",
      content: "You mattered more than you knew...",
      status: "published",
      createdAt: new Date().toISOString(),
    },
  ]);
});

export default router;