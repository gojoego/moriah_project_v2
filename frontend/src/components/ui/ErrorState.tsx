interface Props {
    message?: string;
    onRetry?: () => void; 
}

export function ErrorState({
    message = "unable to load content right now", 
    onRetry,
}: Props) {
    return (
        <div className="text-center py-8 space-y-3">
            <p className="text-red-500 text-lg font-medium">
                {message}
            </p>
            <p className="text-sm text-muted-foreground">
                please try again in a moment 
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
                >
                    retry
                </button>
            )}
        </div>
    );
}