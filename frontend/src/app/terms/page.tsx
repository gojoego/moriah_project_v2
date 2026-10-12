import {
    TERMS_EFFECTIVE_DATE,
    TERMS_VERSION,
    TERMS_SECTIONS,
} from "@/content/legal/terms";

export default function TermsPage() {
    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8">
            <div className="space-y-10">
                <header className="space-y-3">
                    <h1 className="font-display text-4xl md:text-5xl">
                        Terms of Service
                    </h1>

                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Effective {TERMS_EFFECTIVE_DATE}</p>
                        <p>Version {TERMS_VERSION}</p>
                    </div>

                    <p className="leading-7 text-muted-foreground">
                        These Terms of Service govern your use of The Moriah
                        Project.
                    </p>
                </header>

                <div className="space-y-10">
                    {TERMS_SECTIONS.map((section, index) => (
                        <section
                            key={section.title}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-semibold">
                                {index + 1}. {section.title}
                            </h2>

                            {section.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="leading-7 text-muted-foreground"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}