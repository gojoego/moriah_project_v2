import request from "supertest";

import app from "../../app";
import { pool } from "../../db";
import { CURRENT_TERMS_VERSION } from "../../constants/legal";

describe("POST /api/auth/signup", () => {
    it("creates a user when valid data is provided", async () => {
        const email = `signup-${Date.now()}@example.com`;

        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email,
                password: "password123",
                displayName: "Test User",
                acceptedTerms: true,
                ageConfirmed: true,
            });

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe(email);
    });

    it("stores legal acceptance metadata when a user signs up", async () => {
        const email = `signup-persistence-${Date.now()}@example.com`;

        const res = await request(app)
            .post("/api/auth/signup")
            .send({
                email,
                password: "password123",
                displayName: "Test User",
                acceptedTerms: true,
                ageConfirmed: true,
            });

        expect(res.status).toBe(201);

        const result = await pool.query(
            `
            SELECT
                terms_accepted_at,
                terms_version,
                age_attested_at
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        expect(result.rows).toHaveLength(1);
        expect(result.rows[0].terms_accepted_at).not.toBeNull();
        expect(result.rows[0].terms_version).toBe(
            CURRENT_TERMS_VERSION
        );
        expect(result.rows[0].age_attested_at).not.toBeNull();
    });

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