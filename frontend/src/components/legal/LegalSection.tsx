type LegalSectionProps = {
    number: number;
    title: string;
    paragraphs: readonly string[];
};

export function LegalSection({
    number,
    title,
    paragraphs,
}: LegalSectionProps) {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight">
                {number}. {title}
            </h2>

            <div className="space-y-4">
                {paragraphs.map((paragraph) => (
                    <p
                        key={paragraph}
                        className="text-base leading-8 text-foreground/80"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        </section>
    );
}