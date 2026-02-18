"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const LOGIN_DISABLED = true;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (LOGIN_DISABLED) {
            setError(
                "logging in is currently disabled while The Moriah Project is operating in read-only mode."
            );
            return;
        }

        setSuccess(false);

        if (!email || !password) {
            setError('please enter your email and password');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) throw new Error("invalid creds");

            const data = await res.json();

            localStorage.setItem("token", data.token);

            setSuccess(true);

            router.push("/user_profile")
        } catch (err) {
            console.log(err)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-4 max-w-sm mx-auto mt-12"
        >
            <h1 className="text-2xl font-semibold text-center">
                Log In
            </h1>
            <input
                disabled={LOGIN_DISABLED}
                type="email" 
                placeholder="email"
                className="w-full border p-2"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);   
                }}
                required
            />
            <input
                disabled={LOGIN_DISABLED} 
                type="password" 
                placeholder="password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);   
                }}
                required
            />

            {error && (
                <p className="text-sm text-red-600 text-center">
                    {error}
                </p>
            )}

            {!LOGIN_DISABLED && success && (
            <p className="text-sm text-green-600 text-center">
                Account created successfully.
            </p>
            )}

            <button
                type="submit"
                disabled={LOGIN_DISABLED || isSubmitting}
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {LOGIN_DISABLED
                    ? "Login Disabled"
                    : isSubmitting
                    ? "Logging in…"
                    : "Log in"}
            </button>
        </form>
    )
}