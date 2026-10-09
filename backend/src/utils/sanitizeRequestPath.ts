export function sanitizeRequestPath(originalUrl: string): string {
    const [path] = originalUrl.split("?");

    return path;
}