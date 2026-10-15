import { isBetaEmailAllowed } from "../../utils/betaAllowList";

describe("isBetaEmailAllowed", () => {
    const originalEnv = process.env.BETA_ALLOWED_EMAILS;

    afterEach(() => {
        process.env.BETA_ALLOWED_EMAILS = originalEnv;
    });

    test("allows an email in the allowlist", () => {
        process.env.BETA_ALLOWED_EMAILS =
            "tester@example.com,second@example.com";

        expect(
            isBetaEmailAllowed("tester@example.com")
        ).toBe(true);
    });

    test("normalizes case and whitespace", () => {
        process.env.BETA_ALLOWED_EMAILS =
            " Tester@Example.com ";

        expect(
            isBetaEmailAllowed("tester@example.com")
        ).toBe(true);
    });

    test("rejects an email not in the allowlist", () => {
        process.env.BETA_ALLOWED_EMAILS =
            "tester@example.com";

        expect(
            isBetaEmailAllowed("other@example.com")
        ).toBe(false);
    });

    test("rejects all emails when allowlist is empty", () => {
        process.env.BETA_ALLOWED_EMAILS = "";

        expect(
            isBetaEmailAllowed("tester@example.com")
        ).toBe(false);
    });
});