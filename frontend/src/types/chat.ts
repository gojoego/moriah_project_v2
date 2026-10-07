import type { Resource } from "@/types/resource";

export type ChatResourceResponse = {
    crisisDetected: boolean;
    resources: Resource[];
};