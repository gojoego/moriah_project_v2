import express from "express";
import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import { pool } from "./db";

// import login from "./routes/auth/login";
// import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";

const app = express();

const postsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok", 
        timeStamp: new Date().toISOString(),
    });
});

app.use("/api/auth", (_req, res) => {
    res.status(403).json({
        error: "authentication is disabled while The Moriah Project is in development"
    })
});
// app.use("/api/auth", signup);
app.use("/api/users", me);
app.use("/api/posts", posts)
app.use("/api/posts", postsLimiter)

if (process.env.NODE_ENV !== "test"){
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Backend running at http://localhost:${PORT}`);
    });
}

pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB connection failed:", err));

export default app;
