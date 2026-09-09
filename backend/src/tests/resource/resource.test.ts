import request from "supertest";

import app from "../../app";

import { getAllResourcesService } from "../../services/resourceService";

jest.mock("../../services/resourceService");

const mockGetAllResourcesService = 
    getAllResourcesService as jest.MockedFunction<typeof getAllResourcesService>;

describe("GET /api/resource", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns resources", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        const response = await request(app)
            .get("/api/resource")
            .expect(200)
        
        expect(response.body).toEqual([]);
        expect(mockGetAllResourcesService).toHaveBeenCalledWith({});
    });

    it("passes category filter to the service", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?category=grief_support")
            .expect(200);
        
        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            category: "grief_support",
        });
    });

    it("passes resourceType filter to the service", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?resourceType=peer_support")
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            resourceType: "peer_support",
        });
    })

    it("passes audience filter to the service", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?audience=adults")
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            audience: "adults",
        });
    });

    it("passes format filter to the service", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?format=online")
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            format: "online",
        });
    });

    it("passes search query to the service", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?search=grief")
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            search: "grief",
        });
    });

    it("passes multiple filters together", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get(
                "/api/resource?category=grief_support&audience=adults&format=online"
            )
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            category: "grief_support",
            audience: "adults",
            format: "online",
        });
    });

    it("coerces limit and offset to numbers", async () => {
        mockGetAllResourcesService.mockResolvedValue([]);

        await request(app)
            .get("/api/resource?limit=10&offset=5")
            .expect(200);

        expect(mockGetAllResourcesService).toHaveBeenCalledWith({
            limit: 10,
            offset: 5,
        });
    });

    it("returns 400 for an invalid category", async () => {
        const response = await request(app)
            .get("/api/resource?category=made_up_category")
            .expect(400);

        expect(response.body).toEqual({
            error: "Invalid resource query parameters",
        });

        expect(mockGetAllResourcesService).not.toHaveBeenCalled();
    }); 
})