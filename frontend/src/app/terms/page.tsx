import { LegalPage } from "@/components/legal/LegalPage";

import {
    TERMS_EFFECTIVE_DATE,
    TERMS_VERSION,
    TERMS_SECTIONS,
} from "@/content/legal/terms";

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms of Service"
            effectiveDate={TERMS_EFFECTIVE_DATE}
            version={TERMS_VERSION}
            sections={TERMS_SECTIONS}
        />
    );
}