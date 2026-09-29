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
    {
        label: "kill myself",
        pattern: /\bkill myself\b/i,
    },
    {
        label: "end my life",
        pattern: /\bend my life\b/i,
    },
    {
        label: "want to die",
        pattern: /\bwant to die\b/i,
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