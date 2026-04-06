export interface Post { 
    id: string;
    deceased_name: string;
    background: string;
    content: string;
    status: string;
    created_at: string;   
    author_name: string;
}

export interface CreatePostInput {
    deceased_name: string;
    content: string;
    background?: string;
}

export interface CreatePostResponse {
    success: boolean;
    post: Post;
}