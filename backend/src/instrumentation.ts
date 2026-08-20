import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    enableLogs: true,
    enabled: process.env.NODE_ENV !== "test",

    beforeSend(event) {
        if (event.request?.headers) {
            delete event.request.headers.authorization;
            delete event.request.headers.cookie;
        }

        if (
            event.request?.data &&
            typeof event.request.data === "object"
        ) {
            const data = event.request.data as Record<string, unknown>;

            delete data.password;
            delete data.confirmPassword;
            delete data.token;
            delete data.resetToken;
        }

        return event 
    }
});