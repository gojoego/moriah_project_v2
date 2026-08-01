import { ApiBaseUrl, handleResponse } from "./client";
import { getAuthHeaders } from "@/lib/auth";
import { AdminUser, AdminPost } from "@/types/admin";

export async function fetchAdminUsers(
    limit?: number,
    offset?: number
): Promise<AdminUser[]> {

    const params = new URLSearchParams();

    if (limit !== undefined) {
        params.append("limit", String(limit));
    }

    if (offset !== undefined) {
        params.append("offset", String(offset));
    }

    const queryString = params.toString()
        ? `?${params.toString()}`
        : "";

    const response = await fetch(
        `${ApiBaseUrl}/api/admin/users${queryString}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<AdminUser[]>(response);
}

export async function fetchAdminPosts(
    limit?: number,
    offset?: number
): Promise<AdminPost[]> {

    const params = new URLSearchParams();

    if (limit !== undefined) {
        params.append("limit", String(limit));
    }

    if (offset !== undefined) {
        params.append("offset", String(offset));
    }

    const queryString = params.toString()
        ? `?${params.toString()}`
        : "";

    const response = await fetch(
        `${ApiBaseUrl}/api/admin/posts${queryString}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<AdminPost[]>(response);
}