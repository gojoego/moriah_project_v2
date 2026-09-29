import { getChatResources } from "../../services/chatService";
import { detectCrisis } from "../../services/crisisDetectionService";
import { findResourcesForMessage } from "../../services/resourceRetrievalService";
import { getAllResourcesService } from "../../services/resourceService";

import { Resource } from "../../types/resource";

jest.mock("../../services/crisisDetectionService", () => ({
    detectCrisis: jest.fn(),
}));

jest.mock("../../services/resourceRetrievalService", () => ({
    findResourcesForMessage: jest.fn(),
}));

jest.mock("../../services/resourceService", () => ({
    getAllResourcesService: jest.fn(),
}));

const mockedDetectCrisis =
    detectCrisis as jest.MockedFunction<
        typeof detectCrisis
    >;

const mockedFindResourcesForMessage =
    findResourcesForMessage as jest.MockedFunction<
        typeof findResourcesForMessage
    >;

const mockedGetAllResourcesService =
    getAllResourcesService as jest.MockedFunction<
        typeof getAllResourcesService
    >;


describe("getChatResources", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it("uses normal resource retrieval when no crisis is detected", async () => {

        mockedDetectCrisis.mockReturnValue({
            crisisDetected: false,
            matchedSignals: [],
        });

        const mockResources: Resource[] = [];

        mockedFindResourcesForMessage.mockResolvedValue(
            mockResources
        );

        const message =
            "I lost my brother and want a support group";

        const result = await getChatResources(
            message
        );

        expect(mockedFindResourcesForMessage)
            .toHaveBeenCalledWith(message);

        expect(mockedGetAllResourcesService)
            .not
            .toHaveBeenCalled();

        expect(result).toEqual({
            crisisDetected: false,
            resources: mockResources,
        });
    });


    it("returns crisis resources when crisis language is detected", async () => {

        mockedDetectCrisis.mockReturnValue({
            crisisDetected: true,
            matchedSignals: ["want to die"],
        });

        const mockCrisisResources: Resource[] = [];

        mockedGetAllResourcesService.mockResolvedValue(
            mockCrisisResources
        );

        const message =
            "I want to die";

        const result = await getChatResources(
            message
        );

        expect(mockedGetAllResourcesService)
            .toHaveBeenCalledWith({
                category: "crisis_support",
            });

        expect(mockedFindResourcesForMessage)
            .not
            .toHaveBeenCalled();

        expect(result).toEqual({
            crisisDetected: true,
            resources: mockCrisisResources,
        });
    });
});