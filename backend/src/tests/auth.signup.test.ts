import request from "supertest";
import app from "../server";

describe("POST /api/auth/signup", () => {
  it("creates a user when valid data is provided", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@example.com",
        password: "password123",
        displayName: "Test User",
      });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({});

    expect(res.status).toBe(400);
  });
});
