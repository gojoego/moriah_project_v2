import type { Resource } from "@/types/resource";

export type ChatResourceResponse = {
    crisisDetected: boolean;
    resources: Resource[];
};

export async function fetchChatResources(
    message: string
): Promise<ChatResourceResponse> {
    const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        throw new Error(
            "NEXT_PUBLIC_API_BASE_URL is not configured"
        );
    }

    const response = await fetch(
        `${apiBaseUrl}/api/chat/resources`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to find resources"
        );
    }

    return response.json();
}