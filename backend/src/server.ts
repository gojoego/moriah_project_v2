import express from "express";
import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";

import login from "./routes/auth/login";
import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";
import { getAllPosts } from "./db/queries/posts";

const app = express();

const postsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok"});
});

app.use("/api/auth", login);
app.use("/api/auth", signup);
app.use("/api/users", me);
app.use("/api/posts", posts)
app.use("/api/posts", postsLimiter)
app.use("/api/posts", getAllPosts);

if (process.env.NODE_ENV !== "test"){
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Backend running at http://localhost:${PORT}`);
    });
}

import { pool } from "./db";

pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB connection failed:", err));


export default app;
