import { Post } from "@/types/post";

const ApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!ApiBaseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL not set")

export async function fetchPosts(limit?: number) {
    const baseUrl = `${ApiBaseUrl}/api/posts`

    const url = limit ? `${baseUrl}?limit=${limit}` : baseUrl;

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch posts");

    return response.json();
}

export async function fetchPostById(id:string): Promise<Post> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {cache: "no-store"});

    if (!response.ok) throw new Error("failed to fetch post");

    return response.json();
}