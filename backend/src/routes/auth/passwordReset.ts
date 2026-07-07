import { Router } from "express";
import crypto from "crypto";
import { getZodErrorMessage } from "../../utils/zod";
import { getUserByEmail, setPasswordResetToken } from "../../db/queries/users";
import { forgotPasswordSchema } from "../../schemas/passwordReset";
import { sendPasswordResetEmail } from "../../services/email";

const router = Router();

const GENERIC_RESET_MESSAGE = "If an account exists, a password reset email has been sent.";

router.post("/forgot-password", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const parsed = forgotPasswordSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const { email } = parsed.data;

        const user = await getUserByEmail(email);

        if (!user) {
            await new Promise((resolve) => setTimeout(resolve, 300));

            return res.json({ message: GENERIC_RESET_MESSAGE });
        }

        const token = crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await setPasswordResetToken(user.id, token, expiresAt);

        const frontendUrl = process.env.FRONTEND_URL;

        if (!frontendUrl) {
            throw new Error("FRONTEND_URL is not configured");
        }

        const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

        await sendPasswordResetEmail(user.email, resetUrl);

        return res.json({
            message: GENERIC_RESET_MESSAGE,
        });
    } catch (error) {
        console.error("Forgot password error:", {
            message: error instanceof Error ? error.message : "Unknown error",
        });

        return res.status(500).json({
            error: "Failed to process password reset request",
        });
    }
});

router.post("/reset-password", async (req, res) => {
    // TODO
});

export default router;