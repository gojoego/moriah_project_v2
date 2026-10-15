export function getBetaAllowedEmails(): Set<string> {
    const raw = process.env.BETA_ALLOWED_EMAILS ?? "";

    return new Set(
        raw
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean)
    );
}

export function isBetaEmailAllowed(email: string): boolean {
    return getBetaAllowedEmails().has(
        email.trim().toLowerCase()
    );
}