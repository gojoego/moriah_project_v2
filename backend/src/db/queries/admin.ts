import { pool } from "..";

export async function getAllUsers(){
    const result = await pool.query(
        `
        SELECT 
            id, 
            display_name,
            email, 
            role, 
            created_at
        FROM users 
        ORDER BY created_at DESC
        `
    )

    return result.rows;
}

export async function getAllPostsAdmin() {
    const result = await pool.query(
        `
        SELECT
            p.id, 
            p.author_id, 
            p.deceased_name,
            p.background,
            p.content, 
            p.status, 
            p.created_at,
            u.display_name AS author_name
        FROM posts p
        JOIN users u ON p.author_id = u.id 
        ORDER BY p.created_at DESC 
        `
    )

    return result.rows;
}

export async function deletePostAdmin(id: string) {
    const result = await pool.query(
        `
        DELETE FROM posts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0] ?? null;
}

export async function updateUserRole(
    id: string, 
    role: "user" | "moderator" | "admin"
) {
    const result = await pool.query(
        `
        UPDATE users
        SET role = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING
            id, 
            email, 
            role
        `,
        [role, id]
    );

    return result.rows[0] ?? null;
}
