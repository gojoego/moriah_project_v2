import "dotenv/config";
import { Resend } from "resend";

async function main(){
    const apiKey = process.env.RESEND_API_KEY

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

    const result = await resend.emails.send({
        from: from,
        to: to,
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log(result);
}

main().catch(console.error)
