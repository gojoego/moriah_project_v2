import request from "supertest";
import app from "../../app";
import { signToken } from "../../utils/jwt";

jest.mock("../../db/queries/admin", () => ({
    getAllUsersAdmin: jest.fn(),
    getAllPostsAdmin: jest.fn(),
    deletePostAdmin: jest.fn(),
    updateUserRole: jest.fn(),
}));


import {
    getAllUsersAdmin,
} from "../../db/queries/admin";


const mockGetAllUsers = jest.mocked(getAllUsersAdmin);


describe("Admin authorization", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe("GET /api/admin/users", () => {


        it("returns 401 when no token is provided", async () => {

            const res = await request(app)
                .get("/api/admin/users");


            expect(res.status).toBe(401);

        });



        it("returns 403 when user is not an admin", async () => {

            const token = signToken({
                id: "user-123",
                email: "user@test.com",
                role: "user",
            });


            const res = await request(app)
                .get("/api/admin/users")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );


            expect(res.status).toBe(403);

        });



        it("allows admins to access users", async () => {

            const token = signToken({
                id: "admin-123",
                email: "admin@test.com",
                role: "admin",
            });


            mockGetAllUsers.mockResolvedValue([
                {
                    id: "user-1",
                    display_name: "Test User",
                    email: "test@test.com",
                    role: "user",
                },
            ]);


            const res = await request(app)
                .get("/api/admin/users")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );


            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);

        });

    });

});