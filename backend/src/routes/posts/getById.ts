import { Router } from "express";

const router = Router();

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
