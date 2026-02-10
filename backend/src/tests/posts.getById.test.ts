import request from "supertest";
import app from "../server";

describe("GET /api/posts/:id", () => {
  it("returns a post by id", async () => {
    const res = await request(app).get("/api/posts/123");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("123");
  });
});
