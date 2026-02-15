import { Pool } from "pg";

if (!process.env.DATABASE_URL){
    throw new Error("DATABASE URL not defined");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: 
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
});

if (process.env.NODE_ENV !== "test") {
    pool.query("SELECT 1")
        .then(() => console.log("db connected"))
        .catch(err => console.log("db connection error: ", err));
}
