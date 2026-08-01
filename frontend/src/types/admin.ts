export type AdminUserRole =
    "user"
    | "moderator"
    | "admin";

export interface AdminUser {
    id: string;
    display_name: string;
    email: string;
    role: AdminUserRole;
    created_at: string;
}

export interface AdminPost {
    id: string;
    deceased_name: string;
    content: string;
    author_name: string;
    status: string;
    created_at: string;
}