import { pool } from "..";
import { UserRole } from "../../types/roles";
import { AdminStats } from "../../types/stats";

export async function getAllUsersAdmin(options?: {
    limit?: number;
    offset?: number;
}){
    let query =
        `
        SELECT 
            id, 
            display_name,
            email, 
            role, 
            created_at
        FROM users 
        ORDER BY created_at DESC
        `;

    const values: number[] = [];

    if (options?.limit !== undefined) {
        values.push(options.limit);
        query += ` LIMIT $${values.length}`;
    }

    if (options?.offset !== undefined) {
        values.push(options.offset);
        query += ` OFFSET $${values.length}`;
    }

    const result = await pool.query(query, values);

    return result.rows;
}

export async function getAllPostsAdmin(options?: {
    limit?: number;
    offset?: number;
}) {
    let query = `
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
    `;

    const values: number[] = [];

    if (options?.limit !== undefined) {
        values.push(options.limit);
        query += ` LIMIT $${values.length}`;
    }

    if (options?.offset !== undefined) {
        values.push(options.offset);
        query += ` OFFSET $${values.length}`;
    }

    const result = await pool.query(query, values);

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
    role: UserRole,
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

export async function getAdminStats(): Promise<AdminStats> {
    const query = 
        `
            SELECT 
            (
                SELECT COUNT(*)
                from users
            ) AS total_users,
            
            (
                SELECT COUNT(*)
                from posts
            ) AS total_posts,

            (
                SELECT COUNT(*)
                from users 
                WHERE created_at >= NOW() - INTERVAL '7 days' 
            ) AS new_users,

            (
                SELECT COUNT(*)
                from posts
                WHERE created_at >= NOW() - INTERVAL '7 days'            
            ) AS recent_posts;
        `;

        const result = await pool.query(query);

        const row = result.rows[0];

        return {
            totalUsers: Number(row.total_users),
            totalPosts: Number(row.total_posts),
            newUsers: Number(row.new_users),
            recentPosts: Number(row.recent_posts),
        };
}