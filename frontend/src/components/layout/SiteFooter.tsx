export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="moriah-container py-10 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} The Moriah Project</p>
        <p className="mt-2">
          Built with care. If you’re in crisis, consider contacting local emergency services
          or a crisis hotline in your country.
        </p>
      </div>
    </footer>
  );
}
