import { API_BASE_URL, handleResponse } from "./client";
import { getAuthHeaders } from "@/lib/auth";
import { CurrentUser } from "@/types/auth";

export async function getCurrentUser(): Promise<CurrentUser> {
    const response = await fetch(
        `${API_BASE_URL}/api/users/me`,
        {
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<CurrentUser>(response);
}

export async function updateDisplayName(
    displayName: string
): Promise<CurrentUser> {
    const response = await fetch(
        `${API_BASE_URL}/api/users/me`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({ displayName }),
        }
    );

    return handleResponse<CurrentUser>(response);
}