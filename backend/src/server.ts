import "dotenv/config";
import { pool } from "./db";
import app from "./app";

const PORT = Number(process.env.PORT) || 4000;

console.log("PORT ENV:", process.env.PORT);
console.log("Listening on:", PORT);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

if (process.env.NODE_ENV !== "test") {
  pool.query("SELECT NOW()")
    .then((res) => {
      console.log("DB connected:", res.rows[0]);
    })
    .catch((err) => {
      console.error("DB connection failed:", err);
    });
}

export default app;