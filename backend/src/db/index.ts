import { Pool } from "pg";

const isTest = process.env.NODE_ENV === "test";
const isE2E = process.env.E2E === "true";
const isProd = process.env.NODE_ENV === "production";

const databaseUrl = process.env.DATABASE_URL; 

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");    
}

if (
    (isTest || isE2E) && 
    !databaseUrl.includes("localhost") && 
    !databaseUrl.includes("127.0.0.1")
) {
    throw new Error("test environment must use a local database");
}

export const pool = new Pool({
    connectionString: databaseUrl,

    ssl: isProd
        ? {
              rejectUnauthorized: false, 
          }
        : false,
});

if (!isTest) {
    pool.query("SELECT NOW()")
        .then(() => {
            console.log("Database connected");
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