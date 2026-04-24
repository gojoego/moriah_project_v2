"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm(){
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);


        if (!email) {
            setError('please enter your email');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            if (!res.ok) throw new Error("invalid login");

            const data = await res.json();

            localStorage.setItem("token", data.token);

            router.push("/user_profile")
        } catch (err) {
            setError("Invalid email or login failed");
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
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
                <p className="text-sm text-red-600 text-center">
                    {error}
                </p>
            )}

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