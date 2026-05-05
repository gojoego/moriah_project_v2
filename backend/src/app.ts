import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import login from "./routes/auth/login";
import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";

const allowedOrigins = [
  "http://localhost:3000",
  "https://moriah-project-web.vercel.app",
  "https://moriahproject.org",
  "https://www.moriahproject.org",
  "https://themoriahproject.org",
  "https://www.themoriahproject.org",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

const postsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const app = express();

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok", 
        timeStamp: new Date().toISOString(),
    });
});

app.disable("x-powered-by");
app.use(helmet());
app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) return callback(null, true);

            const error = new Error("CORS not allowed")
            return callback(error);
        }
    })
);
app.use(express.json());

app.use("/api/auth", login);

app.use("/api/auth", signup);
app.use("/api/users", me);
app.use("/api/posts", postsLimiter, posts);

app.use((_req, res) => {
    res.status(404).json({
        error: "Not found",
        path: _req.originalUrl,
    });
});

app.use(
    (
        error: Error,
        _req: express.Request,
        res: express.Response, 
        _next: express.NextFunction
    ) => {
        if (error.message === "CORS not allowed") {
            return res.status(403).json({
                error: "Forbidden: CORS policy does not allow this origin",
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
);

export default app;