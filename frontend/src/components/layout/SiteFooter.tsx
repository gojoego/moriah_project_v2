export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} The Moriah Project</p>
        <p className="mt-2">
          Contact your local emergency services if you are in crisis
        </p>
      </div>
    </footer>
  );
}
