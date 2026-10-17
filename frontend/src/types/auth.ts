export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface SignupInput {
    email: string;
    password: string;
    displayName: string;
    acceptedTerms: boolean;
    ageConfirmed: boolean;
}

export interface SignupResponse {
    token: string;
}

export interface CurrentUser {
    id: string;
    displayName: string;
    email: string;
    role: string;
}
export interface AuthContextValue {
    user: CurrentUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
    logout: () => void;
}