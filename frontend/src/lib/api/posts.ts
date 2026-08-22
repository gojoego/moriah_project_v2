import { ApiBaseUrl, handleResponse } from "./client";
import { getAuthHeaders } from "@/lib/auth";
import { CreatePostInput, CreatePostResponse, Post } from "@/types/post";

export async function fetchPosts(limit?: number) {
    const baseUrl = `${ApiBaseUrl}/api/posts`

    const url = limit ? `${baseUrl}?limit=${limit}` : baseUrl;

    const res = await fetch(url);

    return handleResponse<Post[]>(res);
}

export async function fetchPostById(id:string): Promise<Post> {
    const res = await fetch(`${ApiBaseUrl}/api/posts/${id}`);

    return handleResponse<Post>(res);
}

export async function fetchMyPosts(): Promise<Post[]> {
    const url = `${ApiBaseUrl}/api/posts/me`
    const res = await fetch(url, {
        headers: getAuthHeaders(),
    });

    return handleResponse<Post[]>(res);
}

export async function createPost(
    data: CreatePostInput
): Promise<CreatePostResponse> {
    const response = await fetch(`${ApiBaseUrl}/api/posts`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    return handleResponse<CreatePostResponse>(response);
}

export async function updatePostById(
    id: string, 
    data: Partial<CreatePostInput>
): Promise<Post> {
    const response = await fetch(`${ApiBaseUrl}/api/posts/${id}`, {
        method: "PUT", 
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    return handleResponse<Post>(response)
}

export async function deletePostById(id: string): Promise<void> {
    const response = await fetch(`${ApiBaseUrl}/api/posts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),        
    });

    if (!response.ok) {
        let message = "Request failed";
        try {
            const err = await response.json();
            message = err.error || message;
        } catch {}

        throw new Error(message);
    }
}