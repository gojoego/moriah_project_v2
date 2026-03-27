jest.mock("../db", () => ({
  pool: {
    query: jest.fn().mockResolvedValue({
      rows: [
        {
          id: "1",
          deceased_name: "Test",
          background: "Test",
          content: "Test",
          status: "published",
          created_at: new Date(),
          author_name: "Test User",
        },
      ],
    }),
  },
}));

import request from "supertest";
import app from "../server";

describe("GET /api/posts", () => {
  it("returns a list of posts", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
