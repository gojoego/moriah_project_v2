export type CrisisDetectionResult = {
    crisisDetected: boolean;
    matchedSignals: string[];
};

const CRISIS_PATTERNS: {
    label: string;
    pattern: RegExp;
}[] = [
    {
        label: "suicidal",
        pattern: /\bsuicidal\b/i,
    },

    // Matches both:
    // "kill myself"
    // "kill my self"
    {
        label: "kill myself",
        pattern: /\bkill my\s*self\b/i,
    },

    {
        label: "end my life",
        pattern: /\bend my life\b/i,
    },

    {
        label: "want to die",
        pattern: /\bwant to die\b/i,
    },

    // Informal phrasing:
    // "wanna die"
    {
        label: "wanna die",
        pattern: /\bwanna die\b/i,
    },

    // Explicit statement that the person does not want to live.
    {
        label: "don't want to live",
        pattern: /\b(?:don't|do not) want to live\b/i,
    },

    // Another explicit self-destructive phrase.
    {
        label: "end it all",
        pattern: /\bend it all\b/i,
    },

    // Common hopeless/self-deprecating crisis phrase.
    {
        label: "better off dead",
        pattern: /\bbetter off dead\b/i,
    },

    {
        label: "hurt myself",
        pattern: /\bhurt myself\b/i,
    },

    {
        label: "harm myself",
        pattern: /\bharm myself\b/i,
    },
];

export function detectCrisis(
    message: string
): CrisisDetectionResult {

    const matchedSignals: string[] = [];

    for (const crisisPattern of CRISIS_PATTERNS) {

        if (crisisPattern.pattern.test(message)) {
            matchedSignals.push(
                crisisPattern.label
            );
        }
    }

    const crisisDetected =
        matchedSignals.length > 0;

    return {
        crisisDetected,
        matchedSignals,
    };
}