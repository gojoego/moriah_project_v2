import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";


export const metadata = {
    title: "The Moriah Project",
    description: "a quiet space to honor loved ones who have passed from suicide"
}

export default function RootLayout({ children }: {children: ReactNode }){
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-950 text-slate-100">
                <div className="flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="flex-1">
                        <div className="mx-auto w-full max-w-4xl px-4 py-6">
                            { children } 
                        </div>
                    </main>
                    <SiteFooter/>
                </div>
            </body>
        </html>
    );
}