import request from "supertest";
import app from "../server";

describe("GET /health", () => {
    it("should return 200", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
    });
});

