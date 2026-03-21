import "dotenv/config";
import { pool } from "./db";
import app from "./app";

const PORT = Number(process.env.PORT) || 4000;

async function start() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("DB connected:", res.rows[0]);

    app.listen(PORT, () => {
        console.log(`Backend running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
}

if (process.env.NODE_ENV !== "test") {
    void start();
}

export default app;