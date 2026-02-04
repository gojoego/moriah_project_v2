"use client";

import { useState } from "react";

export function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(false);

        if (!email || !password) {
            setError('please enter your email and password');
            return;
        }
        
        console.log("login attempt: ", {email, password});
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-4 max-w-sm mx-auto mt-12"
        >
            <h1 className="text-2xl font-semibold text-center">
                Log In
            </h1>
            <input type="email" 
                placeholder="email"
                className="w-full border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input type="password" 
                placeholder="password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && (
                <p className="text-sm text-red-600 text-center">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-600 text-center">
                    logged in successfully
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
            >
                {isSubmitting ? "logging in" : "log in"}
            </button>
        </form>
    )
}