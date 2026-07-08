"use client";

import { useSearchParams, useRouter} from "next/navigation";
import { useState } from "react";

import { resetPassword } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage(){
    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!token){
            setError("Missing reset token.");
            return;
        }

        if (password.length < 8) {
            setError("Passwords must be 8 characters or more.");
            return;
        }

        if (confirmPassword !== password){
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            await resetPassword({
                token, 
                password
            });

            router.push(ROUTES.LOGIN);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to reset password.");
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
                        Choose a new password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter and confirm your new password.
                    </p>
                </header>

                <div className="space-y-1">
                    <label 
                        htmlFor="email"
                        className="form-label"
                    >
                        New password
                    </label>
                    <input 
                        id="password"
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        required 
                    />
                </div>

                <div className="space-y-1">
                    <label 
                        htmlFor="confirmPassword"
                        className="form-label"
                    >
                        Confirm password
                    </label>
                    <input 
                        id="confirmPassword"
                        type="password"
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                        required 
                    />
                </div>

                <ErrorMessage message={error}/>

                <Button
                    type="submit"
                    disabled={isSubmitting || !token}
                    className="w-full"
                >
                    {
                        isSubmitting
                        ? "Resetting..."
                        : "Reset password"
                    }
                </Button>
            </form>
        </main>
    )
}