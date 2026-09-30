import { ResourceNeed } from "../types/resource";
import { getAllResourcesService } from "./resourceService";

export function extractResourceNeed(
    message: string
): ResourceNeed {
    const normalized = message.toLowerCase();

    const need: ResourceNeed = {};

    if (
        /\bbrother\b/i.test(normalized) ||
        /\bsister\b/i.test(normalized) ||
        /\bsibling\b/i.test(normalized)
    ) {
        need.audience = "siblings";
    }

    if (/\bsupport group\b/i.test(normalized)) {
        need.resourceType = "support_group";
    }

    if (
        /\bsuicide loss\b/i.test(normalized) ||
        /\blost someone to suicide\b/i.test(normalized)
    ) {
        need.category = "suicide_loss";
    }

    if (/\bgrief\b/i.test(normalized)) {
        need.category = "grief_support";
    }

    if (/\bonline\b/i.test(normalized)) {
        need.format = "online";
    }

    if (/\bphone\b/i.test(normalized)) {
        need.format = "phone";
    }

    if (/\btext\b/i.test(normalized)) {
        need.format = "text";
    }

    if (
        !need.audience &&
        /\b(teen|teenager)\b/i.test(normalized)
    ) {
        need.audience = "teens";
    }


    if (
        !need.audience &&
        /\b(young adult|college)\b/i.test(normalized)
    ) {
        need.audience = "young_adults";
    }


    if (
        !need.audience &&
        /\b(parent|mom|dad)\b/i.test(normalized)
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