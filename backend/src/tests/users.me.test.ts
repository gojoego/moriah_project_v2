import request from "supertest";
import app from "../server";

describe("GET /api/users/me", () => {
  it("returns the current user", async () => {
    const res = await request(app).get("/api/users/me");

    expect(res.status).toBe(200);
    expect(res.body.email).toBeDefined();
    expect(res.body.role).toBe("user");
  });
});
