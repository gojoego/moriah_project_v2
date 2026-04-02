export interface CreatePostInput {
    deceased_name: string;
    background?: string;
    content: string;
}

export interface Post {
    id: string;
    author_id: string;
    deceased_name: string;
    background: string | null;
    content: string;
    status: "draft" | "published" | "hidden";
    created_at: string;
    updated_at: string;
}