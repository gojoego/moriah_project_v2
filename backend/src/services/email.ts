import sgMail from "@sendgrid/mail";

export async function sendPasswordResetEmail(
    email: string,
    resetUrl: string,
) {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
        throw new Error("SENDGRID_API_KEY is not configured");
    }

    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!fromEmail) {
        throw new Error("SENDGRID_FROM_EMAIL is not configured")
    }

    sgMail.setApiKey(apiKey);
    
    await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: "Reset your Moriah Project password",
        text:
            `
            You requested a password reset.

            Reset your password here:

            ${resetUrl}

            If you did not request this, you can safely ignore this email.
            
            `,
        html:
            `
            <h2>Password Reset</h2>

            <p>
                You requested a password reset for your
                Moriah Project account.
            </p>

            <p>
                <a href="${resetUrl}">
                    Reset Password
                </a>
            </p>

            <p>
                This link will expire in one hour.
            </p>

            <p>
                If you didn't request this,
                you can safely ignore this email.
            </p>
            `
    });
}