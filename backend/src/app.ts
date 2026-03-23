import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// import login from "./routes/auth/login";
// import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";

const allowedOrigins = [
  "http://localhost:3000",
  "https://moriah-project-web.vercel.app",
  "https://moriahproject.org",
  "https://themoriahproject.org",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

const postsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const app = express();

app.use(helmet());
app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) return callback(null, true);

            return callback(null, false);
        }
    })
);
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
app.use("/api/posts", postsLimiter, posts);

export default app;