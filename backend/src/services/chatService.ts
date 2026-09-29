import { detectCrisis } from "./crisisDetectionService";

import { findResourcesForMessage } from "./resourceRetrievalService";

import { getAllResourcesService } from "./resourceService";

export async function getChatResources(
    message: string
) {
    const crisisResult = detectCrisis(message);

    if (crisisResult.crisisDetected) {
        const resources = await getAllResourcesService({
            category: "crisis_support",
        });
        return {
            crisisDetected: true,
            resources,
        };
    }

    const resources = await findResourcesForMessage(
        message
    );

    return {
        crisisDetected: false,
        resources,
    };
}