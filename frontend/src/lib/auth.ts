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

export function getAuthHeaders(){
    const token = getToken();

    if (!token){
        return {
            "Content-Type": "application/json",
        };
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}