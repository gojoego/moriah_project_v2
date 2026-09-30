import request from "supertest";
import app from "../../app";
import { getChatResources } from "../../services/chatService";
import { Resource } from "../../types/resource";

jest.mock("../../services/chatService", () => ({
    getChatResources: jest.fn(),
}));

const mockedGetChatResources =
    getChatResources as jest.MockedFunction<typeof getChatResources>;

describe("POST /api/chat/resources", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns matching resources for a valid message", async () => {
        const mockResources: Resource[] = [
            {
                id: "11111111-1111-1111-1111-111111111111",
                name: "The Compassionate Friends",
                description:
                    "Peer support for families grieving a loss.",
                url: "https://example.com",
                category: "grief_support",
                resourceType: "support_group",
                audience: ["siblings"],
                format: ["online"],
                locationScope: "national",
                tags: ["grief"],
                isActive: true,
                createdAt: "2026-09-29T00:00:00.000Z",
                updatedAt: "2026-09-29T00:00:00.000Z",
            },
        ];

        mockedGetChatResources.mockResolvedValue({
            crisisDetected: false,
            resources: mockResources,
        });

        const response = await request(app)
            .post("/api/chat/resources")
            .send({
                message:
                    "I lost my brother and want an online support group",
            });

        expect(response.status).toBe(200);

        expect(mockedGetChatResources)
            .toHaveBeenCalledWith(
                "I lost my brother and want an online support group"
            );

        expect(response.body).toEqual({
            crisisDetected: false,
            resources: mockResources,
        });
    });


    it("returns 400 when the message is empty", async () => {
        const response = await request(app)
            .post("/api/chat/resources")
            .send({
                message: "",
            });

        expect(response.status).toBe(400);

        expect(mockedGetChatResources)
            .not
            .toHaveBeenCalled();
    });


    it("returns 400 when message is missing", async () => {
        const response = await request(app)
            .post("/api/chat/resources")
            .send({});

        expect(response.status).toBe(400);

        expect(mockedGetChatResources)
            .not
            .toHaveBeenCalled();
    });


    it("returns 500 when the chat service throws an unexpected error", async () => {
        mockedGetChatResources.mockRejectedValue(
            new Error("Something went wrong")
        );

        const response = await request(app)
            .post("/api/chat/resources")
            .send({
                message: "I need grief support",
            });

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
            error: "Internal server error",
        });
    });
});