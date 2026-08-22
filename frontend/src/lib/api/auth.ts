import { 
    LoginInput, 
    LoginResponse, 
    SignupInput, 
    SignupResponse 
} from "@/types/auth"
import { ApiBaseUrl, handleResponse } from "./client";

export async function loginUser(
        data: LoginInput
    ): Promise<LoginResponse> {
    const response = await fetch(
        `${ApiBaseUrl}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse<LoginResponse>(response);
}

export async function signupUser(data: SignupInput): Promise<SignupResponse> {
    const response = await fetch(
        `${ApiBaseUrl}/api/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse<SignupResponse>(response);
}

export async function forgotPassword(email: string): Promise<{message: string}> {
    const response = await fetch(`${ApiBaseUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    return handleResponse<{message: string}>(response);
}

export async function resetPassword( data: {
    token: string;
    password: string;
}): Promise<{ message: string }> {
    const response = await fetch(`${ApiBaseUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),  
    })

    return handleResponse<{ message: string }>(response);
}