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
}

export interface SignupResponse {
    token: string;
}