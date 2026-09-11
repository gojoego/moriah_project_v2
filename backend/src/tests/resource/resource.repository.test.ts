import { pool } from "../../db";

import { getAllResources } from "../../db/queries/resource";

jest.mock("../../db", () => ({
    pool: {
        query: jest.fn(),
    },
}));

const mockPoolQuery = pool.query as jest.Mock;

describe("getAllResources", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        mockPoolQuery.mockResolvedValue({
            rows: [],
        });
    });

    it("returns rows from the database", async () => {

        const mockResources = [
            {
                id: "resource-1",
                name: "Test Resource",
                description: "Test description",
                url: "https://example.com",
                category: "grief_support",
                resourceType: "support_group",
                audience: ["adults"],
                format: ["online"],
                locationScope: "national",
                tags: ["grief"],
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        mockPoolQuery.mockResolvedValue({
            rows: mockResources,
        });

        const result = await getAllResources();

        expect(result).toEqual(mockResources);
    });

    it("adds a category filter", async () => {

        await getAllResources({
            category: "grief_support",
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain("category = $1");

        expect(values).toEqual(["grief_support"]);
    });

    it("adds a resourceType filter", async () => {

        await getAllResources({
            resourceType: "peer_support",
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain("resource_type = $1");

        expect(values).toEqual(["peer_support"]);
    });

    it("uses ANY for audience filters", async () => {

        await getAllResources({
            audience: "adults",
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain("$1 = ANY(audience)");

        expect(values).toEqual(["adults"]);
    });

    it("uses ANY for format filters", async () => {

        await getAllResources({
            format: "online",
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain("$1 = ANY(format)");

        expect(values).toEqual(["online"]);
    });

    it("searches name, description, and tags", async () => {

        await getAllResources({
            search: "grief",
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain(
            "name ILIKE $1"
        );

        expect(query).toContain(
            "description ILIKE $1"
        );

        expect(query).toContain(
            "array_to_string(tags, ' ') ILIKE $1"
        );

        expect(values).toEqual(["%grief%"]);
    });

    it("adds limit and offset", async () => {

        await getAllResources({
            limit: 10,
            offset: 5,
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain("LIMIT $1");

        expect(query).toContain("OFFSET $2");

        expect(values).toEqual([10, 5]);
    });

    it("builds parameter positions correctly with multiple filters", async () => {

        await getAllResources({
            category: "grief_support",
            resourceType: "support_group",
            audience: "adults",
            format: "online",
            search: "grief",
            limit: 10,
            offset: 5,
        });

        const [query, values] = mockPoolQuery.mock.calls[0];

        expect(query).toContain(
            "category = $1"
        );

        expect(query).toContain(
            "resource_type = $2"
        );

        expect(query).toContain(
            "$3 = ANY(audience)"
        );

        expect(query).toContain(
            "$4 = ANY(format)"
        );

        expect(query).toContain(
            "name ILIKE $5"
        );

        expect(query).toContain(
            "description ILIKE $5"
        );

        expect(query).toContain(
            "array_to_string(tags, ' ') ILIKE $5"
        );

        expect(query).toContain(
            "LIMIT $6"
        );

        expect(query).toContain(
            "OFFSET $7"
        );

        expect(values).toEqual([
            "grief_support",
            "support_group",
            "adults",
            "online",
            "%grief%",
            10,
            5,
        ]);
    });

    it("always filters out inactive resources", async () => {

        await getAllResources();

        const [query] = mockPoolQuery.mock.calls[0];

        expect(query).toContain(
            "WHERE is_active = TRUE"
        );
    });

    it("orders resources by name", async () => {

        await getAllResources();

        const [query] = mockPoolQuery.mock.calls[0];

        expect(query).toContain(
            "ORDER BY name ASC"
        );
    });
});