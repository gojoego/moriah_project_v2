import Link from "next/link";

export function SiteHeader() {
    return (
        <header>
            <div>
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    The Moriah Project
                </Link>
                <nav className="flex items-center gap-4">

                </nav>
            </div>
        </header>
    )
}