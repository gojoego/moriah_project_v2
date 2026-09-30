import { detectCrisis } from "../../services/crisisDetectionService";


describe("detectCrisis", () => {

    it("detects explicit suicidal language", () => {
        const result = detectCrisis(
            "I want to die"
        );
        expect(result.crisisDetected).toBe(true);

        expect(result.matchedSignals).toContain(
            "want to die"
        );
    });


    it("detects self-harm language", () => {

        const result = detectCrisis(
            "I feel like I might hurt myself"
        );

        expect(result.crisisDetected).toBe(true);

        expect(result.matchedSignals).toContain(
            "hurt myself"
        );
    });


    it("can detect more than one crisis signal", () => {

        const result = detectCrisis(
            "I feel suicidal and I want to die"
        );

        expect(result.crisisDetected).toBe(true);

        expect(result.matchedSignals).toEqual(
            expect.arrayContaining([
                "suicidal",
                "want to die",
            ])
        );
    });


    it("does not trigger for ordinary grief-related language", () => {

        const result = detectCrisis(
            "I am grieving my brother and want a support group"
        );

        expect(result.crisisDetected).toBe(false);

        expect(result.matchedSignals).toEqual([]);
    });


    it("does not trigger for general emotional distress", () => {

        const result = detectCrisis(
            "I feel really sad and overwhelmed"
        );

        expect(result.crisisDetected).toBe(false);

        expect(result.matchedSignals).toEqual([]);
    });


    it("is case-insensitive", () => {

        const result = detectCrisis(
            "I WANT TO DIE"
        );

        expect(result.crisisDetected).toBe(true);

        expect(result.matchedSignals).toContain(
            "want to die"
        );
    });
});

describe("detectCrisis additional crisis phrases", () => {

    const crisisCases = [
        {
            message: "I don't want to live",
            signal: "don't want to live",
        },
        {
            message: "I do not want to live anymore",
            signal: "don't want to live",
        },
        {
            message: "I want to kill my self",
            signal: "kill myself",
        },
        {
            message: "I wanna die",
            signal: "wanna die",
        },
        {
            message: "I just want to end it all",
            signal: "end it all",
        },
        {
            message: "I think I'd be better off dead",
            signal: "better off dead",
        }
    ];

    test.each(crisisCases)(
        "detects crisis language in: $message",
        ({ message, signal }) => {

            const result = detectCrisis(message);

            expect(result.crisisDetected).toBe(true);

            expect(result.matchedSignals).toContain(
                signal
            );
        }
    );
});