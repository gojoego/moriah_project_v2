import { pool } from "..";

export async function getAllPosts() {
    const result = await pool.query(`
        SELECT
            p.id,
            p.deceased_name,
            p.background,
            p.content,
            p.status,
            p.created_at,
            u.display_name AS author_name
        FROM posts p 
        JOIN users u ON p.author_id = u.id 
        WHERE p.status = 'published'
        ORDER BY p.created_at DESC;
    `); 

    return result.rows;
}

export async function getPostsById(id: string){
    const result = await pool.query(
        `
        SELECT
            p.id,
            p.deceased_name,
            p.background,
            p.content,
            p.status,
            p.created_at,
            u.display_name AS author_name
        FROM posts p 
        JOIN users u ON p.author_id = u.id
        WHERE p.id = $1
        `,
        [id]
    );
    
    return result.rows[0];
}