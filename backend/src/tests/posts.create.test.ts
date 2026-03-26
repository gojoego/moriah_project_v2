import request from "supertest";
import app from "../server";

describe.skip("POST /api/posts", () => {
  it("creates a post with required fields", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        deceased_name: "John",
        content: "I wish I could have told you...",
      });

    expect(res.status).toBe(200);
    expect(res.body.deceased_name).toBe("John");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({});

    expect(res.status).toBe(400);
  });
});
