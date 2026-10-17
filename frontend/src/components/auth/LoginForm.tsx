"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { setToken } from "@/lib/auth";
import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/hooks/useAuth";

import { ErrorMessage } from "../ui/ErrorMessage";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";

export function LoginForm() {
    const router = useRouter();

    const { refreshUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!email || !password) {
            setError("Please enter your credentials");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await loginUser({
                email,
                password,
            });

            setToken(data.token);

            await refreshUser();

            router.push(ROUTES.PROFILE);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed");
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

            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                }}
                required
            />

            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                }}
                required
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