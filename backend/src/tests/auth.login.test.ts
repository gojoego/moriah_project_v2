import request from "supertest";
import app from "../server";

describe("POST /api/auth/login", () => {
    it("returns user and token when valid data provided", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@test.com",
                password: "password"
            });
        
            expect(res.status).toBe(200);
            expect(res.body.user).toBeDefined();
            expect(res.body.token).toBeDefined();
    });

    it("returns 400 when required fields are missing", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({});
        
        expect(res.status).toBe(400);
    });    
});