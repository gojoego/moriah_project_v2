"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { setToken } from "@/lib/auth";

import { loginUser } from "@/lib/api";
import { ErrorMessage } from "../ui/ErrorMessage";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function LoginForm(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!email || !password) {
            setError('please enter your creds');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const data = await loginUser({
                email,
                password,
            });

            setToken(data.token)

            router.push(ROUTES.PROFILE)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed")
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-sm mx-auto"
        >
            <h2 className="text-xl font-semibold text-center">
                Log In
            </h2>

            <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null); 
                }}
                required
            />

            <input
                type="password"
                placeholder="Password (not required yet)"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);  
                }}
            />

            <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm underline"
            >
                Forgot password?
            </Link>

            <ErrorMessage message={error} />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
            >
                {isSubmitting ? "Logging in…" : "Log in"}
            </button>
        </form>
    );
}