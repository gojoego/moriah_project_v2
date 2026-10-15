import dotenv from "dotenv";

dotenv.config({
    path: ".env.e2e",
});

if (!process.env.DATABASE_URL?.includes("127.0.0.1:54322")) {
    throw new Error(
        "Integration tests must use the local Supabase database"
    );
}