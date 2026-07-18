import "dotenv/config";
import { Resend } from "resend";

async function main() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);

    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.RESEND_TEST_TO_EMAIL;

    if (!from) {
        throw new Error("RESEND_FROM_EMAIL is not configured");
    }

    if (!to) {
        throw new Error("RESEND_TEST_TO_EMAIL is not configured");
    }

    const { data, error } = await resend.emails.send({
        from,
        to,
        subject: "Hello World",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    if (error) {
        throw new Error(`Failed to send test email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
}

main().catch((error) => {
    console.error(error);

    process.exitCode = 1;
});