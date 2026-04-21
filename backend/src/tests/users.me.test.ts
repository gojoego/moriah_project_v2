import request from "supertest";
import app from "../app";
import { getUserById } from "../db/queries/users";
import { signToken } from "../utils/jwt";

jest.mock("../db/queries/users", () => ({
    getUserById: jest.fn(),
}));

describe("GET /api/users/me", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the current user (200)", async () => {
        const token = signToken({
            id: "123",
            email: "joe@test.com",
        });

        (getUserById as jest.Mock).mockResolvedValue({
            id: "123",
            display_name: "Joe",
            email: "joe@test.com",
            role: "user",
        });

        const res = await request(app)
            .get("/api/users/me")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.email).toBe("joe@test.com");
        expect(res.body.role).toBe("user");
    });

    it("returns 401 if no token is provided", async () => {
        const res = await request(app).get("/api/users/me");

        expect(res.status).toBe(401);
        expect(res.body.error).toBeDefined();
    });

    it("returns 404 if user is not found", async () => {
        const token = signToken({
            id: "123",
            email: "joe@test.com",
        });

        (getUserById as jest.Mock).mockResolvedValue(null);

        const res = await request(app)
            .get("/api/users/me")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("User not found");
    });
});