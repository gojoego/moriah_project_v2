const TOKEN_KEY = "moriah-token";

export function getToken(): string | null {
    if (typeof window === "undefined"){
        return null;
    }

    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    if (typeof window === "undefined"){
        return;
    }
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    if (typeof window === "undefined"){
        return;
    }
    localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

export function getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }
    const token = getToken();

    if (token){
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export async function checkAuth(): Promise<boolean> {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
            {
                headers: getAuthHeaders(),
            }
        );

        if (!response.ok) {
            removeToken();
            return false;
        }

        return true;
    } catch {
        removeToken();
        return false;
    }
}