import { UserRole } from "./roles";
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}