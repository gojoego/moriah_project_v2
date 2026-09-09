import { pool } from "..";
import { Resource } from "../../types/resource";
import { ResourceQuery } from "../../schemas/resource"

export async function getAllResources(
    options?: ResourceQuery
): Promise<Resource[]> {
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
        `;
    
    const values: unknown[] = [];

    if (options?.category !== undefined) {
        values.push(options.category);
        query += ` AND category = $${values.length}`;
    }

    if (options?.resourceType !== undefined) {
        values.push(options.resourceType);
        query += ` AND resource_type = $${values.length}`;
    }

    if (options?.audience !== undefined) {
        values.push(options.audience);
        query += ` AND $${values.length} = ANY(audience)`;
    }
    
    if (options?.format !== undefined) {
        values.push(options.format);
        query += ` AND $${values.length} = ANY(format)`;
    }

    if (options?.search !== undefined) {
        values.push(`%${options.search}%`);

        query += 
        `
        AND (
            name ILIKE $${values.length}
            OR description ILIKE $${values.length}
            OR array_to_string(tags, ' ') ILIKE $${values.length}
        )
        `;
    }

    query += ` ORDER BY name ASC`;

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