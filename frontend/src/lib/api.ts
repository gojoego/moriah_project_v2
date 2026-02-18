import { Post } from "@/types/post";

export async function fetchPosts(limit?: number) {
    const baseUrl = "http://localhost:4000/api/posts";

    const url = limit ? `${baseUrl}?limit=${limit}` : baseUrl;

    console.log(url);

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch posts");

    return response.json();
}

export async function fetchPostById(id:string): Promise<Post> {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`);

    if (!response.ok) throw new Error("failed to fetch post");

    return response.json();
}