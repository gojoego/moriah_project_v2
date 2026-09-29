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