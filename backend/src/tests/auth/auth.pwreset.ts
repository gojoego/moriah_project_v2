import request from "supertest";
import bcrypt from "bcrypt";

import app from "../../app";

import {
    getUserByEmail,
    getUserByPasswordResetToken,
    resetUserPassword,
    setPasswordResetToken,
} from "../../db/queries/users";

import { sendPasswordResetEmail } from "../../services/email";

jest.mock("../../db/queries/users", () => ({
    getUserByEmail: jest.fn(),
    getUserByPasswordResetToken: jest.fn(),
    resetUserPassword: jest.fn(),
    setPasswordResetToken: jest.fn(),
}));

jest.mock("../../services/email", () => ({
    sendPasswordResetEmail: jest.fn(),
}));

const mockGetUserByEmail = jest.mocked(getUserByEmail);
const mockGetUserByPasswordResetToken = jest.mocked(
    getUserByPasswordResetToken
);
const mockResetUserPassword = jest.mocked(resetUserPassword);
const mockSetPasswordResetToken = jest.mocked(setPasswordResetToken);
const mockSendPasswordResetEmail = jest.mocked(sendPasswordResetEmail);

const GENERIC_RESET_MESSAGE =
    "If an account exists, a password reset email has been sent.";

describe("Password reset routes", () => {
    beforeAll(() => {
        process.env.FRONTEND_URL = "https://www.moriahproject.org";
    });

    beforeEach(() => {
        jest.clearAllMocks();

        mockSetPasswordResetToken.mockResolvedValue({
            id: "user-123",
            email: "joe@example.com",
        });

        mockSendPasswordResetEmail.mockResolvedValue(undefined);

        mockResetUserPassword.mockResolvedValue({
            id: "user-123",
        });
    });

    afterAll(() => {
        delete process.env.FRONTEND_URL;
    });

    describe("POST /api/auth/forgot-password", () => {
        it("returns the generic response for an existing email", async () => {
  
            mockGetUserByEmail.mockResolvedValue({
                id: "user-123",
                display_name: "Joe",
                email: "joe@example.com",
                password: "stored-password-hash",
                role: "user",
            });

            const response = await request(app)
                .post("/api/auth/forgot-password")
                .send({
                    email: "JOE@EXAMPLE.COM",
                });

            expect(mockGetUserByEmail).toHaveBeenCalledWith(
                "joe@example.com"
            );

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: GENERIC_RESET_MESSAGE,
            });

            expect(mockSetPasswordResetToken).toHaveBeenCalledTimes(1);

            expect(mockSetPasswordResetToken).toHaveBeenCalledWith(
                "user-123",
                expect.any(String),
                expect.any(Date)
            );

            expect(mockSendPasswordResetEmail).toHaveBeenCalledTimes(1);

            expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(
                "joe@example.com",
                expect.stringMatching(
                    /^https:\/\/www\.moriahproject\.org\/auth\/reset-password\?token=/
                )
            );
        });

        it("returns the same generic response for a nonexistent email", async () => {

            mockGetUserByEmail.mockResolvedValue(null);

            const response = await request(app)
                .post("/api/auth/forgot-password")
                .send({
                    email: "missing@example.com",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: GENERIC_RESET_MESSAGE,
            });

            expect(mockSetPasswordResetToken).not.toHaveBeenCalled();
            expect(mockSendPasswordResetEmail).not.toHaveBeenCalled();
        });

        it("returns 400 for an invalid email", async () => {
            const response = await request(app)
                .post("/api/auth/forgot-password")
                .send({
                    email: "not-an-email",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
            expect(mockGetUserByEmail).not.toHaveBeenCalled();
            expect(mockSetPasswordResetToken).not.toHaveBeenCalled();
            expect(mockSendPasswordResetEmail).not.toHaveBeenCalled();
        });
    });

    describe("POST /api/auth/reset-password", () => {
        it("resets the password when the token is valid", async () => {
            mockGetUserByPasswordResetToken.mockResolvedValue({
                id: "user-123",
                email: "joe@example.com",
            });

            const response = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "valid-reset-token",
                    password: "newPassword123",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Password reset successful",
            });

            expect(
                mockGetUserByPasswordResetToken
            ).toHaveBeenCalledWith("valid-reset-token");

            expect(mockResetUserPassword).toHaveBeenCalledTimes(1);
            expect(mockResetUserPassword).toHaveBeenCalledWith(
                "user-123",
                expect.any(String)
            );
        });

        it("rejects an expired token", async () => {

            mockGetUserByPasswordResetToken.mockResolvedValue(null);

            const response = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "expired-reset-token",
                    password: "newPassword123",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe(
                "Invalid or expired reset token"
            );

            expect(mockResetUserPassword).not.toHaveBeenCalled();
        });

        it("rejects an invalid token", async () => {

            mockGetUserByPasswordResetToken.mockResolvedValue(null);

            const response = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "made-up-token",
                    password: "newPassword123",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe(
                "Invalid or expired reset token"
            );

            expect(mockResetUserPassword).not.toHaveBeenCalled();
        });

        it("does not allow a reset token to be reused", async () => {
            mockGetUserByPasswordResetToken
                .mockResolvedValueOnce({
                    id: "user-123",
                    email: "joe@example.com",
                })
                .mockResolvedValueOnce(null);

            const firstResponse = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "one-time-token",
                    password: "newPassword123",
                });

            const secondResponse = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "one-time-token",
                    password: "anotherPassword123",
                });

            expect(firstResponse.status).toBe(200);

            expect(secondResponse.status).toBe(400);
            expect(secondResponse.body.error).toBe(
                "Invalid or expired reset token"
            );

            expect(mockResetUserPassword).toHaveBeenCalledTimes(1);
        });

        it("hashes the new password before passing it to the database", async () => {
            mockGetUserByPasswordResetToken.mockResolvedValue({
                id: "user-123",
                email: "joe@example.com",
            });

            const newPassword = "newPassword123";

            const response = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "valid-reset-token",
                    password: newPassword,
                });

            expect(response.status).toBe(200);
            expect(mockResetUserPassword).toHaveBeenCalledTimes(1);

            const hashedPassword =
                mockResetUserPassword.mock.calls[0][1];

            expect(hashedPassword).not.toBe(newPassword);

            await expect(
                bcrypt.compare(newPassword, hashedPassword)
            ).resolves.toBe(true);
        });

        it("returns 400 when the new password is too short", async () => {
            const response = await request(app)
                .post("/api/auth/reset-password")
                .send({
                    token: "valid-reset-token",
                    password: "short",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();

            expect(
                mockGetUserByPasswordResetToken
            ).not.toHaveBeenCalled();

            expect(mockResetUserPassword).not.toHaveBeenCalled();
        });
    });
});