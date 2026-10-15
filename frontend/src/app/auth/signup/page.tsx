"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signupUser } from "@/lib/api/auth";
import { setToken } from "@/lib/auth";

import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";

import { ROUTES } from "@/constants/routes";

export default function SignupForm() {
    const router = useRouter();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        const trimmedDisplayName = displayName.trim();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!acceptedTerms) {
            setError("You must agree to the Terms of Service and Privacy Policy.");
            return;
        }

        if (!ageConfirmed) {
            setError("You must confirm that you are at least 18 years old.");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await signupUser({
                displayName: trimmedDisplayName,
                email,
                password,
                acceptedTerms,
                ageConfirmed,
            });

            setToken(data.token);

            router.push(ROUTES.PROFILE);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Signup failed");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-12 max-w-sm space-y-5"
            >
                <h1 className="text-center text-2xl font-semibold">
                    Create an Account
                </h1>

                <div className="space-y-1.5">
                    <label
                        htmlFor="displayName"
                        className="form-label"
                    >
                        Display name
                    </label>

                    <Input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                            setError(null);
                        }}
                        required
                    />

                    <p className="text-xs text-muted-foreground">
                        This is the name others will see.
                    </p>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="form-label"
                    >
                        Email
                    </label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                        }}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                    </label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="confirmPassword"
                        className="form-label"
                    >
                        Confirm password
                    </label>

                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError(null);
                        }}
                        required
                    />
                </div>

                <div className="space-y-4">
                    <label className="flex items-start gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => {
                                setAcceptedTerms(e.target.checked);
                                setError(null);
                            }}
                            className="mt-1"
                        />

                        <span>
                            I agree to the{" "}
                            <Link
                                href={ROUTES.TERMS}
                                className="underline underline-offset-4"
                            >
                                Terms of Service
                            </Link>{" "}
                            and acknowledge the{" "}
                            <Link
                                href={ROUTES.PRIVACY}
                                className="underline underline-offset-4"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>

                    <label className="flex items-start gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={ageConfirmed}
                            onChange={(e) => {
                                setAgeConfirmed(e.target.checked);
                                setError(null);
                            }}
                            className="mt-1"
                        />

                        <span>
                            I confirm that I am at least 18 years old.
                        </span>
                    </label>
                </div>
                <ErrorMessage message={error} />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded bg-primary py-2 text-white hover:opacity-90 disabled:opacity-50"
                >
                    {isSubmitting
                        ? "Creating account…"
                        : "Create Account"}
                </button>
            </form>
        </div>
    );
}