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

const PORT = Number(process.env.PORT) || 4000;

const postsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://moriah-project-web.vercel.app",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) return callback(null, true);

            return callback(new Error("not allowed by CORS"));
        }
    })
);

app.use(postsLimiter);
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

app.use((_req, res) => {
    res.status(404).json(
        { error: "route not found"}
    );
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("unhandled error: ", err);
    res.status(500).json(
        { error: "internal server error" }
    );
})

if (process.env.NODE_ENV !== "test"){
    const server = app.listen(PORT, "0.0.0.0", async () => {
        console.log(`Backend running on port ${PORT}`);
        try {
            const result = await pool.query("SELECT NOW()");
            console.log("DB connected:", result.rows[0]);
        } catch (error) {
            console.error("DB connection failed:", error);
        }
    });

    process.on("SIGINT", () => {
        console.log("Shutting down...");
        server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
        console.log("Shutting down...");
        server.close(() => process.exit(0));
    });
}

pool.query("SELECT NOW()")
  .then(res => console.log("DB connected:", res.rows[0]))
  .catch(err => console.error("DB connection failed:", err));

export default app;
