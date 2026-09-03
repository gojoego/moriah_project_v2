import type { ReactNode } from "react";
import { Inter, Cormorant_Garamond } from "next/font/google";

import "./globals.css";

import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
	title: "The Moriah Project",
  	description: "A quiet space to honor loved ones who have passed from suicide",
};

const inter = Inter({
  	subsets: ["latin"],
  	variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  	subsets: ["latin"],
  	variable: "--font-display",
  	weight: ["400", "500", "600"],
});

export default function RootLayout({
  	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
		<body 
			className={`
				${inter.variable}
				${cormorant.variable}
				bg-background
				text-foreground
				antialiased
			`}  
		>
			<div className="min-h-screen">
				<SiteHeader />

				<main>
					{children}
				</main>
			</div>
		</body>
		</html>
	);
}