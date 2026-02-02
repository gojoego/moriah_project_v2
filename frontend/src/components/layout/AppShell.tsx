"use client";

import { useState } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <>
      <DisclaimerModal
        modal={{
          isOpen: showDisclaimer,
          onClose: () => setShowDisclaimer(false),
          title: "Disclaimer",
          children: (
            <p className="text-sm leading-relaxed text-muted-foreground">
              This site is not a substitute for professional mental health care.
              If you are in immediate danger, contact local emergency services.
            </p>
          ),
        }}
      />

      <main className="relative moriah-container py-12">
        {children}
      </main>

      <SiteFooter onOpenDisclaimer={() => setShowDisclaimer(true)} />
    </>
  );
}