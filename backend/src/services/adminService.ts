import {
    getAllUsersAdmin,
    getAllPostsAdmin,
    deletePostAdmin,
    updateUserRole,
    getAdminStats
} from "../db/queries/admin";

import { UserRole } from "../types/roles";

import { PaginationOptions } from "../types/pagination"

export async function getAllUsersAdminService(options?: PaginationOptions){
    return getAllUsersAdmin(options);
}

export async function getAllPostsAdminService(options?: PaginationOptions){
    return getAllPostsAdmin(options);
}

export async function deletePostAdminService(id: string) {
    return deletePostAdmin(id);
}

export async function updateUserRoleService(
    id: string, 
    role: UserRole,    
) {
    return updateUserRole(id, role)
}

export async function getAdminStatsService() {
    return getAdminStats();
}