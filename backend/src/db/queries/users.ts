import { pool } from "..";

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