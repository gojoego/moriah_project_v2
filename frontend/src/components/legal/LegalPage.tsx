import { LegalSection } from "./LegalSection";

type LegalPageProps = {
    title: string;
    effectiveDate: string;
    version: string;
    sections: readonly {
        title: string;
        paragraphs: readonly string[];
    }[];
};

export function LegalPage({
    title,
    effectiveDate,
    version,
    sections,
}: LegalPageProps) {
    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-20">
            <div className="space-y-14">
                <header className="max-w-2xl space-y-4">
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                        {title}
                    </h1>

                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Effective {effectiveDate}</p>
                        <p>Version {version}</p>
                    </div>
                </header>

                <div className="max-w-3xl space-y-12">
                    {sections.map((section, index) => (
                        <LegalSection
                            key={section.title}
                            number={index + 1}
                            title={section.title}
                            paragraphs={section.paragraphs}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}