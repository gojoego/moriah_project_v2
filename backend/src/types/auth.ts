import { UserRole } from "./roles";
import { Request } from "express";
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}