import type { ReactNode } from "react";
import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { AppShell } from "@/components/layout/AppShell";

export const metadata = {
  title: "The Moriah Project",
  description: "A quiet space to honor loved ones who have passed from suicide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
       <div className="min-h-screen">
          <SiteHeader />
          <div className="relative">
            <main className="relative moriah-container py-12">
              <AppShell>{children}</AppShell>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}