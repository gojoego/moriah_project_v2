"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import { getCurrentUser } from "@/lib/api/users";
import { ApiError } from "@/lib/api/client";
import { removeToken } from "@/lib/auth";

import type {
    AuthContextValue,
    CurrentUser,
} from "@/types/auth";

export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<CurrentUser | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const refreshVersionRef = useRef(0);

    const refreshUser = useCallback(async () => {
        const requestVersion =
            ++refreshVersionRef.current;

        try {
            const currentUser =
                await getCurrentUser();

            if (
                requestVersion !==
                refreshVersionRef.current
            ) {
                return;
            }

            setUser(currentUser);
        } catch (error) {
            if (
                requestVersion !==
                refreshVersionRef.current
            ) {
                return;
            }

            if (
                error instanceof ApiError &&
                (error.status === 401 ||
                    error.status === 403)
            ) {
                setUser(null);
                return;
            }

            throw error;
        } finally {
            if (
                requestVersion ===
                refreshVersionRef.current
            ) {
                setIsLoading(false);
            }
        }
    }, []);

    const logout = useCallback(() => {
        refreshVersionRef.current += 1;

        removeToken();
        setUser(null);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        void refreshUser().catch(() => {
            setIsLoading(false);
        });
    }, [refreshUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}