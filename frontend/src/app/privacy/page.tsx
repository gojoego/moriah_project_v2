import { LegalPage } from "@/components/legal/LegalPage";

import {
    PRIVACY_EFFECTIVE_DATE,
    PRIVACY_VERSION,
    PRIVACY_SECTIONS
} from "@/content/legal/privacy";

export default function PrivacyPage() {
    return (
        <LegalPage
            title="Privacy Policies"
            effectiveDate={PRIVACY_EFFECTIVE_DATE}
            version={PRIVACY_VERSION}
            sections={PRIVACY_SECTIONS}
        />
    )
}