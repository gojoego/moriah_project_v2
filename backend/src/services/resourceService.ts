import { getAllResources } from "../db/queries/resource";
import { Resource } from "../types/resource";
import { ResourceQuery } from "../schemas/resource"

export async function getAllResourcesService(
    options?: ResourceQuery
): Promise<Resource[]> {
    return getAllResources(options);
}