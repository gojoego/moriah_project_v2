import request from "supertest";
import app from "../app";
import { getUserById } from "../db/queries/users";
import { authMiddleware } from "../middleware/auth";
import { error } from "node:console";

jest.mock("../db/queries/users", () => ({
  	getUserById: jest.fn(),
}));

jest.mock("../middleware/auth", () => ({
  	authMiddleware: jest.fn(),
}));

describe("GET /api/users/me", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns the current user (200)", async () => {
		(authMiddleware as jest.Mock).mockImplementation(
			(req: any, _res: any, next: any) => {
				req.user = {id: "123", email: "joe@test.com" };
				next();
			}
		);

		(getUserById as jest.Mock).mockResolvedValue({
			id: "123",
			display_name: "Joe",
			email: "joe@test.com",
		});

		const res = await request(app).get("/api/users/me");

		expect(res.status).toBe(200);
		expect(res.body.email).toBeDefined();
	});

	it("returns 401 if no auth user (unauthorized)", async () => {
		(authMiddleware as jest.Mock).mockImplementation(
			(_req: any, res: any) => {
				return res.status(401).json({ error: "Unauthorized"});
			}	
		);

		const res = await request(app).get("api/users/me");

		expect(res.status).toBe(401);
		expect(res.body.error).toBeDefined();
	});
});