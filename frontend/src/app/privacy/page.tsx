import {
    PRIVACY_EFFECTIVE_DATE,
    PRIVACY_VERSION,
    PRIVACY_SECTIONS
} from "@/content/legal/privacy";

export default function PrivacyPage() {
    return (
        <main >
            <div>
                <header>
                    <h1>
                        Privacy Policy
                    </h1>
                    <div>
                        <p>Effective {PRIVACY_EFFECTIVE_DATE}</p>
                        <p>Version {PRIVACY_VERSION}</p>
                    </div>
                    <p>
                        This Privacy Policy is used to protect users of the Moriah Project 
                    </p>
                </header>
                <div>
                    {PRIVACY_SECTIONS.map((section, index) => (
                        <section
                            key={section.title}
                        >
                            <h2>
                                {index + 1}. {section.title}
                            </h2>

                            {section.paragraphs.map((paragraph) => (
                                <p 
                                    key={paragraph}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </section>         
                    ))}
                </div>
            </div>
        </main>
    )
}