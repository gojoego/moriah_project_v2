import { pool } from "..";
import { Post } from "../../types/post";

export async function getAllPosts(options?: {
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
        WHERE p.status = 'published'
        ORDER BY p.created_at DESC
    `; 

    const values: (number | string)[] = [];

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

export async function getPostsByAuthorId(id: string): Promise<Post[]> {
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
            u.display_name as author_name
        FROM posts p
        JOIN users u on p.author_id = u.id
        WHERE p.author_id = $1
        ORDER BY p.created_at DESC
        `,
        [id]
    );

    return result.rows;
}

export async function getPostsById(id: string){
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
        WHERE p.id = $1
        `,
        [id]
    );
    
    return result.rows[0];
}

export async function insertPost(
    author_id: string,
    input: {
        deceased_name: string;
        background?: string;
        content: string;   
    }
): Promise<Post>{
    const query =
        `
        INSERT INTO Posts (author_id,deceased_name, background, content) 
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

    const values = [
        author_id, 
        input.deceased_name, 
        input.background ?? null, 
        input.content
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function updatePost(
    postId: string, 
    data: {
        deceased_name?: string;
        background?: string;
        content?: string;   
    }
) {
    const fields: string[] = [];
    const values: unknown[] = [];

    let index = 1;

    if (data.deceased_name !== undefined) {
        fields.push(`deceased_name = $${index++}`);
        values.push(data.deceased_name);
    }

    if (data.content !== undefined) {
        fields.push(`content = $${index++}`);
        values.push(data.content);
    }

    if (data.background !== undefined) {
        fields.push(`background = $${index++}`);
        values.push(data.background);
    }

    values.push(postId);

    const query = 
        `
        UPDATE posts 
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *
        `;       

    const result = await pool.query(query, values);

    return result.rows[0] ?? null;
}

export async function deletePost(id: string) {
    const result = await pool.query(
        `
        DELETE FROM posts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    )

    return result.rows[0] ?? null;
}