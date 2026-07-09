"use client";

import React, { useState } from "react";
import Link from "next/link";

import { forgotPassword } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setMessage(null);

        if (!email.trim()){
            setError("Please enter your email.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const result = await forgotPassword(email.trim());

            setMessage(result.message);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="mx-auto max-w-md px-4 py-16">
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold">
                        Reset your password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and we will send you a reset link.
                    </p>
                </header>
                <div className="space-y-1">
                    <label 
                        htmlFor="email"
                        className="form-label"
                    >
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required 
                    />
                </div>
                <ErrorMessage message={error}/>

                {message && (
                    <p className="text-sm text-center text-green-700">
                        {message}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {
                        isSubmitting
                        ? "Sending..."
                        : "Send reset link"
                    }
                </Button>
                <p className="text-center text-sm">
                    <Link
                        href={ROUTES.LOGIN}
                        className="underline"
                    >
                        Back to login
                    </Link>
                </p>
            </form>
        </main>
    )
}