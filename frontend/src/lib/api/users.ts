import { ApiBaseUrl, handleResponse } from "./client";
import { getAuthHeaders } from "@/lib/auth";
import { CurrentUser } from "@/types/auth"

export async function getCurrentUser(): Promise<CurrentUser> {
    const response = await fetch(
        `${ApiBaseUrl}/api/users/me`,
        {
            headers: getAuthHeaders(),
        }
    );

    return handleResponse<CurrentUser>(response);
}