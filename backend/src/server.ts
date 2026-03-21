import "dotenv/config";
import { pool } from "./db";
import app from "./app";

const PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Backend running at http://localhost:${PORT}`);

    try {
      const res = await pool.query("SELECT NOW()");
      console.log("DB connected:", res.rows[0]);
    } catch (err) {
      console.error("DB connection failed:", err);
    }
  });
}