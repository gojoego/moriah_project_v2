import { pool } from "..";
import { Resource } from "../../types/resource";

export async function getAllResources(options?: {
    limit?: number;
    offset?: number;
}): Promise<Resource[]> {
    let query = 
        `
            SELECT 
                id, 
                name, 
                description, 
                url, 
                category, 
                resource_type AS "resourceType", 
                audience,
                format,
                location_scope AS "locationScope",
                tags,
                is_active AS "isActive",
                created_at AS "createdAt",
                updated_at AS "updatedAt"
            FROM resources
            WHERE is_active = TRUE
            ORDER BY name ASC
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