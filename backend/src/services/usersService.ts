import { getUserById } from "../db/queries/users";

export async function getUserByIdService(userId: string) {
    return getUserById(userId);
}