import express from "express";
import cors from "cors";

import login from "./routes/auth/login";
import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";
import postById from "./routes/posts/getById";

const app = express();

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
app.use("/api/posts", postById);

if (process.env.NODE_ENV !== "test"){
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Backend running at http://localhost:${PORT}`);
    });
}

export default app;
