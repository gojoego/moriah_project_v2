import { ResourceNeed } from "../types/resource";
import { getAllResourcesService } from "./resourceService";

export function extractResourceNeed(
    message: string
): ResourceNeed {
    const normalized = message.toLowerCase();

    const need: ResourceNeed = {};

    if (
        normalized.includes("brother") ||
        normalized.includes("sister") ||
        normalized.includes("sibling")
    ) {
        need.audience = "siblings";
    }

    if (normalized.includes("support group")) {
        need.resourceType = "support_group";
    }

    if (
        normalized.includes("suicide loss") ||
        normalized.includes("lost someone to suicide")
    ) {
        need.category = "suicide_loss";
    }

    if (normalized.includes("grief")) {
        need.category = "grief_support";
    }

    if (normalized.includes("online")) {
        need.format = "online";
    }

    if (normalized.includes("phone")) {
        need.format = "phone";
    }

    if (normalized.includes("text")) {
        need.format = "text";
    }

    if (
        normalized.includes("teen") ||
        normalized.includes("teenager")
    ) {
        need.audience = "teens";
    }

    if (
        normalized.includes("young adult") ||
        normalized.includes("college")
    ) {
        need.audience = "young_adults";
    }

    if (
        normalized.includes("parent") ||
        normalized.includes("mom") ||
        normalized.includes("dad")
    ) {
        need.audience = "parents";
    }

    return need;
}
export async function findResourcesForMessage(
    message: string
) {
    const filters = extractResourceNeed(message);
    return getAllResourcesService(filters);
}