import request from "supertest";
import app from "../app";
import { getUserById } from "../db/queries/users";

jest.mock("../../db/queries/users", () => ({
  getUserById: jest.fn(),
}));

describe("GET /api/users/me", () => {
  it("returns the current user", async () => {
    (getUserById as jest.Mock).mockResolvedValue({
      id: "123",
      display_name: "Joe",
      email: "joe@test.com",
      birthday: "1990-01-01",
    });

    const res = await request(app).get("/api/users/me");

    expect(res.status).toBe(200);
    expect(res.body.email).toBeDefined();
  });
});