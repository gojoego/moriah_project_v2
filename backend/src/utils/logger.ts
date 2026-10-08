type LogContext = {
    requestId?: string;
    userId?: string;
    method?: string;
    path?: string;
    statusCode?: number;
    durationMs?: number;
    error?: unknown;
};

export function logError(message: string, context: LogContext = {}) {
    console.error(
        JSON.stringify({
            level: "error",
            message,
            ...context,
        })
    );
}