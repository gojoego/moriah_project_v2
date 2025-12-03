import type { ReactNode } from "react";
// import global css 

import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { title } from "process";

export const metadata = {
    title: "The Moriah Project",
    description: "a quiet space to honor loved ones who have passed from suicide"
}

export default function RootLayout({ children }: {children: ReactNode }){
    return (
        <html>
            <body>
                <div>
                    
                </div>
            </body>
        </html>
    )
}