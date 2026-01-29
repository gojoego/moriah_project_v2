import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Stories" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="moriah-container">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            The Moriah Project
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/auth/login"
              className="text-sm rounded-full border px-3 py-1.5 bg-card hover:bg-muted transition"
            >
              Log in
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
