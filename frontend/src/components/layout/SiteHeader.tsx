import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/auth/signup", label: "Sign Up" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-primary hover:underline">
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
