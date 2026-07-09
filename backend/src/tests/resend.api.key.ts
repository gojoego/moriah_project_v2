import "dotenv/config";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
}

const resend = new Resend(apiKey);

async function main(){
    const result = resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'josephjgallego@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log(result);
}

main().catch(console.error)
