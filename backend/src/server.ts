import express from "express";

import login from "./routes/auth/login";
import signup from "./routes/auth/signup";
import me from "./routes/users/me";
import posts from "./routes/posts";
import postById from "./routes/posts/getById";

const app = express();
app.use(express.json());

const PORT = 4000;

app.get("/health", (_req, res) => {
    res.json({ status: "ok"});
});

app.use("/api/auth", login);
app.use("/api/auth", signup);
app.use("/api/users", me);
app.use("/api/posts", posts);
app.use("/api/posts", postById);


app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});