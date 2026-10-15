import request from "supertest";
import app from "../../app";

describe("POST /api/auth/signup", () => {
    it("returns 400 when fields are missing", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({});

        expect(res.status).toBe(400);
    });

    it("returns 400 when terms are not accepted", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "test@example.com",
                password: "password123",
                displayName: "Test User",
                acceptedTerms: false,
                ageConfirmed: true,
            });

        expect(res.status).toBe(400);
    });

    it("returns 400 when acceptedTerms is missing", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "test@example.com",
                password: "password123",
                displayName: "Test User",
                ageConfirmed: true,
            });

        expect(res.status).toBe(400);
    });

    it("returns 400 when age is not confirmed", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "test@example.com",
                password: "password123",
                displayName: "Test User",
                acceptedTerms: true,
                ageConfirmed: false,
            });

        expect(res.status).toBe(400);
    });

    it("returns 400 when ageConfirmed is missing", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email: "test@example.com",
                password: "password123",
                displayName: "Test User",
                acceptedTerms: true,
            });

        expect(res.status).toBe(400);
    });
});