import { getUserById, updateUserDisplayName } from "../db/queries/users";

export async function getUserByIdService(userId: string) {
    return getUserById(userId);
}

export async function updateDisplayNameService(
    userId: string,
    displayName: string
) {
    return updateUserDisplayName(userId, displayName);
}