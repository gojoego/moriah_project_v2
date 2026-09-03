"use client";

import { useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";


const navLinks = [
	{ href: ROUTES.HOME, label: "Home" },
	{ href: ROUTES.POSTS, label: "Stories" },
	{ href: ROUTES.ABOUT, label: "About" },
	{ href: ROUTES.SIGNUP, label: "Sign Up" },
];


export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header
			className="
				border-b
				border-foreground/10
				bg-background
				text-foreground
			"
		>
			<div className="mx-auto w-full max-w-5xl px-6 md:px-8">
				<div className="flex h-16 items-center justify-between">

					<Link
						href={ROUTES.HOME}
						className="
							font-display
							text-xl
							tracking-tight
							transition-opacity
							hover:opacity-80
							md:text-2xl
						"
					>
						The Moriah Project
					</Link>

					<nav
						className="
							hidden
							items-center
							gap-6
							font-sans
							md:flex
						"
					>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="
									text-sm
									text-foreground/75
									transition-colors
									hover:text-foreground
								"
							>
								{link.label}
							</Link>
						))}


						<Link
							href={ROUTES.LOGIN}
							className="
								rounded-full
								bg-foreground
								px-4
								py-2
								text-sm
								font-medium
								text-background
								transition-opacity
								hover:opacity-90
							"
						>
							Log in
						</Link>

					</nav>

					<button
						type="button"
						onClick={() => setMenuOpen((open) => !open)}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						className="
							rounded-md
							px-3
							py-2
							font-sans
							text-sm
							text-foreground
							transition-colors
							hover:bg-foreground/10
							md:hidden
						"
					>
						{menuOpen ? "Close" : "Menu"}
					</button>

				</div>

				{menuOpen && (
					<nav
						id="mobile-navigation"
						className="
							flex
							flex-col
							gap-1
							border-t
							border-foreground/10
							py-4
							font-sans
							md:hidden
						"
					>

						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className="
									rounded-md
									px-3
									py-3
									text-sm
									text-foreground/80
									transition-colors
									hover:bg-foreground/10
									hover:text-foreground
								"
							>
								{link.label}
							</Link>
						))}

						<Link
							href={ROUTES.LOGIN}
							onClick={() => setMenuOpen(false)}
							className="
								mt-2
								rounded-md
								bg-foreground
								px-3
								py-3
								text-center
								text-sm
								font-medium
								text-background
								transition-opacity
								hover:opacity-90
							"
						>
							Log in
						</Link>

					</nav>
				)}

			</div>
		</header>
	);
}