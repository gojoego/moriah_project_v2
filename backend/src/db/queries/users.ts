import { pool } from "..";

export async function getUserById(id:string) {
    const result = await pool.query(
        `
        SELECT 
            id, 
            display_name, 
            email 
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}