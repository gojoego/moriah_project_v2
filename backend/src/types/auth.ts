export type UserRole = "user" | "admin" | "moderator";

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}