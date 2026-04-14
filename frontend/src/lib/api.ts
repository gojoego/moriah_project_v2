import { CreatePostInput, CreatePostResponse, Post } from "@/types/post";

const ApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!ApiBaseUrl){
    throw new Error("NEXT_PUBLIC_API_BASE_URL not set");
};

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        let message = "Request Failed"

        try {
            const err = await res.json();
            message = err.error || message;
        } catch {}

        throw new Error(message);
    }
    return res.json();
}

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

export async function fetchMyPosts(token: string): Promise<Post[]> {
    const url = `${ApiBaseUrl}/api/posts/me`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse<Post[]>(res);
}

export async function createPost(
    data: CreatePostInput
): Promise<CreatePostResponse> {
    const response = await fetch(`${ApiBaseUrl}/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return handleResponse<CreatePostResponse>(response);
    }

    return response.json();
}


    