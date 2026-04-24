import { Pool } from "pg";

const isTest = process.env.NODE_ENV === "test";

if (!process.env.DATABASE_URL && !isTest) {
    console.error("❌ DATABASE_URL not defined");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "",

    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
});

if (process.env.NODE_ENV !== "test") {
    pool.query("SELECT 1")
        .then(() => console.log("✅ DB connected"))
        .catch(err => console.error("❌ DB connection error:", err));
}