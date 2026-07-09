import { CreatePostInput, CreatePostResponse, Post } from "@/types/post";
import { LoginInput, LoginResponse, SignupInput, SignupResponse } from "@/types/auth"
import { getAuthHeaders } from "@/lib/auth";

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
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    return handleResponse<CreatePostResponse>(response);
}

export async function loginUser(
        data: LoginInput
    ): Promise<LoginResponse> {
    const response = await fetch(
        `${ApiBaseUrl}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse<LoginResponse>(response);
}

export async function signupUser(data: SignupInput): Promise<SignupResponse> {
    const response = await fetch(
        `${ApiBaseUrl}/api/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse<SignupResponse>(response);
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

export async function forgotPassword(email: string): Promise<{message: string}> {
    const response = await fetch(`${ApiBaseUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    return handleResponse<{message: string}>(response);
}

export async function resetPassword( data: {
    token: string;
    password: string;
}): Promise<{ message: string }> {
    const response = await fetch(`${ApiBaseUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),  
    })

    return handleResponse<{ message: string }>(response);
}