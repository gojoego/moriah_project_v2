"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
    const router = useRouter();

    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isAuthenticated) {
            router.replace(ROUTES.PROFILE);
        }
    }, [
        isAuthenticated,
        isLoading,
        router,
    ]);

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <p className="text-sm text-muted-foreground">
                    Loading...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 text-center">
                <h1 className="text-2xl font-semibold">
                    Login to your account
                </h1>

                <LoginForm />
            </div>
        </main>
    );
}