import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const navLinks = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.POSTS, label: "Stories" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.SIGNUP, label: "Sign Up" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href={ROUTES.HOME} className="text-primary hover:underline">
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
              href={ROUTES.LOGIN}
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
