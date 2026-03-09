import { Post } from "@/types/post";

export async function fetchPosts(limit?: number) {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`

    const url = limit ? `${baseUrl}?limit=${limit}` : baseUrl;

    console.log(url);

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch posts");

    return response.json();
}

export async function fetchPostById(id:string): Promise<Post> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`);

    if (!response.ok) throw new Error("failed to fetch post");

    return response.json();
}