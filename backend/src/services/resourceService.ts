import { getAllResources } from "../db/queries/resource";
import { Resource } from "../types/resource";

export async function getAllResourcesService(options?: {
    limit?: number;
    offset?: number
}): Promise<Resource[]> {
    return getAllResources(options);
}