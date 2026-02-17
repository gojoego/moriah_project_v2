import { Post } from "@/types/post";

export async function fetchPosts() {
    const response = await fetch("http://localhost:4000/api/posts");

    if (!response.ok) throw new Error("failed to fetch posts");

    return response.json();
}

export async function fetchPostById(id:string): Promise<Post> {
    const response = await fetch(`http://localhost:4000/api/posts/${id}`);

    if (!response.ok) throw new Error("failed to fetch post");

    return response.json();
}