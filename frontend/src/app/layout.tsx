import type { ReactNode } from "react";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata = {
  title: "The Moriah Project",
  description: "A quiet space to honor loved ones who have passed from suicide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-secondary blur-3xl" />
              <div className="absolute top-24 left-12 h-48 w-48 rounded-full bg-accent blur-3xl" />
              <div className="absolute top-40 right-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <main className="relative moriah-container py-12">
              {children}
            </main>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
