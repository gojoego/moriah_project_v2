import Link from "next/link";

export function SiteHeader() {
    return (
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    The Moriah Project
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/posts" className="text-sm text-slate-300 hover:text-slate-50">
                        stories 
                    </Link>
                    <Link href="/posts/new" className="text-sm text-slate-300 hover:text-slate-50">
                        share a story
                    </Link>
                    <Link href="/about" className="text-sm text-slate-300 hover:text-slate-50">
                        about
                    </Link>
                    <Link href="/auth/login" className="text-sm text-slate-300 hover:text-slate-50">
                        log in 
                    </Link>
                    <Link href="/auth/signup" className="text-sm text-slate-300 hover:text-slate-50">
                        sign up 
                    </Link>
                </nav>
            </div>
        </header>
    )
}