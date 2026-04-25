import { Pool } from "pg";

const isTest = process.env.NODE_ENV === "test";
const isProd = process.env.NODE_ENV === "production";

if (!process.env.DATABASE_URL && !isTest) {
    throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: isProd
        ? {
              rejectUnauthorized: false, 
          }
        : false,
});

if (!isTest) {
    pool.query("SELECT NOW()")
        .then(() => {
            console.log("DB connected");
        })
        .catch((err: unknown) => {
            if (err instanceof Error) {
                console.error("DB connection error:", {
                    message: err.message,
                });
            } else {
                console.error("DB connection error: unknown");
            }
        });
}