type SiteFooterProps = {
  onOpenDisclaimer: () => void;
};

export function SiteFooter({ onOpenDisclaimer }: SiteFooterProps) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground text-center">
        <p>© {new Date().getFullYear()} The Moriah Project</p>
        <p className="mt-2">
          Contact your local emergency services if you are in crisis
        </p>
        <button
          onClick={onOpenDisclaimer}
          className="mt-4 underline-offset-4 hover:underline"
        >
        read disclaimer
      </button>
      </div>

    </footer>
  );
}
