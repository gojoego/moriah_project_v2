import { Resend } from "resend";

export async function sendPasswordResetEmail(
    email: string,
    resetUrl: string,
): Promise<void>  {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    if (!fromEmail) {
        throw new Error("RESEND_FROM_EMAIL is not configured")
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Reset your Moriah Project password",
        text:
            [
                "You requested a password reset.",
                "",
                "Reset your password here:",
                "",
                resetUrl,
                "",
                "If you did not request this, you can safely ignore this email.",
            ].join("\n"),
        html: 
            `
                <p>You requested a password reset.</p>

                <p>
                    <a href="${resetUrl}">
                        Reset your password
                    </a>
                </p>

                <p>If you did not request this, you can safely ignore this email.</p>
            `
    });

    if (error) {
        console.error("Resend password reset error: ", {
            name: error.name,
            message: error.message,
        });

        throw new Error("Email provider rejected password reset email");
    }
}