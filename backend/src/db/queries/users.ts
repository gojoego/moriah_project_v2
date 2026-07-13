import { pool } from "..";
import crypto from "crypto";

export async function getUserById(id:string) {
    const result = await pool.query(
        `
        SELECT 
            id, 
            display_name, 
            email, 
            role 
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

export async function getUserByEmail(email: string){
    const result = await pool.query(
        `
        SELECT 
            id, 
            display_name, 
            email,
            password,
            role 
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
}

export async function createUser({
    email, 
    password, 
    displayName,
}:{
    email: string; 
    password: string; 
    displayName: string;
}){
    const result = await pool.query(
        `
        INSERT INTO users (email, password, display_name)
        VALUES ($1, $2, $3)
        RETURNING id, email, display_name, role
        `,
        [
            email,
            password, 
            displayName
        ]
    ) 

    return result.rows[0];
}

export async function setPasswordResetToken(
    userId: string, 
    token: string, 
    expiresAt: Date
) {
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const result = await pool.query(
            `
            UPDATE users 
            SET password_reset_token_hash = $1,
                password_reset_expires_at = $2
            WHERE id = $3 
            RETURNING id, email    
            `,
            [tokenHash, expiresAt, userId]
        );

        return result.rows[0] ?? null;
}

export async function getUserByPasswordResetToken(token: string) {
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const result = await pool.query(
        `
            SELECT id, email 
            FROM users
            WHERE password_reset_token_hash = $1
            AND password_reset_expires_at > NOW()
        `,
            [tokenHash]
        )

    return result.rows[0] ?? null;
}

export async function resetUserPassword(
    userId: string, 
    hashedPassword: string
) {
    const result = await pool.query(
        `
        UPDATE users
        SET password = $1
            password_reset_token_hash = NULL,
            password_reset_expires_at = NULL
        WHERE id = $2 
        RETURNING id
        `,
        [hashedPassword, userId]
    );

    return result.rows[0] ?? null;
}