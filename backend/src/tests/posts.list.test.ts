import request from "supertest";
import app from "../server";

describe("GET /api/posts", () => {
  it("returns a list of posts", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
