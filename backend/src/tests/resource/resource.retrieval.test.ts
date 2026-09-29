import { 
    extractResourceNeed,
    findResourcesForMessage
} from "../../services/resourceRetrievalService";

import { getAllResourcesService } from "../../services/resourceService";

import { Resource } from "../../types/resource";

jest.mock("../../services/resourceService", () => ({
    getAllResourcesService: jest.fn(),
}));

describe("extractResourceNeed", () => {
    it("detects sibling support group needs", () => {
        const result = extractResourceNeed(
            "I lost my brother and want a support group"
        );
        expect(result).toEqual({
            audience: "siblings",
            resourceType: "support_group",
        });
    });

    it("detects online grief support", () => {

        const result = extractResourceNeed(
            "I want online grief support"
        );
        expect(result).toEqual({
            category: "grief_support",
            format: "online",
        });
    });

    it("detects young adult resources", () => {

        const result = extractResourceNeed(
            "I am a young adult looking for support"
        );
        expect(result).toEqual({
            audience: "young_adults",
        });
    });

    it("returns no filters when nothing is recognized", () => {

        const result = extractResourceNeed(
            "I am looking for some help"
        );
        expect(result).toEqual({});
    });
});

describe("findResourcesForMessage", () => {

    it("passes extracted resource filters to the resource service", async () => {
        const mockedGetAllResourcesService =
            getAllResourcesService as jest.MockedFunction<
                typeof getAllResourcesService
            >;

        const mockResources: Resource[] = [];

        mockedGetAllResourcesService.mockResolvedValue(
            mockResources
        );

        const result = await findResourcesForMessage(
            "I lost my brother and want a support group"
        );

        expect(mockedGetAllResourcesService)
            .toHaveBeenCalledWith({
                audience: "siblings",
                resourceType: "support_group",
            });

        expect(result).toEqual(mockResources);
    });
});